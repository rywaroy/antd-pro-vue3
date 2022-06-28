<template>
    <svg class="svg-icon" aria-hidden="true" v-on="$attrs">
        <use :xlink:href="`#icon-${name}`" />
    </svg>
</template>
<script setup>

defineProps({
    name: String,
});

</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
