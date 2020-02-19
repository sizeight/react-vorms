import React from 'react';
import PropTypes from 'prop-types';


const propTypes = {
  name: PropTypes.string.isRequired,
  initialValue: PropTypes.string.isRequired,

  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
  invalid: PropTypes.bool.isRequired,

  disabled: PropTypes.bool,

  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

const defaultProps = {
  disabled: false,
};

/*
 * Custom file input component.
 */
const CustomFormInputFile = (props) => {
  const {
    name, initialValue, value, invalid, disabled, onChange, onBlur,
  } = props;


  let size = `${value.size} bytes`;
  if (value.size > 1000) {
    size = `${(value.size / 1000).toFixed(1)} kB`;
  }
  if (value.size > (1000 * 1000)) {
    size = `${(value.size / (1000 * 1000)).toFixed(1)} MB`;
  }

  const label = (value && value.name) ? `${value.name}, ${size}` : '';


  function handleChange(e) {
    onChange(name, e.currentTarget.files[0]);
  }


  function handleBlur() {
    onBlur(name, true);
  }


  function handleClear(e) {
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
          id={`id-${name}`}

          disabled={disabled}

          onChange={handleChange}
          onBlur={handleBlur}
        />
        <label /* eslint-disable-line jsx-a11y/label-has-for */
          className="custom-file-label"
          htmlFor={`id-${name}`}
        >
          {label}
        </label>
      </div>
      {initialValue && (
        <small>
          <span className="mr-1">
            Currently:
          </span>
          <a
            href={initialValue}
            target="_blank"
            rel="noopener noreferrer"
          >
            {initialValue}
          </a>
          <div className="custom-control custom-control-inline custom-checkbox clear-file ml-1 mr-1 ">
            <input
              className="custom-control-input"
              type="checkbox"
              id="clearFile"

              disabled={disabled}

              onClick={handleClear}
            />
            <label /* eslint-disable-line */
              className="custom-control-label"
              htmlFor="clearFile"
            >
              Clear
            </label>
          </div>
        </small>
      )}
    </>
  );
};

CustomFormInputFile.propTypes = propTypes;
CustomFormInputFile.defaultProps = defaultProps;

export default CustomFormInputFile;
