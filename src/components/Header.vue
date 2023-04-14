<template>
  <div class="header">
    <h1>Songlibrary</h1>
    <player />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import player from './player.vue';

export default {
  components: { player },
  name: "Header",
  props: {
    small: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters(["showHeader"]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header {
  background: rgb(18, 18, 18);
  padding: 1em;
  display: grid;
  grid-template-columns: 1fr 8fr 1fr;
}

</style>
