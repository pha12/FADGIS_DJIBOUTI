// AlerteRenouvelle.jsx
import React, { useState, useEffect } from 'react';
import './AlerteRenouvelle.css';

const AlerteRenouvelle = () => {
  const [alertes, setAlertes] = useState([]);

  useEffect(() => {
    // Exemple de données simulées
    const data = [
      { id: 1, nom: 'Équipement A', dateExpiration: '2025-02-15', statut: 'Urgent' },
      { id: 2, nom: 'Équipement B', dateExpiration: '2025-03-01', statut: 'À renouveler' },
      { id: 3, nom: 'Équipement C', dateExpiration: '2025-04-10', statut: 'En attente' },
    ];
    setAlertes(data);
  }, []);

  const handleRenouvellement = (id) => {
    alert(`Renouvellement lancé pour l'équipement ID: ${id}`);
  };

  return (
    <div className="alerte-container">
      <div className="alerte-header">
        <h1>Alertes de Renouvellement</h1>
      </div>

      <table className="alerte-table">
        <thead>
          <tr>
            <th>Nom de l'équipement</th>
            <th>Date d'expiration</th>
            <th>Statut</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {alertes.map((alerte) => (
            <tr key={alerte.id}>
              <td>{alerte.nom}</td>
              <td>{alerte.dateExpiration}</td>
              <td className={`statut ${alerte.statut.toLowerCase()}`}>{alerte.statut}</td>
              <td>
                <button
                  className="btn-renouveler"
                  onClick={() => handleRenouvellement(alerte.id)}
                >
                  Renouveler
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AlerteRenouvelle;