import { useState, ChangeEvent, FormEvent } from 'react'
import supabase from '../../helper/supabaseCliente'

import styles from './index.module.css'
import { NavLink, useNavigate } from 'react-router-dom'

export function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage('')

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) {
      setMessage(error.message)
      setEmail('')
      setPassword('')

      return
    }

    if (data) {
      // Armazenar a sessão (ou qualquer identificador de autenticação)
      localStorage.setItem('session', JSON.stringify(data.session)) // ou apenas um "true"
      navigate('/')
      return null
    }
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }
  return (
    <div className={styles.container}>
      <h2>Login</h2>
      <br></br>
      {message && <span>{message}</span>}
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleEmailChange}
          value={email}
          type="email"
          placeholder="Email"
          required
        />
        <input
          onChange={handlePasswordChange}
          value={password}
          type="password"
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      <span>
        Don't have an account?
        <NavLink to="/register"> Register</NavLink>
      </span>
    </div>
  )
}
