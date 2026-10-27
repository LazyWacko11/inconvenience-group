import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BriefcaseBusiness, Play, RefreshCw, Award, Sparkles, Terminal } from 'lucide-react';

const mockOutputs = {
  cs: [
    `AKCIONÁŘI: oof oof aah aah !!!\nSTRATEGIE Q3:\n1. 🍌 Koupit všechny banány na burze v Rotterdamu.\n2. Prodat je za trojnásobek pod názvem „Artisanal Yellow Potassium Sticks“.\n3. Fúze s lesem na Borneu.\n4. Beethovenova Osudová: Ta-ta-ta-TAAAA.\nZÁVĚR: Schválit rozpočet na další oříšky. Podepsán: Dr. Pongidae, MBA.`,
    `ANALÝZA SYNERGIE:\nkfjdsalfjksdla BANANA jfkdlsajfklsda\nNaše holistická páka v cloudu generuje 400% zbytečnost.\nProblém: Lidé pracují moc rychle.\nŘešení: Každému zaměstnanci odebrat klávesnici a nahradit ji kokosovým ořechem.\nStatus: Dosažen strategický konsensus.`,
    `MEMO PŘEDSTAVENSTVU:\nOdkazuji se na Hamleta (Dějství III, Scéna I):\n„Být či nebýt na Zoomu, toť otázka.“\nNávrh: Všechny porady přesunout do koruny fikusového stromu.\nVýsledný EBITDA: 14 banánových slupek.\nSchváleno jednomyslně.`
  ],
  en: [
    `BOARD DIRECTIVE: oof oof aah aah !!!\nQ3 GROWTH STRATEGY:\n1. 🍌 Monopolize commodity plantain futures in Rotterdam.\n2. Rebrand as "Artisanal Organic Potassium Units" at 400% markup.\n3. Strategic reverse merger with Sumatran canopy.\n4. Symphony No. 5: Da-da-da-DUMMMM.\nRECOMMENDATION: Double the tropical fruit executive stipend. Signed: Dr. Pongidae, Senior Partner.`,
    `SYNERGY AUDIT:\nasdfjkl; BANANA qweuio;\nOur enterprise cloud agility index indicates excess operational clarity.\nRoot Cause: Humans are concluding tasks prior to calendar timeouts.\nPivoting solution: Replace mechanical keyboards with unpeeled coconuts.\nConsensus reached instantaneously.`,
    `M&A EVALUATION MEMORANDUM:\nQuoting Hamlet (Act III, Scene I):\n"To sync or not to sync offline, that is the question."\nDirective: All executive standups relocated to upper branch of boardroom ficus.\nProjected EBIT: 14 metric bunches.\nCarried by unanimous primate vote.`
  ]
};

export default function InteractiveOrangutan() {
  const { lang } = useLanguage();
  const isCs = lang === 'cs';

  const [inputTask, setInputTask] = useState(
    isCs ? 'Jak vyřešit pokles zisku v Q3 a motivovat zaměstnance?' : 'How to optimize Q3 margins and motivate senior engineering leads?'
  );
  const [output, setOutput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [bananasConsumed, setBananasConsumed] = useState(38);

  const startTyping = () => {
    setIsTyping(true);
    setOutput('');
    const fullText = mockOutputs[lang][Math.floor(Math.random() * mockOutputs[lang].length)];
    let currentIdx = 0;

    const interval = setInterval(() => {
      if (currentIdx < fullText.length) {
        setOutput(fullText.slice(0, currentIdx + 1));
        currentIdx += 2;
      } else {
        clearInterval(interval);
        setIsTyping(false);
        setBananasConsumed((prev) => prev + 1);
      }
    }, 25);
  };

  return (
    <div className="interactive-module">
      <div className="module-header">
        <div className="module-badge">
          <BriefcaseBusiness size={16} />
          <span>{isCs ? 'ORANGUTAN STRATEGY TERMINAL v4.2' : 'ORANGUTAN STRATEGY TERMINAL v4.2'}</span>
        </div>
        <h3>{isCs ? 'Svěřte korporátní výzvu certifikovanému primátovi' : 'Delegate Corporate Vision to Our Executive Primate'}</h3>
        <p>
          {isCs
            ? 'Na základě teorie nekonečné opice platí, že pokud orangutan dostatečně dlouho buší do klávesnice, náhodně vytvoří dokonalou byznysovou zprávu nebo sonet.'
            : 'Applying the infinite monkey theorem: given sufficient mechanical keystrokes, a higher primate will inevitably produce flawless management consulting deliverables.'}
        </p>
      </div>

      <div className="orangutan-console">
        <div className="orangutan-avatar-bar">
          <div className="orangutan-avatar">🦧</div>
          <div className="orangutan-meta">
            <b>Dr. Barnaby Pongidae, Chief Primate Strategist</b>
            <span>{isCs ? 'Status: Připoután k ergonomické židli Herman Miller' : 'Status: Secured to Herman Miller Aeron Chair'}</span>
          </div>
          <div className="banana-counter">
            <span className="banana-icon">🍌</span>
            <div>
              <b>{bananasConsumed}</b>
              <small>{isCs ? 'Snědených banánů' : 'Bananas Billed'}</small>
            </div>
          </div>
        </div>

        <div className="form-group mt-3">
          <label>{isCs ? 'Zadejte komplexní strategický problém:' : 'Enter Complex Corporate Dilemma:'}</label>
          <div className="input-with-button">
            <input
              type="text"
              value={inputTask}
              onChange={(e) => setInputTask(e.target.value)}
              placeholder={isCs ? 'např. Jak propustit 200 lidí a nazvat to příležitostí?' : 'e.g. How to pivot into Web4 without engineering?'}
            />
            <button
              type="button"
              className="button button-dark"
              onClick={startTyping}
              disabled={isTyping}
            >
              {isTyping ? <RefreshCw className="spin" size={16} /> : <Play size={16} />}
              {isCs ? 'Předat orangutanovi' : 'Task Primate'}
            </button>
          </div>
        </div>

        <div className="terminal-screen">
          <div className="terminal-top">
            <Terminal size={14} />
            <span>ORANGUTAN_TERMINAL_OUTPUT.TXT</span>
            <div className="terminal-dots">
              <span />
              <span />
              <span />
            </div>
          </div>
          <div className="terminal-body">
            {output ? (
              <pre>{output}</pre>
            ) : (
              <div className="terminal-placeholder">
                {isCs
                  ? '> Čekám na zadání úkolu... Orangutan právě louská ořech a rozvažuje SWOT analýzu.'
                  : '> Terminal idle. Primate is currently contemplating SWOT matrix and scratching chin.'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
