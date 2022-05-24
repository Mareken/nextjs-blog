import Layout from '../../components/layout';
import axios from 'axios';
import Head from 'next/head';

export default function Post({ attributes }) {
  return (
    <Layout>
      <Head>
        <title>{attributes.title}</title>
      </Head>

      <p>{attributes.content}</p>
    </Layout>
  );
}

export async function getStaticPaths() {
  try {
    const res = await axios.get('http://localhost:1337/api/posts?fields=content');
    const { data } = res.data;

    const paths = data.map(item => (
      {
        params: {
          id: item.id.toString()
        }
      }
    ))

    return {
      paths,
      fallback: false
    }
  }
  catch (error) {
    console.log(error);
    return { paths: [], fallback: false }
  }
}

export async function getStaticProps({ params }) {
  try {
    const res = await axios.get(`http://localhost:1337/api/posts/${params.id}`);
    const { attributes } = res.data.data;

    return {
      props: {
        attributes
      }
    }
  }
  catch (error) {
    console.log(error);
  }
}