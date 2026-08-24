'use client';
import { useState } from 'react';
import { destinations } from '@/data/destinations';
import DestinationCard from '@/components/DestinationCard';

const REGIONS = ['All', 'Rajasthan', 'North India', 'Punjab', 'Madhya Pradesh', 'Maharashtra'];

export default function DestinationsList() {
  const [region, setRegion] = useState('All');
  const filtered = region === 'All' ? destinations : destinations.filter((d) => d.region === region);

  const activePill = 'font-sans text-xs tracking-wider px-4 py-2 border transition-all duration-200 bg-[#2C1810] text-[#FAF6EC] border-[#2C1810]';
  const inactivePill = 'font-sans text-xs tracking-wider px-4 py-2 border transition-all duration-200 border-[#E8D5B0] text-[#2C1810]/60 hover:border-[#2C1810]/40';

  return (
    <section className="section-padding" style={{ backgroundColor: '#FEFCF7' }}>
      <div className="container-luxury">
        <div className="flex flex-wrap gap-2 mb-12">
          {REGIONS.map((r) => (
            <button key={r} onClick={() => setRegion(r)} className={region === r ? activePill : inactivePill}>{r}</button>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map((dest) => (
            <DestinationCard key={dest.slug} destination={dest} />
          ))}
        </div>
      </div>
    </section>
  );
}
