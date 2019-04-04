import * as auth from "./auth";
import * as lable from "./lables";
import * as group from "./group";
import * as user from "./user";
import * as annoTask from "./annoTask";
import * as mia from "./mia";
import * as worker from "./worker";
import * as pipeline from "./pipeline";

export default {
  ...auth,
  ...lable,
  ...group,
  ...user,
  ...annoTask,
  ...mia,
  ...worker,
  ...pipeline
};
