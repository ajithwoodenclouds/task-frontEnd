import React, { useState } from 'react';
import { FaSignOutAlt } from 'react-icons/fa'; 
import { useAppDispatch } from '../store/store';
import { logout } from '../features/auth/authSlice';
import useAuth from '../hooks/useAuth';
import { User } from '../types/types';

interface SidebarProps {
    onSelect: (item: User) => void;
  }

  const Sidebar: React.FC<SidebarProps> = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const {data } = useAuth()

  // Toggle sidebar open/close
  const toggleSidebar = () => setIsOpen(!isOpen);

   const dispatch = useAppDispatch();
        const handleLogout =()=>{
          dispatch(logout())
          localStorage.removeItem("token")
        }

  return (
    <>
      {/* Background overlay when sidebar is open (only on mobile) */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50  transition-opacity duration-300 ${isOpen ? 'block' : 'hidden'} sm:hidden`}
        onClick={toggleSidebar}
      ></div>

      {/* Sidebar */}
      <div
        className={`realtive top-0 left-0 w-64 bg-gray-800 text-white z-50 h-screen transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:translate-x-0 sm:block`}
      >
        <div className="flex justify-end items-center p-4">
         
          <button onClick={toggleSidebar} className="text-white sm:hidden">
            <span>&#x2715;</span>
          </button>
        </div>

        <div className="px-4">
        <h2 className="text-lg my-[20px] font-bold">Front-End Task</h2>
          <h3 className="text-lg ">Users List</h3>
          
          <ul className="mt-2 flex flex-col gap-2">

            {
                data?.length !==0 ?
            data?.map((item) => (
                <li
                onClick={() => onSelect(item)}
                key={item._id}
                className="py-2 px-4 bg-transparent border border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition-all duration-200 cursor-pointer"
                >
                {item.name}
                </li>
            )):<li className='py-2 px-4 bg-transparent border border-yellow-500 text-yellow-500 rounded-md hover:bg-yellow-500 hover:text-white transition-all duration-200 cursor-pointer'>
                 User Not Found
            </li>}
            </ul>

        </div>
        <div onClick={handleLogout} className="absolute bottom-0 w-full p-4 bg-red-600 text-white flex items-center justify-center hover:bg-red-700 cursor-pointer">
          <FaSignOutAlt className="mr-2" /> {/* Sign-Out Icon */}
          <span>Logout</span>
        </div>
      </div>

    

      {/* Button to open/close sidebar (visible only for small screens) */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 p-2 bg-blue-500 text-white rounded-md z-50 sm:hidden"
      >
        &#9776;
      </button>
    </>
  );
};

export default Sidebar;
