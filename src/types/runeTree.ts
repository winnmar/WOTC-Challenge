export interface RuneTreeType {
  title: string
  maxRunePoints: number
  tracks: Record<string, RuneTrackTypeContent>
}

export interface RuneTrackTypeContent {
  trackName: string
  runes: RuneButtonType[]
}

export interface RuneButtonType {
  iconIndex: number
  name: string
  description: string
  isActive: boolean
}
