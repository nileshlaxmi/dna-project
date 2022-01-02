const endpoints = {
	getGeneSymbol: ({ species, gene_symbol, page = 1 }) =>
		`/lookup/symbol/${species}/${gene_symbol}.json?;expand=${page}`,
	getDNASequence: ({ id }) => `/sequence/id/${id}.json`,
};

export default endpoints;
