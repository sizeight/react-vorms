import React from 'react';
import PropTypes from 'prop-types';


const propTypes = {
  value: PropTypes.string.isRequired,
  placeHolderText: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

const defaultProps = {
  placeHolderText: 'Filter...',
};

const FilterForm = (props) => {
  const { value, placeHolderText, onChange } = props;


  function handleChange(e) {
    onChange(e.target.value);
  }


  function handleClear() {
    onChange('');
  }


  return (
    <form
      className="form-inline flex-row-reverse"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="input-group">
        <input
          type="text"
          className="form-control form-control-sm"
          value={value}
          placeholder={placeHolderText}
          onChange={handleChange}
        />
        <div className="input-group-append">
          <button
            type="button"
            className={`btn ${value === '' ? 'btn-secondary' : 'btn-primary'} btn-sm ${value === '' ? 'btn-outline-secondary' : ''}`}
            disabled={value === ''}
            onClick={handleClear}
          >
            &#215;
          </button>
        </div>
      </div>
    </form>
  );
};

FilterForm.propTypes = propTypes;
FilterForm.defaultProps = defaultProps;

export default FilterForm;
