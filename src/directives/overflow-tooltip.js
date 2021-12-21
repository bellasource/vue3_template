import { debounce } from 'lodash';
let tip = null;
const offset = 10;
const show = (el, binding, vnode) => {
  const debounceEnter = debounce(function (e) {
    if (el.scrollWidth <= el.offsetWidth) return;
    tip = document.getElementById('my-overflow-tooltip');
    if (!tip) {
      tip = document.createElement('div');
      tip.id = 'my-overflow-tooltip';
    }
    tip.innerText = binding.value;
    tip.style.top = e.clientY + offset + 'px';
    tip.style.left = e.clientX + offset + 'px';
    tip.style.display = 'inline';
    document.body.appendChild(tip);
  }, 300);
  el.onmouseenter = debounceEnter;
  el.onmouseleave = (e) => {
    debounceEnter.cancel();
    hide();
  };
};
const hide = () => {
  tip && (tip.style.display = 'none');
};
export default {
  beforeMount(el, binding, vnode) {
    show(el, binding, vnode);
  },
  mounted() {},
  beforeUpdate() {}, // 新增
  updated(el, binding, vnode) {
    show(el, binding, vnode);
  },
  beforeUnmount() {}, // 新增
  unmounted() {
    hide();
  },
};
