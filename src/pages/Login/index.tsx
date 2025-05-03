import { useState, ChangeEvent, FormEvent } from 'react'
import supabase from '../../helper/supabaseCliente'

import styles from './index.module.css'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../../assets/img/AKNSolutions_logo.png'
import background from '../../assets/img/background_pc.png'

import { Eye, EyeSlash, XCircle } from 'phosphor-react'
export function Login() {
  const [visible, setVisible] = useState(false)

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

  const clearEmail = () => {
    setEmail('')
  }

  return (
    <div className={styles.container}>
      <img className={styles.logo} src={logo} alt="logo" />
      <img className={styles.background} src={background} alt="background" />
      <div className={styles.login}>
        <h1>Logar na sua conta</h1>
        <button className={styles.google}>
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo" />
          <span>Login com Google</span>
        </button>
        <p>or</p>
        {message && <span>{message}</span>}
        <form onSubmit={handleSubmit}>
          {/* E5E5E5 */}
          <div className={styles.input}>
            <p className={styles.label}>Email</p>
            <input onChange={handleEmailChange} value={email} type="email" placeholder="usuario@gmail.com" required />
            <button type="button" onClick={clearEmail} className={styles.clearButton}>
              <XCircle size={20} />
            </button>
          </div>
          <div className={styles.input}>
            <p className={styles.label}>Senha</p>
            <input
              onChange={handlePasswordChange}
              type={visible ? 'text' : 'password'}
              value={password}
              placeholder="senha"
              required
            />
            <button type="button" className={styles.visibilityPassword} onClick={() => setVisible(!visible)}>
              {visible ? <EyeSlash /> : <Eye />}
            </button>
          </div>

          <div className={styles.remember}>
            <div>
              <input type="checkbox" />
              <p>Lembrar me</p>
            </div>
            <button>Esqueci a senha?</button>
          </div>

          <button type="submit">Logar</button>
        </form>
        <div className={styles.register}>
          <p>Você não tem uma conta?</p>
          <p>
            <NavLink to="/register">Criar</NavLink>
          </p>
        </div>
      </div>
    </div>
  )
}
