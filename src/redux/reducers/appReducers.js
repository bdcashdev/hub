import constants from '../constants';

const initialState = {
  menuItems: [
    {
      key: 'dashBoard',
      icon: 'png_menu_proposals',
      iconSelected: 'png_menu_proposals_selected',
      title: 'Proposal Dashboard',
      showWhen: 'always'
    },
    {
      key: 'newProposal',
      icon: 'png_menu_create',
      iconSelected: 'png_menu_create_selected',
      title: 'Create Proposal',
      showWhen: 'login'
    },
    {
      key: 'news',
      icon: 'png_menu_news',
      iconSelected: 'png_menu_news_selected',
      title: 'News and Announcements',
      showWhen: 'always'
    },
    {
      key: 'userAccount',
      icon: 'png_menu_account',
      iconSelected: 'png_menu_account_selected',
      title: 'Account Settings',
      showWhen: 'login'
    },
    {
      key: 'register',
      icon: 'png_menu_register',
      iconSelected: 'png_menu_register_selected',
      title: 'Register',
      showWhen: 'logout'
    },
    {
      key: 'faq',
      icon: 'png_menu_faq',
      iconSelected: 'png_menu_faq_selected',
      title: 'Faq',
      showWhen: 'always'
    },
    {
      key: 'masterNode',
      icon: 'png_menu_masternodes',
      iconSelected: 'png_menu_masternodes_selected',
      title: 'Masternode Setting',
      showWhen: 'login'
    }
  ],
  currentUser: null,
  showPage: 'home',
  showChat: false,
  showMenu: false,
  platform: {},
  loading: false,
  auth: false
};

const app = (state = initialState, action) => {
  switch (action.type) {
    case constants.APP_USER_LOGIN:
      return {
        ...state,
        currentUser: action.data,
        loading: false
      };

    case constants.APP_USER_LOGOUT:
      return {
        ...state,
        currentUser: action.data,
        showPage: 'home',
        loading: false
      };

    case constants.APP_PAGE_SHOW:
      return {
        ...state,
        showPage: action.data,
        showMenu: false,
        showChat: false
      };

    case constants.APP_CHAT_TOGGLE:
      return {
        ...state,
        showChat: !state.showChat,
        showMenu: false
      };

    case constants.APP_MENU_TOGGLE:
      return {
        ...state,
        showMenu: !state.showMenu,
        showChat: false
      };

    case constants.APP_PLATFORM_GET: {
      return {
        ...state,
        platform: action.data
      };
    }

    case constants.APP_LOADING:
      return { ...state, loading: action.data };

    case constants.SET_AUTH:
      return { ...state, auth: action.data };

    default:
      return state;
  }
};

export default app;
