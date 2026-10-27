import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Interactive3DViewer from './Interactive3DViewer';
import { Skull, Sparkles, Check, AlertCircle, RefreshCw, Send, DollarSign, ShieldAlert, Award } from 'lucide-react';

const presetGrievances = {
  cs: [
    'Klient mi neproplatil fakturu za kompletní úklid kanceláře.',
    'Bývalý partner mi nevrátil oblíbenou mikinu a zapírá to.',
    'Kolega z marketingu mi pravidelně krade označený jogurt ze společné lednice.',
    'Kamarád se chvástal, že má byt tak čistý, že by se dalo jíst z podlahy.'
  ],
  en: [
    'A commercial client refuses to settle my professional cleaning invoice.',
    'My ex kept my favorite cashmere hoodie and claims it was a gift.',
    'A marketing coworker consistently consumes my labeled oat milk from the office fridge.',
    'A close friend boasted their apartment is so sterile you could perform open-heart surgery on the tiles.'
  ]
};

const missions = {
  cs: [
    {
      title: 'Operace: Žluté ticho',
      tier: 'Level 1: Mírná malichernost',
      action: 'Nákup 100 svítivě žlutých lepicích papírků s nápisem „Tady mohla být uhrazená faktura“. Polepení monitoru ve tvaru usměvavého smajlíka.',
      cost: '€49.00',
      reversibility: '100% (odstranitelné za 30 sekund)',
      legalAdvice: 'Zcela neškodné. Papírky jsou recyklovatelné a lepidlo nezanechává šmouhy.',
      chiefQuote: '„Dopis od právníka stojí €300 a nikdo ho nečte. 100 post-itů nikdo nepřehlédne.“'
    },
    {
      title: 'Operace: Kartonové srdce závazku',
      tier: 'Level 3: Nukleární karton',
      action: 'Doručení a vztyčení pyramidy z 2 000 čistých kartonových krabic v obývacím pokoji zákazníka s nápisem: „Aspoň tyto krabice dokážou držet pohromadě.“',
      cost: '€999.00',
      reversibility: '100% (krabice se po vyfocení složí na plocho a odvezou)',
      legalAdvice: 'Instalováno výhradně ve vašem vlastním prostoru. Ex-partner není kontaktován ani obtěžován.',
      chiefQuote: '„Romantika pomíjí, recyklovaný papír je věčný.“'
    },
    {
      title: 'Operace: Psychologická kachnička',
      tier: 'Level 4: Psychologická válka',
      action: 'Rozmístění 350 identických gumových žlutých kachniček do všech polic, skříněk a hrnků v místnosti. Poslední kachnička je umístěna na nevysvětlitelně významné místo (např. na střed prázdného stolu).',
      cost: '€2,499.00',
      reversibility: '100% (kachničky nepípají a nezpůsobují škodu)',
      legalAdvice: 'Použity certifikované potravinářské gumové kachny bez ftalátů.',
      chiefQuote: '„Člověk snese leccos, ale 350 kachen vyvolá hlubokou sebereflexi.“'
    },
    {
      title: 'Operace: Poslední kapka',
      tier: 'Level 5: Prémiová malichernost',
      action: 'Generální ředitel malicherností osobně vstoupí do místnosti v luxusním smokingu, beze slova položí jednu prázdnou PET láhev doprostřed koberce, vyfotí si ji fotoaparátem Leica, pokývá hlavou a beze slova odejde.',
      cost: '€4,999.00',
      reversibility: '100% (láhev lze zvednout jedním prstem)',
      legalAdvice: 'Žádná škoda nevzniká. Zmatení druhé strany je však absolutní.',
      chiefQuote: '„Nejvyšší forma pomsty je ta, které nikdo nerozumí.“'
    }
  ],
  en: [
    {
      title: 'Operation: Yellow Silence',
      tier: 'Tier 1: Petty',
      action: 'Deploying 100 neon yellow Post-it notes spelling out "PAYMENT PENDING" across desk monitors in an immaculate geometric grid.',
      cost: '€49.00',
      reversibility: '100% (removable in 30 seconds)',
      legalAdvice: 'Completely compliant with office health & safety codes.',
      chiefQuote: '“A formal lawyer demand letter costs €300 and gets filed away. 100 sticky notes command immediate attention.”'
    },
    {
      title: 'Operation: Cardboard Commitment',
      tier: 'Tier 3: Nuclear Cardboard',
      action: 'Constructing a monolithic archway out of 2,000 clean cardboard boxes in your personal living room, topped with a sign reading: "At least someone here knows how to commit."',
      cost: '€999.00',
      reversibility: '100% (boxes collapsed and collected post-photo shoot)',
      legalAdvice: 'Erected exclusively on premises you are legally authorized to occupy.',
      chiefQuote: '“Relationships dissolve; corrugated cardboard structural integrity remains steadfast.”'
    },
    {
      title: 'Operation: Psychological Duck Swarm',
      tier: 'Tier 4: Psychological Warfare',
      action: 'Strategic positioning of 350 identical bright yellow rubber ducks across bookshelves, ceiling tiles, and coffee mugs, culminating in a single duck placed precisely in the center of an empty conference table.',
      cost: '€2,499.00',
      reversibility: '100% (zero residue, non-toxic BPA-free rubber)',
      legalAdvice: 'Ducks are inanimate and incapable of committing civil torts.',
      chiefQuote: '“A human mind can endure many setbacks, but 350 stoic ducks provoke profound existential doubt.”'
    },
    {
      title: 'Operation: The Final Straw',
      tier: 'Tier 5: Executive Supremacy',
      action: 'Our Chief Executive of Petty Affairs arrives in a bespoke tuxedo, places exactly one empty plastic mineral water bottle in the exact geographic center of a spotless room, takes a single photograph with an analog Leica, nods slowly, and departs without uttering a syllable.',
      cost: '€4,999.00',
      reversibility: '100% (can be lifted with thumb and index finger)',
      legalAdvice: 'Zero property alteration. 100% psychological perplexity.',
      chiefQuote: '“True artistic revenge leaves no legal liability, only unanswered questions.”'
    }
  ]
};

