<script setup lang="ts">

</script>

<template>
  <div
    ma-4
    hover="
    bg-tint
      scale-125
      transition-200
      box-content
      b-b-8
      b-tinter
      shadow-md"
    bg="white op-50"
    pa="4"
    pb="2"
    w="70"
    b="b-8 transparent"
    >
    <p
    text="2xl">
      <slot />
    </p>
  </div>
</template>
