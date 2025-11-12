type TCallToActionCardProps = {
  children: React.ReactNode;
  img: string;
  headTitle: string;
  desc: string;
};

export const CallToActionCard = ({
  children,
  img,
  headTitle,
  desc,
}: TCallToActionCardProps) => {
  return (
    <div
      className={`rounded-2xl p-8 text-white shadow-xl sticky top-8 bg-[url('${img}')] bg-cover`}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.72)] rounded-2xl"></div>
      <div className="relative mb-6 z-10">
        <h3 className="text-l-bold mb-1 text-neutral-40">{headTitle}</h3>
        <p className="text-m-bold text-neutral-10">{desc}</p>
      </div>

      <div className="relative w-full z-10">{children}</div>
    </div>
  );
};
