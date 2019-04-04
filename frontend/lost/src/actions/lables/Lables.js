import { API_URL } from "../../settings";
import TYPES from "../../types/index";
import axios from "axios";
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
  try {
    const response = await axios.get(API_URL + "/label/tree");
    dispatch({ type: TYPES.LABLES_GET_TREES, payload: response.data });
  } catch (e) {}
};

export default { verifyTab, selectTab, getTrees };
