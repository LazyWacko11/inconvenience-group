import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Clock3, RotateCcw, AlertCircle, HelpCircle } from 'lucide-react';

export default function InteractiveCalculator() {
  const { lang } = useLanguage();
  const isCs = lang === 'cs';

  const [display, setDisplay] = useState('0');
  const [history, setHistory] = useState([]);
  const [corporateNote, setCorporateNote] = useState('');

  const handleNum = (n) => {
    setDisplay((prev) => (prev === '0' || prev === 'NaN' || prev.includes('🍌') ? String(n) : prev + n));
  };

  const handleOp = (op) => {
    setDisplay((prev) => prev + ' ' + op + ' ');
  };

  const handleClear = () => {
    setDisplay('0');
    setCorporateNote('');
  };

  const handleEqual = () => {
    try {
      // Evaluate basic math safely
      const cleanExpr = display.replace(/[^0-9+\-*/. ]/g, '');
      const rawRes = Function(`'use strict'; return (${cleanExpr})`)();
      const bloated = Math.ceil(Number(rawRes) * 1.8 + 14);

      setDisplay(String(bloated));
      setCorporateNote(
        isCs
          ? `Původní matematický výsledek (${rawRes}) byl navýšen na ${bloated} z důvodu 18% daně z lítosti a povinné porady managementu.`
          : `Theoretical result (${rawRes}) adjusted to ${bloated} following stakeholder alignment and regulatory regret surcharges.`
      );
      setHistory((prev) => [`${display} = ${bloated}`, ...prev.slice(0, 4)]);
    } catch {
      setDisplay('NaN');
      setCorporateNote(
        isCs
          ? 'Výsledek nelze spočítat. Výbor pro sčítání byl svolán na příští úterý.'
          : 'Expression non-computable. Accounting task force scheduled for next quarter.'
      );
    }
  };

  const handleSpecial = (type) => {
    if (type === 'ORANGUTAN') {
      setDisplay('🍌 OOF AAH');
      setCorporateNote(
        isCs
          ? 'Orangutan převzal kontrolu nad kalkulátorem. Všechny hodnoty jsou nyní vyjádřeny v banánech.'
          : 'Primate override active. Integer units converted into tropical potassium metrics.'
      );
    } else if (type === 'MEETING') {
      const current = parseFloat(display) || 10;
      const res = Math.round(current * 4.2);
      setDisplay(String(res));
      setCorporateNote(
        isCs
          ? `Hodnota byla vynásobena koeficientem porady (4.2x). Nyní obsahuje čas na úvodní formalitu a 2 prezentace v PowerPointu.`
          : `Value scaled by Corporate Meeting Factor (4.2x) to allocate buffer for agenda review and screen-sharing issues.`
      );
    } else if (type === 'WHY') {
      setDisplay('PROČ?');
      setCorporateNote(
        isCs
          ? 'Proč to počítáte, když to můžete delegovat na stážistu, který to spočítá špatně?'
          : 'Why calculate precision metrics yourself when an intern can approximate it erroneously?'
      );
    } else if (type === 'TAX') {
      const current = parseFloat(display) || 0;
      const res = (current * 1.21).toFixed(2);
      setDisplay(String(res));
      setCorporateNote(
        isCs
          ? 'Připočtena 21% DPH + 14% daň z duševního nepohodlí.'
          : 'Applied standard 21% VAT plus 14% Indecision Surcharge.'
      );
    }
  };

  return (
    <div className="interactive-module">
      <div className="module-header">
        <div className="module-badge">
          <Clock3 size={16} />
          <span>{isCs ? 'KORPORÁTNÍ VÝPOČETNÍ JEDNOTKA' : 'ENTERPRISE OVER-ANALYSIS CONSOLE'}</span>
        </div>
        <h3>{isCs ? 'InConvenience Calculator™: Spočítáme to nejsložitěji' : 'InConvenience Calculator™: Overengineering Simplicity'}</h3>
      </div>

      <div className="calc-layout-grid">
        <div className="calc-device">
          <div className="calc-screen-wrap">
            <div className="calc-status-bar">
              <span>ICG-CALC / MODEL 09</span>
              <span className="dot yellow-dot" />
            </div>
            <div className="calc-display-val">{display}</div>
          </div>

          <div className="calc-keypad">
            <button className="calc-btn special-btn" onClick={() => handleSpecial('MEETING')}>PORADA</button>
            <button className="calc-btn special-btn" onClick={() => handleSpecial('TAX')}>+DAŇ</button>
            <button className="calc-btn special-btn" onClick={() => handleSpecial('ORANGUTAN')}>🦧 OPICE</button>
            <button className="calc-btn clear-btn" onClick={handleClear}>C</button>

            <button className="calc-btn" onClick={() => handleNum(7)}>7</button>
            <button className="calc-btn" onClick={() => handleNum(8)}>8</button>
            <button className="calc-btn" onClick={() => handleNum(9)}>9</button>
            <button className="calc-btn op-btn" onClick={() => handleOp('/')}>÷</button>

            <button className="calc-btn" onClick={() => handleNum(4)}>4</button>
            <button className="calc-btn" onClick={() => handleNum(5)}>5</button>
            <button className="calc-btn" onClick={() => handleNum(6)}>6</button>
            <button className="calc-btn op-btn" onClick={() => handleOp('*')}>×</button>

            <button className="calc-btn" onClick={() => handleNum(1)}>1</button>
            <button className="calc-btn" onClick={() => handleNum(2)}>2</button>
            <button className="calc-btn" onClick={() => handleNum(3)}>3</button>
            <button className="calc-btn op-btn" onClick={() => handleOp('-')}>−</button>

            <button className="calc-btn" onClick={() => handleNum(0)}>0</button>
            <button className="calc-btn" onClick={() => handleSpecial('WHY')}>PROČ?</button>
            <button className="calc-btn" onClick={() => handleNum('.')}>.</button>
            <button className="calc-btn op-btn" onClick={() => handleOp('+')}>+</button>

            <button className="calc-btn equal-btn" onClick={handleEqual}>=</button>
          </div>
        </div>

        <div className="calc-explanation-side">
          <div className="summary-card">
            <span className="summary-label">{isCs ? 'OFICIÁLNÍ ZDŮVODNĚNÍ VÝSLEDKU' : 'OFFICIAL COMPUTATION AUDIT'}</span>
            <p className="corporate-note-text">
              {corporateNote || (isCs
                ? 'Zadejte operaci nebo stiskněte tlačítko PORADA. Náš systém vám připočte potřebné byrokratické zpoždění.'
                : 'Perform any calculation or trigger the MEETING button to witness automated administrative inflation.')}
            </p>

            {history.length > 0 && (
              <div className="calc-history mt-3">
                <small>{isCs ? 'HISTORIE ZBYTEČNÝCH OPERACÍ:' : 'AUDIT LOG:'}</small>
                <ul>
                  {history.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
