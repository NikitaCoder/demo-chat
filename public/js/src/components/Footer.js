import React from 'react';

class Footer extends React.Component{
    constructor(props){
        super(props);

    }
    render(){
        return(
            <footer className="footer">
                <div>
                    Created by Ilya Barbashov: <br />
                    <a href="https://github.com/Ilya225/demo-chat"> Demo Chat on GitHub </a> <br />
                    {new Date().getFullYear()}<br />
                </div>
            </footer>
        );
    }
}

export default Footer;