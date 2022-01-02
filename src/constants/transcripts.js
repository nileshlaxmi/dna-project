export const initialTableConfig = {
	sortOrder: "",
	sortBy: "",
	page: 1,
	size: 10,
};

export const transcriptsTableHeader = [
	{
		label: "ID",
		dataKey: "id",
		className: "show-ellipsis uppercase-text",
		width: "16%",
	},
	{
		label: "Description",
		dataKey: "desc",
		className: "show-ellipsis uppercase-text",
		width: "20%",
	},
	{
		label: "Sequence",
		dataKey: "seq",
		className: "show-ellipsis uppercase-text",
		width: "28%",
	},
	{
		label: "Query",
		dataKey: "query",
		className: "show-ellipsis uppercase-text",
		width: "16%",
	},
	{
		label: "Molecule",
		dataKey: "molecule",
		className: "show-ellipsis uppercase-text",
		width: "10%",
	},
	{
		label: "Version",
		dataKey: "version",
		width: "10%",
	},
];
