import { API_URL } from "../../settings";
import TYPES from "../../types/index";
import axios from "axios";
import { alertLoading, alertClose } from "rootComponents/Alerts";
const verifyTab = (tabId, verified) => {
  return {
    type: TYPES.LABLES_VERIFY_TAB,
    payload: {
      tabId,
      verified
    }
  };
};

const selectTab = tabId => {
  return {
    type: TYPES.LABLES_SELECT_TAB,
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
    type: TYPES.LABLES_GET_TREES,
    payload: {
      response: response.data,
      error
    }
  });
};

export default { verifyTab, selectTab, getTrees };
