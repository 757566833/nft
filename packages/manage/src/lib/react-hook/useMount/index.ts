import {useEffectOnce} from 'src/lib/react-hook/useEffectOnce';

export const useMount = (fn: () => void) => {
  useEffectOnce(() => {
    fn();
  });
};


