<template>
  <div style="display: flex;margin: 40px;">
    <div style="height: 800px;min-width:550px;position:relative; z-index:999">
      <embed :src="pdfSrc" type="application/pdf" style="overflow: auto; width: 100%; height: 100%;"/>
    </div>
    <div style="margin: 40px;">
      <el-upload action="#" list-type="picture-card" :auto-upload="false" accept="image/*" :file-list="fileList"
                 :multiple="true" :on-change="handleChange">
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{file}">
            <el-image fit="cover" style="width: 150px; height: 150px" :src="file.url" alt=""/>
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-left" @click="handleMove(file, 'left')">
                <i class="el-icon-back"></i>
              </span>
              <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                <i class="el-icon-zoom-in"></i>
              </span>
              <span class="el-upload-list__item-delete" @click="handleRemove(file)">
                <i class="el-icon-delete"></i>
              </span>
              <span class="el-upload-list__item-right" @click="handleMove(file, 'right')">
                <i class="el-icon-right"></i>
              </span>
            </span>
          </div>
      </el-upload>
      <el-dialog :visible.sync="previewVisible">
        <img style="width: 100%" :src="previewImage" alt=""/>
      </el-dialog>
      <div style="margin-top: 40px">
        <div>
          <span style="margin-right: 10px">计量单位：</span>
          <el-radio-group v-model="unit" :disabled="unitDisabled">
            <el-radio label="pt">points</el-radio>
            <el-radio label="mm">mm</el-radio>
            <el-radio label="cm">cm</el-radio>
            <el-radio label="in">in</el-radio>
            <el-radio label="px">px</el-radio>
            <el-radio label="pc">pc</el-radio>
            <el-radio label="em">em</el-radio>
            <el-radio label="ex">ex</el-radio>
          </el-radio-group>
        </div>
        <div style="margin-top: 20px">
          <span style="margin-right: 10px">纸张大小：</span>
          <el-radio-group v-model="pageSizeRadio" @change="pageSizeChange">
            <el-radio :label="0">a4</el-radio>
            <el-radio :label="1">b3</el-radio>
            <el-radio :label="2">原图尺寸</el-radio>
            <el-radio :label="3">自定义规格</el-radio>
            <el-radio :label="4">自定义尺寸</el-radio>
          </el-radio-group>
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
          <el-input v-model="pageSize" style="width: 400px" placeholder="请输入上面列出来的值，如：a4、b3"/>
        </div>
        <div v-if="pageSizeRadio === 4" style="margin-top: 20px">
          <el-input-number v-model="pageWidth" style="width: 200px" placeholder="如：210"/>
          <span> × </span>
          <el-input-number v-model="pageHeight" style="width: 200px" placeholder="如：297"/>
        </div>
        <div style="margin-top: 20px">
          <div>
            <span style="margin-right: 10px">纸张方向：</span>
            <el-radio-group v-model="pageDirection" :disabled="pageDirectionDisabled">
              <el-radio label="portrait">纵向</el-radio>
              <el-radio label="landscape">横向</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div style="margin-top: 20px">
          <div>
            <span style="margin-right: 10px">左右边距：</span>
            <el-input-number v-model="x" :min="0"/>
          </div>
        </div>
        <div style="margin-top: 20px">
          <div>
            <span style="margin-right: 10px">上下边距：</span>
            <el-input-number v-model="y" :min="0"/>
          </div>
        </div>
        <div style="margin-top: 20px">
          <div>
            <span style="margin-right: 10px">访问密码：</span>
            <el-input style="width: 400px" v-model="password"/>
          </div>
        </div>
        <div style="margin-top: 20px;">
          <el-button type="primary" @click="convert" :loading="loading">导出PDF</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jsPDF from "jspdf";

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
      pageSize: 'a4',
      pageWidth: 210,
      pageHeight: 297,
      pageDirection: 'portrait',
      x: 0,
      y: 0,
      unit: 'mm',
      password: null,
      pdfSrc: undefined,
    };
  },
  methods: {
    convert() {
      if (this.fileList.length === 0) {
        this.$message.warning('请先上传至少一张图片')
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
          },
        });
        let zoom = Math.max(file0.width / (doc.getPageWidth(1) - (this.x * 2)), file0.height / (doc.getPageHeight(1) - (this.y * 2)))
        doc.addImage({
          imageData: file0.canvas,
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
            imageData: fileTmp.canvas,
            x: this.x,
            y: this.y,
            width: fileTmp.width / zoom,
            height: fileTmp.height / zoom,
          })
        }
        this.pdfSrc = doc.output("bloburi").toString()
        this.loading = false
      }).catch(e => {
        console.error(e)
        this.$message.error("导出失败")
        this.loading = false
      })
    },
    getFormat(file) {
      return new Promise((resolve, reject) => {
        file.pageDirection = this.pageDirection
        let url = this.getFileUrl(file)
        let image = new Image();
        image.src = url;
        image.onload = () => {
          let canvas = document.createElement("canvas");
          canvas.width = image.width;
          canvas.height = image.height;
          file.width = image.width
          file.height = image.height

          let ctx = canvas.getContext("2d");
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(image, 0, 0, image.width, image.height);
          file.canvas = canvas

          if (this.pageSizeRadio === 0) {
            file.pageSize = 'a4'
            resolve({})
          } else if (this.pageSizeRadio === 1) {
            file.pageSize = 'b3'
            resolve({})
          } else if (this.pageSizeRadio === 2) {
            file.pageSize = [image.width + (this.x * 2), image.height + (this.y * 2)]
            file.pageDirection = image.width > image.height ? 'landscape' : 'portrait'
            resolve({})
          } else if (this.pageSizeRadio === 3) {
            file.pageSize = this.pageSize
            resolve({})
          } else if (this.pageSizeRadio === 4) {
            file.pageSize = [this.pageWidth, this.pageHeight]
            resolve({})
          } else {
            reject()
          }
        }
        image.onerror = error => reject(error);
      })
    },
    handlePictureCardPreview(file) {
      console.log(file)
      this.previewImage = this.getFileUrl(file);
      this.previewVisible = true;
    },
    handleChange(file, fileList) {
      this.fileList = [...fileList]
    },
    handleRemove(file) {
      for (let i = 0; i < this.fileList.length; i++) {
        if (this.fileList[i].uid === file.uid) {
          this.fileList.splice(i, 1)
          return
        }
      }
    },
    handleMove(file, direction) {
      let index = 0
      for (let i = 0; i < this.fileList.length; i++) {
        if (this.fileList[i].uid === file.uid) {
          index = i
          break
        }
      }
      if (index === 0 && direction === 'left') {
        this.$message.warning('已经是第一张图片了，不能再向左移动了')
        return
      }
      if (index === this.fileList.length - 1 && direction === 'right') {
        this.$message.warning('已经是最后一张图片了，不能再向右移动了')
        return
      }
      let item = this.fileList[index]
      this.fileList.splice(index, 1)
      if (direction === 'left') {
        this.fileList.splice(index - 1, 0, item)
      } else {
        this.fileList.splice(index + 1, 0, item)
      }
    },
    getFileUrl(file) {
      let url = file.url;
      if (!file.url) {
        if (window.URL !== undefined) {
          url = window.URL.createObjectURL(file.raw);
        } else if (window.webkitURL !== undefined) {
          url = window.webkitURL.createObjectURL(file.raw);
        }
      }
      file.url = url
      return url
    },
  },
  watch: {
    pageSizeRadio(newValue, oldValue) {
      if (newValue === 2) {
        this.unit = 'px'
        this.unitDisabled = true
        this.pageDirectionDisabled = true
      } else if (oldValue === 2) {
        this.unit = 'mm'
        this.unitDisabled = false
        this.pageDirectionDisabled = false
      }
    }
  }
}
</script>

<style scoped>
</style>