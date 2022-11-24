import { Provider } from "react-redux";
import "../../styles/globals.css";
import Layout from "../components/layout/layout";
// import newstore from "../store/newstore";
import { store } from "../store/store";
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
