import {green900, green50, green200,grey400,grey500,grey100,darkBlack,white,fullBlack,grey300,lime500,limeA200,lime800} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: green900,
    primary2Color: green200,
    primary3Color: lime500,
    accent2Color: lime500,
    accent3Color: green900,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: green50,
    borderColor: grey300,
    disabledColor: fade(fullBlack, 0.3),
    pickerHeaderColor: green900,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
    accent1Color: lime500,
  } 
}, {
  avatar: {
    borderColor: null,
  },
  userAgent: '',//req.headers['user-agent'],
});

module.exports=muiTheme;