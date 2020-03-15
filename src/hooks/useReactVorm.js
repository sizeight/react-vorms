import { useState, useEffect } from 'react';

import { validateURL, validateEmail } from '../utils';
import { MAX_FILE_SIZE, FILE_TYPES } from '../constants';

/*
 * Return true if all field names are unique.
 */
function areFieldNamesUnique(definition) {
  // Filter out any headings and then check field names
  const names = definition.filter((obj) => obj.type !== 'heading').map((obj) => obj.name);
  const unique = [...new Set(names)].length === names.length;
  if (!unique) {
    throw new Error('Form definition has duplicate field names, please ensure all field names are unique.');
  }
}


/*
 * type=heading => skip, not form fields
 * type=file => skip, file URL is not valid formvalue, file is already on server so we do not want
 *              to PATCH it on update except if it is a new file or we want to delete/clear existing
 *              file
 */
function definitionToValues(definition) {
  const values = {};
  definition.forEach((obj) => {
    if (obj.type !== 'heading' && obj.type !== 'file') {
      values[obj.name] = obj.initialValue;
    }
  });
  return values;
}

function definitionToErrors(definition) {
  const errors = {};
  definition.forEach((obj) => {
    if (obj.error) {
      errors[obj.name] = obj.error;
    }
  });
  return errors;
}

/*
 * All files get a maxFileSize validation of 2MB built in. This can be overridden up to 20MB.
 */
function definitionToValidations(definition) {
  const validations = {};
  definition.forEach((obj) => {
    if (obj.type === 'file') {
      const maxFileSize = MAX_FILE_SIZE; // 2 MB
      const maxLimit = 20; // 20 MB
      if (obj.validation) {
        validations[obj.name] = {
          ...obj.validation,
          maxFileSize: (obj.validation.maxFileSize && obj.validation.maxFileSize <= maxLimit)
            ? obj.validation.maxFileSize : maxFileSize,
        };
      } else {
        validations[obj.name] = { maxFileSize };
      }
    } else if (obj.validation) {
      validations[obj.name] = obj.validation;
    }
  });
  return validations;
}

/* e.g.
 * {
 *   first_name: false,
 *   last_name: false,
 * }
 */
function definitionToTouched(definition, isTouched) {
  const touched = {};
  definition.forEach((obj) => {
    if (obj.type !== 'heading') {
      touched[obj.name] = isTouched;
    }
  });
  return touched;
}


function validate(value, validation) {
  const errors = [];
  Object.keys(validation).forEach((key) => {
    switch (key) {
      case 'required':
        if (validation[key] && !value) {
          errors.push('Required');
        }
        break;
      case 'number': {
        // min, max. lessThan, moreThan, positive, negative, integer
        if (value && Number.isNaN(Number(value))) {
          errors.push('Must be a number');
        }

        Object.keys(validation[key]).forEach((key2) => {
          switch (key2) {
            case 'min':
              if (Number(value) < validation[key][key2]) {
                errors.push(`Minimun ${validation[key][key2]}`);
              }
              break;
            case 'max':
              if (Number(value) > validation[key][key2]) {
                errors.push(`Maximum ${validation[key][key2]}`);
              }
              break;
            case 'lessThan':
              if (Number(value) >= validation[key][key2]) {
                errors.push(`Must be less than ${validation[key][key2]}`);
              }
              break;
            case 'moreThan':
              if (Number(value) <= validation[key][key2]) {
                errors.push(`Must be more than ${validation[key][key2]}`);
              }
              break;
            case 'positive':
              if (Number(value) < 0) {
                errors.push('Must be a positive number');
              }
              break;
            case 'negative':
              if (Number(value) > 0) {
                errors.push('Must be a negative number');
              }
              break;
            case 'integer':
              if (!Number.isInteger(Number(value))) {
                errors.push('Must be ainteger');
              }
              break;
            default:
              break;
          }
        });
        break;
      }
      case 'min':
        if (value.length < validation[key]) {
          errors.push(`Minimum ${validation[key]} characters required`);
        }
        break;
      case 'max':
        if (value.length > validation[key]) {
          errors.push(`Maximum ${validation[key]} characters allowed`);
        }
        break;
      case 'email':
        if (value) {
          if (!validateEmail(value)) {
            errors.push('Invalid email address');
          }
        }
        break;
      case 'url':
        if (value) {
          if (!validateURL(value)) {
            errors.push('Invalid URL');
          }
        }
        break;
      case 'extensions': {
        if (value && value.type) {
          const found = FILE_TYPES.find((obj) => obj.fileType === value.type);

          if (!found || validation[key].findIndex((x) => x === found.fileExtension) === -1) {
            const extensionCount = validation.extensions.length;
            let errText = 'Inavlid file type';
            if (extensionCount > 1) {
              const tmp = validation.extensions.join(', ');
              const idx = tmp.lastIndexOf(',');
              errText = `Invalid file type, only ${tmp.slice(0, idx)} or${tmp.slice(idx + 1)} allowed`;
            } else if (extensionCount === 1) {
              errText = `Invalid file type, only ${validation.extensions[0]} allowed`;
            }
            errors.push(errText);
          }
        }
        break;
      }
      case 'maxFileSize': {
        const maxBytes = validation[key] * 1000 * 1000;
        if (value && value.size > maxBytes) {
          errors.push(`Maximum ${validation[key]} MB file size allowed`);
        }
        break;
      }
      default:
        break;
    }
  });
  return errors;
}


