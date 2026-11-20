/**
 * Generates clearly-labelled TEMPORARY placeholder artwork for every game.
 * Output: public/games/<slug>/cover.svg (16:10) and thumb.svg (4:3).
 * Replace these files with final artwork — keep the same names, or update the registry.
 *
 *   node scripts/generate-placeholder-art.mjs
 */
import { mkdirSync, writeFileSync } from "node:fs";

const INK = "#182943", PAPER = "#F4F1E9", BUTTER = "#F7E7A0", SAGE = "#A8BFAE", CORAL = "#EE775E";
const st = (w = 8) => `stroke="${INK}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"`;
const S = st();

/** Each motif is drawn on a 1600×1000 canvas, centred around x=800. */
const motifs = {
  "tiny-living": { id: "ED-001", bg: BUTTER, fg: INK, draw: () => `
    <path d="M520 840V420L800 220L1080 420V840Z" fill="${PAPER}" ${S}/>
    <circle cx="800" cy="420" r="70" fill="${SAGE}" ${S}/>
    <path d="M800 350V490M730 420H870" ${S}/>
    <path d="M520 700H1080" ${S}/>
    <rect x="600" y="560" width="120" height="140" fill="${CORAL}" ${S}/>
    <path d="M940 560V700M900 560H980L960 520H920Z" fill="${BUTTER}" ${S}/>
    <path d="M660 560C640 500 680 480 660 440M660 560C700 510 720 520 730 470" fill="none" ${S}/>
    <path d="M420 840H1180" ${S}/>` },
  "cafe-after-hours": { id: "ED-002", bg: INK, fg: PAPER, draw: () => `
    <path d="M1100 200A110 110 0 1 0 1180 380A90 90 0 1 1 1100 200Z" fill="${BUTTER}"/>
    <circle cx="420" cy="220" r="6" fill="${BUTTER}"/><circle cx="560" cy="150" r="4" fill="${BUTTER}"/><circle cx="1320" cy="520" r="5" fill="${BUTTER}"/>
    <path d="M580 560H960V700A140 140 0 0 1 820 840H720A140 140 0 0 1 580 700Z" fill="${PAPER}" stroke="${PAPER}" stroke-width="8"/>
    <path d="M960 600H1010A50 50 0 0 1 1010 700H960" fill="none" stroke="${PAPER}" stroke-width="16"/>
    <path d="M700 500C670 450 730 420 700 360M800 500C770 450 830 420 800 340M900 500C870 450 930 420 900 360" fill="none" stroke="${CORAL}" stroke-width="10" stroke-linecap="round"/>
    <path d="M500 860H1100" stroke="${PAPER}" stroke-width="8" stroke-linecap="round"/>` },
  "main-character-energy": { id: "ED-003", bg: "#F3C6B5", fg: INK, draw: () => `
    <path d="M800 120L520 860H1080Z" fill="${BUTTER}" opacity=".9"/>
    <ellipse cx="800" cy="860" rx="280" ry="40" fill="${PAPER}" ${S}/>
    <circle cx="800" cy="560" r="56" fill="${INK}"/>
    <path d="M800 620V780M800 660L730 720M800 660L870 720M800 780L750 850M800 780L850 850" ${st(14)}/>
    <path d="M800 220L815 280L875 295L815 310L800 370L785 310L725 295L785 280Z" fill="${CORAL}" ${S}/>` },
  "pocket-pals": { id: "ED-004", bg: SAGE, fg: INK, draw: () => `
    <circle cx="680" cy="470" r="120" fill="${BUTTER}" ${S}/>
    <circle cx="930" cy="440" r="100" fill="${CORAL}" ${S}/>
    <circle cx="645" cy="450" r="12" fill="${INK}"/><circle cx="715" cy="450" r="12" fill="${INK}"/>
    <circle cx="900" cy="425" r="11" fill="${INK}"/><circle cx="960" cy="425" r="11" fill="${INK}"/>
    <path d="M500 520H1120V760A120 120 0 0 1 1000 880H620A120 120 0 0 1 500 760Z" fill="${PAPER}" ${S}/>
    <path d="M500 520L810 640L1120 520" fill="none" ${S}/>
    <path d="M560 560V820M1060 560V820" ${S} stroke-dasharray="4 22"/>` },
  "little-somewhere": { id: "ED-005", bg: "#C9D7E6", fg: INK, draw: () => `
    <path d="M260 700C460 600 560 760 760 660S1100 560 1340 640" fill="none" stroke="${PAPER}" stroke-width="6"/>
    <path d="M300 820C500 720 640 860 840 780S1160 700 1340 760" fill="none" stroke="${PAPER}" stroke-width="6"/>
    <path d="M320 560C520 470 600 600 800 520S1120 420 1320 500" fill="none" stroke="${PAPER}" stroke-width="6"/>
    <path d="M380 860C480 760 560 700 660 700S820 620 880 520S1000 360 1060 320" fill="none" ${st(10)} stroke-dasharray="2 34"/>
    <path d="M1060 320V140" ${S}/><path d="M1064 144L1180 180L1064 220Z" fill="${CORAL}" ${S}/>
    <circle cx="380" cy="860" r="22" fill="${BUTTER}" ${S}/>` },
  "lost-and-found-island": { id: "ED-006", bg: "#E9DCBC", fg: INK, draw: () => `
    <circle cx="1100" cy="300" r="130" fill="${CORAL}"/>
    <path d="M440 720C520 560 1000 560 1120 720Z" fill="${BUTTER}" ${S}/>
    <path d="M760 640C770 520 740 440 700 380" fill="none" ${st(14)}/>
    <path d="M700 380C620 360 580 400 560 440M700 380C760 330 830 340 870 380M700 380C680 320 640 290 600 290M700 380C740 340 760 300 770 260" fill="none" stroke="${SAGE}" stroke-width="22" stroke-linecap="round"/>
    <path d="M240 760C320 730 400 790 480 760S640 730 720 760S880 790 960 760S1120 730 1200 760S1300 780 1360 760" fill="none" ${S}/>
    <path d="M320 860C400 830 480 890 560 860S720 830 800 860S960 890 1040 860S1200 830 1280 860" fill="none" ${S}/>
    <g transform="rotate(-24 1240 820)"><rect x="1190" y="800" width="110" height="44" rx="20" fill="${PAPER}" ${S}/><rect x="1300" y="810" width="30" height="24" fill="${CORAL}" ${S}/></g>` },
};

