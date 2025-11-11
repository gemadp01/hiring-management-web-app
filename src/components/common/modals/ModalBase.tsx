type TModalBaseProps = {
  headTitle: string;
  isOpen: boolean;
  handleCloseModal: () => void;
  icon: React.ElementType;
  children: React.ReactNode;
};

export function ModalBase({
  headTitle,
  isOpen,
  handleCloseModal,
  icon: Icon,
  children,
}: TModalBaseProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-neutral-100/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[rgba(255,255,255,1)] rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-40">
          <h2 className="text-l-bold text-neutral-100">{headTitle}</h2>
          <button
            onClick={handleCloseModal}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <Icon className="w-5 h-5 text-neutral-90" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
}
