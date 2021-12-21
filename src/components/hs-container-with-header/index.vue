<template>
  <div class="my-container-with-header-wrapper">
    <div class="my-header">
      <div class="my-header-title">
        <img src="../../../static/logo.svg" alt="" style="width: 20px; vertical-align: middle" />
        <span class="title">vue3 template</span>
      </div>
      <el-menu class="my-header-menu" :default-active="activeIndex" mode="horizontal" @select="handleSelect">
        <el-menu-item index="/test"><i class="my-menu-iconfont iconfont icon-zhuye"></i>首页</el-menu-item>
      </el-menu>
      <div class="my-header-user-wrapper">
        <el-dropdown @command="handleCommand" size="small" :placement="'bottom-end'">
          <span class="el-dropdown-link">
            <i class="el-icon-s-custom user-avatar" />
            {{ userInfo.username }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="operateItem in menuOperateEnum" :key="operateItem.name" :command="operateItem">{{
                operateItem.label
              }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div class="my-container">
      <slot />
    </div>
  </div>
</template>

<script>
const menuOperateEnum = [
  {
    label: '退出',
    id: 'logout',
    icon: '',
  },
];
export default {
  name: 'ContainerWithHeader',
  data() {
    return {
      activeIndex: this.$route.path,
      menuOperateEnum,
    };
  },
  watch: {
    '$route.path': {
      handler(val) {
        this.activeIndex = val;
      },
    },
  },
  computed: {
    userInfo() {
      return this.$store.state.common.userInfo;
    },
  },
  methods: {
    handleSelect(key) {
      this.$router.push(key);
    },
    handleCommand({ id }) {
      switch (id) {
        case 'logout':
          this.logout();
          break;
      }
    },
    logout() {},
  },
};
</script>

<style lang="less" scoped>
.my-container-with-header-wrapper {
  height: 100%;

  .my-header {
    background: @pro-white-color;
    position: relative;
    padding: 0 30px 0 20px;
    z-index: 9;
    height: 50px;
    box-shadow: @pro-box-shadow-box;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .my-header-user-wrapper {
      display: flex;
      align-items: center;

      .my-header-user-name {
        font-size: 12px;
        font-weight: 400;
        text-align: left;
        color: #333;
        margin-left: 10px;
      }
    }
  }
  .my-header-title {
    flex: 0 0 340px;
    .title {
      font-size: 24px;
      font-weight: bold;
      color: #333333;
    }
    .logo {
      font-size: 24px;
      margin-right: 8px;
      color: @pro-primary-color;
    }
  }
  :deep(.el-menu) {
    flex: 1 0 auto;
    border-bottom: none;
    .el-menu-item {
      height: 50px;
      padding: 0 10px;
    }
  }
  .my-menu-iconfont {
    padding-right: 6px;
  }
  .my-container {
    overflow: auto;
    display: flex;
    height: calc(100vh - 50px);
  }
}
</style>
