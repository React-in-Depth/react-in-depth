export function UserDataForm({ userData, onChange }) {
  const handleNameChange = (event) =>
    onChange({
      ...userData,
      name: event.target.value,
    });
  const handleEmailChange = (event) =>
    onChange({
      ...userData,
      email: event.target.value,
    });
  return (
    <form style={{ display: "flex", flexDirection: "column" }}>
      <h2>Personal Information</h2>
      <label>
        Name:
        <input
          type="text"
          value={userData.name}
          onChange={handleNameChange}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={userData.email}
          onChange={handleEmailChange}
        />
      </label>
    </form>
  );
}
