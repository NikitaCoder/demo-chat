import React from 'react';
import MyLogo from '../components/MyLogo';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RegisterForm from '../components/RegisterForm';
import styles from '../components/styles';

class Register extends React.Component{
    constructor(props, context){
        super(props, context);

    }

    componentDidMount(){
        document.title="Register";
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
                            <h1 className="main_header">Register Form </h1>
                            <RegisterForm />
                            <Footer />
                        </div>
        );
    }
}

module.exports = Register;