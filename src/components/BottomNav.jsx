import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import useAppStore from '../stores/useAppStore'
import Icon from './Icons'
import styles from './BottomNav.module.css'

const NAV_ITEMS = [
  { path: '/', label: 'Feed', icon: 'home' },
  { path: '/explore', label: 'Explore', icon: 'compass' },
  { path: '/challenges', label: 'Challenges', icon: 'trophy' },
  { path: '/notifications', label: 'Alerts', icon: 'bell' },
  { path: '/profile', label: 'Profile', icon: 'user-circle' },
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
              <Icon
                name={item.icon}
                size={22}
                strokeWidth={isActive ? 2 : 1.6}
                filled={isActive}
                className={styles.icon}
              />
              {item.path === '/notifications' && unread > 0 && (
                <span className={styles.badge} aria-label={`${unread} arifa mpya`}>
                  {unread > 9 ? '9+' : unread}
                </span>
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
