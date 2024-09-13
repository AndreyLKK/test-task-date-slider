<template>
  <div class="content">
    <MySlider

      :minDate="minDate"
      :maxDate="maxDate"
      :minYearWithDate="minYearWithDate"
      :maxYearWithDate="maxYearWithDate"
    />
  </div>
</template>

<script setup lang="ts">
import MySlider from "./components/MySlider.vue";

const minDate: Date = new Date(2000, 1);
const maxDate: Date = new Date(2030, 1);
const minYearWithDate: Date = new Date(2012, 4);
const maxYearWithDate: Date = new Date(2014, 1);
</script>

<style lang="scss">
.content {
  height: 100vh;
  background-color: rgb(232, 232, 232);
}
</style>
