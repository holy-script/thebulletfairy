<template>
  <q-btn
    color="white"
    text-color="black"
    label="Standard"
    :onclick="onClick"
  />
</template>

<script>
import store from "../store/index";

export default {
  name: "TitleUI",
  data() {
    return {};
  },
  methods: {
    onClick: function () {
      store.commit("Play");
    },
  },
  store,
};
</script>
