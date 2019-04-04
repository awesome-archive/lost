import auth from "./auth";
import labels from "./labels/Labels";
import group from "./group/index";
import user from "./user/index";
import annoTask from "./annoTask";
import mia from "./mia";
import workers from "./worker/index";

export default {
  ...auth,
  ...labels,
  ...group,
  ...user,
  ...annoTask,
  ...mia,
  ...workers
};
