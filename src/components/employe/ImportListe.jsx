import React, { useContext } from "react";
import * as XLSX from "xlsx";
import { EmployeeContext } from "../EmployeeContext";
import "./ImportListe.css";

const ImportListe = () => {
  const { employees, setEmployees } = useContext(EmployeeContext);

  const handleDownloadTemplate = () => {
    const worksheet = XLSX.utils.json_to_sheet([
      {
        ID: "1",
        Nom: "Exemple Nom",
        Email: "exemple@email.com",
        Téléphone: "12345678",
        Département: "IT",
        Grade: "Soldat",
        Discipline: "Infirmier",
        "Comp Militaire": "CCO",
      },
    ]);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Modèle");
    XLSX.writeFile(workbook, "modele_employes.xlsx");
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const importedData = XLSX.utils.sheet_to_json(worksheet);

      setEmployees((prevEmployees) => [...prevEmployees, ...importedData]);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSave = () => {
    try {
      localStorage.setItem("employees", JSON.stringify(employees));
      alert("Données sauvegardées localement avec succès !");
    } catch (error) {
      console.error("Erreur lors de la sauvegarde :", error);
      alert("Erreur lors de la sauvegarde des données.");
    }
  };

  const handleSaveToAPI = async () => {
    try {
      const response = await fetch("https://example.com/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employees),
      });

      if (response.ok) {
        alert("Données envoyées au serveur avec succès !");
      } else {
        alert("Erreur lors de l'envoi des données au serveur.");
      }
    } catch (error) {
      console.error("Erreur lors de la requête API :", error);
      alert("Erreur lors de l'envoi des données au serveur.");
    }
  };

  return (
    <div className="import-liste">
      <h2>Importation de la Liste des Employés</h2>
      <p>Téléchargez un modèle Excel ou importez vos propres données.</p>
      <div className="actions">
        <button className="btn btn-primary" onClick={handleDownloadTemplate}>
          Télécharger le modèle Excel
        </button>
        <label htmlFor="file-upload">Importer un fichier Excel</label>
        <input
          id="file-upload"
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
        />
        <button className="btn btn-success" onClick={handleSave}>
          Sauvegarder localement
        </button>

      </div>
    </div>
  );
};

export default ImportListe;
