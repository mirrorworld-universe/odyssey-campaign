import { useWalletModal } from "../../store/account";

export function Modal({ children }: any) {
  const { isOpen, onOpen, onClose } = useWalletModal();

  const handleCloseModal = () => {
    onClose();
  };

  return isOpen ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div
        className="w-full h-full absolute top-0 left-0 bottom-0 right-0"
        onClick={handleCloseModal}
      ></div>
      <div className="bg-[#1A1A1A] rounded-xl p-8 shadow-lg w-full max-w-md absolute">
        <img
          className="cursor-pointer hover:opacity-80 absolute top-8 right-8 transition-all"
          src="images/close.svg"
          alt=""
          onClick={handleCloseModal}
        />
        {children}
      </div>
    </div>
  ) : null;
}
