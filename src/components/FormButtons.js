import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  submitButtonText: PropTypes.string,
  cancelButtonText: PropTypes.string,
  buttonsPosition: PropTypes.oneOf(['left', 'center', 'right']),
  isSubmitting: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
};

const defaultProps = {
  submitButtonText: 'Submit',
  cancelButtonText: 'Cancel',
  buttonsPosition: 'left',
  onCancel: undefined,
};


const FormButtons = (props) => {
  const {
    submitButtonText, cancelButtonText, buttonsPosition, isSubmitting, onSubmit, onCancel,
  } = props;

  return (
    <div className={`text-${buttonsPosition} mb-2`}>
      {onCancel && (
        <button
          type="button"
          className="btn btn-secondary btn-sm mr-2"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          {cancelButtonText}
        </button>
      )}
      <button
        type="button"
        className="btn btn-primary btn-sm"
        onClick={onSubmit}
        disabled={isSubmitting}
      >
        {submitButtonText}
      </button>
    </div>
  );
};

FormButtons.propTypes = propTypes;
FormButtons.defaultProps = defaultProps;

export default FormButtons;
