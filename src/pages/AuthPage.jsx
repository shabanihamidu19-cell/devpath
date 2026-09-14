import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signIn, signUp } from '../lib/auth'
import styles from './AuthPage.module.css'

export default function AuthPage() {
  const navigate = useNavigate()
  const [mode, setMode] = useState('signin') // 'signin' | 'signup'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)

    try {
      if (mode === 'signup') {
        await signUp({
          email: email.trim(),
          password,
          fullName: fullName.trim() || email.split('@')[0],
          username: email.split('@')[0],
        })
        setMessage('Akaunti imeundwa! Angalia email yako kuthibitisha, au ingia sasa.')
        setMode('signin')
      } else {
        await signIn({ email: email.trim(), password })
        navigate('/')
      }
    } catch (err) {
      setError(err.message || 'Hitilafu imetokea. Jaribu tena.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}>
          Dev<span>Path</span>
        </div>
        <p className={styles.subtitle}>
          {mode === 'signin'
            ? 'Karibu tena — endelea na journey yako'
            : 'Jiunge na learners wa Afrika Mashariki'}
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          {mode === 'signup' && (
            <input
              type="text"
              placeholder="Jina kamili"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={styles.input}
              autoComplete="name"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
            autoComplete="email"
          />

          <input
            type="password"
            placeholder="Password (min 6)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
            minLength={6}
            autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
          />

          {error && <div className={styles.error}>{error}</div>}
          {message && <div className={styles.success}>{message}</div>}

          <button type="submit" className={styles.submit} disabled={loading}>
            {loading ? 'Inafanya...' : mode === 'signin' ? 'Ingia' : 'Jisajili'}
          </button>
        </form>

        <button
          type="button"
          className={styles.switch}
          onClick={() => {
            setMode(mode === 'signin' ? 'signup' : 'signin')
            setError('')
            setMessage('')
          }}
        >
          {mode === 'signin'
            ? 'Huna akaunti? Jisajili'
            : 'Una akaunti? Ingia'}
        </button>
      </div>
    </div>
  )
}
