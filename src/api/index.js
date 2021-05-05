import { results } from '@/api/database.json';

/* Add a timeout so I can simulate a real request */
const mockRequest = async (fn, params) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  return fn(params);
};

const generateId = (name, dob) => `${name.first}-${name.last}-${new Date(dob.date).getTime()}`;
const formatName = (name) => `${name.first} ${name.last}`;

/* All filter functions */
const availableFilters = {
  by_states: ({ state }, states) => states.includes(state),
  by_name: ({ fullName }, query) => fullName.search(query) !== -1,
  by_id: ({ id }, queryId) => id === queryId,
};

/* Pagination - The last time I did this was with PHP */
const paginate = (data, page = 1, itemsPerPage = 20) => {
  const pages = Math.floor(data.length / itemsPerPage) || 1;
  const result = [];
  const pageIterator = [...new Array(pages)];

  pageIterator.forEach((_, index) => {
    const start = itemsPerPage * index;
    result[index] = [...data].splice(start, itemsPerPage);
  });
  return {
    results: result[page - 1],
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
  static getPeople = ({
    filter, filterData, page, itemsPerPage, allData,
  }) => {
    const filteredData = results.reduce((result, personData) => {
      /* Payload formatting */
      const {
        gender, name, location, picture, dob,
      } = personData;
      const id = generateId(name, dob);
      const fullName = formatName(name);
      const {
        street, postcode, city, state,
      } = location;
      const { medium } = picture;
      /* Filtering */
      const hasPassedFilter = availableFilters[filter]
        ? availableFilters[filter]({ id, fullName, ...location }, filterData)
        : true;

      if (hasPassedFilter) {
        result.push({
          id,
          fullName,
          gender,
          street,
          postcode,
          city,
          state,
          thumbnail: medium,
          ...(allData ? personData : {}),
        });
      }
      return result;
    }, []);
    return paginate(filteredData, page, itemsPerPage);
  };

  static getRandom = () => {
    const position = Math.floor(Math.random() * results.length);
    const { location, name } = results[position];
    return {
      latitude: location.coordinates.latitude,
      longitude: location.coordinates.longitude,
      fullName: formatName(name),
    };
  };
}
