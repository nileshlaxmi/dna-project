import React, { Component } from "react";
import { connect } from "react-redux";
import { IconContext } from "react-icons";
import "../assets/scss/bootstrapCustom.scss";
import "../assets/scss/app.scss";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

import { isLoadingSelector } from "../store/common/selector";

// top level components
import Loader from "../components/shared/loader";
import RoutePublic from "components/routePublic";
import SnackbarToast from "components/common/SnackBar";
import ScrollToTop from "components/common/ScrollToTop";

// root level components
import GeneSymbolContainer from "./GeneSymbol";
import Transcripts from "./Transcripts";

class App extends Component {
	state = {
		icons: { className: "app-icons" },
	};

	render() {
		const { isLoading } = this.props;
		return (
			<IconContext.Provider value={this.state.icons}>
				<Router basename={process.env.REACT_APP_BASE_URL}>
					<ScrollToTop />
					<SnackbarToast />

					{isLoading && <Loader show={true} />}

					<main className={`app__main dna-project`}>
						<div className={`dna-project-page`}>
							<Switch>
								<RoutePublic
									path="/"
									exact
									component={GeneSymbolContainer}
									isAuthenticated={false}
								/>
								<RoutePublic
									path="/transcripts"
									component={Transcripts}
									isAuthenticated={false}
								/>
								<Redirect to={"/"} />
							</Switch>
						</div>
					</main>
				</Router>
			</IconContext.Provider>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoading: isLoadingSelector(state),
	};
};

export default connect(mapStateToProps)(App);
