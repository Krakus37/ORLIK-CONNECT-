import { useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';

const mockOrliki = [
  {
    id: 1,
    name: 'Orlik Skierniewice',
    location: 'ul. Armii Krajowej 28',
    lat: 51.9607,
    lng: 20.1583,
  },
  {
    id: 2,
    name: 'Orlik Żyrardów',
    location: 'ul. Mireckiego 56',
    lat: 51.9487,
    lng: 20.4312,
  },
];

export default function App() {
  const [selectedOrlik, setSelectedOrlik] = useState(null);
  const [search, setSearch] = useState('');

  const filtered = mockOrliki.filter((orlik) =>
    orlik.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 grid gap-4">
      <h1 className="text-2xl font-bold">OrlikConnect</h1>
      <input
        className="p-2 rounded border border-gray-300"
        placeholder="Wyszukaj Orlika..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="h-[400px]">
        <MapContainer center={[51.96, 20.16]} zoom={10} className="h-full w-full rounded-2xl shadow">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap"
          />
          {filtered.map((orlik) => (
            <Marker
              key={orlik.id}
              position={[orlik.lat, orlik.lng]}
              eventHandlers={{
                click: () => setSelectedOrlik(orlik),
              }}
            />
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
