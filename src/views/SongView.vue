<template>
  <div class="home">
    <Header />

    <Song />
  </div>
</template>

<script>
// @ is an alias to /src
import Song from "@/components/song.vue";
import Header from "@/components/Header.vue";

export default {
  name: "SongView",
  components: {
    Header,
    Song,
  },
};
</script>
