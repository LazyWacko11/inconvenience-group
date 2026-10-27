import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { companies } from '../data/companies';
import { ArrowRight, ArrowUpRight, Check, CircleHelp, ShieldCheck } from 'lucide-react';

import InteractivePettyPayback from '../components/InteractivePettyPayback';
import InteractiveIgloo from '../components/InteractiveIgloo';
import InteractiveReverseCleaning from '../components/InteractiveReverseCleaning';
import InteractiveOrangutan from '../components/InteractiveOrangutan';
import InteractiveAdnt from '../components/InteractiveAdnt';
import InteractiveOranguflix from '../components/InteractiveOranguflix';
import InteractiveMobility from '../components/InteractiveMobility';
import InteractiveMaps from '../components/InteractiveMaps';
import InteractiveCalculator from '../components/InteractiveCalculator';
import InteractiveRock from '../components/InteractiveRock';

export default function CompanyDetail() {
  const { slug } = useParams();
  const { lang, t } = useLanguage();
  const isCs = lang === 'cs';

  const company = companies.find((c) => c.slug === slug);

  if (!company) {
    return (
      <main className="not-found container">
        <div className="eyebrow"><span className="eyebrow-dot" />404 / KORPORÁTNÍ DETOUR</div>
        <h1>{isCs ? 'Divize nebyla nalezena.' : 'Division Not Found.'}</h1>
        <p>{isCs ? 'Tato pobočka buď ještě nevznikla, nebo se ztratila při fúzi s orangutanem.' : 'This subsidiary has either not been incorporated, or was lost in a reverse merger.'}</p>
        <Link className="button button-dark" to="/companies">{isCs ? 'Zpět do seznamu divizí' : 'Return to Portfolio'}</Link>
      </main>
    );
  }

  const Icon = company.icon;
  const categoryText = company.category[lang] || company.category.cs;
  const taglineText = company.tagline[lang] || company.tagline.cs;
  const introText = company.intro[lang] || company.intro.cs;
  const offerText = company.offer[lang] || company.offer.cs;
  const featuresList = company.features[lang] || company.features.cs;
  const noteText = company.note[lang] || company.note.cs;

  const renderSimulator = () => {
    switch (company.slug) {
      case 'petty-payback':
        return <InteractivePettyPayback />;
      case 'winter-homes':
        return <InteractiveIgloo />;
      case 'reverse-cleaning':
        return <InteractiveReverseCleaning />;
      case 'orangutan-outsourcing':
        return <InteractiveOrangutan />;
      case 'adnt':
        return <InteractiveAdnt />;
      case 'oranguflix':
        return <InteractiveOranguflix />;
      case 'inconvenience-mobility':
        return <InteractiveMobility />;
      case 'inconvenience-maps':
        return <InteractiveMaps />;
      case 'inconvenience-calculator':
        return <InteractiveCalculator />;
      case 'rent-a-rock':
        return <InteractiveRock />;
      default:
        return null;
    }
  };

  return (
    <main className="page-shell detail-page">
      <div className="container breadcrumb">
        <Link to="/">{isCs ? 'Domů' : 'Home'}</Link>
        <span>/</span>
        <Link to="/companies">{isCs ? 'Divize' : 'Companies'}</Link>
        <span>/</span>
        <span>{company.name}</span>
      </div>

      <section className="container detail-hero">
        <div className="detail-copy">
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            {categoryText} / Division {company.number}
          </div>
          <h1>
            {taglineText.split('.')[0]}.
            <br />
            <em>{taglineText.includes('.') ? taglineText.split('.').slice(1).join('.') : ''}</em>
          </h1>
          <p className="detail-intro">{introText}</p>
          <div className="hero-actions">
            <Link
              to="/contact"
              state={{ subject: `Poptávka na divizi ${company.name}` }}
              className="button button-dark"
            >
              {isCs ? 'Poptat nepohodlí této divize' : 'Enquire about this service'} <ArrowRight size={17} />
            </Link>
            <a href="#simulator" className="text-link">
              {isCs ? 'Vyzkoušet simulátor' : 'Try live simulator'} <ArrowRight size={15} />
            </a>
          </div>
        </div>

        <div className="detail-art">
          <div className="detail-art-grid" />
          <div className="detail-icon">
            <Icon size={64} strokeWidth={1.2} />
          </div>
          <span className="detail-art-index">ICG / {company.number}</span>
          <span className="detail-art-caption">
            {company.name.toUpperCase()}
            <br />
            {isCs ? 'DCÉŘINÁ SPOLEČNOST' : 'A GROUP COMPANY'}
          </span>
          <span className="detail-art-circle" />
        </div>
      </section>

      {/* Interactive Simulator Section */}
      <section id="simulator" className="container simulator-section">
        <div className="section-heading">
          <div>
            <div className="eyebrow"><span className="eyebrow-dot" />{isCs ? 'ŽIVÁ INTERAKTIVNÍ KONZOLA' : 'LIVE INTERACTIVE SIMULATOR'}</div>
            <h2>
              {isCs ? 'Vyzkoušejte si divizi' : 'Experience the service'}
              <br />
              <em>{isCs ? 'přímo v prohlížeči.' : 'directly in your browser.'}</em>
            </h2>
          </div>
        </div>

        {renderSimulator()}
      </section>

      <section className="container detail-body">
        <div>
          <div className="eyebrow"><span className="eyebrow-dot" />{isCs ? 'PŘEDMĚT ČINNOSTI' : 'WHAT WE DO'}</div>
          <h2>
            {isCs ? 'Navrženo s' : 'Designed with'}
            <br />
            <em>{isCs ? 'nevyvratitelnou zbytečností.' : 'unnecessary intent.'}</em>
          </h2>
        </div>
        <div className="detail-body-copy">
          <p>{offerText}</p>
          <div className="feature-list">
            {featuresList.map((f, i) => (
              <div className="feature-list-item" key={i}>
                <span>0{i + 1}</span>
                <b>{f}</b>
                <Check size={17} />
              </div>
            ))}
          </div>
          <div className="fine-print">
            <CircleHelp size={19} />
            <p>{noteText}</p>
          </div>
        </div>
      </section>

      <section className="detail-bottom">
        <div className="container detail-bottom-inner">
          <div>
            <div className="eyebrow eyebrow-light"><span className="eyebrow-dot" />{isCs ? 'DALŠÍ POSTUP' : 'NEXT STEPS'}</div>
            <h2>
              {isCs ? 'Chcete tento nápad' : 'Interested in making'}
              <br />
              <em>{isCs ? 'učinit zbytečně reálným?' : 'this unnecessarily real?'}</em>
            </h2>
          </div>
          <Link
            to="/contact"
            state={{ subject: `Dotaz na ${company.name}` }}
            className="button button-light"
          >
            {isCs ? 'Kontaktovat naše ředitelství' : 'Contact our team'} <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}
