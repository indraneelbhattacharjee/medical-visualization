import React, { useState, useEffect } from 'react';
import { VegaLite } from 'react-vega';
import * as d3 from 'd3';
import './Chart.css';

const Dashboard = () => {
  const [chartType, setChartType] = useState('scatter');
  const [data, setData] = useState([]);

  useEffect(() => {
    // Load CSV data from the public directory
    d3.csv('/arcos-ca-los-angeles-06037-distributor.csv').then(loadedData => {
      // Parse data into appropriate format if necessary
      loadedData.forEach(d => {
        d.total_dosage_unit = +d.total_dosage_unit; // Convert to number
        d.total_mme = +d.total_mme; // Convert to number
      });
      setData(loadedData);
    }).catch(error => console.error('Error loading the CSV data:', error));
  }, []);

  const scatterSpec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "description": "A scatter plot showing total dosage units vs total MME.",
    "data": { "values": data },
    "mark": "point",
    "encoding": {
      "x": { "field": "total_dosage_unit", "type": "quantitative" },
      "y": { "field": "total_mme", "type": "quantitative" },
      "tooltip": [{ "field": "Reporter_family", "type": "nominal" }]
    }
  };

  const barSpec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "description": "A bar chart showing total dosage units per reporter family.",
    "data": { "values": data },
    "mark": "bar",
    "encoding": {
      "x": { "field": "Reporter_family", "type": "nominal", "sort": "-y" },
      "y": { "field": "total_dosage_unit", "type": "quantitative" },
      "tooltip": [{ "field": "Reporter_family", "type": "nominal" }, { "field": "total_dosage_unit", "type": "quantitative" }]
    }
  };

  const pieSpec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "description": "A pie chart showing the distribution of total dosage units by reporter family.",
    "data": { "values": data },
    "mark": { "type": "arc", "tooltip": true },
    "encoding": {
      "theta": { "field": "total_dosage_unit", "type": "quantitative" },
      "color": { "field": "Reporter_family", "type": "nominal" },
      "tooltip": [{ "field": "Reporter_family", "type": "nominal" }, { "field": "total_dosage_unit", "type": "quantitative" }]
    }
  };

  const specs = {
    scatter: scatterSpec,
    bar: barSpec,
    pie: pieSpec
  };

  return (
    <div className="dashboard">
      <h1>Opioid Distribution in Los Angeles</h1>
      <div className="controls">
        <label>Chart Type:</label>
        <select onChange={(e) => setChartType(e.target.value)} value={chartType}>
          <option value="scatter">Scatter Chart</option>
          <option value="bar">Bar Chart</option>
          <option value="pie">Pie Chart</option>
        </select>
      </div>
      <div className="chart-container">
        {data.length > 0 ? (
          <VegaLite spec={specs[chartType]} />
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
