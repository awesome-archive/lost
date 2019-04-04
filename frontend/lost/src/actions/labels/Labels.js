import { API_URL } from "../../settings";
import TYPES from "../../types/index";
import axios from "axios";
import { alertLoading, alertClose } from "rootComponents/Alerts";
const verifyTab = (tabId, verified) => {
  return {
    type: TYPES.LABELS_VERIFY_TAB,
    payload: {
      tabId,
      verified
    }
  };
};

const selectTab = tabId => {
  return {
    type: TYPES.LABELS_SELECT_TAB,
    payload: {
      tabId
    }
  };
};

const getTrees = () => async dispatch => {
  let response;
  let error;
  alertLoading();
  try {
    response = await axios.get(API_URL + "/label/tree");
  } catch (e) {
    error = e;
  }
  alertClose();
  dispatch({
    type: TYPES.LABELS_GET_TREES,
    payload: {
      response: response.data,
      error
    }
  });
};

const selectLabelTree = idx => {
  return {
    type: TYPES.LABELS_SELECT_TREE,
    payload: {
      idx
    }
  };
};

export default { verifyTab, selectTab, getTrees, selectLabelTree };
