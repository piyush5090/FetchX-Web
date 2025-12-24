import React from 'react';
import { useSelector } from 'react-redux';
import { LuLoader } from 'react-icons/lu';

const ProviderStats = () => {
  const { providerCounts, countsStatus } = useSelector((state) => state.media);

  const formatNumber = (num) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num;
  };

  if (countsStatus === 'loading') {
    return <LuLoader className="animate-spin text-slate-400" size={20} />;
  }

  if (!providerCounts) {
    return null;
  }
  
  // Define the desired order and brand colors
  const providers = [
    { key: 'pexels', name: 'Pexels', color: 'text-blue-500' },
    { key: 'unsplash', name: 'Unsplash', color: 'text-purple-500' },
    { key: 'pixabay', name: 'Pixabay', color: 'text-teal-500' }
  ];

  return (
    <div className="flex items-center gap-4 text-xs font-bold">
      {providers.map(p => {
        const count = providerCounts[p.key]?.available || 0;
        if (count === 0) return null;
        
        return (
          <div key={p.key} className="flex items-center gap-2">
            <span className={`capitalize ${p.color}`}>{p.name}</span>
            <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-md text-slate-600 dark:text-slate-300">
              {formatNumber(count)}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default ProviderStats;
