"use client";

import { useEffect, useState } from "react";

import "../components/airbnb/airbnblist.css";

//agreo lo dle punto 5 -GET /api/listings?pageSize=[pageSize]&page=[page]
const API_URL =
  "https://backendairbnb-befph8eegzabfudb.eastus2-01.azurewebsites.net/api/listings?pageSize=100&page=1";

export default function AirbnbList() {

  const [airbnbs, setAirbnbs] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {

        setAirbnbs(Array.isArray(data) ? data : data.listings || []);

      });
  }, []);

  return (
    <div className="airbnb-container">
      <h1 className="airbnb-title">Airbnb</h1>

      <div className="airbnb-grid">
        {airbnbs.map((airbnb) => (
          <div className="airbnb-card" key={airbnb._id}>
            {airbnb.images?.picture_url && (
              <img
                src={airbnb.images.picture_url}
                alt={airbnb.name}
                className="airbnb-image"
              />
            )}

            <div className="airbnb-content">
              <h2 className="airbnb-name">{airbnb.name}</h2>

              <p className="airbnb-summary">{airbnb.summary}</p>

              <a
                href={airbnb.listing_url}
                target="_blank"
                className="airbnb-url"
              >
                Ver ls publicacion
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
