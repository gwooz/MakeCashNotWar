import { ExpressionSpecification, StyleSpecification } from "maplibre-gl";
import { palette } from "./palettes";

// Use MapTiler countries polygons tileset (https://api.maptiler.com/tiles/countries/tiles.json)
// Layer id is "country". Allow override via env if needed.
const sourceLayer = process.env.NEXT_PUBLIC_MAPTILER_COUNTRY_LAYER || "country";

const mapTilerKey = process.env.NEXT_PUBLIC_MAPTILER_KEY || process.env.MAPTILER_KEY;

function categoricalFill(scores: Record<string, number>): ExpressionSpecification {
  const entries: (string | number)[] = [];
  const isoList = Object.keys(scores);
  isoList.forEach((iso, idx) => {
    const color = palette[idx % palette.length];
    entries.push(iso, color);
  });
  return ["match", ["get", "iso_a3"], ...entries, "#334155"] as unknown as ExpressionSpecification;
}

function heatFill(scores: Record<string, number>): ExpressionSpecification {
  return [
    "interpolate",
    ["linear"],
    ["coalesce", ["get", "score"], 0],
    0,
    "#0ea5e9",
    5,
    "#22d3ee",
    10,
    "#a855f7",
    20,
    "#f472b6"
  ];
}

export function buildStyle(mode: "palette" | "flag" | "heatmap", scores: Record<string, number>): StyleSpecification {
  if (!mapTilerKey) {
    throw new Error("MAPTILER_KEY missing");
  }

  const scoreExpr: ExpressionSpecification = [
    "to-number",
    ["get", "score"],
    0
  ];

  const style: StyleSpecification = {
    version: 8,
    sources: {
      countries: {
        type: "vector",
        url: `https://api.maptiler.com/tiles/countries/tiles.json?key=${mapTilerKey}`
      }
    },
    // Sprite optional; remove to avoid 404s. Uncomment if you host your own sprite.
    // sprite: `https://api.maptiler.com/maps/streets-v2/sprite@2x?key=${mapTilerKey}`,
    glyphs: `https://api.maptiler.com/fonts/{fontstack}/{range}.pbf?key=${mapTilerKey}`,
    layers: [
      {
        id: "background",
        type: "background",
        paint: { "background-color": "#0b1021" }
      },
      {
        id: "country-fill",
        type: "fill",
        source: "countries",
        "source-layer": sourceLayer,
        paint: {
          "fill-color": mode === "heatmap" ? heatFill(scores) : categoricalFill(scores),
          "fill-opacity": 0.9
        }
      },
      {
        id: "country-outline",
        type: "line",
        source: "countries",
        "source-layer": sourceLayer,
        paint: {
          "line-color": "#0ea5e9",
          "line-width": 0.8,
          "line-opacity": 0.6
        }
      }
    ]
  };

  if (mode === "flag") {
    style.layers[1].paint = {
      "fill-pattern": ["image", ["get", "iso_a3"]],
      "fill-opacity": 0.95
    };
  }

  // inject scores as feature-state alternative; here we just attach to style expression via promoteId
  style.layers[1].paint = {
    ...style.layers[1].paint,
    "fill-opacity": 0.92
  } as any;

  return style;
}
