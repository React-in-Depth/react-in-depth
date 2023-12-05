import { useState, useEffect } from "react";
import { UserDataForm } from "./UserDataForm";
import { UserDetails } from "./UserDetails";
import { UserPreferences } from "./UserPreferences";
import { useAPI } from "./useAPI";

export function LongUserProfile({ userId }) {
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [userPreferences, setUserPreferences] = useState({
    theme: "light",
    notifications: true,
  });

  // Fetching user data
  const api = useAPI();
  useEffect(() => {
    api
      .fetchUser(userId)
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch(() =>
        setUserData({
          name: "Unknown",
          email: "unknown@domain.invalid",
        })
      );
  }, [api, userId]);

  // Initializing user preferences
  useEffect(() => {
    const storedPreferences = localStorage.getItem("userPreferences");
    if (storedPreferences) {
      setUserPreferences(JSON.parse(storedPreferences));
    }
  }, []);

  // Updating user preferences
  useEffect(() => {
    localStorage.setItem(
      "userPreferences",
      JSON.stringify(userPreferences)
    );
  }, [userPreferences]);

  // Toggle edit mode
  const toggleEditMode = () => setEditMode(!editMode);

  // Update preferences
  const updatePreferences = (newPreferences) =>
    setUserPreferences(newPreferences);

  if (!userData) return <div>Loading...</div>;

  return (
    <div>
      <h1>User Profile</h1>
      {editMode ? (
        <UserDataForm userData={userData} onChange={setUserData} />
      ) : (
        <UserDetails userData={userData} />
      )}
      <button onClick={toggleEditMode}>
        {editMode ? "Save Changes" : "Edit Profile"}
      </button>
      <UserPreferences
        preferences={userPreferences}
        onPreferencesChange={updatePreferences}
      />
    </div>
  );
}
