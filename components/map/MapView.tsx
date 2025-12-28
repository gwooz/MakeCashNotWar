"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl, { Map as MapLibreMap, LngLatLike } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { buildStyle } from "@/lib/mapStyles";
import { LayerControls } from "./LayerControls";
import { Tooltip } from "./Tooltip";

const defaultCenter: LngLatLike = [10, 20];

export type MapMode = "palette" | "flag" | "heatmap";

interface MapViewProps {
  scores: Record<string, number>;
}

export function MapView({ scores }: MapViewProps) {
  const mapRef = useRef<MapLibreMap | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mode, setMode] = useState<MapMode>("palette");
  const [hoverInfo, setHoverInfo] = useState<{ iso: string; name: string; score?: number; x: number; y: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    let style;
    try {
      style = buildStyle(mode, scores);
      setError(null);
    } catch (err: any) {
      setError(err?.message || "Map style failed");
      return;
    }

    const map = new maplibregl.Map({
      container: containerRef.current,
      style,
      center: defaultCenter,
      zoom: 2,
      hash: false
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");

    map.on("mousemove", "country-fill", (e) => {
      const feature = e.features?.[0];
      const iso = feature?.properties?.iso_a3 as string;
      const name = feature?.properties?.name_en || feature?.properties?.name || iso;
      const score = scores[iso];
      if (!feature || !iso) {
        setHoverInfo(null);
        return;
      }
      setHoverInfo({
        iso,
        name,
        score,
        x: e.point.x,
        y: e.point.y
      });
    });

    map.on("mouseleave", "country-fill", () => setHoverInfo(null));

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [mode, scores]);

  useEffect(() => {
    if (!mapRef.current) return;
    try {
      const style = buildStyle(mode, scores);
      mapRef.current.setStyle(style);
      setError(null);
    } catch (err: any) {
      setError(err?.message || "Map style failed");
    }
  }, [mode, scores]);

  return (
    <div className="relative h-[80vh] w-full rounded-2xl overflow-hidden card">
      <LayerControls mode={mode} onChange={setMode} />
      <div ref={containerRef} className="h-full w-full" />
      {error ? (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/80 text-sm text-rose-200">
          Map konnte nicht geladen werden: {error}
        </div>
      ) : null}
      {hoverInfo ? <Tooltip info={hoverInfo} /> : null}
    </div>
  );
}
