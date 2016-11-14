import React from 'react';
import ReactDOM from 'react-dom';
import MyLogo from '../components/MyLogo';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RegisterForm from '../components/RegisterForm';
import muiTheme from '../components/muiTheme';
import styles from '../components/styles';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class GetStarted extends React.Component{
    constructor(props, context){
        super(props, context);

    }

    componentDidMount(){
        document.title="Get Started";
    }

    render(){
        return (
            
                        <div style={styles.container}>
                            <Header />
                            <div style={styles.intro} >
                            </div>
                                <div style={styles.content}>
                                <MyLogo  />
                            </div>
                            <div className="get_started_container">
                                <h1 className="main_header">Get Started </h1>
                                <div className="get_started">
                                    First you need to <a style={styles.linkColor} href="/register">register</a> in Demo Chat application,
                                    Than you need to add someone to your contact list and than you can begin the new conversation.
                                    Thats very easy, take a pleasure.
                                </div>
                            </div>
                            <Footer />
                        </div>
        );
    }
}

module.exports = GetStarted;