import React from 'react';
import '../styles/App.css';

// Static country data for display
const countries = [
  { country: 'USA', population: 331002651, deaths: 600000, recovered: 2500000, lat: 37.0902, lng: -95.7129 },
  { country: 'India', population: 1380004385, deaths: 400000, recovered: 3000000, lat: 20.5937, lng: 78.9629 },
  { country: 'China', population: 1439323776, deaths: 5000, recovered: 85000, lat: 35.8617, lng: 104.1954 },
];

const App: React.FC = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>Country</th>
          <th>Population</th>
          <th>Deaths</th>
          <th>Recovered</th>
          <th>Lat</th>
          <th>Lng</th>
        </tr>
      </thead>
      <tbody>
        {countries.map((country, index) => (
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
