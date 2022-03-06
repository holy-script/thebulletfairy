<template>
  <q-page class="flex flex-center">
    <div
      :id="containerId"
      v-if="downloaded"
    >
    </div>
    <div
      class="placeholder"
      v-else
    >
      <q-spinner-hourglass
        color="primary"
        size="4em"
      />
    </div>
  </q-page>
</template>

<script>
import store from "../store/index";

export default {
  name: "Play",
  data() {
    return {
      downloaded: false,
      gameInstance: null,
      containerId: "game-container",
      value: 0,
    };
  },
  async mounted() {
    const game = await import(/* webpackChunkName: "game" */ "../game/index");
    this.downloaded = true;
    this.$nextTick(() => {
      this.gameInstance = game.launch(this.containerId, store);
    });
  },
  unmounted() {
    this.gameInstance.destroy(false);
  },
  methods: {},
  computed: {},
  store,
};
</script>

<style>
</style>
