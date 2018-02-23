import palette from './palette';

const white = palette.white;
const boxShadow = palette.boxShadow;

export default {
  root: {
    background: white,
    padding:'10px 10px 45px 10px',
    overflowY: 'auto',
    maxHeight: 'calc(80vh - 20px)',
    boxShadow: boxShadow

  },
};
