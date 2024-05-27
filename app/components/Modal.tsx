export function Modal({ children, isOpen, onClose }: any) {
  const handleCloseModal = () => {
    onClose && onClose();
  };

  return isOpen ? (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleCloseModal}
    >
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-md p-6 space-y-4">
        {children}
      </div>
    </div>
  ) : null;
}
