import React, { useEffect, useState } from 'react';
import List from '../components/List';
import dummy from '../static/dummyData';
import Navbar from '../components/Navbar';

export default function Rollingpaper() {
//   const [tt, tT] = useState(dummy);

//   useEffect(() => {
//     tT(dummy);
//   }, []);

//   return (
//     <React.Fragment>
//       <div className="total">
//         <span className="total-span">{'total: ' + tt.length}</span>
//       </div>
//       <ul>
//         {tt.map(a => {
//           return <List list={a} key={a.id} />;
//         })}
//       </ul>
//     </React.Fragment>
//   );
// };
  return (
    <main className="bg-amber-50 h-full">
      <Navbar></Navbar>
      <img
        className="absolute bottom-2 left-1 w-1/3 opacity-90"
        src="img/clumsy.png"
      ></img>
      {/* <div>
        <Message></Message>
      </div> */}
    </main>
  );
}

//  내비게이션바 (출력, 공유, 쓰기, 메뉴바) // 배경색 // 일러스트 // 흩뿌려진 종이들

