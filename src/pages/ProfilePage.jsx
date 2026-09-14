import React, { useState } from 'react'
import useAppStore from '../stores/useAppStore'
import useTranslation from '../i18n/useTranslation'
import styles from './ProfilePage.module.css'

const TECH_CLS = {
  JS: 'tb-js',
  JavaScript: 'tb-js',
  React: 'tb-react',
  Python: 'tb-python',
  HTML: 'tb-html',
  CSS: 'tb-css',
  'Node.js': 'tb-node',
}

export default function ProfilePage() {
  const profile = useAppStore((s) => s.profile)
  const { t, lang, setLanguage } = useTranslation()
  const [tab, setTab] = useState(0)
  const pct = Math.round((profile.streak / profile.streakGoal) * 100)

  const TABS = [t('profile.journey'), t('profile.projects'), t('profile.badges')]

  return (
    <div className={styles.page}>
      {/* Dark header */}
      <div className={styles.darkHeader}>
        <div className={styles.profileTop}>
          <div className={`avatar avatar-lg av-dark`}>{profile.initials}</div>
          <div className={styles.profileInfo}>
            <div className={styles.profileName}>{profile.name}</div>
            <div className={styles.profileRole}>{t('profile.level')}</div>
            <div className={styles.profileLoc}>
              {profile.country} {profile.city}
            </div>
          </div>
          <button className={styles.editBtn}>{t('profile.edit')}</button>
        </div>

        {/* Streak bar */}
        <div className={styles.streakBar}>
          <span className={styles.fireEmoji}>🔥</span>
          <div className={styles.streakInfo}>
            <span className={styles.streakNum}>{profile.streak}</span>
            <span className={styles.streakLabel}>{t('profile.streak', { count: '' }).replace(/\d+\s*/, '').trim() || 'day streak'}</span>
          </div>
          <div className={styles.streakTrack}>
            <div className={styles.streakGoal}>
              {lang === 'sw' ? `Lengo: Siku ${profile.streakGoal}` : `Goal: ${profile.streakGoal} days`}
            </div>
            <div className={styles.streakRail}>
              <div
                className={styles.streakFill}
                style={{ width: `${pct}%` }}
                role="progressbar"
                aria-valuenow={profile.streak}
                aria-valuemax={profile.streakGoal}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className={styles.statsRow}>
        <div className={styles.statBox}>
          <div className={styles.statNum}>{profile.stats.projects}</div>
          <div className={styles.statLabel}>{t('profile.projects')}</div>
        </div>
        <div className={styles.statBox}>
          <div className={styles.statNum}>{profile.stats.challenges}</div>
          <div className={styles.statLabel}>Challenges</div>
        </div>
        <div className={styles.statBox}>
          <div className={styles.statNum}>{profile.stats.activities}</div>
          <div className={styles.statLabel}>Activities</div>
        </div>
      </div>

      {/* Language Switcher */}
      <div className={styles.techRow} style={{ justifyContent: 'space-between' }}>
        <span className={styles.techLabel}>{t('profile.language')}:</span>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            className={`tech-badge ${lang === 'sw' ? 'tb-js' : ''}`}
            style={{
              cursor: 'pointer',
              border: lang === 'sw' ? '1.5px solid var(--brand-teal)' : '1px solid var(--border)',
              background: lang === 'sw' ? 'var(--brand-teal-light)' : 'var(--bg-muted)',
            }}
            onClick={() => setLanguage('sw')}
          >
            🇹🇿 {t('profile.languageSw')}
          </button>
          <button
            className={`tech-badge ${lang === 'en' ? 'tb-js' : ''}`}
            style={{
              cursor: 'pointer',
              border: lang === 'en' ? '1.5px solid var(--brand-teal)' : '1px solid var(--border)',
              background: lang === 'en' ? 'var(--brand-teal-light)' : 'var(--bg-muted)',
            }}
            onClick={() => setLanguage('en')}
          >
            🇬🇧 {t('profile.languageEn')}
          </button>
        </div>
      </div>

      {/* Tech stack */}
      <div className={styles.techRow}>
        <span className={styles.techLabel}>{lang === 'sw' ? 'Inajifunza:' : 'Learning:'}</span>
        {profile.learning.map((tech) => (
          <span key={tech} className={`tech-badge ${TECH_CLS[tech] || 'tb-js'} ${styles.activeTech}`}>
            {tech}
          </span>
        ))}
      </div>

      {/* Tabs */}
      <div className={styles.tabs} role="tablist">
        {TABS.map((label, i) => (
          <button
            key={label}
            role="tab"
            aria-selected={tab === i}
            className={`${styles.tab} ${tab === i ? styles.tabActive : ''}`}
            onClick={() => setTab(i)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="scroll-area">
        {tab === 0 && <JourneyTab profile={profile} />}
        {tab === 1 && <ProjectsTab profile={profile} lang={lang} />}
        {tab === 2 && <BadgesTab profile={profile} />}
        <div className="bottom-spacer" />
      </div>
    </div>
  )
}

function JourneyTab({ profile }) {
  return (
    <>
      <p className="section-label">Journey</p>
      {profile.journey.map((item) => (
        <div
          key={item.id}
          className={`${styles.journeyItem} ${item.status === 'current' ? styles.journeyCurrent : ''}`}
        >
          <div className={`${styles.jDot} ${styles[`jDot_${item.status}`]}`} aria-hidden="true" />
          <div className={styles.jText} style={item.status === 'upcoming' ? { opacity: 0.5 } : {}}>
            {item.title}
          </div>
          <div className={`${styles.jMeta} ${item.status === 'current' ? styles.jMetaCurrent : ''}`}>
            {item.timeAgo}
          </div>
        </div>
      ))}
    </>
  )
}

function ProjectsTab({ profile, lang }) {
  const TECH_CLS_P = { HTML: 'tb-html', CSS: 'tb-css', JS: 'tb-js' }
  return (
    <>
      <p className="section-label">
        Projects ({profile.projects.length})
      </p>
      {profile.projects.map((p) => (
        <div key={p.id} className={`card ${styles.projCard}`}>
          <div className={styles.projTop}>
            <div>
              <div className={styles.projName}>{p.name}</div>
              <div className={styles.projAge}>
                {lang === 'sw' ? `Siku ${p.daysAgo} zilizopita` : `${p.daysAgo} days ago`}
              </div>
            </div>
            <span style={{ fontSize: 26 }}>{p.emoji}</span>
          </div>
          <div className={styles.projFooter}>
            <div style={{ display: 'flex', gap: 5 }}>
              {p.tech.map((tech) => (
                <span key={tech} className={`tech-badge ${TECH_CLS_P[tech] || 'tb-js'}`}>
                  {tech}
                </span>
              ))}
            </div>
            <span style={{ fontSize: 12, color: 'var(--coral-text)', display: 'flex', alignItems: 'center', gap: 4 }}>
              ❤️ {p.likes}
            </span>
          </div>
        </div>
      ))}
    </>
  )
}

function BadgesTab({ profile }) {
  return (
    <>
      <p className="section-label">Achievements ({profile.badges.length})</p>
      <div className={styles.badgesGrid}>
        {profile.badges.map((b) => (
          <div key={b.id} className={`card ${styles.badgeCard}`}>
            <div className={styles.badgeEmoji}>{b.emoji}</div>
            <div className={styles.badgeName}>{b.name}</div>
            <div className={styles.badgeDesc}>{b.desc}</div>
          </div>
        ))}
      </div>
    </>
  )
}
