import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { createClient } from '@supabase/supabase-js'
import { useUser } from '@supabase/auth-helpers-react';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

// export async function getStaticProps() {
//   const allPostsData = getSortedPostsData();
//   return {
//     props: {
//       allPostsData,
//     },
//   };
// }

// // cP9UGPsWAobVlVNG

// export default function Home({ allPostsData }) {
//   return (
//     <Layout home>
//       <Head>
//         <title>{siteTitle}</title>
//       </Head>
//       <section className={utilStyles.headingMd}>
//         <p>Hi there! My name is Alex Poberezhskiy and I am a self-taught programmer.
//           I am currently learning how to use the NextJS framework in my work as a developer.
//           Thank you for taking the time to read my self-introduction.</p>
//       <Link href="/posts/first-post">FIRST POST</Link>
//       </section>
//       <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
//         <h2 className={utilStyles.headingLg}>Blog</h2>
//         <ul className={utilStyles.list}>
//           {allPostsData.map(({ id, date, title }) => (
//             <li className={utilStyles.listItem} key={id}>
//               <Link href={`/posts/${id}`}>{title}</Link>
//               <br />
//               <small className={utilStyles.lightText}>
//                 <Date dateString={date} />
//               </small>
//             </li>
//           ))}
//         </ul>
//       </section>
//     </Layout>
//   );
// }

export async function signOut() {
  const { error } = await supabase.auth.signOut()
}

export default function Home() {
  // console.log("USER", useUser())
  return (
    <div style={{maxWidth: "300px", margin: "auto"}}>
      <button onClick={() => {signOut()}}>Log Out</button>
    </div>
  );
}
