import database from '@/api/database.json';

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

  static getData = () => database;
}
