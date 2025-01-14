import React, { useState } from "react";
import "./SuiviMission.css";
import { FaEdit, FaTrash } from "react-icons/fa";

const SuiviMission = () => {
  const [missions, setMissions] = useState([]);
  const [newMission, setNewMission] = useState({
    nom: "",
    dateDebut: "",
    dateFin: "",
    statut: "",
    description: "",
  });

  const handleAddMission = () => {
    if (
      !newMission.nom ||
      !newMission.dateDebut ||
      !newMission.dateFin ||
      !newMission.statut ||
      !newMission.description
    ) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    setMissions([...missions, { ...newMission, id: `MISSION-${Date.now()}` }]);
    setNewMission({ nom: "", dateDebut: "", dateFin: "", statut: "", description: "" });
  };

  const handleEditMission = (id) => {
    const missionToEdit = missions.find((mission) => mission.id === id);
    if (missionToEdit) {
      setNewMission(missionToEdit);
      setMissions(missions.filter((mission) => mission.id !== id));
    }
  };

  const handleDeleteMission = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette mission ?")) {
      setMissions(missions.filter((mission) => mission.id !== id));
    }
  };

  return (
    <div className="suivi-mission-page">
      <header className="page-header">
        <h1>Suivi des Missions Militaires</h1>
      </header>

      <section className="form-section">
        <h3>Ajouter une Nouvelle Mission</h3>
        <input
          type="text"
          placeholder="Nom de la mission"
          value={newMission.nom}
          onChange={(e) => setNewMission({ ...newMission, nom: e.target.value })}
        />
        <input
          type="date"
          placeholder="Date de début"
          value={newMission.dateDebut}
          onChange={(e) => setNewMission({ ...newMission, dateDebut: e.target.value })}
        />
        <input
          type="date"
          placeholder="Date de fin"
          value={newMission.dateFin}
          onChange={(e) => setNewMission({ ...newMission, dateFin: e.target.value })}
        />
        <select
          value={newMission.statut}
          onChange={(e) => setNewMission({ ...newMission, statut: e.target.value })}
        >
          <option value="">Statut</option>
          <option value="En cours">En cours</option>
          <option value="Terminé">Terminé</option>
          <option value="Annulé">Annulé</option>
        </select>
        <textarea
          placeholder="Description de la mission"
          value={newMission.description}
          onChange={(e) => setNewMission({ ...newMission, description: e.target.value })}
        ></textarea>
        <button onClick={handleAddMission}>Ajouter Mission</button>
      </section>

      <section className="table-section">
        <h3>Liste des Missions</h3>
        {missions.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nom</th>
                <th>Date de Début</th>
                <th>Date de Fin</th>
                <th>Statut</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {missions.map((mission, index) => (
                <tr key={mission.id}>
                  <td>{index + 1}</td>
                  <td>{mission.nom}</td>
                  <td>{mission.dateDebut}</td>
                  <td>{mission.dateFin}</td>
                  <td>{mission.statut}</td>
                  <td>{mission.description}</td>
                  <td>
                    <FaEdit
                      className="edit-icon"
                      onClick={() => handleEditMission(mission.id)}
                    />
                    <FaTrash
                      className="delete-icon"
                      onClick={() => handleDeleteMission(mission.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Aucune mission enregistrée pour le moment.</p>
        )}
      </section>
    </div>
  );
};

export default SuiviMission;
