export const state = () => ({
  products: [],
  perPage: 1,
  currentPage: 1,
  totalPages: 1,
  count: 0,
})

export const mutations = {
  setProducts(state, products) {
    state.products = products
  },
  setPerPage (state, perPage) {
    state.perPage = perPage
  },
  setCurrentPage (state, currentPage) {
    state.currentPage = currentPage
  },
  setTotalPages (state, totalPages) {
    state.totalPages = totalPages
  },
  setCount (state, count) {
    state.count = count
  }
}

export const actions = {
  async getPriceList({ commit }, payload) {
    try {
      let url = '/api/v1/prices/'
      if (payload !== undefined) {
        if (payload.search !== undefined) {
          url = `/api/v1/prices?title=${payload.search}`
        } else if (payload.page !== undefined) {
          url = `/api/v1/prices?page=${payload.page}`
        }
      }
      // const url = page === undefined ? '/api/v1/prices/' : `/api/v1/prices?page=${page}`
      const data = await this.$axios.$get(url)
      commit('setProducts', data.results)
      commit('setPerPage', data.per_page)
      commit('setCurrentPage', data.current_page)
      commit('setTotalPages', data.num_pages)
      commit('setCount', data.count)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
}

export const getters = {
  getProducts: (state) => state.products,
}
