import { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import { Station } from "../../types";
import { StationMarker } from "./StationMarker";

const defaultCenter: [number, number] = [42.45, 59.62];

export function StationMapView({ stations, selectedStationId }: { stations: Station[]; selectedStationId?: string }) {
  const center = useMemo<[number, number]>(() => {
    if (!stations.length) return defaultCenter;
    const lat = stations.reduce((sum, station) => sum + station.latitude, 0) / stations.length;
    const lng = stations.reduce((sum, station) => sum + station.longitude, 0) / stations.length;
    return [lat, lng];
  }, [stations]);

  return (
    <div className="h-[620px] overflow-hidden rounded-lg border border-slate-200 shadow-soft dark:border-slate-800">
      <MapContainer center={center} zoom={8} scrollWheelZoom zoomControl className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapAutoFocus stations={stations} selectedStationId={selectedStationId} />
        {stations.map((station) => (
          <StationMarker key={station.id} station={station} />
        ))}
      </MapContainer>
    </div>
  );
}

function MapAutoFocus({ stations, selectedStationId }: { stations: Station[]; selectedStationId?: string }) {
  const map = useMap();

  useEffect(() => {
    if (!stations.length) return;
    const bounds = L.latLngBounds(stations.map((station) => [station.latitude, station.longitude]));
    map.fitBounds(bounds.pad(0.2), { maxZoom: 10 });
  }, [map, stations]);

  useEffect(() => {
    if (!selectedStationId) return;
    const station = stations.find((item) => item.id === selectedStationId);
    if (!station) return;
    map.flyTo([station.latitude, station.longitude], 12, { duration: 0.8 });
  }, [map, selectedStationId, stations]);

  return null;
}

