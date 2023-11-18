import Head from "next/head";
import { Montserrat } from "@next/font/google";

import "./app.css";

const montserrat = Montserrat({ weight: "400", subsets: ["latin"] });

export const metadata = {
  "msapplication-TileColor": "#da532c",
  "theme-color": "#ffffff",
  title: "NextJS Weather App from Job-Ready React",
  description: "A weather app built with NextJS",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
