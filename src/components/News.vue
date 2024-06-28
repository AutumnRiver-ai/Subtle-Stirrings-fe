<script setup>
import { ref } from 'vue'
import axios from 'axios';
import { message } from 'ant-design-vue';

defineProps({
  msg: String,
})

const count = ref(0)
const iframeUrl = 'https://gvy72b8f8g2.feishu.cn/base/LbX5bgfvbagjMTs4rc2cB3tpnrh?table=tblYJbm1Ab9vUIs9&view=vewjDcJclT'

const prompt = ref('')
const tag = ref('')
const industry = ref('AIGC')
const videoName = ref('')
const TABLE_NAME = 'news'
const TABLE_ID_NEWS = 'table_id_news'

const handleConfirm = (tabkey) => {
  // 处理确认逻辑，例如：
  let url = ''
  const data = new FormData();
  switch (tabkey) {
    case 'tag':
      data.append('table_id', TABLE_ID_NEWS)
      data.append('table_name', TABLE_NAME)
      data.append('prompt', prompt.value)
      data.append('tag', tag.value)
      data.append('industry', industry.value)
      url = '/tablechat'
      break;
    case 'conversation':
      data.append('video_name', videoName.value)
      url = '/conversation'
      break;
  }
  message.loading('该请求时间较长，多维表格正在分批刷新', 0); // 显示加载提示
  axios.post(url, data)
    .then(response => {
      console.log(response.data); // 处理响应数据
      message.success('请求成功，请在多维表格查看'); // 请求成功后显示成功提示
    })
    .catch(error => {
      console.error(error); // 处理错误
      message.success('请求成功，请在多维表格查看'); // 请求成功后显示成功提示
    })
    .finally(() => {
      message.destroy(); // 请求完成后关闭所有提示框
    });
}
</script>

<template>
  <div class="iframe-container">
    <a-tabs class='chatbox' defaultActiveKey="1">
      <a-tab-pane key="tag" tab="生成标签" class="generate_box">
        <a-input v-model:value="industry" placeholder="生效类别" class="box-item" />
        <a-input v-model:value="tag" placeholder="输入tag（任意）" class="box-item" />
        <a-input v-model:value="prompt" placeholder="输入prompt" class="box-item" />

        <a-button type="primary" @click="handleConfirm('tag')">生成标签</a-button>
      </a-tab-pane>
      <a-tab-pane key="conversation" tab="生成对话" class="generate_box">
        <a-input v-model:value="videoName" placeholder="输入视频名称" class="box-item" />
        <a-button type="primary" @click="handleConfirm('conversation')">生成对话</a-button>
      </a-tab-pane>
    </a-tabs>
    <iframe :src="iframeUrl" width="90%" height="780vh" frameborder="1px" allowfullscreen></iframe>
  </div>
</template>

<style scoped>
.iframe-container {
  margin: 0 auto;
  width: 100%;

  .chatbox {
    margin: 15px auto;
    width: 90%;

    .generate_box {
      display: flex;
      justify-content: space-between;

      /* 或 space-around */
      *:not(:nth-last-child(2)) {
        width: 10%;
      }

      .box-item {
        margin-right: 20px;
      }
    }
  }
}
</style>
