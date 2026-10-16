import React from 'react';
import { Scale, Zap, ShieldCheck, Flame, Compass } from 'lucide-react';

export const EditorialGuide: React.FC = () => {
  const specs = [
    {
      icon: <Zap className="w-4 h-4 text-[#f15b28]" strokeWidth={1.75} />,
      title: 'Aerodynamic Airflow Scoops',
      desc: 'Removes dead spine weight while keeping full 48mm–50mm tournament edges.',
    },
    {
      icon: <ShieldCheck className="w-4 h-4 text-emerald-600" strokeWidth={1.75} />,
      title: 'Carbon Matrix Face Shield',
      desc: 'Protective face composite safeguards blade against heavy tournament tennis balls.',
    },
    {
      icon: <Scale className="w-4 h-4 text-amber-500" strokeWidth={1.75} />,
      title: 'Precision Scale Calibration',
      desc: 'Every piece is individually weighed on digital scales. Pick from 957g to 1065g.',
    },
    {
      icon: <Flame className="w-4 h-4 text-rose-500" strokeWidth={1.75} />,
      title: 'Asymmetric 1-Side Power Scoop',
      desc: 'Engineered mass concentration towards the leg-side hitting zone for maximum boundary leverage.',
    },
  ];

  return (
    <section className="bg-white border-t border-neutral-200/80 py-10 text-neutral-900">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Minimal Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-neutral-100 pb-4">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
              <Compass className="w-3.5 h-3.5 text-neutral-400" strokeWidth={1.75} />
              <span>Workshop Engineering</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-black uppercase tracking-tight font-display mt-0.5">
              Cricket Adda Bat Architecture
            </h2>
          </div>
          <span className="text-xs text-neutral-500 font-medium">
            Handcrafted in workshop for tournament tennis cricket
          </span>
        </div>

        {/* 4 Clean Minimalist Spec Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {specs.map((s, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/70 space-y-2 hover:border-neutral-300 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-white border border-neutral-200 flex items-center justify-center shadow-xs">
                {s.icon}
              </div>
              <h3 className="text-xs font-bold text-neutral-900">{s.title}</h3>
              <p className="text-[11px] text-neutral-500 leading-snug">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Minimal Comparison Table */}
        <div className="rounded-2xl border border-neutral-200/80 overflow-hidden bg-white shadow-xs">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200/80 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                <th className="py-3 px-4">Model Profile</th>
                <th className="py-3 px-4">Calibrated Weight</th>
                <th className="py-3 px-4">Scoop Architecture</th>
                <th className="py-3 px-4 hidden sm:table-cell">Optimal Play Style</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-neutral-700">
              <tr className="hover:bg-neutral-50/50 transition-colors">
                <td className="py-3 px-4 font-bold text-neutral-900">7T7T Gold Edition</td>
                <td className="py-3 px-4 font-mono text-neutral-600 font-semibold">1020g – 1050g</td>
                <td className="py-3 px-4">Dual Aerodynamic Airflow</td>
                <td className="py-3 px-4 hidden sm:table-cell text-neutral-500 font-medium">Hard Tennis Tournaments & Fast Bat Flow</td>
              </tr>
              <tr className="hover:bg-neutral-50/50 transition-colors">
                <td className="py-3 px-4 font-bold text-neutral-900">Black Monster</td>
                <td className="py-3 px-4 font-mono text-neutral-600 font-semibold">1040g – 1065g</td>
                <td className="py-3 px-4">Carbon Face + Power Channel</td>
                <td className="py-3 px-4 hidden sm:table-cell text-neutral-500 font-medium">Heavy Tennis Power Hitting ("LAGA TOH SIX")</td>
              </tr>
              <tr className="hover:bg-neutral-50/50 transition-colors">
                <td className="py-3 px-4 font-bold text-neutral-900">Grey Edition</td>
                <td className="py-3 px-4 font-mono text-neutral-600 font-semibold">950g – 980g (957g Verified)</td>
                <td className="py-3 px-4">Featherweight Multi-Vent</td>
                <td className="py-3 px-4 hidden sm:table-cell text-neutral-500 font-medium">Box Cricket, Fast Reflex Cuts & Upper Cuts</td>
              </tr>
              <tr className="hover:bg-neutral-50/50 transition-colors">
                <td className="py-3 px-4 font-bold text-neutral-900">One Side Hero</td>
                <td className="py-3 px-4 font-mono text-neutral-600 font-semibold">1000g – 1040g</td>
                <td className="py-3 px-4">Asymmetric 1-Side Scoop</td>
                <td className="py-3 px-4 hidden sm:table-cell text-neutral-500 font-medium">Power Pulls, Leg-Side Flicks & Helicopter Drives</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
