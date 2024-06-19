import React, { useState, useEffect } from 'react';
import { VegaLite } from 'react-vega';
import * as d3 from 'd3';
import './Chart.css';

const Dashboard = () => {
  const [chartType, setChartType] = useState('scatter');

  const data = [
    { "Reporter_family": "AmerisourceBergen Drug", "total_dosage_unit": 685262870, "total_mme": 5978893756.384775, "total_records": 1093350 },
    { "Reporter_family": "McKesson Corporation", "total_dosage_unit": 538314600, "total_mme": 5492723802.935328, "total_records": 1363764 },
    { "Reporter_family": "Cardinal Health", "total_dosage_unit": 250756855, "total_mme": 3172409146.927347, "total_records": 637898 },
    { "Reporter_family": "CVS", "total_dosage_unit": 236040800, "total_mme": 1014562011.5999937, "total_records": 337603 },
    { "Reporter_family": "Kaiser Permanente", "total_dosage_unit": 198527450, "total_mme": 661112513.8100107, "total_records": 136855 },
    { "Reporter_family": "H. D. Smith", "total_dosage_unit": 165608210, "total_mme": 1910598761.5696719, "total_records": 354418 },
    { "Reporter_family": "Walgreen Co", "total_dosage_unit": 131465310, "total_mme": 955042805.4898849, "total_records": 296182 },
    { "Reporter_family": "Thrifty Payless Inc", "total_dosage_unit": 11246240, "total_mme": 476652276.0300036, "total_records": 194331 },
    { "Reporter_family": "Valley Wholesale Drug Co", "total_dosage_unit": 75272360, "total_mme": 704291474.2452638, "total_records": 150476 },
    { "Reporter_family": "Wal-Mart", "total_dosage_unit": 41514500, "total_mme": 240026303.38477382, "total_records": 152790 },
    { "Reporter_family": "CVS Pharmacy Inc", "total_dosage_unit": 16050410, "total_mme": 61124697.639829, "total_records": 20457 },
    { "Reporter_family": "Smith Drug Company", "total_dosage_unit": 1450000, "total_mme": 10367659.413322, "total_records": 2128 },
    { "Reporter_family": "Kroger", "total_dosage_unit": 10233600, "total_mme": 48242401.5176695, "total_records": 12283 },
    { "Reporter_family": "Rite Aid", "total_dosage_unit": 93670450, "total_mme": 330102895.632566, "total_records": 69928 },
    { "Reporter_family": "H.E. Butt", "total_dosage_unit": 15625650, "total_mme": 75520516.3824356, "total_records": 19488 },
    { "Reporter_family": "Dierbergs Markets", "total_dosage_unit": 2556400, "total_mme": 12789185.1689345, "total_records": 2952 },
    { "Reporter_family": "Meijer", "total_dosage_unit": 10023500, "total_mme": 57683117.474637, "total_records": 12076 },
    { "Reporter_family": "Albertsons", "total_dosage_unit": 30570640, "total_mme": 157371117.5096, "total_records": 29392 },
    { "Reporter_family": "Sam's East", "total_dosage_unit": 5836570, "total_mme": 31920819.9950082, "total_records": 6373 },
    { "Reporter_family": "United Supermarkets", "total_dosage_unit": 2935300, "total_mme": 14880552.0537545, "total_records": 2926 },
    { "Reporter_family": "Safeway", "total_dosage_unit": 22177620, "total_mme": 123707379.681872, "total_records": 20999 },
    { "Reporter_family": "Publix", "total_dosage_unit": 24707890, "total_mme": 123728195.141562, "total_records": 26020 },
    { "Reporter_family": "CVS Pharmacy LLC", "total_dosage_unit": 34755210, "total_mme": 107674211.436986, "total_records": 26796 },
    { "Reporter_family": "Fred's Pharmacy", "total_dosage_unit": 3266480, "total_mme": 18962385.121028, "total_records": 3368 },
    { "Reporter_family": "Giant Eagle", "total_dosage_unit": 19322360, "total_mme": 90220150.2698634, "total_records": 22436 },
    { "Reporter_family": "Cameron Drugs", "total_dosage_unit": 349200, "total_mme": 2082292.26499365, "total_records": 573 },
    { "Reporter_family": "Costco", "total_dosage_unit": 3321600, "total_mme": 13815118.116621, "total_records": 3163 },
    { "Reporter_family": "Whitesell & Co.", "total_dosage_unit": 40850, "total_mme": 289228.5255745, "total_records": 64 },
    { "Reporter_family": "Bergdoll Drug", "total_dosage_unit": 100000, "total_mme": 512125.48255, "total_records": 156 },
    { "Reporter_family": "GENCO I", "total_dosage_unit": 0, "total_mme": 0, "total_records": 4 }
  ];

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
