import * as React from 'react';
import {useEffectOnce} from 'src/lib/react-hook/useEffectOnce';

export const useUnmount = (fn: () => any): void => {
  const fnRef = React.useRef(fn);

  // update the ref each render so if it change the newest callback will be invoked
  fnRef.current = fn;

  useEffectOnce(() => () => fnRef.current());
};


