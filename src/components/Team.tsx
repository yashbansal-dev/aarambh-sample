import React from 'react';
import { TeamMember, mockTeam } from '../data/mockData';
import { ContourBackground } from './ContourBackground';

export const Team: React.FC = () => {
  const chiefPatron = mockTeam.find((m) => m.category === 'CHIEF PATRON');
  const patrons = mockTeam.filter((m) => m.category === 'PATRONS');
  const coPatrons = mockTeam.filter((m) => m.category === 'CO-PATRONS');

  const TeamCard = ({ member, tagColor }: { member: TeamMember; tagColor: string }) => (
    <div className="bg-white border-3 border-black shadow-[4px_4px_0px_#000000] hover:shadow-[8px_8px_0px_#000000] hover:-translate-x-1 hover:-translate-y-1 transition-all w-full max-w-[280px] mx-auto flex flex-col overflow-hidden">
      {/* Picture area */}
      <div className="aspect-square border-b-3 border-black bg-gray-100 overflow-hidden relative group">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300 group-hover:scale-105"
        />
      </div>

      {/* Info area */}
      <div className="text-center font-sans">
        <div className="p-3 bg-white border-b-2 border-black">
          <h4 className="font-extrabold text-sm text-black truncate uppercase tracking-tight">
            {member.name}
          </h4>
        </div>
        
        {/* Role tag bar */}
        <div
          className={`py-1.5 font-bold text-xs uppercase tracking-widest border-t-0 ${
            tagColor === '#FF9A00' ? 'text-black' : 'text-white'
          }`}
          style={{ backgroundColor: tagColor }}
        >
          {member.role}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-1 p-6 md:p-12 relative overflow-hidden bg-[#F5F1E5] font-sans border-b-4 border-black min-h-screen">
      <ContourBackground />

      <div className="max-w-4xl mx-auto relative z-10 space-y-12 pb-12">
        {/* CHIEF PATRON SECTION */}
        {chiefPatron && (
          <div className="space-y-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bebas tracking-widest text-black">
              CHIEF PATRON
            </h2>
            <div className="h-0.5 bg-black/20 w-32 mx-auto" />
            
            <div className="flex justify-center">
              <TeamCard member={chiefPatron} tagColor="#FF188C" />
            </div>
          </div>
        )}

        {/* PATRONS SECTION */}
        <div className="space-y-6 text-center pt-6">
          <h2 className="text-4xl md:text-5xl font-bebas tracking-widest text-black">
            PATRONS
          </h2>
          <div className="h-0.5 bg-black/20 w-32 mx-auto" />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {patrons.map((patron) => (
              <TeamCard key={patron.id} member={patron} tagColor="#0D21DD" />
            ))}
          </div>
        </div>

        {/* CO-PATRONS SECTION */}
        <div className="space-y-6 text-center pt-6">
          <h2 className="text-4xl md:text-5xl font-bebas tracking-widest text-black">
            CO-PATRONS
          </h2>
          <div className="h-0.5 bg-black/20 w-32 mx-auto" />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {coPatrons.map((copatron) => (
              <TeamCard key={copatron.id} member={copatron} tagColor="#FF9A00" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
