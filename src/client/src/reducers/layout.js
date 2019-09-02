const initState = {
  mode:'',
  mobileOpen: false,
  desktopOpen: true,
}
const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'DRAWER_TOGGLE_MOBILE':
      return {
        ...state,
        mobileOpen: !state.mobileOpen,
      };
    case 'DRAWER_TOGGLE_MOBILE_CLOSE':
      return {
        ...state,
        mobileOpen: false,
      };
    case 'DRAWER_TOGGLE_DESKTOP':
      return {
        ...state,
        desktopOpen: !state.desktopOpen,
      };
    case 'DRAWER_TOGGLE_DESKTOP_CLOSE':
      return {
        ...state,
        desktopOpen: false,
      };
    case 'CHANGE_TO_DESKTOP':
      return {
        ...state,
        mode: 'desktop',
      };
    case 'CHANGE_TO_MOBILE':
      return {
        ...state,
        mode: 'mobile',
      };
    default:
      return state;
  }
};
export default reducer;