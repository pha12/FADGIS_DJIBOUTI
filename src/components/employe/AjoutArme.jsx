import React, { useState, useContext } from "react";
import { EmployeeContext } from "../EmployeeContext"; // Ensure the correct path
import "./AjoutArme.css";

const AjoutArme = () => {
  const { addEmployee, departments } = useContext(EmployeeContext); // Retrieve addEmployee and departments from context
  const [formData, setFormData] = useState({
    nom: "",
    sexe: "",
    dateNaissance: "",
    lieuNaissance: "",
    departement: "",
    telephone: "",
    email: "",
    grade: "",
    discipline: "",
    compMilitaire: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addEmployee(formData);
    alert("Employé ajouté avec succès !");
    setFormData({
      nom: "",
      sexe: "",
      dateNaissance: "",
      lieuNaissance: "",
      departement: "",
      telephone: "",
      email: "",
      grade: "",
      discipline: "",
      compMilitaire: "",
      status: "",
    });
  };

  return (
    <div className="ajout-arme">
      <h1>Ajouter un Employé</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nom"
          placeholder="Nom"
          value={formData.nom}
          onChange={handleChange}
          required
        />
        <select
          name="sexe"
          value={formData.sexe}
          onChange={handleChange}
          required
        >
          <option value="">Sexe</option>
          <option value="Homme">Homme</option>
          <option value="Femme">Femme</option>
        </select>
        <input
          type="date"
          name="dateNaissance"
          value={formData.dateNaissance}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lieuNaissance"
          placeholder="Lieu de Naissance"
          value={formData.lieuNaissance}
          onChange={handleChange}
          required
        />
        <select
          name="departement"
          value={formData.departement}
          onChange={handleChange}
          required
        >
          <option value="">Département</option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.nom}>
              {dept.nom}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="telephone"
          placeholder="Téléphone"
          value={formData.telephone}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <select
          name="grade"
          value={formData.grade}
          onChange={handleChange}
          required
        >
          <option value="">Grade</option>
          <option value="Soldat">Soldat</option>
          <option value="Caporal">Caporal</option>
          <option value="Sergent">Sergent</option>
          <option value="Lieutenant">Lieutenant</option>
          <option value="Colonel">Colonel</option>
        </select>
        <select
          name="discipline"
          value={formData.discipline}
          onChange={handleChange}
          required
        >
          <option value="">Discipline</option>
          <option value="Médecin Militaire">Médecin Militaire</option>
          <option value="Armée Terre">Armée Terre</option>
          <option value="Infirmier">Infirmier</option>
          <option value="Commando">Commando</option>
          <option value="Armée de l'Air">Armée de l'Air</option>
          <option value="Police Militaire">Police Militaire</option>
        </select>
        <select
          name="compMilitaire"
          value={formData.compMilitaire}
          onChange={handleChange}
          required
        >
          <option value="">Comp Militaire</option>
          <option value="Comp CCO">Comp CCO</option>
          <option value="Comp Mariam">Comp Mariam</option>
          <option value="Comp ARTA">Comp ARTA</option>
        </select>
        <input
          type="text"
          name="status"
          placeholder="Statut"
          value={formData.status}
          onChange={handleChange}
          required
        />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default AjoutArme;
