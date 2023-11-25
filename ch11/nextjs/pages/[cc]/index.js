import { CityCardList } from "../../components";
import { FormatProvider } from "../../format";
import { getDefaultFormats } from "../../services/cookies";
import { getCountryData } from "../../services/data";

export async function getServerSideProps(context) {
  const { cc } = context.query;
  const country = await getCountryData(cc);
  if (!country) {
    return { redirect: { destination: "/", permanent: false } };
  }
  const defaultFormats = getDefaultFormats(context);
  return { props: { country, defaultFormats } };
}

function Country({ country, defaultFormats }) {
  return (
    <FormatProvider defaultFormats={defaultFormats}>
      <main>
        <h1>Yo from {country.name}</h1>
        <CityCardList
          cities={country.cities}
          countryCode={country.code}
        />
      </main>
    </FormatProvider>
  );
}

export default Country;
