import React, { useContext } from "react";
import { EmployeeContext } from "../EmployeeContext";

const GestionHoraires = () => {
  const { horaires = [], setHoraires } = useContext(EmployeeContext); // Fallback to empty array

  const addHoraire = () => {
    const newHoraire = {
      id: horaires.length + 1,
      nom: "Soldat Dupont",
      jour: "Lundi",
      heureDebut: "08:00",
      heureFin: "16:00",
    };


    setHoraires([...horaires, newHoraire]);
  };

  return (
    <div>
      <h3>Gestion des Horaires de Travail</h3>
      <button onClick={addHoraire}>Ajouter Horaire</button>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Jour</th>
            <th>Heure de début</th>
            <th>Heure de fin</th>
          </tr>
        </thead>
        <tbody>
          {horaires.length > 0 ? (
            horaires.map((horaire) => (
              <tr key={horaire.id}>
                <td>{horaire.nom}</td>
                <td>{horaire.jour}</td>
                <td>{horaire.heureDebut}</td>
                <td>{horaire.heureFin}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Aucun horaire enregistré.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GestionHoraires;
