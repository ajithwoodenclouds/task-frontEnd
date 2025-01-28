import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { User } from "../types/types";

export default function Home() {
  const [selectedItem, setSelectedItem] = useState<User | null>(null);

  return (
    <div className="flex  gap-6 w-full h-full">
      {/* Slider Section */}
      <div className=" sm:w-fit w-[50px] rounded-lg ">
        <Sidebar onSelect={(item: User) => setSelectedItem(item)} />
      </div>

      {/* Content Section */}
      <div className="h-[200px] my-auto w-max mx-auto bg-white p-6 shadow-lg rounded-2xl">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-600 mb-4">
          Selected User
        </h1>
        <ul className="space-y-3">
          <li className="flex items-center space-x-3">
            <span className="font-medium text-gray-600">Name:</span>
            <span className="text-gray-800">{selectedItem?.name || "N/A"}</span>
          </li>
          <li className="flex items-center space-x-3">
            <span className="font-medium text-gray-600">Email:</span>
            <span className="text-gray-800">{selectedItem?.email || "N/A"}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
