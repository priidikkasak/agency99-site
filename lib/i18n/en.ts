import type { Translations } from './et';

export const en: Translations = {
  nav: {
    services: 'Services',
    pricing: 'Pricing',
    process: 'Process',
    contact: 'Contact',
    langToggle: 'ET',
    cta: 'Start a project',
    coldEmail: 'Cold Email',
  },
  hero: {
    headline: 'New website. 3\u00A0days.\nAffordable price.\nAgency quality.',
    subtext: '',
    ctaPrimary: 'Start a project',
    ctaGhost: 'Portfolio',
  },
  statement: {
    line1: 'Less talk.',
    line2: 'More results.',
    sub: 'One human + AI. No overhead, no markup, no agency rates.',
    cta: 'Get a quote',
  },
  pillars: {
    sectionLabel: 'What you get',
    items: [
      {
        title: 'Design that converts',
        body: "Every detail serves a purpose. Not beauty for its own sake - visual logic that drives results.",
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
        body: 'Fast, mobile-friendly, SEO-optimized. Next.js + Vercel - under 1 second load time.',
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
        body: 'Logo, branding, UI/UX design. Design file included - your files, your rights.',
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
      cta: "Let's start",
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
  portfolio: {
    sectionLabel: 'Portfolio',
    headline: 'Recent work',
    viewAll: 'View all projects',
    viewProject: 'View project',
    items: [
      {
        id: 'riidepuu',
        title: 'Riidepuu',
        category: 'E-commerce',
        description: 'Complete e-commerce solution for an Estonian clothing brand with Stripe payments.',
        chips: ['Next.js', 'Stripe', 'Supabase'],
      },
      {
        id: 'lexlaw',
        title: 'LexLaw',
        category: 'Website',
        description: "Law firm's representative site. Fast load times, strong SEO.",
        chips: ['Next.js', 'Vercel', 'SEO'],
      },
      {
        id: 'movefit',
        title: 'MoveFit',
        category: 'Platform',
        description: 'Fitness platform MVP with user management and training plans.',
        chips: ['Next.js', 'Supabase', 'Auth'],
      },
      {
        id: 'bistro',
        title: 'Bistro Nord',
        category: 'Website',
        description: 'Restaurant website with online reservations.',
        chips: ['Next.js', 'Vercel'],
      },
      {
        id: 'realty',
        title: 'Realty One',
        category: 'Website',
        description: 'Real estate agency site with property search and filtering.',
        chips: ['Next.js', 'Supabase', 'CMS'],
      },
    ],
  },
  finalCta: {
    headline: 'Ready to build?',
    subtext: "Let's talk.",
    cta: 'Start a project',
    whatsapp: 'WhatsApp',
    telegram: 'Telegram',
    form: {
      namePlaceholder: 'Your name',
      emailPlaceholder: 'you@email.com',
      messagePlaceholder: 'Describe your project briefly...',
      submit: 'Send message →',
      success: 'Sent ✓',
      error: 'Failed to send. Please try again.',
    },
  },
  coldEmailPage: {
    eyebrow: 'B2B lead generation',
    headline: 'Cold email system.\nTurnkey.',
    sub: 'We build a precise lead list of your ideal customer, write copy that gets replies, and run the campaign. You just take the calls.',
    features: [
      {
        num: '01',
        title: 'Lead List',
        body: 'Your ideal customer - company, title, contact. Verified emails, zero bounces. Data enriched and segmented.',
      },
      {
        num: '02',
        title: 'Copywriting',
        body: 'Messages that get opened and replied to. Every word earns its place. Follow-ups and A/B testing included.',
      },
      {
        num: '03',
        title: 'Sending',
        body: 'Technical setup, domain warmup, deliverability guaranteed. Opens, clicks, replies - in real time.',
      },
    ],
    cta: 'Get in touch',
    note: 'Quote within 24 hours.',
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
