<template>
  <div>ratings</div>
</template>

<script>
import { mapActions } from "vuex";
import { GET_RATINGS } from "store/mutations_type";
export default {
  name: "Ratings",
  methods: {
    ...mapActions([GET_RATINGS])
  },
  mounted() {
    this[GET_RATINGS]();
  }
};
</script>

<style>
</style>
