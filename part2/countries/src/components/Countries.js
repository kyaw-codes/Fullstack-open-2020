import React from "react";

const Country = ({ country }) => (
  <div>
    <h1>{country.name}</h1>
    <div>capital {country.capital}</div>
    <div>population {country.population}</div>
    <h3>languages</h3>
    <ul>
      {country.languages.map((l) => (
        <li key={l.name}>{l.name}</li>
      ))}
    </ul>
    <img src={country.flag} width={400} height={400} alt={"Flag"} />
  </div>
);

const Countries = ({ countries, preview, setPreview }) => {

  let detail = preview ? <Country country={preview} /> : <div></div>;
  let display;

  const handleShow = (country) => {
    setPreview(country);
  };

  if (countries.length > 10) {      
    display = <div>Too many matches, specify another filter</div>;
  } else if (countries.length > 1) {
    display = (
      <div>
        <ul>
          {countries.map((c) => (
            <li key={c.name}>
              {c.name} <button onClick={() => handleShow(c)}>show</button>
            </li>
          ))}
        </ul>
      </div>
    );
  } else if (countries.length === 1) {      
    detail = <Country country={countries[0]} />;
  }

  return (
    <div>
      {display}
      {detail}
    </div>
  );
};

export default Countries;
