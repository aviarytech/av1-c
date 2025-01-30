import React from 'react';

interface CreatorIndicatorProps {
  userId: string;
  currentUserId: string;
}

export const CreatorIndicator: React.FC<CreatorIndicatorProps> = ({ userId, currentUserId }) => {
  const isOwner = userId === currentUserId;
  return (
    <span className={`text-xs px-2 py-1 rounded-full ${
      isOwner ? 'bg-blue-500/20 text-blue-300' : 'bg-gray-500/20 text-gray-400'
    }`}>
      {isOwner ? 'Mine' : 'Shared'}
    </span>
  );
}; 