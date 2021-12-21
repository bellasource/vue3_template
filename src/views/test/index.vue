<template>
  <el-main>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <h2>{{ title }}</h2>
          <el-button class="button" type="primary" @click="getTestList">刷新</el-button>
        </div>
      </template>
      <div v-for="item in projectList" :key="item.id" class="text item">
        名称：{{ item.name }}, 更新时间：{{ item.time }}
      </div>
    </el-card>
  </el-main>
</template>
<script>
import { fetchTestList } from '@src/apis/test';
export default {
  name: 'Test',
  components: {},
  data() {
    return {
      title: 'test页面',
      projectList: [],
    };
  },
  mounted() {
    this.getTestList();
  },
  methods: {
    async getTestList() {
      this.projectList = await fetchTestList();
    },
  },
};
</script>
<style lang="less" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
