import { results } from '@/api/database.json';

const mockRequest = async (fn, ...params) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
  return fn(params);
};

export default class API {
  constructor() {
    const methods = Object.keys(API);
    methods.forEach((method) => {
      this[method] = (...params) => mockRequest(API[method], ...params);
    });
  }

  static getStates = () => results.reduce((allStates, { location }) => {
    const { state } = location;
    if (!allStates.includes(state)) {
      allStates.push(state);
    }
    return allStates;
  }, []);

  static getPeople = () => results.map(({
    gender, name, location, picture, dob,
  }) => {
    const id = `${name.first}-${name.last}-${new Date(dob.date).getTime()}`;
    const fullName = `${name.first} ${name.last}`;
    const {
      street, postcode, city, state,
    } = location;
    const { thumbnail } = picture;
    return {
      id,
      fullName,
      gender,
      street,
      postcode,
      city,
      state,
      thumbnail,
    };
  });
}
