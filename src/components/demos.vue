<template>
  <div class="demo" v-if="hasTag(file, tag)">
    <router-link :to="`${$route.params.song}/${file?.slug}`">
      <h2>
        {{ file?.title }}
      </h2>
    </router-link>
    <small>{{ dateFormat + ' - ' + tag}}</small>
    <h3>{{ file?.description }}</h3>
    <div class="media-container" :class="file?.type === 'audio/mpeg' ? 'audio-container' : 'video-container'">
      <a class="btn round" @click.prevent="playerAction('play')" v-if="playerSource.title !== file.title || playerSource.status !== 'play'"><svg-icon :fa-icon="faPlay" size="34" /></a>
      <a class="btn round" @click.prevent="playerAction('pause')" v-if="playerSource.title === file.title && playerSource.status === 'play'"><svg-icon :fa-icon="faPause" size="34" /></a>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";


export default {
  name: 'Demos',
  props: {
    file: Object,
    tag: String,
  },
  setup() {
		return {
			faPlay, faPause
    }
  },
  computed: {
    ...mapGetters(['playerSource']),
    dateFormat() {
      const date = this.$luxonDateTime.fromSeconds(this.file.createdAt.seconds).setLocale('fi-fi').toLocaleString();
      return date
    }
  },
  methods: {
    ...mapMutations(['setPlayerSource']),

    hasTag(file, tag) {
      if (file.tag === tag) return true;
      if (tag === 'other' && !file.tag) return true;
      return false;
    },
    playerAction(status) {
      this.setPlayerSource(
        {
          title: this.file.title,
          url: process.env.VUE_APP_API_BASE_URL+'files/download/'+this.file.file,
          contentType: this.file.type,
          status: status,
        }
      )
    },
  },
};
</script>

<style lang="scss" scoped>
.demo {
  max-width: 80vw;
  overflow: hidden;
  h3{
    max-width: 100%;
  }
}
video {
  margin-left: 0px;
}
h2{
  margin-bottom: 0px;
}  
small{
  padding: 0px;
  margin: 0px;
}
a:link {
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}

.demo {
  .round {
    cursor: pointer;
    margin: 0 auto;
  }

  .media-container {
    box-sizing: border-box;
    max-width: 320px;
    margin: 0 auto;
  }

  .video-container {
    background: #000;
    padding: 4rem;
  }
}
</style>
