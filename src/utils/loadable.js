import React from "react";
import { Spin } from "antd";

const loadable = importFn => {
  const AsyncLoadComponent = React.lazy(importFn);
  return props => (
    <React.Suspense fallback={<Spin />}>
      <AsyncLoadComponent {...props} />
    </React.Suspense>
  );
};

export default loadable;
