import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { validateURL } from '../utils';


const propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  initialValue: PropTypes.string.isRequired, // Must be a valid URL to file OR empty string

  value: PropTypes.oneOfType([
    PropTypes.string, // ''
    PropTypes.object, // File object
    // can also be undefined when we do not want to 'upload' new file
  ]),
  invalid: PropTypes.bool.isRequired,

  required: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,

  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

const defaultProps = {
  disabled: false,
  value: undefined,
};

/*
 * Custom file input component.
 */
const CustomFormInputFile = (props) => {
  const {
    id, name, initialValue, value, invalid, disabled, required, onChange, onBlur,
  } = props;


  // Check if initialValue is undefined OR valid URL.
  let checkedInitialValue; // undefined if empty string
  if (initialValue !== '') {
    if (validateURL(initialValue)) {
      checkedInitialValue = initialValue;
    } else {
      console.warn('FormInput of type `file` has initialValue that is not a valid URL');
    }
  }


  let size = '';
  if (value && value.size) {
    size = `${value.size} bytes`;
    if (value.size > 1000) {
      size = `${(value.size / 1000).toFixed(1)} kB`;
    }
    if (value.size > (1000 * 1000)) {
      size = `${(value.size / (1000 * 1000)).toFixed(1)} MB`;
    }
  }


  const clearCheckBox = useRef(undefined);


  const label = (value && value.name) ? `${value.name}, ${size}` : '';
  function handleChange(e) {
    // Do not fire if cancel was clicked
    if (e.currentTarget.files.length === 1) {
      if (clearCheckBox.current) {
        clearCheckBox.current.checked = false; // If a file is chosen, then uncheck the clear box
      }
      onChange(name, e.currentTarget.files[0]);
    }
  }


  function handleBlur() {
    onBlur(name, true);
  }


  /*
   * If clear is checked, value=null to indicate to server that we want to delete the current file.
   * If clear is unchecked, value=undefined to indicate to server that the file field should not
   * be updated.
   */
  function handleClear(e) {
    // ERROR: The prop `value` is marked as required in `FormInputField`, but its value is `null`
    const val = e.target.checked ? null : undefined;
    onChange(name, val);
  }


  return (
    <>
      <div className="custom-file custom-file-sm">
        <input
          className={`custom-file-input${invalid ? ' is-invalid' : ''}`}
          type="file"
          name={name}
          id={id}
          disabled={disabled}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <label /* eslint-disable-line jsx-a11y/label-has-for */
          className="custom-file-label"
          htmlFor={id}
        >
          {label}
        </label>
      </div>
      {checkedInitialValue && (
        <small>
          <span className="mr-1">
            Currently:
          </span>
          <a
            href={checkedInitialValue}
            target="_blank"
            rel="noopener noreferrer"
          >
            {checkedInitialValue}
          </a>
          {!required && (
            <div className="custom-control custom-control-inline custom-checkbox clear-file ml-1 mr-1 ">
              <input
                className="custom-control-input"
                type="checkbox"
                id={`clearFile__${id}`}
                disabled={disabled}
                onClick={handleClear}
                ref={clearCheckBox}
              />
              <label /* eslint-disable-line */
                className="custom-control-label"
                htmlFor={`clearFile__${id}`}
              >
                Clear
              </label>
            </div>
          )}
        </small>
      )}
    </>
  );
};

CustomFormInputFile.propTypes = propTypes;
CustomFormInputFile.defaultProps = defaultProps;

export default CustomFormInputFile;
