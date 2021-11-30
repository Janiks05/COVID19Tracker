import React from "react";
import './Map.css'

function Map() {
  return <div>
    <iframe className="map" title="map" src="https://ourworldindata.org/grapher/total-cases-covid-19?tab=map" ></iframe>
  </div>;
}

export default Map;
