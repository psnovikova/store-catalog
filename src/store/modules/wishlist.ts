import type { Module } from 'vuex'

interface State {
  items: number[]
}

export const wishlist: Module<State, any> = {
  namespaced: true,
  state: () => ({
    items: JSON.parse(localStorage.getItem('wishlist') || '[]'),
  }),
  mutations: {
    ADD_TO_WISHLIST(state, productId: number) {
      state.items.push(productId)
      localStorage.setItem('wishlist', JSON.stringify(state.items))
    },
    REMOVE_FROM_WISHLIST(state, productId: number) {
      state.items = state.items.filter(id => id !== productId)
      localStorage.setItem('wishlist', JSON.stringify(state.items))
    },
  },
  actions: {
    toggleWishlist({ commit, state }, productId: number) {
      if (state.items.includes(productId)) {
        commit('REMOVE_FROM_WISHLIST', productId)
      }
      else {
        commit('ADD_TO_WISHLIST', productId)
      }
    },
  },
  getters: {
    isInWishlist: state => (productId: number) => {
      return state.items.includes(productId)
    },
  },
}
