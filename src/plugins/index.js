import { useVxetable } from './vxe-table';
import { useElement } from './element';

const plugins = [useElement, useVxetable];
export default function useplugins(app) {
  for (const pluginItem of plugins) {
    pluginItem(app);
  }
}
