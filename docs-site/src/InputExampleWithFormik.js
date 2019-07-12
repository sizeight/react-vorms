import React from 'react';
import PropTypes from 'prop-types';
import Highlight from 'react-highlight';

import 'highlight.js/styles/monokai-sublime.css';

// import { CustomForm } from '@vinder/vinderjs'; // set up alias in webpack for this to work
import { CustomForm } from '../../lib/react-vorms';


const propTypes = {
  heading: PropTypes.string.isRequired,
  definition: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
  children: PropTypes.node.isRequired,
};

class InputExample extends React.Component {
  state = {
    data: {},
  }

  handleSubmit = (values, actions) => {
    this.setState({ data: values });
    actions.setSubmitting(false);
  }

  render() {
    const { heading, definition, children } = this.props;
    const { data } = this.state;

    return (
      <React.Fragment>
        <div className="row mt-3">
          <div className="col-12">
            <h2>{heading}</h2>
            {children}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-6">
            <Highlight className="javascript">
              {`
const definiton = ${JSON.stringify(definition, null, 2)};

// ...

<CustomForm
  definition={definition}
  onSubmit={this.handleSubmit}
  onCancel={this.handleBlur} // Optional, include to show Cancel button
  submitButtonText="Save" // Optional
  buttonPosition="right" // Optional
/>
`}
            </Highlight>
          </div>
          <div className="col-6">
            <div style={{ border: '1px solid #eee', padding: '10px' }}>
              <CustomForm
                definition={definition}
                onSubmit={this.handleSubmit}
              />
            </div>


            <Highlight className="json">
              {JSON.stringify(data, null, 2)}
            </Highlight>
          </div>
        </div>
        <hr />
      </React.Fragment>
    );
  }
}

InputExample.propTypes = propTypes;

export default InputExample;
