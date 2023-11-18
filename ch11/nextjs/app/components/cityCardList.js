import CityCard from "./cityCard";
import styles from "./cityCard.module.css";

function CityCardList({ cities, withCountry = false }) {
  return (
    <div className={styles.list}>
      {cities.map((city) => (
        <CityCard
          link={`/${city.countryCode.toLowerCase()}/${city.slug}`}
          city={city.name}
          country={withCountry ? city.country : null}
          data={city.data}
          key={city.slug}
        />
      ))}
    </div>
  );
}

export default CityCardList;
