'use client';

import { useMemo, useState } from 'react';
import { geoNaturalEarth1, geoPath, geoCentroid } from 'd3-geo';
import { feature } from 'topojson-client';
import type { Feature, FeatureCollection, Geometry } from 'geojson';
import worldAtlas from 'world-atlas/countries-110m.json';
import {
  NUMERIC_TO_COUNTRY,
  lookupCountry,
  type CountryInfo,
} from '@/lib/map/countries';
import {
  totalVisits,
  rankedCountries,
  type VisitorEntry,
} from '@/lib/map/visitors';
import styles from './WorldMap.module.css';

type CountryFeature = Feature<Geometry, { name?: string }> & { id: string | number };

const VIEW_W = 1000;
const VIEW_H = 500;
const ORIGIN_ALPHA2 = 'EE';

type WorldMapProps = {
  visitors: Record<string, VisitorEntry>;
  source: 'ga4' | 'mock';
  rangeLabel?: string;
};

const ALPHA2_TO_NAME: Record<string, string> = (() => {
  const m: Record<string, string> = {};
  for (const k in NUMERIC_TO_COUNTRY) {
    const c = NUMERIC_TO_COUNTRY[k];
    m[c.alpha2] = c.name;
  }
  return m;
})();

function fillOpacity(count: number, maxCount: number): number {
  if (count <= 0) return 0;
  const t = Math.log1p(count) / Math.log1p(maxCount);
  return Math.max(0.18, Math.min(1, t));
}

function formatNumber(n: number): string {
  return n.toLocaleString('en-US');
}

