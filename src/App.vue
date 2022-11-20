<script setup>
import { ref } from 'vue'
import Card from './components/Card.vue'
import res from './data/data.json'

const roomList = ref([])

if (res.code !== 200) {
  roomList.value = res.data.rooms
  console.log(roomList.value)
} else {
  window.alert('请求出错')
}
</script>

<template>
  <div class="app">
    <div class="overlay">
      <Card v-for="r of roomList" :roomData="r"></Card>
    </div>
  </div>
</template>

<style lang="less" scoped>
.app {
  display: flex;
  justify-content: center;
}
.overlay {
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;
  width: 1100px;
}
</style>
