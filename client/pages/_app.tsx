/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ModalProvider } from '../context/ModalContext';
import { store } from '../store';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <Head>
          <title>MyPokemon</title>
          <meta name='description' content='Netflix clone, made using Next.js' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <ModalProvider>
          <Component {...pageProps} />
        </ModalProvider>
      </Provider>
    </>
  );
}
export default App;
