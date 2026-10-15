import React from 'react';
import { Scale, Zap, ShieldCheck, Flame } from 'lucide-react';

export const EditorialGuide: React.FC = () => {
  const specs = [
    {
      icon: <Zap className="w-4 h-4 text-[#f15b28]" />,
      title: 'Aero Scoops',
      desc: 'Removes dead weight from spine while keeping 48mm–50mm edges.',
    },
    {
      icon: <ShieldCheck className="w-4 h-4 text-emerald-500" />,
      title: 'Carbon Shield',
      desc: 'Mesh matrix face protects against heavy tennis ball cracks.',
    },
    {
      icon: <Scale className="w-4 h-4 text-amber-500" />,
      title: 'Scale Match',
      desc: 'Every bat is weighed on shop scales. Pick 957g to 1065g.',
    },
    {
      icon: <Flame className="w-4 h-4 text-rose-500" />,
      title: '1-Side Aero',
      desc: 'Asymmetric carve concentrates wood mass on leg-side hitting zone.',
    },
  ];

  return (
    <section className="bg-white border-t border-neutral-200/80 py-10 text-neutral-900">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Minimal Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-neutral-100 pb-4">
          <div>
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">
              Engineering
            </span>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
              Cricket Adda Bat Architecture
            </h2>
          </div>
          <span className="text-xs text-neutral-500 font-medium">
            Handcrafted in workshop for tournament tennis cricket
          </span>
        </div>

        {/* 4 Clean Minimalist Spec Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {specs.map((s, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/60 space-y-2 hover:border-neutral-300 transition-colors"
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
        <div className="rounded-2xl border border-neutral-200/80 overflow-hidden bg-white">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200/80 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                <th className="py-2.5 px-4">Model</th>
                <th className="py-2.5 px-4">Weight</th>
                <th className="py-2.5 px-4">Profile</th>
                <th className="py-2.5 px-4 hidden sm:table-cell">Best For</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-neutral-700">
              <tr>
                <td className="py-2.5 px-4 font-bold text-neutral-900">7T7T Gold Edition</td>
                <td className="py-2.5 px-4 font-mono text-neutral-500">1020g–1050g</td>
                <td className="py-2.5 px-4">Dual Scoop</td>
                <td className="py-2.5 px-4 hidden sm:table-cell text-neutral-500">Hard Tennis Tournaments</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-bold text-neutral-900">Black Monster</td>
                <td className="py-2.5 px-4 font-mono text-neutral-500">1040g–1065g</td>
                <td className="py-2.5 px-4">Carbon Face + Channel</td>
                <td className="py-2.5 px-4 hidden sm:table-cell text-neutral-500">Heavy Tennis Boundary Finishers</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-bold text-neutral-900">Grey Edition</td>
                <td className="py-2.5 px-4 font-mono text-neutral-500">950g–980g (957g)</td>
                <td className="py-2.5 px-4">Multi-Vent Speed</td>
                <td className="py-2.5 px-4 hidden sm:table-cell text-neutral-500">Box Cricket & Fast Reflex Cuts</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-bold text-neutral-900">One Side Hero</td>
                <td className="py-2.5 px-4 font-mono text-neutral-500">1000g–1040g</td>
                <td className="py-2.5 px-4">1-Side Asymmetric</td>
                <td className="py-2.5 px-4 hidden sm:table-cell text-neutral-500">Power Pulls & Wristy Flick Shots</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
