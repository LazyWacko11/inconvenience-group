import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import InteractiveMaps from '../components/InteractiveMaps';
import InteractiveCalculator from '../components/InteractiveCalculator';
import InteractiveMobility from '../components/InteractiveMobility';
import InteractivePettyPayback from '../components/InteractivePettyPayback';
import { Compass, Clock3, Plane, Skull, Sparkles } from 'lucide-react';

export default function Tools() {
  const { lang, t } = useLanguage();
  const isCs = lang === 'cs';

  const [activeTab, setActiveTab] = useState('maps');

  return (
    <main className="page-shell">
      <section className="page-hero container">
        <div className="eyebrow"><span className="eyebrow-dot" />{isCs ? 'DIGITÁLNÍ VEŘEJNÁ SLUŽBA / 2026' : 'PUBLIC DIGITAL SERVICES / 2026'}</div>
        <h1>
          {isCs ? 'Centrum bezplatných' : 'The Free Digital'}
          <br />
          <em>{isCs ? 'nepohodlných nástrojů.' : 'InConvenience Suite.'}</em>
        </h1>
        <p>
          {isCs
            ? 'Vedení InConvenience Group velkoryse uvolnilo tyto digitální technologie zdarma, aby si nepohodlí mohl vychutnat každý občan bez ohledu na příjem.'
            : 'The Board of Directors has democratized strategic inefficiency by releasing our proprietary tools at zero cost to the global public.'}
        </p>

        <div className="tools-tab-bar mt-4">
          <button
            className={`tool-pill ${activeTab === 'maps' ? 'active' : ''}`}
            onClick={() => setActiveTab('maps')}
          >
            <Compass size={17} />
            <span>{isCs ? 'InConvenience Maps™' : 'InConvenience Maps™'}</span>
          </button>
          <button
            className={`tool-pill ${activeTab === 'calc' ? 'active' : ''}`}
            onClick={() => setActiveTab('calc')}
          >
            <Clock3 size={17} />
            <span>{isCs ? 'Absurdní kalkulačka™' : 'Absurd Calculator™'}</span>
          </button>
          <button
            className={`tool-pill ${activeTab === 'mobility' ? 'active' : ''}`}
            onClick={() => setActiveTab('mobility')}
          >
            <Plane size={17} />
            <span>{isCs ? 'Let Nikam & Sledování zásilek' : 'Nowhere Flight & Tracker'}</span>
          </button>
          <button
            className={`tool-pill ${activeTab === 'petty' ? 'active' : ''}`}
            onClick={() => setActiveTab('petty')}
          >
            <Skull size={17} />
            <span>{isCs ? 'PettyPayback™ AI Odveta' : 'PettyPayback™ AI Revenge'}</span>
          </button>
        </div>
      </section>

      <section className="container catalog-section">
        <div className="tool-active-container">
          {activeTab === 'maps' && <InteractiveMaps />}
          {activeTab === 'calc' && <InteractiveCalculator />}
          {activeTab === 'mobility' && <InteractiveMobility />}
          {activeTab === 'petty' && <InteractivePettyPayback />}
        </div>
      </section>
    </main>
  );
}
