<template>
  <div>
    <div v-if="rec.slug">
      <Heading :name="rec?.name" />
      <DemoFiles :files="[rec]" :tags="[{ name: 'demo', selected: true },{ name: 'rehersalrec', selected: true },{ name: 'riff', selected: true },{ name: 'other', selected: true }]" />
    </div>

    <div v-else>
      <div class="message" v-if="loading"><Spinner /> Loading recording...</div>
      <div class="message" v-else>Recording not found</div>
    </div>
  </div>
</template>

<script>
import Demos from '../components/demos.vue';
import DemoFiles from '../components/files.vue';
import Spinner from '../components/Spinner'
import Heading from '../components/heading.vue';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { faArrowLeft, faMusic, faHeadphones, faMicrophone, faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { useLoadSongBySlug } from "@/firebase";

export default {
  components: {
    DemoFiles,
    Demos,
    Spinner,
    Heading,
  },
  setup() {
		return {
			faArrowLeft, faMusic, faHeadphones, faMicrophone, faWhatsapp, faPlay, faPause
    }
  },
  data() {
    return {
      rec: {},
    };
  },

  mounted() {
    this.fetchRecording();
  },
  computed: {
    ...mapGetters(['loading', 'playerSource']),
  },
  methods: {
    ...mapMutations(['setPlayerSource', 'setLoading']),

    async fetchRecording() {
      this.setLoading(true);
      const res = await useLoadSongBySlug(this.$route.params.song);
      const [song] = res;
      [this.rec] = song.recordings.map(rec => {
          if(rec.slug === this.$route.params.file) return rec;
        })
      this.setLoading(false);
    },
    richTextFormat(text) {
      return documentToHtmlString(text);
    },
    urlShare(){
      return window.location
    },
    dateFormat(date) {
      return this.$luxonDateTime.fromISO(date).setLocale('fi-fi').toLocaleString()
    },
    back() {
      this.$router.replace({'query': null})
    },
    playerAction(status) {
      this.setPlayerSource(
        {
          title: this.rec.fields.title,
          url: this.rec.fields.file.url,
          contentType: this.rec.fields.file.contentType,
          status: status,
        }
      )
    },
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

.demo {
  .round {
    cursor: pointer;
    margin: 0 auto;
  }
}


</style>
