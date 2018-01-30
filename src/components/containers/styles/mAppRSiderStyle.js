import palette from './palette';

const primary = palette.primary;
const greyLight = palette.greyLight;
const grey = palette.grey;

const wraper = {
  //border: '1px solid green',
  display: 'flex',
  flexDirection: 'column',
  justifyAlign: 'flex-start',
  flex: '0 1 20%',
  background: greyLight,
};
const sider = {
  backgroundColor: primary, //'#ff0045',
};

export default {
  wraper,
  sider,
};