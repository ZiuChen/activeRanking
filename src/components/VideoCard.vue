<script setup>
import { computed } from 'vue'

const props = defineProps({
  videoData: {
    type: Object,
    required: true
  },
  rank: {
    type: Number,
    required: true
  }
})

const externalLink = ({ type, id }) => {
  const linkMap = {
    bvid: 'https://www.bilibili.com/video/' + id,
    rid: 'https://live.bilibili.com/' + id,
    uid: 'https://space.bilibili.com/' + id
  }
  return linkMap[type]
}

const coverLink = computed(() => {
  const { pic } = props.videoData
  return pic
})

const rankColorMap = {
  0: 'red',
  1: 'volcano',
  2: 'purple'
}

const rankInfo = computed(() => ({
  text: `${props.rank + 1}`,
  color: rankColorMap[props.rank] !== undefined ? rankColorMap[props.rank] : 'grey'
}))
</script>

<template>
  <a-badge-ribbon
    :text="rankInfo.text"
    :color="rankInfo.color"
    placement="start"
    style="z-index: 1"
  />
  <div class="card">
    <a :href="externalLink({ type: 'bvid', id: videoData.bvid })" target="_blank">
      <img
        class="cover"
        src="../assets/loading.svg"
        v-lazy="coverLink"
        :title="videoData.title"
        alt="cover"
        crossOrigin="anonymous"
      />
    </a>

    <div class="content">
      <a :href="externalLink({ type: 'rid', id: videoData.bvid })" target="_blank">
        <div class="title" :title="videoData.title">
          {{ videoData.title }}
        </div>
      </a>

      <div class="info">
        <a :href="externalLink({ type: 'uid', id: videoData.owner.mid })" target="_blank">
          <img
            class="face"
            src="../assets/loading.svg"
            v-lazy="videoData.owner.face"
            :title="videoData.uname"
            alt="face"
          />
        </a>

        <div class="detail">
          <a :href="externalLink({ type: 'uid', id: videoData.owner.mid })" target="_blank">
            <div class="uname" :title="videoData.owner.name">
              {{ videoData.owner.name }}
            </div>
          </a>

          <div class="status">
            <div class="counter" :title="videoData.total_number_text + '人正在观看'">
              <img class="counter-icon" src="../assets/account.svg" alt="icon" />
              <span class="counter-span">{{ videoData.total_number_text }}</span>
            </div>
            <div class="counter" title="投稿时间">
              <img class="counter-icon" src="../assets/clock.svg" alt="icon" />
              <span class="counter-span">{{
                new Date(videoData.pubdate * 1000).toLocaleDateString()
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '../style/card.less';
</style>
