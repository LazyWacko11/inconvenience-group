import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MegaphoneOff, AlertTriangle, ShieldCheck, X, DollarSign, VolumeX } from 'lucide-react';

export default function AdntBanner({ ad, variant = 'sidebar', onSilenceChange }) {
  const { lang } = useLanguage();
  const isCs = lang === 'cs';

  const [isSilenced, setIsSilenced] = useState(false);
  const [closingMessage, setClosingMessage] = useState(false);

  const toggleSilence = () => {
    const newState = !isSilenced;
    setIsSilenced(newState);
    if (onSilenceChange) onSilenceChange(ad.id, newState);
  };

  const handleAttemptClose = () => {
    setClosingMessage(true);
    setTimeout(() => setClosingMessage(false), 3500);
  };

  if (variant === 'sidebar') {
    return (
      <div className={`adnt-sidebar-banner ${isSilenced ? 'silenced' : ''}`}>
        <div className="adnt-banner-top">
          <span className="adnt-badge">
            <MegaphoneOff size={11} />
            {isCs ? "ADN'T REKLAMA" : "ADN'T AD FEED"}
          </span>
          <button
            className="adnt-close-btn"
            onClick={handleAttemptClose}
            title={isCs ? "Zavřít reklamu" : "Close advertisement"}
          >
            <X size={13} />
          </button>
        </div>

        {closingMessage && (
          <div className="adnt-extortion-toast fade-in">
            {isCs
              ? "Chcete zavřít reklamu? Zaplaťte Adn't €12.50 za tichý režim nebo přetrpte dalších 40 vteřin."
              : "To dismiss this ad, settle our €12.50 silence fee or endure 40 additional seconds of bad branding."}
          </div>
        )}

        <div className="adnt-banner-content">
          <div className="adnt-emoji-box">{ad.visualEmoji}</div>
          <small className="adnt-company">{ad.companyName}</small>
          <h5 className="adnt-title">{ad.title[lang] || ad.title.cs}</h5>
          <p className="adnt-tagline">{ad.tagline[lang] || ad.tagline.cs}</p>

          <div className="adnt-leak-reason">
            <AlertTriangle size={11} />
            <span>{ad.whyShowing[lang] || ad.whyShowing.cs}</span>
          </div>

          <div className="adnt-action-row">
            <button
              type="button"
              className={`adnt-silence-btn ${isSilenced ? 'btn-unmute' : ''}`}
              onClick={toggleSilence}
            >
              {isSilenced ? (
                <>
                  <ShieldCheck size={12} />
                  <span>{isCs ? 'Umlčeno (Zobrazit znovu)' : 'Silenced (Show again)'}</span>
                </>
              ) : (
                <>
                  <VolumeX size={12} />
                  <span>{isCs ? 'Umlčet tuto reklamu (€5,000)' : 'Silence this Ad (€5,000)'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {isSilenced && (
          <div className="adnt-censor-stamp">
            <span>{isCs ? "UMLČENO AGENTUROU ADN'T" : "SILENCED BY ADN'T"}</span>
            <small>{isCs ? 'Výkupné bylo zaúčtováno' : 'Silence Retainer Active'}</small>
          </div>
        )}
      </div>
    );
  }

  // Full card variant (used in Adn't showcase)
  return (
    <div className={`adnt-full-card ${isSilenced ? 'silenced' : ''}`}>
      <div className="adnt-card-header">
        <span className="adnt-card-badge">{ad.badge[lang] || ad.badge.cs}</span>
        <small className="adnt-client-name">{ad.companyName}</small>
      </div>

      <div className="adnt-card-body">
        <div className="adnt-card-visual">
          <span className="visual-graphic">{ad.visualEmoji}</span>
        </div>
        <div className="adnt-card-info">
          <h4>{ad.title[lang] || ad.title.cs}</h4>
          <blockquote className="adnt-quote">{ad.tagline[lang] || ad.tagline.cs}</blockquote>
          <p className="adnt-pitch">{ad.pitch[lang] || ad.pitch.cs}</p>

          <div className="adnt-breach-notice">
            <AlertTriangle size={14} className="text-danger" />
            <div>
              <b>{isCs ? 'Důvod odvysílání:' : 'Breach Justification:'}</b>
              <p>{ad.whyShowing[lang] || ad.whyShowing.cs}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="adnt-card-footer">
        <div className="adnt-cost-info">
          <small>{isCs ? 'Měsíční výkupné za ticho:' : 'Monthly Silence Retainer:'}</small>
          <b>€{ad.silenceCost.toLocaleString()}</b>
        </div>
        <button
          type="button"
          className="button button-dark"
          onClick={toggleSilence}
        >
          {isSilenced ? (
            <><ShieldCheck size={16} /> {isCs ? 'Zrušit cenzuru' : 'Lift Quarantine'}</>
          ) : (
            <><VolumeX size={16} /> {isCs ? 'Zaplatit výkupné za umlčení' : 'Pay Silence Ransom'}</>
          )}
        </button>
      </div>

      {isSilenced && (
        <div className="adnt-censor-overlay">
          <div className="stamp-box">
            <b>{isCs ? "PŘÍSNĚ CVRK! UMLČENO" : "CENSORED BY ADN'T"}</b>
            <span>{isCs ? "Klient narychlo zaplatil výkupné" : "Client wired emergency retainer"}</span>
            <button className="button button-light btn-sm mt-3" onClick={toggleSilence}>
              {isCs ? "Konkurence nabízí víc (Znovu odvysílat)" : "Rival outbids (Force Broadcast)"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
