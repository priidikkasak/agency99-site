import type { Translations } from './et';

export const en: Translations = {
  nav: {
    services: 'Services',
    pricing: 'Pricing',
    process: 'Process',
    contact: 'Contact',
    langToggle: 'ET',
    cta: 'Start a project',
  },
  hero: {
    headline: 'Websites that win.',
    subtext:
      'Premium web design without the agency price tag. Delivered in 7 days.',
    ctaPrimary: 'Start a project',
    ctaGhost: 'Our work',
  },
  statement: {
    line1: 'Agency quality.',
    line2: 'Startup price.',
    sub: 'One human + AI. No overhead, no markup, no agency rates.',
    cta: 'Get a quote',
  },
  pillars: {
    sectionLabel: 'What you get',
    items: [
      {
        title: 'Design that converts',
        body: "Every detail serves a purpose. Not beauty for its own sake — visual logic that drives results.",
      },
      {
        title: 'AI speed, human judgment',
        body: 'AI accelerates the build, the human ensures quality. You get both, pay for one.',
      },
      {
        title: 'Everything in one place',
        body: 'Logo, website, payments, analytics. No juggling 10 different service providers.',
      },
    ],
  },
  services: {
    sectionLabel: 'Services',
    headline: "What's included",
    items: [
      {
        tag: '01',
        title: 'Website',
        body: 'Fast, mobile-friendly, SEO-optimized. Next.js + Vercel — under 1 second load time.',
      },
      {
        tag: '02',
        title: 'E-commerce',
        body: 'Products, cart, Stripe payments. Complete e-commerce solution.',
      },
      {
        tag: '03',
        title: 'Platform',
        body: 'User management, database, APIs. Supabase + Next.js full-stack.',
      },
      {
        tag: '04',
        title: 'Design services',
        body: 'Logo, branding, UI/UX design. Figma file included — your files, your rights.',
      },
    ],
  },
  pricing: {
    sectionLabel: 'Pricing',
    headline: 'Simple pricing',
    subtext: 'Free quote within 24 hours.',
    starter: {
      name: 'Starter',
      price: 'From €500',
      duration: 'Up to 3 days',
      description: 'Ideal for businesses that need a fast, professional web presence.',
      features: [
        'Up to 5 pages',
        'Mobile-friendly design',
        'SEO basics',
        'Contact form',
        'Vercel deploy',
        '1 month support',
      ],
      cta: "Let's start",
    },
    advanced: {
      name: 'Advanced',
      badge: 'Popular',
      price: 'Up to €2,000',
      duration: 'Up to 7 days',
      description: 'For e-commerce, platforms and complex web solutions.',
      features: [
        'Unlimited pages',
        'E-commerce + Stripe payments',
        'User authentication',
        'Supabase database',
        'Custom animations',
        'Analytics setup',
        '3 months support',
      ],
      cta: 'Request a quote',
    },
    note: 'Quote within 24 hours. Price depends on project scope.',
  },
  process: {
    sectionLabel: 'Process',
    headline: 'How it works',
    steps: [
      {
        num: '01',
        title: 'Brief',
        body: 'Fill out a short form. I learn your business, goals and preferences.',
      },
      {
        num: '02',
        title: 'Design',
        body: 'I create a visual concept. You see the result before development starts.',
      },
      {
        num: '03',
        title: 'Build',
        body: 'Fast and precise build with Next.js + AI. Daily updates.',
      },
      {
        num: '04',
        title: 'Launch',
        body: 'Deploy to Vercel, domain configured, analytics running. Done.',
      },
    ],
  },
  finalCta: {
    headline: 'Ready to build?',
    subtext: "Let's talk.",
    cta: 'Start a project',
    responseNote: 'Response within 24 hours.',
    whatsapp: 'WhatsApp',
    telegram: 'Telegram',
    form: {
      namePlaceholder: 'Your name',
      emailPlaceholder: 'you@email.com',
      messagePlaceholder: 'Describe your project briefly...',
      submit: 'Send message →',
    },
  },
  footer: {
    legal: `© ${new Date().getFullYear()} agency99. All rights reserved.`,
    links: {
      services: 'Services',
      pricing: 'Pricing',
      process: 'Process',
      contact: 'Contact',
    },
  },
};
