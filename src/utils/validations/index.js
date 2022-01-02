import { validateRequired } from "./common";
import errorMessages from "constants/errorMessages";

export const defaultValidation = {
	species: ({ value }) => {
		if (!validateRequired(value)) {
			return errorMessages.blank("Species");
		}
	},
	gene_symbol: ({ value }) => {
		if (!validateRequired(value)) {
			return errorMessages.blank("Gene Symbol");
		}
	},
	position: ({ value }) => {
		if (!validateRequired(value)) {
			return errorMessages.blank("Position");
		}
	},
	amino_acid_letter: ({ value }) => {
		if (!validateRequired(value)) {
			return errorMessages.blank("Amino Acid Letter");
		}
	},
};

export const validateForm = ({
	formData,
	formFields = [],
	errors = {},
	range = {},
	domainList = [],
}) => {
	formFields.forEach((field) => {
		const validation = defaultValidation[field];

		if (validation) {
			let error = validation({
				value: formData[field],
				formData,
				domainList,
				range,
			});
			if (error) {
				errors[field] = error;
			} else {
				delete errors[field];
			}
		}
	});
	return errors;
};
