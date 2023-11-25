import { json, redirect } from "@remix-run/node"; // or cloudflare/deno
import { useLoaderData } from "@remix-run/react";
import { CityCardList } from "~/components/cityCardList";
import { FormatProvider } from "~/format";
import { getCountryData } from "~/services/data";
import { getDefaultFormats } from "~/services/cookies";

export async function loader({ request, params }) {
  const country = await getCountryData(params.cc);
  if (!country) {
    redirect("/");
  }
  const defaultFormats = await getDefaultFormats(request);
  return json({ defaultFormats, country });
}

function Country() {
  const { country, defaultFormats } = useLoaderData();
  if (!country) {
    return null;
  }
  return (
    <FormatProvider defaultFormats={defaultFormats}>
      <main>
        <h1>Yo from {country.name}</h1>
        <CityCardList cities={country.cities} countryCode={country.code} />
      </main>
    </FormatProvider>
  );
}

export default Country;
