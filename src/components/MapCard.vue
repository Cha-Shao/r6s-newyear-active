<script setup lang="ts">
const props = withDefaults(defineProps<{
  name: string
  cover: string
  disabled?: boolean
  choosed?: boolean
}>(), {
  disabled: false,
  choosed: false
})
</script>

<template>
  <div
    h-200
    b-b-8
    b-transparent
    relative
    :class="[
      props.disabled ?
        'filter-grayscale brightness-50'
      : `hover:scale-110
        hover:transition-200
        hover:z-2
        hover:b-tinter
        hover:color-white
      `
    ]">
    <img :src="`/maps/${props.cover}`" alt="Map" h-full w-full object-cover>
    <p text-2xl absolute left-5 top-3 z-2>禁用地图</p>
    <p text-4xl absolute left-5 top-10 z-2>{{props.name}}</p>
    <div
      absolute
      w-full
      h-full
      top-0
      left-0

      bg-gradient-to-tl
      op-75
      from-transparent
      via-transparent
      to-white

      hover="
        bg-gradient-to-b
        from-transparent
        via-transparent
        to-tint
      "
    />
  </div>
</template>
