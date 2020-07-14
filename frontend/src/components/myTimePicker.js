import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class myTimePickerComponent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount () {
  }

  render () {
    return (
      <DatePicker
        selected={this.props.myDate}
        onChange={this.props.handleChange}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={this.props.myInterval}
        timeCaption='Time'
        disabledKeyboardNavigation
        timeFormat='HH:mm'
        dateFormat='HH:mm'
      />);
  }
}

export default myTimePickerComponent;
