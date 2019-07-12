import React from 'react';
import PropTypes from 'prop-types';

import CustomFormInputDateTime from './CustomFormInputDateTime';
import CustomFormInputFile from './CustomFormInputFile';
import CustomFormInputMultiCheckbox from './CustomFormInputMultiCheckbox';
import CustomFormInputTextAreaWYSIWYG from './CustomFormInputTextAreaWYSIWYG';
import InvalidFeedback from './InvalidFeedback';
import countries from '../constants';

const countryOptions = countries;


const propTypes = {
  // From definition
  type: PropTypes.oneOf([
    'text', 'textarea', 'checkbox', 'email', 'datetime', 'date', 'file',
    'textarea-wysiwyg', 'hidden',
    'select', 'radio', // select one from multiple optons
    'multi-checkbox', // select many from multiple options
  ]).isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  initialValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  placeholder: PropTypes.string, // If no placeholder given, we leave out placeholder
  helpText: PropTypes.string,
  hideLabel: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.shape({ // Optional, only for select, multi-checkbox
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    label: PropTypes.string,
  })),
  validation: PropTypes.shape({
    required: PropTypes.bool,
    min: PropTypes.number,
    max: PropTypes.number,
    email: PropTypes.bool,
  }),
  width: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  disabled: PropTypes.bool,

  // From hook
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]).isRequired,
  errors: PropTypes.arrayOf(PropTypes.object).isRequired,
  touched: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  setFieldTouched: PropTypes.func.isRequired,
};

const defaultProps = {
  hideLabel: false,
  placeholder: '',
  helpText: '',
  options: [],
  validation: {},
  width: undefined,
  disabled: false,
};

const FormInputFieldWithHooks = (props) => {
  const {
    type, name, initialValue, label, hideLabel, placeholder, validation, helpText, options, width,
    disabled,
  } = props;
  const {
    value, errors, touched, onChange, onBlur, setFieldValue, setFieldTouched,
  } = props;

  // Has this field been touched and does it have any error?
  const invalid = errors && touched;

  const required = validation ? (validation.required) : false;

  let selectOptions = options;
  if (name === 'country') {
    selectOptions = countryOptions;
  }

  return (
    <div className={`form-group ${width ? `col-md-${width}` : 'col-md'}`}>
      {(['checkbox', 'hidden'].findIndex(x => x === type) === -1) && (
        <label /* eslint-disable-line jsx-a11y/label-has-for */
          className={hideLabel === true ? 'sr-only' : ''}
          htmlFor={`id-${name}`}
        >
          {`${label}${required ? ' *' : ''}`}
        </label>
      )}


      {(type === 'text' || type === 'email' || type === 'hidden') && (
        <input
          className={`form-control form-control-sm${invalid ? ' is-invalid' : ''}`}
          type={type}
          name={name}
          id={`id-${name}`}

          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          invalid={invalid}
          disabled={disabled}
        />
      )}


      {type === 'textarea' && (
        <textarea
          className={`form-control form-control-sm${invalid ? ' is-invalid' : ''}`}
          name={name}
          id={`id-${name}`}

          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          invalid={invalid}
          disabled={disabled}

          rows="10"
        />
      )}


      {type === 'select' && (
        <select
          className={`form-control form-control-sm${invalid ? ' is-invalid' : ''}`}
          type="select"
          name={name}
          id={`id-${name}`}

          required={required}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          invalid={invalid}
          disabled={disabled}
        >
          {selectOptions.map(option => (
            <option
              value={option.value}
              key={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      )}


      {type === 'checkbox' && (
        <div className="custom-control custom-checkbox">
          <input
            className={`custom-control-input${invalid ? ' is-invalid' : ''}`}
            type="checkbox"
            name={name}
            id={`id-${name}`}

            required={required}
            checked={value}
            onChange={onChange}
            onBlur={onBlur}
            invalid={invalid}
            disabled={disabled}
          />
          <label /* eslint-disable-line jsx-a11y/label-has-for */
            className="custom-control-label"
            htmlFor={`id-${name}`}
          >
            {label}
          </label>
        </div>
      )}


      {type === 'radio' && (
        <React.Fragment>
          {options.map(option => (
            <div className="custom-control custom-radio">
              <input
                className={`custom-control-input${invalid ? ' is-invalid' : ''}`}
                type="radio"
                name={name}
                id={`id-${name}-${option.value}`}

                value={option.value}
                key={option.value}

                required={required}
                checked={value === option.value}
                onChange={onChange}
                onBlur={onBlur}
                invalid={invalid}
                disabled={disabled}
              />
              <label /* eslint-disable-line jsx-a11y/label-has-for */
                className="custom-control-label"
                htmlFor={`id-${name}-${option.value}`}
              >
                {option.label}
              </label>
            </div>
          ))}
        </React.Fragment>
      )}


      {type === 'multi-checkbox' && (
        <CustomFormInputMultiCheckbox
          name={name}
          options={options}
          value={value}
          invalid={invalid}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
        />
      )}


      {(type === 'datetime' || type === 'date') && (
        <CustomFormInputDateTime
          type={type}
          name={name}
          value={value}
          invalid={invalid}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
        />
      )}


      {type === 'textarea-wysiwyg' && (
        <CustomFormInputTextAreaWYSIWYG
          name={name}
          placeholder={placeholder}
          value={value}
          invalid={invalid}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
        />
      )}


      {type === 'file' && (
        <CustomFormInputFile
          name={name}
          initialValue={initialValue}
          value={value}
          invalid={invalid}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
        />
      )}


      <InvalidFeedback errors={errors} />


      {helpText && (
        <small
          className="form-text text-muted"
          id={`id-${name}-helptext`}
        >
          {helpText}
        </small>
      )}
    </div>
  );
};

FormInputFieldWithHooks.propTypes = propTypes;
FormInputFieldWithHooks.defaultProps = defaultProps;

export default FormInputFieldWithHooks;
