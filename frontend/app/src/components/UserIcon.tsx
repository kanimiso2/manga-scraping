"use client";
import { useState } from "react";
import SignOutButton from "./SignOutButton";

interface UserIconProps {
  image: string;
  onClick?: () => void;
}

const UserIcon: React.FC<UserIconProps> = ({ image, onClick }) => {
  const [showSignOut, setShowSignOut] = useState(false);

  const handleClick = () => {
    setShowSignOut(prev => !prev);
    if (onClick) onClick();
  };

  return (
    <div className="relative flex items-center gap-4">
      <img
        src={image}
        alt="User Icon"
        className="w-10 h-10 rounded-full border border-gray-300 object-cover cursor-pointer"
        onClick={handleClick}
      />
      {showSignOut && (
        <div className="absolute right-0 top-full mt-2 flex flex-col items-center">
          <SignOutButton />
        </div>
      )}
    </div>
  );
};

export default UserIcon;
