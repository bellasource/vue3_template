import HsContainerWithHeader from '@src/components/hs-container-with-header';
import HsCommonTable from '@src/components/hs-common-table';

const components = {
  HsContainerWithHeader,
  HsCommonTable,
};
const $components = {};
export default function useConponents(app) {
  for (let key in components) {
    app.component(key, components[key]);
  }
  for (let key in $components) {
    app.config.globalProperties[key] = $components[key];
  }
}
