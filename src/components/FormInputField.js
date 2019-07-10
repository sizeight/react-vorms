import React from 'react';
import PropTypes from 'prop-types';

import { CustomInput } from 'reactstrap';

import { connect, getIn } from 'formik';

import CustomFormInputDateTime from './CustomFormInputDateTime';
import CustomFormInputFile from './CustomFormInputFile';
import CustomFormInputMultiCheckbox from './CustomFormInputMultiCheckbox';
import CustomFormInputTextAreaWYSIWYG from './CustomFormInputTextAreaWYSIWYG';
import countries from '../constants';

const countryOptions = countries;


const propTypes = {
  type: PropTypes.oneOf([
    'text', 'textarea', 'checkbox', 'email', 'datetime', 'date', 'file',
    'textarea-wysiwyg', 'hidden',
    'select', 'radio', // select one from multiple optons
    'multi-checkbox', // select many from multiple options
  ]).isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  initialValue: PropTypes.node.isRequired,
  hideLabel: PropTypes.bool,
  placeholder: PropTypes.string, // If no placeholder given, we leave out placeholder
  helpText: PropTypes.string,
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

  formik: PropTypes.shape({
    values: PropTypes.object,
    touched: PropTypes.object,
    errors: PropTypes.object,
    handleChange: PropTypes.func,
    handleBlur: PropTypes.func,
    setFieldValue: PropTypes.func,
    setFieldTouched: PropTypes.func,
  }).isRequired,
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

const FormInputField = (props) => {
  const {
    type, name, label, hideLabel, placeholder, validation, helpText, options, width, disabled,
  } = props;

  const { formik } = props; // eslint-disable-line react/prop-types

  /*
   * Hook into Formik's context so we do not have to explicitly pass in these props. Now my
   * component works in the same way as Formik's own <Field /> shortcut component.
   */
  const value = getIn(formik.values, name);
  const touched = getIn(formik.touched, name);
  const error = getIn(formik.errors, name);
  const onChange = getIn(formik.handleChange);
  const onBlur = getIn(formik.handleBlur);
  const setFieldValue = getIn(formik.setFieldValue);
  const setFieldTouched = getIn(formik.setFieldTouched);

  // Has this field been touched and does it have an error?
  const invalid = error && touched;

  const required = validation ? (validation.required) : false;

  let selectOptions = options;
  if (name === 'country') {
    selectOptions = countryOptions;
  }

  return (
    <div className={`form-group ${width ? `col-md-${width}` : 'col-md'}`}>
      {(['checkbox', 'hidden'].findIndex(x => x === type) === -1) && (
        <label /* eslint-disable-line */
          className={hideLabel === true ? 'sr-only' : ''}
          htmlFor={`id-${name}`}
        >
          {`${label}${required ? ' *' : ''}`}
        </label>
      )}

      {(type === 'text' || type === 'email' || type === 'hidden') && (
        <input
          className="form-control form-control-sm"
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
          className="form-control"
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
          className="form-control form-control-sm"
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
        <CustomInput
          type="checkbox"
          name={name}
          id={`id-${name}`}

          label={label}

          required={required}
          checked={value}
          onChange={onChange}
          onBlur={onBlur}
          invalid={invalid}
          disabled={disabled}
        />
      )}

      {type === 'radio' && (
        <React.Fragment>
          {options.map(option => (
            <CustomInput
              type="radio"
              name={name}
              id={`id-${name}-${option.value}`}

              label={option.label}
              value={option.value}
              key={option.value}

              required={required}
              checked={value === option.value}
              onChange={onChange}
              onBlur={onBlur}
              invalid={invalid}
              disabled={disabled}
            />
          ))}
        </React.Fragment>
      )}

      {type === 'file' && (
        <CustomFormInputFile
          {...props}
          value={value}
          invalid={invalid}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
        />
      )}

      {(type === 'datetime' || type === 'date') && (
        <CustomFormInputDateTime
          {...props}
          value={value}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
        />
      )}

      {type === 'multi-checkbox' && (
        <CustomFormInputMultiCheckbox
          {...props}
          value={value}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
        />
      )}


      {type === 'textarea-wysiwyg' && (
        <CustomFormInputTextAreaWYSIWYG
          {...props}
          value={value}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
        />
      )}


      {invalid && (
        <div className="text-danger">
          <small>{error}</small>
        </div>
      )}

      {/*
      hasError &&
        <FormFeedback>{errors[name]}</FormFeedback>
      */}


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

FormInputField.propTypes = propTypes;
FormInputField.defaultProps = defaultProps;

export default connect(FormInputField);
