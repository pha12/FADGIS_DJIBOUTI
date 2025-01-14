import React, { useState } from "react";
import "./RolesUtilisateurs.css";

const RolesUtilisateurs = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const [permissions, setPermissions] = useState({
    "Tableau de bord": [
      { name: "Accès au tableau de bord", checked: false },
    ],
    "Ressources humaines": [
      { name: "Formation", checked: false },
      { name: "Planification", checked: false },
      { name: "Gestion des employés", checked: false },
      { name: "Opérations militaires", checked: false },
      { name: "Gestion Promotions Grades", checked: false },
      { name: "Affectation des équipes", checked: false },
    ],
    "Payroll": [
      { name: "General payroll", checked: false },
      { name: "Tax reduction", checked: false },
      { name: "Manage salary", checked: false },
    ],
    "Cartographie": [
      { name: "Carte générale", checked: false },
      { name: "Carte interactive", checked: false },
      { name: "Localisation des véhicules", checked: false },
      { name: "Personnel en temps réel", checked: false },
      { name: "Zones de contrôle", checked: false },
    ],
    "Contrôle": [
      { name: "Suivi en temps réel", checked: false },
      { name: "Enregistrement des véhicules", checked: false },
      { name: "Gestion des accès", checked: false },
      { name: "Maintenance", checked: false },
    ],
    "Inventaire": [
      { name: "Inventaire des équipements", checked: false },
      { name: "Alertes de renouvellement", checked: false },
      { name: "Suivi du matériel", checked: false },
      { name: "Besoins en matériel", checked: false },
      { name: "Enregistrement du matériel", checked: false },
    ],
    "Rapports": [
      { name: "Rapports de performance", checked: false },
      { name: "Statistiques de sécurité", checked: false },
      { name: "Suivi des opérations", checked: false },
    ],
    "Paramètres": [
      { name: "Rôles utilisateurs", checked: false },
      { name: "Paramètres de carte", checked: false },
      { name: "Configuration des alertes", checked: false },
      { name: "Configuration SIG", checked: false },
      { name: "Paramètres généraux", checked: false },
    ],
  });

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handlePermissionChange = (category, index) => {
    setPermissions((prev) => {
      const updatedCategory = [...prev[category]];
      updatedCategory[index].checked = !updatedCategory[index].checked;
      return { ...prev, [category]: updatedCategory };
    });
  };

  const handleSave = () => {
    if (!selectedRole) {
      alert("Veuillez sélectionner un rôle.");
      return;
    }
    alert(`Permissions enregistrées pour le rôle ${selectedRole}`);
  };

  return (
    <div className="roles-utilisateurs">
      <h1>Gestion des Rôles Utilisateurs</h1>
      <div className="role-selection">
        <label htmlFor="roles">Rôles *</label>
        <select id="roles" value={selectedRole} onChange={handleRoleChange}>
          <option value="">-- Sélectionner un rôle --</option>
          <option value="Surveillant">Surveillant</option>
          <option value="Officier">Officier</option>
          <option value="Administrateur">Administrateur</option>
        </select>
      </div>

      {selectedRole && (
        <div className="permissions-container">
          {Object.keys(permissions).map((category) => (
            <div key={category} className="permission-category">
              <h3>{category}</h3>
              <ul>
                {permissions[category].map((permission, index) => (
                  <li key={index}>
                    <input
                      type="checkbox"
                      checked={permission.checked}
                      onChange={() => handlePermissionChange(category, index)}
                    />
                    <label>{permission.name}</label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      <button className="save-btn" onClick={handleSave}>
        Enregistrer les Permissions
      </button>
    </div>
  );
};

export default RolesUtilisateurs;
