# 🦧 InConvenience Group™

> *Nothing you need. Nothing you wanted.*

A satirical corporate conglomerate website built as a React SPA, presenting 10 fictional subsidiary companies — each one offering a completely unnecessary (but meticulously branded) service or product. The entire site is designed to look and feel like a legitimate, polished Fortune 500 holding company website… except everything it sells is absurd.

<p align="center">
  <b>🪨 Rent-a-Rock</b> · <b>💀 PettyPayback</b> · <b>❄️ Igloos</b> · <b>✨ Mess</b> · <b>🦧 Orangutan Outsourcing</b> · <b>📺 Oranguflix</b> · <b>📡 Adn't</b> · <b>🧭 Maps</b> · <b>🧮 Calculator</b> · <b>✈️ Mobility</b>
</p>

---

## 📖 What Is This?

InConvenience Group™ is a creative/comedy web project that parodies corporate websites, startup culture, and SaaS business models. It originated from a brainstorming chat about "the dumbest possible startup ideas" and evolved into a fully interactive, bilingual (Czech/English) web experience.

Every subsidiary has:
- A detailed company profile page with satirical copy
- An interactive demo/simulator unique to its concept
- Absurd but internally consistent pricing, features, and legal disclaimers

## 🏢 The Subsidiaries

| # | Company | What It Does |
|---|---------|-------------|
| 01 | **PettyPayback™** | Legal, harmless, disproportionately petty revenge delivered via cardboard monuments and rubber ducks |
| 02 | **InConvenience Igloos™** | Luxury snow mansions with a built-in spring expiration date (Snow-as-a-Service) |
| 03 | **InConvenience Mess™** | Reverse cleaning — we come to your home or office and *create* a mess using clean, reusable rubbish |
| 04 | **Orangutan Outsourcing™** | Management consulting powered by a primate typing randomly on a keyboard |
| 05 | **Adn't™** | Companies pay us *not* to air their worst advertisements (Silence-as-a-Service) |
| 06 | **Oranguflix™** | A streaming platform where you never get the content you selected — with automatic scene skips |
| 07 | **InConvenience Mobility™** | A 6-hour flight that lands where it departed, square-wheeled bicycles, and orangutan couriers |
| 08 | **InConvenience Maps™** | Navigation that always finds the longest possible detour to your destination |
| 09 | **InConvenience Calculator™** | A calculator that adds bureaucratic overhead, meeting surcharges, and orangutan variance to any computation |
| 10 | **Rent-a-Rock & Pet Rock Styling™** | Premium pet stone leasing with miniature sunglasses, tuxedos, and 400-million-year geological pedigree certificates |

## ✨ Features

- **Bilingual** — Full Czech/English toggle across the entire site
- **Interactive simulators** for each subsidiary:
  - 🎮 **3D models** (Three.js) for PettyPayback (duck-spawning cardboard monument), Igloos (melting slider), and Mess (office chaos scene)
  - 🗺️ **Real map** (Leaflet + OpenStreetMap) for InConvenience Maps with absurd global waypoints
  - 📺 **Oranguflix player** with automatic scene skipping (configurable interval)
  - 📡 **Adn't ad engine** with real banner ads and suppression toggle
  - 🧮 **Bureaucratic calculator** with Meeting, Orangutan, and WHY? buttons
  - 🦧 **Orangutan keyboard simulator** producing "management consulting" output
  - 🪨 **Pet Rock configurator** with accessory styling
- **Satirical e-commerce store** with 8 absurd products, a working cart, hesitation surcharges, and delayed delivery insurance
- **Careers page** with fictional job postings
- **Contact form** (leading nowhere, naturally)
- **Corporate About page** with executive bios (including the Chief Strategy Orangutan)

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [React 18](https://react.dev/) with JSX |
| Routing | [React Router v6](https://reactrouter.com/) |
| Build Tool | [Vite](https://vitejs.dev/) |
| 3D Graphics | [Three.js](https://threejs.org/) — procedural models, no external assets |
| Maps | [Leaflet](https://leafletjs.com/) with OpenStreetMap tiles |
| Icons | [Lucide React](https://lucide.dev/) |
| Language | JavaScript (ES modules) |
| Styling | Vanilla CSS (single `styles.css`) |

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ and npm

### Install & Run

```bash
# Clone the repository
git clone https://github.com/your-username/inconvenience-group.git
cd inconvenience-group

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The site will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
inconvenience-group/
├── index.html                    # Vite entry point
├── package.json
├── src/
│   ├── main.jsx                  # React root mount
│   ├── App.jsx                   # Router & layout shell
│   ├── styles.css                # All styles (single file)
│   ├── context/
│   │   └── LanguageContext.jsx    # CS/EN language toggle provider
│   ├── data/
│   │   ├── companies.js          # 10 subsidiary definitions
│   │   ├── products.js           # 8 store product definitions
│   │   ├── translations.js       # UI string translations
│   │   └── adntAds.js            # Adn't ad content database
│   ├── components/
│   │   ├── Header.jsx            # Navigation bar with language toggle
│   │   ├── Footer.jsx            # Site footer
│   │   ├── Interactive3DViewer.jsx      # Three.js 3D model viewer
│   │   ├── InteractiveAdnt.jsx          # Adn't ad suppression demo
│   │   ├── InteractiveCalculator.jsx    # Bureaucratic calculator
│   │   ├── InteractiveIgloo.jsx         # Igloo melting simulator
│   │   ├── InteractiveMaps.jsx          # Leaflet detour navigator
│   │   ├── InteractiveMobility.jsx      # Flight 000 & SquareCycle
│   │   ├── InteractiveOranguflix.jsx     # Streaming chaos player
│   │   ├── InteractiveOrangutan.jsx      # Primate typing simulator
│   │   ├── InteractivePettyPayback.jsx  # Revenge-as-a-Service demo
│   │   ├── InteractiveReverseCleaning.jsx # Mess creation demo
│   │   ├── InteractiveRock.jsx          # Pet rock configurator
│   │   └── AdntBanner.jsx               # Adn't sidebar banners
│   └── pages/
│       ├── Home.jsx              # Landing page with hero & previews
│       ├── Companies.jsx         # Full subsidiary listing
│       ├── CompanyDetail.jsx     # Individual company page + simulator
│       ├── Store.jsx             # E-commerce catalog with cart
│       ├── Tools.jsx             # Free tools landing
│       ├── About.jsx             # Corporate history & leadership
│       ├── Careers.jsx           # Job postings
│       ├── Contact.jsx           # Contact form
│       └── NotFound.jsx          # 404 page
└── public/
    └── images/                   # Generated product/company images
```

## 🌐 Internationalization

The site supports Czech and English. Language is toggled via a button in the header and persisted through React context. All company descriptions, product copy, UI labels, and legal disclaimers are fully translated in both languages.

## 🤝 Contributing

This is a personal creative/comedy project, but if you have ideas for new absurd subsidiaries, products, or interactive demos, feel free to open an issue or PR.

Some ideas that could be fun to add:
- More subsidiary simulators (e.g., Nowhere Airlines boarding pass generator)
- Sound effects for the Oranguflix player
- A "stock ticker" with fictional InConvenience Group share prices
- Dark mode (the orangutan demands it)

## 📄 License

This project is for educational and entertainment purposes. All company names, products, and services described are entirely fictional. Any resemblance to actual companies is purely coincidental and probably funnier than intended.

---

<p align="center">
  <i>"If it functions, add approval tiers. If it fails, spin off a new subsidiary."</i>
  <br/>
  — InConvenience Group Operations Manual, Chapter 1
</p>
