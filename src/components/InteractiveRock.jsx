import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Gem, Award, Check, RefreshCw } from 'lucide-react';

export default function InteractiveRock() {
  const { lang } = useLanguage();
  const isCs = lang === 'cs';

  const [rockName, setRockName] = useState(isCs ? 'Sir Křemen III.' : 'Sir Granite III');
  const [glasses, setGlasses] = useState(true);
  const [bowtie, setBowtie] = useState(true);
  const [hat, setHat] = useState(false);
  const [certified, setCertified] = useState(false);

  return (
    <div className="interactive-module">
      <div className="module-header">
        <div className="module-badge">
          <Gem size={16} />
          <span>{isCs ? 'SALÓN STYLINGU MINERÁLŮ & LEASING' : 'MINERAL HAUTE COUTURE & LEASING'}</span>
        </div>
        <h3>{isCs ? 'Upravte si svůj pronajatý kámen a vystavte mu rodokmen' : 'Customize Your Leased Geological Companion'}</h3>
        <p>
          {isCs
            ? 'Kámen je nejvěrnější společník na světě. Neštěká, nepotřebuje krmení a zůstane přesně tam, kde ho necháte. Přidejte mu styl!'
            : 'Rocks provide unwavering emotional stability. Zero vet bills, zero shed fur, total immobility across decades. Elevate your stone’s dignity.'}
        </p>
      </div>

      <div className="rock-customizer-grid">
        <div className="rock-preview-stage">
          <div className="rock-avatar-box">
            <div className="rock-stone">🪨</div>
            {hat && <div className="rock-hat">🎩</div>}
            {glasses && <div className="rock-glasses">🕶️</div>}
            {bowtie && <div className="rock-bowtie">🎀</div>}
          </div>
          <h4>{rockName || 'Bezejmenný kámen'}</h4>
          <span className="rock-pedigree-tag">
            {isCs ? 'Certifikace: 400 milionů let nehybnosti' : 'Pedigree: 400 Million Years of Inertia'}
          </span>
        </div>

        <div className="rock-controls">
          <div className="form-group">
            <label>{isCs ? 'Jméno vašeho kamene:' : 'Companion Designation:'}</label>
            <input
              type="text"
              value={rockName}
              onChange={(e) => setRockName(e.target.value)}
              placeholder="e.g. Lord Balvan"
            />
          </div>

          <div className="form-group">
            <label>{isCs ? 'Luxusní výbava a doplňky:' : 'Haute Couture Upgrades:'}</label>
            <div className="checkbox-list">
              <label className="checkbox-item">
                <input
                  type="checkbox"
                  checked={glasses}
                  onChange={(e) => setGlasses(e.target.checked)}
                />
                <div>
                  <b>{isCs ? 'Polarizační sluneční brýle UV400 (+€15)' : 'Polarized UV400 Stone Eyewear (+€15)'}</b>
                  <p>{isCs ? 'Chrání křemičitany před oslněním na konferenčním stolku.' : 'Protects feldspar crystalline matrix from living room lighting.'}</p>
                </div>
              </label>

              <label className="checkbox-item">
                <input
                  type="checkbox"
                  checked={bowtie}
                  onChange={(e) => setBowtie(e.target.checked)}
                />
                <div>
                  <b>{isCs ? 'Hedvábný motýlek pro formální události (+€19)' : 'Silk Black-Tie Bowtie (+€19)'}</b>
                  <p>{isCs ? 'Ideální pro svatby, recepce a valné hromady akcionářů.' : 'Essential attire for quarterly earnings announcements.'}</p>
                </div>
              </label>

              <label className="checkbox-item">
                <input
                  type="checkbox"
                  checked={hat}
                  onChange={(e) => setHat(e.target.checked)}
                />
                <div>
                  <b>{isCs ? 'Plstěný cylindr pro geology (+€24)' : 'Aristocratic Top Hat (+€24)'}</b>
                  <p>{isCs ? 'Propůjčuje kameni vzezření viktoriánského diplomata.' : 'Imbues your mineral with 19th-century diplomatic poise.'}</p>
                </div>
              </label>
            </div>
          </div>

          <button
            type="button"
            className="button button-dark full-width mt-3"
            onClick={() => setCertified(true)}
          >
            <Award size={16} />
            {isCs ? 'Vystavit certifikát nehybnosti' : 'Generate Provenance Certificate'}
          </button>

          {certified && (
            <div className="alert-box success mt-3 fade-in">
              <Check size={18} />
              <span>
                {isCs
                  ? `Certifikát pro ${rockName} úspěšně vystaven! Kámen má zaplacené pojištění proti odkutálení ze stolu.`
                  : `Certificate of Authenticity issued for ${rockName}. Downhill roll-prevention policy fully activated.`}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
