import constants from '../constants';
import { HTTPAsync } from '../helpers';

/**---------------------------------------------------------------------------- */
/** TO CHANGE THE URL FOR THE API GO TO "/src/redux/constants/apiURLsConst.js"  */
/**---------------------------------------------------------------------------- */

const baseApiURL = constants.URL_SYS_MN_PROD_API; // Quang HTTPS server

/**---------------------------------------------------------------------------- */

export default {

  getSysMnRegistered: () => {
    return dispatch =>
      dispatch(
        HTTPAsync.fireMn(constants.SYS_STATS_RMN_GET)
      );
  },

  getSysUserRegistered: () => {
    return dispatch =>
      dispatch(
        HTTPAsync.fireUser(constants.SYS_STATS_USER_GET)
      );
  },

  getSysPrice: () => {
    return dispatch => {
      return dispatch(
        HTTPAsync.get(
          `${baseApiURL}/curl?url="https://api.coinmarketcap.com/v1/ticker/syscoin/"`,
          null,
          constants.SYS_STATS_PRICE_GET
        )
      );
    };
  },

  getSysMnCount: () => {
    return dispatch => {
      return dispatch(
        HTTPAsync.post(
          `${baseApiURL}/cmd`, { 'script': 'masternode count' },
          constants.SYS_STATS_TMN_GET
        )
      );
    };
  }
};