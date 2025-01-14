import React, { useContext, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./LocaliVehicule.css";
import { VehicleContext } from "./VehicleContext"; // Vérifiez que ce chemin est correct

const LocaliVehicule = () => {
  const { vehicles } = useContext(VehicleContext); // Assurez-vous que VehicleProvider est le parent

  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([11.5848, 43.1448], 12);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(mapRef.current);
    }

    vehicles.forEach((vehicle) => {
      const marker = L.marker([vehicle.lat || 11.5848, vehicle.lng || 43.1448])
        .addTo(mapRef.current)
        .bindPopup(
          `<b>${vehicle.nom}</b><br>Type: ${vehicle.type}<br>Matriculation: ${vehicle.matriculation}`
        );

      marker.on("click", () => {
        alert(`Details of ${vehicle.nom}`);
      });
    });
  }, [vehicles]);

  return (
    <div className="locali-vehicule">
      <h1>Localisation des Véhicules</h1>
      <div id="map" className="map"></div>
    </div>
  );
};

export default LocaliVehicule;
