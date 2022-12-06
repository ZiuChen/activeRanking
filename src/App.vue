<template>
  <a-back-top />

  <a-page-header :ghost="false" style="width: 100%" :title="cPage.title" :sub-title="cPage.desc">
    <template #extra>
      <div id="extra-operation"></div>
      <a-menu mode="horizontal">
        <template v-for="l of linkList" :key="l.key">
          <a-menu-item :class="{ 'ant-menu-item-selected': cPage.key === l.key }">
            <router-link :to="l.key"> {{ l.name }} </router-link>
          </a-menu-item>
        </template>
      </a-menu>
      <a href="https://github.com/XiaoMiku01/vup.loveava.top/issues" target="_blank">
        <img src="./assets/github.svg" alt="Github" style="height: 25px; width: 25px" />
      </a>
    </template>
  </a-page-header>
  <div class="main">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component"></component>
      </keep-alive>
    </router-view>
  </div>
  <a-layout-footer class="footer" style="text-align: center">
    <a href="https://github.com/ZiuChen">
      <img
        src="https://img.shields.io/github/stars/ZiuChen?label=ZiuChen&logo=Github"
        alt="badge"
      />
    </a>
    <a href="https://github.com/XiaoMiku01">
      <img
        src="https://img.shields.io/github/stars/XiaoMiku01?label=XiaoMiku01&logo=Github"
        alt="badge"
      />
    </a>
  </a-layout-footer>
</template>

<script setup>
import { computed, provide } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const linkList = [
  {
    key: 'ranking',
    name: '虚拟区互动人数排行',
    title: '虚拟区10分钟互动人数排行前百',
    desc: '互动包括：弹幕、SC、礼物、舰长'
  },
  {
    key: 'online',
    name: 'AU都在溜什么',
    title: 'AU都在溜什么',
    desc: 'ASOUL相关视频在线观看人数前百'
  }
]

const cPage = computed(() => linkList.filter((l) => route.name === l.key)[0] || linkList[0])

provide('cPage', cPage) // 将放到公共区域 供子组件注入 根据不同页面区分不同operation
</script>

<style lang="less">
@import './style/app.less';
</style>
