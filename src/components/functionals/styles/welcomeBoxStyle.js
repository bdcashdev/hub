import palette from './palette';

const white = palette.white;
const primary = palette.primary;
const grey = palette.textLignt;

export default {
  root: {
    '& .welcome-box__wrapper': {
      height: '100px'
    },
    listStyleType: 'disc',
    '& .Paper': {
      minHeight: '100px',
      width: '100%',
      // margin: '20px 20px',
      display: 'inline-block',
      boxShadow: 'rgba(0, 0, 0, 0.20) 0px 5px 30px',
      padding: '20px',

      '& .heading': {
        color: '#3498db'
      },
      '& .logoDiv': {
        textAlign: 'center',
        textAlign: 'center',
        '& img': {
          width: '100%'
        }
      },
      '& .addvertiseText': {
        marginTop: '20px',
        fontSize: '16px',
        '& .wellcomBoxTextList': {
          paddingLeft: '25px',
          listStyleType: 'disc'
        },
        '& .listItem': {
          padding: '10px 0px'
        }
      },

      '& .joinBtn': {
        textAlign: 'right',
        '& .btnText': {
          color: '#ffff'
        },
        '& .btn': {
          borderRadius: '8px',
          background: primary
        }
      }
    },
    '& .tile__wrapper': {
      height: '100% !important',
      '&.logo':{
        marginTop:55
      }
    }
  },
  mRoot: {
    extend: 'root',
    '& .Paper': {
      padding: '30px',
      '& .heading': {
        fontSize: 22,
        textAlign: 'center'
      }
    },
    '& .joinBtn': {
      textAlign: 'center !important'
    },
    '& .tile__wrapper': {
      '&.logo':{
        marginTop:5
      }
    }
  }
};
