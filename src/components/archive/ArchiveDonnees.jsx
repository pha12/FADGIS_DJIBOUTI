import React, { useContext } from "react";
import { EmployeeContext } from "../EmployeeContext";

const ArchiveDonnees = () => {
  const { archivedEmployees, restoreArchivedEmployee, deleteArchivedEmployee } =
    useContext(EmployeeContext);

  return (
    <div className="archive-donnees">
      <h1>Archives des Employés</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Date Archivage</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {archivedEmployees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.nom}</td>
              <td>{emp.email}</td>
              <td>{emp.archivedAt}</td>
              <td>
                <button onClick={() => restoreArchivedEmployee(emp.id)}>
                  Restaurer
                </button>
                <button onClick={() => deleteArchivedEmployee(emp.id)}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArchiveDonnees;
