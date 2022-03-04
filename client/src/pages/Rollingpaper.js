import React, { useEffect, useState } from 'react';
import List from '../components/List';
import dummy from '../static/dummyData';

const Rollingpaper = () => {
  const [tt, tT] = useState(dummy);

  useEffect(() => {
    tT(dummy);
  }, []);

  return (
    <React.Fragment>
      <div className="total">
        <span className="total-span">{'total: ' + tt.length}</span>
      </div>
      <ul>
        {tt.map(a => {
          return <List list={a} key={a.id} />;
        })}
        {/* <List /> */}
      </ul>
    </React.Fragment>
  );
};

export default Rollingpaper;
