import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { companies } from '../data/companies';
import { products } from '../data/products';
import {
  ArrowRight, ArrowDownRight, ArrowUpRight, Clock3, Sparkles,
  ShoppingBag, Compass, Skull, Snowflake, BriefcaseBusiness
} from 'lucide-react';

export default function Home() {
  const { lang, t } = useLanguage();
  const isCs = lang === 'cs';

  const [task, setTask] = useState('');
  const [minutes, setMinutes] = useState('15');
  const [estimate, setEstimate] = useState(null);

  const runCalculator = (e) => {
    e.preventDefault();
    const n = Math.max(1, Number(minutes) || 1);
    setEstimate({
      normal: n,
      official: Math.ceil(n * 2.4 + 18),
      task: task.trim() || (isCs ? 'Váš vágní úkol' : 'Your unspecified task')
    });
  };

  const featuredCompanies = companies.slice(0, 4);
  const featuredProducts = products.slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="hero-grid container">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              {t('heroEyebrow')}
            </div>
            <h1>
              {t('heroTitlePrefix')}
              <br />
              <em>{t('heroTitleEm')}</em>
            </h1>
            <p className="hero-lead">
              {t('heroLead')}
            </p>
            <div className="hero-actions">
              <Link to="/companies" className="button button-dark">
                {t('heroCtaCompanies')} <ArrowRight size={17} />
              </Link>
              <Link to="/tools" className="button button-light">
                {isCs ? 'Bezplatné nástroje' : 'Free Tools'} <Sparkles size={16} />
              </Link>
              <Link to="/about" className="text-link">
                {t('heroCtaPhilosophy')} <ArrowDownRight size={17} />
              </Link>
            </div>
            <div className="hero-proof">
              <div className="proof-avatars">
                <span>🦧</span>
                <span>🪨</span>
                <span>🐎</span>
              </div>
              <p>
                <b>{t('heroConceptsCount')}</b>
                <br />
                {t('heroConceptsSubtitle')}
              </p>
            </div>
          </div>

          <div className="hero-art" aria-label="Abstract corporate sculpture illustration">
            <div className="art-label art-label-top">{t('heroFigLabel')}</div>
            <div className="art-orbit orbit-one" />
            <div className="art-orbit orbit-two" />
            <div className="art-sun" />
            <div className="art-block block-one" />
            <div className="art-block block-two" />
            <div className="art-block block-three" />
            <div className="art-arch"><div /></div>
            <div className="art-stem" />
            <div className="art-stamp">{t('heroStamp')}</div>
            <div className="art-label art-label-bottom">
              <span>EST. WHENEVER</span>
              <span>{isCs ? 'BUDOUCNOST JE VOLITELNÁ' : 'THE FUTURE IS OPTIONAL'}</span>
            </div>
          </div>
        </div>

        <div className="hero-ticker">
          <div className="ticker-track">
            <span>{t('heroTicker1')}</span>
            <i>✳</i>
            <span>{t('heroTicker2')}</span>
            <i>✳</i>
            <span>{t('heroTicker3')}</span>
            <i>✳</i>
            <span>{t('heroTicker4')}</span>
            <i>✳</i>
            <span>{t('heroTicker1')}</span>
            <i>✳</i>
            <span>{t('heroTicker2')}</span>
            <i>✳</i>
          </div>
        </div>
      </section>

      {/* Featured Companies Section */}
      <section className="section container">
        <div className="section-heading">
          <div>
            <div className="eyebrow"><span className="eyebrow-dot" />{t('portfolioEyebrow')}</div>
            <h2>
              {t('portfolioTitlePrefix')}
              <br />
              <em>{t('portfolioTitleEm')}</em>
            </h2>
          </div>
          <Link className="text-link" to="/companies">
            {t('portfolioViewAll')} <ArrowRight size={17} />
          </Link>
        </div>

        <div className="company-grid">
          {featuredCompanies.map((c) => {
            const Icon = c.icon;
            return (
              <Link to={`/companies/${c.slug}`} key={c.slug} className="company-card">
                <div className="card-top">
                  <span className="card-number">{c.number} / 10</span>
                  <span className="card-icon"><Icon size={21} /></span>
                </div>
                <div className="card-copy">
                  <span className="category">{c.category[lang] || c.category.cs}</span>
                  <h3>{c.name}</h3>
                  <p>{c.short[lang] || c.short.cs}</p>
                </div>
                <div className="card-bottom">
                  <span>{isCs ? 'Otevřít simulátor' : 'Explore Simulator'}</span>
                  <span className="arrow-circle"><ArrowUpRight size={17} /></span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Hardware / Oddities */}
      <section className="section container store-teaser-section">
        <div className="section-heading">
          <div>
            <div className="eyebrow"><span className="eyebrow-dot" />{isCs ? 'DIVIZE HARDWARU A VYNÁLEZŮ' : 'HARDWARE & INVENTIONS DIVISION'}</div>
            <h2>
              {isCs ? 'Fyzické produkty,' : 'Tangible products,'}
              <br />
              <em>{isCs ? 'které nikdo nechtěl.' : 'no one requested.'}</em>
            </h2>
          </div>
          <Link className="text-link" to="/store">
            {isCs ? 'Prohlédnout celý katalog (8 kuriozit)' : 'View full store (8 curiosities)'} <ArrowRight size={17} />
          </Link>
        </div>

        <div className="products-grid teaser-grid">
          {featuredProducts.map((p) => (
            <article key={p.id} className="product-card">
              <div className="product-card-top">
                <span className="product-emoji">{p.imageEmoji}</span>
                <span className="product-tag">{p.tag[lang] || p.tag.cs}</span>
              </div>
              <div className="product-card-content">
                <small className="product-category">{p.category[lang] || p.category.cs}</small>
                <h3>{p.name[lang] || p.name.cs}</h3>
                <p>{p.short[lang] || p.short.cs}</p>
              </div>
              <div className="product-card-footer">
                <div className="product-price">
                  <span className="price-val">€{p.price}</span>
                </div>
                <Link to="/store" className="button button-dark">
                  <ShoppingBag size={15} />
                  <span>{isCs ? 'Do obchodu' : 'Details'}</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Manifesto */}
      <section className="manifesto">
        <div className="container manifesto-inner">
          <div className="manifesto-side">
            <div className="eyebrow eyebrow-light"><span className="eyebrow-dot" />{t('manifestoEyebrow')}</div>
            <span className="manifesto-index">{t('manifestoCode')}</span>
          </div>
          <div className="manifesto-main">
            <h2>
              {t('manifestoTitlePrefix')}
              <br />
              <em>{t('manifestoTitleEm')}</em>
              <br />
              {t('manifestoTitleSuffix')}
            </h2>
            <p>{t('manifestoParagraph1')}</p>
            <p>{t('manifestoParagraph2')}</p>
            <Link to="/about" className="button button-light">
              {t('manifestoButton')} <ArrowRight size={17} />
            </Link>
          </div>
          <div className="manifesto-aside">
            {t('manifestoAsideQuote')}
            <span>{t('manifestoAsideAuthor')}</span>
          </div>
        </div>
      </section>

      {/* Task Bloat Calculator */}
      <section className="section container split-section">
        <div className="split-copy">
          <div className="eyebrow"><span className="eyebrow-dot" />{t('calculatorEyebrow')}</div>
          <h2>
            {t('calculatorTitlePrefix')}
            <br />
            <em>{t('calculatorTitleEm')}</em>
          </h2>
          <p>{t('calculatorLead')}</p>
          <form className="mini-calculator" onSubmit={runCalculator}>
            <label htmlFor="task-name">{t('calcTaskLabel')}</label>
            <input
              id="task-name"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder={t('calcTaskPlaceholder')}
            />
            <div className="calculator-row">
              <div>
                <label htmlFor="task-minutes">{t('calcMinutesLabel')}</label>
                <input
                  id="task-minutes"
                  type="number"
                  min="1"
                  max="600"
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                />
              </div>
              <button className="button button-dark" type="submit">
                {t('calcSubmit')} <ArrowRight size={16} />
              </button>
            </div>
            {estimate && (
              <div className="estimate-result" role="status">
                <span>{t('calcOfficialEstimate')}</span>
                <b>{estimate.official} {t('calcMinutesSuffix')}</b>
                <p>
                  „{estimate.task}“ {isCs ? 'si vyžádá dodatečných' : 'has been assigned'} {estimate.official - estimate.normal} {isCs ? 'minut na schvalování vedením a porady.' : 'additional minutes for administrative compliance.'}
                </p>
              </div>
            )}
          </form>
        </div>

        <div className="feature-visual">
          <div className="feature-visual-top">
            <span>INTERNAL DOCUMENT / 04</span>
            <span>FOR DISCUSSION ONLY</span>
          </div>
          <div className="feature-big-number">
            +{estimate ? estimate.official - estimate.normal : '47'}
            <small>{t('calcOverheadTag')}</small>
          </div>
          <div className="feature-rule" />
          <div className="feature-visual-bottom">
            <span>{isCs ? 'Odhadovaná dodatečná komplexita' : 'Estimated additional complexity'}</span>
            <span className="yellow-dot" />
          </div>
          <div className="feature-sticker">
            <Clock3 size={19} />
            <span>{t('calcTimeSuggestion')}</span>
          </div>
        </div>
      </section>

      {/* Contact Strip */}
      <section className="contact-strip">
        <div className="container contact-strip-inner">
          <div>
            <div className="eyebrow"><span className="eyebrow-dot" />{t('contactStripEyebrow')}</div>
            <h2>
              {t('contactStripTitlePrefix')}
              <br />
              <em>{t('contactStripTitleEm')}</em>
            </h2>
          </div>
          <Link to="/contact" className="button button-dark">
            {t('contactStripCta')} <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
    </>
  );
}
