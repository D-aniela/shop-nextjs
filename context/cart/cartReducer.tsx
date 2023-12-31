import { ICartProduct } from '@/interfaces'
import { CartState } from './'

type CartActionType =
  | {
      type: '[Cart] - LoadCart from cookies | storage'
      payload: ICartProduct[]
    }
  | { type: '[Cart] - Update products in cart'; payload: ICartProduct[] }
  | { type: '[Cart] - Change cart quantity'; payload: ICartProduct }
  | { type: '[Cart] - Remove product in cart'; payload: ICartProduct }
  | {
      type: '[Cart] - Update order summary'
      payload: {
        numberOfItems: number
        subtotal: number
        tax: number
        total: number
      }
    }

export const cartReducer = (
  state: CartState,
  action: CartActionType,
): CartState => {
  switch (action.type) {
    case '[Cart] - LoadCart from cookies | storage':
      return {
        ...state,
        cart: [...action.payload],
      }

    case '[Cart] - Update products in cart':
      return {
        ...state,
        cart: [...action.payload],
      }

    case '[Cart] - Change cart quantity':
      return {
        ...state,
        cart: state.cart.map((p) => {
          if (p._id !== action.payload._id) return p
          if (p.size !== action.payload.size) return p
          return action.payload
        }),
      }

    case '[Cart] - Remove product in cart':
      return {
        ...state,
        cart: state.cart.filter(
          (p) =>
            !(p._id === action.payload._id && p.size === action.payload.size),
        ),
      }

    case '[Cart] - Update order summary':
      return {
        ...state,
        ...action.payload,
      }

    default:
      return state
  }
}
