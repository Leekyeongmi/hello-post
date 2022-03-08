import { Link } from 'react-router-dom';

export default function Sidemenu({ isLogin, userinfo, handleLogout }) {
  //* 회원탈퇴 핸들러 만들기
  const { nickname, title, email } = userinfo;

  return (
    <div className="transition ease-in-out h-full w-screen">
      <div className="fixed inset-y-0 right-5 z-50 flex rounded-3xl bg-amber-50 shadow-2xl mt-64 mb-4 border-solid border-0 hover: ring-amber-100 hover:ring-2 transition-all">
        <div className="flex flex-col sm:flex-row sm:justify-around">
          <div className="w-80">
            <div className="flex items-center justify-start mx-6 mt-7">
              <img className="h-11 w-11 rounded-full" src="/img/doodle2.png" />
              <span className="text-gray-800 ml-4 text-xl font-bold uppercase">
                Hello, {isLogin ? nickname : 'Guest'}!
              </span>
            </div>
            <nav className="mt-6 px-6 ">
              {isLogin ? (
                <>
                  <div className="text-gray-800 font-bold text-lg">이메일</div>
                  <div className="text-lg">{email}</div>
                  <br />
                  <div className="text-gray-800 text-lg font-bold">
                    롤링페이퍼 제목
                  </div>
                  <div className="text-lg">{title}</div>
                </>
              ) : (
                <div className="mt-10 mb-32 text-gray-800 text-lg">
                  로그인이 되어있지 않네요!
                </div>
              )}
              {isLogin ? (
                <div>
                  <a
                    onClick={handleLogout}
                    className="mt-12 flex-grow hover:text-white flex items-center p-2 my-3 transition-colors hover:bg-blue-600 duration-200 text-gray-800 rounded-lg"
                    href="#"
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
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    <span className="mx-4 text-lg font-normal">로그아웃</span>
                    <span className="flex-grow text-right"></span>
                  </a>
                  <Link to="/userinfo">
                    <a
                      className="flex-grow hover:text-white flex items-center p-2 my-3 transition-colors hover:bg-blue-600 duration-200  text-gray-800 rounded-lg"
                      href="#"
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
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                        />
                      </svg>
                      <span className="mx-4 text-lg font-normal">
                        회원정보 수정
                      </span>
                      <span className="flex-grow text-right"></span>
                    </a>
                  </Link>
                  <a
                    className="mt-0 flex-grow hover:text-white flex items-center p-2 my-6 transition-colors hover:bg-blue-600 duration-200 text-gray-800 rounded-lg"
                    href="#"
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
                        d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01"
                      />
                    </svg>
                    <span className="mx-4 text-lg flex-grow">회원탈퇴</span>
                  </a>
                </div>
              ) : (
                <a
                  onClick={() => history.push('/')}
                  className="mt-60 flex-grow hover:text-white flex items-center p-2 my-3 transition-colors hover:bg-blue-600 duration-200 text-gray-800 rounded-lg"
                  href="#"
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
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span className="mx-4 text-lg font-normal">로그인하기</span>
                  <span className="flex-grow text-right"></span>
                </a>
              )}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
