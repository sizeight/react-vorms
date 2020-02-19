import React from 'react';
import PropTypes from 'prop-types';

// import CustomFormInputDateTime from './CustomFormInputDateTime';
import CustomFormInputFile from './CustomFormInputFile';
import CustomFormInputMultiCheckbox from './CustomFormInputMultiCheckbox';
// import CustomFormInputTextAreaWYSIWYG from './CustomFormInputTextAreaWYSIWYG';
import InvalidFeedback from './InvalidFeedback';
import { COUNTRIES } from '../constants';


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
    PropTypes.bool,
    PropTypes.array,
  ]).isRequired,
  placeholder: PropTypes.string.isRequired, // If no placeholder given, we leave out placeholder
  helpText: PropTypes.string.isRequired,
  hideLabel: PropTypes.bool.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({ // Optional, only for select, radio & multi-checkbox
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
  })),
  validation: PropTypes.shape({
    required: PropTypes.bool,
    min: PropTypes.number,
    max: PropTypes.number,
    email: PropTypes.bool,
    extensions: PropTypes.arrayOf(
      PropTypes.oneOf([
        'GIF',
        'ICO',
        'JPG',
        'PDF',
        'PNG',
      ]),
    ),
  }).isRequired,
  width: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  disabled: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired, // optional, eg if you want field to display: none

  // From hook
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
  errors: PropTypes.arrayOf(PropTypes.string),
  touched: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  setFieldTouched: PropTypes.func.isRequired,
};

const defaultProps = {
  options: [],
  width: undefined,
  errors: undefined,
};

const FormInputField = (props) => {
  const {
    type, name, initialValue, label, hideLabel, placeholder, validation, helpText, options, width,
    disabled, className,
    value, errors, touched, onChange, onBlur, setFieldValue, setFieldTouched,
  } = props;

  // Does this field have any errors and has it been touched?
  const invalid = errors !== undefined && touched;

  const required = validation ? (validation.required) : false;

  let selectOptions = options;
  /*
   * If field name is `country` and no options set on the field, use the built in COUNTRIES
   */
  if (name === 'country' && options.length === 0) {
    selectOptions = COUNTRIES;
  }

  // Assistive technologies
  const helpTextId = `id-${name}-helptext`;
  const ariaDescribedBy = helpText ? helpTextId : null;


  // If field type is `file` and only certain extensions are allowed, include this in the helpText
  let helpTextExtra;
  if (type === 'file' && validation.extensions) {
    const tmp = validation.extensions.join(', ');
    const idx = tmp.lastIndexOf(',');
    helpTextExtra = ` Only ${tmp.slice(0, idx)} or${tmp.slice(idx + 1)} allowed.`;
  }


  return (
    <div className={`form-group ${width ? `col-md-${width}` : 'col-md'}${className ? ` ${className}` : ''}`}>
      {(['checkbox', 'hidden'].findIndex((x) => x === type) === -1) && (
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
          disabled={disabled}

          aria-describedby={ariaDescribedBy}
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
          disabled={disabled}

          rows="10"
          aria-describedby={ariaDescribedBy}
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
          disabled={disabled}
          aria-describedby={ariaDescribedBy}
        >
          {selectOptions.map((option) => (
            <option
              value={option.value}
              disabled={option.disabled}
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
            disabled={disabled}

            aria-describedby={ariaDescribedBy}
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
        <>
          {options.map((option) => (
            <div
              className="custom-control custom-radio"
              key={option.value}
            >
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
                disabled={disabled || option.disabled}

                aria-describedby={ariaDescribedBy}
              />
              <label /* eslint-disable-line jsx-a11y/label-has-for */
                className="custom-control-label"
                htmlFor={`id-${name}-${option.value}`}
              >
                {option.label}
              </label>
            </div>
          ))}
        </>
      )}


      {type === 'multi-checkbox' && (
        <CustomFormInputMultiCheckbox
          name={name}
          options={options}
          value={value}
          invalid={invalid}
          onChange={setFieldValue}
          onBlur={setFieldTouched}

          disabled={disabled}
        />
      )}


      {/*
      (type === 'datetime' || type === 'date') && (
        <CustomFormInputDateTime
          type={type}
          name={name}
          value={value}
          invalid={invalid}
          onChange={setFieldValue}
          onBlur={setFieldTouched}

          disabled={disabled}
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
      )
      */}


      {type === 'file' && (
        <CustomFormInputFile
          name={name}
          initialValue={initialValue}
          value={value}
          invalid={invalid}
          onChange={setFieldValue}
          onBlur={setFieldTouched}

          disabled={disabled}
        />
      )}


      <InvalidFeedback errors={errors} />


      {helpText && (
        <small
          className="form-text text-muted"
          id={helpTextId}
        >
          {`${helpText}${helpTextExtra}`}
        </small>
      )}
    </div>
  );
};

FormInputField.propTypes = propTypes;
FormInputField.defaultProps = defaultProps;

export default FormInputField;
