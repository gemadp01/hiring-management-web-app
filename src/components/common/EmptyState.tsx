type TEmptyState = {
  children?: React.ReactNode;
  img: string;
  headTitle: string;
  desc?: string;
};

export const EmptyState = ({ children, img, headTitle, desc }: TEmptyState) => {
  return (
    <div className="bg-neutral-10 p-12 text-center">
      {/* Illustration */}
      <div className="mb-4 flex justify-center">
        <img src={img} alt="Verified" />
      </div>
      {/* Text */}
      <h2 className="text-heading-s-bold text-neutral-90 mb-1">{headTitle}</h2>
      <p className="text-l-regular text-neutral-90 mb-4">{desc}</p>
      {children}
    </div>
  );
};
