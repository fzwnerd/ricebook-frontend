import React, { Component } from 'react';

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container header">
                <div className="row">
                    <div className="col-12 col-md-4 justify-content-center">
                        <img z-index="-1" src="assets/images/rice.png" height="80" width="70" alt="Rice University Logo" />           
                    </div>
                    <div className="col-12 col-md justify-content-center">
                        <h1>WEB DEV: RICEBOOK</h1>
                    </div>
                </div>
            </div>
        );
    }

}

export default Header;
