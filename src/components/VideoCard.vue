<script setup>
import { computed } from 'vue'
import formatSeconds from '@/utils/formatSeconds'
import useExternalLink from '@/hooks/useExternalLink'
import useRankInfo from '@/hooks/useRankInfo'

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

const [_, handleExternalLinkClick] = useExternalLink()

const rankInfo = useRankInfo(props)

const formattedDuration = computed(() => formatSeconds(props.videoData.duration))
</script>

<template>
  <div class="video-card">
    <a-badge-ribbon
      :text="rankInfo.text"
      :color="rankInfo.color"
      placement="start"
      style="z-index: 1"
    />
    <div class="card">
      <img
        class="cover"
        src="../assets/image.svg"
        v-lazy="props.videoData.pic"
        :title="videoData.title"
        alt="cover"
        @click="handleExternalLinkClick({ type: 'bvid', id: videoData.bvid })"
      />
      <div class="stat">
        <div class="left">
          <div class="counter" title="播放量">
            <img class="counter-icon" src="../assets/play-box-outline.svg" alt="icon" />
            <span class="counter-span">{{
              videoData.stat.view > 10000
                ? parseFloat(videoData.stat.view / 10000).toFixed(1) + 'w'
                : videoData.stat.view
            }}</span>
          </div>
          <div class="counter" title="弹幕数">
            <img class="counter-icon" src="../assets/danmu.svg" alt="icon" />
            <span class="counter-span">{{ videoData.stat.danmaku }}</span>
          </div>
        </div>
        <div class="counter" title="视频时长">
          <span class="counter-span">{{ formattedDuration }}</span>
        </div>
      </div>
      <div class="content">
        <div
          class="title"
          :title="videoData.title"
          @click="handleExternalLinkClick({ type: 'bvid', id: videoData.bvid })"
        >
          {{ videoData.title }}
        </div>
        <div class="info">
          <img
            class="face"
            src="../assets/image.svg"
            v-lazy="videoData.owner.face"
            :title="videoData.uname"
            alt="face"
            @click="handleExternalLinkClick({ type: 'uid', id: videoData.owner.mid })"
          />
          <div class="detail">
            <div
              class="uname"
              :title="videoData.owner.name"
              @click="handleExternalLinkClick({ type: 'uid', id: videoData.owner.mid })"
            >
              {{ videoData.owner.name }}
            </div>
            <div class="status">
              <div class="counter" :title="videoData.total_number_text + '人正在观看'">
                <img class="counter-icon" src="../assets/account.svg" alt="icon" />
                <span class="counter-span">{{ videoData.total_number_text }}</span>
              </div>
              <div class="counter" title="点赞">
                <img class="counter-icon" src="../assets/thumb-up.svg" alt="icon" />
                <span class="counter-span">{{
                  videoData.stat.like > 10000
                    ? parseFloat(videoData.stat.like / 10000).toFixed(1) + 'w'
                    : videoData.stat.like
                }}</span>
              </div>
              <div class="counter" title="投币">
                <img class="counter-icon" src="../assets/coin.svg" alt="icon" />
                <span class="counter-span">{{ videoData.stat.coin }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '../style/card.less';
.stat {
  position: absolute;
  top: 127px;
  width: 94%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  z-index: 1;
  color: #fff;
  background-image: linear-gradient(360deg, black, transparent);

  font-size: 13px;
  .left {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .counter {
    display: flex;
    align-items: center;
    margin-left: 2px;
    padding: 2px 5px;
    &-icon {
      width: 20px;
      height: 20px;
      margin-right: 2px;
    }
  }
}
</style>
