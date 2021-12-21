<template>
  <vxe-grid
    ref="tableRef"
    v-bind="gridOptions"
    @sort-change="handleSortChange"
    @checkbox-all="handleSelectChange"
    @checkbox-change="handleSelectChange"
    @page-change="handlePageChange"
  >
    <template #default="{ row, column }">
      <slot :name="column.property" :row="row"></slot>
    </template>
    <template #header="{ row, column }">
      <span>{{ column.title }}</span>
      <ColumnFilter
        :fetch="fetchColumnData"
        :column="column"
        @changeFilter="changeFilter"
        :defaultSelectValues="tableFilterList[column.property]"
      />
    </template>
  </vxe-grid>
</template>
<script>
import { ref, toRefs, toRef, reactive, onMounted, defineExpose } from 'vue';
import ColumnFilter from './columnFilter.vue';
import { defaultPage } from './utils';
export default {
  name: 'HsTable',
  components: { ColumnFilter },
  emits: ['getSelectedRows'],
  props: {
    // 分页
    needPager: {
      type: Boolean,
      default: true,
    },
    // 排序方式
    columns: {
      type: Array,
      default() {
        return [];
      },
    },
    // 排序方式
    defaultSort: {
      type: Object,
      default() {
        return {
          field: 'id',
          order: 'asc',
        };
      },
    },
    // 获取数据
    fetch: {
      type: Object,
      default() {
        return {
          data: () => Promise.resolve(),
          column: () => Promise.resolve([]),
          cluster: () => Promise.resolve(),
        };
      },
    },
  },
  setup(props, context) {
    const { defaultSort, columns, needPager } = toRefs(props);
    const sort = reactive({ ...defaultSort.value });
    const tableRef = ref();
    let tableFilterList = reactive({});

    // 分页配置
    const pagerConfig = {
      total: defaultPage.total,
      currentPage: defaultPage.page,
      pageSize: defaultPage.size,
      align: 'center',
      pageSizes: [defaultPage.size, 40, 60, 80, 100],
      layouts: ['Total', 'PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'FullJump', 'Sizes'],
      size: 'small',
    };
    // 表格渲染数据
    const gridOptions = reactive({
      size: 'small',
      resizable: true,
      highlightHoverRow: true,
      showOverflow: true,
      autoResize: true,
      loading: false,
      height: 'auto',
      border: 'inner',
      stripe: true, //斑马纹
      data: [],
      columns,
      pagerConfig,
    });
    /*
     * @method:	切换页码
     * @return:	none
     * @param: currentPage { Number }
     * @param: pageSize { Number }
     */
    const handlePageChange = ({ currentPage, pageSize }) => {
      gridOptions.pagerConfig.currentPage = currentPage;
      gridOptions.pagerConfig.pageSize = pageSize;
      fetchData();
    };
    /* @method: 将search数据转换为接口所需的json形式
     * @return: result { Array }
     * @param: none
     */
    const getFilterFromSearch = (key) => {
      const keys = Object.keys(tableFilterList);
      return keys.reduce((pre, acc) => {
        if (acc !== key && tableFilterList[acc]) {
          pre.push({ filterKey: acc, filterValue: tableFilterList[acc] });
        }
        return pre;
      }, []);
    };
    /*
     * @method:	获取表格数据
     * @return： Promise
     * @param: none
     */
    const fetchData = () => {
      const { currentPage: pageNo, pageSize } = pagerConfig;
      const { field: sortProp, order: sortOrder } = sort;
      const filter = getFilterFromSearch();
      // 将请求数据时所需的参数包裹进 newParams
      const newParams = {
        pageNo,
        pageSize,
        sortProp: sortProp, //排序字段
        sortOrder: sortOrder, //升序降序
        needPager: needPager.value,
        filter,
      };
      gridOptions.loading = true;
      clearCheckboxRow();
      return (
        props.fetch
          .data(newParams)
          // 请求成功
          .then((data) => {
            gridOptions.data = reactive(data.beanList);
            gridOptions.pagerConfig.total = data.total;
          })
          .catch((result) => {})
          .finally(() => (gridOptions.loading = false))
      );
    };
    /*
     * @method:	获取表格筛选数据
     * @return： Promise
     * @param: none
     *
     */
    const fetchColumnData = (params) => {
      const filter = getFilterFromSearch(params.columnKey);
      return props.fetch.column({ ...params, filter, columnKey: params.columnKey });
    };
    /*
     * @method:排序变化
     * @return:none
     * @param: column { Object } -- column configrations
     * @param: property { String } -- field of the ordered column
     * @param: order { String } -- method of order (asc, desc)
     */
    const handleSortChange = ({ column, property, order }) => {
      sort.field = property;
      sort.order = order ? order : sort.order;
      fetchData();
    };
    /*
     * @method:	复选框变化
     * @return:	none
     * @param:	records { Array } --Necessary 选中的项
     */
    const handleSelectChange = ({ records }) => {
      context.emit('getSelectedRows', records);
    };
    /*
     * @method: 列筛选数据变化
     * @return: none
     * @param: columnKey { String } -- Necessary 筛选key值
     * @param: value { Array } -- Necessary 筛选的字段值
     */
    const changeFilter = (columnKey, value) => {
      const reviseValue = value.join(',');
      if ((!tableFilterList[columnKey] && !reviseValue) || tableFilterList[columnKey] === reviseValue) return;
      tableFilterList[columnKey] = reviseValue;
      fetchData();
    };
    /*
     * @method: 清空筛选
     * @return: none
     * @param: none
     */
    const clearTableFilters = async () => {
      Object.keys(tableFilterList).map((key) => {
        delete tableFilterList[key];
      });
      fetchData();
    };
    /*
     * @method: 清空表格复选框选择项
     * @return: none
     * @param:  none
     */
    const clearCheckboxRow = async () => {
      await tableRef.value.clearCheckboxRow();
      context.emit('getSelectedRows', []);
    };

    /*
     * @method:	formate columns
     * @return:	none
     * @param:	none
     */
    const checkColumns = () => {
      return columns.value.map((column) => {
        if (column.sort || column.filter) {
          column.slots ||= {};
          column.slots.header = 'header';
        }
      });
    };

    /*
     * @method:	获取选中的行
     * @return:	Array
     * @param:  none
     */
    const getSelectedRows = () => {
      const re = tableRef.value.getCheckboxRecords();
      console.log(re, 're');
      return (re ||= []);
    };
    // 界面渲染后
    onMounted(() => {
      checkColumns();
      fetchData();
    });
    return {
      gridOptions,
      tableRef,
      tableFilterList,
      handlePageChange,
      handleSortChange,
      handleSelectChange,
      fetchData,
      changeFilter,
      clearTableFilters,
      fetchColumnData,
      getSelectedRows,
    };
  },
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
:deep(.vxe-grid--pager-wrapper) {
  .vxe-pager {
    padding: 20px 0;
    height: unset;
  }
}
:deep(.vxe-table) {
  .vxe-table--header {
    background-color: @pro-bg-primary-color;
  }
  .vxe-header--column:not(.col--ellipsis),
  .vxe-body--column:not(.col--ellipsis) {
    padding: 9px 0;
  }
  .vxe-cell--title .vxe-cell--filter {
    position: relative;
    left: 18px;
    z-index: 200;
  }
  .vxe-cell--sort {
    .vxe-sort--asc-btn,
    .vxe-sort--desc-btn {
      font-size: 12px;
      transform: translateX(-18px);
    }
  }
}
</style>
