interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const ConfirmModal = ({ 
  isOpen, 
  title, 
  message, 
  onConfirm, 
  onCancel, 
  isLoading 
}: ConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all scale-100">
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600">{message}</p>
        </div>
        
        <div className="bg-gray-50 px-6 py-4 flex flex-row-reverse gap-3">
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`px-5 py-2.5 rounded-xl font-semibold text-white transition-all
              ${isLoading 
                ? 'bg-red-400 cursor-not-allowed' 
                : 'bg-red-600 hover:bg-red-700 active:scale-95 shadow-md hover:shadow-lg'}`}
          >
            {isLoading ? 'Видалення...' : 'Видалити'}
          </button>
          
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="px-5 py-2.5 rounded-xl font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 transition-all active:scale-95"
          >
            Скасувати
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;