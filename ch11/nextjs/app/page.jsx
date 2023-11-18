import { getCookie } from "cookies-next";

import { getDefaultFormats } from "./services/cookies";
import { getFrontpageData } from "./services/data";
import { Frontpage } from "./App";

export default async function Page() {
  const cities = await getFrontpageData();
  const defaultFormats = getDefaultFormats(context);
  const myCity = JSON.parse(
    getCookie("nextjs-mycity", context) || "null"
  );
  return (
    <Frontpage
      cities={cities}
      defaultFormats={defaultFormats}
      myCity={myCity}
    />
  );
}
