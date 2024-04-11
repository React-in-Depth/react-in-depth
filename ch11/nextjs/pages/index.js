import { getCookie } from "cookies-next";

import { CityCardList, MyCity } from "../components";
import { FormatProvider } from "../format";
import { getDefaultFormats } from "../services/cookies";
import { getFrontpageData } from "../services/data";

export async function getServerSideProps(context) {
  const cities = await getFrontpageData();
  const defaultFormats = getDefaultFormats(context);
  const myCity = JSON.parse(
    getCookie("nextjs-mycity", context) || "null"
  );
  return { props: { cities, defaultFormats, myCity } };
}

function Frontpage({ cities, defaultFormats, myCity }) {
  return (
    <FormatProvider defaultFormats={defaultFormats}>
      <main>
        <h1>Yo from around the world</h1>
        <MyCity {...myCity} />
        <CityCardList cities={cities} withCountry />
      </main>
    </FormatProvider>
  );
}

export default Frontpage;
