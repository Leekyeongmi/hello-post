// import dummy from '../static/dummyData';
import { useEffect, useState, useRef } from 'react';
import Message from '../components/Message';
import Navbar from '../components/Navbar';
import WriteMessage from '../components/WriteMessage';
import Sidemenu from '../components/Sidemenu';
import Notification from '../components/Notification';
import PdfNotification from '../components/PdfNotification';
import LoadingIndicator from '../components/LoadingIndicator';
import axios from 'axios';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import image from '../doodle.svg';
import WithdrawlNotification from '../components/WithdrawlNotification';

export default function Rollingpaper({
  isLogin,
  userinfo,
  handleLogout,
  handleWithdrawl,
  location,
}) {
  const [showWrite, setShowWrite] = useState(false);
  const [showSidemenu, setShowSidemenu] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showPdf, setShowPdf] = useState(false);
  const [showWithdrawl, setShowWithdrawl] = useState(false);
  const [loadingIndicator, setLoadingIndicator] = useState(true);

  useEffect(() => {
    readHandler();
  }, []);

  const printRef = useRef();
  const onDownloadBtn = () => {
    setShowPdf(false);
    const message = printRef.current;
    domtoimage
      .toBlob(message)
      .then(blob => {
        saveAs(blob, 'rollingpaper.png');
      })
      .catch(error => console.log(error));
  };

  const [list, setList] = useState({
    title: '',
    total_message: '',
    messages: [
      {
        content: '',
        writer: '',
        created_at: '',
      },
    ],
  });
  const readHandler = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}${location.pathname}`, {
        headers: {
          authorization: { 'Content-Type': 'application/json' },
        },
      })
      .then(res => {
        if (res.data.messages === 'ok') {
          const { title, total_message, messages } = res.data.list;
          setList({
            title,
            total_message,
            messages,
          });
          setLoadingIndicator(false);
        }
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="h-screen bg-amber-50 overflow-x-hidden">
      <Navbar
        list={list.messages}
        showSidemenu={showSidemenu}
        setShowSidemenu={setShowSidemenu}
        setShowNotification={setShowNotification}
        setShowPdf={setShowPdf}
      ></Navbar>
      <main onClick={() => setShowSidemenu(false)}>
        <img
          className="absolute bottom-5 left-1/4 w-1/2 opacity-20"
          src={image}
        ></img>
        <div className="mr-12 mx-8 mt-14">
          <ul ref={printRef} className="grid grid-cols-6">
            {list.messages.map((message, index) => {
              return (
                <Message
                  list={list.messages}
                  message={message}
                  index={index}
                  key={index}
                />
              );
            })}
          </ul>
        </div>
        <button
          onClick={() => setShowWrite(true)}
          className="z-50 absolute bg-blue-600 text-white right-5 bottom-5 items-center p-4 transition ease-in duration-200 uppercase rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-9 w-9 hover:opacity-75"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </button>
        {showWrite ? (
          <WriteMessage
            location={location}
            setShowWrite={setShowWrite}
          ></WriteMessage>
        ) : null}
      </main>
      <div>
        <div>
          {showSidemenu ? (
            <Sidemenu
              isLogin={isLogin}
              userinfo={userinfo}
              handleLogout={handleLogout}
              setShowWithdrawl={setShowWithdrawl}
            ></Sidemenu>
          ) : null}
        </div>
        {showPdf ? (
          <PdfNotification
            onDownloadBtn={onDownloadBtn}
            setShowPdf={setShowPdf}
            content="롤링페이퍼를 이미지로 소장하시겠습니까?"
          ></PdfNotification>
        ) : null}
      </div>
      {showNotification ? (
        <Notification
          setShowNotification={setShowNotification}
          content="링크 복사가 완료되었습니다."
        ></Notification>
      ) : null}
      {showWithdrawl ? (
        <WithdrawlNotification
          handleWithdrawl={handleWithdrawl}
          setShowWithdrawl={setShowWithdrawl}
        ></WithdrawlNotification>
      ) : null}
      {loadingIndicator ? <LoadingIndicator></LoadingIndicator> : null}
    </div>
  );
}
