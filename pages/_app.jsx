import Axios from "axios";
import { SWRConfig } from "swr";
import Nav from "../components/Nav";
import SubjectCreateModal from "../components/SubjectCreateModal";
import Layout from "../utils/Layout";
import "../styles/global.scss";
import { Provider } from "../utils/Context";
import Router from "next/router";
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress

//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

Axios.defaults.withCredentials = true;

const App = ({ Component, pageProps }) => {
  return (
    <SWRConfig
      value={{
        fetcher: (url) =>
          Axios(url)
            .then((r) => r.data)
            .catch((e) => console.error(e)),
      }}
    >
      <Provider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </SWRConfig>
  );
};

export default App;
