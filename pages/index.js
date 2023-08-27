import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p> Panda trying out NextJS instead of "pure" React</p>
        <p>
          Trying to learn more how NextJS works by working through the official tutorial

        </p>
      </section>
    </Layout>
  );
}
