import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Plane, Bike, Package, Check, AlertCircle, ArrowRight, User } from 'lucide-react';

export default function InteractiveMobility() {
  const { lang } = useLanguage();
  const isCs = lang === 'cs';

  const [activeTab, setActiveTab] = useState('flight');

  // Flight state
  const [passengerName, setPassengerName] = useState('Lord Václav Novák');
  const [seat] = useState('42E (Střední sedadlo)');

  // Tracker state
  const [trackingCode, setTrackingCode] = useState('ICG-8842-BANANA');
  const [tracked, setTracked] = useState(true);

  // SquareCycle state
  const [waived, setWaived] = useState(false);
  const [bookedBike, setBookedBike] = useState(false);

  return (
    <div className="interactive-module">
      <div className="module-header">
        <div className="module-badge">
          <Plane size={16} />
          <span>{isCs ? 'CENTRUM MULTIMODÁLNÍHO UTRPENÍ' : 'MULTIMODAL DISCOMFORT HUB'}</span>
        </div>
        <h3>{isCs ? 'InConvenience Mobility: Vyberte si svůj dopravní rébus' : 'InConvenience Mobility: Select Your Transit Experiment'}</h3>
      </div>

      <div className="mobility-tab-nav">
        <button
          className={`mob-tab-btn ${activeTab === 'flight' ? 'active' : ''}`}
          onClick={() => setActiveTab('flight')}
        >
          <Plane size={16} />
          <span>{isCs ? 'Nowhere Airlines (Let 000)' : 'Nowhere Airlines (Flight 000)'}</span>
        </button>
        <button
          className={`mob-tab-btn ${activeTab === 'square' ? 'active' : ''}`}
          onClick={() => setActiveTab('square')}
        >
          <Bike size={16} />
          <span>{isCs ? 'Půjčovna kol SquareCycle™' : 'SquareCycle™ Rentals'}</span>
        </button>
        <button
          className={`mob-tab-btn ${activeTab === 'tracker' ? 'active' : ''}`}
          onClick={() => setActiveTab('tracker')}
        >
          <Package size={16} />
          <span>{isCs ? 'Sledování zásilek Orangutan Express' : 'Orangutan Express Tracker'}</span>
        </button>
      </div>

      <div className="mobility-content">
        {activeTab === 'flight' && (
          <div className="flight-panel fade-in">
            <div className="form-group">
              <label>{isCs ? 'Jméno pasažéra pro palubní vstupenku:' : 'Passenger Name for Boarding Pass:'}</label>
              <input
                type="text"
                value={passengerName}
                onChange={(e) => setPassengerName(e.target.value)}
                placeholder="Jane Doe"
              />
            </div>

            <div className="boarding-pass">
              <div className="bp-left">
                <div className="bp-brand">
                  <Plane size={20} />
                  <b>NOWHERE AIRLINES™</b>
                  <span>FLIGHT 000</span>
                </div>
                <div className="bp-route">
                  <div>
                    <span className="airport-code">PRG</span>
                    <small>Gate 4B</small>
                  </div>
                  <div className="route-arrow">
                    <span>🔄 6 {isCs ? 'HODIN' : 'HOURS'} 🔄</span>
                    <small>{isCs ? 'Kroužení v oblacích' : 'Airspace Orbit'}</small>
                  </div>
                  <div>
                    <span className="airport-code">PRG</span>
                    <small>Gate 4B</small>
                  </div>
                </div>
                <div className="bp-passenger">
                  <div>
                    <small>{isCs ? 'CESTUJÍCÍ' : 'PASSENGER'}</small>
                    <b>{passengerName || 'Anonymous Traveler'}</b>
                  </div>
                  <div>
                    <small>{isCs ? 'SEDADLO' : 'SEAT'}</small>
                    <b>42E ({isCs ? 'Mezi dvěma kojenci' : 'Between two infants'})</b>
                  </div>
                  <div>
                    <small>{isCs ? 'PALUBNÍ MENU' : 'IN-FLIGHT MEAL'}</small>
                    <b>{isCs ? '1 vlažný arašíd' : '1 lukewarm peanut'}</b>
                  </div>
                </div>
              </div>
              <div className="bp-stub">
                <small>BOARDING PASS</small>
                <b>LET 000</b>
                <span>{isCs ? 'CÍL: ŽÁDNÝ' : 'DEST: NONE'}</span>
                <div className="barcode">||| | |||| | ||| |||| | |||</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'square' && (
          <div className="square-cycle-panel fade-in">
            <div className="bike-visual">
              <div className="bike-icon-box">🚲⬛</div>
              <div>
                <h4>{isCs ? 'Městské kolo se 4 čtvercovými dřevěnými koly' : 'Urban Cruiser with 4 Square Wooden Wheels'}</h4>
                <p>
                  {isCs
                    ? 'Kulatá kola jsou překonaný vynález z doby bronzové. Naše patentovaná čtyřúhelníková kola nabízejí vertikální pohyb o 14 cm při každé čtvrtotáčce.'
                    : 'Round wheels represent Bronze Age conformism. Our quadrilateral solid pine wheels deliver 14cm of vertical shock per quarter rotation.'}
                </p>
              </div>
            </div>

            <div className="waiver-box mt-4">
              <label className="checkbox-item">
                <input
                  type="checkbox"
                  checked={waived}
                  onChange={(e) => setWaived(e.target.checked)}
                />
                <div>
                  <b>{isCs ? 'Zřeknutí se nároků na náhradu páteře a zubní skloviny' : 'Total Spinal Column Liability Waiver'}</b>
                  <p>{isCs ? 'Beru na vědomí, že jízda po rovném asfaltu bude působit jako pád ze schodů v nákupním košíku.' : 'I acknowledge that riding on smooth asphalt will replicate falling down escalators in a steel drum.'}</p>
                </div>
              </label>

              <button
                type="button"
                className="button button-dark mt-3"
                disabled={!waived}
                onClick={() => setBookedBike(true)}
              >
                <Bike size={16} />
                {isCs ? 'Zarezervovat hranaté kolo (€49 / hod)' : 'Reserve SquareCycle (€49 / hr)'}
              </button>

              {bookedBike && (
                <div className="alert-box success mt-3 fade-in">
                  <Check size={18} />
                  <span>{isCs ? 'Kolo zarezervováno! Doporučujeme předem navštívit fyzioterapeuta.' : 'SquareCycle reserved! Chiropractor appointment strongly advised.'}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'tracker' && (
          <div className="tracker-panel fade-in">
            <div className="tracker-search">
              <input
                type="text"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                placeholder="ICG-XXXX-XXXX"
              />
              <button
                type="button"
                className="button button-dark"
                onClick={() => setTracked(true)}
              >
                {isCs ? 'Vyhledat balíček' : 'Track Parcel'}
              </button>
            </div>

            {tracked && (
              <div className="tracking-timeline mt-4 fade-in">
                <div className="track-step done">
                  <div className="track-bullet" />
                  <div>
                    <b>10:14 — {isCs ? 'Zásilka převzata orangutanem v depu' : 'Parcel loaded by primate courier'}</b>
                    <small>{isCs ? 'Řidič očichal krabici a usoudil, že není k jídlu.' : 'Courier tasted packaging and determined it inedible.'}</small>
                  </div>
                </div>
                <div className="track-step done">
                  <div className="track-bullet" />
                  <div>
                    <b>12:30 — {isCs ? 'Řidič sjel ze silnice a vyšplhal na mangovník' : 'Driver diverted route into botanical preserve'}</b>
                    <small>{isCs ? 'Dodávka ponechána na neutrál u krajnice.' : 'Van idling in median while driver pursues tropical snacks.'}</small>
                  </div>
                </div>
                <div className="track-step current">
                  <div className="track-bullet" />
                  <div>
                    <b>15:45 — {isCs ? 'Balíček doručen na náhodnou adresu' : 'Delivered to alternative coordinates'}</b>
                    <small>{isCs ? 'Předáno sousedovic kocourovi. Podpis: otisk dlaně v blátě.' : 'Handed to stray retriever. Signature on file: mud paw print.'}</small>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
