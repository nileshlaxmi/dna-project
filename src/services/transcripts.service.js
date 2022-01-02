import { axios, endpoints, errorHandler, successHandler } from './utils';

export const getGeneSymbolTranscriptService = (request) => {
  return axios
    .get(endpoints.getGeneSymbol(request))
    .then(response => {
      return successHandler(response);
    })
    .catch(error => {
      return errorHandler(error);
    });
};

export const getDNASequenceService = (request) => {
  return axios
    .get(endpoints.getDNASequence(request))
    .then(response => {
      return successHandler(response);
    })
    .catch(error => {
      return errorHandler(error);
    });
};
