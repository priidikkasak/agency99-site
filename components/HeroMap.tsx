'use client';

import { useMemo, useState } from 'react';
import { geoNaturalEarth1, geoPath, geoCentroid } from 'd3-geo';
import { feature } from 'topojson-client';
import type { Feature, FeatureCollection, Geometry } from 'geojson';
import worldAtlas from 'world-atlas/countries-110m.json';
import { lookupCountry } from '@/lib/map/countries';
import styles from './HeroMap.module.css';

type CountryFeature = Feature<Geometry, { name?: string }> & { id: string | number };

const VIEW_W = 1000;
const VIEW_H = 500;
const ORIGIN_ALPHA2 = 'EE';

// Strategic sourcing destinations
const HIGHLIGHT_ALPHA2 = new Set(['CN', 'AE', 'US', 'DE', 'GB', 'VN', 'SG', 'IN']);

export function HeroMap() {
  const { paths, originCoords, hotspots } = useMemo(() => {
    const topo = worldAtlas as unknown as Parameters<typeof feature>[0];
    const fc = feature(topo, 'countries') as unknown as FeatureCollection<
      Geometry,
      { name?: string }
    >;

    const projection = geoNaturalEarth1().fitSize([VIEW_W, VIEW_H], fc);
    const path = geoPath(projection);

    const pathStrings: Array<{ id: string; d: string; alpha2: string | null }> = [];
    const hs: Array<{ alpha2: string; x: number; y: number }> = [];
    let origin: [number, number] | null = null;

    for (const f of fc.features as CountryFeature[]) {
      const d = path(f) ?? '';
      if (!d) continue;
      const info = lookupCountry(f.id);
      const alpha2 = info?.alpha2 ?? null;
      pathStrings.push({ id: String(f.id), d, alpha2 });

      if (alpha2 === ORIGIN_ALPHA2) {
        const c = geoCentroid(f);
        const p = projection(c as [number, number]);
        if (p) origin = p;
      } else if (alpha2 && HIGHLIGHT_ALPHA2.has(alpha2)) {
        const c = geoCentroid(f);
        const p = projection(c as [number, number]);
        if (p) hs.push({ alpha2, x: p[0], y: p[1] });
      }
    }

    return { paths: pathStrings, originCoords: origin, hotspots: hs };
  }, []);

  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className={styles.wrap} aria-hidden="true">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className={styles.map}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="heroOriginPulse" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#B8B0FF" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#8B7BFF" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#8B7BFF" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="heroHotspot" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#B8B0FF" stopOpacity="0.55" />
            <stop offset="70%" stopColor="#8B7BFF" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#8B7BFF" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g>
          {paths.map((c) => {
            const isHovered = hovered === c.id;
            return (
              <path
                key={c.id}
                d={c.d}
                className={`${styles.country} ${isHovered ? styles.countryHovered : ''}`}
                onMouseEnter={() => setHovered(c.id)}
                onMouseLeave={() => setHovered(null)}
              />
            );
          })}
        </g>

        {/* Destination hotspots — subtle pulsing dots */}
        {hotspots.map((h, i) => (
          <g key={h.alpha2} transform={`translate(${h.x} ${h.y})`}>
            <circle
              r={18}
              fill="url(#heroHotspot)"
              className={styles.hotspotPulse}
              style={{ animationDelay: `${i * 0.4}s` }}
            />
            <circle r={2.5} className={styles.hotspotDot} />
          </g>
        ))}

        {/* Origin — Estonia — brighter pulse */}
        {originCoords && (
          <g transform={`translate(${originCoords[0]} ${originCoords[1]})`}>
            <circle r={28} fill="url(#heroOriginPulse)" className={styles.originPulse} />
            <circle r={3.5} className={styles.originDot} />
          </g>
        )}
      </svg>
    </div>
  );
}
