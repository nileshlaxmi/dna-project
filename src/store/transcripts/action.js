import {
	getGeneSymbolTranscriptService,
	getDNASequenceService,
} from "services/transcripts.service";
import { hideLoader, showLoader } from "store/common/action";
import { showApiError } from "utils";
import actionTypes from "./actionTypes";

export const getGeneSymbolTranscript = (payload) => (dispatch) => {
	dispatch(showLoader());
	return getGeneSymbolTranscriptService(payload)
		.then((response) => {
			const { Transcript = [] } = response;
			const _response = [];
      // To Do
			Transcript.forEach((item) => {
				return getDNASequenceService(item).then((resp) => {
					const sequenceObj = {};
					sequenceObj.gene = payload;
					sequenceObj.sequence = resp;
					_response.push(sequenceObj);
				});
			});
			return _response;
		})
		.then((_response) => {
			if (_response) {
				dispatch({
					type: actionTypes.GET_GENE_SYMBOL_TRANSCRIPT_SUCCESS,
					payload: _response,
				});
			}
			console.log("_response", _response);
			dispatch(hideLoader());
		})
		.catch((errorResponse) => {
			dispatch(hideLoader());
			showApiError(errorResponse);
			return errorResponse;
		});
};
