import Link from "next/link";
import { setCookie } from "cookies-next";
import { useState } from "react";
import styles from "./myCity.module.css";

function MyCity({ path, city, country }) {
  const [myCity, setMyCity] = useState({ path, city, country });
  const loadCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        console.log("coord", latitude);
        fetch(
          `/api/geocode?lat=${latitude.toFixed(2)}&lng=${longitude.toFixed(2)}`
        )
          .then((r) => r.json())
          .then(({ path, city, country }) => {
            setMyCity({ path, city, country });
            setCookie(
              "nextjs-rq19-mycity",
              JSON.stringify({ path, city, country })
            );
          });
      }
    );
  };
  if (!myCity.path) {
    return (
      <p>
        Find your city:{" "}
        <button onClick={loadCoordinates}>Give permission</button>
      </p>
    );
  }

  return (
    <>
      <p>
        Your city is{" "}
        <Link href={myCity.path} className={styles.link}>
          {myCity.city}, {myCity.country}
        </Link>
        .
      </p>
      <p>
        Not correct? Update it:{" "}
        <button onClick={loadCoordinates}>Give permission</button>
      </p>
    </>
  );
}

export default MyCity;
