import { useState } from 'react'
import supabase from '../../helper/supabaseCliente'

import styles from './index.module.css'
import { NavLink } from 'react-router-dom'
export function Register() {
  const [email, setEmail] = useState('')
  const [passwrod, setPasswrod] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()
    setMessage('')

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: passwrod,
    })

    if (error) {
      setMessage(error.message)
      return
    }

    if (data) {
      setMessage('User acount created!')
    }

    setEmail('')
    setPasswrod('')
  }

  return (
    <div className={styles.container}>
      <h2>Register</h2>
      <br></br>
      {message && <span>{message}</span>}
      <form onSubmit={handleSubmit}>
        <input
          onChange={e => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="Email"
          required
        />
        <input
          onChange={e => setPasswrod(e.target.value)}
          value={passwrod}
          type="password"
          placeholder="Password"
          required
        />
        <button type="submit">Create Account</button>
      </form>
      <span>
        Already have an account?
        <NavLink to="/login"> Login</NavLink>
      </span>
    </div>
  )
}
