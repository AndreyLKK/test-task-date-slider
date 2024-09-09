<template>
  <div class="content">
    <MySlider
      :startYear="startYear"
      :endYear="endYear"
      :startYearWithDate="startYearWithDate"
    />
  </div>
</template>

<script setup lang="ts">
import MySlider from "./components/MySlider.vue";

const startYear: number = 2014;
const endYear: number = 2026;
const startYearWithDate: number = 2011;
</script>

<style lang="scss">
.content {
  height: 100vh;
  background-color: rgb(232, 232, 232);
}

</style>
