import "./employee.css";
import { Employee } from "./types";

interface CardProps {
  item: Employee;
}

export function EmployeeCard({ item }: CardProps) {
  return (
    <section className="employee">
      <h2 className="employee__name">{item.name}</h2>
      <h3 className="employee__title">{item.title}</h3>
    </section>
  );
}
