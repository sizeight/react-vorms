import { valuesToData } from './useReactVorm';


describe('useReactVorm', () => {
  it('My Test Case', () => {
    expect(true).toEqual(true);
  });


  it('valuesToDate() -> Depth of 1, 1 value', () => {
    const values = {
      first_name: 'Jerry',
    };
    const expectedData = {
      first_name: 'Jerry',
    };
    expect(valuesToData(values)).toEqual(expectedData);
  });


  it('valuesToDate() -> Depth of 1, 2 values', () => {
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


  it('valuesToDate() -> Depth of 2, 3 values', () => {
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


  it('valuesToDate() -> Depth of 2, 4 values', () => {
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


  it('valuesToDate() -> Depth of 3, 5 values', () => {
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
