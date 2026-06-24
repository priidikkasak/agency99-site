'use client';

import styles from './MarketingDashboard.module.css';

const GOOGLE_ADS_URL = 'https://ads.google.com/aw/overview';
const META_ADS_URL = 'https://business.facebook.com/adsmanager';

type Platform = {
  name: string;
  url: string;
  status: 'not_connected' | 'connected';
};

const PLATFORMS: Platform[] = [
  { name: 'Google Ads', url: GOOGLE_ADS_URL, status: 'not_connected' },
  { name: 'Meta Ads', url: META_ADS_URL, status: 'not_connected' },
];

const METRIC_LABELS = ['Täna', 'Eile', 'See kuu'];

type SetupItem = {
  title: string;
  note?: string;
};

type SetupBlock = {
  title: string;
  eta: string;
  items: SetupItem[];
  closing: string;
};

const SETUP_BLOCKS: SetupBlock[] = [
  {
    title: 'Google Ads API',
    eta: '~1-3 päeva',
    items: [
      {
        title: 'Developer token',
        note: 'taotle developers.google.com/google-ads/api kaudu - Google vaatab läbi 1-3 tööpäeva.',
      },
      {
        title: 'Manager (MCC) account',
        note: 'ülemkonto, mis omab ligipääsu agency99 reklaamikontole.',
      },
      {
        title: 'OAuth 2.0 client + refresh token',
        note: 'lubab serveril API-d küsida ilma kasutaja sisselogimiseta.',
      },
      {
        title: 'Customer ID + login-customer-id',
        note: 'reklaamikonto numbrid headeritesse.',
      },
    ],
    closing: 'Need 4 olemas → loeme spend metrikad otse. Eelarvete muutmine PATCH endpointiga V1-s.',
  },
  {
    title: 'Meta Marketing API',
    eta: '~30-60 min',
    items: [
      {
        title: 'Business Manager ligipääs',
        note: 'business.facebook.com → seadistatud business + reklaamikonto.',
      },
      {
        title: 'System User access token',
        note: 'long-lived token (mitte tavakasutaja oma) - never expires kui õigesti tehtud.',
      },
      {
        title: 'Ad Account ID',
        note: 'act_XXXXXXXXX vormingus.',
      },
      {
        title: 'App ID + App secret',
        note: 'Facebook Developer App-st (võib uue luua minutiga).',
      },
    ],
    closing: 'Lihtsam stack - kõik töötab ühe tokeniga, kui Business Manager on seadistatud.',
  },
];

const ENV_KEYS = [
  { line: 'GOOGLE_ADS_DEVELOPER_TOKEN=…', comment: '# arendaja token Google\'i läbivaatusest' },
  { line: 'GOOGLE_ADS_CLIENT_ID=…',       comment: '# OAuth client ID' },
  { line: 'GOOGLE_ADS_CLIENT_SECRET=…',   comment: '# OAuth client secret' },
  { line: 'GOOGLE_ADS_REFRESH_TOKEN=…',   comment: '# pikaajaline refresh token' },
  { line: 'GOOGLE_ADS_CUSTOMER_ID=…',     comment: '# reklaamikonto ID (ilma kriipsudeta)' },
  { line: 'GOOGLE_ADS_LOGIN_CUSTOMER_ID=…', comment: '# MCC manager ID (ilma kriipsudeta)' },
  { line: 'META_ACCESS_TOKEN=…',          comment: '# system user long-lived token' },
  { line: 'META_AD_ACCOUNT_ID=act_…',     comment: '# reklaamikonto, act_ prefiksiga' },
  { line: 'META_APP_ID=…',                comment: '# Facebook Developer app ID' },
  { line: 'META_APP_SECRET=…',            comment: '# app secret (saladuses)' },
];

function StatusBadge({ status }: { status: Platform['status'] }) {
  if (status === 'connected') return <span className={styles.status}>● Connected</span>;
  return <span className={styles.status}>Pole ühendatud</span>;
}

export function MarketingDashboard() {
  return (
    <section className={styles.wrap}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.eyebrow}>
          <span className={styles.eyebrowDot} />
          AD SPEND · ADMIN
        </div>
        <h1 className={styles.headline}>
          Reklaamiraha <span className={styles.grad}>üks koht.</span>
        </h1>
        <p className={styles.sub}>
          Google Ads + Meta Ads ülevaade ja kiired lingid platvormidele.
          V0 - ainult lingid. Live metrikad ja inline eelarvete muutmine V1-s
          kui API tokenid on .env.local-i sees.
        </p>

        <div className={styles.cards}>
          {PLATFORMS.map((p) => (
            <article key={p.name} className={styles.card}>
              <header className={styles.cardHeader}>
                <div className={styles.platformBadge}>{p.name}</div>
                <StatusBadge status={p.status} />
              </header>
              <div className={styles.metrics}>
                {METRIC_LABELS.map((label) => (
                  <div key={label} className={styles.metric}>
                    <div className={styles.metricLabel}>{label}</div>
                    <div className={`${styles.metricValue} ${styles.metricValueMuted}`}>-</div>
                  </div>
                ))}
              </div>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.cta}
              >
                Ava {p.name} →
              </a>
            </article>
          ))}
        </div>

        <section className={styles.setup}>
          <span className={styles.setupBadge}>● V1 setup</span>
          <h2 className={styles.setupHeader}>
            Mida on vaja täis-stacki jaoks
          </h2>
          <p className={styles.setupIntro}>
            V1 = live spend metrikad + inline eelarvete muutmine ilma siit lahkumata.
            Selleks on vaja kahte API ühendust. Kui mõlemad on .env.local-is, läheb
            see leht automaatselt aktiivseks.
          </p>

          <div className={styles.setupGrid}>
            {SETUP_BLOCKS.map((block) => (
              <div key={block.title} className={styles.setupBlock}>
                <div className={styles.setupBlockHeader}>
                  <span className={styles.setupBlockTitle}>{block.title}</span>
                  <span className={styles.setupBlockEta}>{block.eta}</span>
                </div>
                <ol className={styles.setupList}>
                  {block.items.map((it, i) => (
                    <li key={i} className={styles.setupListItem}>
                      <span className={styles.setupListIndex}>{String(i + 1).padStart(2, '0')}</span>
                      <span>
                        {it.title}
                        {it.note && <span className={styles.setupListNote}>{it.note}</span>}
                      </span>
                    </li>
                  ))}
                </ol>
                <div className={styles.setupBlockNote}>{block.closing}</div>
              </div>
            ))}
          </div>

          <div className={styles.envHint}>
            <span className={styles.envHintLabel}>.env.local - mida lisada:</span>
            {ENV_KEYS.map((row, i) => (
              <span key={i} className={styles.envLine}>
                {row.line}
                <span className={styles.envComment}>{row.comment}</span>
              </span>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
