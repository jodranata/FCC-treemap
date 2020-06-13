import React, { useEffect, useState } from 'react';
import ChartTree from './ChartTree';
import './App.css';

const url = `https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json`;

const App = () => {
  const [chartData, setChartData] = useState({});
  const isFetched = Object.keys(chartData).length > 0;

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setChartData(data);
      });
  }, []);
  return (
    <div className="container">
      <h1>Movie Sales</h1>
      <p>List of 100 highest-grossing movies</p>
      {isFetched && <ChartTree chartData={chartData} />}
    </div>
  );
};

export default App;
