'use client';
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useGlobalContext } from '@/app/context/globalContext';

// ฟังก์ชัน FlyToActiveCity
function FlyToActiveCity({ activeCityCoords }) {
  const map = useMap();

  useEffect(() => {
    if (activeCityCoords) {
      const zoomLev = 13;
      const flyToOptions = {
        duration: 1.5,
      };

      map.flyTo([activeCityCoords.lat, activeCityCoords.lon], zoomLev, flyToOptions);
    }
  }, [activeCityCoords, map]);

  return null;
}

function Mapbox() {
  const { forecast } = useGlobalContext();
  const [ activeCityCoords, setActiveCityCoords ] = useState({ lat: 40.7128, lon: -74.006 });

  useEffect(() => {
    // เช็คว่า forecast มีค่าพิกัดหรือยัง
    if (forecast && forecast.coord) {
      setActiveCityCoords({
        lat: forecast.coord.lat,
        lon: forecast.coord.lon,
      });
    }
  }, [forecast]);

  return (
    <div className="flex flex-col items-center">
      <MapContainer
        center={[activeCityCoords.lat, activeCityCoords.lon]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: '400px', width: '600px' }}
        className="border rounded-lg"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* เรียกใช้ FlyToActiveCity */}
        <FlyToActiveCity activeCityCoords={activeCityCoords} />
      </MapContainer>
    </div>
  );
}

export default Mapbox;