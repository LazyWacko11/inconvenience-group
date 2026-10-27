import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { companies } from '../data/companies';
import { Mail, Clock3, ShieldCheck, Check, ArrowRight } from 'lucide-react';

export default function Contact() {
  const location = useLocation();
  const { lang } = useLanguage();
  const isCs = lang === 'cs';

  const defaultSubject = location.state?.subject || (isCs ? 'Všeobecná poptávka nepohodlí' : 'General Enquiry');

  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: defaultSubject,
    complexity: 'extreme',
    message: ''
  });
  const [sent, setSent] = useState(false);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main className="page-shell">
      <section className="page-hero container contact-hero">
        <div className="eyebrow"><span className="eyebrow-dot" />{isCs ? 'KONTAKT / ODDĚLENÍ VYŠETŘOVÁNÍ' : 'CONTACT / DEPARTMENT OF ENQUIRIES'}</div>
        <h1>
          {isCs ? 'Rádi si poslechneme,' : 'We would love to hear'}
          <br />
          <em>{isCs ? 'co by se mohlo pokazit.' : 'what could go wrong.'}</em>
        </h1>
        <p>
          {isCs
            ? 'Máte dokonale jednoduchou životní situaci, která by si zasloužila dedikovaný výbor, 2 000 krabic nebo zapojení primáta? Pošlete nám zprávu.'
            : 'Do you possess a straightforward everyday challenge that demands a steering committee, 2,000 cardboard boxes, or primate mediation? Submit a brief.'}
        </p>
      </section>

      <section className="container contact-layout">
        <div className="contact-details">
          <div className="contact-detail-item">
            <span className="contact-detail-icon"><Mail size={19} /></span>
            <div>
              <small>{isCs ? 'GENERÁLNÍ EMAIL' : 'GENERAL ENQUIRIES'}</small>
              <b>generalni.reditelstvi@inconvenience.example</b>
              <p>{isCs ? 'Naše fiktivní schránka je konceptuálně nepřetržitě otevřena.' : 'Our fictional inbox remains conceptually unmonitored around the clock.'}</p>
            </div>
          </div>

          <div className="contact-detail-item">
            <span className="contact-detail-icon"><Clock3 size={19} /></span>
            <div>
              <small>{isCs ? 'DOBA ODEZVY' : 'RESPONSE WINDOW'}</small>
              <b>{isCs ? 'Do 3 až 7 zdlouhavých porad' : 'Within 3 to 7 strategic standups'}</b>
              <p>{isCs ? 'Reálná odezva závisí na dostupnosti banánů pro vedení.' : 'Response velocity dictated by boardroom fruit availability.'}</p>
            </div>
          </div>

          <div className="contact-disclaimer">
            <ShieldCheck size={19} />
            <p>
              {isCs
                ? 'Toto je front-endová demonstrace. Formulář neukládá data ani neodesílá zprávy na reálné servery.'
                : 'Front-end demonstration. Form validation runs entirely in-browser; zero personal data is transmitted.'}
            </p>
          </div>
        </div>

        <div className="contact-form-wrap">
          {sent ? (
            <div className="form-success fade-in" role="status">
              <span className="success-icon"><Check size={25} /></span>
              <div className="eyebrow"><span className="eyebrow-dot" />{isCs ? 'ŽÁDOST ZAŘAZENA DO POŘADÍ' : 'ENQUIRY QUEUED'}</div>
              <h2>
                {isCs ? 'Zpráva byla přijata.' : 'Message received.'}
                <br />
                <em>{isCs ? 'Konceptuálně vzato.' : 'Conceptually speaking.'}</em>
              </h2>
              <p>
                {isCs
                  ? `Děkujeme, ${form.name || 'vážený kliente'}. Vaše poptávka s požadovanou úrovní komplikace byla vytištěna a uložena do trezoru divize PettyPayback™.`
                  : `Thank you, ${form.name || 'valued client'}. Your brief has been routed to the appropriate subcommittee for thorough over-analysis.`}
              </p>
              <button
                className="button button-dark"
                onClick={() => {
                  setSent(false);
                  setForm({ name: '', email: '', subject: 'Všeobecná poptávka', complexity: 'extreme', message: '' });
                }}
              >
                {isCs ? 'Zadat další komplikaci' : 'Prepare another enquiry'} <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={submit}>
              <div className="form-heading">
                <h2>{isCs ? 'Poptat nepohodlí' : 'Submit Enquiry'}</h2>
                <span>FORMULÁŘ 001</span>
              </div>

              <div className="form-field">
                <label htmlFor="name">{isCs ? 'Vaše jméno a titul' : 'Your Full Name & Honorific'}</label>
                <input
                  id="name"
                  name="name"
                  required
                  value={form.name}
                  onChange={update}
                  placeholder={isCs ? 'např. Jan Novák, CSc.' : 'e.g. Jane Doe, Esq.'}
                />
              </div>

              <div className="form-field">
                <label htmlFor="email">{isCs ? 'E-mailová adresa' : 'Email Address'}</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={update}
                  placeholder="klient@priklad.cz"
                />
              </div>

              <div className="form-field">
                <label htmlFor="subject">{isCs ? 'Kterou divizi si přejete zapojit?' : 'Target Operating Division'}</label>
                <select id="subject" name="subject" value={form.subject} onChange={update}>
                  <option>{isCs ? 'Všeobecná poptávka nepohodlí' : 'General Holding Enquiry'}</option>
                  {companies.map((c) => (
                    <option key={c.slug} value={`Poptávka na ${c.name}`}>
                      {c.name} ({c.category[lang] || c.category.cs})
                    </option>
                  ))}
                  <option>{isCs ? 'Objednávka Dvounohých kalhot pro koně' : 'Order Two-Legged Horse Pants'}</option>
                  <option>{isCs ? 'Poptávka dětského kuželu KidCone™' : 'KidCone™ Procurement'}</option>
                  <option>{isCs ? 'Kariéra a fiktivní nábor' : 'Careers & Concept Roles'}</option>
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="complexity">{isCs ? 'Požadovaná úroveň komplikace' : 'Desired Complication Quotient'}</label>
                <select id="complexity" name="complexity" value={form.complexity} onChange={update}>
                  <option value="mild">{isCs ? 'Mírná (pouze 2 porady navíc a 100 lepících papírků)' : 'Mild (2 additional standups & 100 sticky notes)'}</option>
                  <option value="extreme">{isCs ? 'Extrémní (zapojení orangutana a 2 000 kartonových krabic)' : 'Extreme (Primate involvement & 2,000 cardboard boxes)'}</option>
                  <option value="apocalypse">{isCs ? 'Totální apokalypsa (jedna láhev položená ředitelem v obleku)' : 'Executive Apocalypse (Single bottle placed by CEO)'}</option>
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="message">{isCs ? 'Popis vašeho problému (jak ho můžeme zhoršit?)' : 'Your Message (How may we complicate this?)'}</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={update}
                  placeholder={isCs ? 'Napište nám, o co se jedná a proč si to zaslouží okliku...' : 'Describe your routine problem and allow us to re-engineer it...'}
                />
              </div>

              <button type="submit" className="button button-dark form-submit">
                {isCs ? 'Odeslat do byrokratického soukolí' : 'Submit to Bureaucracy'} <ArrowRight size={17} />
              </button>
              <p className="form-legal">
                {isCs ? 'Odesláním potvrzujete, že vaše trpělivost je neomezená.' : 'By submitting, you consent to unnecessary operational processing.'}
              </p>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
