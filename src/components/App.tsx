import React, { useState } from 'react';
import { Country } from '../types/Country';
import '../styles/App.css';

// Static country data for display
const countries = [
  { country: 'USA', population: 331002651, deaths: 600000, recovered: 2500000, lat: 37.0902, lng: -95.7129 },
  { country: 'India', population: 1380004385, deaths: 400000, recovered: 3000000, lat: 20.5937, lng: 78.9629 },
  { country: 'China', population: 1439323776, deaths: 5000, recovered: 85000, lat: 35.8617, lng: 104.1954 },
];

// Sorting logic for the table
const sortData = (
  data: Country[],
  sortConfig: { key: keyof Country | null; direction: 'asc' | 'desc' | null }
): Country[] => {
  if (!sortConfig.key || !sortConfig.direction) {
    return data; // No sorting, return original order
  }
  return [...data].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue < bValue) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });
};

const App: React.FC = () => {
  const [sortConfig, setSortConfig] = useState<{ key: keyof Country | null; direction: 'asc' | 'desc' | null }>({
    key: null,
    direction: null,
  });

  const sortedData = sortData(countries, sortConfig); // Use sorted data for rendering

  const requestSort = (key: keyof Country) => {
    setSortConfig((prevConfig) => {
      if (prevConfig.key === key) {
        const nextDirection = prevConfig.direction === 'asc' ? 'desc' : prevConfig.direction === 'desc' ? null : 'asc';
        return { key: nextDirection ? key : null, direction: nextDirection };
      }
      return { key, direction: 'asc' };
    });
  };

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => requestSort('country')}>
            Country {sortConfig.key === 'country' ? (sortConfig.direction === 'asc' ? '⬆' : sortConfig.direction === 'desc' ? '⬇' : '') : ''}
          </th>
          <th onClick={() => requestSort('population')}>
            Population {sortConfig.key === 'population' ? (sortConfig.direction === 'asc' ? '⬆' : sortConfig.direction === 'desc' ? '⬇' : '') : ''}
          </th>
          <th onClick={() => requestSort('deaths')}>
            Deaths {sortConfig.key === 'deaths' ? (sortConfig.direction === 'asc' ? '⬆' : sortConfig.direction === 'desc' ? '⬇' : '') : ''}
          </th>
          <th onClick={() => requestSort('recovered')}>
            Recovered {sortConfig.key === 'recovered' ? (sortConfig.direction === 'asc' ? '⬆' : sortConfig.direction === 'desc' ? '⬇' : '') : ''}
          </th>
          <th onClick={() => requestSort('lat')}>
            Latitude {sortConfig.key === 'lat' ? (sortConfig.direction === 'asc' ? '⬆' : sortConfig.direction === 'desc' ? '⬇' : '') : ''}
          </th>
          <th onClick={() => requestSort('lng')}>
            Longitude {sortConfig.key === 'lng' ? (sortConfig.direction === 'asc' ? '⬆' : sortConfig.direction === 'desc' ? '⬇' : '') : ''}
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((country, index) => (
          <tr key={index}>
            <td>{country.country}</td>
            <td>{country.population}</td>
            <td>{country.deaths}</td>
            <td>{country.recovered}</td>
            <td>{country.lat}</td>
            <td>{country.lng}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default App;
