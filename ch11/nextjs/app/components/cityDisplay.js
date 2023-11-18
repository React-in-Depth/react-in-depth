import Swap from "./swap";
import getWeatherImage from "./getWeatherImage";
import { useTemperature, useTime } from "../format";
import styles from "./cityDisplay.module.css";

function Highlight({ children }) {
  return <span className={styles.highlight}>{children}</span>;
}

function CityDisplay({ data: { city, country, data } }) {
  const now = Date.now() / 1000;
  const isNight = now < data.sunrise || now > data.sunset;
  const temp = useTemperature(data);
  const time = useTime(data);
  const weatherImage = getWeatherImage(data, isNight);
  const bgImage = `url(/weathers/${weatherImage}.png)`;
  return (
    <section
      className={styles.city}
      style={{
        backgroundImage: isNight
          ? `linear-gradient(rgba(0 0 0 / 0.3),rgba(0 0 0 / 0.3)), ${bgImage}`
          : bgImage,
      }}
    >
      {" "}
      <header className={styles.header}>
        <h1 className={styles.title}>
          Yo from <Highlight>{city}</Highlight>,{" "}
          <Highlight>{country}</Highlight>
        </h1>
        <h2 className={styles.weather}>
          It&apos;s <Highlight>{temp.value}</Highlight>
          {temp.unit}{" "}
          <Swap onClick={temp.toggle} title="Change temperature scale" /> and
          the weather is <Highlight>{data.conditionDescription}</Highlight>
        </h2>
        <h3 className={styles.time}>
          Local time is <Highlight>{time.now}</Highlight>{" "}
          <Swap onClick={time.toggle} title="Change time format" /> and the sun{" "}
          {time.isEternal ? (
            time.isEternalDay ? (
              "never sets"
            ) : (
              "never rises"
            )
          ) : (
            <>
              {time.sun.event} at <Highlight>{time.sun.at}</Highlight>
            </>
          )}
        </h3>
      </header>
    </section>
  );
}

export default CityDisplay;
