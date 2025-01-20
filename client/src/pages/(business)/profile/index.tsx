import { selectAuth } from "@/store/auth";
import { User2Icon } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import EditProfileDialog from "./components/EditProfileDialog";

const ProfileEditPage = () => {
  const { user } = useSelector(selectAuth) as {
    user: { name: string; username: string; avatar?: string };
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className=" flex flex-col justify-center items-center gap-6 p-5 border rounded text-center text-gray-500 w-96 h-96 bg-white shadow-lg">
        {user?.avatar ? (
          <img
            src={user?.avatar}
            alt="avatar"
            className="w-32 h-32 rounded-full mx-auto"
          />
        ) : (
          <User2Icon className="w-32 h-32 rounded-full mx-auto border-e-emerald-950" />
        )}

        {user?.name || user?.username ? (
          <div className="text-sm mt-5">
            <h2 className="font-medium text-xl leading-none text-gray-900 hover:text-indigo-600 transition duration-500 ease-in-out">
              {user.name} {user.username}
            </h2>
          </div>
        ) : (
          <p>User info not available</p>
        )}

        <EditProfileDialog user={user} />
        <div className="flex mt-4 justify-center"></div>
      </div>
    </div>
  );
};

export default ProfileEditPage;
