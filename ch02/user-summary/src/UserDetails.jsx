export function UserDetails({ userData }) {
  return (
    <div>
      <h2>Personal Information</h2>
      <p>
        <strong>Name:</strong> {userData.name}
      </p>
      <p>
        <strong>Email:</strong> {userData.email}
      </p>
    </div>
  );
}
