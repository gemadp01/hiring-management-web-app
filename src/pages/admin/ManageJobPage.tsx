import { Button } from "@/components/common/Button";
import { EmptyState } from "@/components/common/EmptyState";
import AdminLayout from "@/components/common/layout/AdminLayout";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

type Candidate = {
  id: number;
  name: string;
  email: string;
  phone: string;
  dob: string;
  domicile: string;
  gender: string;
  linkedin: string;
  selected: boolean;
};

const ManageJobPage = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([
    {
      id: 1,
      name: "Aurelie Yukiko",
      email: "aurelieyukiko.yahoo.com",
      phone: "082120908766",
      dob: "30 January 2001",
      domicile: "Jakarta",
      gender: "Female",
      linkedin: "https://www.linkedin.com/in/use...",
      selected: false,
    },
    {
      id: 2,
      name: "Dityo Hendyawan",
      email: "dityohendyawan@yaho...",
      phone: "081184180678",
      dob: "30 January 2001",
      domicile: "Jakarta",
      gender: "Female",
      linkedin: "https://www.linkedin.com/in/use...",
      selected: false,
    },
    {
      id: 3,
      name: "Mira Workman",
      email: "miraworkman@yahoo.c...",
      phone: "081672007108",
      dob: "30 January 2001",
      domicile: "Jakarta",
      gender: "Female",
      linkedin: "https://www.linkedin.com/in/use...",
      selected: false,
    },
    {
      id: 4,
      name: "Paityn Culhane",
      email: "paitynculhane@yahoo....",
      phone: "081521500714",
      dob: "30 January 2001",
      domicile: "Jakarta",
      gender: "Male",
      linkedin: "https://www.linkedin.com/in/use...",
      selected: false,
    },
    {
      id: 5,
      name: "Emerson Baptista",
      email: "emersonbaptista@yah...",
      phone: "082167008244",
      dob: "30 January 2001",
      domicile: "Jakarta",
      gender: "Male",
      linkedin: "https://www.linkedin.com/in/use...",
      selected: false,
    },
    {
      id: 6,
      name: "Indra Zein",
      email: "indrazein@yahoo.com",
      phone: "081181630568",
      dob: "30 January 2001",
      domicile: "Jakarta",
      gender: "Male",
      linkedin: "https://www.linkedin.com/in/use...",
      selected: false,
    },
    {
      id: 7,
      name: "Joyce",
      email: "joyce@yahoo.com",
      phone: "084288771015",
      dob: "30 January 2001",
      domicile: "Jakarta",
      gender: "Male",
      linkedin: "https://www.linkedin.com/in/use...",
      selected: false,
    },
    {
      id: 8,
      name: "Eriberto",
      email: "eriberto@yahoo.com",
      phone: "083862419121",
      dob: "30 January 2001",
      domicile: "Jakarta",
      gender: "Male",
      linkedin: "https://www.linkedin.com/in/use...",
      selected: false,
    },
    {
      id: 9,
      name: "Javon",
      email: "javon@yahoo.com",
      phone: "083283445502",
      dob: "30 January 2001",
      domicile: "Jakarta",
      gender: "Male",
      linkedin: "https://www.linkedin.com/in/use...",
      selected: false,
    },
    {
      id: 10,
      name: "Emory",
      email: "emory@yahoo.com",
      phone: "087188286367",
      dob: "30 January 2001",
      domicile: "Jakarta",
      gender: "Male",
      linkedin: "https://www.linkedin.com/in/use...",
      selected: false,
    },
    {
      id: 11,
      name: "Ella",
      email: "ella@yahoo.com",
      phone: "088306913834",
      dob: "30 January 2001",
      domicile: "Jakarta",
      gender: "Male",
      linkedin: "https://www.linkedin.com/in/use...",
      selected: false,
    },
    {
      id: 12,
      name: "Sylvan",
      email: "sylvan@yahoo.com",
      phone: "087752105228",
      dob: "30 January 2001",
      domicile: "Jakarta",
      gender: "Male",
      linkedin: "https://www.linkedin.com/in/use...",
      selected: false,
    },
  ]);

  const [selectAll, setSelectAll] = useState(false);
  const [activeTab, setActiveTab] = useState("manage");

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setCandidates(candidates.map((c) => ({ ...c, selected: newSelectAll })));
  };

  const handleSelectCandidate = (id: number) => {
    setCandidates(
      candidates.map((c) => (c.id === id ? { ...c, selected: !c.selected } : c))
    );
  };

  const selectedCount = candidates.filter((c) => c.selected).length;

  return (
    <AdminLayout
      headTitle={
        <div className="flex items-center gap-3">
          <Button variant="neutral" onClick={() => setActiveTab("list")}>
            Job list
          </Button>
          <ChevronRightIcon className="w-5 h-5 text-gray-400" />
          <Button variant="muted" onClick={() => setActiveTab("manage")}>
            Manage Candidate
          </Button>
        </div>
      }
    >
      {/* Job Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Front End Developer
      </h1>

      {/* Table Container */}
      <div className="w-full p-6 bg-neutral-10 overflow-hidden shadow-[0_4px_8px_0_rgba(0,0,0,0.1)] border border-neutral-40 rounded-lg">
        {/* <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-">
              <tr className="">
                <th className="text-left p-4 text-s-bold border-b border-neutral-30 bg-[rgba(252,252,252,1)]">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                      className="w-5 h-5 rounded cursor-pointer"
                    />
                    <span>NAMA LENGKAP</span>
                  </div>
                </th>
                <th className="text-left p-4 text-s-bold bg-neutral-20">
                  EMAIL ADDRESS
                </th>
                <th className="text-left p-4 text-s-bold bg-neutral-20">
                  PHONE NUMBERS
                </th>
                <th className="text-left p-4 text-s-bold bg-neutral-20">
                  DATE OF BIRTH
                </th>
                <th className="text-left p-4 text-s-bold bg-neutral-20">
                  DOMICILE
                </th>
                <th className="text-left p-4 text-s-bold bg-neutral-20">
                  GENDER
                </th>
                <th className="text-left p-4 text-s-bold bg-neutral-20">
                  LINK LINKEDIN
                </th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate, index) => (
                <tr key={candidate.id}>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={candidate.selected}
                        onChange={() => handleSelectCandidate(candidate.id)}
                        className="w-5 h-5 rounded cursor-pointer"
                      />
                      <span className="text-m-regular text-neutral-90">
                        {candidate.name}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-m-regular text-neutral-90">
                    {candidate.email}
                  </td>
                  <td className="p-4 text-m-regular text-neutral-90">
                    {candidate.phone}
                  </td>
                  <td className="p-4 text-m-regular text-neutral-90">
                    {candidate.dob}
                  </td>
                  <td className="p-4 text-m-regular text-neutral-90">
                    {candidate.domicile}
                  </td>
                  <td className="p-4 text-m-regular text-neutral-90">
                    {candidate.gender}
                  </td>
                  <td className="p-4">
                    <a
                      href={candidate.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-600 hover:text-teal-700 hover:underline transition-colors"
                    >
                      {candidate.linkedin}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> */}
        <EmptyState
          img="/public/No candidates found State.png"
          headTitle="No candidates found"
          desc="Share your job vacancies so that more candidates will apply."
        />
      </div>

      {/* Selected Count */}
      {selectedCount > 0 && (
        <div className="mt-4 p-4 bg-teal-50 border border-teal-200 rounded-lg flex items-center justify-between">
          <span className="text-teal-900 font-medium">
            {selectedCount} candidate{selectedCount > 1 ? "s" : ""} selected
          </span>
          <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium">
            Process Selected
          </button>
        </div>
      )}
    </AdminLayout>
  );
};

export default ManageJobPage;
