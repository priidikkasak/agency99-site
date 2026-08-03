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
        body: 'Tootjad, tarnijad, teenused, investorid ja kinnisvara kogu maailmast. Iga kontakt käsitsi verifitseeritud kõne või emailiga. Sa ei saa lihtsalt nimekirja. Sa saad päris kontakte.',
      },
      {
        tag: '02',
        title: 'AI agendid',
        body: 'Kohandatud AI agendid, mis töötavad 24/7, uurivad, jälgivad, kirjutavad ja järgnevad. Ei väsi, ei puhka, ei unusta.',
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
        body: 'Saksa jaeketile leitud ENplus A1 sertifitseeritud tootjad kaheksa päevaga. Iga sertifikaat kontrollitud ENplus registrist, iga müügikontakt kinnitatud otsese kõnega. Filtrid: hind alla 350€/t, kuu tootmisvõimsus üle 500 tonni, bulk-veok Saksamaale. Lühinimekiri koos FCA-hinna, sert-numbri, sample-tellimuse staatuse ja tarneajaga iga tehase kohta.',
        outcome: '3 tarnelepingut',
      },
      {
        tag: '02',
        category: 'Investorid',
        title: 'Kinnisvarainvestorid, Dubai',
        body: 'Balti arendaja seed-vooru jaoks leitud aktiivsed investorid. Screening ticket-size, varaklassi-sobivuse ja varasema tehinguajaloo järgi. Soojad tutvustused ühiste kontaktide kaudu kus võimalik, personaalne outreach kus mitte. Iga kontakt kinnitatud telefoniga enne üleandmist, koos fondi teesi ja varasemate investeeringute märkmetega.',
        outcome: '€4,2M kaasatud',
      },
      {
        tag: '03',
        category: 'Tootjad',
        title: '3D metallprint bureau’d, EU',
        body: 'Juveelibränd vajas direct-to-metal väärismetalli print-partnereid — nišš, kus enamik listinguid osutuvad vaigu-printeriks, mitte päris SLM/DMLS masinaks hõbedas või kullas. Iga kvalifitseeritud Euroopa bureau kaardistatud ja filtreeritud MOQ (alla 20 tk), viimistluse kvaliteedi-referentside ja tarneaja järgi. Iga tehniline väide kinnitatud proovitellimuse ja hinnavõrdlusega.',
        outcome: '2 partnerit',
      },
      {
        tag: '04',
        category: 'Kontaktid',
        title: 'Ecom COO’d, UK',
        body: 'Ecom SaaS’ile leitud otsustajad: COO’d, Head of Ops’id ja Head of Fulfilment’id kes juhivad £5–50M turnover’iga UK ecom brände. Emailid verifitseeritud kolme-provider waterfall’iga, LinkedIn’i tegevus kontrollitud päris engagement’ile (mitte tolmused profiilid). Kampaania järjestatud sooja tutvustustega, viidates iga kontakti värsketele töölevõtu- või press-signaalidele.',
        outcome: '12% vastust',
      },
      {
        tag: '05',
        category: 'Kinnisvara',
        title: 'Off-market objektid, Baltikum',
        body: 'Investeerimisküpsed objektid Eestis ja Lätis erakliendi profiilile. Sügavotsing vahendajate, otseomanike ja vaikselt pakutavate objektide seas — pluss follow-up kohalike kinnisvara-juristidega, kes tihti kuulevad varadest enne nende listimist. Iga objekt üle vaadatud enne lühinimekirja, koos omandiajaloo ja title-kontrolliga.',
        outcome: '15 objekti leitud',
      },
      {
        tag: '06',
        category: 'Tootjad',
        title: 'OEM tehased, Vietnam + Bangladesh',
        body: 'Fitness rõivaste brändile käsitsi kontrollitud tehased. Võimsus, MOQ ja sertifikaadid tõestatud otsese näidise-tellimusega, mitte tehase enda spec’iga. Cross-check SGS + Bureau Veritas auditi-raportid kus olemas. Finalistid koos kõrvutise hinnavõrdluse, tarneaja ja nimelise tootmisliini-kontaktiga.',
        outcome: '8 finalisti',
      },
      {
        tag: '07',
        category: 'Investorid',
        title: 'Fintech seed voor',
        body: 'Makseteenuste startup’ile leitud relevantsed fondid kogu Euroopas ja Ühendkuningriigis. Screening teesi-sobivuse, faasi-fookuse ja tsekki-suuruse järgi — mitte spray-and-pray outreach. Soojad tutvustused kus võimalik; personaalne cold outreach kus mitte, viidates iga fondi kõige värskemale relevantsele investeeringule. Ring suletud 12 nädalaga.',
        outcome: 'Ring suletud',
      },
      {
        tag: '08',
        category: 'Tootjad',
        title: 'Private-label kosmeetika, Lõuna-Euroopa',
        body: 'Nišš skincare bränd vajas laboreid Itaalias, Hispaanias ja Portugalis. Iga tootja sertifikaadid (GMP, ISO 22716, ECOCERT kus relevantne) kontrollitud ja MOQ läbi räägitud. Sample formulatsioonid tellitud top kandidaatidelt enne shortlist’i, koos formulatsiooni-raportite kõrvutise võrdlusega.',
        outcome: '5 sample-etapis',
      },
      {
        tag: '09',
        category: 'Tarnijad',
        title: 'Elektroonika-komponendid, Shenzhen',
        body: 'Hardware startup vajas sensor-mooduli tarnijat — kategooria, mis on täis edasimüüjaid, kes teesklevad tehaseid olevat. Tarnijad valideeritud kümne päevaga: müügiesindaja LinkedIn’i taust, Alibaba trust score, sample’i kvaliteet spec’i vastu ja tehase-külastuse video kohaliku agendi kaudu. Finalistid koos kõrvutise hinnavõrdluse ja MOQ-ga.',
        outcome: '3 finalisti',
      },
      {
        tag: '10',
        category: 'Kinnisvara',
        title: 'Ärikinnisvara off-market, Berliin',
        body: 'Balti investoril budget €5–15M mixed-use’ile. Objektid tuvastatud broker’ite listide, otseomanike ja pankade non-performing loan portfellide seast — viimane neist toob esile varasid, mis ei jõua avaliku listinguni. Iga võimalus screenitud yield’i, tenant-mixi ja renoveerimis-kulu järgi enne edasi liikumist.',
        outcome: '3 DD faasis',
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
    sub: 'Ehitame täpse lead list\'i sinu ideaalsele kliendile, kirjutame sõnumid mis saavad vastuse ja käivitame kampaania. Sina ainult vasta kõnedele.',
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
};
