import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { products } from '../data/products';
import { ShoppingBag, ArrowRight, Check, X, ShieldAlert, Sparkles, Filter, Package } from 'lucide-react';

export default function Store() {
  const { lang, t } = useLanguage();
  const isCs = lang === 'cs';

  const [activeCategory, setActiveCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [checkoutModal, setCheckoutModal] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const categories = [
    { id: 'all', label: isCs ? 'Všechno zboží' : 'All Products' },
    { id: 'apparel', label: isCs ? 'Móda & Zvířata' : 'Fashion & Pets' },
    { id: 'safety', label: isCs ? 'Kuriozity & Bezpečnost' : 'Safety & Curiosities' },
    { id: 'fitness', label: isCs ? 'Vodní fitness' : 'Aquatic Fitness' }
  ];

  const filteredProducts = products.filter((p) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'apparel') return p.category.en.includes('Apparel') || p.category.en.includes('Equine');
    if (activeCategory === 'safety') return p.category.en.includes('Safety') || p.category.en.includes('Curiosities');
    if (activeCategory === 'fitness') return p.category.en.includes('Fitness');
    return true;
  });

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const subtotal = cart.reduce((acc, p) => acc + p.price, 0);
  const hesitationFee = cart.length > 0 ? 29.9 : 0;
  const delayedDeliveryInsurance = cart.length > 0 ? 45.0 : 0;
  const grandTotal = subtotal + hesitationFee + delayedDeliveryInsurance;

  return (
    <main className="page-shell">
      <section className="page-hero container">
        <div className="eyebrow"><span className="eyebrow-dot" />{isCs ? 'DIVIZE HARDWARU A OŠACENÍ / 2026' : 'HARDWARE & APPAREL DIVISION / 2026'}</div>
        <h1>
          {isCs ? 'Katalog nevídaných' : 'The Catalog of'}
          <br />
          <em>{isCs ? 'kuriozit a patentů.' : 'Unprecedented Curiosities.'}</em>
        </h1>
        <p>
          {isCs
            ? 'Od dvounohých kalhot pro koně po dětský dopravní kužel a bežecký pás pro rybičky. Všechny tyto absurdity byly vymyšleny v našem chatu a nyní si je můžete prohlédnout.'
            : 'From two-legged horse denim to child-containment cones and aquatic goldfish treadmills. Every single invention conceived during our startup brainstorming sessions.'}
        </p>

        <div className="page-hero-meta">
          <span>08 PATENTOVANÝCH KURIOZIT</span>
          <span>100% ZBYTEČNOST</span>
          <span>DODÁNÍ: 18 AŽ 42 TÝDNŮ</span>
        </div>
      </section>

      <section className="container catalog-section">
        <div className="catalog-tools">
          <div className="category-filter-bar">
            {categories.map((c) => (
              <button
                key={c.id}
                className={`filter-pill ${activeCategory === c.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>

          <button
            className="cart-toggle-btn"
            onClick={() => setCheckoutModal(true)}
            aria-label="View Cart"
          >
            <ShoppingBag size={18} />
            <span>{isCs ? 'Zbytečný košík' : 'Unnecessary Cart'}</span>
            <b className="cart-count">{cart.length}</b>
          </button>
        </div>

        <div className="products-grid">
          {filteredProducts.map((p) => (
            <article key={p.id} className="product-card">
              <div className="product-card-top">
                <span className="product-emoji">{p.imageEmoji}</span>
                <span className="product-tag">{p.tag[lang] || p.tag.cs}</span>
              </div>
              <div className="product-card-content">
                <small className="product-category">{p.category[lang] || p.category.cs}</small>
                <h3>{p.name[lang] || p.name.cs}</h3>
                <p>{p.description[lang] || p.description.cs}</p>

                <ul className="product-features-list">
                  {(p.features[lang] || p.features.cs).map((f, i) => (
                    <li key={i}>
                      <Check size={14} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="product-card-footer">
                <div className="product-price">
                  <span className="price-val">€{p.price}</span>
                  <small>{isCs ? 'vč. DPH z nerozhodnosti' : 'incl. regret tax'}</small>
                </div>
                <button
                  className="button button-dark"
                  onClick={() => addToCart(p)}
                >
                  <ShoppingBag size={16} />
                  <span>{isCs ? 'Koupit' : 'Acquire'}</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Cart & Checkout Modal */}
      {checkoutModal && (
        <div className="modal-backdrop" onClick={() => setCheckoutModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="brand">
                <span className="brand-mark">IC</span>
                <b>{isCs ? 'Pokladna zbytečných výdajů' : 'Questionable Checkout Terminal'}</b>
              </div>
              <button className="icon-button" onClick={() => setCheckoutModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              {orderComplete ? (
                <div className="order-success-screen fade-in">
                  <Sparkles size={48} className="text-highlight" />
                  <h3>{isCs ? 'Objednávka byla úspěšně zkomplikována!' : 'Order Successfully Complicated!'}</h3>
                  <p>
                    {isCs
                      ? 'Vaše platba byla konceptuálně odečtena. Tým pro balení se sejde na schůzce příští čtvrtek, aby vybral barvu lepicí pásky.'
                      : 'Funds conceptually deducted. The packaging committee will convene next Thursday to vote on adhesive tape tensile strength.'}
                  </p>
                  <div className="receipt-box">
                    <div><b>{isCs ? 'ČÍSLO OBJEDNÁVKY:' : 'ORDER NUMBER:'}</b> <span>ICG-99482-OOPS</span></div>
                    <div><b>{isCs ? 'ODHADOVANÉ DODÁNÍ:' : 'ESTIMATED DELIVERY:'}</b> <span>34 {isCs ? 'měsíců' : 'months'}</span></div>
                    <div><b>{isCs ? 'PŘEDPOKLÁDANÁ SPOKOJENOST:' : 'PROJECTED REGRET:'}</b> <span>99.4%</span></div>
                  </div>
                  <button
                    className="button button-dark full-width mt-4"
                    onClick={() => {
                      setCart([]);
                      setOrderComplete(false);
                      setCheckoutModal(false);
                    }}
                  >
                    {isCs ? 'Hotovo (Zavřít pokladnu)' : 'Conclude Transaction'}
                  </button>
                </div>
              ) : (
                <>
                  {cart.length === 0 ? (
                    <div className="empty-cart-view">
                      <ShoppingBag size={36} />
                      <p>{isCs ? 'Váš košík je prázdný. Přidejte alespoň kalhoty pro koně nebo běžecký pás pro rybičky!' : 'Cart is vacant. Add horse pants or a goldfish treadmill to experience true consumer regret!'}</p>
                    </div>
                  ) : (
                    <div className="cart-items-list">
                      {cart.map((item, idx) => (
                        <div key={idx} className="cart-row">
                          <span className="cart-item-emoji">{item.imageEmoji}</span>
                          <div className="cart-item-info">
                            <b>{item.name[lang] || item.name.cs}</b>
                            <small>{item.tag[lang] || item.tag.cs}</small>
                          </div>
                          <span className="cart-item-price">€{item.price}</span>
                          <button className="cart-item-remove" onClick={() => removeFromCart(idx)}>
                            <X size={16} />
                          </button>
                        </div>
                      ))}

                      <div className="cart-fees-breakdown">
                        <div className="fee-line">
                          <span>{isCs ? 'Mezisoučet produktů:' : 'Items Subtotal:'}</span>
                          <b>€{subtotal.toFixed(2)}</b>
                        </div>
                        <div className="fee-line text-muted">
                          <span>{isCs ? 'Poplatek za váhání u nákupu:' : 'Checkout Hesitation Surcharge:'}</span>
                          <span>€{hesitationFee.toFixed(2)}</span>
                        </div>
                        <div className="fee-line text-muted">
                          <span>{isCs ? 'Pojištění proti doručení včas:' : 'Delayed Delivery Guarantee Fee:'}</span>
                          <span>€{delayedDeliveryInsurance.toFixed(2)}</span>
                        </div>
                        <div className="fee-line total-line">
                          <b>{isCs ? 'CELKEM K ÚHRADĚ:' : 'GRAND TOTAL:'}</b>
                          <b className="total-amount">€{grandTotal.toFixed(2)}</b>
                        </div>
                      </div>

                      <button
                        className="button button-dark full-width mt-4"
                        onClick={() => setOrderComplete(true)}
                      >
                        <ArrowRight size={16} />
                        {isCs ? 'Potvrdit neuvážený nákup' : 'Confirm Irresponsible Purchase'}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
