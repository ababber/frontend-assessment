import React, { useState } from 'react';
import { Country } from '../types/Country';
import countries from '../constants/countries'
import '../styles/App.css';

// Sorting logic for the table
const sortData = (
  data: Country[],
  sortConfig: { key: keyof Country | null; direction: 'asc' | 'desc' | null }
): Country[] => {
  if (!sortConfig.key || !sortConfig.direction) {
    return data; // No sorting, return original order
  }

  return [...data].sort((a, b) => {
    const key = sortConfig.key as keyof Country; // Ensure key is not null

    const aValue = a[key];
    const bValue = b[key];

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

  const sortedData = sortData(countries, sortConfig);

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
