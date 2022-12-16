<script setup lang="ts">
import type { Ref } from 'vue';
import { ref } from 'vue';

const atkScore: Ref<number> = ref(0)
const defScore: Ref<number> = ref(0)

const chagneAtkScroe = (score: number) => {
  atkScore.value += score
}
const chagneDefScroe = (score: number) => {
  defScore.value += score
}
</script>

<template>
  <div flex w-full>
    <div py-2 bg="atkd" w-full flex justify-center items-center>
      <div i-ri:arrow-left-s-line color-white text-2xl cursor-pointer @click="chagneAtkScroe(-1)" />
      <p color-atk text-3xl font-700 mx-4>{{ atkScore }}</p>
      <div i-ri:arrow-right-s-line color-white text-2xl cursor-pointer @click="chagneAtkScroe(1)" />
    </div>
    <div py-2 bg="defd" w-full flex justify-center items-center>
      <div i-ri:arrow-left-s-line color-white text-2xl cursor-pointer @click="chagneDefScroe(-1)" />
      <p color-def text-3xl font-700 mx-4>{{ defScore }}</p>
      <div i-ri:arrow-right-s-line color-white text-2xl cursor-pointer @click="chagneDefScroe(1)" />
    </div>
  </div>
</template>
