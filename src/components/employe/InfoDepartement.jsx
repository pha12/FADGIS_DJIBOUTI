import React, { useContext, useState } from "react";
import { EmployeeContext } from "../EmployeeContext";
import "./InfoDepartement.css";

const InfoDepartement = () => {
  const { departments, addDepartment, deleteDepartment } = useContext(EmployeeContext);
  const [newDepartment, setNewDepartment] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleCreateDepartment = () => {
    if (newDepartment.trim()) {
      addDepartment(newDepartment);
      setNewDepartment(""); // Réinitialiser l'input
      setSuccessMessage("Département ajouté avec succès!");
      setTimeout(() => setSuccessMessage(""), 3000); // Masquer après 3 sec
    }
  };

  return (
    <div className="info-department-page">
      <header className="page-header">
        <h2>Gestion des Départements</h2>
      </header>

      {/* Formulaire d'ajout */}
      <div className="create-department-form">
        <h3>Créer un Nouveau Département</h3>
        <div className="form-group">
          <input
            type="text"
            value={newDepartment}
            onChange={(e) => setNewDepartment(e.target.value)}
            placeholder="Nom du département"
            className="department-input"
          />
          <button onClick={handleCreateDepartment} className="create-button">
            Ajouter
          </button>
        </div>
      </div>

      {/* Message de succès */}
      {successMessage && <div className="success-message">{successMessage}</div>}

      {/* Liste des départements */}
      <div className="department-list department-section">
        <h3 className="department-title">Liste des Départements</h3>
        <table className="department-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dept) => (
              <tr key={dept.id}>
                <td>{dept.id}</td>
                <td>{dept.nom}</td>
                <td>
                  <button
                    onClick={() => deleteDepartment(dept.id)}
                    className="delete-button"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InfoDepartement;
