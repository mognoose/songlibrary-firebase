<template>
  <div class="heading">
    <div>
      <router-link
        :to="previous"
        class="btn round"
        ><svg-icon :fa-icon="faArrowLeft" size="34"
      /></router-link>
    </div>
    <div>
      <h1 v-if="displayHeader">{{ name }}</h1>
    </div>
    <div v-if="sharing">
      <ShareNetwork
        class="btn round"
        style="margin-left: auto;"
        network="whatsapp"
        :url="urlShare()"
        :title="name"
        :description="$route.query.section || 'Songlibrary'"
      >
        <svg-icon :fa-icon="faWhatsapp" size="34" />
      </ShareNetwork>
    </div>
    <div v-else class="btn round" style="margin-left: auto;">
      <svg-icon :fa-icon="faWhatsapp" size="34" style="color: #333;" />
    </div>
  </div>
</template>

<script>
import Spinner from "../components/Spinner";
import { mapGetters, mapMutations } from "vuex";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

export default {
  components: {
    Spinner,
  },
  setup() {
    return {
      faArrowLeft,
      faWhatsapp,
    };
  },
  props: {
    name: {
      type: String,
      default: ''
    },
    sharing: {
      type: Boolean,
      default: true
    },
    displayHeader: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
    };
  },
  mounted() {
  },
  computed: {
    ...mapGetters(["loading"]),
    previous(){
      if(this.$route.params.file) return `/${this.$route.params.song}?section=recordings`
      return this.$route.query.section ? this.$route.path : '/'
    }
  },
  methods: {
    ...mapMutations(["setLoading"]),

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
  align-self: center;
}

.icon {
  align-self: center;
}

</style>
