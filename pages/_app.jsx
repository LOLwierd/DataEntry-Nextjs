import Axios from "axios";
import { SWRConfig } from "swr";
import Nav from "../components/Nav";
import SubjectCreateModal from "../components/SubjectCreateModal";
import Layout from "../utils/Layout";
import "../styles/global.scss";
import { Provider } from "../utils/Context";

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
