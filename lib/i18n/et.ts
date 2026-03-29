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

export interface PricingTierStarter {
  name: string;
  price: string;
  duration: string;
  description: string;
  features: string[];
  cta: string;
}

export interface PricingTierAdvanced {
  name: string;
  badge: string;
  price: string;
  duration: string;
  description: string;
  features: string[];
  cta: string;
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
  };
  pricing: {
    sectionLabel: string;
    headline: string;
    subtext: string;
    starter: PricingTierStarter;
    advanced: PricingTierAdvanced;
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
    headline: 'Uus veeb. 3\u00A0päevaga.\nTaskukohane hind.\nAgentuuri kvaliteet.',
    subtext: '',
    ctaPrimary: 'Alustame',
    ctaGhost: 'Portfoolio',
  },
  statement: {
    line1: 'Vähem juttu.',
    line2: 'Rohkem tulemust.',
    sub: 'Üks inimene + AI. Ilma katteta, ilma ülehinnata.',
    cta: 'Pärida pakkumist',
  },
  pillars: {
    sectionLabel: 'Mida sa saad',
    items: [
      {
        title: 'Disain, mis konverteerib',
        body: 'Iga detail teenib eesmärki. Mitte ilu pärast ilu - visuaalne loogika, mis toob tulemusi.',
      },
      {
        title: 'AI kiirus, inimese hinnang',
        body: 'AI kiirendab ehitust, inimene tagab kvaliteedi. Sa saad mõlemad, maksad ühe eest.',
      },
      {
        title: 'Kõik ühes kohas',
        body: 'Logo, veeb, maksed, analüütika. Ei mingeid 10 erinevat teenusepakkujat.',
      },
    ],
  },
  services: {
    sectionLabel: 'Teenused',
    headline: 'Mis on kaasa arvatud',
    items: [
      {
        tag: '01',
        title: 'Veebileht',
        body: 'Kiire, mobiilisõbralik, SEO-optimeeritud. Next.js + Vercel - laadimine alla 1 sekundi.',
      },
      {
        tag: '02',
        title: 'E-pood',
        body: "Tooted, ostukorv, Stripe maksed. Täielik e-kaubandus lahendus.",
      },
      {
        tag: '03',
        title: 'Platvorm',
        body: 'Kasutajate haldus, andmebaas, API-d. Supabase + Next.js full-stack.',
      },
      {
        tag: '04',
        title: 'Kujundus',
        body: 'Logo, bränding, UI/UX disain. Disainifail kaasas - omad failid, omad õigused.',
      },
    ],
  },
  pricing: {
    sectionLabel: 'Hinnad',
    headline: 'Lihtne hinnakiri',
    subtext: 'Tasuta hinnapakkumine 24 tunni jooksul.',
    starter: {
      name: 'Starter',
      price: 'Alates €500',
      duration: 'Kuni 3 päeva',
      description: 'Ideaalne ettevõtetele, kes vajavad kiiret ja professionaalset veebikohalolekut.',
      features: [
        'Kuni 5 lehte',
        'Mobiilisõbralik disain',
        'SEO alused',
        'Kontaktivorm',
        'Vercel deploy',
        '1 kuu tugi',
      ],
      cta: 'Alustame',
    },
    advanced: {
      name: 'Advanced',
      badge: 'Populaarne',
      price: 'Kuni €2 000',
      duration: 'Kuni 7 päeva',
      description: 'E-poodide, platvormide ja keerukate veebilahenduste jaoks.',
      features: [
        'Piiramatu arv lehti',
        'E-pood + Stripe maksed',
        'Kasutajate autentimine',
        'Supabase andmebaas',
        'Kohandatud animatsioonid',
        'Analüütika seadistus',
        '3 kuud tugi',
      ],
      cta: 'Alustame',
    },
    note: 'Hinnapakkumine 24 tunni jooksul. Hind sõltub projekti mahust.',
  },
  process: {
    sectionLabel: 'Protsess',
    headline: 'Kuidas see toimib',
    steps: [
      {
        num: '01',
        title: 'Briif',
        body: 'Täidad lühikese vormi. Saan aru sinu ärist, eesmärkidest ja eelistustest.',
      },
      {
        num: '02',
        title: 'Disain',
        body: 'Loon visuaalse kontseptsiooni. Näed tulemust enne arendust.',
      },
      {
        num: '03',
        title: 'Ehitus',
        body: 'Next.js + AI-abi toel kiire ja täpne ehitus. Igapäevased uuendused.',
      },
      {
        num: '04',
        title: 'Launch',
        body: 'Deploy Vercelile, domeen seadistatud, analüütika käimas. Valmis.',
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
        id: 'heva',
        title: 'Heva',
        category: 'Platvorm',
        description: 'Kaubavedude turuplatvorm, mis ühendab saatjad ja autojuhid Eestis.',
        chips: ['Next.js', 'GitHub', 'i18n', 'Resend'],
        url: 'https://heva.me',
        image: '/portfolio/HEVA.png',
      },
      {
        id: 'alfaweld',
        title: 'Alfaweld',
        category: 'Veebileht',
        description: 'B2B keevitus- ja metallitöö ettevõtte sait Skandinaavia ja Baltikumi turgudele.',
        chips: ['Next.js', 'GitHub', 'i18n', 'Resend'],
        url: 'https://www.alfaweldpro.com',
        image: '/portfolio/ALFAWELD.png',
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
};
