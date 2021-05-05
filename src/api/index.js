import { results } from '@/api/database.json';

const mockRequest = async (fn, params) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  return fn(params);
};

const availableFilters = {
  by_states: ({ state }, states) => states.includes(state),
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

  static getPeople = ({ filter, filterData }) => results.reduce((result, {
    gender, name, location, picture, dob,
  }) => {
    const id = `${name.first}-${name.last}-${new Date(dob.date).getTime()}`;
    const fullName = `${name.first} ${name.last}`;
    const {
      street, postcode, city, state,
    } = location;
    const { thumbnail } = picture;
    const hasPassedFilter = availableFilters[filter]
      ? availableFilters[filter](location, filterData)
      : true;

    if (hasPassedFilter === true) {
      result.push({
        id,
        fullName,
        gender,
        street,
        postcode,
        city,
        state,
        thumbnail,
      });
    }
    return result;
  }, []);
}
