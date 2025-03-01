import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send, Moon, Sun, Bell, Volume2, VolumeX, Globe, Lock, User, ChevronRight, Layout, MessageSquare } from "lucide-react";
import { useState } from "react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  {
    id: 2,
    content: "I'm doing great! Just working on some new features.",
    isSent: true,
  },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();
  const [fontSize, setFontSize] = useState("medium");
  const [messageSound, setMessageSound] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("english");
  const [activeTab, setActiveTab] = useState("appearance");
  
  // Preview theme state (separate from actual theme)
  const [previewTheme, setPreviewTheme] = useState(theme);
  
  // Handle theme change with preview
  const handleThemeChange = (newTheme) => {
    setPreviewTheme(newTheme);
    setTheme(newTheme);
  };

  const tabs = [
    { id: "appearance", label: "Appearance", icon: <Layout size={16} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={16} /> },
    { id: "privacy", label: "Privacy & Security", icon: <Lock size={16} /> },
    { id: "account", label: "Account", icon: <User size={16} /> },
  ];

  // Chat Preview Component
  const ChatPreview = ({ themeValue }) => (
    <div className="rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-lg" data-theme={themeValue}>
      <div className="p-4 bg-base-200">
        <div className="max-w-lg mx-auto">
          {/* Mock Chat UI */}
          <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">
            {/* Chat Header */}
            <div className="px-4 py-3 border-b border-base-300 bg-base-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
                  J
                </div>
                <div>
                  <h3 className="font-medium text-sm">John Doe</h3>
                  <p className="text-xs text-base-content/70">Online</p>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100">
              {PREVIEW_MESSAGES.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.isSent ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`
                      max-w-[80%] rounded-xl p-3 shadow-sm
                      ${
                        message.isSent
                          ? "bg-primary text-primary-content"
                          : "bg-base-200"
                      }
                    `}
                  >
                    <p className={`${fontSize === "small" ? "text-xs" : fontSize === "medium" ? "text-sm" : "text-base"}`}>
                      {message.content}
                    </p>
                    <p
                      className={`
                        text-[10px] mt-1.5
                        ${
                          message.isSent
                            ? "text-primary-content/70"
                            : "text-base-content/70"
                        }
                      `}
                    >
                      12:00 PM
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-base-300 bg-base-100">
              <div className="flex gap-2">
                <input
                  type="text"
                  className="input input-bordered flex-1 text-sm h-10"
                  placeholder="Type a message..."
                  value="This is a preview"
                  readOnly
                />
                <button className="btn btn-primary h-10 min-h-0">
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen container mx-auto px-4 pt-6 min-w-5xl pb-16">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="md:col-span-1">
          <div className="bg-base-200 rounded-lg p-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`
                  w-full flex items-center gap-2 p-3 text-sm font-medium rounded-md text-left
                  ${activeTab === tab.id ? "bg-primary text-primary-content" : "hover:bg-base-300"}
                  transition-colors mb-1
                `}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Main Content */}
        <div className="md:col-span-3 space-y-8">
          {activeTab === "appearance" && (
            <>
              {/* Theme Section with Integrated Preview */}
              <div className="space-y-4 bg-base-100 p-6 rounded-lg border border-base-300">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-semibold">Theme</h2>
                    <p className="text-sm text-base-content/70">
                      Choose a theme for your chat interface
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="btn btn-sm btn-circle btn-ghost">
                      <Sun size={16} />
                    </button>
                    <button className="btn btn-sm btn-circle btn-ghost">
                      <Moon size={16} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Theme Options */}
                  <div>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {THEMES.map((t) => (
                        <button
                          key={t}
                          className={`
                            group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors
                            ${previewTheme === t ? "bg-base-200 ring-2 ring-primary" : "hover:bg-base-200/50"}
                          `}
                          onClick={() => handleThemeChange(t)}
                          onMouseEnter={() => setPreviewTheme(t)}
                          onMouseLeave={() => setPreviewTheme(theme)}
                        >
                          <div
                            className="relative h-10 w-full rounded-md overflow-hidden"
                            data-theme={t}
                          >
                            <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                              <div className="rounded bg-primary"></div>
                              <div className="rounded bg-secondary"></div>
                              <div className="rounded bg-accent"></div>
                              <div className="rounded bg-neutral"></div>
                            </div>
                          </div>
                          <span className="text-xs font-medium truncate w-full text-center">
                            {t.charAt(0).toUpperCase() + t.slice(1)}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Live Chat Preview */}
                  <div>
                    <h3 className="text-sm font-medium mb-2">Live Preview</h3>
                    <ChatPreview themeValue={previewTheme} />
                  </div>
                </div>
              </div>

              {/* Font Size Section */}
              <div className="bg-base-100 p-6 rounded-lg border border-base-300">
                <h2 className="text-lg font-semibold mb-3">Font Size</h2>
                <p className="text-sm text-base-content/70 mb-4">
                  Adjust the size of text in the chat interface
                </p>

                <div className="flex gap-2">
                  {["small", "medium", "large"].map((size) => (
                    <button
                      key={size}
                      className={`
                        px-4 py-2 rounded-lg border 
                        ${fontSize === size ? "border-primary bg-primary/10" : "border-base-300"}
                      `}
                      onClick={() => setFontSize(size)}
                    >
                      <span 
                        className={`
                          font-medium
                          ${size === "small" ? "text-sm" : size === "medium" ? "text-base" : "text-lg"}
                        `}
                      >
                        {size.charAt(0).toUpperCase() + size.slice(1)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Layout Options */}
              <div className="bg-base-100 p-6 rounded-lg border border-base-300">
                <h2 className="text-lg font-semibold mb-3">Layout Options</h2>
                <div className="divide-y divide-base-300">
                  <div className="py-3 flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Compact Messages</h3>
                      <p className="text-sm text-base-content/70">Reduce spacing between messages</p>
                    </div>
                    <input type="checkbox" className="toggle toggle-primary" />
                  </div>
                  <div className="py-3 flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Show Timestamps</h3>
                      <p className="text-sm text-base-content/70">Display time for each message</p>
                    </div>
                    <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                  </div>
                  <div className="py-3 flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Show Read Receipts</h3>
                      <p className="text-sm text-base-content/70">Display when messages are read</p>
                    </div>
                    <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === "notifications" && (
            <div className="bg-base-100 p-6 rounded-lg border border-base-300 space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-3">Notification Settings</h2>
                <p className="text-sm text-base-content/70 mb-4">
                  Manage how and when you receive notifications
                </p>
              </div>

              <div className="divide-y divide-base-300">
                <div className="py-3 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Bell size={20} className="text-primary" />
                    <div>
                      <h3 className="font-medium">Push Notifications</h3>
                      <p className="text-sm text-base-content/70">Receive notifications when you're offline</p>
                    </div>
                  </div>
                  <input 
                    type="checkbox" 
                    className="toggle toggle-primary" 
                    checked={notifications} 
                    onChange={() => setNotifications(!notifications)} 
                  />
                </div>

                <div className="py-3 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <MessageSquare size={20} className="text-primary" />
                    <div>
                      <h3 className="font-medium">Message Preview</h3>
                      <p className="text-sm text-base-content/70">Show message content in notifications</p>
                    </div>
                  </div>
                  <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                </div>

                <div className="py-3 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    {messageSound ? <Volume2 size={20} className="text-primary" /> : <VolumeX size={20} className="text-primary" />}
                    <div>
                      <h3 className="font-medium">Message Sounds</h3>
                      <p className="text-sm text-base-content/70">Play sound when receiving messages</p>
                    </div>
                  </div>
                  <input 
                    type="checkbox" 
                    className="toggle toggle-primary" 
                    checked={messageSound} 
                    onChange={() => setMessageSound(!messageSound)} 
                  />
                </div>
              </div>

              <div className="pt-4">
                <h3 className="font-medium mb-3">Do Not Disturb Schedule</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-base-content/70 block mb-2">Start Time</label>
                    <select className="select select-bordered w-full">
                      <option>10:00 PM</option>
                      <option>11:00 PM</option>
                      <option>12:00 AM</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-base-content/70 block mb-2">End Time</label>
                    <select className="select select-bordered w-full">
                      <option>6:00 AM</option>
                      <option>7:00 AM</option>
                      <option>8:00 AM</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "privacy" && (
            <div className="bg-base-100 p-6 rounded-lg border border-base-300 space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-3">Privacy & Security</h2>
                <p className="text-sm text-base-content/70 mb-4">
                  Manage your privacy settings and account security
                </p>
              </div>

              <div className="divide-y divide-base-300">
                <div className="py-3 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Two-Factor Authentication</h3>
                    <p className="text-sm text-base-content/70">Add an extra layer of security</p>
                  </div>
                  <button className="btn btn-sm btn-outline">Enable</button>
                </div>

                <div className="py-3 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Read Receipts</h3>
                    <p className="text-sm text-base-content/70">Let others know when you've read their messages</p>
                  </div>
                  <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                </div>

                <div className="py-3 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Last Seen Status</h3>
                    <p className="text-sm text-base-content/70">Show when you were last active</p>
                  </div>
                  <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                </div>

                <div className="py-3 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Blocked Users</h3>
                    <p className="text-sm text-base-content/70">Manage your blocked contacts</p>
                  </div>
                  <button className="btn btn-sm btn-ghost">
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <h3 className="font-medium mb-3">Data & Storage</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 bg-base-200 rounded-lg">
                    <span className="font-medium">Message History</span>
                    <select className="select select-sm select-bordered">
                      <option>Forever</option>
                      <option>1 Year</option>
                      <option>6 Months</option>
                    </select>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-base-200 rounded-lg">
                    <span className="font-medium">Auto-Download Media</span>
                    <select className="select select-sm select-bordered">
                      <option>Wi-Fi only</option>
                      <option>Always</option>
                      <option>Never</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "account" && (
            <div className="bg-base-100 p-6 rounded-lg border border-base-300 space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-3">Account Settings</h2>
                <p className="text-sm text-base-content/70 mb-4">
                  Manage your account details and preferences
                </p>
              </div>

              <div className="flex items-center gap-4 p-4 bg-base-200 rounded-lg">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-content text-xl font-bold">
                  JD
                </div>
                <div>
                  <h3 className="font-medium">John Doe</h3>
                  <p className="text-sm text-base-content/70">john.doe@example.com</p>
                </div>
                <button className="btn btn-sm btn-ghost ml-auto">Edit Profile</button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-3">Language</h3>
                  <div className="flex items-center gap-2">
                    <Globe size={18} />
                    <select 
                      className="select select-bordered flex-1"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                    >
                      <option value="english">English</option>
                      <option value="spanish">Spanish</option>
                      <option value="french">French</option>
                      <option value="german">German</option>
                      <option value="japanese">Japanese</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Email Notifications</h3>
                  <div className="divide-y divide-base-300 border border-base-300 rounded-lg overflow-hidden">
                    <div className="py-3 px-4 flex justify-between items-center">
                      <span>Product Updates</span>
                      <input type="checkbox" className="toggle toggle-sm toggle-primary" defaultChecked />
                    </div>
                    <div className="py-3 px-4 flex justify-between items-center">
                      <span>Security Alerts</span>
                      <input type="checkbox" className="toggle toggle-sm toggle-primary" defaultChecked />
                    </div>
                    <div className="py-3 px-4 flex justify-between items-center">
                      <span>Marketing Emails</span>
                      <input type="checkbox" className="toggle toggle-sm toggle-primary" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-col gap-2">
                <button className="btn btn-outline w-full justify-start">
                  Change Password
                </button>
                <button className="btn btn-outline btn-error w-full justify-start">
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;