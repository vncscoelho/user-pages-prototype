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
}
