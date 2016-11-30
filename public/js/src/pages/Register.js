import React from 'react';
import MyLogo from '../components/MyLogo';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RegisterForm from '../components/RegisterForm';
import RegisterError from '../components/RegisterError';
import styles from '../components/styles';
import UserStore from '../api/stores/UserStore';

class Register extends React.Component{
    constructor(props, context){
        super(props, context);

        this.state = 
        {
            logged: UserStore.isLoggedIn(),
            validationErrors: UserStore.getErrors(),
            user: UserStore.getUser(),

        }

        this._onRegiser = this._onRegiser.bind(this);

    }

    componentDidMount(){
        UserStore.addChangeListener(this._onRegiser);
        document.title="Register";
    }

    componentWillUnmount(){
        UserStore.removeChangeListener(this._onRegiser);
    }

    _onRegiser(){
        this.setState({
            logged: UserStore.isLoggedIn(),
            validationErrors: UserStore.getErrors(),
            user: UserStore.getUser(),
        });
    }

    render(){
        var form = "";
        if(this.state.validationErrors){
            form = <RegisterError errors={this.state.validationErrors} />;
        }
        else{
            form = <RegisterForm />;
        }

        return (
            
                        <div style={styles.container}>
                            <Header loggedIn={this.state.logged} />
                            <div style={styles.intro} >
                            </div>
                                <div style={styles.content}>
                                <MyLogo  />
                            </div>
                            <h1 className="main_header">Register Form </h1>
                            {form}
                            <Footer />
                        </div>
        );
    }
}

module.exports = Register;