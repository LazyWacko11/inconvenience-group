import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { BriefcaseBusiness, X, ArrowUpRight, ArrowRight, CircleHelp, Check } from 'lucide-react';

export default function Careers() {
  const { lang } = useLanguage();
  const isCs = lang === 'cs';

  const [expanded, setExpanded] = useState(null);
  const [applyingFor, setApplyingFor] = useState(null);
  const [applied, setApplied] = useState(false);

  const roles = [
    {
      name: isCs ? 'Specialista na pokládání jediné lahve' : 'Executive Single Bottle Placement Specialist',
      team: 'PETTYPAYBACK™ / OPERATIONS',
      type: isCs ? 'Plný úvazek · Smoking v ceně' : 'Full-time · Tuxedo provided',
      desc: isCs
        ? 'Budete osobně cestovat do čistých kanceláří klientů, slavnostně položíte jednu prázdnou plastovou lahev doprostřed koberce, vyfotíte ji a beze slova odejdete. Vyžaduje se pokerová tvář a nulová empatie.'
        : 'Responsible for traveling to client premises in bespoke formalwear, placing exactly one empty mineral bottle on immaculate flooring, capturing a Leica photo, and departing silently. Uncompromising deadpan demeanor mandatory.'
    },
    {
      name: isCs ? 'Asistent orangutana & údržbář psacího stroje' : 'Primate Strategy Associate & Mechanical Keyboard Reset Lead',
      team: 'ORANGUTAN OUTSOURCING™',
      type: isCs ? 'Flexibilní · Výplata v ovoci' : 'On-site · Organic fruit perks',
      desc: isCs
        ? 'Vaším úkolem je měnit papír v psacím stroji, doplňovat banány Dr. Pongidaemu a interpretovat náhodné shluky písmen jako novou podnikovou strategii pro Q4.'
        : 'Support Dr. Pongidae by replenishing paper rolls, providing unbruised plantains, and translating random mechanical keystroke sequences into compelling shareholder slide decks.'
    },
    {
      name: isCs ? 'Seniorní prodlužovač porad (Meeting Prolongation Lead)' : 'Senior Meeting Prolongation Facilitator',
      team: 'PEOPLE & BUREAUCRACY',
      type: isCs ? 'Nekonečný úvazek' : 'Permanent committee status',
      desc: isCs
        ? 'Když hrozí, že porada skončí o 10 minut dříve, vstoupíte do diskuse s otázkou: „A jak toto zapadá do naší širší holistické vize pro rok 2035?“'
        : 'Whenever a corporate standup threatens to conclude ahead of schedule, you intervene with: "Perhaps we should unpack how this initiative aligns with our multi-decade legacy posture?"'
    },
    {
      name: isCs ? 'Inspektor tání sněhu a vodních ploch' : 'Snow Liquefaction & Aquatics Risk Inspector',
      team: 'INCONVENIENCE IGLOOS™',
      type: isCs ? 'Pouze v březnu' : 'Seasonal Spring deployment',
      desc: isCs
        ? 'Dohlížíte na to, aby rekreační sněhová sídla na jaře plynule přešla do kapalné fáze a zákazník byl včas vyzván k úhradě rekonstrukce na další zimu.'
        : 'Monitor the physical phase transition of customer winter palaces from structural ice to scenic wetlands, generating prompt reconstruction invoices.'
    }
  ];

  const handleApply = (roleName) => {
    setApplyingFor(roleName);
    setApplied(true);
  };

  return (
    <main className="page-shell">
      <section className="page-hero container">
        <div className="eyebrow"><span className="eyebrow-dot" />{isCs ? 'KARIÉRA / LIDÉ & BYROKRACIE' : 'CAREERS / HUMAN CAPITAL & COMPLICATION'}</div>
        <h1>
          {isCs ? 'Dělejte práci, která' : 'Do work that matters.'}
          <br />
          <em>{isCs ? 'vůbec nemá smysl.' : 'Eventually, perhaps.'}</em>
        </h1>
        <p>
          {isCs
            ? 'Připojte se k fiktivnímu týmu se skutečným nadšením pro zbytečné papírování, drahé lepicí papírky a strategická zpoždění.'
            : 'Join an imaginary corporate family with authentic zeal for circular administrative overhead, formal stationery, and strategic gridlock.'}
        </p>

        <div className="career-banner">
          <BriefcaseBusiness size={27} />
          <div>
            <b>{isCs ? 'Aktuální fiktivní příležitosti' : 'Current Openings'}</b>
            <span>{roles.length} {isCs ? 'konceptuálních rolí · 0 skutečných míst' : 'concept roles · 0 real vacancies'}</span>
          </div>
          <span className="status-pill">{isCs ? 'PRO VAŠI ZÁBAVU' : 'FOR ENTERTAINMENT'}</span>
        </div>
      </section>

      <section className="container careers-list">
        <div className="section-mini-head">
          <span>{isCs ? 'POZICE / ODDĚLENÍ' : 'ROLE / DEPARTMENT'}</span>
          <span>{isCs ? 'PODROBNOSTI' : 'DETAILS'}</span>
        </div>

        {roles.map((r, i) => (
          <article className="career-row" key={r.name}>
            <button
              className="career-toggle"
              onClick={() => setExpanded(expanded === i ? null : i)}
              aria-expanded={expanded === i}
            >
              <span className="career-num">0{i + 1}</span>
              <span className="career-name">
                <small>{r.team}</small>
                <b>{r.name}</b>
              </span>
              <span className="career-type">{r.type}</span>
              <span className="career-arrow">
                {expanded === i ? <X size={19} /> : <ArrowUpRight size={19} />}
              </span>
            </button>

            {expanded === i && (
              <div className="career-expanded fade-in">
                <p>{r.desc}</p>
                <div className="career-action-bar">
                  <button
                    className="button button-dark"
                    onClick={() => handleApply(r.name)}
                  >
                    {isCs ? 'Podat fiktivní přihlášku' : 'Submit Satirical Application'} <ArrowRight size={16} />
                  </button>
                  <Link
                    to="/contact"
                    state={{ subject: `Dotaz na pozici: ${r.name}` }}
                    className="text-link"
                  >
                    {isCs ? 'Zeptat se na detaily' : 'Inquire with HR'}
                  </Link>
                </div>
              </div>
            )}
          </article>
        ))}
      </section>

      {applied && (
        <div className="modal-backdrop" onClick={() => setApplied(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <b>{isCs ? 'Potvrzení o podání přihlášky' : 'Application Receipt Advisory'}</b>
              <button className="icon-button" onClick={() => setApplied(false)}><X size={20} /></button>
            </div>
            <div className="modal-body text-center">
              <Check size={48} className="text-highlight mb-3" />
              <h3>{isCs ? 'Vaše přihláška byla postoupena orangutanovi!' : 'Application Dispatched to Dr. Pongidae!'}</h3>
              <p>
                {isCs
                  ? `Děkujeme za váš zájem o pozici „${applyingFor}“. Váš životopis byl vytištěn a použit jako podestýlka v naší strategické kanceláři. Případné výběrové řízení proběhne v říjnu 2038.`
                  : `Thank you for expressing interest in "${applyingFor}". Your CV has been rendered onto recycled cardboard. Interviews are tentatively scheduled for Q4 2038.`}
              </p>
              <button className="button button-dark full-width mt-4" onClick={() => setApplied(false)}>
                {isCs ? 'Rozumím a akceptuji absurditu' : 'Acknowledge Bureaucratic Limbo'}
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="catalog-note">
        <div className="container">
          <CircleHelp size={21} />
          <p>
            <b>{isCs ? 'Drobné písmo:' : 'Legal Note:'}</b> {isCs ? 'Toto jsou satirické role vytvořené pro pobavení. Skupina neshromažďuje životopisy ani reálné osobní údaje.' : 'These are fictional roles for satirical entertainment. No actual hiring or CV collection is underway.'}
          </p>
        </div>
      </section>
    </main>
  );
}
