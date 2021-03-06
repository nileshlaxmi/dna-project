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
			let _response = [];

			Transcript.forEach((item) => {
				return getDNASequenceService(item).then((resp) => {
					const sequenceObj = {};
					sequenceObj.gene = payload;
					sequenceObj.sequence = resp;
					_response = [..._response, sequenceObj];
					if (_response.length) {
						dispatch({
							type: actionTypes.GET_GENE_SYMBOL_TRANSCRIPT_SUCCESS,
							payload: _response,
						});
					}
				});
			});
			dispatch(hideLoader());
			return _response;
		})
		.catch((errorResponse) => {
			dispatch(hideLoader());
			showApiError(errorResponse);
			return errorResponse;
		});
};
