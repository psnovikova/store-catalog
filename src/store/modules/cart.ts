import type { Module } from 'vuex'

interface State {
  items: number[]
}

export const cart: Module<State, any> = {
  namespaced: true,
  state: () => ({
    items: JSON.parse(localStorage.getItem('cart') || '[]'),
  }),
  mutations: {
    ADD_TO_CART(state, productId: number) {
      state.items.push(productId)
      localStorage.setItem('cart', JSON.stringify(state.items))
    },
    REMOVE_FROM_CART(state, productId: number) {
      state.items = state.items.filter(id => id !== productId)
      localStorage.setItem('cart', JSON.stringify(state.items))
    },
  },
  actions: {
    toggleCart({ commit, state }, productId: number) {
      if (state.items.includes(productId)) {
        commit('REMOVE_FROM_CART', productId)
      }
      else {
        commit('ADD_TO_CART', productId)
      }
    },
  },
  getters: {
    isInCart: state => (productId: number) => {
      return state.items.includes(productId)
    },
  },
}
