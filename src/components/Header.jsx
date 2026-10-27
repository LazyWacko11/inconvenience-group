import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Building2, Menu, X, ArrowUpRight, Globe } from 'lucide-react';

export default function Header() {
  const [open, setOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const isCs = lang === 'cs';

  const navItems = [
    [t('navCompanies'), '/companies'],
    [t('navProducts'), '/store'],
    [t('navTools'), '/tools'],
    [t('navPhilosophy'), '/about'],
    [t('navCareers'), '/careers'],
    [t('navContact'), '/contact']
  ];

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link className="brand" to="/" aria-label="InConvenience Group home">
          <span className="brand-mark">
            <Building2 size={21} strokeWidth={1.8} />
          </span>
          <span className="brand-name">
            InConvenience <b>Group</b><sup>™</sup>
          </span>
        </Link>

        <div className="header-right-desktop">
          <nav className={open ? 'main-nav nav-open' : 'main-nav'}>
            {navItems.map(([label, to]) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              >
                {label}
              </NavLink>
            ))}

            <div className="lang-switcher">
              <button
                type="button"
                className={`lang-btn ${lang === 'cs' ? 'active' : ''}`}
                onClick={() => setLang('cs')}
                aria-label="Přepnout do češtiny"
              >
                CZ
              </button>
              <span className="lang-sep">|</span>
              <button
                type="button"
                className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
                onClick={() => setLang('en')}
                aria-label="Switch to English"
              >
                EN
              </button>
            </div>

            <Link className="nav-cta" to="/contact" onClick={() => setOpen(false)}>
              {t('navEnquiryCta')} <ArrowUpRight size={15} />
            </Link>
          </nav>
        </div>

        <button
          className="mobile-menu icon-button"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
