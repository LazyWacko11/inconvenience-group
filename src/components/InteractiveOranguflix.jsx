import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { adntAds } from '../data/adntAds';
import AdntBanner from './AdntBanner';
import {
  Tv, Play, Pause, Volume2, VolumeX, Globe, Sparkles, AlertCircle,
  Settings, Clock3, Shuffle, RefreshCw, Zap, Shield, Crown, Eye
} from 'lucide-react';

const mockShows = [
  {
    id: 'fan',
    title: 'The Wolf of Wall Street',
    requestedGenre: 'Drama / Finance',
    actualTitle: {
      cs: '10 Hodin točení stropního ventilátoru na plné obrátky',
      en: '10 Hours of Ceiling Fan Spinning at Maximum RPM'
    },
    actualDesc: {
      cs: 'Hypnotizující pohled na třílistý ventilátor Westinghouse v čekárně zubaře v Brně. Bez hudby, pouze šum motoru.',
      en: 'Mesmerizing footage of a three-blade Westinghouse ceiling fan in a dental clinic waiting room. Zero dialogue, high RPM.'
    },
    visualEmoji: '🌀⚙️',
    animationClass: 'spin-fast'
  },
  {
    id: 'mandarin',
    title: 'Succession: Season 5',
    requestedGenre: 'Corporate Thriller',
    actualTitle: {
      cs: 'Orangutan Dr. Pongidae pečlivě loupe mandarinku ve 4K HDR',
      en: 'Dr. Pongidae Methodically Peels a Mandarin in 4K HDR'
    },
    actualDesc: {
      cs: 'Exkluzivní pohled na našeho hlavního stratéga, jak s chirurgickou přesností odstraňuje bílá vlákna z citrusu.',
      en: 'Exclusive footage of our Chief Strategy Primate removing individual pith strands from organic citrus for 85 minutes.'
    },
    visualEmoji: '🦧🍊',
    animationClass: 'bounce-slow'
  },
  {
    id: 'gnomes',
    title: 'Stranger Things: The Final Season',
    requestedGenre: 'Sci-Fi / Horror',
    actualTitle: {
      cs: 'Dva sádroví trpaslíci bojují o nadvládu nad záhonem begónií',
      en: 'Two Plaster Garden Gnomes Locked in Silent Territorial Staredown'
    },
    actualDesc: {
      cs: 'Statická bezpečnostní kamera zabírá dva trpaslíky. Nic se nepohne po celých 180 minut stopáže.',
      en: 'Fixed security camera footage of two ceramic gnomes. Neither moves throughout the 3-hour broadcast.'
    },
    visualEmoji: '🍄🗿',
    animationClass: 'pulse-subtle'
  },
  {
    id: 'microwave',
    title: 'Oppenheimer',
    requestedGenre: 'Biographical Drama',
    actualTitle: {
      cs: 'Prázdná mikrovlnka točí talíř s jednou studenou fazolí',
      en: 'Microwave Rotating an Empty Glass Plate with a Single Cold Bean'
    },
    actualDesc: {
      cs: 'Monotónní bzučení magnetronu na 800 W. Napětí stoupá, ale k explozi nikdy nedojde.',
      en: 'Monotonous 800W hum. Suspense mounts exponentially, but zero physical detonation occurs.'
    },
    visualEmoji: '☢️🫘',
    animationClass: 'glow-yellow'
  },
  {
    id: 'duck-sink',
    title: 'Titanic: Director’s Cut',
    requestedGenre: 'Romance / Disaster',
    actualTitle: {
      cs: 'Žlutá gumová kachnička plave v napuštěném nerezovém dřezu',
      en: 'Single Rubber Duck Adrift in Stainless Steel Kitchen Sink'
    },
    actualDesc: {
      cs: 'Plovoucí kachnička naráží do houbičky na nádobí. Dramatická hudba zcela chybí.',
      en: 'Inanimate rubber duck gently collides with scotch-brite dish sponge. Dramatic strings omitted.'
    },
    visualEmoji: '🦆🌊',
    animationClass: 'float-water'
  }
];

