// 16色のプリセットカラー
export const PRESET_COLORS = [
  { id: 'c1',  hex: '#FF6B6B', name: '赤' },
  { id: 'c2',  hex: '#FF9F43', name: 'オレンジ' },
  { id: 'c3',  hex: '#FECA57', name: '黄色' },
  { id: 'c4',  hex: '#48DBFB', name: 'シアン' },
  { id: 'c5',  hex: '#1DD1A1', name: 'ミント' },
  { id: 'c6',  hex: '#54A0FF', name: 'ブルー' },
  { id: 'c7',  hex: '#5F27CD', name: 'パープル' },
  { id: 'c8',  hex: '#FF9FF3', name: 'ピンク' },
  { id: 'c9',  hex: '#EE5A24', name: '朱色' },
  { id: 'c10', hex: '#F79F1F', name: '深オレンジ' },
  { id: 'c11', hex: '#A3CB38', name: '黄緑' },
  { id: 'c12', hex: '#009432', name: '深い緑' },
  { id: 'c13', hex: '#0652DD', name: '深いブルー' },
  { id: 'c14', hex: '#1289A7', name: 'ティール' },
  { id: 'c15', hex: '#833471', name: '深パープル' },
  { id: 'c16', hex: '#D980FA', name: 'ラベンダー' },
]

// デフォルト出目リスト
export const DEFAULT_ITEMS = [
  { id: 1, label: '項目 1', color: PRESET_COLORS[0].hex },
  { id: 2, label: '項目 2', color: PRESET_COLORS[1].hex },
  { id: 3, label: '項目 3', color: PRESET_COLORS[2].hex },
  { id: 4, label: '項目 4', color: PRESET_COLORS[4].hex },
  { id: 5, label: '項目 5', color: PRESET_COLORS[5].hex },
  { id: 6, label: '項目 6', color: PRESET_COLORS[6].hex },
]

// スピンアニメーション時間（ms）
export const SPIN_DURATION = 4500
