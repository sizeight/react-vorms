import {
  areFieldNamesUnique,
  definitionToValues,
  definitionToErrors,
  definitionToValidations,
  definitionToDefaultEmptyValues,
  definitionToTouched,
  validate,
  valuesToData,
} from './useReactVorm';


describe('useReactVorm', () => {
  it('AreFieldNamesUnique() -> Yes', () => {
    const flatDefinition = [
      {
        type: 'text',
        name: 'first_name',
      },
      {
        type: 'text',
        name: 'last_name',
      },
    ];
    const expectedOutput = undefined;
    expect(areFieldNamesUnique(flatDefinition)).toEqual(expectedOutput);
  });

  it('AreFieldNamesUnique() -> No', () => {
    const flatDefinition = [
      {
        type: 'text',
        name: 'first_name',
      },
      {
        type: 'text',
        name: 'first_name',
      },
    ];
    const expectedOutput = undefined;
    expect(areFieldNamesUnique(flatDefinition)).toEqual(expectedOutput);
  });


  it('definitionToValues() -> text', () => {
    const flatDefinition = [
      {
        type: 'text',
        name: 'first_name',
        initialValue: 'Jerry',
      },
      {
        type: 'text',
        name: 'last_name',
        initialValue: '',
      },
    ];
    const expectedReturn = {
      first_name: 'Jerry',
      last_name: '',
    };
    expect(definitionToValues(flatDefinition)).toEqual(expectedReturn);
  });

  it('definitionToValues() -> text (number)', () => {
    const flatDefinition = [
      {
        type: 'text',
        name: 'first_name',
        initialValue: 'Jerry',
      },
      {
        type: 'text',
        name: 'age',
        initialValue: '',
        validation: {
          number: true,
        },
      },
      {
        type: 'text',
        name: 'height',
        initialValue: 1.72,
        validation: {
          number: true,
        },
      },
    ];
    const expectedReturn = {
      first_name: 'Jerry',
      age: null,
      height: 1.72,
    };
    expect(definitionToValues(flatDefinition)).toEqual(expectedReturn);
  });

  it('definitionToValues() -> heading', () => {
    const flatDefinition = [
      {
        type: 'text',
        name: 'first_name',
        initialValue: 'Jerry',
      },
      {
        type: 'heading',
        label: 'Heading in a form',
      },
      {
        type: 'text',
        name: 'last_name',
        initialValue: '',
      },
    ];
    const expectedReturn = {
      first_name: 'Jerry',
      last_name: '',
    };
    expect(definitionToValues(flatDefinition)).toEqual(expectedReturn);
  });

  it('definitionToValues() -> file', () => {
    const flatDefinition = [
      {
        type: 'text',
        name: 'first_name',
        initialValue: 'Jerry',
      },
      {
        type: 'file',
        name: 'avatar',
        initialValue: '',
      },
    ];
    const expectedReturn = {
      first_name: 'Jerry',
    };
    expect(definitionToValues(flatDefinition)).toEqual(expectedReturn);
  });


  it('definitionToErrors() -> no initial errors', () => {
    const flatDefinition = [
      {
        type: 'text',
        name: 'first_name',
        initialValue: 'Jerry',
      },
      {
        type: 'text',
        name: 'last_name',
        initialValue: '',
      },
    ];
    const expectedReturn = {};
    expect(definitionToErrors(flatDefinition)).toEqual(expectedReturn);
  });

  it('definitionToErrors() -> spec an error', () => {
    const flatDefinition = [
      {
        type: 'text',
        name: 'first_name',
        initialValue: 'Jerry',
        error: 'Must fill in',
      },
      {
        type: 'text',
        name: 'last_name',
        initialValue: '',
      },
    ];
    const expectedReturn = {
      first_name: 'Must fill in',
    };
    expect(definitionToErrors(flatDefinition)).toEqual(expectedReturn);
  });


  it('definitionToValidations() -> text and file size', () => {
    const flatDefinition = [
      {
        type: 'text',
        name: 'first_name',
        validation: {
          required: true,
        },
      },
      {
        type: 'file',
        name: 'avatar',
      },
    ];
    const expectedReturn = {
      first_name: {
        required: true,
      },
      avatar: {
        maxFileSize: 2,
      },
    };
    expect(definitionToValidations(flatDefinition)).toEqual(expectedReturn);
  });


  it('definitionToDefaultEmptyValues() -> ', () => {
    const flatDefinition = [
      {
        type: 'text',
        name: 'first_name',
      },
      {
        type: 'text',
        name: 'age',
        emptyValue: 18,
      },
    ];
    const expectedReturn = {
      age: 18,
    };
    expect(definitionToDefaultEmptyValues(flatDefinition)).toEqual(expectedReturn);
  });


  it('definitionToTouched()', () => {
    const flatDefinition = [
      {
        type: 'text',
        name: 'first_name',
        initialValue: 'Jerry',
      },
      {
        type: 'heading',
        label: 'Heading in a form',
      },
      {
        type: 'text',
        name: 'last_name',
        initialValue: '',
      },
    ];
    const expectedReturn = {
      first_name: false,
      last_name: false,
    };
    expect(definitionToTouched(flatDefinition, false)).toEqual(expectedReturn);
  });


  it('validate() => required, no error', () => {
    const value = 'Hey there.';
    const validation = {
      required: true,
    };
    const expectedReturn = [];
    expect(validate(value, validation)).toEqual(expectedReturn);
  });

  it('validate() -> required, error', () => {
    const value = '';
    const validation = {
      required: true,
    };
    const expectedReturn = [
      'Required',
    ];
    expect(validate(value, validation)).toEqual(expectedReturn);
  });


  it('valuesToData() -> Depth of 1, 1 value', () => {
    const values = {
      first_name: 'Jerry',
    };
    const expectedData = {
      first_name: 'Jerry',
    };
    expect(valuesToData(values)).toEqual(expectedData);
  });

  it('valuesToData() -> Depth of 1, 2 values', () => {
    const values = {
      first_name: 'Jerry',
      last_name: 'Seinfeld',
    };
    const expectedData = {
      first_name: 'Jerry',
      last_name: 'Seinfeld',
    };
    expect(valuesToData(values)).toEqual(expectedData);
  });

  it('valuesToData() -> Depth of 2, 3 values', () => {
    const values = {
      first_name: 'Jerry',
      last_name: 'Seinfeld',
      profile__phone: '0123456789',
    };
    const expectedData = {
      first_name: 'Jerry',
      last_name: 'Seinfeld',
      profile: {
        phone: '0123456789',
      },
    };
    expect(valuesToData(values)).toEqual(expectedData);
  });

  it('valuesToData() -> Depth of 2, 4 values', () => {
    const values = {
      first_name: 'Jerry',
      last_name: 'Seinfeld',
      profile__phone: '0123456789',
      profile__email: 'jerry@seinfeld.com',
    };
    const expectedData = {
      first_name: 'Jerry',
      last_name: 'Seinfeld',
      profile: {
        phone: '0123456789',
        email: 'jerry@seinfeld.com',
      },
    };
    expect(valuesToData(values)).toEqual(expectedData);
  });

  it('valuesToData() -> Depth of 3, 5 values', () => {
    const values = {
      first_name: 'Jerry',
      last_name: 'Seinfeld',
      profile__phone: '0123456789',
      profile__emails__email1: 'jerry@seinfeld.com',
      profile__emails__email2: 'jerry2@seinfeld.com',
    };
    const expectedData = {
      first_name: 'Jerry',
      last_name: 'Seinfeld',
      profile: {
        phone: '0123456789',
        emails: {
          email1: 'jerry@seinfeld.com',
          email2: 'jerry2@seinfeld.com',
        },
      },
    };
    expect(valuesToData(values)).toEqual(expectedData);
  });
});
