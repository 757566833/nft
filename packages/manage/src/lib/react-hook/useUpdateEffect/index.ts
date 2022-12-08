
import * as React from 'react';
import {useFirstMountState} from 'src/lib/react-hook/useFirstMountState';

export const useUpdateEffect: typeof React.useEffect = (effect, deps) => {
  const isFirstMount = useFirstMountState();

  React.useEffect(() => {
    if (!isFirstMount) {
      return effect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};


