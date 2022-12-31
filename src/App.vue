<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import RankList from './components/RankList.vue';
import RButtonVue from './components/RButton.vue';
import RollMap from './components/RollMap.vue';

const viewPage: Ref<boolean> = ref(false)
</script>

<template>
  <div class="set-background" bg="cover center">
    <RButtonVue
      z-2 fixed top-8 m-0 w-6 h-16 flex justify-center items-center
      :class="[viewPage ? 'left-0' : 'right-0']"
      @click="viewPage = !viewPage"
    >
      <div v-if="viewPage" text-5xl i-ri:arrow-left-s-line />
      <div v-else text-5xl i-ri:arrow-right-s-line />
    </RButtonVue>
    <div min-h-100vh w-full overflow-x-hidden backdrop="blur-lg" bg="hex-00000080">
      <div flex transition-500 :style="{
        transform: `translateX(-${viewPage ? '1' : '0'}00%)`
      }">
        <div w-full shrink-0>
          <RankList />
        </div>
        <div w-full shrink-0>
          <RollMap />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.set-background {
  background-image: url('/bg.jpg');
}
</style>
