import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Building2 } from 'lucide-react';

export default function Footer() {
  const { lang, setLang, t } = useLanguage();
  const isCs = lang === 'cs';

  return (
    <footer className="footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <Link className="brand brand-light" to="/" aria-label="InConvenience Group home">
            <span className="brand-mark">
              <Building2 size={21} strokeWidth={1.8} />
            </span>
            <span className="brand-name">
              InConvenience <b>Group</b><sup>™</sup>
            </span>
          </Link>
          <p>
            {isCs
              ? 'Děláme pokrok podstatně složitějším již od nepaměti. 10 dceřiných firem a jeden spokojený orangutan.'
              : 'Making progress more complicated since absolutely no time at all. 10 operating divisions and one content primate.'}
          </p>

          <div className="footer-lang-picker">
            <span>{isCs ? 'Jazyk portálu:' : 'Interface language:'}</span>
            <button
              className={`footer-lang-btn ${lang === 'cs' ? 'active' : ''}`}
              onClick={() => setLang('cs')}
            >
              Čeština
            </button>
            <button
              className={`footer-lang-btn ${lang === 'en' ? 'active' : ''}`}
              onClick={() => setLang('en')}
            >
              English
            </button>
          </div>
        </div>

        <div className="footer-links">
          <div>
            <span className="footer-label">{t('footerExplore')}</span>
            <Link to="/companies">{isCs ? 'Všech 10 divizí' : 'All 10 Companies'}</Link>
            <Link to="/store">{isCs ? 'Katalog kuriozit' : 'Oddities Store'}</Link>
            <Link to="/tools">{isCs ? 'Bezplatné nástroje' : 'Free Tools Hub'}</Link>
            <Link to="/about">{isCs ? 'Naše filosofie' : 'Our Philosophy'}</Link>
            <Link to="/careers">{isCs ? 'Fiktivní kariéra' : 'Concept Careers'}</Link>
          </div>

          <div>
            <span className="footer-label">{t('footerContact')}</span>
            <Link to="/contact">{isCs ? 'Generální ředitelství' : 'Corporate Enquiries'}</Link>
            <Link to="/companies/petty-payback">PettyPayback™</Link>
            <Link to="/companies/winter-homes">InConvenience Igloos™</Link>
            <Link to="/companies/orangutan-outsourcing">Orangutan Outsourcing™</Link>
            <a href="mailto:generalni.reditelstvi@inconvenience.example">generalni.reditelstvi@inconvenience.example</a>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} InConvenience Group™</span>
        <span>{t('footerLegal')}</span>
        <span>{t('footerCrafted')}</span>
      </div>
    </footer>
  );
}