export function WorldMap({ visitors, source, rangeLabel }: WorldMapProps) {
  const totalCountriesCount = Object.keys(visitors).length;
  const total = totalVisits(visitors);
  const ranked = rankedCountries(visitors);
  const maxCount = ranked[0]?.count ?? 1;

  const { paths, originCoords } = useMemo(() => {
    const topo = worldAtlas as unknown as Parameters<typeof feature>[0];
    const fc = feature(topo, 'countries') as unknown as FeatureCollection<
      Geometry,
      { name?: string }
    >;

    const projection = geoNaturalEarth1().fitSize([VIEW_W, VIEW_H], fc);
    const path = geoPath(projection);

    const pathStrings: Array<{
      id: string;
      d: string;
      info: CountryInfo | null;
      count: number;
    }> = [];

    let origin: [number, number] | null = null;

    for (const f of fc.features as CountryFeature[]) {
      const d = path(f) ?? '';
      if (!d) continue;
      const info = lookupCountry(f.id);
      const count = info ? (visitors[info.alpha2]?.count ?? 0) : 0;
      pathStrings.push({ id: String(f.id), d, info, count });

      if (info?.alpha2 === ORIGIN_ALPHA2) {
        const c = geoCentroid(f);
        const p = projection(c as [number, number]);
        if (p) origin = p;
      }
    }

    return { paths: pathStrings, originCoords: origin };
  }, [visitors]);

  const [hovered, setHovered] = useState<{
    name: string;
    count: number;
    x: number;
    y: number;
  } | null>(null);

  return (
    <section className={styles.wrap}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.eyebrow}>
          <span className={styles.eyebrowDot} />
          LIVE TRAFFIC · WORLD VIEW
        </div>
        <h1 className={styles.headline}>
          Where the world <span className={styles.grad}>finds us.</span>
        </h1>
        <p className={styles.sub}>
          Visitors to agency99.io — across continents, in real time.
        </p>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <div className={styles.statLabel}>Total visits</div>
            <div className={styles.statValue}>{formatNumber(total)}</div>
          </div>
          <div className={styles.statSep} />
          <div className={styles.stat}>
            <div className={styles.statLabel}>Countries</div>
            <div className={styles.statValue}>{totalCountriesCount}</div>
          </div>
          <div className={styles.statSep} />
          <div className={styles.stat}>
            <div className={styles.statLabel}>Origin</div>
            <div className={styles.statValue}>Tallinn, EE</div>
          </div>
        </div>

        <div className={styles.mapShell}>
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            className={styles.map}
            role="img"
            aria-label="World map of agency99.io visitors"
            onMouseLeave={() => setHovered(null)}
          >
            <defs>
              <radialGradient id="originPulse" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#B8B0FF" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#8B7BFF" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#8B7BFF" stopOpacity="0" />
              </radialGradient>
            </defs>

            <g>
              {paths.map((c) => {
                const isHit = c.count > 0;
                return (
                  <path
                    key={c.id}
                    d={c.d}
                    className={`${styles.country} ${isHit ? styles.countryHit : ''}`}
                    style={isHit ? { fillOpacity: fillOpacity(c.count, maxCount) } : undefined}
                    onMouseMove={(e) => {
                      const svg = (e.target as SVGPathElement).ownerSVGElement;
                      if (!svg) return;
                      const rect = svg.getBoundingClientRect();
                      setHovered({
                        name: c.info?.name ?? '—',
                        count: c.count,
                        x: ((e.clientX - rect.left) / rect.width) * VIEW_W,
                        y: ((e.clientY - rect.top) / rect.height) * VIEW_H,
                      });
                    }}
                  />
                );
              })}
            </g>

            {originCoords && (
              <g transform={`translate(${originCoords[0]} ${originCoords[1]})`}>
                <circle r={28} fill="url(#originPulse)" className={styles.originPulse} />
                <circle r={3.5} className={styles.originDot} />
              </g>
            )}

            {hovered && (() => {
              const w = Math.max(120, hovered.name.length * 7 + 70);
              return (
                <g
                  transform={`translate(${hovered.x + 12} ${hovered.y - 18})`}
                  className={styles.tooltipGroup}
                  pointerEvents="none"
                >
                  <rect
                    x={0}
                    y={-14}
                    rx={6}
                    ry={6}
                    width={w}
                    height={32}
                    className={styles.tooltipBg}
                  />
                  <text x={10} y={5} className={styles.tooltipName}>
                    {hovered.name}
                  </text>
                  <text
                    x={w - 10}
                    y={5}
                    textAnchor="end"
                    className={styles.tooltipCount}
                  >
                    {hovered.count > 0 ? formatNumber(hovered.count) : '—'}
                  </text>
                </g>
              );
            })()}
          </svg>
        </div>

        <div className={styles.legend}>
          <span className={styles.legendLabel}>Visits</span>
          <div className={styles.legendBar} />
          <span className={styles.legendRange}>1</span>
          <span className={styles.legendRange}>{formatNumber(maxCount)}</span>
        </div>

        <div className={styles.rankedWrap}>
          <div className={styles.rankedHeader}>
            <span>Top countries</span>
            <span className={styles.rankedHeaderMuted}>{rangeLabel ?? 'last 30 days'}</span>
          </div>
          <ol className={styles.rankedList}>
            {ranked.slice(0, 12).map((row, i) => {
              const name = ALPHA2_TO_NAME[row.alpha2] ?? row.alpha2;
              const width = (row.count / maxCount) * 100;
              return (
                <li key={row.alpha2} className={styles.rankedRow}>
                  <span className={styles.rankedIndex}>{String(i + 1).padStart(2, '0')}</span>
                  <span className={styles.rankedName}>{name}</span>
                  <span className={styles.rankedBarOuter}>
                    <span className={styles.rankedBar} style={{ width: `${width}%` }} />
                  </span>
                  <span className={styles.rankedCount}>{formatNumber(row.count)}</span>
                </li>
              );
            })}
          </ol>
        </div>

        <div className={styles.footnote}>
          {source === 'ga4'
            ? 'Live · Google Analytics 4 · aggregated, country-level only. No personal data.'
            : 'Sample data — not live. Aggregated, country-level only.'}
        </div>
      </div>
    </section>
  );
}
