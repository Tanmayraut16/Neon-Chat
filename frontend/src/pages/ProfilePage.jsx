import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, X } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [showAvatarMenu, setShowAvatarMenu] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  // Function to convert an image path to base64
  const convertImageToBase64 = (imagePath) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous"; // This might be needed for some servers
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL("image/jpeg");
        resolve(dataURL);
      };
      img.onerror = (error) => reject(error);
      img.src = imagePath;
    });
  };

  const handleAvatarSelect = async (avatarPath) => {
    try {
      // Converting the avatar image to base64 before sending to server
      const base64Image = await convertImageToBase64(avatarPath);
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
      setShowAvatarMenu(false);
    } catch (error) {
      console.error("Error converting avatar to base64:", error);
    }
  };

  const avatarOptions = [
    '/avatar.png',
    '/avatar1.jpg',
    '/avatar2.jpg',
    '/avatar3.jpg',
    '/avatar4.jpg'
  ];

  // Function to handle avatar selection menu
  const handleAvatarMenu = () => {
    setShowAvatarMenu(!showAvatarMenu);
  };

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          {/* avatar upload section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser?.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 cursor-pointer"
                onClick={handleAvatarMenu}
              />
              {/* Camera icon to toggle avatar menu */}
              <button
                onClick={handleAvatarMenu}
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
                disabled={isUpdatingProfile}
              >
                <Camera className="w-5 h-5 text-base-200" />
              </button>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile ? "Uploading..." : "Click on the photo to change your avatar"}
            </p>
            
            {/* Avatar selection popup menu */}
            {showAvatarMenu && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-base-100 rounded-xl p-6 max-w-md w-full">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Choose Avatar</h3>
                    <button 
                      onClick={() => setShowAvatarMenu(false)}
                      className="p-1 rounded-full hover:bg-base-300"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {avatarOptions.map((avatar, index) => (
                      <button
                        key={index}
                        onClick={() => handleAvatarSelect(avatar)}
                        className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-base-200"
                        disabled={isUpdatingProfile}
                      >
                        <img 
                          src={avatar} 
                          alt={`Avatar option ${index}`} 
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <span className="text-xs">
                          {avatar === '/avatar.png' ? 'Default' : `Avatar ${index}`}
                        </span>
                      </button>
                    ))}
                  </div>
                  
                  <div className="border-t border-base-300 pt-4">
                    <label className="w-full flex items-center justify-center gap-2 py-2 bg-base-300 rounded-lg cursor-pointer hover:bg-opacity-80">
                      <Camera className="w-5 h-5" />
                      <span>Upload from device</span>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={isUpdatingProfile}
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.fullName}</p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.email}</p>
            </div>
          </div>

          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authUser?.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;