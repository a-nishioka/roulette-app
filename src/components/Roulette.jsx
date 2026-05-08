import { useRef, useState } from 'react'
import { SPIN_DURATION } from '../constants'
import styles from './Roulette.module.css'

// SVGの仮想サイズ
const SIZE = 400
const CX = SIZE / 2
const CY = SIZE / 2
const R = SIZE / 2 - 12

// 角度（度）から SVG 上の座標へ変換（0° = 真上、時計回り）
function polarToXY(angleDeg, radius = R) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return {
    x: CX + radius * Math.cos(rad),
    y: CY + radius * Math.sin(rad),
  }
}

// セクターの SVG パスを生成
function sectorPath(index, total) {
  if (total === 1) return null // 1項目は circle で描画
  const angle = 360 / total
  const startDeg = index * angle
  const endDeg = startDeg + angle
  const start = polarToXY(startDeg)
  const end = polarToXY(endDeg)
  const largeArc = angle > 180 ? 1 : 0
  return `M ${CX} ${CY} L ${start.x} ${start.y} A ${R} ${R} 0 ${largeArc} 1 ${end.x} ${end.y} Z`
}

// 項目数に応じてフォントサイズを調整
function calcFontSize(total) {
  if (total <= 4) return 16
  if (total <= 6) return 14
  if (total <= 10) return 12
  return 10
}

// テキストを最大文字数で切り詰める
function truncate(text, max) {
  return text.length > max ? text.slice(0, max) + '…' : text
}

export default function Roulette({ items, isSpinning, setIsSpinning, onResult }) {
  const [rotation, setRotation] = useState(0)
  const currentRotRef = useRef(0)

  const canSpin = items.length >= 1 && !isSpinning

  const spin = () => {
    if (!canSpin) return

    // ランダムに当選インデックスを決定
    const winnerIndex = Math.floor(Math.random() * items.length)
    const sectorAngle = 360 / items.length

    // 当選セクターの中央がポインター（真上）に来る回転角を計算
    const winnerMidAngle = winnerIndex * sectorAngle + sectorAngle / 2
    const targetOffset = (360 - winnerMidAngle + 360) % 360

    // 現在の正規化された角度から targetOffset へ、5〜10周多く回す
    const extraSpins = (5 + Math.floor(Math.random() * 6)) * 360
    const currentNorm = ((currentRotRef.current % 360) + 360) % 360
    let delta = targetOffset - currentNorm
    if (delta <= 0) delta += 360
    const newRotation = currentRotRef.current + extraSpins + delta

    currentRotRef.current = newRotation
    setRotation(newRotation)
    setIsSpinning(true)

    setTimeout(() => {
      setIsSpinning(false)
      onResult(items[winnerIndex])
    }, SPIN_DURATION)
  }

  const fontSize = calcFontSize(items.length)
  const maxChars = items.length <= 6 ? 10 : 6

  return (
    <div className={styles.wrapper}>
      {/* ポインター（▼） */}
      <div className={styles.pointer} aria-hidden="true" />

      {/* ルーレットホイール */}
      <div
        className={styles.wheel}
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: isSpinning
            ? `transform ${SPIN_DURATION}ms cubic-bezier(0.08, 0, 0.05, 1)`
            : 'none',
        }}
      >
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          width="100%"
          height="100%"
          className={styles.svg}
          aria-hidden="true"
        >
          {/* 外枠 */}
          <circle cx={CX} cy={CY} r={R + 6} fill="rgba(255,255,255,0.08)" />

          {items.length === 1 ? (
            // 1項目のみの場合は全円
            (() => {
              const textPos = polarToXY(0, R * 0.62)
              return (
                <g>
                  <circle cx={CX} cy={CY} r={R} fill={items[0].color} />
                  <text
                    x={textPos.x}
                    y={textPos.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={fontSize}
                    fontWeight="700"
                    fill="white"
                    style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.6))' }}
                  >
                    {truncate(items[0].label, maxChars)}
                  </text>
                </g>
              )
            })()
          ) : (
            items.map((item, i) => {
              const angle = 360 / items.length
              const midAngle = i * angle + angle / 2
              const textPos = polarToXY(midAngle, R * 0.62)

              return (
                <g key={item.id}>
                  <path
                    d={sectorPath(i, items.length)}
                    fill={item.color}
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="1.5"
                  />
                  <text
                    x={textPos.x}
                    y={textPos.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={fontSize}
                    fontWeight="700"
                    fill="white"
                    style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.6))' }}
                    transform={`rotate(${midAngle}, ${textPos.x}, ${textPos.y})`}
                  >
                    {truncate(item.label, maxChars)}
                  </text>
                </g>
              )
            })
          )}

          {/* 中心ピン */}
          <circle cx={CX} cy={CY} r={18} fill="white" />
          <circle cx={CX} cy={CY} r={12} fill="#6d28d9" />
        </svg>
      </div>

      {/* STARTボタン */}
      <button
        className={styles.startButton}
        onClick={spin}
        disabled={!canSpin}
        aria-label="ルーレットを回す"
      >
        {isSpinning ? (
          <span className={styles.spinning}>回転中…</span>
        ) : (
          'START'
        )}
      </button>

      {items.length === 0 && (
        <p className={styles.emptyHint}>出目を追加してください</p>
      )}
    </div>
  )
}
