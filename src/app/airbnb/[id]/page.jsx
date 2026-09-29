"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import "../../components/airbnb/airbnblist.css";

export default function AirbnbDetail() {
  const [airbnb, setAirbnb] = useState(null);

  //Leo el selected desde localStorage
  useEffect(() => {
    const savedAirbnb = localStorage.getItem("selectedAirbnb");

    if (savedAirbnb) {
      setAirbnb(JSON.parse(savedAirbnb));
    }
  }, []);

  if (!airbnb) {
    return <p>No se encontro airbnb</p>;
  }

  return (
    <div className="airbnb-detail-container">
      <h1 className="airbnb-detail-title">{airbnb.name}</h1>

      <Link href="/airbnb" className="back-button">
        Atras
      </Link>

      <div className="airbnb-detail-content">
        {airbnb.images?.picture_url && (
          <div className="airbnb-detail-image-container">
            <img
              src={airbnb.images.picture_url}
              alt={airbnb.name}
              className="airbnb-detail-image"
            />
          </div>
        )}

        <div className="airbnb-detail-info">
            
          <p className="airbnb-detail-summary">{airbnb.summary}</p>

          <a
            href={airbnb.listing_url}
            target="_blank"
            className="airbnb-detail-url"
          >
            Ver publicacion
          </a>
          
        </div>
      </div>
    </div>
  );
}
