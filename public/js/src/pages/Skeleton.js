import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import muiTheme from '../components/muiTheme';


const Skeleton = React.createClass({
  render() {
    return (
      <MuiThemeProvider muiTheme={this.props.muiTheme ? this.props.muiTheme: muiTheme}>
        {this.props.children}
      </MuiThemeProvider>
    )
  }
});

module.exports=Skeleton;