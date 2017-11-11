<template>
  <div id="account"> 
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
      <el-row>
      <el-col :span="12">
      <el-tabs type="border-card">
        <el-tab-pane label="Gatunki">
          <el-checkbox v-for="v in favGenre" v-model="v.id == 'false'? false: true" >{{ v.value }}</el-checkbox>
        </el-tab-pane>
        <el-tab-pane label="Długość">
          <el-checkbox v-for="v in favLen" v-model="v.id == 'false'? false: true">{{ v.value }}</el-checkbox>
        </el-tab-pane>
        <el-tab-pane label="Kategoria wiekowa">
          <el-checkbox v-for="v in favAge" v-model="v.id == 'false'? false: true">{{ v.value }}</el-checkbox>
        </el-tab-pane>
        <el-tab-pane label="Autorzy">
          <el-checkbox v-for="v in favAuth" v-model="v.id == 'false'? false: true">{{ v.value }}</el-checkbox>
        </el-tab-pane>
      </el-tabs>
      </el-col>
      </el-row>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

export default {
  name: 'Account',
  data() {
    return {
      checked: true,
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
    },
    favAuth() {
      return _.filter(this.$store.state.settings, {name: 'favauthor'});
    },
    favLen() {
      return _.filter(this.$store.state.settings, {name: 'lenght'});
    },
    favGenre() {
      return _.filter(this.$store.state.settings, {name: 'genre'});
    },
    favAge() {
     return  _.filter(this.$store.state.settings, {name: 'age'});
    }
  },
    methods: {
      ...mapActions([
      'addBook',
      'getSettings'
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
    },
    mounted: function () {
      this.$nextTick(function () {
      this.getSettings();
    })
    }
};
</script>
<style>

#account{
  padding: 1em;
}
</style>