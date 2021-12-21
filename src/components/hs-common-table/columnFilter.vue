<template>
  <el-popover
    v-model:visible="visible"
    :width="300"
    trigger="click"
    @show="handleShow"
    @after-leave="handleHide"
    :hide-after="0"
  >
    <div class="filter-container">
      <div>
        <el-input v-model="input" size="mini" prefix-icon="el-icon-search" placeholder="请输入内容" />
        <vxe-grid ref="table" v-bind="gridOptions" />
      </div>
      <div class="filter-footer">
        <el-button size="mini" @click="handleCancel">清空</el-button>
        <el-button size="mini" type="primary" @click="handleConfirm">确定</el-button>
      </div>
    </div>

    <template #reference>
      <span class="vxe-cell--filter">
        <i
          class="icon-xiala1 iconfont"
          :class="{
            'vxe-filter--btn': true,
            'is-filtered': defaultSelectValues,
          }"
          title="对所选的列启用筛选"
        />
      </span>
    </template>
  </el-popover>
</template>

<script>
import { reactive, ref, toRefs, watch } from 'vue';
export default {
  name: 'ColumnFilter',
  emits: ['changeFilter'],
  props: {
    fetch: {
      type: Function,
      default() {
        return () => new Promise();
      },
    },
    column: {
      type: Object,
      default() {
        return {};
      },
    },
    defaultSelectValues: {
      type: String,
      default: '',
    },
  },
  setup(props, context) {
    const { fetch, column, defaultSelectValues } = toRefs(props);
    const table = ref();
    const columns = [
      { type: 'checkbox', width: 50, align: 'center' },
      { title: '全选', field: 'columnValue', sortable: 'true', showOverflow: 'tooltip' },
    ];
    const state = reactive({
      visible: false,
      input: '',
      gridOptions: {
        highlightHoverRow: true,
        showOverflow: true,
        loading: false,
        border: true,
        stripe: true,
        autoResize: true,
        size: 'mini',
        maxHeight: 400,
        columns,
        data: [],
        rowId: 'columnValue',
        checkboxConfig: {
          checkRowKeys: [],
        },
      },
    });
    let allTableDate = []; //列表所有数据
    watch(
      () => state.input,
      (newval) => {
        state.gridOptions.data = allTableDate.filter((item) => item.columnValue.indexOf(newval) !== -1);
      },
    );
    /*
     * @method:	展示筛选弹框
     * @return:	none
     * @param:	none
     */
    const handleShow = async () => {
      console.log(state.gridOptions.data, 'state.gridOptions.data');
      state.gridOptions.loading = true;
      try {
        // 获取数据
        const columnList = await fetch.value({
          column: '',
          columnKey: column.value.property,
          needPager: false,
          pageNo: 1,
          pageSize: 10000,
        });
        state.gridOptions.loading = false;
        state.gridOptions.data = allTableDate = columnList.beanList ||= [];
        // 设置默认选中
      } catch (err) {
        console.log('fail');
        state.gridOptions.loading = false;
      }
      setDefaultChecked();
    };
    /*
     * @method:	关闭筛选
     * @return:	none
     * @param:	none
     */
    const handleHide = () => {
      state.input = '';
      state.gridOptions.data = allTableDate = [];
      state.gridOptions.checkboxConfig.checkRowKeys = [];
    };
    /*
     * @method:	设置默认选中的行
     * @return: none
     * @param:  none
     */
    const setDefaultChecked = () => {
      // console.log(defaultSelectValues, 'defaultSelectValues');
      const defaultSelect = defaultSelectValues.value ? defaultSelectValues.value.split(',') : [];
      const checkRowKeys = allTableDate.filter(({ columnValue }) => defaultSelect.includes(columnValue));
      table.value.setCheckboxRow(checkRowKeys, true);

      // state.gridOptions.checkboxConfig.checkRowKeys = value;
    };
    /*
     * @method:	复选框变化
     * @return:	none
     * @param:	records { Array } --Necessary 选中的项
     */
    const handleSelectChange = ({ records }) => {
      tableCheked = records;
    };
    /*
     * @method:	确认筛选信息
     * @return:
     * @param:
     */
    const handleConfirm = () => {
      const tableSelected = table.value.getCheckboxRecords();
      context.emit(
        'changeFilter',
        column.value.property,
        tableSelected.map(({ columnValue }) => columnValue),
      );
      state.visible = false;
    };
    /*
     * @method:清空列筛选
     * @return: none
     * @param:  none
     */
    const handleCancel = async () => {
      await table.value.clearCheckboxRow();
      context.emit('changeFilter', column.value.property, []);
      state.visible = false;
    };
    return {
      ...toRefs(state),
      table,
      handleShow,
      handleConfirm,
      handleSelectChange,
      handleCancel,
      handleHide,
    };
  },
};
</script>

<style lang="less">
.vxe-cell--filter {
  margin-bottom: 1px;
  .vxe-filter--btn.is-filtered {
    color: @pro-primary-color;
  }
}

.filter-container {
  display: flex;
  flex-direction: column;

  .el-input {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .filter-footer {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
