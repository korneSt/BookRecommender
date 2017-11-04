<template>
<div>

<el-menu theme="dark" default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect">
  <el-menu-item index="1">{{ $t('header.title') }}</el-menu-item>
  <el-submenu index="2">
    <template slot="title">{{ $t('header.books') }}</template>
    <el-menu-item index="2-1">{{ $t('header.allBooks') }}</el-menu-item>
    <el-menu-item index="2-2">{{ $t('header.myBooks') }}</el-menu-item>
    <el-menu-item index="2-3">{{ $t('header.rec') }}</el-menu-item>

  </el-submenu>
  <el-menu-item index="3">{{ $t('header.acc') }}</el-menu-item>
  <el-menu-item index="4" class="right">
  <el-input  size="small" placeholder="Login" v-model="credentials.username" class="center"></el-input>
  </el-menu-item>
  <el-menu-item index="5" class="right">
  <el-input  size="small" placeholder="Password" v-model="credentials.password" class="center"></el-input>
  <el-button type="primary" icon="el-icon-edit" v-on:click="submit()"></el-button>

  </el-menu-item>
</el-menu>
  <div id="root">
      <br><br><br>
      <router-view></router-view>
      <br><br><br>
    <footer-component></footer-component>
  </div>
  </div>
</template>

<script>
import { router } from '../index.js'
import auth from '../auth'
import Footer from './Footer.vue';
import Books from './Books.vue';
export default {
  name: 'Header',
  components: {
    'footer-component': Footer,
    'books-component': Books
  },
  data() {
    return {
       credentials: {
          username: '',
          password: ''
        },
        error: ''
    }
  },
  methods: {
      handleSelect(key, keyPath) {
        
        if (key === '1') {
          router.push('main')
        }
        if (key === '2-1') {
          router.push('books')
        }
        if(key === '2-2') {
          router.push('mybooks')
        }
        if (key === '2-3') {
          router.push('quick-recommendations')
        }
        if (key === '3') {
          router.push('account')
        }
      },
       submit() {
        var credentials = {
          username: this.credentials.username,
          password: this.credentials.password
        }
        // We need to pass the component's this context
        // to properly make use of http in the auth service
        auth.login(this, credentials, '/home')
      }
    },
     mounted: function () {
    this.$nextTick(function () {
      this.$router.push('main');
      // this.getAllBooks();
    })
  }
};
</script>

<style>
.right {
  float: right!important;
  width: 12em;
}
.center {
display: inline-flex!important;
}
</style>
