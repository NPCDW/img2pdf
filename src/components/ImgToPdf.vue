<template>
  <div style="margin: 40px;">
    <a-upload
        action="#"
        list-type="picture-card"
        accept="image/*"
        :file-list="fileList"
        :before-upload="beforeUpload"
        @preview="handlePreview"
        @change="handleChange"
        :multiple="true"
    >
      <a-icon type="plus"/>
      <div class="ant-upload-text">
        Upload
      </div>
    </a-upload>
    <a-modal v-model="previewVisible" :footer="null" :closable="false">
      <img alt="example" style="width: 100%" :src="previewImage"/>
    </a-modal>
    <div style="margin-top: 40px">
      <div>
        <span style="margin-right: 10px">纸张大小</span>
        <a-radio-group v-model="paperSizeRadio">
          <a-radio :value="0">
            A4
          </a-radio>
          <a-radio :value="1">
            B3
          </a-radio>
          <a-radio :value="2">
            原图尺寸
          </a-radio>
          <a-radio :value="3">
            自定义规格
          </a-radio>
          <a-radio :value="4">
            自定义尺寸
          </a-radio>
        </a-radio-group>
      </div>
      <div v-if="paperSizeRadio === 3" style="margin-top: 20px">
        <a-input v-model="pageSize" style="width: 200px" placeholder="如：A4、B3之类" />
      </div>
      <div v-if="paperSizeRadio === 4" style="margin-top: 20px">
        <a-input v-model="pageWidth" style="width: 200px" placeholder="如：210" />
        <span> × </span>
        <a-input v-model="pageHeight" style="width: 200px" placeholder="如：297" />
      </div>
    </div>
  </div>
</template>

<script>
// import { jsPDF } from "jspdf";

export default {
  name: "ImgToPdf",
  data() {
    return {
      previewVisible: false,
      previewImage: '',
      fileList: [],
      paperSizeRadio: 0,
      pageSize: null,
      pageWidth: null,
      pageHeight: null,
    };
  },
  methods: {
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await this.getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    beforeUpload(file) {
      this.fileList = [...this.fileList, file];
      return false;
    },
    handleChange({fileList}) {
      this.fileList = fileList;
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    }
  },
}
</script>

<style scoped>
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>