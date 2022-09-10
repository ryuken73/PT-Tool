import React from 'react';

const fs = require('fs');

const Header = () => {
  React.useEffect(() => {
    // fs.readdir('d:/', (err, files) => console.log(err, files));
  }, []);
  return <div>Header</div>;
};

export default React.memo(Header);
