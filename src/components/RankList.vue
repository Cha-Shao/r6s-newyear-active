<script setup lang="ts">
import lodash from 'lodash'
import { ref } from 'vue'
import type { Ref } from "vue";

import memberCard from './MemberCard.vue'
import RButton from './RButton.vue';

import membersData from '../datas/membersData.json';
import ScoreBoard from './ScoreBoard.vue';

// 初始化计分板
const rankList: Ref<any> = ref({
  round1: membersData
})
// 初始化淘汰列表
const eliminateList: Ref<any> = ref({
  round1: []
})
// 进行中的回合
const roundNumber: Ref<number> = ref(1)
// 洗牌
const shuffleMembers = () => {
  // 洗牌5次
  for (let index = 0; index < 5; index++) {
    setTimeout(() => {
      rankList.value[`round${roundNumber.value}`] = lodash.shuffle(rankList.value[`round${roundNumber.value}`])
    }, 100 * (index + 1));
  }
}
// 淘汰成员
const eliminateMember = (number: number) => {
  // 是否已淘汰
  if (eliminateList.value[`round${roundNumber.value}`].indexOf(number) > -1) {
    // 是，取消淘汰状态
    eliminateList.value[`round${roundNumber.value}`].forEach((item: any, index: number) => {
      if (item == number)
        delete eliminateList.value[`round${roundNumber.value}`][index]
    })
  }
  else
    // 淘汰列表的现阶段增加成员
    eliminateList.value[`round${roundNumber.value}`].push(number)
}
// 下回合
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
  // 洗一次牌
  shuffleMembers()
}
</script>

<template>
  <div mx-auto max-w-1660px py-6>
    <div py-24>
      <div v-for="(roundData, k) in rankList" :key="k">
        <!-- 分round -->
        <div flex flex-wrap flex-gap-y-20 justify-center mb-20>
          <div w-32 ma-2 mr-6 bg="white op-50" flex flex-wrap items-center justify-center>
            <p v-if="roundData.length != 1" text-7xl font-bold>{{ k.toString().charAt(5) }}</p>
            <img v-else src="/icon/victory.png" alt="Victory" w="50%">
          </div>
          <!-- 分chunk -->
          <div flex flex-wrap v-for="(rowData, i) in lodash.chunk(roundData, 2)" :key="i" mx-6 relative>
            <div flex v-if="rowData.length == 2">
              <TransitionGroup name="fade">
                <!-- 分card -->
                <memberCard v-for="(cardData, j) in rowData" :key="cardData" :name="cardData.name" z-2
                  :avatar="cardData.avatar" @click="eliminateMember(i * 2 + j + 1)"
                  :is-attacker="(i * 2 + j + 1) % 2 > 0" :eliminated="eliminateList[k].indexOf(i * 2 + j + 1) > -1" />
              </TransitionGroup>
              <ScoreBoard v-if="roundData.length != 1" absolute bottom--16 left="50%" transform="translate-x--50%" />
            </div>
            <div v-else>
              <memberCard
                z-2
                v-for="(cardData, j) in rowData" :key="cardData"
                wait
                :name="cardData.name"
                :avatar="cardData.avatar" @click="eliminateMember(i * 2 + j + 1)" :is-attacker="(i * 2 + j + 1) % 2 > 0"
                :eliminated="eliminateList[k].indexOf(i * 2 + j + 1) > -1" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <RButton w-70 ma-4 @click="shuffleMembers()">洗牌</RButton>
    <RButton w-70 ma-4 @click="nextRound()">下回合</RButton>
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