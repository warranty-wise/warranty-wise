import AccountForm from './account-form'
import { createClient } from '@/utils/supabase/server'

const Account = async () => {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  console.log({ user })

  return <AccountForm user={user} />
}

export default Account;