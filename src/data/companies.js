import {
  Skull, Snowflake, Sparkles, Tv, MegaphoneOff, Compass, Clock3,
  BriefcaseBusiness, Plane, Bike, HelpCircle, Package, Gem, ShieldAlert
} from 'lucide-react';

export const companies = [
  {
    slug: 'petty-payback',
    number: '01',
    category: { cs: 'Právo & Odplata', en: 'Legal & Revenge' },
    name: 'PettyPayback™',
    subtitle: { cs: 'Revenge-as-a-Service™ & Pomstní pojištění', en: 'Revenge-as-a-Service™ & Revenge Insurance' },
    icon: Skull,
    short: {
      cs: 'Nemůžete vždy vyhrát, ale můžete udělat nepořádek. Legální, neškodná, malicherná pomsta na klíč.',
      en: 'You can’t always get even. But you can get messy. Legal, harmless, disproportionately petty revenge.'
    },
    tagline: {
      cs: 'Oni vám ublížili. My nepohodlně zkomplikujeme život všem zúčastněným.',
      en: 'They hurt you. We inconvenience everyone involved in a completely manageable way.'
    },
    intro: {
      cs: 'Naše vlajková dceřiná společnost. Zjistili jsme, že úklidový průmysl léta ignoroval obrovský netknutý trh lidí, kteří chtějí vyjádřit svůj postoj pomocí 40 kilogramů recyklovatelného odpadu a hejna plastových kachniček.',
      en: 'Our premier subsidiary. We discovered that the facilities management sector was quietly ignoring an untapped market of people who want to make a poignant emotional point using 40 kilograms of recyclable cardboard.'
    },
    offer: {
      cs: 'Nabízíme tři hlavní cílové segmenty: Nezaplacený uklízeč (Reverse Cleaning Refund™), Zlomené srdce (instalace pyramidy z krabic ve tvaru srdce přímo u vás v obýváku s nápisem „Aspoň někdo se tady umí vázat“) a Škodič (inscenovaný nepořádek s jednou plastovou kachničkou na nevysvětlitelně důležitém místě).',
      en: 'Serving three primary demographics: The Unpaid Cleaner (Reverse Cleaning Refund™), The Heartbroken Ex (indoor cardboard box monument arranged as a broken heart), and The Prankster (consensual chaos featuring a single yellow duck placed with unsettling precision).'
    },
    features: {
      cs: [
        'Petty balíček: 100 lepících papírků (€49)',
        'Pasivně-agresivní: 500 kousků papíru a kartony (€199)',
        'Nukleární karton: 2 000 krabic ve formě monumentu (€999)',
        'Psychologická válka: Místnost plná identických žlutých kachniček (€2,499)',
        'Poslední kapka: Jediná prázdná láhev uprostřed čisté místnosti položená osobně generálním ředitelem malicherností (€4,999)',
        'Pojištění Revenge Insurance™: €19.99/měsíc s poplatkem €79.99 za emocionální zpracování'
      ],
      en: [
        'Petty Tier: 100 sticky notes (€49)',
        'Passive-Aggressive: 500 paper shreds & cardboard (€199)',
        'Nuclear Cardboard: 2,000 boxes arranged into an architectural monument (€999)',
        'Psychological Warfare: Room overflowing with identical rubber ducks (€2,499)',
        'The Final Straw: A single empty bottle placed in the exact center of a spotless room by our Chief Executive of Petty Affairs (€4,999)',
        'Revenge Insurance™: €19.99/month with a mandatory €79.99 Emotional Processing Fee'
      ]
    },
    note: {
      cs: 'Právní upozornění: Nikdy nevstupujeme na cizí pozemek bez svolení. Všechny naše akce jsou legální, neškodné a okamžitě odstranitelné. Nejsme kriminálníci, jsme pouze neúměrně dětinští.',
      en: 'Legal notice: We do not trespass or damage property. All staged messes are clean, harmless and fully reversible. Petty, never criminal.'
    }
  },
  {
    slug: 'winter-homes',
    number: '02',
    category: { cs: 'Nemovitosti & Pohostinství', en: 'Real Estate & Hospitality' },
    name: 'InConvenience Igloos™',
    subtitle: { cs: 'Snow-as-a-Service (SaaS) & Sezónní architektura', en: 'Snow-as-a-Service (SaaS) & Ephemeral Mansions' },
    icon: Snowflake,
    short: {
      cs: 'Váš dům snů. Naše tržby na příští zimu. Rekreační sněhové vily s vestavěným datem tání na jaře.',
      en: 'Your dream home. Our next winter’s revenue. Luxury snow mansions with built-in spring liquefaction.'
    },
    tagline: {
      cs: 'Proč prodat dům jednou, když ho můžete zákazníkovi stavět znovu každou zimu?',
      en: 'Why sell a house once when you can rebuild it every single winter?'
    },
    intro: {
      cs: 'Geniální stavební model. Zákazník zaplatí za stavbu luxusního sněhového iglú v zimě, na jaře dům přejde do přirozené kapalné fáze (demolice s nulovými náklady) a na podzim platí znovu za rekonstrukci.',
      en: 'A revolutionary architectural paradigm. The building material has a built-in expiration date, the customer pays you to construct it, and then pays you again to rebuild it next winter.'
    },
    offer: {
      cs: 'Zákaznická portfolia sahají od SnowBoxu (€4,999 - jedna místnost, nula trubek) přes SnowPalace (€49,999 - se sněhovým lustrem) až po The Frozen Estate s příkopem, který bohužel zamrzá (inženýři to považují za vlastnost). Na přání stavíme iglú ve tvaru banánu i podlahové vytápění (Prémiový zážitek z tání).',
      en: 'Offerings range from The SnowBox (€4,999, zero plumbing) to The SnowPalace (€49,999 with snow chandelier) and The Frozen Estate with a naturally frozen moat. Heated floors available via our Premium Melting Experience™.'
    },
    features: {
      cs: [
        'Základní plán: 1 sněhové sídlo za zimu',
        'Prémiový plán: Garantovaná obnova po jarním tání',
        'Enterprise plán: Postavíme váš dům každý rok v jiné zemi',
        'Poplatek za kontrolu stavu ledu (Snow Inspection Fee)',
        'Architektura na míru: Mrakodrap ze sněhu nebo replika vašeho bytu'
      ],
      en: [
        'Basic Plan: One custom snow retreat per winter',
        'Premium Plan: Automated annual reconstruction included',
        'Enterprise Plan: We build your house in a different hemisphere every year',
        'Mandatory Annual Snow Inspection Fee to verify if ice is frozen',
        'Adaptive snow architecture: banana shapes and snow skyscrapers'
      ]
    },
    note: {
      cs: 'Vytápění a celoroční pobyt jsou považovány za nepodporované volby životního stylu. Při venkovní teplotě nad 2 °C se dům stává jezerem.',
      en: 'Heating and year-round habitation are considered non-compliant lifestyle choices. At temperatures above 2°C, your property transitions to aquatic real estate.'
    }
  },
  {
    slug: 'reverse-cleaning',
    number: '03',
    category: { cs: 'Ekologické & Úklidové služby', en: 'Environmental & Facilities' },
    name: 'InConvenience Mess™',
    subtitle: { cs: 'Reverzní úklidová společnost', en: 'Reverse Cleaning Services' },
    icon: Sparkles,
    short: {
      cs: 'Vy si uklidíte život. My vám ho zase zaneřádíme. Zpoplatňujeme tvorbu problémů, které jste předtím neměli.',
      en: 'You clean up your life. We mess it up again. Premium charging for creating problems you never had.'
    },
    tagline: {
      cs: 'Jedna hromada čistého odpadu. Nekonečné zdroje příjmů.',
      en: 'One pile of clean rubbish. Infinite corporate revenue streams.'
    },
    intro: {
      cs: 'Proč by měly úklidové firmy mít monopol na pořádek? My nakoupíme levný, čistý a nezapáchající recyklovatelný odpad (kartony, lahve, bublinkovou fólii), rozházíme ho po vašem bytě či kanceláři, zkasírujeme vás a pak si necháme zaplatit za úklid a tentýž odpad použijeme u dalšího klienta.',
      en: 'Traditional cleaning companies reduce entropy. We maximize billable disorder using clean, odorless, reusable rubbish (plastic bottles, packaging, cardboard) that we collect and reuse at the next client.'
    },
    offer: {
      cs: 'Balíčky: Mírné nepohodlí (€99 - 200 sticky notes, lahve, 45 sekund práce), Domácí katastrofa (€499 - archeologické naleziště krabic včetně lahve pod polštářem) a Korporátní apokalypsa (€4,999 - celá budova s 10 000 demotivačními lístečky).',
      en: 'Packages: The Mild Inconvenience (€99, 45 seconds of work), The Domestic Disaster (€499, cardboard dig site with complimentary bottle under couch cushion), and The Corporate Apocalypse (€4,999, office-wide existential confusion).'
    },
    features: {
      cs: [
        'Cirkulární ekonomika: Odpad se nikdy nevyhazuje, pouze cirkuluje',
        'Mess-as-a-Service™ (MaaS): Čerstvý nepořádek každé pondělí ráno',
        'Překvapivý nepořádek: Přijedeme v náhodný čas bez ohlášení',
        'Corporate Sabotage Lite™: Všechny židle otočíme ke zdi a pera dáme do jednoho šuplíku',
        'Chief Mess Officer s platem €300,000 rozhodující o umístění PET lahví'
      ],
      en: [
        'Circular Economy: Trash is never discarded, only redeployed to new clients',
        'Mess-as-a-Service™ (MaaS): Fresh office clutter delivered every Monday morning',
        'Surprise Mess™: Unannounced arrivals within a 14-day window',
        'Corporate Sabotage Lite™: All office chairs turned backward, all pens consolidated into one drawer',
        'Chief Mess Officer earning €300,000 to place bottles artistically'
      ]
    },
    note: {
      cs: 'Zásadně neničíme majetek, neblokujeme únikové východy a nepoužíváme potraviny, které by zapáchaly. Pořádek je pouze dočasná anomálie.',
      en: 'We never damage property, block fire exits or use perishable food waste. Disorder must remain safe, consensual and thoroughly annoying.'
    }
  },
  {
    slug: 'orangutan-outsourcing',
    number: '04',
    category: { cs: 'Kreativa & Strategické poradenství', en: 'Consulting & Creative' },
    name: 'Orangutan Outsourcing™',
    subtitle: { cs: 'Nekonečná opičí agentura', en: 'Infinite Primate Agency' },
    icon: BriefcaseBusiness,
    short: {
      cs: 'Připoutáme orangutana ke stolu a počkáme. Teorie nekonečné opice říká, že dříve či později vytvoří novou strategii nebo 9. symfonii.',
      en: 'We seat an orangutan at a workstation. The infinite monkey theorem guarantees eventual Beethoven or corporate strategy.'
    },
    tagline: {
      cs: 'Když nemáte řešení, svěřte strategii primátovi.',
      en: 'When your executive board lacks vision, delegate to a higher primate.'
    },
    intro: {
      cs: 'Naše vlajková agentura pro outsourcing analytiků a marketingu. Klient zadá komplexní korporátní výzvu. Náš certifikovaný orangutan buší do klávesnice. Výstup je sice z 99 % náhodný sled znaků a banánových skvrn, ale překvapivě často zní jako typická prezentace z McKinsey.',
      en: 'Our premier management consulting arm. Clients submit strategic restructuring challenges. Our orangutan types relentlessly. The deliverable is 99% random keystrokes and fruit residue, which indistinguishably resembles premier management consulting decks.'
    },
    offer: {
      cs: 'Poskytujeme strategické audity, generování firemních sloganů, posuzování fúzí a akvizic a neřízené e-mailové kampaně přímo z klávesnice orangutana.',
      en: 'Providing strategic audits, brand positioning memos, merger evaluations, and unmoderated shareholder correspondence directly from our resident primate.'
    },
    features: {
      cs: [
        'Primate Strategy Sprint: 48 hodin nepřetržitého bušení do psacího stroje',
        'Banana-Driven KPI: Úspěšnost projektu měřená počtem snědených trsů banánů',
        'Generátor firemní hantýrky: Nerozeznatelné od poradenských zpráv velké čtyřky',
        'Orangutan v představenstvu: Zajišťuje, že žádné rozhodnutí nedává smysl'
      ],
      en: [
        'Primate Strategy Sprint: 48 hours of uninterrupted mechanical keyboard impact',
        'Banana-Driven KPIs: Project milestones measured in consumed tropical fruit',
        'Jargon Generator: 100% statistically indistinguishable from Big Four advisory',
        'Board Member Orangutan: Guarantees no strategic consensus is ever reached'
      ]
    },
    note: {
      cs: 'Orangutan má zajištěny nejvyšší standardy blahobytu, neomezený přísun manga a plnou moc podepisovat interní oběžníky.',
      en: 'Our primate holds executive voting privileges, unrestricted organic fruit stipends, and complete immunity from HR complaints.'
    }
  },
  {
    slug: 'adnt',
    number: '05',
    category: { cs: 'Marketing & Ticho', en: 'Marketing & Silence' },
    name: "Adn't™",
    subtitle: { cs: 'Agentura pro strategickou nepřítomnost reklamy', en: 'Strategic Invisibility & Silence-as-a-Service' },
    icon: MegaphoneOff,
    short: {
      cs: 'Firmy nám platí za to, že jejich trapné reklamy NEBUDEME vysílat. Vyděračské ticho jako služba.',
      en: 'Brands pay us NOT to broadcast their catastrophic advertisements. Silence-as-a-Service.'
    },
    tagline: {
      cs: 'Vaše sdělení. Nikde k nalezení.',
      en: 'Your message. Nowhere to be found.'
    },
    intro: {
      cs: 'Většina reklamních agentur bere peníze za to, aby vás bylo vidět. Adn’t je první agentura, která účtuje firmám za to, aby jejich nejhorší marketingové nápady zmizely z povrchu zemského. A pokud nám konkurence zaplatí víc, vaši reklamu zase zveřejníme!',
      en: 'Conventional marketing agencies charge to amplify your brand. Adn’t pioneered the extortionate anti-campaign: companies pay us handsome retainers so their most embarrassing advertisements remain in permanent quarantine.'
    },
    offer: {
      cs: 'Antikampaňová strategie, ticho na klíč, aukce mlčení (Kdo zaplatí víc za to, zda reklama spatří světlo světa?) a čtvrtletní zprávy o neviditelnosti.',
      en: 'Anti-campaign roadmaps, competitive silence bidding wars, quarterly invisibility reports, and proactive brand suppression.'
    },
    features: {
      cs: [
        'Paušál za nevysílání: €5 000 měsíčně za absolutní klid',
        'Aukční válka: Konkurent zaplatil €10 000? Vaši reklamu ihned odvysíláme',
        'Strategické smazání billboardů',
        'Zpráva o nulovém zásahu publika s razítkem úspěchu'
      ],
      en: [
        'Non-Broadcast Retainer: €5,000/month for comprehensive brand quietude',
        'Bidding Warfare: If competitor offers €10,000 to publish your bad ad, quarantine breaks',
        'Strategic Billboard Blanking',
        'Zero-Impression Verified Certificates'
      ]
    },
    note: {
      cs: 'Naše výsledky jsou prakticky nepostřehnutelné. Právě podle toho poznáte, že naše práce funguje.',
      en: 'Our results are impossible to detect. That is how clients verify operational success.'
    }
  },
  {
    slug: 'oranguflix',
    number: '06',
    category: { cs: 'Zábava & Streaming', en: 'Entertainment & Media' },
    name: 'Oranguflix™',
    subtitle: { cs: 'Schrödingerův Netflix s úmyslnými chybami', en: 'Schrödinger’s Streaming Platform' },
    icon: Tv,
    short: {
      cs: 'Veškerý obsah, o který jste nežádali. Kliknete na film a spustí se něco úplně jiného. Občas přeskočí o dvě hodiny dopředu.',
      en: 'All the content you didn’t ask for. Click any movie and receive random footage with unexpected time jumps.'
    },
    tagline: {
      cs: 'Proč se dívat na to, co chcete, když se můžete dívat na to, co vybral orangutan?',
      en: 'Why watch what you intended, when you can watch what an algorithm panicked and selected?'
    },
    intro: {
      cs: 'Streamovací platforma nové generace. Zjistili jsme, že diváci trpí paralýzou z výběru. Na Oranguflixu je jedno, co si vyberete – přehrávač vám náhodně přiřadí zcela jiný pořad, samovolně přeskočí do 78. minuty nebo spustí titulky ve staroaramejštině.',
      en: 'The next evolution of video streaming. Eliminating decision fatigue: no matter what blockbuster you select, our platform serves a completely unrelated documentary about lichen, randomly skips 40 minutes ahead, and offers subtitles in dead languages.'
    },
    offer: {
      cs: 'Katalog filmů, které jste nehledali, náhodné skoky v čase, 10hodinový loop stropního ventilátoru a orangutan loupající mandarinku ve 4K HDR.',
      en: 'Infinite catalog of unrequested media, automated temporal displacement buttons, 10-hour ceiling fan loops, and 4K HDR footage of fruit peeling.'
    },
    features: {
      cs: [
        'Algoritmus zmatku: Kliknutí na akční thriller spustí německý návod na pletení',
        'Tlačítko Náhodný skok: Přeskočí děj o 1 až 90 minut bez možnosti návratu',
        'Titulky z jiné dimenze: Dialogy z Titanicu promítané přes sci-fi horor',
        'Orangutan Comment Track: Živý zvukový komentář primáta ke každému filmu'
      ],
      en: [
        'Chaos Routing Engine: Selecting action movies redirects to artisanal spoon carving',
        'Random Jump Lever: Bypasses 1 to 90 minutes of plot with zero rewind capability',
        'Mismatched Subtitle Matrix: Rom-com audio paired with documentary captions',
        'Primate Audio Commentary: Constant vocalizations over prestige television'
      ]
    },
    note: {
      cs: 'Služba nemá tlačítko Zpět ani Hledat. Hledání je považováno za projev nedůvěry k našemu orangutanovi.',
      en: 'The platform intentionally lacks a search bar or rewind functionality. Searching implies distrust in algorithmic destiny.'
    }
  },
  {
    slug: 'inconvenience-mobility',
    number: '07',
    category: { cs: 'Doprava & Logistika', en: 'Transport & Logistics' },
    name: 'InConvenience Mobility™',
    subtitle: { cs: 'Let Nikam, SquareCycle™ & Orangutan Express', en: 'Nowhere Airlines, SquareCycle & Orangutan Express' },
    icon: Plane,
    short: {
      cs: 'Komerční let, který krouží 6 hodin a přistane na tomtéž letišti. Kolo s hranatými koly. Balíky doručované do bažin.',
      en: 'A 6-hour commercial flight landing at departure gate. Square-wheeled bicycles. Delivery couriers who get lost in trees.'
    },
    tagline: {
      cs: 'Cíl není důležitý. Důležité je, jak moc vás to vyčerpá.',
      en: 'The destination is irrelevant. What matters is the magnitude of physical exhaustion.'
    },
    intro: {
      cs: 'Dopravní divize InConvenience Group sdružuje tři klíčové projekty: Nowhere Airlines (Let 000 pro lidi, kteří milují bezpečnostní kontrolu na letišti, ale nenávidí cizí města), SquareCycle™ (půjčovna kol se čtyřmi dřevěnými čtvercovými koly pro milovníky vibrací) a Orangutan Express™ (doručování zásilek, kde orangutan za volantem dodávky časem možná adresu najde).',
      en: 'Our multimodal mobility consortium encompasses Nowhere Airlines (Flight 000 circling for 6 hours with lukewarm peanuts), SquareCycle™ (quadrilateral wooden-wheeled bike rentals), and Orangutan Express™ (courier logistics operated by primates learning geography on the job).'
    },
    offer: {
      cs: 'Palubní vstupenky na Let 000, pronájem hranatých kol s doporučením na ortopeda a sledování balíčku ztraceného v sumaterském deštném pralese.',
      en: 'Flight 000 boarding passes, square bicycle bookings with complimentary chiropractic waivers, and real-time parcel misdirection tracking.'
    },
    features: {
      cs: [
        'Let 000: Odlet Brána 4B -> Přílet Brána 4B (garantováno)',
        'Sedadlo 42E: Vždy mezi dvěma plačícími novorozenci',
        'SquareCycle: Maximální rychlost 4 km/h při tepové frekvenci 190 bpm',
        'Orangutan Express: Balíček označen jako „Chutný“ a doručen sousedovu psovi'
      ],
      en: [
        'Flight 000: Departs Gate 4B, circles airspace, lands Gate 4B (guaranteed)',
        'Seat 42E: Permanently assigned between two inconsolable toddlers',
        'SquareCycle: Top speed 4 km/h at 190 heart bpm',
        'Orangutan Express: Parcel classified as "Delicious" and cached in rainforest'
      ]
    },
    note: {
      cs: 'Veškerá zavazadla na Letu 000 jsou pečlivě odbavena a poté ztracena přímo před vašima očima.',
      en: 'All checked baggage on Flight 000 is systematically inspected and misplaced prior to takeoff.'
    }
  },
  {
    slug: 'inconvenience-maps',
    number: '08',
    category: { cs: 'Technologie & Navigace', en: 'Technology & Navigation' },
    name: 'InConvenience Maps™',
    subtitle: { cs: 'Navigace s nejdelší možnou oklikou', en: 'Maximum Inconvenience Routing' },
    icon: Compass,
    short: {
      cs: 'Najděte nejdelší a nejhorší možnou trasu na místa, která důvěrně znáte. Přeplavte oceán, abyste došli do večerky 200 m daleko.',
      en: 'Calculate the most grueling detours to places 200 meters away. Swim through oceans to buy milk.'
    },
    tagline: {
      cs: 'Dlouhá cesta je jediná správná cesta.',
      en: 'The longest detour is the only dignified route.'
    },
    intro: {
      cs: 'Navigační algoritmus navržený pro ty, kdo považují přímé trasy za urážku lidského ducha. Zadáte cíl v sousední ulici a naše navigace vás pošle přes Beringovu úžinu, poušť Gobi a dvě trajektová spojení.',
      en: 'Navigation software designed for people who view direct routes as an insult to human curiosity. Input an address across the street, receive an itinerary traversing the Mariana Trench on a pedal-powered vessel.'
    },
    offer: {
      cs: 'Generování oklik na míru, výpočet optimálního nepohodlí trasy, itinerář s mezizastávkami v antarktických výzkumných stanicích a falešné dopravní varování.',
      en: 'Tailored detour generation, detour optimality indexing, mandatory yak rental waypoints, and unrequested points of existential interest.'
    },
    features: {
      cs: [
        'Detour-First algoritmus: Přidává minimálně 35 000 km ke každé pěší trase',
        'Víceoborová doprava: Chůze, nákladní loď, velbloud, kajak',
        'Výškový profil: Přechod Mariánského příkopu bez dýchacího přístroje',
        'Varování o cíli: „Cíl je po příjezdu pravděpodobně zavřený“'
      ],
      en: [
        'Detour-First Algorithm: Minimum 35,000 km added to standard walking routes',
        'Multimodal Transit: Walking, cargo freighter, camel, pedal kayak',
        'Elevation Profile: Deep trench descent and glacier ascent',
        'Arrival Advisory: "Destination will have ceased operations by arrival date"'
      ]
    },
    note: {
      cs: 'Aplikace neposkytuje reálná data GPS a neručí za uvíznutí na ledovci.',
      en: 'This tool does not provide verified travel navigation. Do not attempt swimming across the Atlantic to fetch groceries.'
    }
  },
  {
    slug: 'inconvenience-calculator',
    number: '09',
    category: { cs: 'Technologie & Byrokracie', en: 'Technology & Productivity' },
    name: 'InConvenience Calculator™',
    subtitle: { cs: 'Kalkulačka administrativního přehodnocení', en: 'Administrative Overhead Estimator' },
    icon: Clock3,
    short: {
      cs: 'Zadejte banální úkol nebo matematickou operaci a získejte náhodný, byrokraticky přebujelý výsledek.',
      en: 'Enter a simple task or calculation to receive an overengineered, philosophical or completely random output.'
    },
    tagline: {
      cs: 'Spočítáme to, co jste mohli snadno odhadnout.',
      en: 'Let us calculate with precision what you could have guessed in two seconds.'
    },
    intro: {
      cs: 'Kalkulačka, která dává každodenním rozhodnutím pompéznost, jakou si zaslouží. Ať už počítáte 2 + 2 nebo plánujete přípravu kávy, InConvenience Calculator vám připočte daň z lítosti, schvalovací porady a koeficient orangutana.',
      en: 'A calculation console giving mundane chores the pompous spreadsheet dignity they deserve. Whether adding integers or planning a cup of coffee, our system factors in regret taxes, stakeholder committees, and primate variance.'
    },
    offer: {
      cs: 'Interaktivní kalkulátor s tlačítky jako +DAŇ, PORADA, ORANGUTAN a PROČ?, generující podrobné výpisy schvalovacích procesů.',
      en: 'Interactive calculation keypad featuring specialized corporate buttons (+TAX, MEETING, ORANGUTAN, WHY?), generating multi-page project plans.'
    },
    features: {
      cs: [
        'Tlačítko PORADA: Automaticky násobí čas koeficientem 3.8x',
        'Výstupy: Čísla, filozofické aforismy i NaN (Not an Orangutan)',
        'Daň z nerozhodnosti připočtena ke každému součtu',
        'Generování PDF reportu o 42 stranách pro vedení'
      ],
      en: [
        'MEETING Button: Automatically multiplies task duration by 3.8x',
        'Output Modes: Numerical, philosophical aphorisms, or NaN (Not an Orangutan)',
        'Indecision surcharges automatically compounded into operations',
        'Automated 42-page slide deck generation for management review'
      ]
    },
    note: {
      cs: 'Kalkulačka není vhodná pro účetnictví, daňová přiznání ani jadernou fyziku.',
      en: 'Not certified for tax returns, structural engineering, or anything requiring actual mathematical accuracy.'
    }
  },
  {
    slug: 'rent-a-rock',
    number: '10',
    category: { cs: 'Móda & Mazlíčci', en: 'Fashion & Pets' },
    name: 'Rent-a-Rock & Pet Rock Styling™',
    subtitle: { cs: 'Pronájem kamene & Luxusní styling mazlíčků', en: 'Pet Stone Leasing & Luxury Mineral Accessories' },
    icon: Gem,
    short: {
      cs: 'Kámen nepotřebuje venčit, nežere a nikdy vás neopustí. Nabízíme pronájem kamenů, miniaturní sluneční brýle a smokingy pro žulu.',
      en: 'A rock requires zero walks, never misbehaves, and stays forever. Premium mineral leasing, stone sunglasses and granite tuxedos.'
    },
    tagline: {
      cs: 'Nejvěrnější společník, kterého si můžete pronajmout.',
      en: 'The most emotionally stable companion you can possibly lease.'
    },
    intro: {
      cs: 'Inspirováno legendárním studentským projektem z Hradce Králové a dotaženo do absurdního korporátního extrému. Pokud nemáte čas na psa, pronajměte si náš certifikovaný křemen nebo žulový oblázek. K tomu nabízíme laky na drápky pro kočky a kloboučky pro kameny.',
      en: 'Elevating satirical rock rental into a high-end luxury lifestyle franchise. If canine ownership proves demanding, lease a certified sedimentary boulder with custom velvet bedding, polarized sunglasses, and feline nail polish.'
    },
    offer: {
      cs: 'Pronájem kamenů na týden či rok, šatník pro minerály, lak na kočičí drápky v 10 neonových barvách a pojištění proti kutálení.',
      en: 'Rock leasing contracts, mineral haute couture, 10 neon feline nail lacquer shades, and downhill rolling insurance.'
    },
    features: {
      cs: [
        'Certifikát původu kamene: Zaručeně ležel 400 milionů let na jednom místě',
        'Kolekce doplňků: Kloboučky, smokingy a brýle pro oblázky',
        'Kočičí salón: Neonový lak na drápy (souhlas kočky není součástí dodávky)',
        'Pojištění ztráty jedné ponožky v pračce (Sock Disappearance Policy)'
      ],
      en: [
        'Geological Pedigree: Certified stationary for over 400 million consecutive years',
        'Mineral Wardrobe: Fedora hats, formal bowties, and UV-rated stone eyewear',
        'Feline Manicure Suite: 10 neon claws (cat consent form not included)',
        'Single Sock Disappearance Insurance in collaboration with Betabrand'
      ]
    },
    note: {
      cs: 'Kameny jsou tiché. Pokud váš pronajatý kámen mluví, vyhledejte lékařskou pomoc.',
      en: 'Stones are strictly inert. If your leased boulder begins conversing with you, seek medical consultation immediately.'
    }
  }
];
