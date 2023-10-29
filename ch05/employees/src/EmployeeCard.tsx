import "./employee.css";

export type Employee = {
  name: string;
  title: string;
  website?: string;
};

interface CardProps {
  item: Employee;
}

function EmployeeCard({ item }: CardProps) {
  return (
    <section className="employee">
      <h2 className="employee__name">{item.name}</h2>
      <h3 className="employee__title">{item.title}</h3>
      {item.website && (
        <h4 className="employee__link">
          Web: <a href={item.website}>{item.website}</a>
        </h4>
      )}
    </section>
  );
}

export default EmployeeCard;
