import { useTemperature, useTime } from "../format";
import { getWeatherImage } from "./getWeatherImage";

import styles from "./cityCard.module.css";

export function CityCard({ city, link, country = null, data }) {
  const image = getWeatherImage(data);
  const temperature = useTemperature(data);
  const time = useTime(data);
  const blackout = time.sun.isNight ? 0.6 : 0.3;
  return (
    <div
      className={styles.citycard}
      style={{
        backgroundImage: `linear-gradient(rgba(0 0 0 / ${blackout}),rgba(0 0 0 / ${blackout})), url(/weathers/${image}.png)`,
      }}
    >
      <a href={link} className={styles.title}>
        {country ? `${city}, ${country}` : city}
      </a>
      <div className={styles.stats}>
        <div className={styles.stat}>{data.condition}</div>
        <div className={styles.statbar} />
        <div className={styles.statlarge}>
          {temperature.value} {temperature.unit}
        </div>
        <div className={styles.statbar} />
        <div className={styles.stat}>{time.now}</div>
      </div>
    </div>
  );
}
