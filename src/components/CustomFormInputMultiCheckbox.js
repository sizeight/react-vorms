import React from 'react';
import PropTypes from 'prop-types';


const propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  ).isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    label: PropTypes.string,
    disabled: PropTypes.bool,
  })).isRequired,
  invalid: PropTypes.bool.isRequired,

  disabled: PropTypes.bool,

  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

const defaultProps = {
  disabled: false,
};

/*
 * Custom multiple checkbox component.
 */
const CustomFormInputMultiCheckbox = (props) => {
  const {
    id, name, options, value, invalid, disabled, onChange, onBlur,
  } = props;


  function handleChange(e) {
    const { target } = e;
    const { checked } = target;
    const optionName = target.name;
    const optionsIndex = Number.parseInt(optionName.split(':')[1], 10);
    const optionValue = options[optionsIndex].value;

    let newValue = [];
    if (checked) {
      newValue = [
        ...value,
        optionValue,
      ];
    } else {
      const idx = value.findIndex((v) => v === optionValue);
      newValue = [
        ...value.slice(0, idx),
        ...value.slice(idx + 1),
      ];
    }
    onChange(name, newValue);
  }


  function handleBlur() {
    onBlur(name, true);
  }


  return (
    <div>
      {options.map((option, i) => (
        <div
          className="custom-control custom-control-inline custom-checkbox    bs5 form-check"
          key={option.value}
        >
          <input
            className={`custom-control-input    bs5 form-check-input${invalid ? ' is-invalid' : ''}`}
            type="checkbox"
            name={`${name}:${i}`} // e.g. tags:2
            id={`${id}__${i}`} // e.g. id-tags-2
            checked={value.findIndex((val) => val === option.value) > -1}
            disabled={disabled || option.disabled}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label /* eslint-disable-line jsx-a11y/label-has-for */
            className="custom-control-label"
            htmlFor={`${id}__${i}`}
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

CustomFormInputMultiCheckbox.propTypes = propTypes;
CustomFormInputMultiCheckbox.defaultProps = defaultProps;

export default CustomFormInputMultiCheckbox;
