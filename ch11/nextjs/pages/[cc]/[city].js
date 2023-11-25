import { getCityData } from "../../services/data";
import { getDefaultFormats } from "../../services/cookies";
import { FormatProvider } from "../../format";
import { CityDisplay } from "../../components";

export async function getServerSideProps(context) {
  const { cc, city } = context.query;
  const data = await getCityData(cc.toUpperCase(), city);
  const defaultFormats = getDefaultFormats(context);
  if (data.slug !== city) {
    // Redirect, as city was resolved under a different name
    return {
      redirect: {
        destination: `/${cc}/${data.slug}/`,
        permanent: false,
      },
    };
  }
  return { props: { data, defaultFormats } };
}

function City({ data, defaultFormats }) {
  return (
    <FormatProvider defaultFormats={defaultFormats}>
      <CityDisplay data={data} />
    </FormatProvider>
  );
}

export default City;
