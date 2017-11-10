<template>
<el-dialog :visible.sync="dialogBookVisible" :title="selBook && selBook.title" v-model="visible"
  :before-close="handleCancel">
<el-row :gutter="20">
  <el-col :span="16">
  <div>Recommendations</div>
  </br>
  <!--<el-table
    :data="selBook"
    border
    style="width: 100%">
    <el-table-column
      inline-template
      label="Title">
      <div>
        <span style="margin-left: 10px">{{ row.title }}</span>
      </div>
    </el-table-column>
    <el-table-column
      prop="author"
      label="Author">
    </el-table-column>
    </el-table> -->
  </el-col>
  <el-col :span="8"><div>
    <img :src="selBook && selBook.cover" class="image">
    </br>
    <span><b>{{selBook && selBook.author}}</b></span>
  </div></el-col>
</el-row>
  <span slot="footer" class="dialog-footer">
    <el-button @click="handleCancel()">Cancel</el-button>
    <el-button type="primary" @click="handleCancel()">Confirm</el-button>
  </span>
</el-dialog>
</template>

<script>

export default {
  name: 'BookDialog',
  props: ['selBook', 'visible'],
  data() {
    return {
    //   dialogBookVisible: this.visible
    };
  },
  computed: {
       dialogBookVisible: {
           get: function() {
           return this.visible;
       }
       }
  },
   methods: {
       handleCancel() {           
        //    this.dialogBookVisible = false;
           this.$emit('hide');
          //  this.$emit('update:visible', false)

       }
  },
  created() {
    this.$nextTick(function () {
     
    })
  }
};
</script>