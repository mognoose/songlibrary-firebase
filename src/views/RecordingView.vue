<template>
  <div class="home">
    <Header />

    <Recording />
  </div>
</template>

<script>
// @ is an alias to /src
import Recording from "@/components/recording.vue";
import Header from "@/components/Header.vue";

export default {
  name: "RecordingView",
  components: {
    Header,
    Recording,
  },
};
</script>
