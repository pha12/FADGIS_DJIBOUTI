import React, { useState } from "react";
import "./PlanifOpera.css";
import { FaEdit, FaTrash } from "react-icons/fa";

const PlanifOpera = () => {
  const [operations, setOperations] = useState([]);
  const [newOperation, setNewOperation] = useState({
    name: "",
    date: "",
    location: "",
    commander: "",
    objective: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);

  // Add or Update Operation
  const handleSaveOperation = () => {
    if (
      !newOperation.name ||
      !newOperation.date ||
      !newOperation.location ||
      !newOperation.commander ||
      !newOperation.objective
    ) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    if (editingIndex !== null) {
      const updatedOperations = [...operations];
      updatedOperations[editingIndex] = newOperation;
      setOperations(updatedOperations);
      setEditingIndex(null);
    } else {
      setOperations([...operations, { ...newOperation, id: Date.now() }]);
    }

    setNewOperation({
      name: "",
      date: "",
      location: "",
      commander: "",
      objective: "",
    });
  };

  // Edit Operation
  const handleEditOperation = (index) => {
    setNewOperation(operations[index]);
    setEditingIndex(index);
  };

  // Delete Operation
  const handleDeleteOperation = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette opération ?")) {
      setOperations(operations.filter((operation) => operation.id !== id));
    }
  };

  return (
    <div className="planif-opera">
      <h1>Planification des Opérations Militaires</h1>

      {/* Form Section */}
      <div className="operation-form">
        <h3>{editingIndex !== null ? "Modifier l'Opération" : "Nouvelle Opération"}</h3>
        <input
          type="text"
          placeholder="Nom de l'opération"
          value={newOperation.name}
          onChange={(e) => setNewOperation({ ...newOperation, name: e.target.value })}
        />
        <input
          type="date"
          value={newOperation.date}
          onChange={(e) => setNewOperation({ ...newOperation, date: e.target.value })}
        />
        <input
          type="text"
          placeholder="Lieu"
          value={newOperation.location}
          onChange={(e) => setNewOperation({ ...newOperation, location: e.target.value })}
        />
        <input
          type="text"
          placeholder="Commandant"
          value={newOperation.commander}
          onChange={(e) => setNewOperation({ ...newOperation, commander: e.target.value })}
        />
        <textarea
          placeholder="Objectif de l'opération"
          value={newOperation.objective}
          onChange={(e) => setNewOperation({ ...newOperation, objective: e.target.value })}
        />
        <button className="save-btn" onClick={handleSaveOperation}>
          {editingIndex !== null ? "Mettre à jour" : "Ajouter"}
        </button>
      </div>

      {/* Operations Table Section */}
      <div className="operations-table">
        <h3>Liste des Opérations Planifiées</h3>
        {operations.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nom</th>
                <th>Date</th>
                <th>Lieu</th>
                <th>Commandant</th>
                <th>Objectif</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {operations.map((operation, index) => (
                <tr key={operation.id}>
                  <td>{index + 1}</td>
                  <td>{operation.name}</td>
                  <td>{operation.date}</td>
                  <td>{operation.location}</td>
                  <td>{operation.commander}</td>
                  <td>{operation.objective}</td>
                  <td>
                    <FaEdit
                      className="icon edit-icon"
                      onClick={() => handleEditOperation(index)}
                    />
                    <FaTrash
                      className="icon delete-icon"
                      onClick={() => handleDeleteOperation(operation.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Aucune opération planifiée.</p>
        )}
      </div>
    </div>
  );
};

export default PlanifOpera;
