import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  Compass, MapPin, Plus, Trash2, RefreshCw, AlertTriangle,
  ExternalLink, Sparkles, Navigation, Layers, CheckCircle2
} from 'lucide-react';

const defaultStops = [
  {
    id: 'start',
    name: { cs: 'Výchozí bod: Váš obývací pokoj (Praha)', en: 'Origin: Your Living Room (Prague)' },
    coords: [50.0755, 14.4378],
    type: 'start',
    emoji: '🏠',
    desc: {
      cs: 'Máte chuť na čerstvý rohlík. Obchod je přes ulici, 150 metrů daleko.',
      en: 'Craving a fresh croissant. The bakery is directly across the street (150m away).'
    },
    delay: '0 min'
  },
  {
    id: 'diner',
    name: { cs: 'Nehygienické bistro „U Mrože“ (Vladivostok)', en: 'Questionable Roadside Diner "The Walrus" (Vladivostok)' },
    coords: [43.1155, 131.8855],
    type: 'diner',
    emoji: '🍔',
    desc: {
      cs: 'Zastávka na vlažný boršč z řepy a 4hodinové čekání na obsluhu, která hledá lžíci.',
      en: 'Mandatory pit-stop for lukewarm borscht and a 4-hour delay while the waiter searches for a spoon.'
    },
    delay: '+14 dní'
  },
  {
    id: 'monument',
    name: { cs: 'Obří betonový památník krmné řepy (Nebraska, USA)', en: 'World’s Largest Concrete Turnip Monument (Nebraska)' },
    coords: [41.4925, -99.9018],
    type: 'monument',
    emoji: '🗿',
    desc: {
      cs: 'Povinná návštěva darovacího obchůdku a focení se starostou města v kostýmu řepy.',
      en: 'Mandatory gift shop tour and formal photo-op with the municipal mayor dressed as a root vegetable.'
    },
    delay: '+8 dní'
  },
  {
    id: 'everest',
    name: { cs: 'Severní sedlo Mount Everestu (Tibet)', en: 'Mount Everest North Col Checkpoint (Tibet)' },
    coords: [27.9881, 86.9250],
    type: 'nature',
    emoji: '🏔️',
    desc: {
      cs: 'Preventivní aklimatizační tábor pro kontrolu, zda netrpíte výškovou nemocí před nákupem pečiva.',
      en: 'Precautionary high-altitude acclimatization camp before descending to the corner store.'
    },
    delay: '+22 dní'
  },
  {
    id: 'antarctica',
    name: { cs: 'Výzkumná stanice tučňáků McMurdo (Antarktida)', en: 'Penguin Observation Facility McMurdo (Antarctica)' },
    coords: [-77.8419, 166.6863],
    type: 'nature',
    emoji: '🐧',
    desc: {
      cs: 'Řidič Orangutan Expressu minul odbočku. Povinné podepsání petice za práva korýšů.',
      en: 'Primate navigation missed the exit. Mandatory signing of Antarctic krill rights accord.'
    },
    delay: '+34 dní'
  },
  {
    id: 'trench',
    name: { cs: 'Mariánský příkop (Dno Tichého oceánu)', en: 'Mariana Trench Ocean Floor Submersible Waypoint' },
    coords: [11.3493, 142.1996],
    type: 'ocean',
    emoji: '🌊',
    desc: {
      cs: 'Sestup v šlapacím ponorném člunu do hloubky 11 000 m za účelem vylovení ozdobné mušle.',
      en: 'Descent via pedal-powered submersible to retrieve an artisanal deep-sea souvenir.'
    },
    delay: '+19 dní'
  },
  {
    id: 'end',
    name: { cs: 'Cíl: Rohová večerka naproti přes ulici', en: 'Destination: Corner Bakery Across the Street' },
    coords: [50.0760, 14.4385],
    type: 'end',
    emoji: '🥐',
    desc: {
      cs: 'Dorazili jste na místo. Večerka má právě polední pauzu a bagety jsou vyprodány.',
      en: 'You have arrived. The store concluded operating hours 3 minutes ago.'
    },
    delay: '+3 minuty'
  }
];

