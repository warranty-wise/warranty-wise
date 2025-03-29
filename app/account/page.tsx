import AccountForm from '../components/Account'
import { createClient } from '@/utils/supabase/server'

const Account = async () => {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return <AccountForm />
}

export default Account;