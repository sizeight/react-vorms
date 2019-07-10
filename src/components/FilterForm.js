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

class FilterForm extends React.Component {
  handleChange = (event) => {
    const { onChange } = this.props;
    onChange(event.target.value);
  }

  handleClear = () => {
    const { onChange } = this.props;
    onChange('');
  }

  render() {
    const { value, placeHolderText } = this.props;

    return (
      <form
        className="form-inline flex-row-reverse"
        onSubmit={e => e.preventDefault()}
      >
        <div className="input-group">
          <input
            type="text"
            className="form-control form-control-sm"
            value={value}
            placeholder={placeHolderText}
            onChange={this.handleChange}
          />
          <div className="input-group-append">
            <button
              type="button"
              className={`btn ${value === '' ? 'btn-secondary' : 'btn-primary'} btn-sm ${value === '' ? 'btn-outline-secondary' : ''}`}
              disabled={value === ''}
              onClick={this.handleClear}
            >
              &#215;
            </button>
          </div>
        </div>
      </form>
    );
  }
}

FilterForm.propTypes = propTypes;
FilterForm.defaultProps = defaultProps;

export default FilterForm;
