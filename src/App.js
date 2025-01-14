import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import logo from "./logo.png";
import { useTranslation } from "react-i18next";
import MapPage from "./components/MapPage";
import CarteInteractivePage from "./components/CarteInteractivePage";
import LocaliVehicule from "./components/LocaliVehicule";
import PersonnTemp from "./components/PersonnTemp";
import ZoneControl from "./components/ZoneControl";
import GestionEmploy from "./components/employe/GestionEmploy";
import Dashboard from "./components/tableauBord/Dashboard";
import { EmployeeProvider } from "./components/EmployeeContext";
import GeneratePayroll from "./components/Payroll/submenu/GeneratePayroll";
import FormationPage from "./components/FormationPage";
import Planification from "./components/Planification";
import ModifierEmploye from "./components/employe/ModifierEmploye";
import EmployeDetail from "./components/employe/EmployeDetail";
import OperationsMilitaires from "./components/Operation/OperationsMilitaires";
import AffectationEquipes from "./components/AffectationEquipes/AffectationEquipes";
import TaxReduction from "./components/Payroll/submenu/TaxReduction";
import ManageSalary from "./components/Payroll/submenu/ManageSalary";
import GestionPromotionGrade from "./components/gestionPromationsGrade/GestionPromotionGrade";
import Login from "./components/Login/Login";
import Personnel from "./components/Planification/Personnel";
import Parametre from "./components/Parametre/Parametre";
import InventaireEquipe from "./components/Inventaire/InventaireEquipe";
import AlerteRenouvelle from "./components/Inventaire/AlerteRenouvelle";
import SuiviMater from "./components/Inventaire/SuiviMater";
import EnregisMater from "./components/Inventaire/EnregisMater";
import VehiculeManage from "./components/controle/VehiculeManage";
import RolesUtilisateurs from "./components/Parametre/RolesUtilisateurs";
import ConfigAlert from "./components/Parametre/configAlert";
import { VehicleProvider } from "./components/VehicleContext";
import ArchiveDonnees from "./components/archive/ArchiveDonnees";
import {
  FaUser,
  FaCog,
  FaChartBar,
  FaHome,
  FaMapMarkedAlt,
  FaShieldAlt,
  FaSignOutAlt,
  FaBoxOpen,
  FaMoneyBillWave,
} from "react-icons/fa";
import { Import } from "lucide-react";

