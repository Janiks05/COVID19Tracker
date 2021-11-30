import React from "react";
import "./App.css";

function InfoBox({ title, cases, total }) {
  return (
    <div className="infoBox">
      <div>
        <h2 className="infoBox__title">{title}</h2>
        <h2 className="infoBox__cases">Cases: {cases}</h2>
        <h2 className="infoBox__total">Total: {total}</h2>
      </div>
    </div>
  );
}

export default InfoBox;
