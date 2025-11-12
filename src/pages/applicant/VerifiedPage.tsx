import { EmptyState } from "@/components/common/EmptyState";
import ApplicantLayout from "@/components/common/layout/ApplicantLayout";

const VerifiedPage = () => {
  return (
    <ApplicantLayout>
      <EmptyState
        img="/public/Verified.png"
        headTitle="🎉Your application was sent!"
      >
        Congratulations! You've taken the first step towards a rewarding career
        at Rakamin. <br />
        We look forward to learning more about you during the application
        process.
      </EmptyState>
    </ApplicantLayout>
  );
};

export default VerifiedPage;