function App() {
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const authStatus = localStorage.getItem("authenticated");
    setIsAuthenticated(authStatus === "true");
  }, []);

  const handleLanguageChange = (event) => {
    const language = event.target.value;
    i18n.changeLanguage(language);
  };

  const menuItems = [
    {
      title: t("dashboard"),
      icon: <FaHome />,
      component: "Dashboard",
    },
    {
      title: t("humanResources"),
      icon: <FaUser />,
      subItems: [
        { name: t("training"), component: "FormationPage" },
        { name: t("scheduling"), component: "Planification" },
        { name: t("employeeManagement"), component: "GestionEmploy" },
        { name: t("militaryOps"), component: "OperationsMilitaires" },
        { name: t("Gestion Promotions Grades"), component: "GestionPromotionGrade" },
        { name: t("teamAssignment"), component: "AffectationEquipes" },
        { name: t("Archive"), component: "ArchiveDonnees" },
      ],
    },

    {
      title: t("payroll"),
      icon: <FaMoneyBillWave />,
      subItems: [
        { name: t("general payroll"), component: "GeneratePayroll" },
        { name: t("tax reduction"), component: "TaxReduction" },
        { name: t("manage salary"), component: "ManageSalary" },
      ],
    },
    {
      title: t("mapping"),
      icon: <FaMapMarkedAlt />,
      subItems: [
        { name: t("generalMap"), component: "MapPage" },
        { name: t("interactiveMap"), component: "CarteInteractivePage" },
        { name: t("vehicleLocation"), component: "LocaliVehicule" },
        { name: t("realTimePersonnel"), component: "PersonnTemp" },
        { name: t("controlZones"), component: "ZoneControl" },
      ],
    },
    {
      title: t("control"),
      icon: <FaShieldAlt />,
      subItems: [
        { name: t("realTimeTracking"), component: null },
        { name: t("vehicleRegistration"), component: "VehiculeManage" },
        { name: t("accessManagement"), component: null },
        { name: t("preventiveMaintenance"), component: null },
      ],
    },
    {
      title: t("inventory"),
      icon: <FaBoxOpen />,
      subItems: [
        { name: t("equipmentInventory"), component: "InventaireEquipe" },
        { name: t("renewalAlerts"), component: "AlerteRenouvelle" },
        { name: t("materialTracking"), component: "SuiviMater" },
        { name: t("materialNeeds"), component: null },
        { name: t("materialRegistration"), component: "EnregisMater" },
      ],
    },
    {
      title: t("reports"),
      icon: <FaChartBar />,
      subItems: [
        { name: t("performanceReports"), component: null },
        { name: t("securityStats"), component: null },
        { name: t("operationsTracking"), component: null },
      ],
    },
    {
      title: t("settings"),
      icon: <FaCog />,
      subItems: [
        { name: t("userRoles"), component: "RolesUtilisateurs" },
        { name: t("mapSettings"), component: null },
        { name: t("alertConfig"), component: "ConfigAlert" },
        { name: t("gisConfig"), component: null },
        { name: t("Settings"), component: "Parametre" },
      ],
    },
  ];

  const handleSubmenuToggle = (index) => {
    setOpenSubmenu(openSubmenu === index ? null : index);
  };

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  const renderComponent = () => {
    switch (activeItem) {
      case "Dashboard":
        return <Dashboard />;
      case "MapPage":
        return <MapPage />;
      case "CarteInteractivePage":
        return <CarteInteractivePage />;
      case "LocaliVehicule":
        return <LocaliVehicule />;
      case "PersonnTemp":
        return <PersonnTemp />;
      case "GeneratePayroll":
        return <GeneratePayroll />;
      case "TaxReduction":
        return <TaxReduction />;
      case "ManageSalary":
        return <ManageSalary />;
      case "GestionPromotionGrade":
        return <GestionPromotionGrade />;
      case "ZoneControl":
        return <ZoneControl />;
      case "GestionEmploy":
        return <GestionEmploy />;
      case "OperationsMilitaires":
        return <OperationsMilitaires />;
      case "AffectationEquipes":
        return <AffectationEquipes />;
      case "FormationPage":
        return <FormationPage />;
      case "RolesUtilisateurs":
        return <RolesUtilisateurs />;
      case "Planification":
        return <Planification />;
      case "Parametre":
        return <Parametre />;
      case "ConfigAlert":
        return <ConfigAlert />;
      case "InventaireEquipe":
        return <InventaireEquipe />;
      case "AlerteRenouvelle":
        return <AlerteRenouvelle />;
      case "SuiviMater":
        return <SuiviMater />;
      case "EnregisMater":
        return <EnregisMater />;
      case "VehiculeManage":
        return <VehiculeManage/>;
        case "ArchiveDonnees":
        return <ArchiveDonnees/>;
      default:
        return <Dashboard />;
    }
  };

  const handleLogin = (username, password) => {
    if (username === "mbf" && password === "1234") {
      setIsAuthenticated(true);
      localStorage.setItem("authenticated", "true");
      setErrorMessage("");
    } else {
      setErrorMessage("Nom d'utilisateur ou mot de passe incorrect.");
    }
  };

  return (
    <EmployeeProvider>
      <VehicleProvider>
        <Router>
          {isAuthenticated ? (
            <div className="app-container">
              <header className="header">
                <div className="Garde">
                  <img src={logo} alt="Logo" className="logo" />
                  <h1>FADSGI DJIBOUTI</h1>
                </div>
                <div className="user-info">
                  <span>Ali Mohamed Yacoub</span>
                  <div className="language-select">
                    <select
                      onChange={handleLanguageChange}
                      value={i18n.language}
                      className="language-selector"
                    >
                      <option value="fr">{t("french")}</option>
                      <option value="en">{t("english")}</option>
                    </select>
                  </div>
                  <button
                    className="logout-button"
                    onClick={() => {
                      localStorage.removeItem("authenticated");
                      setIsAuthenticated(false);
                    }}
                  >
                    <FaSignOutAlt />
                  </button>
                </div>
              </header>

              <div className="content-container">
                <aside className="sidebar">
                  {menuItems.map((menuItem, index) => (
                    <div key={index}>
                      <div
                        className={`menu-item ${
                          activeItem === menuItem.component ? "active" : ""
                        }`}
                        onClick={() =>
                          menuItem.component
                            ? setActiveItem(menuItem.component)
                            : handleSubmenuToggle(index)
                        }
                      >
                        <span className="menu-icon">{menuItem.icon}</span>
                        {menuItem.title}
                      </div>
                      {openSubmenu === index && menuItem.subItems?.length > 0 && (
                        <div className="submenu">
                          {menuItem.subItems.map((subItem, subIndex) => (
                            <div
                              key={subIndex}
                              className={`submenu-item ${
                                activeItem === subItem.component ? "active" : ""
                              }`}
                              onClick={() => handleItemClick(subItem.component)}
                            >
                              {subItem.name}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </aside>

                <main className="main-content">
                  <Routes>
                    <Route path="/" element={renderComponent()} />
                    <Route path="/gestion-employes" element={<GestionEmploy />} />
                    <Route path="/modifier-employe" element={<ModifierEmploye />} />
                    <Route path="/employe-detail" element={<EmployeDetail />} />
                    <Route path="/operations-militaires" element={<OperationsMilitaires />} />
                    <Route path="/affectation-equipes" element={<AffectationEquipes />} />
                    <Route path="/generate-payroll" element={<GeneratePayroll />} />
                    <Route path="/tax-reduction" element={<TaxReduction />} />
                    <Route path="/manage-salary" element={<ManageSalary />} />
                    <Route path="/Personnel" element={<Personnel />} />
                    <Route path="/Parametre" element={<Parametre />} />
                    <Route path="/InventaireEquipe" element={<InventaireEquipe />} />
                    <Route path="/AlerteRenouvelle" element={<AlerteRenouvelle />} />
                    <Route path="/SuiviMater" element={<SuiviMater />} />
                    <Route path="/EnregisMater" element={<EnregisMater />} />
                    <Route path="/VehiculeManage" element={<VehiculeManage />} />
                    <Route path="/LocaliVehicule" element={<LocaliVehicule />} />
                    <Route path="/ArchiveDonnees" element={<ArchiveDonnees/>} />
                  </Routes>
                </main>
              </div>
            </div>
          ) : (
            <Login onLogin={handleLogin} errorMessage={errorMessage} />
          )}
        </Router>
      </VehicleProvider>
    </EmployeeProvider>
  );
}

export default App;
