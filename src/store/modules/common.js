const state = {
  activeName: '首页',
  searchKey: '',
  searchType: 'part',
  userInfo: {}
}

// actions
const actions = {
  changeAcitveName({ commit, state }, acitveName) {
    commit('changeAcitveName', acitveName)
  },

  changeSearchkey({ commit, state }, searchkey) {
    commit('changeSearchkey', searchkey)
  },

  changeSearchType({ commit, state }, searchType) {
    commit('changeSearchType', searchType)
  },

  changeUserInfo({ commit, state }, userInfo) {
    commit('changeUserInfo', userInfo)
  }
}

// mutations
const mutations = {
  changeAcitveName(state, activeName) {
    state.activeName = activeName
  },

  changeSearchkey(state, searchkey) {
    state.searchKey = searchkey
  },

  changeSearchType(state, searchType) {
    state.searchType = searchType
  },

  changeUserInfo(state, userInfo) {
    state.userInfo = userInfo
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}