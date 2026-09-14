import React, { useState } from 'react'
import useAppStore from '../stores/useAppStore'
import styles from './ProfilePage.module.css'

const TABS = ['Journey', 'Projects', 'Badges']
const TECH_CLS = { JS: 'tb-js', JavaScript: 'tb-js', React: 'tb-react', Python: 'tb-python', HTML: 'tb-html', CSS: 'tb-css', 'Node.js': 'tb-node' }

export default function ProfilePage() {
  const profile = useAppStore(s => s.profile)
  const [tab, setTab] = useState(0)
  const pct = Math.round((profile.streak / profile.streakGoal) * 100)

  return (
    <div className={styles.page}>
      {/* Dark header */}
      <div className={styles.darkHeader}>
        <div className={styles.profileTop}>
          <div className={`avatar avatar-lg av-dark`}>{profile.initials}</div>
          <div className={styles.profileInfo}>
            <div className={styles.profileName}>{profile.name}</div>
            <div className={styles.profileRole}>{profile.level}</div>
            <div className={styles.profileLoc}>{profile.country} {profile.city}</div>
          </div>
          <button className={styles.editBtn}>Hariri</button>
        </div>

        {/* Streak bar */}
        <div className={styles.streakBar}>
          <span className={styles.fireEmoji}>🔥</span>
          <div className={styles.streakInfo}>
            <span className={styles.streakNum}>{profile.streak}</span>
            <span className={styles.streakLabel}>day streak</span>
          </div>
          <div className={styles.streakTrack}>
            <div className={styles.streakGoal}>Lengo: Siku {profile.streakGoal}</div>
            <div className={styles.streakRail}>
              <div className={styles.streakFill} style={{ width: `${pct}%` }} role="progressbar" aria-valuenow={profile.streak} aria-valuemax={profile.streakGoal} aria-label="Streak progress" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className={styles.statsRow}>
        <div className={styles.statBox}>
          <div className={styles.statNum}>{profile.stats.projects}</div>
          <div className={styles.statLabel}>Projects</div>
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

      {/* Tech stack */}
      <div className={styles.techRow}>
        <span className={styles.techLabel}>Inajifunza:</span>
        {profile.learning.map(t => (
          <span key={t} className={`tech-badge ${TECH_CLS[t] || 'tb-js'} ${styles.activeTech}`}>{t}</span>
        ))}
        <button className={styles.addTech}>+ Ongeza</button>
      </div>

      {/* Tabs */}
      <div className={styles.tabs} role="tablist">
        {TABS.map((t, i) => (
          <button
            key={t} role="tab"
            aria-selected={tab === i}
            className={`${styles.tab} ${tab === i ? styles.tabActive : ''}`}
            onClick={() => setTab(i)}
          >{t}</button>
        ))}
      </div>

      <div className="scroll-area">
        {tab === 0 && <JourneyTab profile={profile} />}
        {tab === 1 && <ProjectsTab profile={profile} />}
        {tab === 2 && <BadgesTab profile={profile} />}
        <div className="bottom-spacer" />
      </div>
    </div>
  )
}

function JourneyTab({ profile }) {
  return (
    <>
      <p className="section-label">Maendeleo yako</p>
      {profile.journey.map(item => (
        <div key={item.id} className={`${styles.journeyItem} ${item.status === 'current' ? styles.journeyCurrent : ''}`}>
          <div className={`${styles.jDot} ${styles[`jDot_${item.status}`]}`} aria-hidden="true" />
          <div className={styles.jText} style={item.status === 'upcoming' ? { opacity: 0.5 } : {}}>{item.title}</div>
          <div className={`${styles.jMeta} ${item.status === 'current' ? styles.jMetaCurrent : ''}`}>{item.timeAgo}</div>
        </div>
      ))}
    </>
  )
}

function ProjectsTab({ profile }) {
  const TECH_CLS_P = { HTML: 'tb-html', CSS: 'tb-css', JS: 'tb-js' }
  return (
    <>
      <p className="section-label">Projects ({profile.projects.length})</p>
      {profile.projects.map(p => (
        <div key={p.id} className={`card ${styles.projCard}`}>
          <div className={styles.projTop}>
            <div>
              <div className={styles.projName}>{p.name}</div>
              <div className={styles.projAge}>Siku {p.daysAgo} zilizopita</div>
            </div>
            <span style={{ fontSize: 26 }}>{p.emoji}</span>
          </div>
          <div className={styles.projFooter}>
            <div style={{ display: 'flex', gap: 5 }}>
              {p.tech.map(t => <span key={t} className={`tech-badge ${TECH_CLS_P[t] || 'tb-js'}`}>{t}</span>)}
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
        {profile.badges.map(b => (
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
