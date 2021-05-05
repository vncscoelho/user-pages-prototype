import { results } from '@/api/database.json';

/* Add a timeout so I can simulate a real request */
const mockRequest = async (fn, params) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  return fn(params);
};

/* All filter functions */
const availableFilters = {
  by_states: ({ state }, states) => states.includes(state),
};

/* Pagination - The last time I did this was with PHP */
const paginate = (data, page, itemsPerPage = 20) => {
  const pages = Math.floor(data.length / itemsPerPage) || 1;
  const result = [];
  const pageIterator = [...new Array(pages)];

  pageIterator.forEach((_, index) => {
    const start = itemsPerPage * index;
    result[index] = [...data].splice(start, itemsPerPage);
  });
  return {
    results: result[page],
    pages,
    current_page: page,
    perPage: itemsPerPage,
    total: data.length,
  };
};

export default class API {
  constructor() {
    const methods = Object.keys(API);
    methods.forEach((method) => {
      this[method] = (...params) => mockRequest(API[method], ...params);
    });
  }

  /* Get states */
  static getStates = () => results.reduce((allStates, { location }) => {
    const { state } = location;
    if (!allStates.includes(state)) {
      allStates.push(state);
    }
    return allStates;
  }, []);

  /* Get, filter and paginate people */
  static getPeople = ({ filter, filterData, page = 0 }) => {
    const filteredData = results.reduce(
      (result, {
        gender, name, location, picture, dob,
      }) => {
        /* Payload formatting */
        const id = `${name.first}-${name.last}-${new Date(dob.date).getTime()}`;
        const fullName = `${name.first} ${name.last}`;
        const {
          street, postcode, city, state,
        } = location;
        const { thumbnail } = picture;
        /* Filtering */
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
      },
      [],
    );
    return paginate(filteredData, page);
  };
}
