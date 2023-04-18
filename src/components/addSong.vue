<template>
  <div>
    <Heading :name="song.name" :sharing="false" :displayHeading="false" />
    <div class="message" v-if="loading"><Spinner /> Creating song...</div>
    <div v-else class="card">
      <h2>Add Song</h2>
      <div class="form">
        <label for="name">Title</label><input type="text" name="name" v-model="song.name" placeholder="Name of the song (Required)" :class="{error: errors.includes('name')}" @input="clearErrors('name')">
        <label for="name">Chords and Structure</label><textarea type="text" name="name" v-model="song.chords" placeholder="Chords and structure of the song" />
        <label for="name">Lyrics</label><textarea type="text" name="name" v-model="song.lyrics" placeholder="Lyrics of the song" />
        <div class="submit"><button class="button" @click="onSubmit()">Submit</button></div>
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from "../components/Spinner";
import { mapGetters, mapMutations } from "vuex";
import { addSong } from "@/firebase";
import Heading from "../components/heading.vue";

export default {
  components: {
    Spinner,
    Heading,
  },
  setup() {
    return {};
  },
  data() {
    return {
      song: {},
      errors: [],
    };
  },
  mounted() {
    this.fetchSong();
  },
  computed: {
    ...mapGetters(["loading"]),

  },
  methods: {
    ...mapMutations(["setLoading"]),

    async fetchSong() {
    },
    back() {
      this.$router.replace({ query: null });
    },
    async onSubmit(){
      if(!this.song.name) {
        this.errors.push('name')
        return
      }
      this.setLoading(true);
      this.song.slug = this.song.name.replace(' ', '-').toLowerCase();
      await addSong(this.song);
      this.setLoading(false);
      this.$router.push('/'+this.song.slug);
    },
    clearErrors(error){
      const index = this.errors.indexOf(error);
      if (index !== -1) {
        this.errors.splice(index, 1);
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.heading {
  display: grid;
  grid-template-columns: 1fr 8fr 1fr;
  max-width: 1000px;
  margin: 0 auto;
}

video {
  padding: 0px;
  margin: 0px;
  max-width: 100%;
}
.lyricsbody {
  white-space: pre-line;
  font-size: 1.2rem;
  padding: 1em;
  text-align: left;
}
.tags {
  display: flex;
  justify-content: center;
}
.tag {
  min-width: 3em;
  cursor: pointer;
  margin: 0.5em;
  padding: 0.5em;
  padding-left: 0.75em;
  border: 0px;
  border-radius: 1em;
  background: none;
  color: #666;
}
.tag:hover {
  background: #2f2f2f;
  color: #999;
}
.selectedTag {
  background: #333;
  color: #eee;
}
.selectedTag:hover {
  background: #363636;
  color: #fff;
}

.sectionButton {
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
}

.icon {
  align-self: center;
}

.heading {
  align-self: center;
}

.badge {
  display: inline-block;
  border-radius: 50%;
  background: #666;
  color: #2f2f2f;
  height: 15px;
  width: 15px;
}
td{
  div{
    width: 80vw;
    max-width: 800px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}

.form {
  max-width: 700px;
  margin: 0 auto;
  
  :nth-child(3),
  :nth-child(5){
    align-self: start;
  }
  
  .submit{
    text-align: right;
    padding: 0;
    grid-column-start: 2;
    button{
      margin: 0;
    }
  }
  .error {
    border: 1px solid red;
    color: 1px solid red;
  }
}

</style>
