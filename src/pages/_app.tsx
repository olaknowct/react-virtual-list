import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/layout/layout';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { store } from '../store/store';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Head>
          <title>React Virtual List</title>
          <meta name='description' content='React Virtual List' />
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
