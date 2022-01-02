import ActionTypes from "./actionTypes";

const initialState = {
	transcriptList: null,
};

const dnaReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case ActionTypes.GET_GENE_SYMBOL_TRANSCRIPT_SUCCESS:
			return {
				...state,
				transcriptList: payload,
			};
		default:
			return state;
	}
};

export default dnaReducer;
