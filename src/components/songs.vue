<template>
  <div>
    <h2>Songs</h2>
    <div class="searchWrapper">
      <input
        type="search"
        placeholder="search"
        class="search"
        v-model="search"
        @input="fetchSongs"
      />
      <button @click="onAddSong()"><svg-icon :fa-icon="faAdd" size="18" /></button>
    </div>
    <div v-if="loading"><Spinner/> Loading songs...</div>
    <table v-else>
      <tr v-for="song in songs" :key="song.id">
        <td @click="openSong(song.slug)">{{ song.name }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import Spinner from '../components/Spinner'
import { useLoadSongs } from "@/firebase";
import {faAdd} from "@fortawesome/free-solid-svg-icons";
export default {
  components: {
    Spinner,
  },
  setup() {
    return {
      faAdd
    };
  },
  data() {
    return {
      songs: [],
      search: '',
    };
  },
  computed: {
    ...mapGetters(['loading']),
  },
  mounted() {
    this.fetchSongs();
  },
  methods: {
    ...mapMutations(['setLoading']),

    async fetchSongs() {
      this.setLoading(true);
      const songs = await useLoadSongs();
      this.songs = songs;
      this.setLoading(false);

    },
    openSong(slug) {
      this.$router.push(slug);
    },
    onAddSong(){
      this.$router.push('/addSong');
    }
  },
};
</script>

<style lang="scss" scoped>
.search {
  background-color: #121212;
  color: #cecece;
  padding: 10px 35px 10px 15px;
  border: 1px solid #666;
  border-radius: 100px;
  outline: none;
  margin-bottom: 1em;
  border-style: hidden; /* hide standard table (collapsed) border */
  box-shadow: 0 0 0 1px #666; /* this draws the table border  */
}
button {
  cursor: pointer;
  background-color: #212121;
  color: #cecece;
  border: 1px solid #666;
  border-radius: 100px;
  margin: 0 1em;
  padding: .5em;
  svg {
    margin-top: 2px;
    margin-bottom: -2px;
  }
}
button:hover {
  background-color: #333;
}
td {
  cursor: pointer;
  border: 1px solid #666;
  padding: 1em;
  width: 100%;
}
td:hover {
  background-color: rgba(255, 255, 255, 0.02);
}
.searchWrapper {
  margin: 0 auto;
  width: 90%;
  max-width: 40em;
}
</style>
