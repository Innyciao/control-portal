


export const actionTypes = {
    Login: "[Login] Action",
    Logout: "[Logout] Action",
    Register: "[Register] Action",
    UserRequested: "[Request User] Action",
    UserLoaded: "[Load User] Auth API",
    sessionUpdated: "[Session Update] Action"
  };

/**
 * User Auth actions
 */
 export const actions = {
    login: (authToken, history) => ({ type: actionTypes.Login, payload: { authToken, history } })
  
  };