export default function InteractivePettyPayback() {
  const { lang } = useLanguage();
  const [grievance, setGrievance] = useState(presetGrievances[lang][0]);
  const [pettinessLevel, setPettinessLevel] = useState(2);
  const [generatedMission, setGeneratedMission] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [insuranceActive, setInsuranceActive] = useState(true);
  const [selectedTier, setSelectedTier] = useState('nuclear');

  const handleGenerate = (e) => {
    e?.preventDefault();
    setIsGenerating(true);
    setTimeout(() => {
      const missionList = missions[lang] || missions.cs;
      const index = Math.min(pettinessLevel - 1, missionList.length - 1);
      setGeneratedMission(missionList[Math.max(0, index)]);
      setIsGenerating(false);
    }, 600);
  };

  const isCs = lang === 'cs';

  return (
    <div className="interactive-module">
      <div className="module-header">
        <div className="module-badge">
          <Skull size={16} />
          <span>{isCs ? 'OFICIÁLNÍ KONZOLA REVENGE-AS-A-SERVICE™' : 'OFFICIAL REVENGE-AS-A-SERVICE™ CONSOLE'}</span>
        </div>
        <h3>{isCs ? 'PettyPayback™ AI Generátor legální malichernosti' : 'PettyPayback™ Algorithmic Revenge Generator'}</h3>
        <p>
          {isCs
            ? 'Zadejte své příkoří. Náš certifikovaný algoritmus vypočítá neúměrně dětinskou, ale 100% legální a neškodnou odvetu.'
            : 'Specify your grievance. Our proprietary algorithm calculates a disproportionately petty, completely legal, reversible response.'}
        </p>
      </div>

      {/* 3D Model & Archival Photo Showcase */}
      <Interactive3DViewer modelType="petty" fallbackImage="/images/petty-payback.png" />

      <div className="petty-form-box mt-4">
        <form onSubmit={handleGenerate}>
          <div className="form-group">
            <label>{isCs ? 'Co se vám stalo? (Zvolte nebo napište vlastní)' : 'What transgression occurred? (Select or type)'}</label>
            <div className="preset-chips">
              {presetGrievances[lang].map((p, i) => (
                <button
                  type="button"
                  key={i}
                  className={`chip ${grievance === p ? 'active' : ''}`}
                  onClick={() => setGrievance(p)}
                >
                  {p.slice(0, 48)}...
                </button>
              ))}
            </div>
            <textarea
              rows={3}
              value={grievance}
              onChange={(e) => setGrievance(e.target.value)}
              placeholder={isCs ? 'Popište křivdu...' : 'Describe the injustice...'}
              className="grievance-input"
            />
          </div>

          <div className="form-group">
            <div className="slider-label">
              <span>{isCs ? 'Požadovaná míra malichernosti (Pettiness Quotient)' : 'Pettiness Intensity Quotient'}</span>
              <b>{pettinessLevel} / 4 ({pettinessLevel === 1 ? (isCs ? 'Mírné lepení' : 'Mild Sticky') : pettinessLevel === 2 ? (isCs ? 'Kartonový hrad' : 'Cardboard Monument') : pettinessLevel === 3 ? (isCs ? 'Kachní invaze' : 'Duck Infiltration') : (isCs ? 'Osobní návštěva ředitele' : 'Executive Bottle Placement')})</b>
            </div>
            <input
              type="range"
              min={1}
              max={4}
              value={pettinessLevel}
              onChange={(e) => setPettinessLevel(Number(e.target.value))}
              className="petty-slider"
            />
          </div>

          <button type="submit" className="button button-dark full-width" disabled={isGenerating}>
            {isGenerating ? (
              <><RefreshCw className="spin" size={16} /> {isCs ? 'Algoritmus vyhodnocuje malichernost...' : 'Calculating petty response...'}</>
            ) : (
              <><Sparkles size={16} /> {isCs ? 'Vypočítat legální odvetu' : 'Generate Harmless Petty Mission'}</>
            )}
          </button>
        </form>

        {generatedMission && (
          <div className="mission-card fade-in">
            <div className="mission-badge">
              <Award size={16} />
              <span>{generatedMission.tier}</span>
              <b className="mission-cost">{generatedMission.cost}</b>
            </div>
            <h4>{generatedMission.title}</h4>
            <p className="mission-action"><b>{isCs ? 'Operační plán:' : 'Operational Plan:'}</b> {generatedMission.action}</p>
            <div className="mission-meta-grid">
              <div>
                <small>{isCs ? 'REVERZIBILITA' : 'REVERSIBILITY'}</small>
                <span>{generatedMission.reversibility}</span>
              </div>
              <div>
                <small>{isCs ? 'PRÁVNÍ STAV' : 'LEGAL STATUS'}</small>
                <span>{generatedMission.legalAdvice}</span>
              </div>
            </div>
            <blockquote className="mission-quote">{generatedMission.chiefQuote}</blockquote>
          </div>
        )}
      </div>

      <div className="insurance-widget">
        <div className="insurance-header">
          <ShieldAlert size={24} />
          <div>
            <h4>{isCs ? 'Revenge Insurance™ (Pojištění proti příkoří)' : 'Revenge Insurance™ Subscription'}</h4>
            <p>{isCs ? 'Předplaťte si klid mysli za €19.99 měsíčně. Sbírejte Revenge Credits™ na budoucí pomstu.' : 'Monetizing resentment for €19.99/mo. Accumulate Revenge Credits™ for authorized pranks.'}</p>
          </div>
        </div>
        <div className="insurance-body">
          <div className="insurance-stat">
            <span className="stat-num">30 {isCs ? 'DNU' : 'DAYS'}</span>
            <small>{isCs ? 'Platnost kreditů před propadnutím' : 'Credit expiry countdown'}</small>
          </div>
          <div className="insurance-clause">
            <b>{isCs ? 'Klíčový finanční háček:' : 'The Core Business Model:'}</b>
            <p>
              {isCs
                ? 'Pokud kredity nevyčerpáte do 30 dnů, propadají. Pro jejich prodloužení stačí uhradit skromný Poplatek za emocionální zpracování ve výši €79.99.'
                : 'Credits expire every 30 days. To roll over unused credits, customers must settle an Emotional Processing Fee of €79.99.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
