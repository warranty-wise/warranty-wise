import { login, signup } from './actions'

export default function LoginPage() {
  return (
    <div className='container'>
      <form>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
        <button className ="login" formAction={login}>Log in</button>
        <div className = 'divider' />
        <button className ="signup" formAction={signup}>Sign up</button>
      </form>
    </div>
  )
}