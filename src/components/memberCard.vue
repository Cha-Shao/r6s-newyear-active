<script setup lang="ts">
const props = withDefaults(defineProps<{
  name: string
  avatar: string
  isAttacker: boolean
  eliminated?: boolean
  wait?: boolean
}>(), {
  eliminated: false,
})
</script>

<template>
  <div
    ma-2
    :class="[
      props.eliminated ?
      'filter-grayscale op-50' :
      `hover:bg-tint
      hover:scale-125
      hover:transition-200
      box-content
      hover:b-b-8
      hover:b-tinter
      `
    ]"
    bg="white op-50"
    pa="4"
    w="24"
    text="center"
    b="b-8 transparent"
    relative
  >
    <img :src="`/avatar/${props.avatar}`" alt="Avatar" w="full">
    <p text="2xl" mt="2" overflow-x-hidden>{{props.name}}</p>
    <img
      absolute
      bottom="-5"
      left="50%"
      translate-x="-50%"
      :src="props.eliminated ?
              '/icon/dead.png' :
              props.wait ?
              '/icon/wait.png' :
                props.isAttacker ?
                  '/icon/attacker.png' :
                  '/icon/defender.png'
      "
      alt="Type"
    >
  </div>
</template>
