import {
  getGeneSymbolTranscriptService,
} from 'services/dna.service';
import { hideLoader, showLoader } from 'store/common/action';
import { showApiError } from 'utils';
import actionTypes from './actionTypes';

export const getGeneSymbolTranscript = payload => dispatch => {
  dispatch(showLoader());
  return getGeneSymbolTranscriptService(payload)
    .then(response => {
      dispatch({
        type: actionTypes.GET_GENE_SYMBOL_TRANSCRIPT_SUCCESS,
        payload: response,
      });
      dispatch(hideLoader());
      return response;
    })
    .catch(errorResponse => {
      dispatch(hideLoader());
      showApiError(errorResponse);
      return errorResponse;
    });
};
