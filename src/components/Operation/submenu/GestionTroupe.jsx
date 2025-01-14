import React, { useState } from "react";
import "./GestionTroupe.css";
import { FaEdit, FaTrash } from "react-icons/fa";

const GestionTroupe = () => {
  const [troupes, setTroupes] = useState([]);
  const [newTroupe, setNewTroupe] = useState({
    nom: "",
    region: "",
    effectif: "",
    mission: "",
  });

  const handleAddTroupe = () => {
    if (!newTroupe.nom || !newTroupe.region || !newTroupe.effectif || !newTroupe.mission) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    setTroupes([
      ...troupes,
      { ...newTroupe, id: `TROUPE-${Date.now()}` },
    ]);
    setNewTroupe({ nom: "", region: "", effectif: "", mission: "" });
  };

  const handleEditTroupe = (id) => {
    const editedTroupe = troupes.find((troupe) => troupe.id === id);
    if (editedTroupe) {
      setNewTroupe(editedTroupe);
      setTroupes(troupes.filter((troupe) => troupe.id !== id));
    }
  };

  const handleDeleteTroupe = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette troupe ?")) {
      setTroupes(troupes.filter((troupe) => troupe.id !== id));
    }
  };

  return (
    <div className="gestion-troupe-page">
      <header className="page-header">
        <h1>Gestion des Troupes Militaires</h1>
      </header>

      <section className="form-section">
        <h3>Ajouter une Nouvelle Troupe</h3>
        <input
          type="text"
          placeholder="Nom de la troupe"
          value={newTroupe.nom}
          onChange={(e) => setNewTroupe({ ...newTroupe, nom: e.target.value })}
        />
        <input
          type="text"
          placeholder="Région"
          value={newTroupe.region}
          onChange={(e) => setNewTroupe({ ...newTroupe, region: e.target.value })}
        />
        <input
          type="number"
          placeholder="Effectif"
          value={newTroupe.effectif}
          onChange={(e) => setNewTroupe({ ...newTroupe, effectif: e.target.value })}
        />
        <textarea
          placeholder="Mission"
          value={newTroupe.mission}
          onChange={(e) => setNewTroupe({ ...newTroupe, mission: e.target.value })}
        />
        <button onClick={handleAddTroupe}>Ajouter Troupe</button>
      </section>

      <section className="table-section">
        <h3>Liste des Troupes</h3>
        {troupes.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nom</th>
                <th>Région</th>
                <th>Effectif</th>
                <th>Mission</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {troupes.map((troupe, index) => (
                <tr key={troupe.id}>
                  <td>{index + 1}</td>
                  <td>{troupe.nom}</td>
                  <td>{troupe.region}</td>
                  <td>{troupe.effectif}</td>
                  <td>{troupe.mission}</td>
                  <td>
                    <FaEdit
                      className="edit-icon"
                      onClick={() => handleEditTroupe(troupe.id)}
                    />
                    <FaTrash
                      className="delete-icon"
                      onClick={() => handleDeleteTroupe(troupe.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Aucune troupe ajoutée pour le moment.</p>
        )}
      </section>
    </div>
  );
};

export default GestionTroupe;