// Constants
import { createCards } from '../utils/cards'

export const MARKS = [
  {
    mark: '♠',
    name: 'spade'
  },
  {
    mark: '♥',
    name: 'heart'
  },
  {
    mark: '♦',
    name: 'dia'
  },
  {
    mark: '♣',
    name: 'clover'
  },
]

export const ALL_CARDS = createCards(
  _.map(MARKS, 'name'),
  [1, 13]
)
