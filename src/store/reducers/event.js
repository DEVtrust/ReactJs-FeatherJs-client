export const UPDATE_EVENTS_TABLE = "UPDATE_EVENTS_TABLE";
export const ADD_NEW_EVENTS = "ADD_NEW_EVENTS";
export const SET_NO_MORE_DATA = "SET_NO_MORE_DATA";
export const RESET_RECORD = "RESET_RECORD";
export const SET_SELECTED_EVENT = "SET_SELECTED_EVENT";
export const SET_ALL_SELECTED = "SET_ALL_SELECTED";
export const SET_LOADING_FLAG = "SET_LOADING_FLAG";
export const ADDING_NEW_EVENTS_IN_ARRAY = "ADDING_NEW_EVENTS_IN_ARRAY";

const initialEventState = {
    events: [],
    hasMoreData: true,
    isLoading: false
};
  
function eventsReducer(state = initialEventState, action) {
  // console.log("TRIGGER EVENT SET", action, state);
  switch (action.type) {
    case SET_LOADING_FLAG: {
      return {
        ...state,
        isLoading: action.data
      };
    }
    case UPDATE_EVENTS_TABLE:
      return Object.assign({}, state, {
        rows: [],
      });
    case ADDING_NEW_EVENTS_IN_ARRAY: {
      const events = [...state.events];
      return {
        ...state,
        events: events.concat(action.data),
        isLoading: false
      };
    }
    case SET_NO_MORE_DATA: {
      return {
        ...state,
        hasMoreData: false,
        isLoading: false
      };
    }
    case RESET_RECORD: {
      return {
        ...state,
        events: action.data
      };
    }
    case SET_SELECTED_EVENT: {
      const { events } = state;
      const index = events.findIndex((x) => x.event_id === action.data.id);

      if(index > -1) {
        events[index].isSelected = action.data.flag;
      }
      return {
        ...state,
        events: [...events]
      };
    }
    case SET_ALL_SELECTED: {
      const { events } = state;
      let i = 0;
      for(i in events) {
        events[i].isSelected = action.data;
      }
      return {
        ...state,
        events: [...events]
      };
    }
    default: {
      // console.log("TRIGGER DEFAULT FOR EVENT ###");
       return state;
  }
  }
}

  
export default eventsReducer;