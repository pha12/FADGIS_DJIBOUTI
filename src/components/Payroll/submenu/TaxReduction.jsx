import React, { useContext, useState } from "react";
import { EmployeeContext } from "../../EmployeeContext"; // Importation du contexte des employés
import "./TaxReduction.css";

const TaxReduction = () => {
  const { employees } = useContext(EmployeeContext); // Accès aux employés depuis le contexte
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [dependents, setDependents] = useState(0);
  const [taxReduction, setTaxReduction] = useState(null);

  // Fonction pour calculer la réduction d'impôts
  const calculateTaxReduction = () => {
    if (!selectedEmployee) {
      alert("Veuillez sélectionner un employé.");
      return;
    }

    const baseReduction = selectedEmployee.baseSalary * 0.1; // 10% du salaire de base
    const dependentReduction = dependents * 1000; // 1000 pour chaque dépendant
    const totalReduction = baseReduction + dependentReduction;

    setTaxReduction(totalReduction.toFixed(2));
  };

  return (
    <div className="tax-reduction-container">
      <h1>Réduction d'Impôts</h1>
      <p>Calculez les réductions fiscales pour un employé sélectionné.</p>

      <div className="input-section">
        <div className="input-group">
          <label>Sélectionner un Employé</label>
          <select
            value={selectedEmployee?.id || ""}
            onChange={(e) => {
              const employee = employees.find((emp) => emp.id === e.target.value);
              setSelectedEmployee(employee || null);
            }}
          >
            <option value="">-- Sélectionner --</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.nom} - {employee.id}
              </option>
            ))}
          </select>
        </div>

        {selectedEmployee && (
          <div className="input-group">
            <label>Salaire de Base</label>
            <p>{selectedEmployee.baseSalary} €</p>
          </div>
        )}

        <div className="input-group">
          <label>Nombre de Dépendants</label>
          <input
            type="number"
            value={dependents}
            onChange={(e) => setDependents(parseInt(e.target.value) || 0)}
            placeholder="Entrez le nombre de dépendants"
          />
        </div>
      </div>

      <button onClick={calculateTaxReduction} className="calculate-btn">
        Calculer Réduction
      </button>

      {taxReduction !== null && (
        <div className="result-section">
          <h2>Réduction Totale</h2>
          <p>
            La réduction d'impôts pour <strong>{selectedEmployee.nom}</strong> est :{" "}
            <strong>{taxReduction} €</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default TaxReduction;
