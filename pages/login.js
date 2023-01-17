import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function Login() {
  return (
    <div style={{maxWidth: "300px", margin: "auto"}}>
      <Auth
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa }}
      theme="dark"
      providers={['google', 'twitter', 'github']}
      />
    </div>
  );
}
