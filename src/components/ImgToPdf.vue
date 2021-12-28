<template>
  <div style="display: flex;margin: 40px;">
    <div style="height: 800px;min-width:550px;position:relative; z-index:999">
      <embed :src="pdfSrc" type="application/pdf" style="overflow: auto; width: 100%; height: 100%;"/>
    </div>
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
          <a-radio-group v-model="pageSizeRadio" @change="pageSizeChange">
            <a-radio :value="0">a4</a-radio>
            <a-radio :value="1">b3</a-radio>
            <a-radio :value="2">原图尺寸</a-radio>
            <a-radio :value="3">自定义规格</a-radio>
            <a-radio :value="4">自定义尺寸</a-radio>
          </a-radio-group>
        </div>
        <div v-if="pageSizeRadio === 3" style="margin-top: 20px">
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
          <a-input v-model="pageSize" style="width: 400px" placeholder="请输入上面列出来的值，如：a4、b3"/>
        </div>
        <div v-if="pageSizeRadio === 4" style="margin-top: 20px">
          <a-input-number v-model="pageWidth" style="width: 200px" placeholder="如：210"/>
          <span> × </span>
          <a-input-number v-model="pageHeight" style="width: 200px" placeholder="如：297"/>
        </div>
        <div style="margin-top: 20px">
          <div>
            <span style="margin-right: 10px">纸张方向：</span>
            <a-radio-group v-model="pageDirection" :disabled="pageDirectionDisabled">
              <a-radio value="portrait">纵向</a-radio>
              <a-radio value="landscape">横向</a-radio>
            </a-radio-group>
          </div>
        </div>
        <div style="margin-top: 20px">
          <div>
            <span style="margin-right: 10px">左右边距：</span>
            <a-input-number v-model="x" :min="0"/>
          </div>
        </div>
        <div style="margin-top: 20px">
          <div>
            <span style="margin-right: 10px">上下边距：</span>
            <a-input-number v-model="y" :min="0"/>
          </div>
        </div>
        <div style="margin-top: 20px">
          <div>
            <span style="margin-right: 10px">访问密码：</span>
            <a-input style="width: 400px" v-model="password"/>
          </div>
        </div>
        <div style="margin-top: 20px;">
          <a-button type="primary" @click="convert" :loading="loading">导出PDF</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {jsPDF} from "jspdf";

export default {
  name: "ImgToPdf",
  data() {
    return {
      previewVisible: false,
      previewImage: '',
      fileList: [],
      loading: false,
      unitDisabled: false,
      pageDirectionDisabled: false,
      pageSizeRadio: 0,
      pageSize: null,
      pageWidth: null,
      pageHeight: null,
      pageDirection: 'portrait',
      x: 0,
      y: 0,
      unit: 'mm',
      password: null,
      pdfSrc: null,
    };
  },
  methods: {
    convert() {
      if (this.fileList.length === 0) {
        this.$message.warn('请先上传至少一张图片')
        return;
      }
      this.loading = true
      let allPromise = []
      for (let i = 0; i < this.fileList.length; i++) {
        allPromise.push(this.getFormat(this.fileList[i]))
      }
      Promise.all(allPromise).then(() => {
        let file0 = this.fileList[0]
        let doc = new jsPDF({
          orientation: file0.pageDirection,
          unit: this.unit,
          format: file0.pageSize,
          hotfixes: this.unit === 'px' ? ["px_scaling"] : null,
          encryption: {
            ownerPassword: this.password ? this.password : null,
            userPassword: this.password ? this.password : null,
          }
        });
        let zoom = Math.max(file0.width / (doc.getPageWidth(1) - (this.x * 2)), file0.height / (doc.getPageHeight(1) - (this.y * 2)))
        doc.addImage({
          imageData: file0.preview,
          x: this.x,
          y: this.y,
          width: file0.width / zoom,
          height: file0.height / zoom,
        })
        for (let i = 1; i < this.fileList.length; i++) {
          let fileTmp = this.fileList[i]
          doc.addPage(fileTmp.pageSize, fileTmp.pageDirection);
          let zoom = Math.max(fileTmp.width / (doc.getPageWidth(i + 1) - (this.x * 2)), fileTmp.height / (doc.getPageHeight(i + 1) - (this.y * 2)))
          doc.addImage({
            imageData: fileTmp.preview,
            x: this.x,
            y: this.y,
            width: fileTmp.width / zoom,
            height: fileTmp.height / zoom,
          })
        }
        this.pdfSrc = doc.output("bloburi")
        this.loading = false
      }).catch(() => {
        this.$message.error("导出失败")
      })
    },
    getFormat(file) {
      return new Promise((resolve, reject) => {
        file.pageDirection = this.pageDirection
        this.getImgContent(file).then((result) => {
          let img = new Image();
          img.src = result;
          img.onload = () => {
            file.width = img.width
            file.height = img.height
            if (this.pageSizeRadio === 0) {
              file.pageSize = 'a4'
              resolve()
            } else if (this.pageSizeRadio === 1) {
              file.pageSize = 'b3'
              resolve()
            } else if (this.pageSizeRadio === 2) {
              file.pageSize = [img.width + (this.x * 2), img.height + (this.y * 2)]
              file.pageDirection = img.width > img.height ? 'landscape' : 'portrait'
              resolve()
            } else if (this.pageSizeRadio === 3) {
              file.pageSize = this.pageSize
              resolve()
            } else if (this.pageSizeRadio === 4) {
              file.pageSize = [this.pageWidth, this.pageHeight]
              resolve()
            } else {
              reject()
            }
          }
        })
      })
    },
    async handlePreview(file) {
      this.previewImage = file.url || await this.getImgContent(file);
      this.previewVisible = true;
    },
    async getImgContent(file) {
      if (!file.preview) {
        file.preview = await this.getBase64(file.originFileObj);
      }
      return file.preview
    },
    beforeUpload(file) {
      this.fileList = [...this.fileList, file];
      return false;
    },
    handleChange({fileList}) {
      this.fileList = fileList;
    },
    pageSizeChange() {
      if (this.pageSizeRadio === 2) {
        this.unit = 'px'
        this.unitDisabled = true
        this.pageDirectionDisabled = true
      } else {
        this.unit = 'mm'
        this.unitDisabled = false
        this.pageDirectionDisabled = false
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