// Custom hook
function useReactVorm(definition, { validateOnChange = false, validateOnBlur = false } = {}) {
  const flatDefinition = definition.flat();

  areFieldNamesUnique(flatDefinition);


  const [values, setValues] = useState(definitionToValues(flatDefinition));
  const [errors, setErrors] = useState(definitionToErrors(flatDefinition));
  const [touched, setTouched] = useState(definitionToTouched(flatDefinition, false));
  const validations = definitionToValidations(flatDefinition);

  const [submitCount, setSubmitCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const isValid = Object.keys(errors).length === 0;

  const [submitReady, setSubmitReady] = useState(false);

  /*
   * Reset the form state to the initial definition and values.
   */
  function onReset() {
    setValues(definitionToValues(flatDefinition));
    setErrors(definitionToErrors(flatDefinition));
    setTouched(definitionToTouched(flatDefinition, false));
    setSubmitCount(0);
    setIsSubmitting(false);
    setIsValidating(false);
    setSubmitReady(false);
  }


  /*
   * Validation
   * - Set isValidating true
   * - Run all field-level validations
   * - Has errors? (happens in useEffect below)
   *   - Yes: Set isValidating to false, set errors, set isSubmitting to false
   *   - No: Set isValidating to false
   */
  function onValidate() {
    setIsValidating(true);
    const newErrors = {};
    Object.keys(validations).forEach((key) => {
      const fieldErrorsArr = validate(values[key], validations[key]);
      if (fieldErrorsArr.length > 0) {
        newErrors[key] = fieldErrorsArr;
      }
    });
    setErrors(newErrors);
    setIsValidating(false);
  }


  /*
   * When the form is submitted:
   * - Touch all fields.
   * - Set isSubmitting to true (The user will have to set it to false again).
   * - Increment submitCount.
   * - Validate the fields.
   */
  function onSubmit() {
    setTouched(definitionToTouched(flatDefinition, true));
    setIsSubmitting(true);
    setSubmitCount(submitCount + 1);
    onValidate();
  }


  /*
   * When a form field changes update values.
   */
  function onChange(e) {
    const { name, type } = e.target;
    const value = type === 'checkbox' ? e.target.checked : e.target.value;
    setValues({
      ...values,
      [name]: value,
    });
  }


  /*
   * When a form field has been touched, set to true. If validateOnBlur is true, then validate
   * whenever field is touched.
   */
  function onBlur(e) {
    const { name } = e.target;
    if (validateOnBlur) {
      onValidate();
    }
    setTouched({
      ...touched,
      [name]: true,
    });
  }


  /*
   * Update the values with the new definition, if value already in state keep value, if not set
   * to initialValue.
   */
  function onUpdateDefinition(newDefinition) {
    const flatNewDefinition = newDefinition.flat();
    areFieldNamesUnique(flatNewDefinition);

    const newValues = {};
    flatNewDefinition.forEach((obj) => {
      if (obj.type !== 'heading' && obj.type !== 'file') {
        newValues[obj.name] = values[obj.name] || obj.initialValue;
      }
    });

    setValues(newValues);
  }

  /*
   * Set the value of specified field.
   */
  function setFieldValue(name, newValue) {
    setValues({
      ...values,
      [name]: newValue,
    });
  }

  /*
   * Set the errors of specified field.
   */
  function setFieldErrors(name, newErrors) {
    setErrors({
      ...errors,
      [name]: newErrors,
    });
  }

  /*
   * Set the touched value of specified field.
   */
  function setFieldTouched(name, newTouched) {
    setTouched({
      ...touched,
      [name]: newTouched,
    });
  }

  /*
   * Set the values of multiple fields.
   */
  function setMultipleFieldValues(newValues) {
    setValues({
      ...values,
      ...newValues,
    });
  }


  /*
   * If validateOnChange is true, then validate whenever values change.
   */
  useEffect(
    () => {
      if (validateOnChange) {
        onValidate();
      }
    },
    [values],
  );

  /*
   * If errors change, check if there are any errors and if so se isSubmitting to false.
   */
  useEffect(
    () => {
      if (Object.keys(errors).length > 0) {
        setIsSubmitting(false);
      }
      if (Object.keys(errors).length === 0 && isSubmitting) {
        setSubmitReady(true);
      }
      if (Object.keys(errors).length > 0 && isSubmitting) {
        // We have errors, abort submit.
        // console.log('Abort submit');
      }
    },
    [errors],
  );

  /*
   * Whenever isSubmitting changes to false, set submitReady to false.
   */
  useEffect(
    () => {
      if (!isSubmitting) {
        setSubmitReady(false);
      }
    },
    [isSubmitting],
  );


  return {
    values,
    errors,
    touched,

    setErrors,
    setValues,
    setTouched,

    setFieldValue,
    setFieldErrors,
    setFieldTouched,
    setMultipleFieldValues,
    setIsSubmitting,

    isValid,
    isValidating,
    isSubmitting,
    submitCount,
    submitReady,

    onValidate,
    onSubmit,
    onChange,
    onBlur,
    onReset,
    onUpdateDefinition,
  };
}

export default useReactVorm;
