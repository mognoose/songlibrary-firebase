<template>
  <div class="home">
    <Header />

    <AddSong />
  </div>
</template>

<script>
// @ is an alias to /src
import AddSong from "@/components/addSong.vue";
import Header from "@/components/Header.vue";

export default {
  name: "SongView",
  components: {
    Header,
    AddSong,
  },
};
</script>
