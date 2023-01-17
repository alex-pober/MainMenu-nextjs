import { createClient } from "@supabase/supabase-js";
import { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function getServerSideProps() {
  let { data } = await supabase.from('countries').select()

  console.log("hello countries")
  return {
    props: {
     countries: data
    },
  }
}

function Page({ countries }) {

useEffect(()=>{

})

  return (
    <>
      <h1>HELLO PRE PRENDER</h1>
      <ul>
        {countries.map((country) => (
          <li key={country.id}>{country.name}</li>
        ))}
      </ul>
    </>
  );
}
export default Page;
