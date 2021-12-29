import React, { lazy, Suspense } from 'react';
import Spinner from './spinner';

const LazyLoad = (
  importFunc,
  { fallback = null } = { fallback: <Spinner className="mt-2" /> },
) => {
  const LazyComponent = lazy(importFunc);

  return props => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export default LazyLoad;
