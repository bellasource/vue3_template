<template>
  <hs-container-with-header>
    <router-view />
  </hs-container-with-header>
</template>
<script>
export default {
  name: 'Home',
  components: {},
  data() {
    return {
      title: 'Header',
    };
  },
};
</script>
<style scoped></style>
