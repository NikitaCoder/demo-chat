import React from 'react';
import ReactDOM from 'react-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import styles from '../components/styles';
import UserData from '../components/UserData';
import UserStore from '../api/stores/UserStore';


class UserPage extends React.Component{
    constructor(props, context){
        super(props, context);

        this.state = 
        {
            loggedIn: UserStore.isLoggedIn(),
            user: UserStore.getUser(),
        }

        this._onRegiser = this._onRegiser.bind(this);

    }

    componentDidMount(){
        UserStore.addChangeListener(this._onRegiser);
        document.title="Profile";
        
    }

    componentWillUnmount(){
        UserStore.removeChangeListener(this._onRegiser);
    }

  _onRegiser(){
    this.setState({
      loggedIn: UserStore.isLoggedIn(),
      user: UserStore.getUser(),
    });
    }

    render(){
        return (
            
                        <div style={styles.container}>
                            <Header loggedIn={this.state.loggedIn} />
                            <div  >
                            {this.state.loggedIn ? <UserData user={this.state.user} /> : "" } 
                            </div>
                           
                            <Footer />
                        </div>
        );
    }
}

module.exports = UserPage;