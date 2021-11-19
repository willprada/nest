import {wrapper} from '../components/reducers';

import '../styles/globals.css';

const Scraper = ({ Component, pageProps }) => {  
  return <Component {...pageProps} />
}

export default wrapper.withRedux(Scraper);