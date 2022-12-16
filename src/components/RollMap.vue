<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import lodash from 'lodash'

import RButton from './RButton.vue';

import mapsData from '../datas/mapsData'
import MapCard from './MapCard.vue';

const publicMaps: Ref<any> = ref(lodash.chunk(mapsData, 5)[0])
const disabledMaps: Ref<number[]> = ref([])

const shuffleMaps = () => {
  publicMaps.value = lodash.chunk(lodash.shuffle(mapsData), 5)[0]
}
</script>

<template>
  <div mx-auto max-w-1660px py-6>
    <div flex py-8>
      <TransitionGroup name="fade">
        <MapCard v-for="(data, i) in publicMaps" :key="data"
          w="1/5"
          :name="data.name"
          :cover="data.cover"
        />
      </TransitionGroup>
    </div>
    <RButton w-70 ma-4 @click="shuffleMaps()">洗牌</RButton>
    <div w-fit mx-auto py-20>
      <p text-4xl text-white mb-6>地图池</p>
      <div grid grid-cols-3 gap-4 mx-auto>
        <div v-for="(data, i) in mapsData" :key="i" relative w-80 h-45 brightness-70 hover:brightness-100 transition-200
          b-1 b-white hover:b-warn>
          <img :src="`/maps/${data.cover}`" alt="Map" w-full h-full object-cover>
          <p color-white text-lg absolute bottom-2 text-center w-full>{{ data.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Transiton */
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translate(30px, 0);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.fade-leave-active {
  position: absolute;
}
</style>