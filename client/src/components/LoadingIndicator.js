import indicator from '../loading.png';

function LoadingIndicator() {
  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <img className="w-28 opacity-70 animate-spin" src={indicator} />
      <div className="opacity-20 fixed inset-0 z-50 bg-black"></div>
    </div>
  );
}

export default LoadingIndicator;
