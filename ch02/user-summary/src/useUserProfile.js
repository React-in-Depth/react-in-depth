import { useEffect, useState } from "react";
import { useAPI } from "./useAPI";

function useFetchUserData(userId) {
  const [userData, setUserData] = useState(null);

  const api = useAPI();
  useEffect(() => {
    // API call to fetch user data
    api
      .fetchUser(userId)
      .then((response) => response.json())
      .then((data) => setUserData(data));
  }, [api, userId]);

  return userData;
}

export function useUserProfile(userId) {
  const [editMode, setEditMode] = useState(false);
  const [userPreferences, setUserPreferences] = useState({
    theme: "light",
    notifications: true,
  });
  const userData = useFetchUserData(userId);

  useEffect(() => {
    const storedPreferences = localStorage.getItem("userPreferences");
    if (storedPreferences) {
      setUserPreferences(JSON.parse(storedPreferences));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "userPreferences",
      JSON.stringify(userPreferences)
    );
  }, [userPreferences]);

  const toggleEditMode = () => setEditMode(!editMode);
  const updatePreferences = (newPreferences) =>
    setUserPreferences(newPreferences);

  return {
    userData,
    editMode,
    userPreferences,
    toggleEditMode,
    updatePreferences,
  };
}