export default function InteractiveMaps() {
  const { lang } = useLanguage();
  const isCs = lang === 'cs';

  const mapContainerRef = useRef(null);
  const leafletMapRef = useRef(null);
  const markersRef = useRef([]);
  const polylineRef = useRef(null);

  const [stops, setStops] = useState(defaultStops);
  const [selectedStop, setSelectedStop] = useState(null);
  const [newStopName, setNewStopName] = useState('');
  const [newStopCategory, setNewStopCategory] = useState('diner');

  // Initialize and update Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!leafletMapRef.current) {
      // Create map
      const map = L.map(mapContainerRef.current, {
        center: [25, 20],
        zoom: 2,
        minZoom: 1,
        maxZoom: 14,
        scrollWheelZoom: true
      });

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | InConvenience Maps™',
        maxZoom: 18
      }).addTo(map);

      leafletMapRef.current = map;
    }

    const map = leafletMapRef.current;

    // Clear old markers & lines
    markersRef.current.forEach((m) => map.removeLayer(m));
    markersRef.current = [];
    if (polylineRef.current) {
      map.removeLayer(polylineRef.current);
    }

    // Custom DivIcon creator
    const createCustomPin = (stop, index) => {
      const isStart = stop.type === 'start';
      const isEnd = stop.type === 'end';
      const pinClass = isStart ? 'pin-start' : isEnd ? 'pin-end' : 'pin-waypoint';

      return L.divIcon({
        className: 'custom-map-icon',
        html: `
          <div class="map-marker-bubble ${pinClass}">
            <span class="marker-emoji">${stop.emoji}</span>
            <span class="marker-number">${index + 1}</span>
          </div>
        `,
        iconSize: [36, 44],
        iconAnchor: [18, 44],
        popupAnchor: [0, -40]
      });
    };

    // Add Markers
    const latLngs = [];
    stops.forEach((stop, idx) => {
      latLngs.push(stop.coords);
      const marker = L.marker(stop.coords, { icon: createCustomPin(stop, idx) }).addTo(map);

      const title = stop.name[lang] || stop.name.cs;
      const desc = stop.desc[lang] || stop.desc.cs;

      const popupContent = `
        <div class="leaflet-custom-popup">
          <div class="popup-header">
            <span class="popup-badge">${stop.emoji} ZASTÁVKA #${idx + 1}</span>
            <span class="popup-delay">${stop.delay}</span>
          </div>
          <h4>${title}</h4>
          <p>${desc}</p>
          <div class="popup-footer">
            <small>Optimalita nepohodlí: 99.8%</small>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);
      marker.on('click', () => setSelectedStop(stop));
      markersRef.current.push(marker);
    });

    // Draw connecting planetary detour polyline
    const routeLine = L.polyline(latLngs, {
      color: '#e5bd58',
      weight: 4,
      dashArray: '8, 8',
      lineCap: 'round',
      lineJoin: 'round'
    }).addTo(map);
    polylineRef.current = routeLine;

    // Fit bounds to show the whole world route
    try {
      map.fitBounds(routeLine.getBounds(), { padding: [40, 40] });
    } catch (e) {
      // fallback
    }
  }, [stops, lang]);

  // Zoom to stop when clicked in list
  const handleSelectStop = (stop, idx) => {
    setSelectedStop(stop);
    if (leafletMapRef.current && markersRef.current[idx]) {
      leafletMapRef.current.setView(stop.coords, 5, { animate: true });
      markersRef.current[idx].openPopup();
    }
  };

  // Add custom unnecessary stop
  const handleAddStop = (e) => {
    e.preventDefault();
    if (!newStopName.trim()) return;

    // Generate random coordinates in unusual locations
    const randomLat = (Math.random() - 0.5) * 120;
    const randomLng = (Math.random() - 0.5) * 340;

    const emojiMap = {
      diner: '🍔',
      monument: '🗿',
      nature: '🌋',
      ocean: '🛸'
    };

    const newStop = {
      id: 'custom-' + Date.now(),
      name: { cs: newStopName.trim(), en: newStopName.trim() },
      coords: [randomLat, randomLng],
      type: newStopCategory,
      emoji: emojiMap[newStopCategory] || '📍',
      desc: {
        cs: 'Zákazníkem přidaná naprosto zbytečná zastávka. Trasa se prodlužuje o dalších 4 200 km.',
        en: 'User-specified completely unnecessary detour point. Journey extended by another 4,200 km.'
      },
      delay: `+${Math.floor(Math.random() * 20) + 5} dní`
    };

    // Insert before the last stop (destination)
    setStops((prev) => {
      const copy = [...prev];
      copy.splice(copy.length - 1, 0, newStop);
      return copy;
    });

    setNewStopName('');
  };

  // Remove stop
  const handleRemoveStop = (id) => {
    setStops((prev) => prev.filter((s) => s.id !== id || s.type === 'start' || s.type === 'end'));
  };

  return (
    <div className="interactive-module maps-master-module">
      <div className="module-header">
        <div className="module-badge">
          <Compass size={16} />
          <span>{isCs ? 'SKUTEČNÁ SATELITNÍ NAVIGACE INCONVENIENCE MAPS™' : 'INCONVENIENCE MAPS™ LIVE SATELLITE ENGINE'}</span>
        </div>
        <h3>
          {isCs
            ? 'Skutečná mapa s plánovačem monumentálních oklik a mezizastávek'
            : 'Interactive Map with Unnecessary Dinners, Monuments & Detours'}
        </h3>
        <p>
          {isCs
            ? 'Přímá cesta je urážkou lidského intelektu. Naše interaktivní mapa vezme vaši 150metrovou cestu z obýváku do protější večerky a naplánuje povinné zastávky v nehygienickém bistru ve Vladivostoku, u obřího betonového tuřínu i na dně Mariánského příkopu.'
            : 'Direct routes lack character. Our global map re-engineers a 150-meter stroll to the bakery into a planetary odyssey with mandatory stops at roadside diners, obscure turnip monuments, and deep-sea trenches.'}
        </p>
      </div>

      {/* REAL LEAFLET MAP CONTAINER */}
      <div className="leaflet-map-wrapper">
        <div ref={mapContainerRef} className="leaflet-map-target" />
        <div className="map-live-tag">
          <span className="live-dot" />
          <span>{isCs ? 'ŽIVÁ MAPA DETOUR ENGINE' : 'LIVE GLOBAL DETOUR ENGINE'}</span>
        </div>
      </div>

      {/* TRIP STATS BAR */}
      <div className="map-stats-strip mt-3">
        <div className="stat-pill">
          <small>{isCs ? 'CELKOVÁ DÉLKA TRASY' : 'TOTAL ROUTE DISTANCE'}</small>
          <b>42 850 km</b>
        </div>
        <div className="stat-pill">
          <small>{isCs ? 'CELKOVÉ ZDRŽENÍ' : 'ESTIMATED DELAY'}</small>
          <b>128 {isCs ? 'dní, 16 hodin' : 'days, 16 hours'}</b>
        </div>
        <div className="stat-pill">
          <small>{isCs ? 'POČET ZBYTEČNÝCH ZASTÁVEK' : 'UNNECESSARY WAYPOINTS'}</small>
          <b className="text-highlight">{stops.length - 2} {isCs ? 'odboček' : 'waypoints'}</b>
        </div>
        <div className="stat-pill">
          <small>{isCs ? 'INDEX NEPOHODLÍ' : 'INCONVENIENCE RATING'}</small>
          <b className="text-danger">99.9%</b>
        </div>
      </div>

      {/* ADD NEW UNNECESSARY STOP FORM */}
      <div className="add-stop-panel mt-4">
        <h4>{isCs ? '➕ Přidat další zbytečnou mezizastávku (Diner, Památník, Příkop)' : '➕ Inject Custom Unnecessary Waypoint (Diner, Monument, Hazard)'}</h4>
        <form onSubmit={handleAddStop} className="add-stop-form">
          <input
            type="text"
            value={newStopName}
            onChange={(e) => setNewStopName(e.target.value)}
            placeholder={isCs ? 'např. Obří socha plyšového medvěda u dálnice D1' : 'e.g. World’s Dustiest Pancake Diner in Gobi'}
            className="stop-input"
          />
          <select
            value={newStopCategory}
            onChange={(e) => setNewStopCategory(e.target.value)}
            className="stop-select"
          >
            <option value="diner">{isCs ? '🍔 Nehygienické bistro' : '🍔 Roadside Diner'}</option>
            <option value="monument">{isCs ? '🗿 Podivný památník' : '🗿 Obscure Monument'}</option>
            <option value="nature">{isCs ? '🌋 Extrémní přírodní překážka' : '🌋 Natural Hazard'}</option>
            <option value="ocean">{isCs ? '🛸 Podivná anomálie' : '🛸 Cosmic Anomaly'}</option>
          </select>
          <button type="submit" className="button button-dark">
            <Plus size={16} />
            <span>{isCs ? 'Vložit do trasy' : 'Inject Stop'}</span>
          </button>
        </form>
      </div>

      {/* WAYPOINTS INTERACTIVE LIST */}
      <div className="waypoints-inspector mt-4">
        <h4>{isCs ? 'Podrobný itinerář mezizastávek (Kliknutím přiblížíte na mapě):' : 'Waypoints Itinerary (Click to zoom on map):'}</h4>
        <div className="waypoints-grid">
          {stops.map((stop, idx) => (
            <div
              key={stop.id}
              className={`waypoint-card ${selectedStop?.id === stop.id ? 'active' : ''} ${stop.type}`}
              onClick={() => handleSelectStop(stop, idx)}
            >
              <div className="card-top-row">
                <span className="card-index-pill">
                  {stop.type === 'start' ? 'START' : stop.type === 'end' ? 'CÍL' : `#${idx + 1}`}
                </span>
                <span className="card-delay-tag">{stop.delay}</span>
              </div>
              <div className="card-title-row">
                <span className="card-emoji">{stop.emoji}</span>
                <b>{stop.name[lang] || stop.name.cs}</b>
              </div>
              <p className="card-desc">{stop.desc[lang] || stop.desc.cs}</p>

              {stop.type !== 'start' && stop.type !== 'end' && (
                <button
                  type="button"
                  className="remove-stop-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveStop(stop.id);
                  }}
                  title={isCs ? 'Odstranit tuto zastávku' : 'Remove stop'}
                >
                  <Trash2 size={13} />
                  <span>{isCs ? 'Zrušit odbočku' : 'Skip stop'}</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
