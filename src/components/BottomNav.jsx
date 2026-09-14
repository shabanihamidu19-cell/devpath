import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import useAppStore from '../stores/useAppStore'
import styles from './BottomNav.module.css'

const NAV_ITEMS = [
  { path: '/', label: 'Feed', icon: 'home', activeIcon: 'home-filled' },
  { path: '/explore', label: 'Explore', icon: 'compass', activeIcon: 'compass-filled' },
  { path: '/challenges', label: 'Challenges', icon: 'trophy', activeIcon: 'trophy-filled' },
  { path: '/notifications', label: 'Alerts', icon: 'bell', activeIcon: 'bell-filled' },
  { path: '/profile', label: 'Profile', icon: 'user-circle', activeIcon: 'user-circle-filled' },
]

export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()
  const unread = useAppStore(s => s.unreadNotifications)

  return (
    <nav className={styles.nav} role="navigation" aria-label="Main navigation">
      {NAV_ITEMS.map(item => {
        const isActive = location.pathname === item.path
        return (
          <button
            key={item.path}
            className={`${styles.navItem} ${isActive ? styles.active : ''}`}
            onClick={() => navigate(item.path)}
            aria-label={item.label}
            aria-current={isActive ? 'page' : undefined}
          >
            <span className={styles.iconWrap}>
              <svg className={styles.icon} aria-hidden="true">
                <use href={`#icon-${isActive ? item.activeIcon : item.icon}`} />
              </svg>
              {item.path === '/notifications' && unread > 0 && (
                <span className={styles.badge} aria-label={`${unread} arifa mpya`}>{unread}</span>
              )}
            </span>
            <span className={styles.label}>{item.label}</span>
            {isActive && <span className={styles.dot} aria-hidden="true" />}
          </button>
        )
      })}
    </nav>
  )
}
