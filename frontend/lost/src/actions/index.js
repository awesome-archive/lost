import auth from "./auth";
import lables from "./lables/Lables";
import group from "./group/index";
import user from "./user/index";
import annoTask from "./annoTask";
import mia from "./mia";
import workers from "./worker/index";

export default {
  ...auth,
  ...lables,
  ...group,
  ...user,
  ...annoTask,
  ...mia,
  ...workers
};
