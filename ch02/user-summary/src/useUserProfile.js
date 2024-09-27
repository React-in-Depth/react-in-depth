import { useAPI } from "./useApi"
import { useEffect, useState } from "react"

function useFetchUserData(userId) {
  const [userData, setUserData] = useState(null)
  const api = useAPI()
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
      )
  }, [api, userId])
  return { userData, setUserData }
}

export function useUserProfile(userId) {
  const [editMode, setEditMode] = useState(false)
  const [userPreferences, setUserPreferences] = useState({
    theme: "",
    notifications: false,
  })
  const { userData, setUserData } = useFetchUserData(userId)

  useEffect(() => {
    const storedPreferences = localStorage.getItem("userPreferences")
    if (storedPreferences) {
      setUserPreferences(JSON.parse(storedPreferences))
    }
  }, [])

  const toggleEditMode = () => setEditMode(!editMode)

  const updatePreferences = (newPreferences) => {
    setUserPreferences(newPreferences)
    localStorage.setItem("userPreferences", JSON.stringify(newPreferences))
  }

  return {
    userData,
    setUserData,
    editMode,
    userPreferences,
    toggleEditMode,
    updatePreferences,
  }
}
