import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { MyCity } from "~/components/myCity";
import { CityCardList } from "~/components/cityCardList";

import { FormatProvider } from "~/format";
import { getFrontpageData } from "~/services/data";
import { getDefaultFormats, getMyCity, setMyCity } from "~/services/cookies";

export async function loader({ request }) {
  const defaultFormats = await getDefaultFormats(request);
  const myCity = await getMyCity(request);
  const cities = await getFrontpageData();
  return json({ defaultFormats, myCity, cities });
}

export async function action({ request }) {
  const bodyParams = await request.formData();

  if (typeof bodyParams.get("myCity") === "string") {
    return setMyCity(request, JSON.parse(bodyParams.get("myCity")));
  }
}

function Frontpage() {
  const { cities, defaultFormats, myCity } = useLoaderData();
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
