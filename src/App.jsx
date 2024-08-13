import React, { useState } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");
  const [gold, setGold] = useState("");
  const [silver, setSilver] = useState("");
  const [bronze, setBronze] = useState("");

  const handleInputChange = (e) => {
    setCountry(e.target.value);
  };
  const handleDeleteCountry = (idx) => {
    setCountries((prevState) => prevState.filter((_, index) => index !== idx));
  };

  const handleUpdateCountry = (event) => {
    event.preventDefault();
    const selectedCountryName = country;

    const targetCountry = countries.find(
      (나라) => 나라.name == selectedCountryName
    );

    const newCountries = countries.map(function (updateCountry) {
      if (updateCountry.name === targetCountry.name) {
        return {
          name: updateCountry.name,
          gold: gold,
          silver: silver,
          bronze: bronze,
        };
      } else {
        return updateCountry;
      }
    });

    setCountries(newCountries);

    setCountry("");
    setGold("");
    setSilver("");
    setBronze("");
  };

  const handleMedalChange = (e, type) => {
    const value = e.target.value;
    if (type === "gold") setGold(value);
    if (type === "silver") setSilver(value);
    if (type === "bronze") setBronze(value);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (country && gold && silver && bronze) {
      setCountries((prevState) => [
        ...prevState,
        { name: country, gold, silver, bronze },
      ]);
      setCountry("");
      setGold("");
      setSilver("");
      setBronze("");
    }
  };

  return (
    <div className="container">
      <h1>2024 파리 올림픽 메달 트래커</h1>
      <form className="input-group">
        <div className="input-filed">
          <label>국가</label>
          <input
            type="text"
            placeholder="국가 입력"
            value={country}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-filed">
          <label>금메달</label>
          <input
            type="text"
            placeholder="0"
            value={gold}
            onChange={(e) => handleMedalChange(e, "gold")}
          />
        </div>
        <div className="input-filed">
          <label>은메달</label>
          <input
            type="text"
            placeholder="0"
            value={silver}
            onChange={(e) => handleMedalChange(e, "silver")}
          />
        </div>
        <div className="input-filed">
          <label>동메달</label>
          <input
            type="text"
            placeholder="0"
            value={bronze}
            onChange={(e) => handleMedalChange(e, "bronze")}
          />
        </div>
        <div className="side-btn">
          <button className="add" onClick={handleUpload}>
            국가추가
          </button>
          <button className="update" onClick={handleUpdateCountry}>
            업데이트
          </button>
        </div>
      </form>
      <div>
        <table>
          <thead>
            <tr>
              <th>국가</th>
              <th>금메달</th>
              <th>은메달</th>
              <th>동메달</th>
              <th>비고</th>
            </tr>
          </thead>
          <tbody>
            {countries.map((item, idx) => (
              <tr key={idx}>
                <td>{item.name}</td>
                <td>{item.gold}</td>
                <td>{item.silver}</td>
                <td>{item.bronze}</td>
                <td>
                  <button onClick={() => handleDeleteCountry(idx)}>삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
