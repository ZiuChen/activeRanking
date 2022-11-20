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
  const targetLink = linkMap[type]
  window.open(targetLink)
}
</script>

<template>
  <div class="card">
    <img
      class="cover"
      @click="externalLink({ type: 'rid', id: roomData.roomid })"
      :src="roomData.cover"
      alt="直播间封面"
      crossOrigin="anonymous"
    />

    <div class="content">
      <div class="title" @click="externalLink({ type: 'rid', id: roomData.roomid })">
        {{ roomData.title }}
      </div>
      <div class="info">
        <img
          class="face"
          @click="externalLink({ type: 'uid', id: roomData.uid })"
          :src="roomData.face"
          alt="头像"
        />
        <div class="detail">
          <div class="uname" @click="externalLink({ type: 'uid', id: roomData.uid })">
            {{ roomData.uname }}
          </div>
          <div class="counter">
            <img class="counter-icon" src="../assets/account.svg" alt="icon" />
            <span class="counter-span">{{ roomData.ten_minutes_counter }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@bg-color: #f5f5f5;
@text-color: #262626;
@text-color-lighter: #8c8c8c;
@primary-color: #096dd9;
.card {
  // 子元素一行四个
  box-sizing: border-box;
  flex: 15%;
  // 元素内容
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 250px;
  // 边框
  border-radius: 2%;
  border-color: #d9d9d9;
  border-width: 1px;
  border-style: solid;
  // 背景色
  background-color: @bg-color;
  box-shadow: 0px 0px 3px 0px rgb(0 0 0 / 20%);
  // 边距
  margin: 10px;
  // 子元素圆角
  overflow: hidden;
  // 取消选择行为
  user-select: none;
  // 统一鼠标指针样式
  cursor: default;
  .cover {
    width: 100%;
    height: 125px;
    z-index: 0; // 放大时将被.content遮挡
    cursor: pointer;
    &:hover {
      transform: scale(1.05);
      transform-origin: top;
      transition: all 0.15s;
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    z-index: 1;
    height: 125px;
    .title {
      font-weight: bolder;
      padding: 10px;
      background-color: @bg-color;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
      &:hover {
        color: @primary-color;
        transition: all 0.15s;
      }
    }
    .info {
      display: flex;
      align-items: center;
      padding: 0px 10px;
      .face {
        width: 55px;
        height: 55px;
        border-radius: 50%;
        border-style: solid;
        border-width: 1px;
        border-color: #ffffff;
        margin: 5px;
        cursor: pointer;
      }
      .detail {
        margin: 5px;
        .uname {
          color: @text-color;
          cursor: pointer;
          &:hover {
            color: @primary-color;
            transition: all 0.15s;
          }
        }
        .counter {
          display: flex;
          align-items: center;
          width: fit-content;

          .counter-icon {
            width: 20px;
            height: 20px;
          }
          .counter-span {
            font-size: 14px;
            color: @text-color-lighter;
          }
        }
      }
    }
  }
}
</style>
