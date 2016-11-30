import { green200, lime800 } from 'material-ui/styles/colors';

const styles = {
  container: {
    textAlign: 'center',
  },
  intro: {
      background: green200,
      position: 'absolute',
      width: '100%',
      height: '350px',
      color: '#fff',
      fontSize: 30
  },
  linkColor:{
      color: lime800,
  },
  userData: {
      width: '98%',
      fontSize: '30px',
      textAlign: 'justify',
      lineHeight: '2',
      paddingTop: '100px',
      margin: 'auto',
  },
  contacts: {
      width: '98%',
      margin: 'auto',
      paddingTop: '15px',
  },
  userCard: {
      width: '100%',
      fontSize: '20px',
      display: 'inline-block',
  },
  logo: {
      position: 'relative',
  },
  button: {
      margin: '5px',
  },
  tabs: {
      paddingTop: '150px',
      width: '98%', 
      margin: 'auto',
  },
  content: {
      paddingTop: 180
  },
  orcomp: {
      fontSize: 25
  },
  getStart: {
      marginTop: '30px'
  },
  postCont: {
      paddingTop: '10px',
  },
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
  error: {
      color: 'red',
  }
};

export default styles;