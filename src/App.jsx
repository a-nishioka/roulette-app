import { useState } from 'react'
import Roulette from './components/Roulette'
import ItemList from './components/ItemList'
import ResultModal from './components/ResultModal'
import { DEFAULT_ITEMS } from './constants'
import styles from './App.module.css'

let nextId = DEFAULT_ITEMS.length + 1

function App() {
  const [items, setItems] = useState(DEFAULT_ITEMS)
  const [isSpinning, setIsSpinning] = useState(false)
  const [result, setResult] = useState(null)

  const addItem = (label, color) => {
    setItems(prev => [...prev, { id: nextId++, label, color }])
  }

  const updateItem = (id, changes) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, ...changes } : item))
  }

  const removeItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  const handleResult = (winner) => {
    setResult(winner)
  }

  const closeModal = () => {
    setResult(null)
  }

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.title}>🎡 ルーレット</h1>
        <p className={styles.subtitle}>出目を設定してSTARTを押してください</p>
      </header>

      <main className={styles.main}>
        <section className={styles.rouletteSection}>
          <Roulette
            items={items}
            isSpinning={isSpinning}
            setIsSpinning={setIsSpinning}
            onResult={handleResult}
          />
        </section>

        <section className={styles.listSection}>
          <ItemList
            items={items}
            onAdd={addItem}
            onUpdate={updateItem}
            onRemove={removeItem}
            disabled={isSpinning}
          />
        </section>
      </main>

      {result && (
        <ResultModal result={result} onClose={closeModal} />
      )}
    </div>
  )
}

export default App
