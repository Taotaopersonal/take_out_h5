<template>
  <div>seller</div>
</template>

<script>
import { mapActions } from "vuex";
import { GET_SELLER } from "store/mutations_type";
export default {
  name: "Seller",
  methods: {
    ...mapActions([GET_SELLER])
  },
  mounted() {
    this[GET_SELLER]();
  }
};
</script>

<style>
</style>
