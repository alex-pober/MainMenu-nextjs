import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { createClient } from '@supabase/supabase-js'
import Account from '../components/Account'
import Link from 'next/link'
export default function Login() {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <div className="container" style={{ padding: '50px 0 100px 0', maxWidth: '400px', margin: 'auto' }}>
      {!session ? (
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" providers={['google']} />
      ) : (
        <>
          <Account session={session}/>
          <Link href="/countries">Countries</Link>
        </>
      )}
    </div>
  )
}
