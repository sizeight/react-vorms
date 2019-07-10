import React from 'react';
import PropTypes from 'prop-types';


const propTypes = {
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
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
  })).isRequired,

  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

const defaultProps = {
  required: false,
};

/*
 * Custom multiple checkbox component.
 */
const CustomFormInputMultiCheckbox = (props) => {
  const {
    name, value, required, options, onChange, onBlur,
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
      const idx = value.findIndex(v => v === optionValue);
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
          className="custom-control custom-control-inline custom-checkbox"
          key={option.value}
        >
          <input
            className="custom-control-input"
            type="checkbox"
            name={`${name}:${i}`} // e.g. tags:2
            id={`id-${name}-${i}`} // e.g. id-tags-2

            required={required}
            checked={value.findIndex(val => val === option.value) > -1}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label /* eslint-disable-line jsx-a11y/label-has-for */
            className="custom-control-label"
            htmlFor={`id-${name}-${i}`}
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
