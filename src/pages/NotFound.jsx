import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, Compass } from 'lucide-react';

export default function NotFound() {
  const { lang } = useLanguage();
  const isCs = lang === 'cs';

  return (
    <main className="not-found container">
      <div className="eyebrow">
        <span className="eyebrow-dot" />
        404 / {isCs ? 'KORPORÁTNÍ DETOUR' : 'ADMINISTRATIVE DETOUR'}
      </div>
      <h1>
        {isCs ? 'Tato stránka se vydala' : 'This page has taken'}
        <br />
        <em>{isCs ? 'monumentální oklikou.' : 'the longest possible way.'}</em>
      </h1>
      <p>
        {isCs
          ? 'Požadovaná adresa se v tuto chvíli nachází na kontejnerové lodi u mysu Dobré naděje pod dohledem Dr. Pongidae.'
          : 'The URL you requested is currently navigating the Cape of Good Hope aboard a cargo freighter under primate supervision.'}
      </p>
      <div className="hero-actions">
        <Link className="button button-dark" to="/">
          {isCs ? 'Návrat na hlavní stranu' : 'Return to Safety'} <ArrowRight size={17} />
        </Link>
        <Link className="button button-light" to="/tools">
          <Compass size={16} />
          {isCs ? 'Otevřít InConvenience Maps™' : 'Launch InConvenience Maps™'}
        </Link>
      </div>
    </main>
  );
}
