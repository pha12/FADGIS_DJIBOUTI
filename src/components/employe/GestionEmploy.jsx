import React, { useContext, useState } from "react";
import { Button, Input, InputGroup } from "reactstrap";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { EmployeeContext } from "../EmployeeContext";
import "./GestionEmploy.css";
import AjoutArme from "./AjoutArme";
import ImportListe from "./ImportListe";
import InfoDepartement from "./InfoDepartement";

const GestionEmploy = () => {
  const { employees, setEmployees, archiveEmployee } = useContext(EmployeeContext);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("Gestion des employés");

  // Filter employees based on the search term
  const filteredEmployees = employees.filter((employee) =>
    Object.values(employee).some((val) =>
      val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // View Employee Details
  const handleView = (employee) => navigate("/employe-detail", { state: { employee } });

  // Modify Employee Details
  const handleModify = (employee) => navigate("/modifier-employe", { state: { employee } });

  // Delete Employee
  const handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet employé ?")) {
      setEmployees(employees.filter((employee) => employee.id !== id));
    }
  };

  // Archive Employee
  const handleArchive = (id) => {
    archiveEmployee(id);
    alert("Employé archivé avec succès !");
  };

  // Export to Excel
  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredEmployees.map(
        ({ id, nom, email, telephone, departement, grade, discipline, compMilitaire }) => ({
          ID: id,
          Nom: nom,
          Email: email,
          Téléphone: telephone,
          Département: departement,
          Grade: grade,
          Discipline: discipline,
          "Comp Militaire": compMilitaire,
        })
      )
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Employés");
    XLSX.writeFile(workbook, "Employes.xlsx");
  };

  // Export to PDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFont("times", "bold");
    doc.setFontSize(20);
    doc.text("LISTE EMPLOYE FAD", 105, 20, null, null, "center");

    const tableColumn = [
      "ID",
      "Nom",
      "Sex",
      "Disciplines",
      "Téléphone",
      "Département",
      "Grade",
      "Comp Militaire",
    ];
    const tableRows = [];

    filteredEmployees.forEach((emp) => {
      const employeeData = [
        emp.id,
        emp.nom,
        emp.sex || "N/A",
        emp.discipline || "N/A",
        emp.telephone,
        emp.departement || "N/A",
        emp.grade || "N/A",
        emp.compMilitaire || "N/A",
      ];
      tableRows.push(employeeData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      styles: { halign: "center" },
      headStyles: { fillColor: [0, 102, 204] },
    });

    doc.save("Liste_Employes_FAD.pdf");
  };

  const columns = [
    { name: "ID", selector: (row) => row.id, sortable: true },
    { name: "Nom", selector: (row) => row.nom, sortable: true },
    { name: "Email", selector: (row) => row.email, sortable: true },
    { name: "Téléphone", selector: (row) => row.telephone, sortable: true },
    { name: "Département", selector: (row) => row.departement, sortable: true },
    { name: "Grade", selector: (row) => row.grade, sortable: true },
    {
      name: "Discipline",
      selector: (row) => row.discipline,
      sortable: true,
    },
    {
      name: "Comp Militaire",
      selector: (row) => row.compMilitaire,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <Button size="sm" color="info" onClick={() => handleView(row)}>
            Voir
          </Button>
          <Button size="sm" color="warning" onClick={() => handleModify(row)}>
            Modifier
          </Button>
          <Button size="sm" color="secondary" onClick={() => handleArchive(row.id)}>
            Archiver
          </Button>
          <Button size="sm" color="danger" onClick={() => handleDelete(row.id)}>
            Supprimer
          </Button>
        </div>
      ),
    },
  ];

  const tabConfig = {
    "Gestion des employés": (
      <div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <InputGroup className="mb-3 flex-grow-1 me-2">
            <Input
              placeholder="Rechercher ici"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
          <Button className="btn-success me-2" onClick={handleDownloadExcel}>
            Excel
          </Button>
          <Button color="primary" onClick={handleDownloadPDF}>
            Imprimer
          </Button>
        </div>
        <DataTable
          className="table"
          columns={columns}
          data={filteredEmployees}
          pagination
          highlightOnHover
          striped
          responsive
        />
      </div>
    ),
    "Ajouter Arme": <AjoutArme />,
    "Import Liste": <ImportListe />,
    "InfoDepartement": <InfoDepartement />,
  };

  return (
    <div className="gestion-employ-page">
      <header className="page-header">
        <h1>Gestion des employés</h1>
      </header>

      <nav className="submenu">
        <ul>
          {Object.keys(tabConfig).map((tabName) => (
            <li
              key={tabName}
              className={activeTab === tabName ? "active" : ""}
              onClick={() => setActiveTab(tabName)}
            >
              {tabName}
            </li>
          ))}
        </ul>
      </nav>

      <div className="content">{tabConfig[activeTab]}</div>
    </div>
  );
};

export default GestionEmploy;
