import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'

export default function Account({ session }) {
  const supabase = useSupabaseClient()
  const user = useUser()
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [contactEmail, setContactEmail] = useState(null)
  const [contactNumber, setContactNumber] = useState(null)

  const [menuTitle, setMenuTitle] = useState(null)
  const [menuDescription, setMenuDescription] = useState(null)

  useEffect(() => {
    getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, contact_email, contact_number`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setContactEmail(data.contact_email)
        setContactNumber(data.contact_number)
      }
    } catch (error) {
      alert('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({ username, contactEmail, contactNumber }) {
    try {
      setLoading(true)

      const updates = {
        id: user.id,
        username,
        contact_email: contactEmail,
        contact_number: contactNumber,
        updated_at: new Date().toISOString(),
      }
      console.log(updates)
      let { error } = await supabase.from('profiles').upsert(updates)
      console.log(error)
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
    } finally {
      setLoading(false)
    }
  }

  async function createMenu({menuTitle, menuDescription}){
    try {
      setLoading(true)

      let { error, status } = await supabase
        .from('menu')
        .insert({
          user_id: user.id,
          title: menuTitle,
          description: menuDescription
        })

        if (error && status !== 406) {
          throw error
        }

        setMenuTitle(null)
        setMenuDescription(null)

    } catch (error) {
      console.log(error)
      alert('Error creating menu!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-widget">
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session.user.email} disabled />
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="contactEmail">Contact Email</label>
        <input
          id="contactEmail"
          type="email"
          value={contactEmail || ''}
          onChange={(e) => setContactEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="contactNumber">Contact Number</label>
        <input
          id="contactNumber"
          type="number"
          value={contactNumber || ''}
          onChange={(e) => setContactNumber(e.target.value)}
        />
      </div>

      <div>
        <button
          className="button primary block"
          onClick={() => updateProfile({ username, contactEmail, contactNumber })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <label htmlFor="menuTitle">Menu Title</label>
        <input
          id="menuTitle"
          type="text"
          value={menuTitle || ''}
          onChange={(e) => setMenuTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="menuDescription">Menu Description</label>
        <textarea
          id="menuDescription"
          value={menuDescription || ''}
          onChange={(e) => setMenuDescription(e.target.value)}
        />
      </div>
      <div>
        <button
          className="button primary block"
          onClick={() => createMenu({ menuTitle, menuDescription })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <button className="button block" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
      </div>
    </div>
  )
}
