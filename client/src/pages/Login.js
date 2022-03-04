import { Link } from 'react-router-dom';

export default function Login({}) {
  return (
    <div className="relative overflow-hidden h-screen">
      <img
        src="img/freetime.svg"
        className="absolute h-full w-full object-cover"
      />
      {/* <div className="inset-0 bg-black opacity-10 absolute"></div> */}
      <header className="absolute top-0 left-0 right-0 z-20">
        <nav className="container mx-auto px-6 md:px-12 py-4">
          <div className="md:flex justify-between items-center">
            <div className="flex justify-between items-center">
              <a href="#" className="text-white">
                <svg
                  className="w-8 mr-2 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  data-name="Capa 1"
                  viewBox="0 0 16.16 12.57"
                >
                  <defs></defs>
                  <path d="M14.02 4.77v7.8H9.33V8.8h-2.5v3.77H2.14v-7.8h11.88z"></path>
                  <path d="M16.16 5.82H0L8.08 0l8.08 5.82z"></path>
                </svg>
              </a>
              <div className="md:hidden">
                <button className="text-white focus:outline-none">
                  <svg
                    className="h-12 w-12"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 6H20M4 12H20M4 18H20"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            {/* <div className="hidden md:flex items-center">
              <a className="text-lg uppercase mx-3 text-gray-800 cursor-pointer hover:text-gray-300">
                About us
              </a>
            </div> */}
          </div>
        </nav>
      </header>
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-40">
        <div className="lg:w-3/5 xl:w-2/5 flex flex-col items-start relative z-10">
          <span className="font-bold uppercase mx-1 text-amber-400">
            Hello-Post
          </span>
          <h1 className="font-bold text-6xl sm:text-7xl text-gray leading-tight mt-4">
            Let's
            <br />
            Rollingpaper!
          </h1>
          <div className="block bg-gray-800 hover:bg-gray-900 py-3 px-4 rounded-lg text-lg text-white font-bold uppercase mt-10">
            <Link to="/signin">SIGN IN</Link>
          </div>
          <div className="text-lg uppercase text-gray cursor-pointer hover:text-gray-300 mt-5">
            <Link to="/signup">아직 아이디가 없으신가요?</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
