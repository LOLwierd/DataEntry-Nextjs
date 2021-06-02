import Axios from "axios";
import { SWRConfig } from "swr";
import Nav from "../components/Nav";

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
        <Nav />
        <main>
          <Component {...pageProps} />
        </main>
      </Provider>
    </SWRConfig>
  );
};

export default App;
