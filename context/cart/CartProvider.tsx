import { FC, useReducer, ReactNode, useEffect } from 'react'
import Cookie from 'js-cookie'

import { cartReducer, CartContext } from './'
import { ICartProduct } from '@/interfaces'

export interface CartState {
  cart: ICartProduct[]
  numberOfItems: number
  subtotal: number
  tax: number
  total: number
}

const CART_INITIAL_STATE: CartState = {
  cart: [],
  numberOfItems: 0,
  subtotal: 0,
  tax: 0,
  total: 0,
}

export const CartProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE)

  useEffect(() => {
    const cookieProducts = Cookie.get('cart')
      ? JSON.parse(Cookie.get('cart')!)
      : []
    dispatch({
      type: '[Cart] - LoadCart from cookies | storage',
      payload: cookieProducts,
    })
  }, [])

  useEffect(() => {
    Cookie.set('cart', JSON.stringify(state.cart))
  }, [state.cart])

  useEffect(() => {
    const numberOfItems = state.cart.reduce(
      (prev, current) => current.quantity + prev,
      0,
    )
    const subtotal = state.cart.reduce(
      (prev, current) => current.price * current.quantity + prev,
      0,
    )
    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 1)

    const orderSummary = {
      numberOfItems,
      subtotal,
      tax: subtotal * taxRate,
      total: subtotal * (taxRate + 1),
    }
    dispatch({
      type: '[Cart] - Update order summary',
      payload: orderSummary,
    })
  }, [state.cart])

  const addProductToCart = (product: ICartProduct) => {
    // ! Nivel 1
    // dispatch({ type: '[Cart] - Add product', payload: product })
    // ! Nivel 2
    // const productsInCart = state.cart.filter(
    //   (p) => p._id !== product._id && p.size !== product.size,
    // )
    // dispatch({
    //   type: '[Cart] - Add product',
    //   payload: [...productsInCart, product],
    // })
    // ! Nivel Final
    const productInCart = state.cart.some((p) => p._id === product._id)
    if (!productInCart)
      return dispatch({
        type: '[Cart] - Update products in cart',
        payload: [...state.cart, product],
      })
    const productInCartButDifferentSize = state.cart.some(
      (p) => p._id === product._id && p.size === product.size,
    )
    if (!productInCartButDifferentSize)
      return dispatch({
        type: '[Cart] - Update products in cart',
        payload: [...state.cart, product],
      })
    // Acumular
    const updatedProducts = state.cart.map((p) => {
      if (p._id !== product._id) return p
      if (p.size !== product.size) return p
      // Actualizar la cantidad
      p.quantity += product.quantity
      return p
    })
    return dispatch({
      type: '[Cart] - Update products in cart',
      payload: updatedProducts,
    })
  }

  const updateCartQuantity = (product: ICartProduct) => {
    dispatch({ type: '[Cart] - Change cart quantity', payload: product })
  }

  const removeCartProduct = (product: ICartProduct) => {
    dispatch({ type: '[Cart] - Remove product in cart', payload: product })
  }

  return (
    <CartContext.Provider
      value={{
        ...state,
        // Methods
        addProductToCart,
        updateCartQuantity,
        removeCartProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
