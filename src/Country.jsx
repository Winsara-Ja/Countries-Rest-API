import React, { useEffect, useState } from "react";
import axios from "axios";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./index.css";

const Country = () => {
  const [country, setCountry] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        const sortedCountries = response.data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountry(sortedCountries);
      })
      .catch((error) => console.log(error));
  }, []);

  const moreInfo = (country) => {
    console.log(country);
  };

  return (
    <>
      <div>Countires</div>
      <div className="grid grid-cols-4 gap-4 p-4 m-4">
        {country.map((country) => (
          <div
            key={country.name.common}
            className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-md"
          >
            <div className="mb-4 font-bold">{country.name.common}</div>
            <img
              src={country.flags.png}
              alt=""
              className="h-auto w-100 object-cover rounded-sm mb-4"
              onClick={() => moreInfo(country)}
            />

            <h4>Capital : {country.capital}</h4>
            <h4>
              Languages :{" "}
              {country.languages
                ? Object.values(country.languages).join(", ")
                : "No language info"}
            </h4>
            <h4>Region : {country.region}</h4>
            <h4>
              currencies :{" "}
              {country.currencies
                ? Object.values(country.currencies)
                    .map(
                      (currency) =>
                        `${currency.name} (${currency.symbol || ""})`
                    )
                    .join(", ")
                : "No currency info"}
            </h4>
            <h4>Population : {country.population}</h4>
          </div>
        ))}
      </div>
      <div></div>
    </>
  );
};

export default Country;
