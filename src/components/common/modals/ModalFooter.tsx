type TModalFooter = {
  children: React.ReactNode;
};

export const ModalFooter = ({ children }: TModalFooter) => {
  return (
    <div className="p-6 border-t border-neutral-40 flex justify-end">
      {children}
    </div>
  );
};
