import React from 'react';
import PropTypes from 'prop-types';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const propTypes = {
  type: PropTypes.oneOf(['datetime', 'date']).isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

const defaultProps = {
  value: undefined,
};

/*
 * Render a datetime or a date only input field the react-datepicker.
 */
const CustomFormInputDateTime = (props) => {
  const {
    name, type, value, onChange, onBlur,
  } = props;


  /*
   * If a valid Date object is available, set the state to the string representation, otherwise
   * set to null.
   */
  function handleChange(date) {
    let newValue = null;
    if (date instanceof Date) {
      newValue = date.toISOString();
    }
    onChange(name, newValue);
  }


  function handleRawChange(e) {
    const newValue = e.target.value;
    onChange(name, newValue);
  }


  function handleBlur(e) {
    let date;
    try {
      date = new Date(e.target.value);
      // console.log('date: ', date);
      // console.log('instaceof: ', date instanceof Date);
      // console.log('isNaN', !Number.isNaN(date));
      // console.log('isNaN(date.getTime())', Number.isNaN(date.getTime()));
      // console.log('isNaN(date.valueOf())', Number.isNaN(date.valueOf()));
      // console.log('object', Object.prototype.toString.call(date) === '[object Date]');
      let newValue = null;
      if (Object.prototype.toString.call(date) === '[object Date]' && !Number.isNaN(date.valueOf())) {
        // Valid date
        newValue = date.toISOString();
      }
      onChange(name, newValue);
    } catch (errors) {
      // Do nothing
    }

    onBlur(name, true);
  }


  // datetime field needs extra props to display time picker
  const showTime = type === 'datetime'
    ? {
      showTimeSelect: true,
      timeFormat: 'HH:mm',
      timeIntervals: 15,
      timeCaption: 'time',
      dateFormat: 'dd MMMM yyyy HH:mm',
    } : {
      dateFormat: 'dd MMMM yyyy',
    };

  return (
    <DatePicker
      className="form-control-sm form-control" // Bootstrap 4

      type={type}
      name={name}
      id={`id-${name}`}

      selected={value ? new Date(value) : null}
      onChange={handleChange}
      onChangeRaw={handleRawChange}
      onBlur={handleBlur}

      autoComplete="off"
      todayButton="Today"
      isClearable
      clearButtonTitle="Clear"
      shouldCloseOnSelect
      {...showTime}
    />
  );
};

CustomFormInputDateTime.propTypes = propTypes;
CustomFormInputDateTime.defaultProps = defaultProps;

export default CustomFormInputDateTime;
