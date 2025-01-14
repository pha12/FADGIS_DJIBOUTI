import React, { useState } from "react";
import "./ArchiveDonnees.css";

const ArchiveDonnees = () => {
  const [archives, setArchives] = useState([
    {
      id: 1,
      nom: "John Doe",
      role: "Employé",
      dateArchivage: "2025-01-10",
    },
    {
      id: 2,
      nom: "Jane Smith",
      role: "Manager",
      dateArchivage: "2025-01-08",
    },
  ]);

  return (
    <div className="archive-container">
      <h1>Archives des Données Personnelles</h1>

      <table className="archive-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Rôle</th>
            <th>Date d'Archivage</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {archives.map((archive) => (
            <tr key={archive.id}>
              <td>{archive.id}</td>
              <td>{archive.nom}</td>
              <td>{archive.role}</td>
              <td>{archive.dateArchivage}</td>
              <td>
                <button
                  className="restore-btn"
                  onClick={() =>
                    alert(`Données de ${archive.nom} restaurées avec succès.`)
                  }
                >
                  Restaurer
                </button>
                <button
                  className="delete-btn"
                  onClick={() =>
                    alert(`Données de ${archive.nom} supprimées définitivement.`)
                  }
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArchiveDonnees;
