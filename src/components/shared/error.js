import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const style = { maxHeight: '500px', overflow: 'auto' };

const ErrorComponent = ({
  error = {},
  info = {},
  reload = () => {},
  isProd = false,
}) => {
  return (
    <Card className="mt-3">
      <Card.Body>
        <p className="text-center">
          An error was thrown by one of the component. Click on reload to
          reinitialize it again.
          <br />
          <br />
          <Button onClick={reload} size="sm" variant="outline-info">
            Reload
          </Button>
        </p>
      </Card.Body>
      {!isProd && (
        <Card.Body style={style} className="mt-2">
          <pre>
            <code>
              {error.stack}
              {'\n'}
              {info.componentStack}
            </code>
          </pre>
        </Card.Body>
      )}
    </Card>
  );
};

export default ErrorComponent;
