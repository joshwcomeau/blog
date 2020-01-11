import React from 'react';

const NullComponent = () => null;

const LazyGeyser = props => {
  const [Component, setComponent] = React.useState(() => NullComponent);
  React.useEffect(() => {
    import('./ConfettiGeyser')
      .then(mod => mod.default)
      .then(Component => setComponent(() => Component));
  }, []);

  return <Component {...props} />;
};

export default LazyGeyser;
