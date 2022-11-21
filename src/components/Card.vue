<script setup>
const props = defineProps({
  roomData: {
    type: Object,
    required: true
  }
})

const externalLink = ({ type, id }) => {
  const linkMap = {
    uid: 'https://space.bilibili.com/' + id,
    rid: 'https://live.bilibili.com/' + id
  }
  return linkMap[type]
}
</script>

<template>
  <div class="card">
    <a :href="externalLink({ type: 'rid', id: roomData.roomid })" target="_blank">
      <img
        class="cover"
        src="../assets/loading.svg"
        v-lazy="roomData.cover"
        :title="roomData.title"
        alt="cover"
        crossOrigin="anonymous"
      />
    </a>

    <div class="content">
      <a :href="externalLink({ type: 'rid', id: roomData.roomid })" target="_blank">
        <div class="title" :title="roomData.title">
          {{ roomData.title }}
        </div>
      </a>

      <div class="info">
        <a :href="externalLink({ type: 'uid', id: roomData.uid })" target="_blank">
          <img
            class="face"
            src="../assets/loading.svg"
            v-lazy="roomData.face"
            :title="roomData.title"
            alt="face"
          />
        </a>

        <div class="detail">
          <a :href="externalLink({ type: 'uid', id: roomData.uid })" target="_blank">
            <div class="uname" :title="roomData.uname">
              {{ roomData.uname }}
            </div>
          </a>

          <div class="counter" title="互动人数">
            <img class="counter-icon" src="../assets/account.svg" alt="icon" />
            <span class="counter-span">{{ roomData.ten_minutes_counter }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '../style/card.less';
</style>
