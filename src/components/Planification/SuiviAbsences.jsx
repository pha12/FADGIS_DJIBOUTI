import React, { useContext, useState } from "react";
import { EmployeeContext } from "../EmployeeContext";

const SuiviAbsences = () => {
  const { employees, absences, addAbsence } = useContext(EmployeeContext);
  const [newAbsence, setNewAbsence] = useState({
    employeeId: "",
    nombreJours: "",
    absencesJours: "",
    heures: "",
  });

  const handleAddAbsence = () => {
    if (!newAbsence.employeeId || !newAbsence.nombreJours || !newAbsence.absencesJours || !newAbsence.heures) {
      alert("Veuillez remplir tous les champs.");
      return;
    }
    addAbsence(newAbsence.employeeId, {
      nombreJours: newAbsence.nombreJours,
      absencesJours: newAbsence.absencesJours,
      heures: newAbsence.heures,
    });
    setNewAbsence({ employeeId: "", nombreJours: "", absencesJours: "", heures: "" });
    alert("Absence ajoutée avec succès !");
  };

  return (
    <div>
      <h3>Suivi des Absences</h3>
      <div>
        <select
          value={newAbsence.employeeId}
          onChange={(e) => setNewAbsence({ ...newAbsence, employeeId: e.target.value })}
        >
          <option value="">Sélectionner un Employé</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.nom}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Nombre de Jours"
          value={newAbsence.nombreJours}
          onChange={(e) => setNewAbsence({ ...newAbsence, nombreJours: e.target.value })}
        />
        <input
          type="number"
          placeholder="Absences Jours"
          value={newAbsence.absencesJours}
          onChange={(e) => setNewAbsence({ ...newAbsence, absencesJours: e.target.value })}
        />
        <input
          type="number"
          placeholder="Heures"
          value={newAbsence.heures}
          onChange={(e) => setNewAbsence({ ...newAbsence, heures: e.target.value })}
        />
        <button onClick={handleAddAbsence}>Ajouter Absence</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID Employé</th>
            <th>Nom</th>
            <th>Nombre de Jours</th>
            <th>Absences Jours</th>
            <th>Heures</th>
          </tr>
        </thead>
        <tbody>
          {absences.map((absence, index) => {
            const employee = employees.find((emp) => emp.id === absence.id);
            return (
              <tr key={index}>
                <td>{employee?.id || "N/A"}</td>
                <td>{employee?.nom || "N/A"}</td>
                <td>{absence.nombreJours}</td>
                <td>{absence.absencesJours}</td>
                <td>{absence.heures}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SuiviAbsences;
