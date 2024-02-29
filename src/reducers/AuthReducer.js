// reducers/authReducer.js
const initialState = {
    isLoggedIn: false,
    isAdmin: false,
    // other relevant login state
  };
  
  const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return { ...state, isLoggedIn: true, isAdmin: false };
      case 'LOGOUT':
        return { ...state, isLoggedIn: false, isAdmin: false };
      case 'ADMINLOGIN':
        return { ...state, isLoggedIn: true, isAdmin: true };
      // other cases for handling state changes
      default:
        return state;
    }
  };
  
  export default AuthReducer;
  