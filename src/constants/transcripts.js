export const initialTableConfig = {
	sortOrder: "",
	sortBy: "",
	page: 1,
	size: 10,
};

export const transcriptsTableHeader = [
	{
		label: "Description",
		dataKey: "desc",
		className: "show-ellipsis uppercase-text",
		width: "16%",
	},
	{
		label: "ID",
		dataKey: "id",
		className: "show-ellipsis uppercase-text",
		width: "16%",
	},
	{
		label: "Molecule",
		dataKey: "molecule",
		className: "show-ellipsis uppercase-text",
		width: "16%",
	},
	{
		label: "Sequence",
		dataKey: "seq",
		className: "show-ellipsis uppercase-text",
		width: "20%",
	},
	{
		label: "Version",
		dataKey: "version",
		width: "16%",
	},
	{
		label: "Query",
		dataKey: "query",
		className: "show-ellipsis uppercase-text",
		width: "16%",
	},
	
];
