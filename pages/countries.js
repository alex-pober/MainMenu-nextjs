import { createClient } from "@supabase/supabase-js";
import { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";


function Page() {

  return (
    <>
      <h1>HELLO PRE PRENDER</h1>
      <Link href="/account">Account</Link>
    </>
  );
}
export default Page;
