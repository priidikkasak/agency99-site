export interface NavItem {
  services: string;
  pricing: string;
  process: string;
  contact: string;
  langToggle: string;
  cta: string;
  portfolio: string;
  coldEmail: string;
}

export interface ColdEmailFeature {
  num: string;
  title: string;
  body: string;
}

export interface PillarItem {
  title: string;
  body: string;
}

export interface ServiceItem {
  tag: string;
  title: string;
  body: string;
}

export interface PricingTier {
  name: string;
  badge?: string;
  featured?: boolean;
  duration: string;
  price: string;
  oldPrice?: string;
  priceSuffix?: string;
  oldPriceSuffix?: string;
  description: string;
  cta: string;
  features?: string[];
}

export interface ProcessStep {
  num: string;
  title: string;
  body: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  chips: string[];
  url?: string;
  image?: string;
  imageWidth?: string;
}

export interface SourcingCase {
  tag: string;
  category: string;
  title: string;
  body: string;
  outcome: string;
}

export interface WebClientForm {
  eyebrow: string;
  headline: string;
  subtext: string;
  labels: {
    name: string;
    email: string;
    company: string;
    projectTypes: string;
    goal: string;
    audience: string;
    contentReady: string;
    inspiration: string;
    timeline: string;
  };
  placeholders: {
    name: string;
    email: string;
    company: string;
    otherDescription: string;
    goal: string;
    audience: string;
    inspiration: string;
  };
  chips: {
    types: string[];
    contentReady: string[];
    timelines: string[];
  };
  otherOption: string;
  errors: {
    pickAtLeastOne: string;
    pickOne: string;
    generic: string;
  };
  submit: string;
  submitting: string;
  hint: string;
  success: {
    eyebrow: string;
    headline: string;
    subtextBefore: string;
    subtextEmail: string;
    subtextAfter: string;
  };
}

export interface SourcingClientForm {
  eyebrow: string;
  headline: string;
  subtext: string;
  labels: {
    name: string;
    email: string;
    company: string;
    sourcingTypes: string;
    targetMarkets: string;
    goal: string;
    idealContact: string;
    criteria: string;
    tried: string;
    timeline: string;
  };
  placeholders: {
    name: string;
    email: string;
    company: string;
    otherDescription: string;
    targetMarkets: string;
    goal: string;
    idealContact: string;
    criteria: string;
    tried: string;
  };
  chips: {
    types: string[];
    timelines: string[];
  };
  otherOption: string;
  errors: {
    pickAtLeastOne: string;
    pickOne: string;
    generic: string;
  };
  submit: string;
  submitting: string;
  hint: string;
  success: {
    eyebrow: string;
    headline: string;
    subtextBefore: string;
    subtextEmail: string;
    subtextAfter: string;
  };
}

export interface Translations {
  nav: NavItem;
  hero: {
    headline: string;
    subtext: string;
    ctaPrimary: string;
    ctaGhost: string;
  };
  statement: {
    line1: string;
    line2: string;
    sub: string;
    cta: string;
  };
  pillars: {
    sectionLabel: string;
    items: PillarItem[];
  };
  services: {
    sectionLabel: string;
    headline: string;
    items: ServiceItem[];
    extra: {
      label: string;
      items: string[];
      cta: string;
    };
  };
  pricing: {
    sectionLabel: string;
    headline: string;
    subtext: string;
    tiers: PricingTier[];
    note: string;
  };
  process: {
    sectionLabel: string;
    headline: string;
    steps: ProcessStep[];
  };
  portfolio: {
    sectionLabel: string;
    headline: string;
    viewAll: string;
    viewProject: string;
    items: PortfolioItem[];
  };
  sourcingCases: {
    sectionLabel: string;
    headline: string;
    viewAll: string;
    webPortfolioLabel: string;
    webPortfolioLink: string;
    items: SourcingCase[];
  };
  finalCta: {
    headline: string;
    subtext: string;
    cta: string;
    whatsapp: string;
    telegram: string;
    form: {
      namePlaceholder: string;
      emailPlaceholder: string;
      messagePlaceholder: string;
      submit: string;
      success: string;
      error: string;
    };
  };
  footer: {
    legal: string;
    links: {
      services: string;
      pricing: string;
      process: string;
      contact: string;
    };
  };
  coldEmailPage: {
    eyebrow: string;
    headline: string;
    sub: string;
    features: ColdEmailFeature[];
    cta: string;
    note: string;
  };
  map: {
    eyebrow: string;
    headlinePrefix: string;
    headlineAccent: string;
    sub: string;
    stats: {
      totalVisits: string;
      countries: string;
      origin: string;
      originValue: string;
    };
    ranges: {
      today: string;
      yesterday: string;
      '7d': string;
      '30d': string;
      '90d': string;
      ytd: string;
    };
    rangeLabels: {
      today: string;
      yesterday: string;
      '7d': string;
      '30d': string;
      '90d': string;
      ytd: string;
    };
    rangeAriaLabel: string;
    topCountries: string;
    emptyRange: string;
    footnoteLive: string;
    footnoteMock: string;
  };
  webClient: WebClientForm;
  sourcingClient: SourcingClientForm;
}

