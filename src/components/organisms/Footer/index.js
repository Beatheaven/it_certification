// Footer Component
// --------------------------------------------------------

import React, { Component } from 'react';
import './styles.scss';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: 2021
    };
  }

  render() {
    const { year } = this.state;
    return (
      <div className="o-footer">
        <div className="container">
          <div className=" pr-0">
            <div className="col-md-12">
              <div className="title-footer">
                {year} PT.Bank Rakyat Indonesia (Persero) Tbk
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Footer;
