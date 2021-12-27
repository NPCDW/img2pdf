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
        <span style="margin-right: 10px">计量单位：</span>
        <a-radio-group v-model="unit" :disabled="unitDisabled">
          <a-radio value="pt">points</a-radio>
          <a-radio value="mm">mm</a-radio>
          <a-radio value="cm">cm</a-radio>
          <a-radio value="in">in</a-radio>
          <a-radio value="px">px</a-radio>
          <a-radio value="pc">pc</a-radio>
          <a-radio value="em">em</a-radio>
          <a-radio value="ex">ex</a-radio>
        </a-radio-group>
      </div>
      <div style="margin-top: 20px">
        <span style="margin-right: 10px">纸张大小：</span>
        <a-radio-group v-model="paperSizeRadio" @change="paperSizeChange">
          <a-radio :value="0">a4</a-radio>
          <a-radio :value="1">b3</a-radio>
          <a-radio :value="2">原图尺寸</a-radio>
          <a-radio :value="3">自定义规格</a-radio>
          <a-radio :value="4">自定义尺寸</a-radio>
        </a-radio-group>
      </div>
      <div v-if="paperSizeRadio === 3" style="margin-top: 20px">
        <ul>
          <li>a0 - a10</li>
          <li>b0 - b10</li>
          <li>c0 - c10</li>
          <li>dl</li>
          <li>letter</li>
          <li>government-letter</li>
          <li>legal</li>
          <li>junior-legal</li>
          <li>ledger</li>
          <li>tabloid</li>
          <li>credit-card</li>
        </ul>
        <a-input v-model="pageSize" style="width: 400px" placeholder="请输入上面列出来的值，如：a4、b3" />
      </div>
      <div v-if="paperSizeRadio === 4" style="margin-top: 20px">
        <a-input-number v-model="pageWidth" style="width: 200px" placeholder="如：210" />
        <span> × </span>
        <a-input-number v-model="pageHeight" style="width: 200px" placeholder="如：297" />
      </div>
      <div style="margin-top: 20px">
        <div>
          <span style="margin-right: 10px">纸张方向：</span>
          <a-radio-group v-model="paperDirection">
            <a-radio value="portrait">纵向</a-radio>
            <a-radio value="landscape">横向</a-radio>
          </a-radio-group>
        </div>
      </div>
      <div style="margin-top: 20px">
        <div>
          <span style="margin-right: 10px">左右边距：</span>
          <a-input-number v-model="x" :min="0" />
        </div>
      </div>
      <div style="margin-top: 20px">
        <div>
          <span style="margin-right: 10px">上下边距：</span>
          <a-input-number v-model="y" :min="0" />
        </div>
      </div>
      <div style="margin-top: 20px">
        <div>
          <span style="margin-right: 10px">旋转角度：</span>
          <a-input-number v-model="rotation" :min="0" :max="359" />
        </div>
      </div>
      <div style="margin-top: 20px">
        <div>
          <span style="margin-right: 10px">访问密码：</span>
          <a-input style="width: 400px" v-model="password" />
        </div>
      </div>
      <div style="margin-top: 20px;">
        <a-button type="primary" @click="convert" :loading="loading">导出PDF</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import { jsPDF } from "jspdf";

export default {
  name: "ImgToPdf",
  data() {
    return {
      previewVisible: false,
      previewImage: '',
      fileList: [],
      loading: false,
      unitDisabled: false,
      paperSizeRadio: 0,
      pageSize: null,
      pageWidth: null,
      pageHeight: null,
      paperDirection: 'portrait',
      rotation: 0,
      x: 0,
      y: 0,
      unit: 'mm',
      password: null,
    };
  },
  methods: {
    async convert() {
      if (this.fileList.length === 0) {
        this.$message.warn('请先上传至少一张图片')
        return;
      }
      this.loading = true
      let format;
      if (this.paperSizeRadio === 0) {
        format = 'a4'
      } else if (this.paperSizeRadio === 1) {
        format = 'b3'
      } else if (this.paperSizeRadio === 2) {
        this.unit = 'px'
        let img = new Image();
        img.src = await this.getImgContent(this.fileList[0]);
        img.onload = () => {
          format = [img.width, img.height]
        };
      } else if (this.paperSizeRadio === 3) {
        format = this.pageSize
      } else if (this.paperSizeRadio === 4) {
        format = [this.pageWidth, this.pageHeight]
      }
      let doc = new jsPDF({
        orientation: this.paperDirection,
        unit: this.unit,
        format,
        hotfixes: this.unit === 'px' ? ["px_scaling"] : null,
        encryption: {
          ownerPassword: this.password ? this.password : null,
          userPassword: this.password ? this.password : null,
        }
      });
      doc.addImage({
        imageData: await this.getImgContent(this.fileList[0]),
        x: this.x,
        y: this.y,
        // width,
        // height,
        rotation: this.rotation,
      })
      for (let i = 1; i < this.fileList.length; i++) {
        if (this.paperSizeRadio === 2) {
          let img = new Image();
          img.src = await this.getImgContent(this.fileList[i]);
          img.onload = () => {
            format = [this.width, this.height]
          };
        }
        doc.addPage(format, this.paperDirection);
        doc.addImage({
          imageData: await this.getImgContent(this.fileList[i]),
          x: this.x,
          y: this.y,
          // width,
          // height,
          rotation: this.rotation,
        })
      }
      doc.save('test.pdf', {returnPromise: true}).finally(() => {
        this.loading = false
      })
    },
    async handlePreview(file) {
      this.previewImage = file.url || await this.getImgContent(file);
      this.previewVisible = true;
    },
    async getImgContent(file) {
      if (!file.url && !file.preview) {
        file.preview = await this.getBase64(file.originFileObj);
      }
      return file.url || file.preview
    },
    beforeUpload(file) {
      this.fileList = [...this.fileList, file];
      return false;
    },
    handleChange({fileList}) {
      this.fileList = fileList;
    },
    paperSizeChange() {
      if (this.paperSizeRadio === 2) {
        this.unit = 'px'
        this.unitDisabled = true
      } else {
        this.unit = 'mm'
        this.unitDisabled = false
      }
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