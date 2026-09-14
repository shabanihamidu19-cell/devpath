import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAppStore from '../stores/useAppStore'
import PostCard from '../components/PostCard'
import styles from './FeedPage.module.css'

const POST_TYPES = [
  { type: 'learn', emoji: '🧠', label: 'Nilijifunza' },
  { type: 'bug', emoji: '🐛', label: 'Bug' },
  { type: 'project', emoji: '🚀', label: 'Project' },
  { type: 'question', emoji: '❓', label: 'Swali' },
]

export default function FeedPage() {
  const navigate = useNavigate()
  const posts = useAppStore(s => s.posts)
  const unread = useAppStore(s => s.unreadNotifications)
  const [showCompose, setShowCompose] = useState(false)

  return (
    <div className={styles.page}>
      {/* Top bar */}
      <header className="top-bar">
        <div className="logo">Dev<span>Path</span></div>
        <div className={styles.topActions}>
          <button
            aria-label={`Arifa ${unread > 0 ? `(${unread} mpya)` : ''}`}
            className={styles.iconBtn}
            onClick={() => navigate('/notifications')}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            {unread > 0 && <span className={styles.notifDot} aria-hidden="true" />}
          </button>
        </div>
      </header>

      {/* Scrollable feed */}
      <div className="scroll-area">
        {/* Compose bar */}
        <div className={styles.composeBar} onClick={() => setShowCompose(true)} role="button" tabIndex={0} aria-label="Andika post mpya">
          <div className="avatar avatar-sm av-teal">KT</div>
          <span className={styles.composePlaceholder}>Umejifunza nini leo?</span>
          <div className={styles.composeIcons}>
            {POST_TYPES.map(t => (
              <button
                key={t.type}
                className={styles.composeIcon}
                aria-label={t.label}
                onClick={(e) => { e.stopPropagation(); setShowCompose(true) }}
              >
                {t.emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Active challenge banner */}
        <div className={styles.challengeBanner} onClick={() => navigate('/challenges')} role="button" tabIndex={0} aria-label="Angalia challenge ya JavaScript">
          <div className={styles.challengeIcon}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" aria-hidden="true">
              <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
            </svg>
          </div>
          <div className={styles.challengeText}>
            <div className={styles.challengeName}>30 Days of JavaScript</div>
            <div className={styles.challengeSub}>Day 4 ya 30 · 847 learners</div>
          </div>
          <button className={styles.challengeBtn} onClick={(e) => { e.stopPropagation(); navigate('/challenges') }}>
            Angalia
          </button>
        </div>

        {/* Posts */}
        {posts.map((post, i) => (
          <div key={post.id} style={{ animationDelay: `${i * 0.05}s` }}>
            <PostCard post={post} />
          </div>
        ))}

        <div className="bottom-spacer" />
      </div>

      {/* Compose modal */}
      {showCompose && (
        <ComposeModal onClose={() => setShowCompose(false)} />
      )}
    </div>
  )
}

function ComposeModal({ onClose }) {
  const addPost = useAppStore(s => s.addPost)
  const [selectedType, setSelectedType] = useState('learn')
  const [content, setContent] = useState('')
  const [code, setCode] = useState('')
  const [showCode, setShowCode] = useState(false)

  const POST_TYPES_FULL = [
    { type: 'learn', emoji: '🧠', label: 'Nilijifunza' },
    { type: 'bug', emoji: '🐛', label: 'Bug' },
    { type: 'project', emoji: '🚀', label: 'Project' },
    { type: 'question', emoji: '❓', label: 'Swali' },
    { type: 'challenge', emoji: '🎯', label: 'Challenge' },
    { type: 'progress', emoji: '📈', label: 'Progress' },
  ]

  const handlePost = () => {
    if (!content.trim()) return
    addPost({
      id: Date.now().toString(),
      user: { id: 'me', name: 'KIDCODER TZ', initials: 'KT', avatarColor: 'av-teal', country: '🇹🇿', city: 'Dar es Salaam', streak: 24 },
      type: selectedType,
      content: content.trim(),
      code: code.trim() || null,
      likes: 0, comments: 0, liked: false,
      timeAgo: 'sekunde chache',
      tags: [],
    })
    onClose()
  }

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Andika post mpya">
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <button className={styles.cancelBtn} onClick={onClose}>Ghairi</button>
          <span className={styles.modalTitle}>Post mpya</span>
          <button
            className={`btn-primary ${styles.postBtn}`}
            onClick={handlePost}
            disabled={!content.trim()}
          >
            Post
          </button>
        </div>

        {/* Type selector */}
        <div className={styles.typeRow}>
          {POST_TYPES_FULL.map(t => (
            <button
              key={t.type}
              className={`${styles.typeBtn} ${selectedType === t.type ? styles.typeBtnActive : ''}`}
              onClick={() => setSelectedType(t.type)}
              aria-pressed={selectedType === t.type}
            >
              {t.emoji} {t.label}
            </button>
          ))}
        </div>

        <div className={styles.modalBody}>
          <div className={styles.composeRow}>
            <div className="avatar avatar-sm av-teal">KT</div>
            <textarea
              className={styles.textarea}
              placeholder={selectedType === 'learn' ? 'Umejifunza nini leo?' :
                           selectedType === 'bug' ? 'Elezea bug unayokwama nayo...' :
                           selectedType === 'project' ? 'Elezea project yako...' :
                           selectedType === 'question' ? 'Swali lako ni nini?' :
                           'Shiriki maendeleo yako...'}
              value={content}
              onChange={e => setContent(e.target.value)}
              autoFocus
              rows={4}
            />
          </div>

          {showCode && (
            <textarea
              className={styles.codeInput}
              placeholder="// Weka code hapa..."
              value={code}
              onChange={e => setCode(e.target.value)}
              rows={4}
            />
          )}
        </div>

        <div className={styles.modalActions}>
          <button className={styles.addCodeBtn} onClick={() => setShowCode(!showCode)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
            </svg>
            {showCode ? 'Ondoa code' : 'Ongeza code'}
          </button>
        </div>
      </div>
    </div>
  )
}
