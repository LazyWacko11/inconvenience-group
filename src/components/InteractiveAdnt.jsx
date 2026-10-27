import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { adntAds } from '../data/adntAds';
import AdntBanner from './AdntBanner';
import {
  MegaphoneOff, DollarSign, VolumeX, AlertTriangle, ShieldCheck,
  RefreshCw, Eye, Sparkles, SlidersHorizontal, CheckCircle2
} from 'lucide-react';

export default function InteractiveAdnt() {
  const { lang } = useLanguage();
  const isCs = lang === 'cs';

  const [activeTab, setActiveTab] = useState('vault');

  // Bidding state
  const [silenceBid, setSilenceBid] = useState(5000);
  const [competitorBid, setCompetitorBid] = useState(3500);

  // Custom Quote state
  const [customBrand, setCustomBrand] = useState(isCs ? 'Moje Nešikovná Firma s.r.o.' : 'My Questionable Brand Ltd.');
  const [embarrassmentLevel, setEmbarrassmentLevel] = useState(3);
  const [customCalculated, setCustomCalculated] = useState(false);

  const isSilenced = silenceBid >= competitorBid;

  const quotePrice = Math.round(2500 + embarrassmentLevel * 2200);

  return (
    <div className="interactive-module">
      <div className="module-header">
        <div className="module-badge">
          <MegaphoneOff size={16} />
          <span>{isCs ? "CENTRÁLA AGENTURY ADN'T™" : "ADN'T™ SILENCE COMMAND HUB"}</span>
        </div>
        <h3>
          {isCs
            ? "Adn't™: Podívejte se na skutečné reklamy, které někdo zapomněl umlčet"
            : "Adn't™: Inspect Real Advertisements That Leaked from Our Vault"}
        </h3>
        <p>
          {isCs
            ? 'Běžné agentury vám účtují za to, aby vás lidé viděli. My vám účtujeme za to, aby vaše nejhorší nápady zůstaly pod zámkem. Zde si můžete prohlédnout skutečné uniklé reklamy firem, které včas nezaplatily výkupné.'
            : 'Conventional agencies charge to broadcast your brand. Adn’t charges to enforce absolute invisibility. Below is our vault of real, unsuppressed advertisements whose sponsors failed to wire their silence retainers.'}
        </p>
      </div>

      <div className="adnt-tabs-nav">
        <button
          className={`adnt-tab-btn ${activeTab === 'vault' ? 'active' : ''}`}
          onClick={() => setActiveTab('vault')}
        >
          <Eye size={16} />
          <span>{isCs ? 'Trezor uniklých reklam (Živé ukázky)' : 'Live Leaked Ad Vault (Inspect Ads)'}</span>
        </button>
        <button
          className={`adnt-tab-btn ${activeTab === 'bidding' ? 'active' : ''}`}
          onClick={() => setActiveTab('bidding')}
        >
          <VolumeX size={16} />
          <span>{isCs ? 'Aukční válka o ticho' : 'Silence Bidding War'}</span>
        </button>
        <button
          className={`adnt-tab-btn ${activeTab === 'quote' ? 'active' : ''}`}
          onClick={() => setActiveTab('quote')}
        >
          <DollarSign size={16} />
          <span>{isCs ? 'Kalkulátor výkupného pro vaši firmu' : 'Calculate Silence Retainer'}</span>
        </button>
      </div>

      <div className="adnt-tab-content mt-4">
        {/* TAB 1: VAULT OF REAL TERRIBLE ADS */}
        {activeTab === 'vault' && (
          <div className="adnt-vault-view fade-in">
            <div className="vault-banner-intro">
              <AlertTriangle size={20} className="text-danger" />
              <div>
                <b>{isCs ? 'AKTIVNÍ ÚNIKY Z KARANTÉNY ADN\'T' : 'ACTIVE ADN\'T QUARANTINE BREACHES'}</b>
                <p>
                  {isCs
                    ? 'Následující reklamy jsou skutečné marketingové katastrofy, které se právě teď zobrazují neplatícím zákazníkům na internetu a na Oranguflixu. Klikněte na „Zaplatit výkupné“, abyste vyzkoušeli okamžité nasazení cenzury!'
                    : 'The following advertisements are certified PR disasters currently being broadcast to free viewers across the web and on Oranguflix. Click "Pay Silence Ransom" to test our real-time blackout stamp!'}
                </p>
              </div>
            </div>

            <div className="vault-cards-stack">
              {adntAds.map((ad) => (
                <AdntBanner key={ad.id} ad={ad} variant="full" />
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: BIDDING WAR */}
        {activeTab === 'bidding' && (
          <div className="adnt-bidding-tab fade-in">
            <div className="adnt-bidding-grid">
              <div className="bidding-card">
                <h4>{isCs ? 'Vaše nabídka za ticho (Silence Retention):' : 'Your Silence Retention Retainer:'}</h4>
                <div className="bid-price">€{silenceBid.toLocaleString()}</div>
                <p>
                  {isCs
                    ? 'Platíte za to, aby váš trapný spot zůstal bezpečně v trezoru a neobjevil se na Oranguflixu.'
                    : 'Retainer paid to keep your cringe-inducing TV commercial safely locked away from Oranguflix viewers.'}
                </p>
                <div className="button-group">
                  <button
                    className="button button-dark"
                    onClick={() => setSilenceBid((prev) => prev + 1000)}
                  >
                    + €1,000 {isCs ? 'za další měsíc ticha' : 'for deeper silence'}
                  </button>
                  <button
                    className="button button-light"
                    onClick={() => setSilenceBid((prev) => Math.max(1000, prev - 1000))}
                  >
                    - €1,000
                  </button>
                </div>
              </div>

              <div className="bidding-card competitor">
                <h4>{isCs ? 'Nabídka vašeho konkurenta na odvysílání:' : 'Rival Competitor Counter-Bid to Broadcast:'}</h4>
                <div className="bid-price text-danger">€{competitorBid.toLocaleString()}</div>
                <p>
                  {isCs
                    ? 'Konkurence platí za to, aby vaši ostudnou reklamu viděly miliony lidí v postranních panelech.'
                    : 'Competitor offering cash incentives to force your embarrassing ad into banner slots across the network.'}
                </p>
                <div className="button-group">
                  <button
                    className="button button-dark"
                    onClick={() => setCompetitorBid((prev) => prev + 1500)}
                  >
                    + €1,500 {isCs ? 'přihodit za konkurenci' : 'competitor pressure'}
                  </button>
                </div>
              </div>
            </div>

            <div className="auction-verdict mt-4">
              {isSilenced ? (
                <div className="alert-box success">
                  <ShieldCheck size={24} />
                  <div>
                    <b>{isCs ? 'STAV: DOKONALÉ TICHO (100% INVISIBILITY)' : 'STATUS: PRISTINE SILENCE (100% INVISIBILITY)'}</b>
                    <p>
                      {isCs
                        ? `Vaše nabídka (€${silenceBid.toLocaleString()}) převyšuje konkurenci. Vaše reklama je bezpečně uzamčena a nikdo ji neuvidí.`
                        : `Your retainer (€${silenceBid.toLocaleString()}) exceeds rival bids. Your reputation remains artificially intact.`}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="alert-box danger">
                  <AlertTriangle size={24} />
                  <div>
                    <b>{isCs ? 'POZOR: KONKURENCE NABÍDLA VÍC! REKLAMA SE VYSÍLÁ!' : 'BREACH: RIVAL HAS OUTBID YOU! ADVERTISING COMMENCED!'}</b>
                    <p>
                      {isCs
                        ? `Konkurence zaplatila €${competitorBid.toLocaleString()}. Váš trapný spot právě běží v hlavním vysílacím čase a na Oranguflixu. Přidejte peníze pro obnovení ticha!`
                        : `Rival funded €${competitorBid.toLocaleString()}. Your catastrophic billboard campaign is currently live in subway stations and streaming sidebars!`}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: CUSTOM SILENCE QUOTE CALCULATOR */}
        {activeTab === 'quote' && (
          <div className="adnt-quote-view fade-in">
            <div className="quote-form-box">
              <div className="form-group">
                <label>{isCs ? 'Název vaší společnosti nebo produktu:' : 'Your Company or Product Brand:'}</label>
                <input
                  type="text"
                  value={customBrand}
                  onChange={(e) => setCustomBrand(e.target.value)}
                  placeholder="e.g. Megacorp Labs"
                />
              </div>

              <div className="form-group">
                <div className="slider-label">
                  <span>{isCs ? 'Stupeň trapnosti reklamy, kterou potřebujete utajit:' : 'Embarrassment Severity of Campaign to Suppress:'}</span>
                  <b>{embarrassmentLevel} / 5 ({embarrassmentLevel === 1 ? (isCs ? 'Mírné faux pas' : 'Mild Faux Pas') : embarrassmentLevel === 3 ? (isCs ? 'Trapnost na úrovni vedení' : 'Executive Disaster') : (isCs ? 'Totální krach reputace' : 'Existential Extinction')})</b>
                </div>
                <input
                  type="range"
                  min={1}
                  max={5}
                  value={embarrassmentLevel}
                  onChange={(e) => {
                    setEmbarrassmentLevel(Number(e.target.value));
                    setCustomCalculated(true);
                  }}
                  className="petty-slider"
                />
              </div>

              <button
                type="button"
                className="button button-dark full-width"
                onClick={() => setCustomCalculated(true)}
              >
                <Sparkles size={16} />
                {isCs ? 'Vypočítat výkupné za mlčenlivost' : 'Calculate Silence Retainer Tariff'}
              </button>

              {customCalculated && (
                <div className="quote-result-card mt-4 fade-in">
                  <div className="quote-price-header">
                    <div>
                      <small>{isCs ? 'DOPORUČENÉ MĚSÍČNÍ VÝKUPNÉ PRO ADN\'T:' : 'RECOMMENDED MONTHLY SILENCE RETAINER:'}</small>
                      <h3 className="text-highlight">€{quotePrice.toLocaleString()} / {isCs ? 'měsíc' : 'month'}</h3>
                    </div>
                    <ShieldCheck size={36} className="text-success" />
                  </div>
                  <p>
                    {isCs
                      ? `Za tuto částku agentura Adn't garantuje, že trapný spot firmy „${customBrand}“ nikdy nespatří světlo světa — pokud ovšem nepřijde váš konkurent s nabídkou o 30 % vyšší.`
                      : `For this fee, Adn’t guarantees the catastrophic ad from "${customBrand}" remains strictly in cryogenic freeze—unless a rival provides a 30% premium.`}
                  </p>
                  <div className="receipt-box">
                    <div><b>{isCs ? 'KRYTÍ:' : 'PROTECTION:'}</b> <span>{isCs ? '100% neviditelnost na billboardech a webech' : '100% invisibility across billboards and Oranguflix'}</span></div>
                    <div><b>{isCs ? 'KLAUZULE PŘEPLACENÍ:' : 'OUTBID CLAUSE:'}</b> <span>{isCs ? 'Platná (konkurence má vždy právo veta)' : 'Active (rivals retain right of counter-bidding)'}</span></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
