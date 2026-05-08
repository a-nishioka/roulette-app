import { useState } from 'react'
import { PRESET_COLORS } from '../constants'
import styles from './ItemList.module.css'

export default function ItemList({ items, onAdd, onUpdate, onRemove, disabled }) {
  const [newLabel, setNewLabel] = useState('')
  const [newColor, setNewColor] = useState(PRESET_COLORS[0].hex)
  const [editingId, setEditingId] = useState(null)

  const handleAdd = () => {
    const label = newLabel.trim()
    if (!label) return
    onAdd(label, newColor)
    setNewLabel('')
    // 次の色を自動で選択
    const currentIdx = PRESET_COLORS.findIndex(c => c.hex === newColor)
    const nextIdx = (currentIdx + 1) % PRESET_COLORS.length
    setNewColor(PRESET_COLORS[nextIdx].hex)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAdd()
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>出目リスト <span className={styles.count}>{items.length}</span></h2>

      {/* 追加フォーム */}
      <div className={styles.addForm}>
        <input
          className={styles.textInput}
          type="text"
          placeholder="新しい出目を入力…"
          value={newLabel}
          onChange={e => setNewLabel(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          maxLength={20}
        />
        <div className={styles.colorRow}>
          <span className={styles.colorLabel}>色を選択</span>
          <div className={styles.swatches}>
            {PRESET_COLORS.map(c => (
              <button
                key={c.id}
                className={`${styles.swatch} ${newColor === c.hex ? styles.swatchActive : ''}`}
                style={{ background: c.hex }}
                title={c.name}
                onClick={() => setNewColor(c.hex)}
                disabled={disabled}
                aria-label={c.name}
              />
            ))}
          </div>
        </div>
        <button
          className={styles.addButton}
          onClick={handleAdd}
          disabled={disabled || !newLabel.trim()}
        >
          ＋ 追加
        </button>
      </div>

      {/* 出目リスト */}
      <ul className={styles.list}>
        {items.map(item => (
          <li key={item.id} className={styles.item}>
            <span
              className={styles.colorDot}
              style={{ background: item.color }}
            />

            {editingId === item.id ? (
              // 編集モード
              <div className={styles.editArea}>
                <input
                  className={styles.editInput}
                  type="text"
                  defaultValue={item.label}
                  maxLength={20}
                  autoFocus
                  onBlur={e => {
                    const val = e.target.value.trim()
                    if (val) onUpdate(item.id, { label: val })
                    setEditingId(null)
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Enter') e.target.blur()
                    if (e.key === 'Escape') setEditingId(null)
                  }}
                />
                {/* 色変更スウォッチ（編集時） */}
                <div className={styles.editSwatches}>
                  {PRESET_COLORS.map(c => (
                    <button
                      key={c.id}
                      className={`${styles.swatch} ${item.color === c.hex ? styles.swatchActive : ''}`}
                      style={{ background: c.hex }}
                      title={c.name}
                      onClick={() => onUpdate(item.id, { color: c.hex })}
                      aria-label={c.name}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <span
                className={styles.label}
                onClick={() => !disabled && setEditingId(item.id)}
                title="クリックで編集"
              >
                {item.label}
              </span>
            )}

            <div className={styles.actions}>
              {editingId !== item.id && (
                <button
                  className={styles.editBtn}
                  onClick={() => setEditingId(item.id)}
                  disabled={disabled}
                  aria-label="編集"
                >
                  ✎
                </button>
              )}
              <button
                className={styles.removeBtn}
                onClick={() => {
                  setEditingId(null)
                  onRemove(item.id)
                }}
                disabled={disabled}
                aria-label="削除"
              >
                ✕
              </button>
            </div>
          </li>
        ))}
      </ul>

      {items.length === 0 && (
        <p className={styles.empty}>出目がありません。追加してください。</p>
      )}
    </div>
  )
}
