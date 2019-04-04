import TYPES from "../types/index";
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
    case TYPES.LABELS_SELECT_TAB:
      return {
        ...state,
        stepper: {
          ...state.stepper,
          currentStep: action.payload.tabId
        }
      };
    case TYPES.LABELS_VERIFY_TAB:
      return {
        ...state,
        stepper: {
          ...state.stepper,
          steps: state.stepper.steps.map((el, i) => {
            if (i === action.payload.tabId) {
              return {
                ...el,
                verified: action.payload.verified
              };
            }
            return el;
          })
        }
      };
    case TYPES.LABELS_GET_TREES:
      return {
        ...state,
        treeData: action.payload
      };
    case TYPES.LABELS_SELECT_TREE:
      return {
        ...state,
        selectedTree: state.treeData.response.filter(
          el => el.idx === action.payload.idx
        )[0]
      };
    default:
      return state;
  }
};
