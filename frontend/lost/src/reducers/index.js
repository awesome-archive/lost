import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import auth from "./auth";
import lables from "./lables";
import group from "./group";
import user from "./user";
import annoTask from "./annoTask";
import mia from "./mia";
import worker from "./worker";
import pipelineRunning from "./pipelineRunning";
import pipelineStart from "./pipelineStart";

export default combineReducers({
  auth,
  lables,
  group,
  user,
  annoTask,
  mia,
  worker,
  form: formReducer,
  pipelineRunning,
  pipelineStart
});
