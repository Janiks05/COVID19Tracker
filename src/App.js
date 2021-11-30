import "./App.css";
import { MenuItem, FormControl, Select } from "@material-ui/core";
import { useState, useEffect } from "react";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import { sortData } from "./util";

//wer das liest ist doof

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [worldwideData, setWorldwideData] = useState({});

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setWorldwideData(data);
      });
  }, []);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    //the code inside here will run once
    //when the component loads and not again
    //async -> send request and wait for response
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);
  //https://disease.sh/v3/covid-19/countries

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
    //https://disease.sh/v3/covid-19/countries
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>Covid 19 Tracker</h1>

          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem value="Worldwide" className="app__menuitem">
                Worldwide
              </MenuItem>
              <MenuItem value="Germany" className="app__menuitem">
                Germany
              </MenuItem>
              {countries.map((country) => (
                <MenuItem className="menuitem" value={country.value}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox
            className="infobox"
            title="COVID CASES"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          ></InfoBox>
          <InfoBox
            className="infobox"
            title="RECOVERD"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          ></InfoBox>
          <InfoBox
            className="infobox"
            title="DEATHS"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          ></InfoBox>
        </div>
        <Map />
      </div>
      <div className="app__right">
        <div className="cardcontent">
          <h3>Live cases by Country today</h3>
          <Table countries={tableData}></Table>
        </div>
        <div className="worldwide">
          <h1>Worldwide data</h1>
          <h2>
            New cases: <h2 className="num">{worldwideData.todayCases}</h2>
          </h2>
          <h2>
            Recovered today:{" "}
            <h2 className="num">{worldwideData.todayRecovered}</h2>
          </h2>
          <h2>
            Deaths caused by <br /> COVID-19 today:
            <h2 className="num">{worldwideData.todayDeaths}</h2>{" "}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default App;
