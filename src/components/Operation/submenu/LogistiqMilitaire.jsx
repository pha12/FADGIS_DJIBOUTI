import React, { useState } from "react";
import "./LogistiqMilitaire.css";
import { FaEdit, FaTrash } from "react-icons/fa";

const LogistiqMilitaire = () => {
  const [resources, setResources] = useState([]);
  const [newResource, setNewResource] = useState({
    nom: "",
    type: "",
    quantite: "",
    etat: "",
  });

  const handleAddResource = () => {
    if (!newResource.nom || !newResource.type || !newResource.quantite || !newResource.etat) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    setResources([
      ...resources,
      { ...newResource, id: `RESOURCE-${Date.now()}` },
    ]);
    setNewResource({ nom: "", type: "", quantite: "", etat: "" });
  };

  const handleEditResource = (id) => {
    const editedResource = resources.find((resource) => resource.id === id);
    if (editedResource) {
      setNewResource(editedResource);
      setResources(resources.filter((resource) => resource.id !== id));
    }
  };

  const handleDeleteResource = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette ressource ?")) {
      setResources(resources.filter((resource) => resource.id !== id));
    }
  };

  return (
    <div className="logistique-page">
      <header className="page-header">
        <h1>Suivi des Ressources et Matériel</h1>
      </header>

      <section className="form-section">
        <h3>Ajouter une Nouvelle Ressource</h3>
        <input
          type="text"
          placeholder="Nom de la ressource"
          value={newResource.nom}
          onChange={(e) => setNewResource({ ...newResource, nom: e.target.value })}
        />
        <input
          type="text"
          placeholder="Type de ressource"
          value={newResource.type}
          onChange={(e) => setNewResource({ ...newResource, type: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantité"
          value={newResource.quantite}
          onChange={(e) => setNewResource({ ...newResource, quantite: e.target.value })}
        />
        <select
          value={newResource.etat}
          onChange={(e) => setNewResource({ ...newResource, etat: e.target.value })}
        >
          <option value="">État</option>
          <option value="Bon">Bon</option>
          <option value="Moyen">Moyen</option>
          <option value="Endommagé">Endommagé</option>
        </select>
        <button onClick={handleAddResource}>Ajouter Ressource</button>
      </section>

      <section className="table-section">
        <h3>Liste des Ressources</h3>
        {resources.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nom</th>
                <th>Type</th>
                <th>Quantité</th>
                <th>État</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {resources.map((resource, index) => (
                <tr key={resource.id}>
                  <td>{index + 1}</td>
                  <td>{resource.nom}</td>
                  <td>{resource.type}</td>
                  <td>{resource.quantite}</td>
                  <td>{resource.etat}</td>
                  <td>
                    <FaEdit
                      className="edit-icon"
                      onClick={() => handleEditResource(resource.id)}
                    />
                    <FaTrash
                      className="delete-icon"
                      onClick={() => handleDeleteResource(resource.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Aucune ressource ajoutée pour le moment.</p>
        )}
      </section>
    </div>
  );
};

export default LogistiqMilitaire;

