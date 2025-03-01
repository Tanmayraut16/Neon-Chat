import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef, useState } from "react";
import { Menu } from "lucide-react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../utils/formatTime";
import UserInfo from "./UserInfo";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    listenToMessages,
    notListenFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
  const [showUserInfo, setShowUserInfo] = useState(false);

  useEffect(() => {
    getMessages(selectedUser._id);
    listenToMessages();
    return () => notListenFromMessages();
  }, [selectedUser._id, getMessages, listenToMessages, notListenFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Close profile panel when screen is resized to mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && showUserInfo) {
        setShowUserInfo(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [showUserInfo]);

  const toggleUserInfo = () => {
    setShowUserInfo(!showUserInfo);
  };

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <div className="flex items-center bg-base-100 p-3 border-b">
          <ChatHeader />
          <button 
            onClick={toggleUserInfo}
            className="p-2 ml-auto rounded-full hover:bg-base-200"
            aria-label="Toggle user info"
          >
            <Menu size={20} />
          </button>
        </div>
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex relative flex-1 h-full overflow-hidden">
      <div className={`flex flex-col overflow-auto w-full transition-all duration-300 ${showUserInfo ? 'md:w-2/3 lg:w-3/4' : 'w-full'}`}>
        <div className="flex items-center bg-base-100 p-3 border-b">
          <ChatHeader />
          <button 
            onClick={toggleUserInfo}
            className="p-2 ml-auto rounded-full hover:bg-base-200"
            aria-label="Toggle user info"
          >
            <Menu size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 md:p-4 space-y-3 md:space-y-4">
          {messages.map((message, index) => (
            <div
              key={message._id}
              className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
              ref={index === messages.length - 1 ? messageEndRef : null}
            >
              <div className="chat-image avatar">
                <div className="size-8 md:size-10 rounded-full border">
                  <img
                    src={
                      message.senderId === authUser._id
                        ? authUser.profilePic || "/avatar.png"
                        : selectedUser.profilePic || "/avatar.png"
                    }
                    alt="profile pic"
                  />
                </div>
              </div>
              <div className="chat-header mb-1">
                <time className="text-xs opacity-50 ml-1">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>
              <div className="chat-bubble flex flex-col max-w-xs sm:max-w-md">
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="w-full max-w-[150px] sm:max-w-[200px] rounded-md mb-2"
                  />
                )}
                {message.text && <p className="break-words">{message.text}</p>}
              </div>
            </div>
          ))}
        </div>

        <MessageInput />
      </div>
      
      <UserInfo 
        isVisible={showUserInfo} 
        onClose={() => setShowUserInfo(false)} 
      />
    </div>
  );
};
export default ChatContainer;