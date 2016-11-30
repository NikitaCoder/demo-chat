import React from 'react';
import ReactDOM from 'react-dom';
import MyLogo from '../components/MyLogo';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RegisterForm from '../components/RegisterForm';
import muiTheme from '../components/muiTheme';
import styles from '../components/styles';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import UserStore from '../api/stores/UserStore';

class GetStarted extends React.Component{
    constructor(props, context){
        super(props, context);

        this.state = 
        {
            logged : UserStore.isLoggedIn(),
        }

        this._onRegiser = this._onRegiser.bind(this);

    }

     componentDidMount(){
        UserStore.addChangeListener(this._onRegiser);
        document.title="Get Started";
    }

    componentWillUnmount(){
        UserStore.removeChangeListener(this._onRegiser);
    }

    _onRegiser(){
        this.setState({
            logged: UserStore.isLoggedIn(),
        });
        console.log(this.state.user);
        console.log(this.state.validationErrors);
    }

    render(){
        return (
            
                        <div style={styles.container}>
                            <Header loggedIn={this.state.logged} />
                            <div style={styles.intro} >
                            </div>
                                <div style={styles.content}>
                                <MyLogo  />
                            </div>
                            <div className="get_started_container">
                                <h1 className="main_header">Get Started </h1>
                                <div className="get_started">
                                    First you need to <a style={styles.linkColor} href="#/register">register</a> in Demo Chat application,
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