export const et: Translations = {
  nav: {
    services: 'Teenused',
    pricing: 'Hinnad',
    process: 'Protsess',
    contact: 'Kontakt',
    langToggle: 'EN',
    cta: 'Alustame',
    portfolio: 'Portfoolio',
    coldEmail: 'Cold Email',
  },
  hero: {
    headline: 'Sourcing.\nAI kiirus.\nInimese täpsus.',
    subtext: '',
    ctaPrimary: 'Alustame',
    ctaGhost: 'Portfoolio',
  },
  statement: {
    line1: 'Sina ei pea otsima.',
    line2: 'Mina toon tulemused.',
    sub: 'Kümme aastat sourcingu kogemust ja AI agendid. Iga kontakt käsitsi kontrollitud.',
    cta: 'Pärida pakkumist',
  },
  pillars: {
    sectionLabel: 'Mida sa saad',
    items: [
      {
        title: 'Globaalne haare',
        body: 'Tootjad, tarnijad, investorid, kinnisvara jms. Igalt turult, igas riigis. Sinu jaoks leitud.',
      },
      {
        title: 'AI leiab, inimene verifitseerib',
        body: 'AI agendid skanneerivad sadu allikaid. Mina helistan ja kirjutan igale kontaktile, et valideerida kõige asjakohasemad.',
      },
      {
        title: 'Kümme aastat kogemust',
        body: 'Olen enda projektidele sourcinud üle kümne aasta. Tean trikke, nippe ja otseteid, mida keegi teine sulle ei näita.',
      },
    ],
  },
  services: {
    sectionLabel: 'Teenused',
    headline: 'Mida ma teen',
    items: [
      {
        tag: '01',
        title: 'AI Sourcing',
        body: 'Tootjad, tarnijad, teenused, investorid ja kinnisvara kogu maailmast. Sa ei saa lihtsalt nimekirja. Sa saad päris kontakte, kes reaalselt vastavad.',
      },
      {
        tag: '02',
        title: 'AI agendid',
        body: 'Kohandatud AI agendid, mis töötavad 24/7 — uurivad, jälgivad, kirjutavad ja hoiavad kontakti. Ei väsi, ei puhka, ei unusta.',
      },
      {
        tag: '03',
        title: 'AI automatiseerimine',
        body: 'Ühenda oma tööriistad ja automatiseeri kordused. Säästa tunde nädalas ja kasva ilma palgakuluta.',
      },
      {
        tag: '04',
        title: 'Kohandatud AI',
        body: 'Chatbotid, sisemised tööriistad ja dashboardid. Ehitatud täpselt sinu ärile.',
      },
    ],
    extra: {
      label: 'Lisateenused',
      items: [
        'Cold email kampaaniad',
        'Veebilehed ja e-poed',
        'Turu ja konkurentsi analüüs',
        'Andmete rikastamine ja segmenteerimine',
        'CRM ja töövoogude integratsioonid',
        'Pitch deckid, mis päriselt pitchivad',
        'Logo ja brändiidentiteet',
        'Lepingud ja juriidilised mallid (NDA · MSA · SOW)',
      ],
      cta: 'Vajad midagi muud? Räägime.',
    },
  },
  pricing: {
    sectionLabel: 'Hinnad',
    headline: 'Lihtne hinnakiri',
    subtext: 'Tasuta hinnapakkumine 24 tunni jooksul.',
    tiers: [
      {
        name: 'Sourcing sprint',
        duration: 'Kuni 5 päeva · üks vertikaal',
        price: '€1500',
        description: 'Verifitseeritud kontaktid, mis on kohe kasutamiseks valmis.',
        cta: 'Alustame',
        features: [
          'Kuni 50 käsitsi verifitseeritud kontakti',
          'Kohandatud AI agent sinu vertikaali jaoks',
          'Iga kontakt kontrollitud kõne või emailiga',
          'Segmenteeritud andmed koos kontekstiga',
          'Kohaletoimetus 5 päeva jooksul',
          'Tasuta järelkonsultatsioon 30 päeva',
        ],
      },
    ],
    note: 'Hinnapakkumine 24 tunni jooksul. Suurema mahu korral tellitav pakett.',
  },
  process: {
    sectionLabel: 'Protsess',
    headline: 'Kuidas see toimib',
    steps: [
      {
        num: '01',
        title: 'Briif',
        body: 'Kes on sinu ideaalne kontakt, tarnija või investor? Pool tundi kõnet ja mul on täpne pilt.',
      },
      {
        num: '02',
        title: 'AI otsing',
        body: 'AI agendid skanneerivad andmebaase, katalooge ja avatud veebi. Sajad potentsiaalsed kontaktid ühes kohas.',
      },
      {
        num: '03',
        title: 'Käsitsi kontroll',
        body: 'Helistan või kirjutan igale kontaktile. Võltsid, mitteaktiivsed ja ebasobivad filtreeritakse välja.',
      },
      {
        num: '04',
        title: 'Tulemus',
        body: 'Verifitseeritud nimekiri, iga kontakt kontekstiga. Kohe kasutamiseks valmis.',
      },
    ],
  },
  portfolio: {
    sectionLabel: 'Portfoolio',
    headline: 'Tehtud tööd',
    viewAll: 'Vaata kõiki töid',
    viewProject: 'Vaata projekti',
    items: [
      {
        id: 'btcdeal',
        title: 'BTC Deal',
        category: 'Platvorm',
        description: 'OTC Bitcoin tehingute platvorm. Ühendab eramüüjad ja ostjad 1000+ BTC tehinguteks Euroopas.',
        chips: ['Next.js', 'GitHub', 'Resend', 'Vercel'],
        url: 'https://btcdeal.space',
        image: '/portfolio/BTCDEAL.png',
        imageWidth: '40%',
      },
      {
        id: 'alneva',
        title: 'Alneva',
        category: 'Veebileht',
        description: 'Korporatiivne veebileht Leedu ettevõttele Alneva UAB. Esindusplatvorm B2B klientidele Vilniuse turul.',
        chips: ['Next.js', 'GitHub', 'Vercel'],
        url: 'https://alneva.lt',
        image: '/portfolio/ALNEVA.png',
        imageWidth: '40%',
      },
      {
        id: 'heva',
        title: 'Heva',
        category: 'Platvorm',
        description: 'Kaubavedude turuplatvorm, mis ühendab saatjad ja autojuhid Eestis.',
        chips: ['Next.js', 'GitHub', 'i18n', 'Resend'],
        url: 'https://heva.me',
        image: '/portfolio/HEVA.png',
        imageWidth: '40%',
      },
      {
        id: 'alfaweld',
        title: 'Alfaweld',
        category: 'Veebileht',
        description: 'B2B keevituse ja metallitöö ettevõtte sait Skandinaavia ja Baltikumi turgudele.',
        chips: ['Next.js', 'GitHub', 'i18n', 'Resend'],
        url: 'https://www.alfaweldpro.com',
        image: '/portfolio/ALFAWELD.png',
      },
      {
        id: 'oanduaia',
        title: 'Oanduaia',
        category: 'Veebileht',
        description: 'Loodusretriidi koduleht Lahemaa rahvuspargis. Sauna, loodusujula ja ökoheaolu.',
        chips: ['Next.js', 'GitHub', 'Vercel'],
        url: 'https://www.oanduaia.ee',
        image: '/portfolio/OANDUAIA.png',
        imageWidth: '70%',
      },
      {
        id: 'dangerouspoems',
        title: 'Dangerous Poems',
        category: 'Veebileht',
        description: 'Luuleplatvorm, mis koondab teoseid mehelikkuse ja isikliku kasvu teemadel.',
        chips: ['Next.js', 'GitHub', 'Vercel'],
        url: 'https://www.dangerouspoems.com',
        image: '/portfolio/DANGEROUS POEMS.png',
      },
    ],
  },
  sourcingCases: {
    sectionLabel: 'Portfoolio',
    headline: 'Viimased tööd',
    viewAll: 'Vaata kõiki',
    webPortfolioLabel: 'Otsid veebitöid?',
    webPortfolioLink: 'Vaata veebiportfooliot',
    items: [
      {
        tag: '01',
        category: 'Tootjad',
        title: 'Pelletitootjad, Baltikum + Poola',
        body: 'Saksa jaeketile leidsime ENplus A1 sertifikaadiga tootjad päevadega. Sertifikaadid otse ENplus registrist, hinnad ja tarneajad lisaks. Nimekirja jõudsid ainult tehased alla 350€ tonn ja üle 500 tonni kuus.',
        outcome: '3 tarnelepingut',
      },
      {
        tag: '02',
        category: 'Investorid',
        title: 'Kinnisvarainvestorid, Dubai',
        body: 'Leidsime aktiivsed investorid Balti arendaja seed roundi. Sõelusime kandidaate investeeringu suuruse, varaklassi ja varasemate tehingute põhjal. Kus meil olid ühised tutvused, tegime sooja tutvustuse; kus ei olnud, pöördusime otse ja isikupärastatult.',
        outcome: '€4,2M kaasatud',
      },
      {
        tag: '03',
        category: 'Tootjad',
        title: '3D metallprint tootjad, Euroopa',
        body: 'Juveelibränd otsis 3D-metallprintimise tootmispartnereid. Enamik pakkujaid osutus tegelikult resin printeriteks, mitte päris SLM-masinateks — hõbedas või kullas printivaid ettevõtteid on Euroopas käputäis. Kaardistasime iga sobiva tootja ja kontrollisime iga tehnilise väite proovitellimuse ning hinnavõrdlusega.',
        outcome: '2 partnerit',
      },
      {
        tag: '04',
        category: 'Kontaktid',
        title: 'E-kaubanduse otsustajad, UK',
        body: 'Sihikul olid Suurbritannia e-kaubanduse brändide COO-d, Head of Ops-id ja Head of Fulfilment-id, kelle firma käive on £5-50M. Emailid kontrollisime kolme sõltumatu teenusega ja LinkedIn-i profiilid vaatasime üle päris aktiivsuse suhtes. Iga saadetud sõnum viitas konkreetse firma värsketele töölevõttudele või uudistele.',
        outcome: '12% vastust',
      },
      {
        tag: '05',
        category: 'Kinnisvara',
        title: 'Avalikustamata kinnisvara, Baltikum',
        body: 'Erakliendi soovil otsisime investeerimisküpseid objekte Eestist ja Lätist. Otsing käis vahendajate, omanike, avalikustamata pakkumiste ja kohalike kinnisvarajuristide kaudu - viimased kuulevad varadest tihti enne müüki panekut. Iga objekti käisime kohapeal üle vaatamas enne kliendile pakkumist.',
        outcome: '15 objekti',
      },
      {
        tag: '06',
        category: 'Tootjad',
        title: 'OEM tehased, Vietnam + Bangladesh',
        body: 'Spordirõivaste brändile kontrollisime tehased päris proovitoote põhjal, mitte tehase enda brošüüri väidetega. Kus võimalik, kõrvutasime tulemusi SGS ja Bureau Veritas sõltumatute auditi-raportitega. Finalistid andsime üle koos hindade, tarneaja ja nimelise tootmisliini-kontaktiga.',
        outcome: '8 finalisti',
      },
      {
        tag: '07',
        category: 'Investorid',
        title: 'Fintech seed round, Euroopa + UK',
        body: 'Makseteenuste startup-ile otsisime sobivaid fonde Euroopast ja Suurbritanniast. Sõelusime kandidaate investeerimisteesi, kasvufaasi ja tšeki suuruse järgi - mitte massisaatmine. Iga sõnum viitas fondi kõige värskemale sarnasele investeeringule.',
        outcome: 'Ring suletud',
      },
      {
        tag: '08',
        category: 'Tootjad',
        title: 'Kosmeetika laborid, Lõuna-Euroopa',
        body: 'Nahahoolduse brändile leidsime tootmispartnerid Itaaliast, Hispaaniast ja Portugalist. Iga sertifikaadi kontrollisime üle (GMP, ISO 22716, vajadusel ECOCERT) ning miinimumkogused rääkisime läbi. Prooviretseptid tellisime tippkandidaatidelt enne lühinimekirja koostamist.',
        outcome: '5 proovi-etapis',
      },
      {
        tag: '09',
        category: 'Tarnijad',
        title: 'Elektroonika, Shenzhen',
        body: 'Riistvara startup vajas sensor-mooduli tarnijat. Kategooria on täis edasimüüjaid, kes end tehaseks teesklevad. Iga kandidaadi kontrollisime läbi nelja kanali: müügiesindaja LinkedIn-i taust, Alibaba usaldusskoor, proovitoote kvaliteet ja kohaliku agendi salvestatud tehase-külastuse video.',
        outcome: '3 finalisti',
      },
      {
        tag: '10',
        category: 'Kinnisvara',
        title: 'Avalikustamata ärikinnisvara, Berliin',
        body: 'Balti investor otsis mitmeotstarbelisi objekte eelarves €5-15M. Otsisime vahendajate, omanike ja pankade halbade laenude portfellide seast - viimane toob esile varasid, mis avalikult müüki ei jõua kunagi. Iga võimalust hindasime tootluse, üürnike koosseisu ja renoveerimiskulu järgi.',
        outcome: '3 DD faasis',
      },
      {
        tag: '11',
        category: 'Tarnijad',
        title: 'Kohvitootjad, Brasiilia',
        body: 'Põhjamaade kohvikuketile leidsime spetsiaalkohvi otseost-partnerid Minas Geraisi ja São Paulo farmidest. Iga farmi Rainforest Alliance ja Fair Trade sertifikaadid kontrollisime ning proovioad saatsime sertifitseeritud Q-graderile hindamiseks. Klient sai kätte cupping-hinded, hooajalised saagimahud ja otsekontakti iga tootjaga.',
        outcome: '6 partnerit',
      },
      {
        tag: '12',
        category: 'Tarnijad',
        title: 'IT arendustiimid, Ukraina',
        body: 'Berliinis asuv SaaS-firma otsis full-stack arendustiime Kiievist ja Lvivist. Iga tiimi GitHub-i profiili vaatasime üle ja viimased kliendiprojektid kontrollisime otsese soovitaja-kõnega. Töötasuvahemikud, turvakorraldus (SOC 2, ISO 27001) ja ajavööndi kattuvuse selgitasime enne intervjuusid.',
        outcome: '3 tiimi intervjuus',
      },
      {
        tag: '13',
        category: 'Investorid',
        title: 'Family office-id, Šveits',
        body: 'Balti biotech-firmale leidsime investorid Genfist ja Zürichist. Sõelusime kandidaate sektori-fookuse, tšeki suuruse ja LP-koosseisu järgi (avalikud allikad ning Preqin andmed). Iga kontakti kinnitasime LinkedIn-i kaudu enne pöördumist. Kus võimalik, kasutasime esimese astme tutvustusi.',
        outcome: '4 kohtumist',
      },
      {
        tag: '14',
        category: 'Tootjad',
        title: 'Farmaatsia tootjad, India',
        body: 'EL hulgimüüjale otsisime geneeriliste ravimite tootjaid Hyderabadist ja Mumbaist. Iga tehase USFDA ja EMA GMP staatuse kontrollisime otse regulaatorite andmebaasidest. Miinimumkogused, tarnetingimused ja pakendamise litsentsid rääkisime selgeks juba alguses.',
        outcome: '4 finalisti',
      },
      {
        tag: '15',
        category: 'Tarnijad',
        title: 'Private-label vein, Portugal',
        body: 'Skandinaavia jaeketile leidsime veinitootjad Douro ja Alentejo piirkondadest. Iga viinamarjaistanduse mahetoodangu sertifikaadid ja aastase toodangu kontrollisime, proovipudelid saatsime sommelierile hindamiseks. Etiketikujunduse ja ekspordi-logistika leppisime kokku enne kliendile üleandmist.',
        outcome: '3 partnerit',
      },
    ],
  },
  finalCta: {
    headline: 'Valmis alustama?',
    subtext: 'Kirjuta mulle.',
    cta: 'Alustame',
    whatsapp: 'WhatsApp',
    telegram: 'Telegram',
    form: {
      namePlaceholder: 'Sinu nimi',
      emailPlaceholder: 'sinu@email.com',
      messagePlaceholder: 'Kirjelda oma projekti lühidalt...',
      submit: 'Saada sõnum →',
      success: 'Saadetud ✓',
      error: 'Saatmine ebaõnnestus. Proovi uuesti.',
    },
  },
  coldEmailPage: {
    eyebrow: 'B2B müügikasvatus',
    headline: 'Cold email süsteem.\nVõtmed kätte.',
    sub: 'Ehitame täpse lead list\'i sinu ideaalsele kliendile, kirjutame sõnumid mis saavad vastuse ja käivitame kampaania.',
    features: [
      {
        num: '01',
        title: 'Lead List',
        body: 'Sinu ideaalne klient - firma, amet, kontakt. Verifitseeritud emailid, nullist põrgatusi. Andmed rikastatud ja segmenteeritud.',
      },
      {
        num: '02',
        title: 'Copywriting',
        body: 'Sõnumid, mis avavad ja saavad vastuse. Iga sõna teenib eesmärki. Järelkirjad ja A/B testimine kaasas.',
      },
      {
        num: '03',
        title: 'Saatmine',
        body: 'Tehniline seadistus, domeeni soojendus, deliverability tagatud. Avamised, klõpsud, vastused - reaalajas.',
      },
    ],
    cta: 'Võta ühendust',
    note: 'Hinnapakkumine 24 tunni jooksul.',
  },
  footer: {
    legal: `© ${new Date().getFullYear()} agency99. Kõik õigused kaitstud.`,
    links: {
      services: 'Teenused',
      pricing: 'Hinnad',
      process: 'Protsess',
      contact: 'Kontakt',
    },
  },
  map: {
    eyebrow: 'REAALAJA LIIKLUS · MAAILMAVAADE',
    headlinePrefix: 'Kus maailm',
    headlineAccent: 'meid leiab.',
    sub: 'agency99.io külastajad - üle kontinentide, reaalajas.',
    stats: {
      totalVisits: 'Külastajaid kokku',
      countries: 'Riike',
      origin: 'Päritolu',
      originValue: 'Tallinn, EE',
    },
    ranges: {
      today: 'Täna',
      yesterday: 'Eile',
      '7d': '7p',
      '30d': '30p',
      '90d': '90p',
      ytd: 'See aasta',
    },
    rangeLabels: {
      today: 'täna',
      yesterday: 'eile',
      '7d': 'viimased 7 päeva',
      '30d': 'viimased 30 päeva',
      '90d': 'viimased 90 päeva',
      ytd: 'sel aastal',
    },
    rangeAriaLabel: 'Ajavahemik',
    topCountries: 'Top riigid',
    emptyRange: 'Selles ajavahemikus pole veel külastajaid.',
    footnoteLive: 'Reaalajas · Google Analytics 4 · koondatud, ainult riigi tasemel. Isikuandmeid pole.',
    footnoteMock: 'Näidisandmed - pole reaalajas. Koondatud, ainult riigi tasemel.',
  },
  webClient: {
    eyebrow: 'Kliendi ankeet',
    headline: 'Räägi oma projektist.',
    subtext: 'Paar kiiret küsimust. Umbes kolm minutit. Vastan isiklikult 24 tunni jooksul.',
    labels: {
      name: 'Sinu nimi',
      email: 'Email',
      company: 'Ettevõte või olemasolev veebileht',
      projectTypes: 'Mida vajad? (vali suvaline arv)',
      goal: 'Mis on soovitud tulemus?',
      audience: 'Kellele see on mõeldud?',
      contentReady: 'Kas sisu on valmis?',
      inspiration: 'Saidid või brändid, mis meeldivad (inspiratsioon)',
      timeline: 'Ajakava',
    },
    placeholders: {
      name: 'Jaan Tamm',
      email: 'sina@ettevote.com',
      company: 'ettevote.ee (valikuline)',
      otherDescription: 'Ütle täpsemalt - üks lause piisab',
      goal: 'nt rohkem leade, e-müük, kiirem sait',
      audience: 'nt B2B asutajad, restoranid, disainerid',
      inspiration: 'nt stripe.com, linear.app - mis meeldib',
    },
    chips: {
      types: [
        'Veebileht',
        'E-pood',
        'Platvorm / veebirakendus',
        'Cold email süsteem',
        'Disain / brändiidentiteet',
        'Muu',
      ],
      contentReady: [
        'Tekstid ja pildid on valmis',
        'Osa on olemas - vaja abi ülejäänuga',
        'Vaja abi kõigega',
      ],
      timelines: [
        'ASAP',
        '2 nädala jooksul',
        'Kuu aja jooksul',
        'Paindlik',
      ],
    },
    otherOption: 'Muu',
    errors: {
      pickAtLeastOne: 'Vali vähemalt üks.',
      pickOne: 'Vali üks.',
      generic: 'Midagi läks valesti. Kirjuta otse priidik@agency99.io ja lahendame.',
    },
    submit: 'Saada Priidikule',
    submitting: 'Saadan…',
    hint: 'Läheb otse priidik@agency99.io',
    success: {
      eyebrow: 'Kätte saadud',
      headline: 'Aitäh - kätte saime.',
      subtextBefore: 'Priidik loeb selle isiklikult läbi ja vastab 24 tunni jooksul aadressilt ',
      subtextEmail: 'priidik@agency99.io',
      subtextAfter: '. Kui asi on kiire, kirjuta WhatsAppi.',
    },
  },
  sourcingClient: {
    eyebrow: 'Sourcing ankeet',
    headline: 'Mida vajad?',
    subtext: 'Vastan 24h jooksul.',
    labels: {
      name: 'Sinu nimi',
      email: 'Email',
      company: 'Ettevõte või veebileht',
      sourcingTypes: 'Mida sa sourcid? (vali suvaline arv)',
      targetMarkets: 'Sihtturg või geograafia',
      goal: 'Mis on soovitud tulemus?',
      idealContact: 'Ideaalne kontakt / roll sihtettevõttes',
      criteria: 'Kohustuslikud kriteeriumid (sertid, maht, hinnavahemik)',
      tried: 'Mida oled juba proovinud?',
      timeline: 'Ajakava',
    },
    placeholders: {
      name: 'Jaan Tamm',
      email: 'sina@ettevote.com',
      company: 'ettevote.ee (valikuline)',
      otherDescription: 'Ütle täpsemalt - üks lause piisab',
      targetMarkets: 'nt Saksamaa, Baltikum, EL',
      goal: 'nt 3 tarnelepingut, €500K kaasatud, 8 tehase finalisti',
      idealContact: 'nt hankejuht, fondi partner, müügidirektor',
      criteria: 'nt ENplus A1, MOQ alla 500, käive €5-50M',
      tried: 'nt Alibaba, Apollo, eelmine agentuur - mis töötas, mis mitte',
    },
    chips: {
      types: [
        'Tootjad / tehased',
        'Tarnijad / hulgimüüjad',
        'Investorid / fondid',
        'Avalikustamata kinnisvara',
        'Otsustajad (inimesed)',
        'Private-label / OEM tootmine',
        'Muu',
      ],
      timelines: [
        'ASAP',
        '2 nädala jooksul',
        'Kuu aja jooksul',
        'Paindlik',
      ],
    },
    otherOption: 'Muu',
    errors: {
      pickAtLeastOne: 'Vali vähemalt üks.',
      pickOne: 'Vali üks.',
      generic: 'Midagi läks valesti. Kirjuta otse priidik@agency99.io ja lahendame.',
    },
    submit: 'Saada Priidikule',
    submitting: 'Saadan…',
    hint: 'Läheb otse priidik@agency99.io',
    success: {
      eyebrow: 'Kätte saadud',
      headline: 'Aitäh - kätte saime.',
      subtextBefore: 'Priidik loeb selle isiklikult läbi ja vastab 24 tunni jooksul aadressilt ',
      subtextEmail: 'priidik@agency99.io',
      subtextAfter: '. Kui asi on kiire, kirjuta WhatsAppi.',
    },
  },
};
