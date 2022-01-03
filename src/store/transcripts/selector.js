import { createSelector } from "reselect";

export const transcriptState = (state) => state.transcripts;

export const transcriptSelector = createSelector(
	[transcriptState],
	(transcriptList) => transcriptList.transcriptList
);

export const transcriptListSelector = createSelector(
	[transcriptSelector],
	(transcripts) => {
		let list = [],
			count = 0;
		if (transcripts) {
			list = setTranscriptsList(transcripts) || [];
			count = transcripts.length;
		}
		return { list, count };
	}
);

const setTranscriptsList = (transcripts) => {
	const list = (transcripts || []).map((item) => {
		const { gene, sequence } = item;
		const { amino_acid_letter, position } = gene;
		const { seq } = sequence;
		let _position = Number(position);
		const char = seq.charAt(_position ? _position - 1 : 0);
		if (char === amino_acid_letter.toUpperCase()) return sequence;
		else return []
	});
	return list || [];
};