export default function InteractiveOranguflix() {
  const { lang } = useLanguage();
  const isCs = lang === 'cs';

  // Video State
  const [selectedShow, setSelectedShow] = useState(mockShows[1]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(42);
  const [sumerianSubs, setSumerianSubs] = useState(false);
  const [primateCommentary, setPrimateCommentary] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);

  // Settings State (Automatic Skips in Seconds)
  const [autoSkipEnabled, setAutoSkipEnabled] = useState(true);
  const [skipIntervalSeconds, setSkipIntervalSeconds] = useState(6);
  const [skipMode, setSkipMode] = useState('both'); // 'time', 'show', 'both'
  const [countdown, setCountdown] = useState(6);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // Membership Tier (Free with Adn't side ads vs VIP)
  const [userTier, setUserTier] = useState('free'); // 'free' | 'vip'

  // Current side ads rotation
  const [leftAdIndex, setLeftAdIndex] = useState(0);
  const [rightAdIndex, setRightAdIndex] = useState(1);

  // Trigger skip function
  const triggerSkip = (forceMode) => {
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 550);

    const mode = forceMode || skipMode;

    if (mode === 'time') {
      setCurrentTime(Math.floor(Math.random() * 210) + 10);
    } else if (mode === 'show') {
      const otherShows = mockShows.filter((s) => s.id !== selectedShow.id);
      const nextShow = otherShows[Math.floor(Math.random() * otherShows.length)];
      setSelectedShow(nextShow);
      setCurrentTime(Math.floor(Math.random() * 90) + 5);
    } else {
      // Both: 50% chance show switch, 50% timestamp leap
      if (Math.random() > 0.5) {
        const otherShows = mockShows.filter((s) => s.id !== selectedShow.id);
        const nextShow = otherShows[Math.floor(Math.random() * otherShows.length)];
        setSelectedShow(nextShow);
      }
      setCurrentTime(Math.floor(Math.random() * 220) + 5);
    }

    // Also rotate side ads occasionally
    setLeftAdIndex((prev) => (prev + 1) % adntAds.length);
    setRightAdIndex((prev) => (prev + 2) % adntAds.length);
  };

  // Timer loop for playback and automatic skip countdown
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      // Advance playback time
      setCurrentTime((prev) => (prev >= 240 ? 1 : prev + 1));

      // Handle automatic skip countdown
      if (autoSkipEnabled && skipIntervalSeconds > 0) {
        setCountdown((prev) => {
          if (prev <= 1) {
            triggerSkip();
            return skipIntervalSeconds;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, autoSkipEnabled, skipIntervalSeconds, skipMode, selectedShow]);

  // Reset countdown when user changes skipIntervalSeconds
  const handleIntervalChange = (newSecs) => {
    const val = Math.max(1, Math.min(120, Number(newSecs) || 6));
    setSkipIntervalSeconds(val);
    setCountdown(val);
  };

  const currentLeftAd = adntAds[leftAdIndex % adntAds.length];
  const currentRightAd = adntAds[rightAdIndex % adntAds.length];

  return (
    <div className="interactive-module oranguflix-master-module">
      <div className="module-header">
        <div className="module-badge">
          <Tv size={16} />
          <span>{isCs ? 'ORANGUFLIX™ STREAMING ENGINE v5.0' : 'ORANGUFLIX™ STREAMING ENGINE v5.0'}</span>
        </div>
        <div className="oranguflix-header-row">
          <div>
            <h3>
              {isCs
                ? 'Schrödingerův Netflix s automatickými přeskoky & Adn\'t reklamami'
                : 'Schrödinger’s Streaming with Automated Time Skips & Adn\'t Banners'}
            </h3>
            <p>
              {isCs
                ? 'Oranguflix eliminuje rozhodování diváka. Zvolte si v nastavení interval přeskoků v sekundách – přehrávač bude sám nedobrovolně přeskakovat v čase i měnit pořady, zatímco v bocích běží nechtěné Adn\'t reklamy pro neplatící diváky.'
                : 'Oranguflix eliminates decision fatigue. Configure your involuntary skip frequency in seconds—the player automatically leaps through time and channels while unsuppressed Adn\'t side banners broadcast to free-tier viewers.'}
            </p>
          </div>

          <div className="tier-switch-box">
            <span className="tier-label">{isCs ? 'VÁŠ TARIF:' : 'VIEWER TIER:'}</span>
            <div className="tier-btn-toggle">
              <button
                className={`tier-btn ${userTier === 'free' ? 'active' : ''}`}
                onClick={() => setUserTier('free')}
              >
                <Eye size={13} />
                <span>{isCs ? 'Zdarma s Adn\'t reklamami' : 'Free (Adn\'t Ads)'}</span>
              </button>
              <button
                className={`tier-btn ${userTier === 'vip' ? 'active-vip' : ''}`}
                onClick={() => setUserTier('vip')}
              >
                <Crown size={13} />
                <span>{isCs ? 'Orangutan Banán VIP' : 'Banana VIP'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Oranguflix Layout with Sidebars */}
      <div className={`oranguflix-theatre-layout ${userTier === 'free' ? 'with-sidebars' : 'no-sidebars'}`}>
        {/* LEFT SIDEBAR: REAL ADN'T AD */}
        {userTier === 'free' && (
          <aside className="oranguflix-sidebar sidebar-left">
            <div className="sidebar-banner-header">
              <span className="free-viewer-pill">{isCs ? 'NEPLATÍCÍ DIVÁK' : 'FREE VIEWER'}</span>
              <small>{isCs ? 'Sponzorováno Adn\'t' : 'Adn\'t Sponsored'}</small>
            </div>
            <AdntBanner ad={currentLeftAd} variant="sidebar" />
          </aside>
        )}

        {/* CENTER: THE VIDEO PLAYER */}
        <div className="player-wrapper central-player">
          {/* Top show selector */}
          <div className="catalog-strip-nav">
            <div className="strip-top-flex">
              <span className="catalog-label">
                {isCs ? 'VYBERTE POŘAD (PŘEHRAJE SE VŠAK NÁHODNÁ VĚC):' : 'SELECT TITLE (PLAYER WILL IGNORE AND IMPROVISE):'}
              </span>

              {/* Automatic Skip Status Bar */}
              <div className="skip-status-indicator">
                <Clock3 size={13} />
                <span>
                  {autoSkipEnabled
                    ? (isCs
                        ? `Auto-přeskok za: ${countdown} s (${skipIntervalSeconds}s interval)`
                        : `Next auto-skip in: ${countdown}s (${skipIntervalSeconds}s interval)`)
                    : (isCs ? 'Auto-přeskok: Vypnut' : 'Auto-skip: Paused')}
                </span>
                <button
                  className="quick-settings-gear"
                  onClick={() => setShowSettingsModal(true)}
                  title={isCs ? 'Změnit interval přeskoků' : 'Configure skip interval'}
                >
                  <Settings size={14} />
                  <span>{isCs ? 'Nastavení přeskoků' : 'Settings'}</span>
                </button>
              </div>
            </div>

            <div className="show-selector">
              {mockShows.map((s) => (
                <button
                  key={s.id}
                  className={`show-btn ${selectedShow.id === s.id ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedShow(s);
                    triggerSkip('time');
                  }}
                >
                  <b>{s.title}</b>
                  <small>{s.requestedGenre}</small>
                </button>
              ))}
            </div>
          </div>

          {/* Video Screen */}
          <div className="video-player-screen">
            {isGlitching && (
              <div className="tv-static-glitch-overlay">
                <div className="glitch-text">
                  ⚡ {isCs ? 'ORANGUTAN PŘESKAKUJE DĚJ...' : 'PRIMATE RE-ROUTING STREAM...'} ⚡
                </div>
              </div>
            )}

            <div className={`video-display ${selectedShow.animationClass}`}>
              <div className="screen-emoji">{selectedShow.visualEmoji}</div>
              <div className="screen-overlay">
                <span className="live-status-pill">
                  {isPlaying ? (isCs ? 'PŘEHRÁVÁ SE' : 'STREAMING LIVE') : (isCs ? 'POZASTAVENO' : 'PAUSED')}
                </span>
                <h4 className="actual-title">
                  {selectedShow.actualTitle[lang] || selectedShow.actualTitle.cs}
                </h4>
                <p className="actual-desc">
                  {selectedShow.actualDesc[lang] || selectedShow.actualDesc.cs}
                </p>

                {sumerianSubs && (
                  <div className="sumerian-subtitle">
                    𒀭 𒅗 𒄖 𒍣 𒀭 𒊏 𒈨𒌍 (Translation: "Why are you still watching this?")
                  </div>
                )}

                {primateCommentary && (
                  <div className="primate-commentary-badge">
                    🦧 {isCs
                      ? 'Komentář orangutana: „OOF AAH OOF! (Banán byl lepší v minutě 12)“'
                      : 'Primate Commentary: "OOF OOF AAH! (Mandarin was riper at minute 12)"'}
                  </div>
                )}
              </div>
            </div>

            {/* Controls Bar */}
            <div className="player-controls-bar">
              <button
                className="ctrl-btn"
                onClick={() => setIsPlaying(!isPlaying)}
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </button>

              <div className="timeline-mock">
                <div
                  className="timeline-fill"
                  style={{ width: `${(currentTime / 240) * 100}%` }}
                />
              </div>
              <span className="time-display">{currentTime}:14 / 240:00</span>

              {/* Settings button */}
              <button
                className="ctrl-btn-text btn-settings-highlight"
                onClick={() => setShowSettingsModal(true)}
              >
                <Settings size={14} />
                <span>
                  {isCs ? `Interval: ${skipIntervalSeconds}s` : `Interval: ${skipIntervalSeconds}s`}
                </span>
              </button>

              {/* Subtitles toggle */}
              <button
                className={`ctrl-btn-text ${sumerianSubs ? 'active-toggle' : ''}`}
                onClick={() => setSumerianSubs(!sumerianSubs)}
              >
                <Globe size={14} />
                <span>{isCs ? 'Staroaramejsky' : 'Dead Subtitles'}</span>
              </button>

              {/* Audio toggle */}
              <button
                className={`ctrl-btn-text ${primateCommentary ? 'active-toggle' : ''}`}
                onClick={() => setPrimateCommentary(!primateCommentary)}
              >
                <Volume2 size={14} />
                <span>{isCs ? 'Komentář opice' : 'Primate Audio'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR: REAL ADN'T AD */}
        {userTier === 'free' && (
          <aside className="oranguflix-sidebar sidebar-right">
            <div className="sidebar-banner-header">
              <span className="free-viewer-pill">{isCs ? 'NEPLATÍCÍ DIVÁK' : 'FREE VIEWER'}</span>
              <small>{isCs ? 'Sponzorováno Adn\'t' : 'Adn\'t Sponsored'}</small>
            </div>
            <AdntBanner ad={currentRightAd} variant="sidebar" />
          </aside>
        )}
      </div>

      {/* VIP notification when ads are hidden */}
      {userTier === 'vip' && (
        <div className="vip-notice-banner fade-in mt-3">
          <Crown size={18} className="text-highlight" />
          <span>
            {isCs
              ? 'Oranguflix Banán VIP aktivní: Adn\'t reklamy v bocích byly ztlumeny. (Orangutan má však v režii povolen vyšší limit decibelů).'
              : 'Banana VIP Active: Adn\'t side banners hidden. (Primate control room volume has been amplified by 40%).'}
          </span>
        </div>
      )}

      {/* SETTINGS MODAL: CONFIGURE AUTOMATIC SKIPS IN SECONDS */}
      {showSettingsModal && (
        <div className="modal-backdrop" onClick={() => setShowSettingsModal(false)}>
          <div className="modal-content settings-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="brand">
                <Settings size={18} />
                <b>{isCs ? 'Nastavení automatických přeskoků Oranguflixu' : 'Oranguflix Involuntary Skip Settings'}</b>
              </div>
              <button className="icon-button" onClick={() => setShowSettingsModal(false)}>✕</button>
            </div>

            <div className="modal-body">
              <p className="settings-desc">
                {isCs
                  ? 'Nemusíte klikat na žádná tlačítka. Zde nastavte, jak často v sekundách má přehrávač automaticky skákat v čase nebo svévolně přepnout pořad.'
                  : 'Zero manual clicking required. Configure how frequently (in seconds) the player involuntarily jumps through time or abruptly switches programming.'}
              </p>

              {/* Enable / Disable toggle */}
              <div className="setting-toggle-row">
                <label className="checkbox-item full-width">
                  <input
                    type="checkbox"
                    checked={autoSkipEnabled}
                    onChange={(e) => setAutoSkipEnabled(e.target.checked)}
                  />
                  <div>
                    <b>{isCs ? 'Povolit automatické přeskoky' : 'Enable Automated Involuntary Skips'}</b>
                    <p>{isCs ? 'Když je zaškrtnuto, přehrávač sám v pravidelném intervalu provede skok.' : 'When active, the player will systematically disrupt continuity.'}</p>
                  </div>
                </label>
              </div>

              {/* Seconds slider and presets */}
              <div className="form-group mt-3">
                <div className="slider-label">
                  <span>{isCs ? 'Frekvence přeskoků v sekundách:' : 'Skip Interval in Seconds:'}</span>
                  <b className="text-highlight">{skipIntervalSeconds} {isCs ? 'sekund' : 'seconds'}</b>
                </div>

                <div className="quick-seconds-presets">
                  {[3, 6, 10, 15, 30].map((sec) => (
                    <button
                      key={sec}
                      type="button"
                      className={`sec-pill ${skipIntervalSeconds === sec ? 'active' : ''}`}
                      onClick={() => handleIntervalChange(sec)}
                    >
                      {sec}s {sec === 3 ? (isCs ? '(Chaos)' : '(Chaos)') : sec === 6 ? (isCs ? '(Doporučeno)' : '(Default)') : ''}
                    </button>
                  ))}
                </div>

                <input
                  type="range"
                  min={2}
                  max={45}
                  value={skipIntervalSeconds}
                  onChange={(e) => handleIntervalChange(e.target.value)}
                  className="petty-slider mt-2"
                />
              </div>

              {/* Skip Mode */}
              <div className="form-group">
                <label>{isCs ? 'Co se má každých ' + skipIntervalSeconds + ' sekund stát?' : 'Action Triggered Every ' + skipIntervalSeconds + 's:'}</label>
                <div className="radio-selection-list">
                  <label className={`radio-card ${skipMode === 'both' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="skipMode"
                      value="both"
                      checked={skipMode === 'both'}
                      onChange={() => setSkipMode('both')}
                    />
                    <div>
                      <b>{isCs ? 'Totální chaos (Střídá skoky v čase i změnu pořadu)' : 'Total Chaos (Alternates time leaps and channel cuts)'}</b>
                      <small>{isCs ? 'Nejautentičtější zážitek z Oranguflixu' : 'The definitive Oranguflix design intention'}</small>
                    </div>
                  </label>

                  <label className={`radio-card ${skipMode === 'time' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="skipMode"
                      value="time"
                      checked={skipMode === 'time'}
                      onChange={() => setSkipMode('time')}
                    />
                    <div>
                      <b>{isCs ? 'Pouze náhodný skok v čase (v rámci aktuálního videa)' : 'Timestamp Leaps Only (Within current video)'}</b>
                      <small>{isCs ? 'Skočí z 0:14 na 88:42, pak na 210:00' : 'Jumps from 0:14 to 88:42 to 210:00'}</small>
                    </div>
                  </label>

                  <label className={`radio-card ${skipMode === 'show' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="skipMode"
                      value="show"
                      checked={skipMode === 'show'}
                      onChange={() => setSkipMode('show')}
                    />
                    <div>
                      <b>{isCs ? 'Pouze přepnutí na jiný pořad' : 'Channel Switch Only (Cuts to completely different show)'}</b>
                      <small>{isCs ? 'Ze stropního ventilátoru okamžitě na mandarinku' : 'From ceiling fan straight to mandarin peeling'}</small>
                    </div>
                  </label>
                </div>
              </div>

              <button
                type="button"
                className="button button-dark full-width mt-3"
                onClick={() => setShowSettingsModal(false)}
              >
                {isCs ? 'Uložit a pokračovat ve sledování' : 'Save and Resume Chaos'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
