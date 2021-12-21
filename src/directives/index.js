import my_overflow_tooltip from './overflow-tooltip';

const directives = {
  'my-overflow-tooltip': my_overflow_tooltip,
};
export default function useDirective(app) {
  for (const key in directives) {
    app.directive(key, directives[key]);
  }
}
