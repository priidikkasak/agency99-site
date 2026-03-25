export interface NavItem {
  services: string;
  pricing: string;
  process: string;
  contact: string;
  langToggle: string;
  cta: string;
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
}

export const et: Translations = {
  nav: {
    services: 'Teenused',
    pricing: 'Hinnad',
    process: 'Protsess',
    contact: 'Kontakt',
    langToggle: 'EN',
    cta: 'Alustame',
  },
  hero: {
    headline: 'Uus veeb. 3 päevaga.\nAgentuuri kvaliteet.\nTaskukohane hind.',
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
        body: 'Iga detail teenib eesmärki. Mitte ilu pärast ilu — visuaalne loogika, mis toob tulemusi.',
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
        body: 'Kiire, mobiilisõbralik, SEO-optimeeritud. Next.js + Vercel — laadimine alla 1 sekundi.',
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
        body: 'Logo, bränding, UI/UX disain. Figma fail kaasas — omad failid, omad õigused.',
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
