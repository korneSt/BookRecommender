<template>
  <div>
    <el-button type="primary" @click="show = !show">
      Add book  
      <i class="el-icon-upload el-icon-right"></i></el-button>
      <br><br><br>
      <el-row>
        <el-col :span="8">
          <transition name="el-collapse-transition">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm" v-show="show">
              <el-form-item label="Title" prop="title">
                <el-input v-model="ruleForm.title"></el-input>
              </el-form-item>
              <el-form-item label="Author" prop="author">
                <el-input v-model="ruleForm.author"></el-input>
              </el-form-item>
              <el-form-item label="Rating" prop="rating">
                <el-input v-model="ruleForm.rating"></el-input>
              </el-form-item>
              <el-form-item label="Genre" prop="genre">
                <el-select v-model="ruleForm.genre" placeholder="Genre">
                  <el-option label="Dramat" value="dramat"></el-option>
                  <el-option label="Biografia" value="biografia"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Recommend" prop="recommend">
                <el-switch v-model="ruleForm.recommend"></el-switch>
              </el-form-item>
              <el-form-item label="URL cover" prop="cover">
                <el-input v-model="ruleForm.cover"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">Create</el-button>
                <el-button @click="resetForm('ruleForm')">Reset</el-button>
              </el-form-item>
          </el-form>
          </transition>
          </el-col>
      </el-row>
      <p :model="addedBook"> {{ addedBook.title }}</p>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

export default {
  name: 'Account',
  data() {
    return {
      show: false,
      ruleForm: {
      title: '',
      genre: '',
      author: '',
      cover: '',
      recommend: '',
      rating: ''
      },
      rules: {
        title: [
          { required: true, message: 'Please input title', trigger: 'blur' }
        ],
        genre: [
          { required: true, message: 'Please select Activity zone', trigger: 'change' }
        ]
      },
      newBook: {}

    }
  },
  computed: {
    books () {
      return this.$store.state.books
    },
    addedBook () {
      return this.$store.state.addedBook
    }
  },
    methods: {
      ...mapActions([
      'addBook'
       ]),
      submitForm(formName) {
        let newBook = {
          title: this.ruleForm.title,
          author: this.ruleForm.author,
          rating: this.ruleForm.rating,
          cover: this.ruleForm.cover,
          recommended: this.ruleForm.recommend,

        }
        let genres = this.ruleForm.genre
        this.$refs[formName].validate((valid) => {
            console.log(this.$refs[formName]);
          if (valid) {
            this.addBook({book: newBook});
            // alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    watch: {
    addedBook: function(newValue, oldValue) {
      console.log('a',newValue);
      console.log(this.newBook);
      if(newValue.created === true) {
        this.$notify.success({
          title: 'Success',
          message: 'Dodano książke'
        });
      } else {
        this.$notify.error({
        title: 'Ksiażka już istnieje',
        message: 'Znajdz ją i dodaj do swojej biblioteki'
      });
      }
    }
    }
};
</script>
