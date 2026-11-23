import {dbConnection} from './mongoConnection.js';

const getCollectionFn = (collection) => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection();
      _col = db.collection(collection);
    }

    return _col;
  };
};


// Create whatever collections is needed
