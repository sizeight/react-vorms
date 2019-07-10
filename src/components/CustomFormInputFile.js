import React from 'react';
import PropTypes from 'prop-types';


const propTypes = {
  name: PropTypes.string.isRequired,
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
      name, initialValue, value, invalid,
    } = this.props;

    const label = (value && value.name) ? `${value.name}, ${value.size} bytes` : '';

    return (
      <React.Fragment>
        <div className="custom-file custom-file-sm">
          <input
            className={`custom-file-input${invalid ? ' is-invalid' : ''}`}
            type="file"
            name={name}
            id={`id-${name}`}

            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
          <label /* eslint-disable-line jsx-a11y/label-has-for */
            className="custom-file-label"
            htmlFor={`id-${name}`}
          >
            {label}
          </label>
        </div>
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
              onClick={this.handleClear}
            />
            <label /* eslint-disable-line */
              className="custom-control-label"
              htmlFor="clearFile"
            >
              Clear
            </label>
          </div>
        </small>
      </React.Fragment>
    );
  }
}

CustomFormInputFile.propTypes = propTypes;
CustomFormInputFile.defaultProps = defaultProps;

export default CustomFormInputFile;
