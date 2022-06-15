import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string),
};

const defaultProps = {
  errors: undefined,
};

const InvalidFeedback = (props) => {
  const { errors } = props;

  /*
    Bootstrap class `invalid-feedback`` will only display if it is positioned directly after
    a `form-control is-invalid` or a `custom-control-ipnut is-invalid`. This causes dificulty with
    CustomFormInputMultiCheckbox and radio buttons.
    Using `text-danger mt-1` and <small> we get exactly the same lookas `invalid-feedback` without
    the directly after requirement.
  */

  if (errors && errors.length > 0) {
    return (
      <div className="text-danger mt-1">
        {errors.map((error, i) => (
          <div key={i}/* eslint-disable-line react/no-array-index-key */>
            <small>{error}</small>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

InvalidFeedback.propTypes = propTypes;
InvalidFeedback.defaultProps = defaultProps;

export default InvalidFeedback;
