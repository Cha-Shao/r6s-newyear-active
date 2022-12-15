<script setup lang="ts">
import lodash from 'lodash'
import { ref } from 'vue';
import type { Ref } from 'vue'

import memberCard from './components/memberCard.vue';
import RButton from './components/RButton.vue';

import membersData from './membersData'

const rankList: any = ref({
  round1: membersData
})

const eliminateList: any = ref({
  round1: []
})

// 进行中的回合
const roundNumber: Ref<number> = ref(1)

const shuffleMembers = () => {
  for (let index = 0; index < 5; index++) {
    setTimeout(() => {
      rankList.value[`round${roundNumber.value}`] = lodash.shuffle(rankList.value[`round${roundNumber.value}`])
    }, 100 * (index + 1));
  }
}

const eliminateMember = (number: number) => {
  // 是否已淘汰
  if (eliminateList.value[`round${roundNumber.value}`].indexOf(number) > -1) {
    eliminateList.value[`round${roundNumber.value}`].forEach((item: any, index: number) => {
      if (item == number)
        delete eliminateList.value[`round${roundNumber.value}`][index]
    })
  }
  else
    // 淘汰列表的现阶段增加成员
    eliminateList.value[`round${roundNumber.value}`].push(number)
}

const nextRound = () => {
  const tempList = rankList.value[`round${roundNumber.value}`]

  let nextList: any = []
  // 添加幸存者到下一round
  tempList.forEach((item: any, index: number) => {
    if (eliminateList.value[`round${roundNumber.value}`].indexOf(index + 1) < 0) {
      nextList.push(item)
    }
  });
  rankList.value[`round${roundNumber.value + 1}`] = nextList

  roundNumber.value += 1
  // 初始化下回合的淘汰人
  eliminateList.value[`round${roundNumber.value}`] = []
}
</script>

<template>
  <div class="set-background" bg="cover center">
    <div min-h-100vh backdrop="blur-lg" bg="hex-00000080">
      <div mx-auto max-w-1660px>
        <div py-24>
          <div v-for="(roundData, k) in rankList" :key="k">
            <!-- 分round -->
            <div flex flex-wrap justify-center mb-4>
              <div w-32 ma-2 mr-6 bg="white op-50" flex flex-wrap items-center justify-center>
                <p v-if="roundData.length != 1" text-5xl font-bold>{{ k.toString().charAt(5) }}</p>
                <img v-else src="/icon/victory.png" alt="Victory" w="50%">
              </div>
              <!-- 分chunk -->
              <div flex flex-wrap v-for="(rowData, i) in lodash.chunk(roundData, 2)" :key="i" mx-6>
                <TransitionGroup name="fade">
                  <!-- 分card -->
                  <memberCard v-for="(cardData, j) in rowData" :key="cardData" :name="cardData.name"
                    :avatar="cardData.avatar" @click="eliminateMember(i * 2 + j + 1)"
                    :is-attacker="(i * 2 + j + 1) % 2 > 0" :eliminated="eliminateList[k].indexOf(i * 2 + j + 1) > -1" />
                </TransitionGroup>
              </div>
            </div>
          </div>
        </div>
        <RButton @click="shuffleMembers()">洗牌</RButton>
        <RButton @click="nextRound()">下回合</RButton>
        <!-- <div mt-6 pa-4 bg="white op-50">
          <pre>
            <h2 color-red-6>roundNumber:</h2> {{ roundNumber }}
            <h2 color-red-6>rankList:</h2> {{ rankList }}
            <h2 color-red-6>eliminateList:</h2> {{ eliminateList }}
          </pre>
        </div> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.set-background {
  background-image: url('/bg.jpg');
}


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
