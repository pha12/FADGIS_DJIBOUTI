// Personnel.jsx
import React, { useContext } from 'react';
import { EmployeeContext } from '../EmployeeContext';// Adjust the path based on your project structure
import './Personnel.css';

const Personnel = () => {
    const { employees } = useContext(EmployeeContext); // Consume the context to get employees

    return (
        <div>
            <h3>Affiche Emploi</h3>
            <p>Liste du personnel militaire actif.</p>
            <table>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Grade</th>
                        <th>Position</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.length > 0 ? (
                        employees.map((employee) => (
                            <tr key={employee.id}>
                                <td>{employee.nom}</td>
                                <td>{employee.grade}</td>
                                <td>{employee.position}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">Aucun employé trouvé.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Personnel;
