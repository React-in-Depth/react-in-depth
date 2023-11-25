import { Form } from "@remix-run/react";
import { useRef, useState } from "react";

import styles from "./myCity.module.css";

function UpdateMyCity({ label, setMyCity }) {
  const form = useRef();

  const loadCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        fetch(
          `/api/geocode?lat=${latitude.toFixed(2)}&lng=${longitude.toFixed(2)}`,
        )
          .then((r) => r.json())
          .then(({ path, city, country }) => {
            setMyCity({ path, city, country });
            form.current.myCity.value = JSON.stringify({
              path,
              city,
              country,
            });
            form.current.submit();
          });
      },
    );
  };
  return (
    <>
      <p>
        {label} <button onClick={loadCoordinates}>Give permission</button>
      </p>
      <Form method="post" ref={form}>
        <input name="myCity" type="hidden" />
      </Form>
    </>
  );
}

export function MyCity({ path, city, country }) {
  const [myCity, setMyCity] = useState({ path, city, country });
  if (!myCity.path) {
    return <UpdateMyCity label="Find your city:" setMyCity={setMyCity} />;
  }

  return (
    <>
      <p>
        Your city is{" "}
        <a href={myCity.path} className={styles.link}>
          {myCity.city}, {myCity.country}
        </a>
        .
      </p>
      <UpdateMyCity label=" Not correct? Update it:" setMyCity={setMyCity} />
    </>
  );
}
