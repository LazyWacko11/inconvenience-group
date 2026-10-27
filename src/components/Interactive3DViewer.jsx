import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useLanguage } from '../context/LanguageContext';
import {
  RotateCcw, Sparkles, ZoomIn, ZoomOut, Flame, Box,
  Trash2, ShieldCheck, RefreshCw, Layers, Eye
} from 'lucide-react';

export default function Interactive3DViewer({ modelType = 'igloo', fallbackImage = null }) {
  const { lang } = useLanguage();
  const isCs = lang === 'cs';

  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const animFrameRef = useRef(null);

  // View mode: '3d' or 'photo'
  const [viewMode, setViewMode] = useState('3d');

  // Interactive model specific states
  const [meltFactor, setMeltFactor] = useState(0); // for igloo
  const [duckCount, setDuckCount] = useState(12); // for petty
  const [messCount, setMessCount] = useState(16); // for mess
  const [autoRotate, setAutoRotate] = useState(true);

  // References for live 3D updates
  const iglooMeshGroup = useRef(null);
  const puddleMesh = useRef(null);
  const ducksGroup = useRef(null);
  const messItemsGroup = useRef(null);

  useEffect(() => {
    if (viewMode !== '3d' || !containerRef.current) return;

    const width = containerRef.current.clientWidth || 500;
    const height = 360;

    // SCENE
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(modelType === 'igloo' ? 0x0f1c24 : 0x16231d);

    // CAMERA
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 1.2, 0);
    cameraRef.current = camera;

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    rendererRef.current = renderer;
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(renderer.domElement);

    // LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfff3db, 1.2);
    dirLight.position.set(6, 12, 8);
    dirLight.castShadow = true;
    scene.add(dirLight);

    // MOUSE ORBIT INTERACTION
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };
    let rotationSpeed = { x: 0, y: 0 };
    let targetRotation = { x: 0.3, y: 0.6 };

    const onMouseDown = (e) => {
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMousePos.x;
      const deltaY = e.clientY - prevMousePos.y;
      targetRotation.y += deltaX * 0.008;
      targetRotation.x = Math.max(0.05, Math.min(1.2, targetRotation.x + deltaY * 0.008));
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onWheel = (e) => {
      e.preventDefault();
      const zoomDelta = e.deltaY * 0.005;
      camera.position.z = Math.max(5, Math.min(16, camera.position.z + zoomDelta));
    };

    const canvasDom = renderer.domElement;
    canvasDom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    canvasDom.addEventListener('wheel', onWheel, { passive: false });

    // TOUCH SUPPORT
    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchMove = (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMousePos.x;
      const deltaY = e.touches[0].clientY - prevMousePos.y;
      targetRotation.y += deltaX * 0.008;
      targetRotation.x = Math.max(0.05, Math.min(1.2, targetRotation.x + deltaY * 0.008));
      prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    canvasDom.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onMouseUp);

    // ==========================================
    // BUILD SCENE SPECIFIC 3D MODELS
    // ==========================================
    if (modelType === 'igloo') {
      // 1. SNOW GROUND
      const groundGeo = new THREE.CylinderGeometry(6, 6, 0.4, 32);
      const groundMat = new THREE.MeshStandardMaterial({
        color: 0xe6edf5,
        roughness: 0.85,
        metalness: 0.1
      });
      const ground = new THREE.Mesh(groundGeo, groundMat);
      ground.position.y = -0.2;
      ground.receiveShadow = true;
      scene.add(ground);

      // 2. IGLOO DOME GROUP
      const iglooGroup = new THREE.Group();
      iglooMeshGroup.current = iglooGroup;

      // Faceted ice dome
      const domeGeo = new THREE.SphereGeometry(2.4, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.5);
      const domeMat = new THREE.MeshStandardMaterial({
        color: 0xf2f7fc,
        roughness: 0.3,
        metalness: 0.2,
        flatShading: true
      });
      const dome = new THREE.Mesh(domeGeo, domeMat);
      dome.castShadow = true;
      dome.receiveShadow = true;
      iglooGroup.add(dome);

      // Entrance arch tunnel
      const tunnelGeo = new THREE.CylinderGeometry(0.9, 0.9, 1.6, 12, 1, false, 0, Math.PI);
      const tunnel = new THREE.Mesh(tunnelGeo, domeMat);
      tunnel.rotation.x = Math.PI * 0.5;
      tunnel.rotation.z = Math.PI * 0.5;
      tunnel.position.set(0, 0.45, 2.1);
      tunnel.castShadow = true;
      iglooGroup.add(tunnel);

      // Interior golden glowing light
      const interiorLight = new THREE.PointLight(0xffaa22, 2.5, 6);
      interiorLight.position.set(0, 0.9, 0.4);
      scene.add(interiorLight);

      scene.add(iglooGroup);

      // 3. MELTING WATER PUDDLE
      const puddleGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.05, 32);
      const puddleMat = new THREE.MeshStandardMaterial({
        color: 0x2980b9,
        roughness: 0.1,
        metalness: 0.8,
        transparent: true,
        opacity: 0.85
      });
      const puddle = new THREE.Mesh(puddleGeo, puddleMat);
      puddle.position.y = 0.02;
      puddle.visible = false;
      puddleMesh.current = puddle;
      scene.add(puddle);

      // 4. FALLING SNOW PARTICLES
      const snowCount = 120;
      const snowGeo = new THREE.BufferGeometry();
      const snowPos = new Float32Array(snowCount * 3);
      for (let i = 0; i < snowCount * 3; i += 3) {
        snowPos[i] = (Math.random() - 0.5) * 10;
        snowPos[i + 1] = Math.random() * 8;
        snowPos[i + 2] = (Math.random() - 0.5) * 10;
      }
      snowGeo.setAttribute('position', new THREE.BufferAttribute(snowPos, 3));
      const snowMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.12, transparent: true, opacity: 0.75 });
      const snowParticles = new THREE.Points(snowGeo, snowMat);
      scene.add(snowParticles);

    } else if (modelType === 'petty') {
      // 1. FLOOR
      const floorGeo = new THREE.PlaneGeometry(12, 12);
      const floorMat = new THREE.MeshStandardMaterial({ color: 0x3d3228, roughness: 0.6 });
      const floor = new THREE.Mesh(floorGeo, floorMat);
      floor.rotation.x = -Math.PI * 0.5;
      floor.receiveShadow = true;
      scene.add(floor);

      // 2. MONUMENT OF 3D CARDBOARD BOXES
      const boxesGroup = new THREE.Group();
      const boxMat = new THREE.MeshStandardMaterial({ color: 0xc89658, roughness: 0.9, flatShading: true });
      const tapeMat = new THREE.MeshStandardMaterial({ color: 0xe6b375, roughness: 0.5 });

      // Build layered monument
      const layers = [
        { countX: 4, countZ: 4, y: 0.35, size: 0.7 },
        { countX: 3, countZ: 3, y: 1.05, size: 0.7 },
        { countX: 2, countZ: 2, y: 1.75, size: 0.7 },
        { countX: 1, countZ: 1, y: 2.45, size: 0.7 }
      ];

      layers.forEach((l) => {
        const offset = ((l.countX - 1) * l.size) * 0.5;
        for (let ix = 0; ix < l.countX; ix++) {
          for (let iz = 0; iz < l.countZ; iz++) {
            const bMesh = new THREE.Mesh(new THREE.BoxGeometry(l.size * 0.92, l.size * 0.92, l.size * 0.92), boxMat);
            bMesh.position.set(ix * l.size - offset, l.y, iz * l.size - offset);
            bMesh.castShadow = true;
            bMesh.receiveShadow = true;
            boxesGroup.add(bMesh);

            // Tape strip
            const tape = new THREE.Mesh(new THREE.BoxGeometry(l.size * 0.94, 0.02, 0.15), tapeMat);
            tape.position.set(ix * l.size - offset, l.y + l.size * 0.46, iz * l.size - offset);
            boxesGroup.add(tape);
          }
        }
      });
      scene.add(boxesGroup);

      // 3. RUBBER DUCKS
      const ducksHolder = new THREE.Group();
      ducksGroup.current = ducksHolder;
      const duckBodyMat = new THREE.MeshStandardMaterial({ color: 0xf1c40f, roughness: 0.2 });
      const duckBeakMat = new THREE.MeshStandardMaterial({ color: 0xe67e22, roughness: 0.3 });

      const createDuck = (x, y, z) => {
        const d = new THREE.Group();
        const body = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 10), duckBodyMat);
        body.scale.set(1.1, 0.85, 1.3);
        d.add(body);

        const head = new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 8), duckBodyMat);
        head.position.set(0, 0.18, 0.12);
        d.add(head);

        const beak = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.12, 6), duckBeakMat);
        beak.rotation.x = Math.PI * 0.5;
        beak.position.set(0, 0.16, 0.24);
        d.add(beak);

        d.position.set(x, y + 0.14, z);
        d.castShadow = true;
        return d;
      };

      for (let i = 0; i < duckCount; i++) {
        const angle = (i / duckCount) * Math.PI * 2;
        const rad = 2.2 + (i % 3) * 0.4;
        ducksHolder.add(createDuck(Math.cos(angle) * rad, 0, Math.sin(angle) * rad));
      }
      scene.add(ducksHolder);

    } else if (modelType === 'mess') {
      // 1. OFFICE FLOOR & WALL
      const floorGeo = new THREE.PlaneGeometry(10, 10);
      const floorMat = new THREE.MeshStandardMaterial({ color: 0x4a5b51, roughness: 0.8 });
      const floor = new THREE.Mesh(floorGeo, floorMat);
      floor.rotation.x = -Math.PI * 0.5;
      floor.receiveShadow = true;
      scene.add(floor);

      const wallGeo = new THREE.PlaneGeometry(10, 6);
      const wallMat = new THREE.MeshStandardMaterial({ color: 0xdedfd9, roughness: 0.9 });
      const wall = new THREE.Mesh(wallGeo, wallMat);
      wall.position.set(0, 3, -5);
      scene.add(wall);

      // Desk
      const deskMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 });
      const desk = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.1, 1.8), deskMat);
      desk.position.set(0, 1.4, -2.5);
      desk.castShadow = true;
      scene.add(desk);

      // Desk legs
      const legMat = new THREE.MeshStandardMaterial({ color: 0x222222 });
      [-1.6, 1.6].forEach((lx) => {
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.4, 8), legMat);
        leg.position.set(lx, 0.7, -2.5);
        scene.add(leg);
      });

      // 2. SCATTERED HARLESS MESS
      const messHolder = new THREE.Group();
      messItemsGroup.current = messHolder;

      // Sticky notes on wall
      const noteColors = [0xf39c12, 0xe74c3c, 0x2ecc71, 0x9b59b6, 0x3498db];
      for (let i = 0; i < 28; i++) {
        const nMat = new THREE.MeshStandardMaterial({
          color: noteColors[i % noteColors.length],
          roughness: 0.6,
          side: THREE.DoubleSide
        });
        const note = new THREE.Mesh(new THREE.PlaneGeometry(0.25, 0.25), nMat);
        note.position.set((Math.random() - 0.5) * 5, 2 + Math.random() * 2.2, -4.95);
        note.rotation.z = (Math.random() - 0.5) * 0.4;
        messHolder.add(note);
      }

      // Bottles on floor & desk
      const bottleMat = new THREE.MeshStandardMaterial({
        color: 0x3498db,
        transparent: true,
        opacity: 0.65,
        roughness: 0.2
      });
      for (let i = 0; i < 14; i++) {
        const bot = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.45, 8), bottleMat);
        const onDesk = i < 5;
        if (onDesk) {
          bot.position.set((Math.random() - 0.5) * 2.8, 1.65, -2.5 + (Math.random() - 0.5) * 1.2);
        } else {
          bot.position.set((Math.random() - 0.5) * 4, 0.22, (Math.random() - 0.5) * 4);
          bot.rotation.z = Math.PI * 0.45; // knocked over
        }
        bot.castShadow = true;
        messHolder.add(bot);
      }

      scene.add(messHolder);
    }

    // ANIMATION LOOP
    let angle = 0.6;
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);

      if (autoRotate && !isDragging) {
        targetRotation.y += 0.003;
      }

      // Smooth camera orbit
      const radius = camera.position.distanceTo(new THREE.Vector3(0, 1.2, 0));
      camera.position.x = Math.sin(targetRotation.y) * Math.cos(targetRotation.x) * radius;
      camera.position.y = Math.sin(targetRotation.x) * radius;
      camera.position.z = Math.cos(targetRotation.y) * Math.cos(targetRotation.x) * radius;
      camera.lookAt(0, 1.2, 0);

      // Igloo melt update
      if (modelType === 'igloo' && iglooMeshGroup.current) {
        const factor = meltFactor;
        iglooMeshGroup.current.scale.set(1 + factor * 0.6, Math.max(0.08, 1 - factor * 0.92), 1 + factor * 0.6);
        if (puddleMesh.current) {
          if (factor > 0.05) {
            puddleMesh.current.visible = true;
            puddleMesh.current.scale.set(factor * 26, 1, factor * 26);
          } else {
            puddleMesh.current.visible = false;
          }
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // CLEANUP
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      canvasDom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvasDom.removeEventListener('wheel', onWheel);
      canvasDom.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onMouseUp);
      if (rendererRef.current) rendererRef.current.dispose();
    };
  }, [viewMode, modelType, meltFactor]);

  // Handle adding more ducks for petty
  const handleAddDucks = () => {
    setDuckCount((prev) => Math.min(60, prev + 8));
  };

  return (
    <div className="interactive-3d-wrapper">
      {/* View mode toggle header */}
      <div className="viewer-top-bar">
        <div className="viewer-title-chip">
          <Layers size={14} />
          <span>
            {modelType === 'igloo'
              ? (isCs ? '3D MODEL: SNĚHOVÁ VILA SE ZKAPALNĚNÍM' : '3D MODEL: EPHEMERAL SNOW ESTATE')
              : modelType === 'petty'
              ? (isCs ? '3D MODEL: KARTONOVÁ PYRAMIDA A KACHNY' : '3D MODEL: CARDBOARD FORTRESS & DUCKS')
              : (isCs ? '3D MODEL: KORPORÁTNÍ REVERZNÍ NEPOŘÁDEK' : '3D MODEL: STAGED CORPORATE DISORDER')}
          </span>
        </div>

        <div className="viewer-view-switch">
          <button
            type="button"
            className={`view-btn ${viewMode === '3d' ? 'active' : ''}`}
            onClick={() => setViewMode('3d')}
          >
            <Box size={14} />
            <span>{isCs ? 'Interaktivní 3D model' : 'Interactive 3D'}</span>
          </button>
          {fallbackImage && (
            <button
              type="button"
              className={`view-btn ${viewMode === 'photo' ? 'active' : ''}`}
              onClick={() => setViewMode('photo')}
            >
              <Eye size={14} />
              <span>{isCs ? 'Oficiální fotka' : 'Realistic Photo'}</span>
            </button>
          )}
        </div>
      </div>

      {/* 3D CANVAS VIEW */}
      {viewMode === '3d' ? (
        <div className="viewer-canvas-container">
          <div ref={containerRef} className="three-canvas-target" />

          {/* Interactive floating HUD controls */}
          <div className="canvas-hud-controls">
            <button
              type="button"
              className={`hud-btn ${autoRotate ? 'active' : ''}`}
              onClick={() => setAutoRotate(!autoRotate)}
              title={isCs ? 'Automatická rotace' : 'Toggle auto-orbit'}
            >
              <RefreshCw size={14} className={autoRotate ? 'spin' : ''} />
              <span>{isCs ? 'Rotace' : 'Orbit'}</span>
            </button>

            <span className="hud-hint">
              {isCs ? '🖱️ Tažením myši otáčejte 3D scénu, kolečkem přibližujte' : '🖱️ Drag to rotate 3D model, scroll to zoom'}
            </span>
          </div>

          {/* Model-specific controls below 3D */}
          <div className="model-3d-toolbar">
            {modelType === 'igloo' && (
              <div className="toolbar-slider-group">
                <div className="slider-label">
                  <span>{isCs ? 'Míra jarního zkapalnění (Tání iglú):' : 'Spring Liquefaction Simulator (Melting Factor):'}</span>
                  <b className={meltFactor > 0.4 ? 'text-danger' : 'text-highlight'}>
                    {Math.round(meltFactor * 100)}% {meltFactor > 0.8 ? (isCs ? '(Kompletní jezero)' : '(Liquid Basin)') : ''}
                  </b>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.02"
                  value={meltFactor}
                  onChange={(e) => setMeltFactor(Number(e.target.value))}
                  className="petty-slider"
                />
                <small className="slider-hint">
                  {isCs
                    ? 'Posunutím posuvníku doprava sledujte, jak se sněhové sídlo v reálném 3D čase mění na vodu a spouští nutnost zaplatit novou výstavbu.'
                    : 'Slide right to watch the 3D snow mansion collapse into a puddle, triggering mandatory Year 2 reconstruction billing.'}
                </small>
              </div>
            )}

            {modelType === 'petty' && (
              <div className="toolbar-action-group">
                <button
                  type="button"
                  className="button button-dark btn-sm"
                  onClick={handleAddDucks}
                >
                  <Sparkles size={14} />
                  <span>{isCs ? `Přidat dalších 8 kachniček (Nyní: ${duckCount})` : `Spawn 8 More Rubber Ducks (${duckCount})`}</span>
                </button>
                <small className="toolbar-note">
                  {isCs ? 'Kartonové krabice drží tvar pyramidy. Každá žlutá kachna zvyšuje psychologický nátlak.' : 'Cardboard fortress remains structurally sound while duck saturation increases.'}
                </small>
              </div>
            )}

            {modelType === 'mess' && (
              <div className="toolbar-action-group">
                <button
                  type="button"
                  className="button button-dark btn-sm"
                  onClick={() => setMessCount((prev) => prev + 6)}
                >
                  <Trash2 size={14} />
                  <span>{isCs ? 'Rozházet další 3D recyklovatelný odpad' : 'Scatter Additional 3D Clean Trash'}</span>
                </button>
                <small className="toolbar-note">
                  {isCs ? '100% nezapáchající recyklovatelný nepořádek. Žádná škoda na majetku.' : '100% odorless, reusable disorder with zero structural damage.'}
                </small>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* PHOTOREALISTIC PHOTO VIEW */
        <div className="viewer-photo-container fade-in">
          <img
            src={fallbackImage}
            alt={modelType}
            className="viewer-photo-img"
            onError={(e) => {
              // fallback if not yet generated
              e.target.style.display = 'none';
            }}
          />
          <div className="photo-caption-bar">
            <span>{isCs ? 'OFICIÁLNÍ FOTODOKUMENTACE DIVIZE / INCONVENIENCE GROUP' : 'OFFICIAL ARCHIVAL PHOTOGRAPHY / INCONVENIENCE GROUP'}</span>
          </div>
        </div>
      )}
    </div>
  );
}
