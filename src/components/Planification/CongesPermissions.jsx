import React, { useContext, useState } from "react";
import { EmployeeContext } from "../EmployeeContext";

const CongesPermissions = () => {
  const { employees, setEmployees } = useContext(EmployeeContext);
  const [newConge, setNewConge] = useState({
    employeeId: "",
    moisConges: "",
    typeConges: "",
    nombreJoursConges: "",
  });

  // Function to handle adding a new leave record
  const handleAddConge = () => {
    if (
      !newConge.employeeId ||
      !newConge.moisConges ||
      !newConge.typeConges ||
      !newConge.nombreJoursConges
    ) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    // Update the selected employee's leave records
    setEmployees((prevEmployees) =>
      prevEmployees.map((employee) =>
        employee.id === newConge.employeeId
          ? {
              ...employee,
              conges: [
                ...(employee.conges || []),
                {
                  moisConges: newConge.moisConges,
                  typeConges: newConge.typeConges,
                  nombreJoursConges: parseInt(newConge.nombreJoursConges, 10),
                },
              ],
            }
          : employee
      )
    );

    // Reset the form
    setNewConge({
      employeeId: "",
      moisConges: "",
      typeConges: "",
      nombreJoursConges: "",
    });

    alert("Congé ajouté avec succès !");
  };

  return (
    <div>
      <h3>Congés et Permissions</h3>

      <h4>Ajouter un Congé</h4>
      <form>
        <select
          value={newConge.employeeId}
          onChange={(e) =>
            setNewConge({ ...newConge, employeeId: e.target.value })
          }
          required
        >
          <option value="">Sélectionnez un employé</option>
          {employees.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.nom}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Mois de Congé"
          value={newConge.moisConges}
          onChange={(e) =>
            setNewConge({ ...newConge, moisConges: e.target.value })
          }
          required
        />
        <select
          value={newConge.typeConges}
          onChange={(e) =>
            setNewConge({ ...newConge, typeConges: e.target.value })
          }
          required
        >
          <option value="">Type de Congé</option>
          <option value="Annuel">Annuel</option>
          <option value="Maladie">Maladie</option>
          <option value="Maternité">Maternité</option>
          <option value="Exceptionnel">Exceptionnel</option>
        </select>
        <input
          type="number"
          placeholder="Nombre de Jours"
          value={newConge.nombreJoursConges}
          onChange={(e) =>
            setNewConge({ ...newConge, nombreJoursConges: e.target.value })
          }
          required
        />
        <button type="button" onClick={handleAddConge}>
          Ajouter Congé
        </button>
      </form>

      <h4>Liste des Employés avec Congés</h4>
      <table style={{ border: "1px solid black", width: "100%", marginTop: "20px" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black" }}>ID EMPLOYE</th>
            <th style={{ border: "1px solid black" }}>Nom</th>
            <th style={{ border: "1px solid black" }}>Sex</th>
            <th style={{ border: "1px solid black" }}>Disciplines</th>
            <th style={{ border: "1px solid black" }}>Téléphone</th>
            <th style={{ border: "1px solid black" }}>Département</th>
            <th style={{ border: "1px solid black" }}>Grade</th>
            <th style={{ border: "1px solid black" }}>Type de congé</th>
            <th style={{ border: "1px solid black" }}>Nombre de jours</th>
            <th style={{ border: "1px solid black" }}>Mois de congé</th>
            <th style={{ border: "1px solid black" }}>Camp militaire</th>
          </tr>
        </thead>
        <tbody>
          {employees
            .filter((employee) => employee.conges && employee.conges.length > 0)
            .map((employee) =>
              employee.conges.map((conge, index) => (
                <tr key={`${employee.id}-${index}`}>
                  <td style={{ border: "1px solid black" }}>{employee.id}</td>
                  <td style={{ border: "1px solid black" }}>{employee.nom}</td>
                  <td style={{ border: "1px solid black" }}>{employee.sex}</td>
                  <td style={{ border: "1px solid black" }}>{employee.discipline}</td>
                  <td style={{ border: "1px solid black" }}>{employee.telephone}</td>
                  <td style={{ border: "1px solid black" }}>{employee.departement}</td>
                  <td style={{ border: "1px solid black" }}>{employee.grade}</td>
                  <td style={{ border: "1px solid black" }}>{conge.typeConges}</td>
                  <td style={{ border: "1px solid black" }}>{conge.nombreJoursConges}</td>
                  <td style={{ border: "1px solid black" }}>{conge.moisConges}</td>
                  <td style={{ border: "1px solid black" }}>{employee.compMilitaire}</td>
                </tr>
              ))
            )}
          {employees.every((employee) => !employee.conges || !employee.conges.length) && (
            <tr>
              <td colSpan="11" style={{ border: "1px solid black" }}>
                Aucun congé enregistré.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CongesPermissions;
