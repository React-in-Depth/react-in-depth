import { useLoaderData } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";

import { getCityData } from "~/services/data";
import { FormatProvider } from "~/format";
import { CityDisplay } from "~/components/cityDisplay";
import {
  getDefaultFormats,
  toggleTemperature,
  toggleTime,
} from "~/services/cookies";

export async function loader({ request, params }) {
  const data = await getCityData(params.cc.toUpperCase(), params.city);
  if (!data) {
    redirect("/");
  }
  if (data.slug !== params.city) {
    return redirect(`/${params.cc}/${data.slug}/`);
  }
  const defaultFormats = await getDefaultFormats(request);
  return json({ data, defaultFormats });
}

export async function action({ request }) {
  const bodyParams = await request.formData();

  if (bodyParams.has("toggle-temperature")) {
    return toggleTemperature(request);
  }
  if (bodyParams.has("toggle-time")) {
    return toggleTime(request);
  }
}

export default function City() {
  const { data, defaultFormats } = useLoaderData();
  return (
    <FormatProvider defaultFormats={defaultFormats}>
      <CityDisplay data={data} />
    </FormatProvider>
  );
}
