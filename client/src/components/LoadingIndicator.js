import indicator from '../loading.gif';

function LoadingIndicator() {
  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <img className="w-16" alt="now loading..." src={indicator} />
      <div className="opacity-25 fixed inset-0 z-50 bg-black"></div>
    </div>
  );
}

export default LoadingIndicator;
