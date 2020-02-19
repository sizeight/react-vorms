import React from 'react';
import PropTypes from 'prop-types';


const propTypes = {
  // From definition
  type: PropTypes.oneOf([
    'heading', // Display a heading in form
  ]).isRequired,
  label: PropTypes.string.isRequired,
  width: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  className: PropTypes.string.isRequired, // optional, eg if you want field to display: none
};

const defaultProps = {
  width: undefined,
};

const FormHeading = (props) => {
  const {
    type, label, width, className,
  } = props;

  return (
    <div className={`mb-3 ${width ? `col-md-${width}` : 'col-md'}${className ? ` ${className}` : ''}`}>
      {type === 'heading' && (
        <div className="border-bottom">
          {label}
        </div>
      )}
    </div>
  );
};

FormHeading.propTypes = propTypes;
FormHeading.defaultProps = defaultProps;

export default FormHeading;
