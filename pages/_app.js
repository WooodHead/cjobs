import Layout from "../components/Layout";
import "../styles/globals.css";
import "@elastic/eui/dist/eui_theme_light.css";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
