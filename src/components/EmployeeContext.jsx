import React, { createContext, useState } from "react";

export const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  // State for employees
  const [employees, setEmployees] = useState([]);

  // State for archived employees
  const [archivedEmployees, setArchivedEmployees] = useState([]);

  // State for absences
  const [absences, setAbsences] = useState([]);

  // State for shifts
  const [shifts, setShifts] = useState([]);

  // State for departments
  const [departments, setDepartments] = useState([]);

  // State for statuses
  const [statuses] = useState(["Actif", "Inactif", "En congé"]); // Static statuses

  // Function to add a new employee
  const addEmployee = (newEmployee) => {
    const id = `EMP-${Date.now()}`; // Generate a unique ID
    const employeeWithId = { id, ...newEmployee };
    setEmployees((prev) => [...prev, employeeWithId]);
  };

  // Function to update an employee
  const updateEmployee = (updatedEmployee) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) =>
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      )
    );
  };

  // Function to archive an employee
  const archiveEmployee = (id) => {
    setEmployees((prevEmployees) => {
      const employeeToArchive = prevEmployees.find((emp) => emp.id === id);
      if (employeeToArchive) {
        setArchivedEmployees((prev) => [...prev, employeeToArchive]);
      }
      return prevEmployees.filter((emp) => emp.id !== id);
    });
  };

  // Function to restore an archived employee
  const restoreArchivedEmployee = (id) => {
    setArchivedEmployees((prevArchived) => {
      const employeeToRestore = prevArchived.find((emp) => emp.id === id);
      if (employeeToRestore) {
        setEmployees((prev) => [...prev, employeeToRestore]);
      }
      return prevArchived.filter((emp) => emp.id !== id);
    });
  };

  // Function to update employee salary
  const updateEmployeeSalary = (id, baseSalary) => {
    const cotisationRetraite = baseSalary * 0.04;
    const cotisationAMU = baseSalary * 0.02;
    const deduction = baseSalary * 0.157;
    const cnss = baseSalary * 0.217;
    const salaireImposable =
      baseSalary - (cotisationRetraite + cotisationAMU + deduction + cnss);
    const its = salaireImposable > 0 ? salaireImposable * 0.1 : 0;
    const salaireNet = salaireImposable - its;

    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) =>
        emp.id === id
          ? {
              ...emp,
              baseSalary,
              salaireImposable: salaireImposable.toFixed(2),
              salaireNet: salaireNet.toFixed(2),
            }
          : emp
      )
    );
  };

  // Function to add a new absence
  const addAbsence = (employeeId, newAbsence) => {
    setAbsences((prevAbsences) => [
      ...prevAbsences,
      { id: employeeId, absenceId: `ABS-${Date.now()}`, ...newAbsence },
    ]);
  };

  // Function to fetch absences for a specific employee
  const getEmployeeAbsences = (employeeId) => {
    return absences.filter((absence) => absence.id === employeeId);
  };

  // Function to add a shift
  const addShift = (shiftData) => {
    setShifts((prev) => [...prev, { ...shiftData, shiftId: `SFT-${Date.now()}` }]);
  };

  // Function to add a new department
  const addDepartment = (newDepartment) => {
    const id = `DEPT-${Date.now()}`; // Generate a unique ID
    setDepartments((prev) => [...prev, { id, nom: newDepartment }]);
  };

  // Function to delete a department
  const deleteDepartment = (id) => {
    setDepartments((prev) => prev.filter((dept) => dept.id !== id));
  };

  // New state for promotions
  const [promotions, setPromotions] = useState([]);

  // Function to add a promotion
  const addPromotion = (newPromotion) => {
    setPromotions((prev) => [...prev, { id: `PROMO-${Date.now()}`, ...newPromotion }]);
  };

  // Function to delete a promotion
  const deletePromotion = (id) => {
    setPromotions((prev) => prev.filter((promo) => promo.id !== id));
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        setEmployees,
        archivedEmployees,
        archiveEmployee,
        restoreArchivedEmployee,
        addEmployee,
        updateEmployee,
        updateEmployeeSalary,
        absences,
        setAbsences,
        addAbsence,
        getEmployeeAbsences,
        shifts,
        setShifts,
        addShift,
        departments,
        setDepartments,
        addDepartment,
        deleteDepartment,
        statuses,
        promotions,
        setPromotions,
        addPromotion,
        deletePromotion,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};
