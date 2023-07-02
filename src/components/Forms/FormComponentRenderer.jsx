import { useMemo } from 'react';

export const FormComponentRenderer = ({
  ComponentToRender,
  allProps,
  valuesToObserve,
}) => {
  const identifier = useMemo(() => Math.floor(Math.random() * 1000000), []);
  const Component = useMemo(
    () => (
      <ComponentToRender
        {...allProps}
        key={`${allProps.id}-${identifier}`}
        id={`${allProps.id}-${identifier}`}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ComponentToRender, ...valuesToObserve]
  );
  return <>{Component && Component}</>;
};
