export default function PdfNotification({
  content,
  setShowPdf,
  onDownloadBtn,
}) {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="shadow-lg rounded-2xl p-4 bg-white w-84">
          <div className="w-full h-full text-center">
            <div className="flex h-full flex-col justify-between">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 m-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-gray-800 dark:text-gray-200 text-base font-bold mt-4">
                알림
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-base py-2 px-6">
                {content}
              </p>
              <div className="flex items-center justify-between gap-4 w-full mt-8">
                <button
                  onClick={onDownloadBtn}
                  type="button"
                  className="py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-1 focus:ring-offset-1  rounded-lg "
                >
                  확인
                </button>
                <button
                  onClick={() => setShowPdf(false)}
                  type="button"
                  className="py-2 px-4  bg-white hover:bg-gray-100 focus:ring-blue-500 focus:ring-offset-blue-200 text-blue-500 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                >
                  cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
