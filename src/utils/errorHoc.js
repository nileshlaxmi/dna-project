import React from 'react';
import Error from '../components/shared/error';

const withError = WrappedComponent => {
  class WithError extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        info: null,
      };
    }
    componentDidCatch(error, info) {
      console.log(error);
      this.setState({ error, info });
    }
    reload = () => this.setState({ error: null });
    isProd = () => process.env.NODE_ENV === 'production';
    render() {
      const { error, info } = this.state;
      if (this.state.error) {
        return (
          <Error
            reload={this.reload}
            error={error}
            info={info}
            isProd={this.isProd()}
          />
        );
      }
      return <WrappedComponent {...this.props} />;
    }
  }
  WithError.displayName = `WithError(${getDisplayName(WrappedComponent)})`;
  return WithError;
};

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default withError;
