<template>
  <div>
    <div v-if="song">
      <div class="heading">
        <div>
          <router-link
            :to="$route.query.section ? $route.path : '/'"
            class="btn round"
            ><svg-icon :fa-icon="faArrowLeft" size="34"
          /></router-link>
        </div>
        <h1>{{ song.name }}</h1>
        <div>
          <ShareNetwork
            class="btn round"
            style="margin-left: auto;"
            network="whatsapp"
            :url="urlShare()"
            :title="song.name"
            :description="$route.query.section || 'Songlibrary'"
          >
            <svg-icon :fa-icon="faWhatsapp" size="34" />
          </ShareNetwork>
        </div>
      </div>

      <div v-if="$route.query.section === 'recordings'">
        <h2><svg-icon :fa-icon="faHeadphones" /> Recordings</h2>
        <div class="tags">
          <button
            class="tag"
            @click="toggleTag(tag.name)"
            v-for="tag in tags"
            :key="tag.name"
            :class="tag.selected ? 'selectedTag' : 'unselectedTag'"
          >
             {{ tag.name }} <span class="badge">{{tagCount[tag.name]}}</span>
          </button>
        </div>

        <DemoFiles :files="song.recordings" :tags="tags" />
      </div>

      <div class="btn lyrics" v-else-if="$route.query.section === 'chords'">
        <h2><svg-icon :fa-icon="faMusic" /> Chords and Structure</h2>
        <div
          v-if="song.chords"
          v-html="song.chords"
          class="lyricsbody"
        ></div>
        <div v-else style="padding-bottom: 1em">No chords</div>
      </div>

      <div class="btn lyrics" v-else-if="$route.query.section === 'lyrics'">
        <h2><svg-icon :fa-icon="faMicrophone" /> Lyrics</h2>
        <div
          v-if="song.lyrics"
          v-html="song.lyrics"
          class="lyricsbody"
        ></div>
        <div v-else style="padding-bottom: 1em">No lyrics</div>
      </div>

      <div v-else-if="$route.query.section === 'links'">
        <h2><svg-icon :fa-icon="faLink" /> Links</h2>
        <div
          v-if="song.links"
          class="lyricsbody"
        >
          <table>
            <tr v-for="link, i in song.links" :key="i">
              <td><div><a :href="link.url" target="_Blank">{{ link.title }} - {{ link.url }}</a></div></td>
            </tr>
          </table>
        </div>
        <div v-else style="padding-bottom: 1em">No links</div>
      </div>

      <div v-else>
        <div class="btn sectionButton" @click="openSection('recordings')">
          <div class="icon"><svg-icon :fa-icon="faHeadphones" /></div>
          <div class="heading"><h2>Recordings</h2></div>
        </div>
        <div class="btn sectionButton" @click="openSection('chords')">
          <div class="icon"><svg-icon :fa-icon="faMusic" /></div>
          <div class="heading"><h2>Chords</h2></div>
        </div>
        <div class="btn sectionButton" @click="openSection('lyrics')">
          <div class="icon"><svg-icon :fa-icon="faMicrophone" /></div>
          <div class="heading"><h2>Lyrics</h2></div>
        </div>
        <div class="btn sectionButton" @click="openSection('links')">
          <div class="icon"><svg-icon :fa-icon="faLink" /></div>
          <div class="heading"><h2>Links</h2></div>
        </div>
      </div>
      <div style="padding-bottom: 1em"></div>
    </div>
    <div v-else>
      <div class="message" v-if="loading"><Spinner /> Loading song...</div>
      <div class="message" v-else>Song not found</div>
    </div>
    <!-- <pre>{{ song }}</pre> -->
  </div>
</template>

<script>
import Demos from "../components/demos.vue";
import DemoFiles from "../components/files.vue";
import Spinner from "../components/Spinner";
import { mapGetters, mapMutations } from "vuex";
import {
  faArrowLeft,
  faMusic,
  faHeadphones,
  faMicrophone,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import {
  faWhatsapp
} from "@fortawesome/free-brands-svg-icons";
import { useLoadSongs } from "@/firebase";

export default {
  components: {
    DemoFiles,
    Demos,
    Spinner,
  },
  setup() {
    return {
      faArrowLeft,
      faMusic,
      faHeadphones,
      faMicrophone,
      faWhatsapp,
      faLink,
    };
  },
  data() {
    return {
      tags: [
        { name: "demo", selected: false },
        { name: "rehersalrec", selected: false },
        { name: "riff", selected: false },
        { name: "other", selected: false },
      ],
      tagCount: {
        demo: 0,
        rehersalrec: 0,
        riff: 0,
        other: 0,
      },
      song: {},
    };
  },
  mounted() {
    this.fetchSong();
  },
  computed: {
    ...mapGetters(["loading"]),

    filesReversed() {
      return this.song.recordings.reverse();
    },
  },
  methods: {
    ...mapMutations(["setLoading"]),

    async fetchSong() {
      this.setLoading(true);
      const [song] = await useLoadSongs();
      this.song = song;

      this.song.recordings.forEach(rec => {
        if(rec.tag === 'demo') this.tagCount.demo = this.tagCount.demo+1;
        if(rec.tag === 'rehersalrec') this.tagCount.rehersalrec = this.tagCount.rehersalrec+1;
        if(rec.tag === 'riff') this.tagCount.riff = this.tagCount.riff+1;
        if(rec.tag === 'other') this.tagCount.other = this.tagCount.other+1;
      })

      let showTag = 0;
        if (this.tagCount.demo === 0) showTag++;
        if (this.tagCount.riff === 0 && showTag === 1) showTag++;
        if (this.tagCount.rehersalrec === 0 && showTag === 2) showTag++;

      this.tags[showTag].selected = true;
      this.setLoading(false);
    },
    richTextFormat(text) {
      return text;
    },
    toggleTag(tag) {
      return this.tags.map((t) => {
        if (t.name === tag) t.selected = !t.selected;
      });
    },
    tagSelected(tag) {
      const tagName = this.tags.filter((t) => {
        if (t.name === tag) return t;
      });
      return tagName[0].selected;
    },
    openSection(section) {
      this.$router.push("?section=" + section);
    },
    back() {
      this.$router.replace({ query: null });
    },
    urlShare(){
      return window.location
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

</style>
