<template>
  <header>

<el-menu theme="dark" default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect">
  <el-menu-item index="1">{{ $t('header.title') }}</el-menu-item>
  <el-submenu index="2">
    <template slot="title">{{ $t('header.books') }}</template>
    <el-menu-item index="2-1">{{ $t('header.myBooks') }}</el-menu-item>
    <el-menu-item index="2-2">{{ $t('header.rec') }}</el-menu-item>
  </el-submenu>
  <el-menu-item index="3">{{ $t('header.acc') }}</el-menu-item>
</el-menu>
  </header>
</template>

<script>
export default {
  name: 'Header',
  methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
  }
};
</script>
