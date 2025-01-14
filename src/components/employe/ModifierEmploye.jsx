import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { EmployeeContext } from "../EmployeeContext";

const ModifierEmploye = () => {
  const { updateEmployee, departments, statuses } = useContext(EmployeeContext); // Ajout de statuses
  const location = useLocation();
  const navigate = useNavigate();

  // Récupère les données de l'employé à modifier
  const employeeToEdit = location.state?.employee || null;

  const [formData, setFormData] = useState(employeeToEdit);

  useEffect(() => {
    if (!employeeToEdit) {
      navigate("/gestion-employes"); // Redirige si aucune donnée d'employé n'est fournie
    }
  }, [employeeToEdit, navigate]);

  if (!employeeToEdit) {
    return null; // Rend rien pendant la redirection
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateEmployee(formData); // Appelle la fonction pour mettre à jour l'employé
    alert("Employé modifié avec succès !");
    navigate("/gestion-employes");
  };

  return (
    <div>
      <h1>Modifier l'Employé</h1>
      {/* Bouton de retour */}
      <button onClick={() => navigate("/gestion-employes")} style={{ marginBottom: "20px" }}>
        Retour à Gestion des employés
      </button>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom:</label>
          <input
            type="text"
            name="nom"
            value={formData.nom || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Téléphone:</label>
          <input
            type="text"
            name="telephone"
            value={formData.telephone || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Département:</label>
          <select
            name="departement"
            value={formData.departement || ""}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionner un département</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.nom}>
                {dept.nom}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Statut:</label>
          <select
            name="status"
            value={formData.status || ""}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionner un statut</option>
            {statuses.map((status, index) => (
              <option key={index} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Grade:</label>
          <input
            type="text"
            name="poste"
            value={formData.poste || ""}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
};

export default ModifierEmploye;
