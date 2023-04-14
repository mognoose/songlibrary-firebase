<template>
  <div>
    <Header />
    <Songs />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Songs from "@/components/songs.vue";

export default {
  name: "HomeView",
  components: {
    Header,
    Songs,
  }
};
</script>
