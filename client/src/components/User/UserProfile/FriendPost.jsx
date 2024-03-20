import React, { useState } from 'react';
import loveIcon from '../../../Icons/Notifications2.png';
import commentIcon from '../../../Icons/Comment.png';

function FriendPost({ post }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="relative aspect-[16/9] w-auto rounded-md md:aspect-auto md:h-400"
      style={{ position: 'relative', overflow: 'hidden' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={post.file}
        className="z-0 h-full w-full rounded-md object-cover"
        style={{ maxHeight: '250px' }}
        alt=""
      />
      {isHovered && (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
          <div className="flex items-center space-x-4">
            <img src={loveIcon} alt="Love Icon" className="w-6 h-6 cursor-pointer" />
            <img src={commentIcon} alt="Comment Icon" className="w-6 h-6 cursor-pointer" />
          </div>
        </div>
      )}
    </div>
  );
}

export default FriendPost;
