import * as React from 'react';
import { debounce } from 'renderer/lib/appUtil';

const useDebounce = (value, debounceTime = 100) => {
  const [debounced, setDebounced] = React.useState(value);
  const debouncedFunc = React.useRef();
  React.useEffect(() => {
    debouncedFunc.current = debounce(setDebounced, debounceTime);
  }, []);
  React.useEffect(() => {
    debouncedFunc.current && debouncedFunc.current(value);
  }, [value]);
  return debounced;
};

export default useDebounce;
