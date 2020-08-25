import React from 'react';
import PropTypes from 'prop-types';

import FormHeading from './FormHeading';
import FormInputField from './FormInputField';


import '../base.css';


const propTypes = {
  definition: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string.isRequired,
        name: PropTypes.string,
        label: PropTypes.string.isRequired,
        initialValue: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
          PropTypes.bool,
        ]),
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
    values: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    errors: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    touched: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
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


  /*
   * Generate a unique id suffix for field id`s to ensure more than one form can be used on same
   * page with unique id`s.`
   */
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  const idSuffix = array[0];


  return (
    <form onSubmit={onSubmit} noValidate>
      {definition.map((formRow, i) => (
        <div
          className="form-row"
          key={i} /* eslint-disable-line react/no-array-index-key */
        >
          {formRow.map((field, j) => (
            <React.Fragment
              key={j} /* eslint-disable-line react/no-array-index-key */
            >
              {field.type === 'heading' ? (
                <FormHeading
                  type={field.type}
                  label={field.label}
                  width={field.width || undefined}
                  className={field.className || ''}
                />
              ) : (
                <FormInputField
                  idSuffix={idSuffix}
                  type={field.type}
                  name={field.name}
                  label={field.label}
                  initialValue={field.initialValue}
                  placeholder={field.placeholder || ''}
                  helpText={field.helpText || ''}
                  hideLabel={field.hideLabel || false}
                  options={field.options || []}
                  validation={field.validation || {}}
                  width={field.width || undefined}
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
              )}
            </React.Fragment>
          ))}
        </div>
      ))}
    </form>
  );
};

CustomForm.propTypes = propTypes;

export default CustomForm;
