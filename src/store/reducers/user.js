export const SET_USER = "SET_USER";
export const SET_USER_PLAN_STATUS = "SET_USER_PLAN_STATUS";
export const SET_FETCH_USER_LOADING = "SET_FETCH_USER_LOADING";

const initialUserState = {
    user: null,
    isActive: false,
    plan: null,
    isLoading: false
};
  
function userReducer(state = initialUserState, action) {
    // console.log("TRIGGER USER ### SET", action, state);
  switch (action.type) {
    case SET_FETCH_USER_LOADING: {
        state = {
            ...state,
            isLoading: true
        };
        return {
            ...state,
            isLoading: true
        };
    }
    case SET_USER: {
        state = {
            ...state,
            user: action.user
        };
        return {
            ...state,
            user: action.user
        };
    }
    case SET_USER_PLAN_STATUS: {
        const obj = {
            ...state,
            isActive: action.subscription.flag || null,
            plan: action.subscription.plan || null,
            user: action.subscription.user,
            isLoading: false
        };
        return {...obj};
    }
    default: {
        return state;
    }
  }
}

  
export default userReducer;