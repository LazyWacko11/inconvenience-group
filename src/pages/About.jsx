import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, Building2, Check, ShieldCheck, Award } from 'lucide-react';

export default function About() {
  const { lang } = useLanguage();
  const isCs = lang === 'cs';

  const leaders = [
    {
      name: 'Dr. Barnaby Pongidae',
      role: isCs ? 'Hlavní opičí stratég (Chief Strategy Orangutan)' : 'Chief Strategy Orangutan & Executive Chair',
      bio: isCs ? 'Certifikovaný primát, držitel rekordu v psaní na mechanické klávesnici. Zodpovědný za streamovací algoritmus Oranguflixu a nákup banánových futures.' : 'Certified primate holding typing endurance records. Oversees Oranguflix content routing and tropical fruit futures.'
    },
    {
      name: 'Viktorie Malicherná',
      role: isCs ? 'Generální ředitelka malicherností (Chief Petty Officer)' : 'Chief Executive of Petty Affairs',
      bio: isCs ? 'Bývalá korporátní auditorka. Osobně pokládá prázdné PET lahve uprostřed čistých koberců a dohlíží na balíčky PettyPayback™.' : 'Former audit partner. Personally places single empty mineral bottles in spotless executive boardrooms.'
    },
    {
      name: 'Ing. Kryštof Oklika',
      role: isCs ? 'Ředitel strategických oklik (Director of Detours)' : 'Director of Navigational Inconvenience',
      bio: isCs ? 'Navigoval z Prahy do Brna přes Antarktidu. Věří, že přímé trasy jsou projevem nedostatku kulturního rozhledu.' : 'Navigated Prague to Brno via Cape Horn. Believes direct transit is a symptom of spiritual laziness.'
    }
  ];

  return (
    <main className="page-shell">
      <section className="page-hero container about-hero">
        <div className="eyebrow"><span className="eyebrow-dot" />{isCs ? 'O NÁS / HISTORIE & PRINCIPY' : 'ABOUT US / GENESIS & PRINCIPLES'}</div>
        <h1>
          {isCs ? 'Lepší zítřek není' : 'A simpler future is'}
          <br />
          <em>{isCs ? 'ani trochu zaručen.' : 'categorically not guaranteed.'}</em>
        </h1>
        <p>
          {isCs
            ? 'Vznikli jsme z filozofické debaty o tom, jaký je nejhloupější podnikatelský záměr na světě. Když jsme zjistili, že pronájem kamene i pojištění ponožek už existují, uvědomili jsme si, že jediná cesta vpřed je dovést absurditu k dokonalosti.'
            : 'Born from an inquiry into the single most preposterous startup concept conceivable. Upon discovering that pet stone leasing and sock insurance already existed in the wild, we committed to pushing the boundaries of strategic inconvenience.'}
        </p>

        <div className="about-stats">
          <div>
            <b>01</b>
            <span>{isCs ? 'JEDNOTNÁ DOKTRÍNA KOMPLIKACÍ' : 'OVERARCHING DETOUR PRINCIPLE'}</span>
          </div>
          <div>
            <b>10</b>
            <span>{isCs ? 'SATIRICKÝCH DCÉŘINÝCH FIREM' : 'SATIRICAL OPERATING COMPANIES'}</span>
          </div>
          <div>
            <b>∞</b>
            <span>{isCs ? 'NEVYČERPATELNÝ ODPAD A RESENTIMENT' : 'CIRCULAR RUBBISH POSSIBILITIES'}</span>
          </div>
        </div>
      </section>

      <section className="manifesto about-manifesto">
        <div className="container manifesto-inner">
          <div className="manifesto-side">
            <div className="eyebrow eyebrow-light"><span className="eyebrow-dot" />{isCs ? 'KORPORÁTNÍ CHARTA' : 'THE GROUP CREED'}</div>
            <span className="manifesto-index">POLICY / 001</span>
          </div>
          <div className="manifesto-main">
            <h2>{isCs ? 'Nevěříme v dělání více s menším úsilím.' : 'We do not believe in doing more with less.'}</h2>
            <p>
              {isCs
                ? 'Věříme v dělání přibližně téhož s trojnásobným počtem schvalovacích komisí, jedním orangutanem a 2 000 kartonovými krabicemi.'
                : 'We believe in achieving approximately the same outcome with three additional oversight committees, an orangutan, and 2,000 cardboard boxes.'}
            </p>
            <p>
              {isCs
                ? 'Náš holding sdružuje myšlenky, které berou běžné služby (úklid, ubytování, reklamu, navigaci), otočí je o 180 stupňů a prezentují výsledek se sebevědomím čtvrtletního hovoru s investory.'
                : 'Our fictional conglomerate re-engineers familiar concepts (cleaning, lodging, advertising, transit), reverses their polarity, and presents the resulting disorder with the gravitas of a Fortune 500 earnings report.'}
            </p>
          </div>
          <div className="manifesto-aside">
            {isCs ? '„Pokud to funguje, zkomplikujte to. Pokud to nefunguje, vytvořte novou divizi.“' : '“If it functions, add approval tiers. If it fails, spin off a new subsidiary.”'}
            <span>— Group Operations</span>
          </div>
        </div>
      </section>

      <section className="container values-section">
        <div className="eyebrow"><span className="eyebrow-dot" />{isCs ? 'VEDENÍ SPOLEČNOSTI' : 'EXECUTIVE BOARD'}</div>
        <h2>
          {isCs ? 'Lidé (a primáti) za' : 'The leadership behind'}
          <br />
          <em>{isCs ? 'našimi neúspěchy.' : 'our strategic complexity.'}</em>
        </h2>

        <div className="values-grid">
          {leaders.map((l, i) => (
            <article key={i}>
              <span>0{i + 1}</span>
              <h3>{l.name}</h3>
              <small className="leader-role">{l.role}</small>
              <p>{l.bio}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-strip">
        <div className="container contact-strip-inner">
          <div>
            <div className="eyebrow"><span className="eyebrow-dot" />{isCs ? 'LÁKÁ VÁS TENTO PŘÍSTUP?' : 'INSPIRED BY OUR DOGMA?'}</div>
            <h2>
              {isCs ? 'Prohlédněte si portfolio' : 'Explore the full'}
              <br />
              <em>{isCs ? 'všech našich 10 divizí.' : 'portfolio of 10 divisions.'}</em>
            </h2>
          </div>
          <Link to="/companies" className="button button-dark">
            {isCs ? 'Do katalogu firem' : 'View Companies'} <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}
