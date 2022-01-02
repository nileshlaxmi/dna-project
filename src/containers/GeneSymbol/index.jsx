import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import {
	Radio,
	RadioGroup,
	FormControlLabel,
	FormControl,
	FormLabel,
} from "@material-ui/core";

import withError from "utils/errorHoc";
import { CONSTANTS } from "constants/index";
import "./style.scss";
import { defaultValidation, validateForm } from "utils/validations";
import errorMessages from "constants/errorMessages";
import { errorToast } from "components/common/SnackBar";
import RenderInput from "components/common/elements/renderInput";

class GeneSymbolContainer extends Component {
	state = {
		species: "",
		gene_symbol: "",
		position: 0,
		amino_acid_letter: "",
		option: "",
		errors: {},
	};

	handleChange = (name, value) => {
		const { option } = this.state;
		let _errors = { ...this.state.errors };
		let property = name;
		const validation = defaultValidation[property];
		if (validation) {
			let obj = {};
			if (property === "position") {
				obj.value = value;
				obj.property = option;
			} else {
				obj.value = value;
			}
			let error = validation(obj);
			if (error) {
				_errors[property] = error;
			} else {
				delete _errors[property];
			}
			this.setState({ errors: { ..._errors } });
		}
		if (property === "option") {
			this.setState({ [property]: value }, () => {
				this.setState({ position: value === "anywhere" ? 0 : 10 });
			});
		} else {
			this.setState({ [property]: value });
		}
	};

	submit = (e) => {
		e.preventDefault();
		const {
			species,
			gene_symbol,
			position,
			option,
			amino_acid_letter,
		} = this.state;
		const { history } = this.props;

		const gene = {};
		gene.species = species;
		gene.gene_symbol = gene_symbol;
		gene.position = position;
		gene.amino_acid_letter = amino_acid_letter;

		const geneFormErrors = validateForm({
			formData: gene,
			formFields: ["species", "gene_symbol", "position", "amino_acid_letter"],
		});

		if (Object.keys(geneFormErrors).length > 0) {
			errorToast(errorMessages.emptyFormError);
			document.getElementById(Object.keys(geneFormErrors)[0]).focus();
		} else {
			let _position = position - 10;
			history.push(
				`/transcripts?species=${species}&gene_symbol=${gene_symbol}&position=${
					option === "tenth_left" ? _position : position
				}&amino_acid_letter=${amino_acid_letter}`
			);
		}
	};

	isDisabled = () => {
		const { species, gene_symbol, amino_acid_letter, errors } = this.state;
		return (
			!species ||
			!gene_symbol ||
			!amino_acid_letter ||
			Object.keys(errors).length !== 0
		);
	};

	render() {
		const {
			species,
			gene_symbol,
			position,
			amino_acid_letter,
			errors,
			option,
		} = this.state;
		const _disabled = this.isDisabled();
		return (
			<div className="gene-symbol-form">
				<form className="gene-symbol-form__inner" onSubmit={this.submit}>
					<div className="gene-symbol-form__body">
						<div className="gene-symbol-form__body--small">
							{CONSTANTS.homePageText}
						</div>
						<RenderInput
							label="Species"
							type="text"
							id="species"
							property="species"
							placeholder="Species"
							value={species}
							onChange={({ value }) => {
								this.handleChange("species", value);
							}}
							error={errors && errors["species"]}
						/>
						<RenderInput
							label="Gene Symbol"
							type="text"
							id="gene_symbol"
							property="gene_symbol"
							placeholder="Gene Symbol"
							value={gene_symbol}
							onChange={({ value }) => {
								this.handleChange("gene_symbol", value);
							}}
							error={errors && errors["gene_symbol"]}
						/>
						<FormControl component="fieldset">
							<FormLabel component="legend">{CONSTANTS.position}</FormLabel>
							<RadioGroup
								aria-label="position"
								name="controlled-radio-buttons-group"
								row
								value={option ? option : "anywhere"}
								onChange={(event) => {
									this.handleChange("option", event.target.value);
								}}
							>
								<FormControlLabel
									value="anywhere"
									control={<Radio color="default" />}
									label="Anywhere"
								/>
								<FormControlLabel
									value="tenth_left"
									control={<Radio color="default" />}
									label="Tenth Left"
								/>
							</RadioGroup>
						</FormControl>
						<RenderInput
							type="number"
							id="position"
							property="position"
							placeholder="Position"
							value={position}
							onChange={({ value }) => {
								this.handleChange("position", value);
							}}
							error={errors && errors["position"]}
						/>

						<RenderInput
							label="Amino Acid Letter"
							type="text"
							id="amino_acid_letter"
							property="amino_acid_letter"
							placeholder="Amino Acid Letter"
							value={amino_acid_letter}
							onChange={({ value }) => {
								this.handleChange("amino_acid_letter", value);
							}}
							error={errors && errors["amino_acid_letter"]}
						/>
					</div>
					<button
						className="btn btn-lg btn-secondary btn-block mt-5 submit-btn"
						type="submit"
						disabled={_disabled}
					>
						{CONSTANTS.submit}
					</button>
				</form>
			</div>
		);
	}
}

export default withError(withRouter(GeneSymbolContainer));
