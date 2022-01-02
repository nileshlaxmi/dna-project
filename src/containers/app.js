import React, { Component } from "react";
import { connect } from "react-redux";
import { IconContext } from "react-icons";
import "../assets/scss/bootstrapCustom.scss";
import "../assets/scss/app.scss";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

// top level components
import Loader from "../components/shared/loader";

// common components
import Header from "containers/header";
import Lazyload from "../components/shared/lazyLoad";
import RoutePrivate from "../components/routePrivate";

// auth actions

import { isLoadingSelector } from "../store/common/selector";

import GeneSymbolContainer from "./GeneSymbol";
import UniqueLogin from "./uniqueLogin";

import RoutePublic from "components/routePublic";
import SnackbarToast from "components/common/SnackBar";
import ScrollToTop from "components/common/ScrollToTop";

// lazy loaded components
const Notfound = Lazyload(() => import("../components/notFound/"));

// root app component
class App extends Component {
	state = {
		icons: { className: "app-icons" },
	};

	render() {
		const { isLoading } = this.props;
		const { isAuthenticated } = this.props.authInfo;
		const href = (window.location.href || "").toLowerCase();
		const isTopLeftMargin = !href.includes("logout") && isAuthenticated;
		return (
			<IconContext.Provider value={this.state.icons}>
				<Router basename={process.env.REACT_APP_BASE_URL}>
					<ScrollToTop />
					<SnackbarToast />

					{isLoading && <Loader show={true} />}
					{isTopLeftMargin && (
						<>
							<div className="fixed-top-header">
								<Header {...this.props} />
							</div>
						</>
					)}

					<main
						className={`app__main face-detection-admin ${
							isTopLeftMargin ? "page-authenticated" : ""
						}`}
					>
						<div
							className={`face-detection-page ${
								isTopLeftMargin ? "page-authenticated" : ""
							}`}
						>
							<Switch>
								<RoutePublic
									path="/"
									exact
									component={GeneSymbolContainer}
								/>
								<RoutePublic
									path="/transcripts"
									component={UniqueLogin}
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
		authInfo: state.auth,
		isLoading: isLoadingSelector(state),
	};
};

export default connect(mapStateToProps)(App);
