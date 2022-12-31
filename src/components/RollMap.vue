<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import lodash from 'lodash'

import RButton from './RButton.vue';

import mapsData from '../datas/mapsData'
import MapCard from './MapCard.vue';

const props = defineProps<{
  hideMapPool?: boolean
}>()

const publicMaps: Ref<any> = ref(lodash.chunk(mapsData, 5)[0])
const disabledMaps: Ref<number[]> = ref([])
const activeMaps: Ref<number[]> = ref([0, 1, 2, 3, 4])
const choosedMap: Ref<number | null> = ref(null)
// 洗牌
const shuffleMaps = () => {
  // 重置禁用和活动地图
  disabledMaps.value = []
  activeMaps.value = [0, 1, 2, 3, 4]
  choosedMap.value = null
  // 这个timeout会让在选择地图之后按洗牌的观感更好
  // 不然看着好像没洗牌
  setTimeout(() => {
    publicMaps.value = lodash.chunk(lodash.shuffle(mapsData), 5)[0]
  }, 450);
}
// 禁用地图
const disableMap = (number: number) => {
  // 是否已禁用
  if (disabledMaps.value.indexOf(number) > -1) {
    disabledMaps.value.forEach((item: any, index: number) => {
      if (item == number)
        delete disabledMaps.value[index]
    });
    // 恢复参与随机的地图
    activeMaps.value.push(number)
  }
  else {
    // 增加禁用的地图
    disabledMaps.value.push(number)
    // 去掉参与随机的地图
    activeMaps.value.forEach((item: any, index: number) => {
      if (item == number)
        activeMaps.value.splice(activeMaps.value.indexOf(number), 1)
    });
  }
  console.log(activeMaps.value);
  
}
// 选择地图
const chooseMap = () => {
  choosedMap.value = lodash.shuffle(activeMaps.value)[0]
}
</script>

<template>
  <div mx-auto max-w-1660px py-6>
    <div flex py-8>
      <TransitionGroup name="fade">
        <MapCard v-for="(data, i) in publicMaps" :key="data"
          @click="disableMap(i)"
          :class="[
            choosedMap == i ? 'w-full shrink-0' : 'w-1/5',
            choosedMap == null ? '' : choosedMap == i ? '' : 'display-none'
          ]"
          :name="data.name"
          :cover="data.cover"
          :disabled="disabledMaps.indexOf(i) > -1"
        />
      </TransitionGroup>
    </div>
    <RButton w-70 ma-4 @click="shuffleMaps()">洗牌</RButton>
    <RButton w-70 ma-4 @click="chooseMap()">选择地图</RButton>
    <div w-fit mx-auto py-20 v-show="props.hideMapPool">
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