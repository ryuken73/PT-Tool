// eslint-disable-next-line import/prefer-default-export
import { saveState } from 'renderer/lib/localStorage';
import constants from 'renderer/config/constants';
const { CONFIG_LOCAL_STORAGE_KEY } = constants;
// eslint-disable-next-line import/prefer-default-export
export const createLocalStorageSaver = (options) => {
  const filterFunction = options.predicate;
  return (storeAPI) => (next) => (action) => {
    if (filterFunction(action)) {
      const result = next(action);
      const nextState = storeAPI.getState();
      saveState(CONFIG_LOCAL_STORAGE_KEY, nextState);
      return result;
    }
  };
};