function svg(slug, { id, bg, fg, draw }, [vx, vy, vw, vh]) {
  const label = `PLACEHOLDER ARTWORK · ${id} · NOT FINAL`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vx} ${vy} ${vw} ${vh}" width="${vw}" height="${vh}" role="img" aria-label="Placeholder artwork for ${slug}">
  <rect x="${vx}" y="${vy}" width="${vw}" height="${vh}" fill="${bg}"/>
  <g opacity=".14" fill="${fg}">${Array.from({ length: Math.ceil(vw / 80) + 1 }, (_, i) =>
    Array.from({ length: 13 }, (_, j) => `<circle cx="${vx + i * 80}" cy="${j * 80}" r="2"/>`).join("")).join("")}</g>
  ${draw()}
  <text x="${vx + 48}" y="${vy + vh - 48}" font-family="IBM Plex Mono, ui-monospace, monospace" font-size="22" letter-spacing="3" fill="${fg}">${label}</text>
</svg>
`;
}

for (const [slug, m] of Object.entries(motifs)) {
  const dir = new URL(`../public/games/${slug}/`, import.meta.url);
  mkdirSync(dir, { recursive: true });
  writeFileSync(new URL("cover.svg", dir), svg(slug, m, [0, 0, 1600, 1000]));
  writeFileSync(new URL("thumb.svg", dir), svg(slug, m, [134, 0, 1333, 1000]));
}
console.log(`Generated placeholder art for ${Object.keys(motifs).length} games.`);
