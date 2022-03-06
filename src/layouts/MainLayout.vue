<template>
  <q-layout>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import store from "../store/index";

export default {
  name: "MainLayout",
  data() {
    return {};
  },
  methods: {},
  computed: {},
  store,
};
</script>
