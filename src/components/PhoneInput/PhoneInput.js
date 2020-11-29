import React, { Component } from 'react';
import PhoneInput from "react-phone-input-textfield-filled";
import "react-phone-input-textfield-filled/dist/style.css";

class Phone extends Component {

  render() {
    return (
      <div>
        <PhoneInput 
          inputExtraProps={{
            name: "phone",
            required: true,
            autoFocus: true
          }}
          label=""
          defaultCountry="in"
          country={'in'}
          value={this.props.phone}
          onChange={this.props.handleOnChange}
        />
      </div>
    );
  }
}

export default Phone