<script setup>
import ExternalAccountConnectionItem from '../components/ExternalAccountConnectionItem.vue';
import HeaderItem from '../components/HeaderItem.vue';
</script>
<template>
  <HeaderItem />
  <ExternalAccountConnectionItem />
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
