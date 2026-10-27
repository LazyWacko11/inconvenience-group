import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { companies } from '../data/companies';
import { Search, X, ChevronDown, CircleHelp, ShieldCheck, ArrowUpRight } from 'lucide-react';

export default function Companies() {
  const { lang, t } = useLanguage();
  const isCs = lang === 'cs';

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All sectors');

  const categories = useMemo(() => {
    const all = isCs ? 'Všechny sektory' : 'All sectors';
    const set = new Set(companies.map((c) => (c.category[lang] || c.category.cs)));
    return [all, ...Array.from(set)];
  }, [lang, isCs]);

  const filtered = useMemo(() => {
    const allLabel = isCs ? 'Všechny sektory' : 'All sectors';
    return companies.filter((c) => {
      const catText = c.category[lang] || c.category.cs;
      const matchCat = category === allLabel || category === 'All sectors' || catText === category;
      const matchQuery = `${c.name} ${catText} ${c.short[lang] || c.short.cs}`.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [query, category, lang, isCs]);

  return (
    <main className="page-shell">
      <section className="page-hero container">
        <div className="eyebrow"><span className="eyebrow-dot" />{isCs ? 'PORTFOLIO SKUPINY / 2026' : 'PORTFOLIO DIRECTORY / 2026'}</div>
        <h1>
          {isCs ? 'Hloupé nápady.' : 'Absurd Concepts.'}
          <br />
          <em>{isCs ? 'Nepochopitelně velké ambice.' : 'Unreasonably large ambitions.'}</em>
        </h1>
        <p>
          {isCs
            ? 'Naše dceřiné firmy působí napříč spektrem odvětví, která nás vůbec nepotřebovala. Od odplaty pomocí kartonových krabic až po pronájem nemluvících kamenů.'
            : 'Our subsidiaries operate across an expansive spectrum of industries that never requested our assistance. From revenge cardboard to mineral leasing.'}
        </p>
        <div className="page-hero-meta">
          <span>10 {isCs ? 'DIVIZÍ' : 'DIVISIONS'}</span>
          <span>06 {isCs ? 'SEKTORŮ S POCHYBNÝM PŘÍNOSEM' : 'SECTORS OF QUESTIONABLE NECESSITY'}</span>
          <span>01 {isCs ? 'HOLDING' : 'HOLDING'}</span>
        </div>
      </section>

      <section className="container catalog-section">
        <div className="catalog-tools">
          <label className="search-box">
            <Search size={18} />
            <input
              aria-label="Search companies"
              placeholder={t('searchPlaceholder')}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button className="clear-search" onClick={() => setQuery('')} aria-label="Clear search">
                <X size={16} />
              </button>
            )}
          </label>

          <label className="select-wrap">
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <ChevronDown size={16} />
          </label>

          <span className="result-count">{filtered.length} {t('resultsCount')}</span>
        </div>

        {filtered.length > 0 ? (
          <div className="company-grid catalog-grid">
            {filtered.map((c) => {
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
                    <span>{isCs ? 'Otevřít simulátor divize' : 'Explore Simulator'}</span>
                    <span className="arrow-circle"><ArrowUpRight size={17} /></span>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="empty-state">
            <CircleHelp size={28} />
            <h3>{t('noResults')}</h3>
            <p>{t('noResultsDesc')}</p>
            <button
              className="button button-dark"
              onClick={() => {
                setQuery('');
                setCategory(isCs ? 'Všechny sektory' : 'All sectors');
              }}
            >
              {t('resetFilters')}
            </button>
          </div>
        )}
      </section>

      <section className="catalog-note">
        <div className="container">
          <ShieldCheck size={21} />
          <p>
            <b>{t('disclaimerTitle')}</b> {t('disclaimerText')}
          </p>
        </div>
      </section>
    </main>
  );
}
