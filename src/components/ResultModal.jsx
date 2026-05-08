import { useEffect } from 'react'
import styles from './ResultModal.module.css'

export default function ResultModal({ result, onClose }) {
  // ESC キーで閉じる
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.emoji}>🎉</div>
        <p className={styles.resultLabel}>結果</p>
        <div
          className={styles.resultBadge}
          style={{ background: result.color }}
        >
          {result.label}
        </div>
        <p className={styles.hint}>クリックして閉じる</p>
        <button className={styles.closeBtn} onClick={onClose}>
          閉じる
        </button>
      </div>
    </div>
  )
}
