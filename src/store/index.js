import { createStore } from 'vuex'

export default createStore({
  state: {
    loading: false,
    notification: '',
    player: {},
  },
  getters: {
    loading: state => state.loading,
    notification: state => state.notification,    
    playerSource: state => state.player,
  },
  mutations: {
    setLoading(state, data) {
      state.loading = data;
    },
    setPlayerSource (state, player){
      state.player = player
    },
    togglePlayback (state){
      const newStatus = state.player.status === 'play' ? 'paused' : 'play';
      state.player.status = newStatus;
    },
    setNotification (state, notification){
      state.notification = notification
    }
  },
  actions: {
  }
})
