import React, { useRef } from 'react';

export default function Navbar({
  tt,
  setShowSidemenu,
  setShowNotification,
  setShowPdf,
}) {
  // 현재 url 복사하는 코드
  const copyUrlRef = useRef(null);

  const copyUrlHandler = () => {
    setShowNotification(true);
    copyUrlRef.current.select();
    document.execCommand('copy');
    e.target.focus();
  };

  return (
    <>
      <nav className="top-3 relative flex flex-wrap items-center justify-between px-2 py-3 bg-blue-600 mx-5 rounded-full">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <div className="flex">
              <h1 className="font-bold text-3xl text-white leading-tight cursor-pointer">
                Lets Rollingpaper!
              </h1>
              <button
                type="button"
                className="text-md text-white text-6xl relative ml-5"
              >
                <span className="animate-[bounce_1s_ease-in-out_infinite] w-5 h-5 rounded-full absolute right-2 leading text-sm bg-lime-500">
                  {tt}
                </span>
                <svg
                  width="10"
                  height="10"
                  fill="currentColor"
                  viewBox="0 0 1792 1792"
                  className="text-white h-10 w-10"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z"></path>
                </svg>
              </button>
            </div>
          </div>

          <div>
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-lg uppercase font-bold leading-tight text-white hover:opacity-75"
                  href="#"
                  onClick={() => setShowPdf(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                    />
                  </svg>
                  <span className="ml-2">PRINT</span>
                </a>
              </li>
              <li className="relative nav-item">
                <a
                  className="px-3 py-2 flex items-center text-lg uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="#"
                  onClick={copyUrlHandler}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                  <span className="ml-2">SHARE</span>
                </a>
                <form className="absolute bottom:0 opacity-0">
                  <textarea
                    ref={copyUrlRef}
                    value={window.location.href}
                  ></textarea>
                </form>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-lg uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="#"
                  onClick={() => setShowSidemenu(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                  <span className="ml-2">MENU</span>
                </a>
              </li>
              <li className="nav-item"></li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
