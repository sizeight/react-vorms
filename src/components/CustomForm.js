import React from 'react';
import PropTypes from 'prop-types';

import FormInputField from './FormInputField';


import '../base.css';


const propTypes = {
  definition: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        initialValue: PropTypes.any.isRequired,
        hideLabel: PropTypes.bool,
        placeholder: PropTypes.string,
        validation: PropTypes.shape({
          required: PropTypes.bool,
          min: PropTypes.number,
          max: PropTypes.number,
          email: PropTypes.bool,
        }),
        width: PropTypes.number,
        disabled: PropTypes.bool,
      }),
    ),
  ).isRequired,
  withReactVorm: PropTypes.shape({
    values: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    touched: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    setFieldValue: PropTypes.func.isRequired,
    setFieldTouched: PropTypes.func.isRequired,
  }).isRequired,
};


/*
 * From the provided definition and react-vorms hook, render a bootstrap form.
 */
const CustomForm = (props) => {
  const { definition, withReactVorm } = props;
  const {
    values, errors, touched, onSubmit, onChange, onBlur, setFieldValue, setFieldTouched,
  } = withReactVorm;


  /*
   * Initial values
   * A file field does not place initial value in formik state but only displays the value below
   * the input field.
   */
  const flatDefinition = definition.flat();
  const initialValues = {};
  flatDefinition.forEach((obj) => {
    if (obj.type !== 'file') {
      initialValues[obj.name] = obj.initialValue;
    }
  });

  return (
    <form onSubmit={onSubmit} noValidate>
      {definition.map((formRow, i) => (
        <div
          className="form-row"
          key={i} /* eslint-disable-line react/no-array-index-key */
        >
          {formRow.map((field) => (
            <FormInputField
              type={field.type}
              name={field.name}
              label={field.label}
              initialValue={field.initialValue}
              placeholder={field.placeholder || ''}
              helpText={field.helpText || ''}
              hideLabel={field.hideLabel || false}
              options={field.options || []}
              validation={field.validation || {}}
              width={field.width || 12}
              disabled={field.disabled || false}
              className={field.className || ''}

              key={field.name}

              value={values[field.name]}
              errors={errors[field.name]}
              touched={touched[field.name]}
              onChange={onChange}
              onBlur={onBlur}

              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />
          ))}
        </div>
      ))}
    </form>
  );
};

CustomForm.propTypes = propTypes;

export default CustomForm;
