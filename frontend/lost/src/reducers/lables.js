import TYPES from "../types/index";
import { bindActionCreators } from "redux";
const INITITAL_STATE = {
  style: {
    container: {
      paddingTop: 24, //pixel
      paddingBottom: 40 //pixel
    },
    shape: {
      size: 80,
      borderWidth: 4,
      borderRadius: "50%"
    },
    line: {
      borderWidth: 3,
      borderColor: "gray",
      padding: 0
    }
  },
  steps: [
    {
      text: "1",
      icon: "fa-rocket",
      shapeBorderColor: "#147289",
      shapeBackgroundColor: "white",
      shapeContentColor: "#147289",
      verified: false
    },
    {
      text: "2",
      icon: "fa-tree",
      shapeBorderColor: "#147289",
      shapeBackgroundColor: "white",
      shapeContentColor: "#147289",
      verified: false,
      modalOpened: false,
      modalClickedId: 0,
      svgStyle: {
        width: "100%"
      }
    }
  ],
  currentStep: 0
};

export default (state = { stepper: INITITAL_STATE }, action) => {
  switch (action.type) {
    case TYPES.LABLES_VERIFY_TAB:
      return state;
    case TYPES.LABLES_SELECT_TAB:
      return state;
    case TYPES.LABLES_GET_TREES:
      return {
        ...state,
        step0Data: action.payload
      };
    default:
      return state;
  }
};
