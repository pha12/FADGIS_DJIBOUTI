// GeneratePayroll.jsx
import React, { useContext, useState } from "react";
import { EmployeeContext } from "../../EmployeeContext";
import * as XLSX from "xlsx";
import "./GeneratePayroll.css";

const GeneratePayroll = () => {
  const { employees } = useContext(EmployeeContext);
  const [paieCalculee, setPaieCalculee] = useState([]);
  const [lastGeneratedDate, setLastGeneratedDate] = useState(null);

  const calculerPaie = () => {
    const today = new Date().toISOString().split("T")[0]; // Current date in YYYY-MM-DD format

    if (lastGeneratedDate === today) {
      alert("La paie a déjà été générée pour aujourd'hui.");
      return;
    }

    const paie = employees.map((employe) => {
      const baseSalary = employe.baseSalary || 0;
      const cotisationRetraite = baseSalary * 0.04; // 4% for retraite
      const cotisationAMU = baseSalary * 0.02; // 2% for AMU
      const deduction = baseSalary * 0.157; // 15.7% deductions
      const cnss = baseSalary * 0.217; // 21.7% CNSS
      const salaireImposable = baseSalary * 0.02; // 2% of base salary
      const its = salaireImposable > 0 ? salaireImposable * 0.1 : 0; // 10% of taxable income (ITS)
      const salaireNet = baseSalary - (cotisationRetraite + cotisationAMU + deduction + cnss + its);

      return {
        ...employe,
        baseSalary,
        cotisationRetraite,
        cotisationAMU,
        deduction,
        cnss,
        salaireImposable,
        its,
        salaireNet,
      };
    });

    setPaieCalculee(paie);
    setLastGeneratedDate(today);
    alert("Paie générée avec succès pour aujourd'hui.");
  };

  const handleExportPayroll = () => {
    if (paieCalculee.length === 0) {
      alert("Veuillez d'abord générer la paie.");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(
      paieCalculee.map(
        ({
          id,
          nom,
          email,
          telephone,
          departement,
          baseSalary,
          cotisationRetraite,
          cotisationAMU,
          deduction,
          cnss,
          salaireImposable,
          its,
          salaireNet,
        }) => ({
          ID: id,
          Nom: nom,
          Email: email,
          Téléphone: telephone,
          Département: departement,
          "Salaire de Base (€)": baseSalary.toFixed(2),
          "Retraite 4% (€)": cotisationRetraite.toFixed(2),
          "AMU 2% (€)": cotisationAMU.toFixed(2),
          "Déduction 15.7% (€)": deduction.toFixed(2),
          "CNSS 21.7% (€)": cnss.toFixed(2),
          "Salaire Imposable (2%) (€)": salaireImposable.toFixed(2),
          ITS: its.toFixed(2),
          "Salaire Net (€)": salaireNet.toFixed(2),
        })
      )
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Paie");
    XLSX.writeFile(workbook, "Paie.xlsx");
  };

  return (
    <div className="generate-payroll-page">
      <h1>Générer la Paie</h1>
      <div className="filters">
        <p>Date de génération : {lastGeneratedDate || "Non générée"}</p>
        <button
          className="btn generate-btn"
          onClick={calculerPaie}
          disabled={lastGeneratedDate === new Date().toISOString().split("T")[0]}
        >
          Générer
        </button>
        <button
          className="export-button"
          onClick={handleExportPayroll}
          disabled={paieCalculee.length === 0}
        >
          Exporter la Paie
        </button>
      </div>

      <table className="payroll-table">
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Département</th>
            <th>Salaire de Base (€)</th>
            <th>Retraite 4% (€)</th>
            <th>AMU 2% (€)</th>
            <th>Déduction 15.7% (€)</th>
            <th>CNSS 21.7% (€)</th>
            <th>Salaire Imposable (2%) (€)</th>
            <th>ITS (€)</th>
            <th>Salaire Net (€)</th>
          </tr>
        </thead>
        <tbody>
          {paieCalculee.map((employe, index) => (
            <tr key={employe.id}>
              <td>{index + 1}</td>
              <td>{employe.id}</td>
              <td>{employe.nom}</td>
              <td>{employe.email}</td>
              <td>{employe.telephone}</td>
              <td>{employe.departement}</td>
              <td>{employe.baseSalary.toFixed(2)}</td>
              <td>{employe.cotisationRetraite.toFixed(2)}</td>
              <td>{employe.cotisationAMU.toFixed(2)}</td>
              <td>{employe.deduction.toFixed(2)}</td>
              <td>{employe.cnss.toFixed(2)}</td>
              <td>{employe.salaireImposable.toFixed(2)}</td>
              <td>{employe.its.toFixed(2)}</td>
              <td>{employe.salaireNet.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GeneratePayroll;
