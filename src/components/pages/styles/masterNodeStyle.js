import palette from './palette';

const white = palette.white;
const greyDark = palette.greyDark;
const boxShadow = palette.boxShadow;

export default {
  root: {
    '& .title': {
      fontWeight: 300,
      color: greyDark,
      textTransform: 'uppercase',
      padding: 15,
      margin: 'auto',
    },
    '& .masternode-div': {
      background: white,
      padding: 25,
      overflowY: 'auto',
      height: '80vh',
      boxShadow: boxShadow
    }
  },
  mRoot: {
    extend: 'root',
    '& .title': {
      width: '100%',
    },
    '& .masternode-div': {
      height: 'auto',
      padding: 20
    }
  }
};
