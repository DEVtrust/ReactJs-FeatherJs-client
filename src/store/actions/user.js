import { fetchUserSubScription, setUser } from "../../services/user";
import { SET_USER, SET_USER_PLAN_STATUS, SET_FETCH_USER_LOADING } from "../reducers/user";
import { SET_USER_LOGIN_STATUS } from "../reducers/loggedIn";

export const loadUser = () => async () => {
    try {
        const user = await fetchUserSubScription();
        return user;
    } catch (e) {
        console.log(e);
    }
};
let user;
export const setLoggedInUser = () => async dispatch => {
    try {
        dispatch({
            type: SET_FETCH_USER_LOADING
        });
        user = await setUser();
        
        if(user) {
            dispatch({
                type: SET_USER_LOGIN_STATUS,
                data: {
                    isLoggedIn: true,
                    isLoading: false
                }
            });
            dispatch({
                type: SET_USER,
                user
            });
            const subscription = await fetchUserSubScription();
            // console.log("SUBSCRPTIOn", subscription);
            if(subscription && subscription.length > 0) {
                const plan = subscription[0];
                let flag;
                if(!plan.cancel_at_period_end) {
                    flag = "ACTIVE";
                } else {
                    flag = null;
                }
                dispatch({
                    type: SET_USER_PLAN_STATUS,
                    subscription: { plan, flag, user }
                });

                
            } else {
                // DEMO CODE
                // dispatch({
                //     type: SET_USER_PLAN_STATUS,
                //     subscription: { plan: {}, flag: "ACTIVE", user }
                // });
                dispatch({
                    type: SET_USER_PLAN_STATUS,
                    subscription: { flag: null, user, plan: null }
                });
            }
        }
    } catch (e) {
        console.log(e);
        if(window.location.pathname.includes("auth")) {
            setTimeout(() =>{ 
                dispatch({
                    type: SET_USER_LOGIN_STATUS,
                    data: {
                        isLoggedIn: false,
                        isLoading: false,
                    }
                });
            },100);
        }
        if(e.className === "not-authenticated") {
            dispatch({
                type: SET_USER_LOGIN_STATUS,
                data: {
                    isLoggedIn: false,
                    isLoading: false,
                    msg: "REDIRECT"
                }
            });
        } else {
            dispatch({
                type: SET_USER_PLAN_STATUS,
                subscription: { flag: null, user, plan: null }
            });
        }
    }
};