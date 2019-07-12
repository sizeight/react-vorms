import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const InvalidFeedback = (props) => {
  const { errors } = props;

  /*
    Bootstrap class `invalid-feedback`` will only display if it is positioned directly after
    a `form-control is-invalid` or a `custom-control-inut is-invalid`. This causes dificulty with
    CustomFormInputMultiCheckbox and radio buttons.
    Using `text-danger mt-1` and <small> we get exactly the same lookas `invalid-feedback` without
    the directly after requirement.
  */

  return (
    <React.Fragment>
      {errors && errors.length > 0 && (
        <div className="text-danger mt-1">
          {errors.map(error => <div><small>{error}</small></div>)}
        </div>
      )}
    </React.Fragment>
  );
};

InvalidFeedback.propTypes = propTypes;

export default InvalidFeedback;
