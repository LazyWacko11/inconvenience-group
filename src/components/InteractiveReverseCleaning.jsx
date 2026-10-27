import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Interactive3DViewer from './Interactive3DViewer';
import { Sparkles, Trash2, RefreshCw, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

export default function InteractiveReverseCleaning() {
  const { lang } = useLanguage();
  const isCs = lang === 'cs';

  const [messType, setMessType] = useState('corporate');
  const [deployed, setDeployed] = useState(false);
  const [stickyNotes, setStickyNotes] = useState(true);
  const [cushionBottle, setCushionBottle] = useState(true);

  const packages = {
    mild: {
      name: isCs ? 'Mírné nepohodlí' : 'The Mild Inconvenience',
      price: 99,
      cleanFee: 79,
      duration: isCs ? '45 sekund práce našich expertů' : '45 seconds of expert scattering',
      cleanupTime: isCs ? '20 minut vašeho úklidu' : '20 minutes of client confusion',
      items: isCs ? '200 papírů, 4 lahve, 1 krabice' : '200 paper scraps, 4 bottles, 1 box'
    },
    domestic: {
      name: isCs ? 'Domácí katastrofa' : 'The Domestic Disaster',
      price: 499,
      cleanFee: 249,
      duration: isCs ? '3 minuty uměleckého rozhazování' : '3 minutes of artistic debris dispersal',
      cleanupTime: isCs ? '3 hodiny archeologického bádání' : '3 hours of archaeological retrieval',
      items: isCs ? '50 kartonových krabic, bublinkové fólie, 1 lahev pod gaučem' : '50 boxes, bubble wrap, 1 hidden cushion bottle'
    },
    corporate: {
      name: isCs ? 'Korporátní apokalypsa' : 'The Corporate Apocalypse',
      price: 4999,
      cleanFee: 1999,
      duration: isCs ? '15 minut totálního rozkladu' : '15 minutes of executive devastation',
      cleanupTime: isCs ? '2 dny personálního auditu' : '2 full business days of HR triage',
      items: isCs ? '10 000 demotivačních lístečků, 300 krabic, všechny židle otočené ke zdi' : '10,000 unhelpful sticky notes, backward chairs, pens grouped by weight'
    }
  };

  const currentPkg = packages[messType];

  return (
    <div className="interactive-module">
      <div className="module-header">
        <div className="module-badge">
          <Sparkles size={16} />
          <span>{isCs ? 'REVERZNÍ ÚKLIDOVÁ KONZOLA' : 'REVERSE CLEANING DISPATCH CONSOLE'}</span>
        </div>
        <h3>{isCs ? 'Objednejte si profesionální zaneřádění prostoru' : 'Order Professional Architectural Disorder'}</h3>
        <p>
          {isCs
            ? 'Úklid je nuda. Naše vyškolené týmy přivezou čistý, recyklovatelný, nezapáchající odpad a umělecky ho rozmístí. Poté vám naúčtujeme poplatek za jeho odvoz a tentýž odpad použijeme u dalšího zákazníka.'
            : 'Traditional cleaning firms reduce entropy. Our uniformed squads dispatch certified clean, odorless, reusable rubbish, bill for creation, and bill again for retrieval.'}
        </p>
      </div>

      {/* 3D Model & Archival Photo Showcase */}
      <Interactive3DViewer modelType="mess" fallbackImage="/images/reverse-cleaning.png" />

      <div className="clean-grid mt-4">
        <div className="clean-controls">
          <label className="input-label">{isCs ? 'Zvolte úroveň chaosu:' : 'Select Disorder Tier:'}</label>
          <div className="tier-cards-row">
            {Object.entries(packages).map(([key, pkg]) => (
              <button
                type="button"
                key={key}
                className={`clean-tier-card ${messType === key ? 'active' : ''}`}
                onClick={() => {
                  setMessType(key);
                  setDeployed(false);
                }}
              >
                <h4>{pkg.name}</h4>
                <div className="tier-price">€{pkg.price}</div>
                <small>{pkg.duration}</small>
              </button>
            ))}
          </div>

          <div className="form-group mt-4">
            <label>{isCs ? 'Doplňkové nepříjemnosti:' : 'Supplementary Inconveniences:'}</label>
            <div className="checkbox-list">
              <label className="checkbox-item">
                <input
                  type="checkbox"
                  checked={cushionBottle}
                  onChange={(e) => setCushionBottle(e.target.checked)}
                />
                <div>
                  <b>{isCs ? 'Prázdná PET lahev pod polštářem gauče' : 'Hidden Bottle Under Cushion'}</b>
                  <p>{isCs ? 'Zdarma v ceně. Zaručeně na ni někdo nečekaně dosedne.' : 'Complimentary surprise. Tactile discovery guaranteed.'}</p>
                </div>
              </label>

              <label className="checkbox-item">
                <input
                  type="checkbox"
                  checked={stickyNotes}
                  onChange={(e) => setStickyNotes(e.target.checked)}
                />
                <div>
                  <b>{isCs ? '10 000 demotivačních lístečků s citáty z porad' : '10,000 Unhelpful Motivational Sticky Notes'}</b>
                  <p>{isCs ? 'Každý lísteček obsahuje text jako „Tohle mohl být e-mail“ nebo „Zesynchronizujme se offline“.' : 'Each note features phrases such as "Let’s take this offline" or "Synergize quietly".'}</p>
                </div>
              </label>
            </div>
          </div>

          <button
            type="button"
            className="button button-dark full-width mt-3"
            onClick={() => setDeployed(true)}
          >
            <Trash2 size={16} />
            {isCs ? 'Spustit simulaci nasazení nepořádku' : 'Simulate Disorder Deployment'}
          </button>
        </div>

        <div className="clean-lifecycle">
          <div className="summary-card">
            <span className="summary-label">{isCs ? 'CYKLUS NEKONEČNÉHO ODPADU' : 'INFINITE RUBBISH CIRCULAR ECONOMY'}</span>
            <div className="lifecycle-steps">
              <div className="step-row">
                <span className="step-num">1</span>
                <div>
                  <b>{isCs ? 'Rozházení odpadu:' : 'Disorder Creation Fee:'}</b>
                  <span>€{currentPkg.price} ({isCs ? 'Práce: 45 sekund' : 'Effort: 45 seconds'})</span>
                </div>
              </div>
              <div className="step-row">
                <span className="step-num">2</span>
                <div>
                  <b>{isCs ? 'Úklid a svoz odpadu:' : 'Mandatory Retrieval Fee:'}</b>
                  <span>€{currentPkg.cleanFee} ({isCs ? 'Abychom ho mohli znovu použít' : 'Preserves assets for next client'})</span>
                </div>
              </div>
              <div className="step-row">
                <span className="step-num">3</span>
                <div>
                  <b>{isCs ? 'Celkový zisk skupiny:' : 'Total Group Margin:'}</b>
                  <span className="text-highlight">€{currentPkg.price + currentPkg.cleanFee} ({isCs ? 'Z téže jedné hromady krabic' : 'From one single pile of cardboard'})</span>
                </div>
              </div>
            </div>

            {deployed && (
              <div className="deployment-result fade-in">
                <CheckCircle2 size={24} className="text-success" />
                <div>
                  <h4>{isCs ? 'Prostor byl úspěšně zaneřáděn!' : 'Disorder Successfully Deployed!'}</h4>
                  <p>
                    {isCs
                      ? `Do vašeho prostoru bylo umístěno ${currentPkg.items}. Náš Chief Mess Officer zrovna schválil úhel naklonění plastové lahve.`
                      : `Your premises have received ${currentPkg.items}. Chief Mess Officer has signed off on bottle angles.`}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
