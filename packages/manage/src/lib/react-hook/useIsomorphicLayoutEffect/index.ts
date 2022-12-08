import * as React from 'react';
import {isBrowser} from 'src/lib/react-hook/util/env';

/**
 * 一般用于动画，判断是不是浏览器环境
 */
export const useIsomorphicLayoutEffect = isBrowser ? React.useLayoutEffect : React.useEffect;


