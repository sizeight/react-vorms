import React from 'react';
import { render } from 'react-dom';

import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import InputExample from './InputExample';

const inputs = [
  {
    path: '/large-example/',
    title: 'Large example',
  },
  {
    path: '/dynamic-form/',
    title: 'Dynamic form',
  },
  {
    path: '/text/',
    title: 'Text',
  },
  {
    path: '/email/',
    title: 'Email',
  },
  {
    path: '/textarea/',
    title: 'TextArea',
  },
  {
    path: '/richtextarea/',
    title: 'RichTextArea',
  },
  {
    path: '/checkbox/',
    title: 'Checkbox',
  },
  {
    path: '/date/',
    title: 'Date',
  },
  {
    path: '/datetime/',
    title: 'DateTime',
  },
  {
    path: '/select/',
    title: 'Select',
  },
  {
    path: '/radio/',
    title: 'Radio',
  },
  {
    path: '/multicheckbox/',
    title: 'Multi Checkbox',
  },
  {
    path: '/file/',
    title: 'File',
  },
  {
    path: '/hidden/',
    title: 'Hidden',
  },
];

const Demo = () => {
  return (
    <Router>
      <div className="navigation    bs4 bg-light my-3">
        <h1>
          <div style={{ display: 'inline-block', border: '3px solid #212529', padding: '0px 10px 6px' }}>
            react-
            <em>vorms</em>
          </div>
        </h1>
        <p>Batteries included, minimal setup reusable forms for React & Bootstrap combo apps.</p>

        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink
              to="/"
              className="nav-link"
              activeClassName="active"
            >
              Getting Started
            </NavLink>
          </li>
        </ul>

        <p>Inputs</p>

        <ul className="nav nav-pills flex-column">
          {inputs.map((input) => (
            <li className="nav-item" key={input.path}>
              <NavLink
                to={input.path}
                className="nav-link"
                activeClassName="active"
              >
                {input.title}
              </NavLink>
            </li>
          ))}
        </ul>

      </div>

      <main className="main" role="main">
        <div className="main-content">
          <div className="main-section bs4 col-12">
            <Route
              path="/"
              exact
              component={() => (
                <div className="row mb-5 mt-5">
                  <div className="col">
                    <h2>Installation</h2>
                    <pre>
                      <code className="javascript">$ yarn add react-vorms bootstrap</code>
                    </pre>

                    <h2>Usage</h2>

                    <h2>Features</h2>
                    <ul>
                      <li>
                        Easily setup a form in JSON
                        <ul>
                          <li>Input types</li>
                          <li>Layout</li>
                          <li>Validation</li>
                          <li>Initial values</li>
                        </ul>
                      </li>
                      <li>
                        Slick advanced components
                        <ul>
                          <li>Date/time picker</li>
                          <li>Rich Text editor with HTML preview</li>
                          <li>File uploads</li>
                          <li>Multiple checkbox</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            />


            <Route
              path="/dynamic-form/"
              exact
              component={() => (
                <InputExample
                  heading="Dynamic Form"
                  definition={[
                    [
                      {
                        type: 'radio',
                        name: 'dynamic_form_species',
                        label: 'Species',
                        helpText: 'Which species of Plectranthus did you find?',
                        initialValue: '',
                        options: [
                          {
                            value: 'ecklonii',
                            label: 'Plectranthus ecklonii',
                          },
                          {
                            value: 'ambiguus',
                            label: 'Plectranthus ambiguus',
                          },
                          {
                            value: 'ernstii',
                            label: 'Plectranthus ernstii',
                          },
                          {
                            value: 'oertendahlii',
                            label: 'Plectranthus oertendahlii',
                          },
                        ],
                      },
                    ],
                  ]}
                >
                  <p>Dynamic form</p>
                </InputExample>
              )}
            />


            <Route
              path="/large-example/"
              exact
              component={() => (
                <InputExample
                  heading="Large example"
                  definition={[
                    [
                      {
                        type: 'text',
                        name: 'large_genus',
                        label: 'Genus',
                        initialValue: 'Plectranthus',
                        helpText: 'A principal taxonomic category that ranks above species and below family, and is denoted by a capitalised Latin name, e.g. Plectranthus.',
                        validation: {
                          required: true,
                          min: 2,
                          max: 50,
                        },
                      },
                      {
                        type: 'email',
                        name: 'large_email',
                        label: 'Your email address',
                        initialValue: '',
                        validation: {
                          required: true,
                          email: true,
                        },
                        className: 'text-info',
                      },
                      {
                        type: 'text',
                        name: 'large_url',
                        label: 'Your website URL',
                        initialValue: '',
                        helpText: 'Include http:// or https:// e.g. http://www.example.com',
                        validation: {
                          url: true,
                        },
                      },
                    ],
                    [
                      {
                        type: 'heading',
                        label: 'A heading inside a form',
                      },
                    ],
                    [
                      {
                        type: 'select',
                        name: 'large_species',
                        label: 'Species',
                        helpText: 'Which species did you find?',
                        initialValue: 'ernstii',
                        validation: {
                          required: true,
                        },
                        options: [
                          {
                            value: 'ecklonii',
                            label: 'Plectranthus ecklonii',
                          },
                          {
                            value: 'ambiguus',
                            label: 'Plectranthus ambiguus',
                          },
                          {
                            value: 'ernstii',
                            label: 'Plectranthus ernstii',
                          },
                          {
                            value: 'oertendahlii',
                            label: 'Plectranthus oertendahlii',
                          },
                        ],
                      },
                    ],
                    [
                      {
                        type: 'heading',
                        label: 'A 2nd heading inside a form',
                      },
                    ],
                    [
                      {
                        type: 'hidden',
                        name: 'large_hidden_message',
                        label: 'Hidden label',
                        initialValue: "This is a secret that the user won't see",
                      },
                    ],
                    [
                      {
                        type: 'textarea',
                        name: 'large_description',
                        label: 'Description',
                        initialValue: '',
                        placeholder: 'Describe the species characteristics...',
                        validation: {
                          required: false,
                          min: 10,
                          max: 250,
                        },
                      },
                    ],
                    [
                      {
                        type: 'checkbox',
                        name: 'large_endangered',
                        label: 'Endangered',
                        helpText: 'Is the species endangered?',
                        initialValue: true,
                        validation: {
                          required: true,
                        },
                      },
                    ],
                    [
                      {
                        type: 'radio',
                        name: 'large_cultivar',
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
                    [
                      {
                        type: 'multi-checkbox',
                        name: 'large_species-alt',
                        label: 'Species',
                        helpText: 'Which species did you find?',
                        initialValue: ['ernstii', 'oertendahlii'],
                        validation: {
                          required: true,
                          min: 1,
                        },
                        options: [
                          {
                            value: 'ambiguus',
                            label: 'Plectranthus ambiguus',
                          },
                          {
                            value: 'ernstii',
                            label: 'Plectranthus ernstii',
                          },
                          {
                            value: 'oertendahlii',
                            label: 'Plectranthus oertendahlii',
                          },
                        ],
                      },
                    ],
                    [
                      {
                        type: 'text',
                        name: 'large_genus-disabled',
                        label: 'Genus',
                        hideLabel: true,
                        initialValue: 'Plectranthus',
                        helpText: 'A principal taxonomic category that ranks above species and below family, and is denoted by a capitalised Latin name, e.g. Plectranthus.',
                        disabled: true,
                        validation: {
                          required: true,
                          min: 2,
                          max: 50,
                        },
                      },
                    ],
                    [
                      {
                        type: 'textarea-wysiwyg',
                        name: 'large_description-alt',
                        label: 'Description',
                        helpText: 'Decribe the species',
                        initialValue: '<p>Hello world.</p>',
                        validation: {
                          required: true,
                        },
                      },
                    ],
                    [
                      {
                        type: 'file',
                        name: 'large_photo',
                        label: 'Natural photograph',
                        initialValue: '',
                        helpText: 'A photo of the plant in it\'s natural environment.',
                        validation: {
                          required: true,
                          maxFileSize: 5,
                        },
                      },
                    ],
                  ]}
                >
                  <p>Text input field</p>
                </InputExample>
              )}
            />


            <Route
              path="/text/"
              exact
              component={() => (
                <InputExample
                  heading="Text Input"
                  definition={[
                    [
                      {
                        type: 'text',
                        name: 'text_string',
                        label: 'Any string',
                        initialValue: 'Oertendahlii',
                        validation: {
                          required: true,
                        },
                        width: 3,
                      },
                      {
                        type: 'text',
                        name: 'text_string_empty_initial',
                        label: 'Any string',
                        initialValue: '',
                        emptyValue: null,
                        validation: {
                          required: true,
                        },
                        width: 3,
                      },
                      {
                        type: 'text',
                        name: 'text_string_empty',
                        label: 'Any string',
                        initialValue: 'Clear this',
                        emptyValue: null,
                        validation: {
                          required: true,
                        },
                        width: 3,
                      },
                      {
                        type: 'text',
                        name: 'text_number_A',
                        label: 'Any number',
                        initialValue: '',
                        validation: {
                          number: true,
                        },
                        width: 3,
                      },
                    ],
                    [
                      {
                        type: 'text',
                        name: 'text_number',
                        label: 'A number',
                        initialValue: '9a',
                        helpText: 'This must be a number',
                        validation: {
                          number: true,
                        },
                      },
                      {
                        type: 'text',
                        name: 'text_number_min',
                        label: 'A number with minimum 100',
                        initialValue: '89',
                        validation: {
                          number: {
                            min: 100,
                          },
                        },
                      },
                      {
                        type: 'text',
                        name: 'text_number_max',
                        label: 'A number with maximum 100',
                        initialValue: '120',
                        validation: {
                          number: {
                            max: 100,
                          },
                        },
                      },
                      {
                        type: 'text',
                        name: 'text_number_lessThan',
                        label: 'A number less than 100',
                        initialValue: '120',
                        validation: {
                          number: {
                            lessThan: 100,
                          },
                        },
                      },
                    ],
                    [
                      {
                        type: 'text',
                        name: 'text_number_moreThan',
                        label: 'A number greater than 100',
                        initialValue: '80',
                        validation: {
                          required: true,
                          number: {
                            moreThan: 100,
                          },
                        },
                      },
                      {
                        type: 'text',
                        name: 'text_number_positive',
                        label: 'A positive number',
                        initialValue: '-10',
                        validation: {
                          required: true,
                          number: {
                            positive: true,
                          },
                        },
                      },
                      {
                        type: 'text',
                        name: 'text_number_negative',
                        label: 'A negative number',
                        initialValue: '10',
                        validation: {
                          required: true,
                          number: {
                            negative: true,
                          },
                        },
                      },
                      {
                        type: 'text',
                        name: 'text_number_integer',
                        label: 'An integer',
                        initialValue: '100.789',
                        validation: {
                          required: true,
                          number: {
                            integer: true,
                          },
                        },
                      },
                    ],
                  ]}
                >
                  <p>Text input field</p>
                </InputExample>
              )}
            />


            <Route
              path="/hidden/"
              exact
              component={() => (
                <InputExample
                  heading="Hidden Input"
                  definition={[
                    [
                      {
                        type: 'hidden',
                        name: 'hidden_id',
                        label: 'Id',
                        initialValue: 15,
                      },
                    ],
                  ]}
                >
                  <p>Hidden input field</p>
                </InputExample>
              )}
            />


            <Route
              path="/textarea/"
              exact
              component={() => (
                <InputExample
                  heading="TextArea Input"
                  definition={[
                    [
                      {
                        type: 'textarea',
                        name: 'textarea_description',
                        label: 'Description',
                        initialValue: '',
                        placeholder: 'Describe the species characteristics...',
                        validation: {
                          required: false,
                          min: 10,
                          max: 250,
                        },
                      },
                    ],
                  ]}
                >
                  <p>TextArea input field</p>
                </InputExample>
              )}
            />


            <Route
              path="/email/"
              exact
              component={() => (
                <InputExample
                  heading="Email Input"
                  definition={[
                    [
                      {
                        type: 'email',
                        name: 'email_email',
                        label: 'Your email address',
                        initialValue: '',
                        validation: {
                          required: true,
                          email: true,
                        },
                      },
                    ],
                  ]}
                >
                  <p>Email control</p>
                </InputExample>
              )}
            />


            <Route
              path="/checkbox/"
              exact
              component={() => (
                <InputExample
                  heading="Checkbox Input"
                  definition={[
                    [
                      {
                        type: 'checkbox',
                        name: 'checkbox_endangered',
                        label: 'Endangered',
                        helpText: 'Is the species endangered?',
                        initialValue: true,
                        validation: {
                          required: true,
                        },
                      },
                    ],
                  ]}
                >
                  <p>Checkbox input field</p>
                </InputExample>
              )}
            />


            <Route
              path="/date/"
              exact
              component={() => (
                <InputExample
                  heading="Date Input"
                  definition={[
                    [
                      {
                        type: 'date',
                        name: 'date_identification_date',
                        label: 'First identified',
                        helpText: 'The date on which species was first found.',
                        initialValue: '',
                        validation: {
                          required: true,
                        },
                      },
                    ],
                  ]}
                >
                  <p>
                    Date input field using&nbsp;
                    <a href="https://reactdatepicker.com/">react-datepicker</a>
                  </p>
                </InputExample>
              )}
            />


            <Route
              path="/datetime/"
              exact
              component={() => (
                <InputExample
                  heading="DateTime Input"
                  definition={[
                    [
                      {
                        type: 'datetime',
                        name: 'datetime_identification_date_and_time',
                        label: 'First identified',
                        helpText: 'The date and time on which species was first found.',
                        initialValue: '',
                        validation: {
                          required: true,
                        },
                      },
                    ],
                  ]}
                >
                  <p>
                    Date input field using&nbsp;
                    <a href="https://reactdatepicker.com/">react-datepicker</a>
                  </p>
                </InputExample>
              )}
            />


            <Route
              path="/richtextarea/"
              exact
              component={() => (
                <InputExample
                  heading="RichTextArea Input"
                  definition={[
                    [
                      {
                        type: 'textarea-wysiwyg',
                        name: 'richtextarea_endangered',
                        label: 'Endangered',
                        helpText: 'Is the species endangered?',
                        initialValue: '<p>Hello world.</p>',
                        validation: {
                          required: true,
                        },
                      },
                    ],
                  ]}
                >
                  <p>
                    A rich text input field with HTML preview/edit, undo/redo. Uses&nbsp;
                    <a href="https://draftjs.org/">Draft.js</a>
                  </p>
                </InputExample>
              )}
            />


            <Route
              path="/select/"
              exact
              component={() => (
                <InputExample
                  heading="Select Input"
                  definition={[
                    [
                      {
                        type: 'select',
                        name: 'select_species',
                        label: 'Species',
                        helpText: 'Which species did you find?',
                        initialValue: 'ernstii',
                        validation: {
                          required: true,
                        },
                        options: [
                          {
                            value: 'ambiguus',
                            label: 'Plectranthus ambiguus',
                          },
                          {
                            value: 'ernstii',
                            label: 'Plectranthus ernstii',
                          },
                          {
                            value: 'oertendahlii',
                            label: 'Plectranthus oertendahlii',
                            disabled: true,
                          },
                          {
                            value: 'neochilus',
                            label: 'Plectranthus neochilus',
                            disabled: false,
                          },
                        ],
                      },
                    ],
                  ]}
                >
                  <p>Select input field.</p>
                </InputExample>
              )}
            />


            <Route
              path="/radio/"
              exact
              component={() => (
                <InputExample
                  heading="Radio Input"
                  definition={[
                    [
                      {
                        type: 'radio',
                        name: 'radio_species',
                        label: 'Species',
                        helpText: 'Which species did you find?',
                        initialValue: 'ernstii',
                        validation: {
                          required: true,
                        },
                        options: [
                          {
                            value: 'ambiguus',
                            label: 'Plectranthus ambiguus',
                          },
                          {
                            value: 'ernstii',
                            label: 'Plectranthus ernstii',
                          },
                          {
                            value: 'oertendahlii',
                            label: 'Plectranthus oertendahlii',
                            disabled: false,
                          },
                          {
                            value: 'neochilus',
                            label: 'Plectranthus neochilus',
                            disabled: true,
                          },
                          {
                            value: 'madagascariensis',
                            label: 'Plectranthus madagascariensis',
                            disabled: true,
                          },
                        ],
                      },
                    ],
                  ]}
                >
                  <p>Radio input field</p>
                </InputExample>
              )}
            />


            <Route
              path="/multicheckbox/"
              exact
              component={() => (
                <InputExample
                  heading="Multi Checkbox Input"
                  definition={[
                    [
                      {
                        type: 'multi-checkbox',
                        name: 'multi-checkbox_species',
                        label: 'Species',
                        helpText: 'Which species did you find?',
                        initialValue: ['ernstii', 'oertendahlii', 'madagascariensis'],
                        validation: {
                          required: true,
                          min: 1,
                        },
                        options: [
                          {
                            value: 'ambiguus',
                            label: 'Plectranthus ambiguus',
                          },
                          {
                            value: 'ernstii',
                            label: 'Plectranthus ernstii',
                          },
                          {
                            value: 'oertendahlii',
                            label: 'Plectranthus oertendahlii',
                            disabled: false,
                          },
                          {
                            value: 'neochilus',
                            label: 'Plectranthus neochilus',
                            disabled: true,
                          },
                          {
                            value: 'madagascariensis',
                            label: 'Plectranthus madagascariensis',
                            disabled: true,
                          },
                        ],
                      },
                    ],
                  ]}
                >
                  <p>Select more than one option checkbox field.</p>
                </InputExample>
              )}
            />


            <Route
              path="/file/"
              exact
              component={() => (
                <InputExample
                  heading="File Input"
                  definition={[
                    [
                      {
                        type: 'file',
                        name: 'file_photo',
                        label: 'Natural photograph',
                        initialValue: '',
                        helpText: 'A photo of the plant in it\'s natural environment.',
                        validation: {
                          required: true,
                          extensions: [
                            'PNG',
                            'PDF',
                            'ICO',
                          ],
                        },
                      },
                      {
                        type: 'file',
                        name: 'file_photo_2',
                        label: 'Natural photograph #2',
                        initialValue: 'image.jpg',
                        helpText: 'Another photo with invalid initialValue. Check console warning.',
                        validation: {
                          required: true,
                          extensions: [
                            'PNG',
                            'JPG',
                          ],
                        },
                      },
                    ],
                    [
                      {
                        type: 'file',
                        name: 'file_photo_3',
                        label: 'Natural photograph #3',
                        initialValue: 'http://www.example.com/image.jpg',
                        helpText: 'Required, so we can not clear',
                        validation: {
                          required: true,
                          extensions: [
                            'JPG',
                          ],
                        },
                      },
                      {
                        type: 'file',
                        name: 'file_photo_4',
                        label: 'Natural photograph #4',
                        initialValue: 'http://www.example.com/image.jpg',
                        helpText: 'Another photo of the plant in it\'s natural environment.',
                        validation: {
                          extensions: [
                            'JPG',
                          ],
                        },
                      },
                    ],
                  ]}
                >
                  <p>File input field</p>
                </InputExample>
              )}
            />

          </div>
        </div>
      </main>
    </Router>
  );
};


render(
  <Demo />,
  document.getElementById('app'),
);
