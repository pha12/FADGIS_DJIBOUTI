import React, { useContext, useState } from "react";
import { EmployeeContext } from "../EmployeeContext";

const PlanningAutomatique = () => {
  const { employees, shifts, addShift } = useContext(EmployeeContext);
  const [newShift, setNewShift] = useState({
    employeeId: "",
    jour: "",
    startTime: "",
    endTime: "",
  });

  const handleAddShift = () => {
    if (!newShift.employeeId || !newShift.jour || !newShift.startTime || !newShift.endTime) {
      alert("Veuillez remplir tous les champs.");
      return;
    }
    addShift(newShift);
    setNewShift({ employeeId: "", jour: "", startTime: "", endTime: "" });
    alert("Planning ajouté avec succès !");
  };

  return (
    <div>
      <h3>Planification Automatique</h3>
      <div>
        <select
          value={newShift.employeeId}
          onChange={(e) => setNewShift({ ...newShift, employeeId: e.target.value })}
        >
          <option value="">Sélectionner un Employé</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.nom}
            </option>
          ))}
        </select>
        <select
          value={newShift.jour}
          onChange={(e) => setNewShift({ ...newShift, jour: e.target.value })}
        >
          <option value="">Sélectionner un Jour</option>
          <option value="Samedi">Samedi</option>
          <option value="Dimanche">Dimanche</option>
          <option value="Lundi">Lundi</option>
          <option value="Mardi">Mardi</option>
          <option value="Mercredi">Mercredi</option>
          <option value="Jeudi">Jeudi</option>
          <option value="Vendredi">Vendredi</option>
        </select>
        <input
          type="time"
          value={newShift.startTime}
          onChange={(e) => setNewShift({ ...newShift, startTime: e.target.value })}
        />
        <input
          type="time"
          value={newShift.endTime}
          onChange={(e) => setNewShift({ ...newShift, endTime: e.target.value })}
        />
        <button onClick={handleAddShift}>Ajouter Planning</button>
      </div>

      <h4>Emploi du Temps</h4>
      <table border="1">
        <thead>
          <tr>
            <th>#</th>
            <th>Employé</th>
            <th>Jour</th>
            <th>Heure Début</th>
            <th>Heure Fin</th>
          </tr>
        </thead>
        <tbody>
          {shifts.map((shift, index) => {
            const employee = employees.find((emp) => emp.id === shift.employeeId);
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{employee?.nom || "Inconnu"}</td>
                <td>{shift.jour}</td>
                <td>{shift.startTime}</td>
                <td>{shift.endTime}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PlanningAutomatique;
