import React from 'react';
import PropTypes from 'prop-types';

import { CustomInput } from 'reactstrap';


const propTypes = {
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  initialValue: PropTypes.string.isRequired,

  value: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  ).isRequired,
  invalid: PropTypes.bool,
  /*
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    label: PropTypes.string,
  })).isRequired,
  */
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

const defaultProps = {
  required: false,
  invalid: false,
};

/*
 * Custom file input component.
 */
class CustomFormInputFile extends React.Component {
  handleChange = (e) => {
    const { name, onChange } = this.props;
    onChange(name, e.currentTarget.files[0]);
  }

  handleBlur = () => {
    const { name, onBlur } = this.props;
    onBlur(name, true);
  }

  handleClear = (e) => {
    const { name, onChange } = this.props;
    const val = e.target.checked ? null : undefined;
    onChange(name, val);
  }

  render() {
    const {
      name, required, initialValue, value, invalid,
    } = this.props;

    const label = (value && value.name) ? `${value.name}, ${value.size} bytes` : '';

    return (
      <React.Fragment>
        <CustomInput
          type="file"
          name={name}
          id={`id-${name}`}

          bsSize="sm"

          required={required}
          label={label}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          invalid={invalid}
        />
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
          <CustomInput
            type="checkbox"
            className="clear-file ml-1 mr-1"
            id="clearFile"
            label="Clear"
            inline

            onClick={this.handleClear}
          />
        </small>
      </React.Fragment>
    );
  }
}

CustomFormInputFile.propTypes = propTypes;
CustomFormInputFile.defaultProps = defaultProps;

export default CustomFormInputFile;
