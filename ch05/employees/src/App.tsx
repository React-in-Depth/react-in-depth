import EmployeeCard, { Employee } from "./EmployeeCard";
import "./app.css";

function App() {
  const employees: Employee[] = [
    {
      name: "Wayne Campbell",
      title: "Host Extraordinaire",
      website: "https://extremepartytime.com",
    },
    {
      name: "Garth Algar",
      title: "Tech Wizard",
    },
  ];
  return (
    <main>
      {employees.map((employee) => (
        <EmployeeCard key={employee.name} item={employee} />
      ))}
    </main>
  );
}

export default App;
