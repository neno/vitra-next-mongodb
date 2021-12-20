import type { AppProps } from 'next/app';
import '../public/fonts/fonts.css';
import 'tailwindcss/tailwind.css';
import { Layout } from '../components';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
