import React from 'react';

export default function Logo({ collapsed }: { collapsed: boolean }) {
  return (
    <div className="flex h-16 items-center justify-center overflow-hidden text-lg font-bold whitespace-nowrap text-white transition-all">
      {collapsed ? 'NA' : 'Next Admin'}
    </div>
  );
}
