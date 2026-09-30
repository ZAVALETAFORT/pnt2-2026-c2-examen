"use client";

import { useEffect, useState } from "react";

import "../components/airbnb/airbnblist.css";

import { FaHeart, FaRegHeart } from "react-icons/fa"; //uso los mismos iconos de menu

import Link from "next/link";

//agreo lo dle punto 5 -GET /api/listings?pageSize=[pageSize]&page=[page]
//const API_URL = "https://backendairbnb-befph8eegzabfudb.eastus2-01.azurewebsites.net/api/listings?pageSize=100&page=1";
//ahora uso paginado
const API_URL =
  "https://backendairbnb-befph8eegzabfudb.eastus2-01.azurewebsites.net/api/listings";

export default function AirbnbList() {
  const [airbnbs, setAirbnbs] = useState([]);

  //favoritos
  const [favorites, setFavorites] = useState([]);

  //paginado
  const [page, setPage] = useState(1);

  useEffect(
    () => {
      const token = localStorage.getItem("authToken");

      //agrego favoritos
      const savedFavorites = JSON.parse(
        localStorage.getItem("favorites") || "[]",
      );

      setFavorites(savedFavorites);

      //test cant de tarjetas por pagina
      const PAGE_SIZE = 100;

      fetch(`${API_URL}?pageSize=${PAGE_SIZE}&page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setAirbnbs(Array.isArray(data) ? data : data.listings || []);
        });
    },
    //paginado
    [page],
  );

  //funcion para agregar o quitar favoritos
  const toggleFavorite = (id) => {
    let updatedFavorites;

    if (favorites.includes(id)) {
      updatedFavorites = favorites.filter((fav) => fav !== id);
    } else {
      updatedFavorites = [...favorites, id];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const selectAirbnb = (airbnb) => {
    localStorage.setItem("selectedAirbnb", JSON.stringify(airbnb));
  };

  return (
    <div className="airbnb-container">
      <h1 className="airbnb-title">Airbnb</h1>

      <div className="airbnb-grid">
        {airbnbs.map((airbnb) => (
          <div className="airbnb-card" key={airbnb._id}>
            <div className="airbnb-image-container">
              {airbnb.images?.picture_url && (
                <img
                  src={airbnb.images.picture_url}
                  alt={airbnb.name}
                  className="airbnb-image"
                />
              )}

              <button
                type="button"
                className="favorite-button"
                onClick={() => toggleFavorite(airbnb._id)}
              >
                {favorites.includes(airbnb._id) ? (
                  <FaHeart className="favorite-icon favorited" />
                ) : (
                  <FaRegHeart className="favorite-icon not-favorited" />
                )}
              </button>
            </div>

            <div className="airbnb-content">
              <Link
                href={`/airbnb/${airbnb._id}`}
                className="airbnb-name"
                onClick={() => selectAirbnb(airbnb)}
              >
                {airbnb.name}
              </Link>

              <p className="airbnb-summary">{airbnb.summary}</p>

              <a
                href={airbnb.listing_url}
                target="_blank"
                className="airbnb-url"
              >
                Ver la publicacion
              </a>
            </div>
          </div>
        ))}
      </div>

      <div>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Anterior
        </button>

        <span> Página {page} </span>

        <button onClick={() => setPage(page + 1)}>Siguiente</button>
      </div>
    </div>
  );
}
