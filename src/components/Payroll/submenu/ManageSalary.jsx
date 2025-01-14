import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EmployeeContext } from "../../EmployeeContext";
import "./ManageSalary.css";

const ManageSalary = () => {
  const { employees, updateEmployeeSalary } = useContext(EmployeeContext);
  const navigate = useNavigate();

  const [message, setMessage] = useState(""); // State to store success message

  const handleSalaryChangeInTable = (id, newSalary) => {
    if (!newSalary || isNaN(newSalary) || newSalary <= 0) {
      alert("Veuillez entrer un salaire valide.");
      return;
    }
    updateEmployeeSalary(id, newSalary);

    // Set the success message
    setMessage(`Salaire mis à jour avec succès pour l'employé ID ${id}.`);

    // Clear the message after 3 seconds
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <div className="manage-salary-container">
      <h1>Gérer le Salaire de Base</h1>
      <p>Ajoutez ou modifiez le salaire de base directement dans la table ci-dessous.</p>

      {/* Display success message */}
      {message && <div className="success-message">{message}</div>}

      <h2>TABLE DES SALAIRES</h2>
      <table className="salary-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>NOM</th>
            <th>TÉLÉPHONE</th>
            <th>DÉPARTEMENT</th>
            <th>SALAIRE DE BASE (€)</th>
            <th>SALAIRE IMPOSABLE (€)</th>
            <th>SALAIRE NET (€)</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.nom}</td>
              <td>{employee.telephone}</td>
              <td>{employee.departement}</td>
              <td>
                <input
                  type="number"
                  value={employee.baseSalary || ""}
                  onChange={(e) =>
                    handleSalaryChangeInTable(employee.id, parseFloat(e.target.value))
                  }
                  placeholder="Entrez un salaire"
                />
              </td>
              <td>{employee.salaireImposable || "-"}</td>
              <td>{employee.salaireNet || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={() => navigate("/")} className="btn btn-secondary">
        Retour à l'accueil
      </button>
    </div>
  );
};

export default ManageSalary;
