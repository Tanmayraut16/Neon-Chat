import { useState } from 'react';
import { useChatStore } from "../store/useChatStore";
import { User, Calendar, Mail, MoreVertical, Bell, ShieldAlert, X } from 'lucide-react';
import toast from "react-hot-toast";

const UserInfo = ({ isVisible, onClose }) => {
  const { selectedUser } = useChatStore();
  const [showOptions, setShowOptions] = useState(false);
  
  if (!selectedUser || !isVisible) return null;
  
  const handleMuteUser = () => {
    toast.success(`${selectedUser.fullName} has been muted`);
    setShowOptions(false);
  };
  
  const handleBlockUser = () => {
    toast.success(`${selectedUser.fullName} has been blocked`);
    setShowOptions(false);
  };

  // Format join date
  const formatJoinDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };
  
  const joinDate = selectedUser.createdAt 
    ? formatJoinDate(selectedUser.createdAt) 
    : "January 1, 2023"; // Fallback date
  
  return (
    <div className="h-full border-l bg-base-100 p-4 flex flex-col w-full md:w-1/3 lg:w-1/4 absolute md:relative right-0 top-0 z-10 md:z-0">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Profile Info</h3>
        <div className="flex items-center">
          <div className="relative mr-2">
            <button 
              onClick={() => setShowOptions(!showOptions)}
              className="p-2 rounded-full hover:bg-base-200"
            >
              <MoreVertical size={20} />
            </button>
            
            {showOptions && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-base-100 ring-1 ring-opacity-5 z-10">
                <div className="py-1">
                  <button
                    onClick={handleMuteUser}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-base-200 flex items-center"
                  >
                    <Bell size={16} className="mr-2" />
                    Mute user
                  </button>
                  <button
                    onClick={handleBlockUser}
                    className="w-full text-left px-4 py-2 text-sm text-error hover:bg-base-200 flex items-center"
                  >
                    <ShieldAlert size={16} className="mr-2" />
                    Block user
                  </button>
                </div>
              </div>
            )}
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-base-200 md:hidden"
            aria-label="Close profile info"
          >
            <X size={20} />
          </button>
        </div>
      </div>
      
      <div className="flex flex-col items-center mb-6">
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center bg-base-200 mb-4">
          {selectedUser.profilePic ? (
            <img 
              src={selectedUser.profilePic} 
              alt={`${selectedUser.fullName}'s profile`} 
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <User size={30} className="text-base-content opacity-50" />
          )}
        </div>
        <h2 className="text-lg md:text-xl font-bold">{selectedUser.fullName || selectedUser.username || "User"}</h2>
        <p className="text-sm text-base-content opacity-70">
          {selectedUser.status || "Online"}
        </p>
      </div>
      
      <div className="flex-1 overflow-y-auto mb-4">
        <div className="flex flex-col p-3 rounded-lg mb-3 bg-base-200">
          <div className="flex items-center mb-2">
            <Mail size={16} className="mr-3" />
            <span className="font-semibold">Email</span>
          </div>
          <p className="pl-7 text-sm break-words">{selectedUser.email || "user@example.com"}</p>
        </div>
        
        <div className="flex flex-col p-3 rounded-lg mb-3 bg-base-200">
          <div className="flex items-center mb-2">
            <Calendar size={16} className="mr-3" />
            <span className="font-semibold">Joined</span>
          </div>
          <p className="pl-7 text-sm">{joinDate}</p>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;