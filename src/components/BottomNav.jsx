import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import useAppStore from '../stores/useAppStore'
import useTranslation from '../i18n/useTranslation'
import Icon from './Icons'
import styles from './BottomNav.module.css'

const NAV_ITEMS = [
  { path: '/', key: 'nav.feed', icon: 'home' },
  { path: '/explore', key: 'nav.explore', icon: 'compass' },
  { path: '/challenges', key: 'nav.challenges', icon: 'trophy' },
  { path: '/notifications', key: 'nav.alerts', icon: 'bell' },
  { path: '/profile', key: 'nav.profile', icon: 'user-circle' },
]

export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()
  const unread = useAppStore((s) => s.unreadNotifications)
  const { t } = useTranslation()

  return (
    <nav className={styles.nav} role="navigation" aria-label="Main navigation">
      {NAV_ITEMS.map((item) => {
        const isActive = location.pathname === item.path
        const label = t(item.key)
        return (
          <button
            key={item.path}
            className={`${styles.navItem} ${isActive ? styles.active : ''}`}
            onClick={() => navigate(item.path)}
            aria-label={label}
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
                <span className={styles.badge} aria-label={`${unread} ${t('nav.alerts')}`}>
                  {unread > 9 ? '9+' : unread}
                </span>
              )}
            </span>
            <span className={styles.label}>{label}</span>
            {isActive && <span className={styles.dot} aria-hidden="true" />}
          </button>
        )
      })}
    </nav>
  )
}
