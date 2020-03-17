import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Highlight from 'react-highlight';

import 'highlight.js/styles/monokai-sublime.css';

// import { CustomForm } from '@vinder/vinderjs'; // set up alias in webpack for this to work
import { CustomForm, FormButtons, useReactVorm } from '../../lib/react-vorms';


const propTypes = {
  heading: PropTypes.string.isRequired,
  definition: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
  children: PropTypes.node.isRequired,
};

const InputExample = (props) => {
  const { heading, definition, children } = props;


  const [definitionState, setDefinitionState] = useState(definition);


  /* Options for our hook */
  const formOptions = {
    // validateOnChange: true,
    // validateOnBlur: true,
  };
  /* Init our hook */
  const reactVorm = useReactVorm(definitionState, formOptions);


  /*
   * Dynamic form using effect
   */
  useEffect(
    () => {
      function modifyDefinition() {
        if (reactVorm.values.dynamic_form_species === 'ecklonii') {
          const newDefinition = [
            ...definition,
            [
              {
                type: 'radio',
                name: 'dynamic_form_cultivar',
                label: 'Cultivar',
                helpText: 'Which Plectranthus ecklonii cultivar did you find?',
                initialValue: 'Medley-Wood',
                validation: {
                  required: true,
                },
                options: [
                  {
                    value: 'Tommy',
                    label: 'Plectranthus ecklonii Tommy',
                  },
                  {
                    value: 'Medley-Wood',
                    label: 'Plectranthus ecklonii Medley-Wood',
                  },
                  {
                    value: 'Erma',
                    label: 'Plectranthus ecklonii Erma',
                  },
                ],
              },
            ],
          ];
          reactVorm.onUpdateDefinition(newDefinition);
          setDefinitionState(newDefinition);
        } else {
          const newDefinition = [...definition];
          reactVorm.onUpdateDefinition(newDefinition);
          setDefinitionState(newDefinition);
        }
      }

      if (reactVorm.values.dynamic_form_species !== undefined) {
        modifyDefinition();
      }
    },
    [reactVorm.values.dynamic_form_species],
  );

  /*
   * Whenever submitReady, we can go ahead and submit our API calls etc.
   * When we are done, remember to setIsSubmitting to false.
   */
  useEffect(
    () => {
      if (reactVorm.submitReady) {
        console.log('We are good to submit');
        reactVorm.setIsSubmitting(false);
      }
    },
    [reactVorm.submitReady],
  );


  return (
    <>
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
import { CustomForm, FormButtons, useReactVorm } from 'react-vorms';

// ...

const MyComponent = () => {
  const myFormDefiniton = ${JSON.stringify(definition, null, 2)};
  const myFormOptions = {
    validateOnChange: false,
    validateOnBlur: false,
  };
  const myReactVorm = useReactVorm(myFormdefinition, myFormOptions);

// ...

  <CustomForm
    definition={myFormDefinition}
    withReactVorm={myReactVorm}
  />
}
`}
          </Highlight>
        </div>
        <div className="col-6">
          <div style={{ border: '1px solid #eee', padding: '10px' }}>
            <CustomForm
              definition={definitionState}
              withReactVorm={reactVorm}
            />

            <FormButtons
              submitButtonText="Go"
              buttonsPosition="left"
              isSubmitting={reactVorm.isSubmitting}
              onSubmit={reactVorm.onSubmit}
              onCancel={reactVorm.onReset}
            />

            <hr />

            <button
              type="button"
              className="btn btn-success btn-sm mr-2"
              disabled={reactVorm.isSubmitting}
              onClick={reactVorm.onSubmit}
            >
              Submit
            </button>
            <button
              type="button"
              className="btn btn-success btn-sm mr-2"
              disabled={reactVorm.isSubmitting}
              onClick={reactVorm.onReset}
            >
              Reset
            </button>
            <button
              type="button"
              className="btn btn-success btn-sm mr-2"
              disabled={reactVorm.isSubmitting}
              onClick={reactVorm.onValidate}
            >
              Validate
            </button>
          </div>

          <Highlight className="javascript">
            {`isSubmitting = ${reactVorm.isSubmitting}`}
          </Highlight>

          <Highlight className="javascript">
            {`isValidating = ${reactVorm.isValidatingg}`}
          </Highlight>

          <Highlight className="javascript">
            {`isValid = ${reactVorm.isValid}`}
          </Highlight>

          <p>values</p>
          <Highlight className="json">
            {JSON.stringify(reactVorm.values, null, 2)}
          </Highlight>

          <p>errors</p>
          <Highlight className="json">
            {JSON.stringify(reactVorm.errors, null, 2)}
          </Highlight>

          <p>touched</p>
          <Highlight className="json">
            {JSON.stringify(reactVorm.touched, null, 2)}
          </Highlight>
        </div>
      </div>
      <hr />
    </>
  );
};

InputExample.propTypes = propTypes;

export default InputExample;
