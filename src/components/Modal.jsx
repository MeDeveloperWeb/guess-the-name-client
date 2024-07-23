import { forwardRef, useImperativeHandle, useRef, useState } from 'react';

// eslint-disable-next-line react/prop-types
function ModalComp(props, ref) {
  const [text, setText] = useState({
    heading: null,
    info: null,
    danger: false
  });

  const modalRef = useRef(null);

  useImperativeHandle(
    ref,
    () => ({
      showModal(text) {
        setText(text);
        if (modalRef.current) modalRef.current.showModal();
      }
    }),
    []
  );

  return (
    <dialog
      ref={modalRef}
      className="py-8 px-4 rounded-md bg-transparent text-white backdrop-blur-md w-screen h-screen open:flex justify-center items-center m-0 max-w-[100vw] max-h-[100vh]"
    >
      <div className="text-md font-medium flex flex-col justify-between text-center">
        <div>
          <p
            className={`text-6xl font-bold font-serif py-8 ${
              text.danger ? 'text-red-500' : 'text-blue-400'
            }`}
          >
            {text.heading}
          </p>
          <p className="">{text.info}</p>
        </div>
        {/* {!isImposter ? (
          <div>
            <p className="text-6xl font-bold font-serif py-8 text-blue-300">
              You are the Imposter.
            </p>
            <p className="">
              Guess the word or pretend to win! (Whenever someone (or even you)
              calls a meeting you can guess the word.)
            </p>
          </div>
        ) : (
          <div>
            <p className="text-6xl font-bold font-serif py-8 text-blue-500">
              {' '}
              Your word is: <i>{word}</i>
            </p>
            <p className="">Find Imposter to win.</p>
          </div>
        )} */}
        <div className="py-8">
          <button
            onClick={() => modalRef.current?.close()}
            className="bg-[#0B63F3] py-2 px-8 rounded-md"
          >
            Continue
          </button>
        </div>
      </div>
    </dialog>
  );
}

const Modal = forwardRef(ModalComp);

export default Modal;
