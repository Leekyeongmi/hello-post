import Navbar from '../components/Navbar';

export default function Rollingpaper() {
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
