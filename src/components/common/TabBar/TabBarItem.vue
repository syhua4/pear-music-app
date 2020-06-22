<template>
  <div class="tabbar-item">
    <slot name="tabbar-icon" />
    <slot name="tabbar-text" />
  </div>
</template>

<script>
export default {
  name: 'TabBarItem'
}
</script>

<style lang="scss" scoped>
.tabbar-item {
  display: flex;
  flex-direction: column;
}
</style>
