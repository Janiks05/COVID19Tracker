import React from "react";
import "./Table.css";

function Table({ countries }) {
  return (
    <div className="table">
      {countries.map(({ country, todayCases }) => (
        <tr>
          <td>{country}</td>
          <td>
            <strong>{todayCases}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
