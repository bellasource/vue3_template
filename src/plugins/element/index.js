import {
  ElAlert,
  ElAside,
  ElAutocomplete,
  ElAvatar,
  ElBacktop,
  ElBadge,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElButton,
  ElButtonGroup,
  ElCalendar,
  ElCard,
  ElCarousel,
  ElCarouselItem,
  ElCascader,
  ElCascaderPanel,
  ElCheckbox,
  ElCheckboxButton,
  ElCheckboxGroup,
  ElCol,
  ElCollapse,
  ElCollapseItem,
  ElCollapseTransition,
  ElColorPicker,
  ElContainer,
  ElDatePicker,
  ElDialog,
  ElDivider,
  ElDrawer,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElFooter,
  ElForm,
  ElFormItem,
  ElHeader,
  ElIcon,
  ElImage,
  ElInput,
  ElInputNumber,
  ElLink,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElOption,
  ElOptionGroup,
  ElPageHeader,
  ElPagination,
  ElPopconfirm,
  ElPopover,
  ElPopper,
  ElProgress,
  ElRadio,
  ElRadioButton,
  ElRadioGroup,
  ElRate,
  ElRow,
  ElScrollbar,
  ElSelect,
  ElSlider,
  ElStep,
  ElSteps,
  ElSwitch,
  ElTabPane,
  ElTable,
  ElTableColumn,
  ElTabs,
  ElTag,
  ElTimePicker,
  ElTimeSelect,
  ElTimeline,
  ElTimelineItem,
  ElTooltip,
  ElTransfer,
  ElTree,
  ElUpload,
  ElInfiniteScroll,
  ElLoading,
  ElMessage,
  ElMessageBox,
  ElNotification,
} from 'element-plus';

// css样式
// import 'element-plus/dist/index.css';

export function useElement(app) {
  app
    .use(ElAlert)
    .use(ElAside)
    .use(ElAutocomplete)
    .use(ElAvatar)
    .use(ElBacktop)
    .use(ElBadge)
    .use(ElBreadcrumb)
    .use(ElBreadcrumbItem)
    .use(ElButton)
    .use(ElButtonGroup)
    .use(ElCalendar)
    .use(ElCard)
    .use(ElCarousel)
    .use(ElCarouselItem)
    .use(ElCascader)
    .use(ElCascaderPanel)
    .use(ElCheckbox)
    .use(ElCheckboxButton)
    .use(ElCheckboxGroup)
    .use(ElCol)
    .use(ElCollapse)
    .use(ElCollapseItem)
    .use(ElCollapseTransition)
    .use(ElColorPicker)
    .use(ElContainer)
    .use(ElDatePicker)
    .use(ElDialog)
    .use(ElDivider)
    .use(ElDrawer)
    .use(ElDropdown)
    .use(ElDropdownItem)
    .use(ElDropdownMenu)
    .use(ElFooter)
    .use(ElForm)
    .use(ElFormItem)
    .use(ElHeader)
    .use(ElIcon)
    .use(ElImage)
    .use(ElInput, { size: 'mini' })
    .use(ElInputNumber)
    .use(ElLink)
    .use(ElMain)
    .use(ElMenu)
    .use(ElMenuItem)
    .use(ElMenuItemGroup)
    .use(ElOption)
    .use(ElOptionGroup)
    .use(ElPageHeader)
    .use(ElPagination)
    .use(ElPopconfirm)
    .use(ElPopover)
    .use(ElPopper)
    .use(ElProgress)
    .use(ElRadio)
    .use(ElRadioButton)
    .use(ElRadioGroup)
    .use(ElRate)
    .use(ElRow)
    .use(ElScrollbar)
    .use(ElSelect, { size: 'mini' })
    .use(ElSlider)
    .use(ElStep)
    .use(ElSteps)
    .use(ElSwitch)
    .use(ElTabPane)
    .use(ElTable)
    .use(ElTableColumn)
    .use(ElTabs)
    .use(ElTag)
    .use(ElTimePicker)
    .use(ElTimeSelect)
    .use(ElTimeline)
    .use(ElTimelineItem)
    .use(ElTooltip)
    .use(ElTransfer)
    .use(ElTree)
    .use(ElUpload)
    .use(ElLoading);
  // .use(ElInfiniteScroll)
  // .use(ElMessageBox);

  app.config.globalProperties.$ELEMENT = {
    $ElNotification: ElNotification,
    $ElMessageBox: ElMessageBox,
    $ElMessage: ElMessage,
    $loading: ElLoading,
  };
}
