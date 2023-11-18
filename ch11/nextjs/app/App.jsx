"use client";

import { CityCardList, MyCity } from "./components";
import { FormatProvider } from "./format";

export function Frontpage({ cities, defaultFormats, myCity }) {
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
