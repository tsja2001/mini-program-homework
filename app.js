import { mookFormData } from "./mook/index";
import Store from "./store/index";

App({
  // 全局状态管理
  store: new Store({
    formData: mookFormData,
  }),
});
