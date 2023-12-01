import {PROPERTY, USER} from "../actionTypes";
import {tokenValidityCheck} from "../../common/tokenValidityCheck";
import {refreshTokenActions} from "../actions/authActions";

const refreshTokenMiddleware = (store: any) => (next: any) => (action: any) => {
    let {token} = store.getState().auth;

    switch (action.type) {
        case PROPERTY.ADD_PROPERTY_REQUEST:
            if (tokenValidityCheck(token.accessToken)) {
                next(action);
            } else {
                store
                    .dispatch(refreshTokenActions(token.refreshToken))
                    .then((newToken: any) => {
                        token = newToken;
                        next({...action, token});
                    });
            }
            break;
        case USER.GET_USER_INFO_REQUEST:
            if (tokenValidityCheck(token.accessToken)) {
                next(action);
            } else {
                store
                    .dispatch(refreshTokenActions(token.refreshToken))
                    .then((newToken: any) => {
                        token = newToken;
                        next({...action, token});
                    });
            }
            break;
        case PROPERTY.GET_PROPERTIES_BY_USER_REQUEST:
            if (tokenValidityCheck(token.accessToken)) {
                next(action);
            } else {
                store
                    .dispatch(refreshTokenActions(token.refreshToken))
                    .then((newToken: any) => {
                        token = newToken;
                        next({...action, token});
                    });
            }
            break;
        default:
            return next(action);
    }
}
export default refreshTokenMiddleware;
