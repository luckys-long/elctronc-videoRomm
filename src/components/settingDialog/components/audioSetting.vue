<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-form label-position="right" label-width="200px" :model="logForm">
          <customer-divider label="音频参数" />
          <el-col :span="16">
            <el-form-item label="播放设备">
              <el-select
                v-model="logForm.outputDevice"
                style="width: 100%"
                placeholder="WASPI:扬声器（Realtk(R)Audio）——(0.0.0.0)..."
              >
                <el-option
                  v-for="item in audioOutputOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="播放增益">
              <el-slider size="small" v-model="logForm.value1" />
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="捕获设备">
              <el-select
                v-model="logForm.inputDevice"
                style="width: 100%"
                placeholder="WASPI:扬声器（Realtk(R)Audio）——(0.0.0.0)..."
              >
                <el-option
                  v-for="item in audioInputOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="捕获增益">
              <el-slider size="small" v-model="logForm.value1" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="捕获级别">
              <div
                class="level"
                v-for="item in [1, 2, 3, 4, 5]"
                :style="{
                  background:
                    microphoneVolume > item
                      ? `rgba(59, 173, 237, ${item / 5})`
                      : '#fff',
                }"
              ></div>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="响铃设备">
              <el-select
                v-model="logForm.region"
                style="width: 100%"
                placeholder="WASPI:扬声器（Realtk(R)Audio）——(0.0.0.0)..."
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="响铃">
              <el-input v-model="logForm.resource" placeholder="Please input">
                <template #append>
                  <el-icon @click.stop="handleFolder"><Folder /></el-icon>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-row>
            <el-col :span="11">
              <el-form-item label="启用回声消除">
                <el-switch v-model="logForm.type" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="">
                <el-button color="#4BBEF7" :dark="true" plain
                  >播放音频</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
          <customer-divider label="音频编码器" />
          <img :src="imgSrc" alt="#" >
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import {
  ElDivider,
  ElForm,
  ElFormItem,
  ElInput,
  ElSwitch,
  ElButton,
  ElSelect,
  ElOption,
  ElSlider,
  ElRow,
  ElCol,
  ElIcon,
  ElMessage,
} from "element-plus";
import { Folder } from "@element-plus/icons-vue";
import { Edit, Delete, Plus } from "@element-plus/icons-vue";
import { useMedia } from "@/hooks/useMedia";
import CustomerDivider from "@/components/customerDivider.vue";

const {
  initDevices,
  audioInputOptions,
  audioOutputOptions,
  getMicroVolume,
  closeStream,
  microphoneVolume,
  stream,
} = useMedia();

const imgSrc=ref()

let analyser;

let constraints = {
  video: false,
  audio: {
    echoCancellation: true, // 回音消除
    noiseSuppression: true, // 降噪
    sampleRate: 44100, // 采样率, 每秒采样次数 44100HZ，每个sample的时间是1/48000秒
    channelCount: { ideal: 2, min: 1 },
  },
};

onMounted(async () => {
  await initDevices();
  navigator.mediaDevices.getUserMedia(constraints).then((mediaStream) => {
    stream.value = mediaStream;
    getMicroVolume(mediaStream);
  });
});

const handleFolder = async () => {
  // 指定读取文件类型
  const options = {
    types: [
      {
        description: "Images",
        accept: { "image/jpeg": ".jpeg" },
      },
    ],
    excludeAcceptAllOption: true,
  };
  try{
     //@ts-ignore
  const arrFileHandle = await window.showOpenFilePicker(options);
  for (const fileHandle of arrFileHandle) {
        // 获取文件内容
        const fileData = await fileHandle.getFile();
        // 读文件数据
        const buffer = await fileData.arrayBuffer();
        // 转成Blod url地址
        let src = URL.createObjectURL(new Blob([buffer]));
        // 在页面中显示
        imgSrc.value=src
    }
  }catch{
    ElMessage.error({message:'选取文件失败'})
  }
 
};

onUnmounted(() => {
  closeStream();
});

const options = [
  {
    value: "Option1",
    label: "Option1",
  },
  {
    value: "Option2",
    label: "Option2",
  },
  {
    value: "Option3",
    label: "Option3",
  },
  {
    value: "Option4",
    label: "Option4",
  },
  {
    value: "Option5",
    label: "Option5",
  },
];
const logForm = ref({
  name: "",
  region: "",
  inputDevice: "",
  outputDevice: "",
  type: "",
  value1: 20,
  resource: "",
});
</script>

<style lang="scss" scoped>
.log-btn {
  @include flexCenter;
}
:deep(.el-input) {
  --el-border-color: #616a73;
}
:deep(.el-input-group__append, .el-input-group__prepend) {
  background: #717377;
}
.el-icon {
  cursor: pointer;
}
.level {
  width: vw(51);
  height: 17px;
  margin-left: 5px;
}
</style>
