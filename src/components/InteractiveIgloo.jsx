import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Interactive3DViewer from './Interactive3DViewer';
import { Snowflake, Flame, RefreshCw, Calendar, Droplets, Check, AlertTriangle } from 'lucide-react';

export default function InteractiveIgloo() {
  const { lang } = useLanguage();
  const isCs = lang === 'cs';

  const [tier, setTier] = useState('palace');
  const [chandelier, setChandelier] = useState(true);
  const [floorHeating, setFloorHeating] = useState(false);
  const [shape, setShape] = useState('classic');

  const basePrices = {
    box: 4999,
    palace: 49999,
    estate: 199999,
    banana: 29999
  };

  const totalPrice = basePrices[tier] + (chandelier ? 2999 : 0) + (floorHeating ? 4999 : 0);

  return (
    <div className="interactive-module">
      <div className="module-header">
        <div className="module-badge">
          <Snowflake size={16} />
          <span>{isCs ? 'SNOW-AS-A-SERVICE™ (SAAS) KONFIGURÁTOR' : 'SNOW-AS-A-SERVICE™ (SAAS) BUILDER'}</span>
        </div>
        <h3>{isCs ? 'Nakonfigurujte si sněhové sídlo s garancí jarního tání' : 'Configure Your Ephemeral Snow Estate'}</h3>
        <p>
          {isCs
            ? 'Stavíme luxusní rekreační domy ze 100% přírodního sněhu. Dům se na jaře sám zdarma zlikviduje rozpuštěním a příští zimu vám naúčtujeme jeho opětovnou výstavbu.'
            : 'Custom winter vacation mansions built of pure snow. Naturally liquefies in spring for zero demolition cost, unlocking automatic reconstruction billing next winter.'}
        </p>
      </div>

      {/* 3D Model & Archival Photo Showcase */}
      <Interactive3DViewer modelType="igloo" fallbackImage="/images/igloos.png" />

      <div className="igloo-grid mt-4">
        <div className="igloo-controls">
          <div className="form-group">
            <label>{isCs ? '1. Zvolte model sídla' : '1. Select Estate Model'}</label>
            <div className="igloo-tier-picker">
              <button
                type="button"
                className={`igloo-btn ${tier === 'box' ? 'active' : ''}`}
                onClick={() => setTier('box')}
              >
                <b>The SnowBox</b>
                <span>€4,999</span>
                <small>{isCs ? '1 pokoj, 0 trubek' : '1 room, zero plumbing'}</small>
              </button>
              <button
                type="button"
                className={`igloo-btn ${tier === 'palace' ? 'active' : ''}`}
                onClick={() => setTier('palace')}
              >
                <b>The SnowPalace</b>
                <span>€49,999</span>
                <small>{isCs ? '5 pokojů + jídelna' : '5 snow bedrooms'}</small>
              </button>
              <button
                type="button"
                className={`igloo-btn ${tier === 'estate' ? 'active' : ''}`}
                onClick={() => setTier('estate')}
              >
                <b>The Frozen Estate</b>
                <span>€199,999</span>
                <small>{isCs ? 'Hrad se zamrzlým příkopem' : 'Castle & frozen moat'}</small>
              </button>
              <button
                type="button"
                className={`igloo-btn ${tier === 'banana' ? 'active' : ''}`}
                onClick={() => setTier('banana')}
              >
                <b>Banana Igloo™</b>
                <span>€29,999</span>
                <small>{isCs ? 'Tvar banánu (design orangutana)' : 'Curved fruit design'}</small>
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>{isCs ? '2. Luxusní doplňky' : '2. Luxury Add-ons'}</label>
            <div className="checkbox-list">
              <label className="checkbox-item">
                <input
                  type="checkbox"
                  checked={chandelier}
                  onChange={(e) => setChandelier(e.target.checked)}
                />
                <div>
                  <b>{isCs ? 'Sněhový lustr (+€2,999)' : 'Carved Snow Chandelier (+€2,999)'}</b>
                  <p>{isCs ? 'Vyřezán z jediného kusu ledu. Hrozba pádu na stůl je brána jako adrenalinový prvek.' : 'Meticulously carved ice crystals. Risk of sudden collapse adds thrilling ambiance.'}</p>
                </div>
              </label>

              <label className="checkbox-item">
                <input
                  type="checkbox"
                  checked={floorHeating}
                  onChange={(e) => setFloorHeating(e.target.checked)}
                />
                <div>
                  <b className={floorHeating ? 'text-danger' : ''}>
                    {isCs ? 'Podlahové vytápění (+€4,999 — Prémiový zážitek z tání)' : 'Heated Flooring (+€4,999 — Premium Melting Experience)'}
                  </b>
                  <p>{isCs ? 'Umožní vám zažít okamžitou transformaci podlahy na interiérový plavecký bazén.' : 'Enjoy rapid subterranean thermal liquefaction directly beneath your wool socks.'}</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="igloo-summary">
          <div className="summary-card">
            <span className="summary-label">{isCs ? 'ROZPOČET SEZÓNY 1' : 'SEASON 1 CONSTRUCTION'}</span>
            <div className="summary-price">€{totalPrice.toLocaleString()}</div>
            <div className="summary-details">
              <div>
                <span>{isCs ? 'Předpokládané datum zkapalnění:' : 'Estimated Liquefaction Date:'}</span>
                <b>{floorHeating ? (isCs ? 'Do 14 minut po zapnutí topení' : '14 minutes post-thermostat activation') : (isCs ? '21. března (první jarní den)' : 'March 21st (Spring Equinox)')}</b>
              </div>
              <div>
                <span>{isCs ? 'Poplatek za kontrolu ledu (Snow Inspection):' : 'Annual Snow Inspection Surcharge:'}</span>
                <b>€750 / {isCs ? 'týden' : 'week'}</b>
              </div>
              <div className="rebuild-box">
                <RefreshCw size={16} />
                <div>
                  <b>{isCs ? 'Zima 2 — Automatická rekonstrukce:' : 'Winter 2 Mandatory Reconstruction:'}</b>
                  <span>€{totalPrice.toLocaleString()} ({isCs ? '100% opakovaný roční příjem pro nás' : '100% recurring annual revenue for us'})</span>
                </div>
              </div>
            </div>

            {floorHeating && (
              <div className="melting-alert">
                <AlertTriangle size={18} />
                <span>
                  {isCs
                    ? 'POZOR: Zapnuli jste podlahové vytápění. Vaše sídlo v současné chvíli úspěšně odtéká do kanalizace.'
                    : 'WARNING: Floor heating enabled. Your multi-room estate is actively transitioning into municipal groundwater.'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
