export default function Notification() {
  return (
    <div className="shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-800 w-64 m-auto">
      <div className="w-full h-full text-center">
        <div className="flex h-full flex-col justify-between">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 m-auto"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-gray-800 dark:text-gray-200 text-l font-bold mt-4">
            알림
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-xs py-2 px-6">
            탈퇴가 완료되었습니다.
          </p>
          <div className="flex items-center justify-between gap-4 w-full mt-8">
            <button
              type="button"
              className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              확인
            </button>
            <button
              type="button"
              className="py-2 px-4  bg-white hover:bg-gray-100 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-indigo-500 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
