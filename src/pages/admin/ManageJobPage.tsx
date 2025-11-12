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
          <button
            onClick={() => setActiveTab("list")}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === "list"
                ? "bg-white border-2 border-gray-300 text-gray-900"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Job list
          </button>
          <ChevronRightIcon className="w-5 h-5 text-gray-400" />
          <button
            onClick={() => setActiveTab("manage")}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === "manage"
                ? "bg-white border-2 border-gray-300 text-gray-900"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Manage Candidate
          </button>
        </div>
      }
    >
      {/* Job Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Front End Developer
      </h1>

      {/* Table Container */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left p-4 font-semibold text-gray-700 text-sm">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                      className="w-5 h-5 rounded border-2 border-teal-500 text-teal-600 focus:ring-2 focus:ring-teal-500 cursor-pointer"
                    />
                    <span>NAMA LENGKAP</span>
                  </div>
                </th>
                <th className="text-left p-4 font-semibold text-gray-700 text-sm">
                  EMAIL ADDRESS
                </th>
                <th className="text-left p-4 font-semibold text-gray-700 text-sm">
                  PHONE NUMBERS
                </th>
                <th className="text-left p-4 font-semibold text-gray-700 text-sm">
                  DATE OF BIRTH
                </th>
                <th className="text-left p-4 font-semibold text-gray-700 text-sm">
                  DOMICILE
                </th>
                <th className="text-left p-4 font-semibold text-gray-700 text-sm">
                  GENDER
                </th>
                <th className="text-left p-4 font-semibold text-gray-700 text-sm">
                  LINK LINKEDIN
                </th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate, index) => (
                <tr
                  key={candidate.id}
                  className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    candidate.selected ? "bg-teal-50" : ""
                  }`}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={candidate.selected}
                        onChange={() => handleSelectCandidate(candidate.id)}
                        className="w-5 h-5 rounded border-2 border-teal-500 text-teal-600 focus:ring-2 focus:ring-teal-500 cursor-pointer"
                      />
                      <span className="text-gray-900 font-medium">
                        {candidate.name}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">{candidate.email}</td>
                  <td className="p-4 text-gray-600">{candidate.phone}</td>
                  <td className="p-4 text-gray-600">{candidate.dob}</td>
                  <td className="p-4 text-gray-600">{candidate.domicile}</td>
                  <td className="p-4 text-gray-600">{candidate.gender}</td>
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
        </div>
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
