import React from 'react'

const LoadingInfoCard = () => {
  return (
    <div className="community-container relative w-full md:w-[350px] max-w-md h-fit bg-card border border-graydark rounded-lg shadow">
      <div className="community-header p-5">
        <div className="loading-image rounded-t-lg w-full h-52 bg-gray-700 animate-pulse"></div>
        <div className="community-info mt-3 space-y-3">
          <div className="w-24 h-7 bg-gray-700 rounded animate-pulse"></div>
          <div className="w-full h-4 bg-gray-700 rounded animate-pulse"></div>
          <div className="w-16 h-4 bg-gray-700 rounded animate-pulse"></div>
          <div className="w-24 h-3 bg-gray-700 rounded animate-pulse"></div>
        </div>
        <div className="community-creator flex items-center space-x-2 mt-5">
          <div className="w-8 h-8 bg-gray-700 rounded-full animate-pulse"></div>
          <div className="w-24 h-4 bg-gray-700 rounded animate-pulse"></div>
        </div>
      </div>
      <div className="community-actions p-5 -mt-5 flex justify-between">
        <div className="subscribe-leave-toggle"></div>
        <div className="create-post-button"></div>
      </div>
    </div>
  );
}

export default LoadingInfoCard;
