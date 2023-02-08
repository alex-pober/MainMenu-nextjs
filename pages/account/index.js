import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { createClient } from "@supabase/supabase-js";
import Account from "../../components/Account";
import Link from "next/link";
export default function Login() {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <>
      {!session ? (
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={["google"]}
        />
      ) : (
        <>
          <Account session={session} />
        </>
      )}
    </>
  );
}
