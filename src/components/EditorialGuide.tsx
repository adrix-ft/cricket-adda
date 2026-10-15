import React from 'react';
import { Scale, Zap, ShieldCheck, Flame, CheckCircle } from 'lucide-react';
import { SELLER_INFO } from '../data/bats';

export const EditorialGuide: React.FC = () => {
  return (
    <section className="bg-white border-t border-neutral-200 py-12 text-[#24201e]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black tracking-widest text-[#f15b28] uppercase">
            Master Craftsmanship Guide
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 uppercase tracking-tight">
            The Science Behind 7T7T Scooped Tennis Bats
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600">
            Why professional tournament hitters choose our handcrafted scooped bats over ordinary flat bats.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#fbfbfa] p-5 rounded-2xl border border-neutral-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#f15b28] flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-neutral-900">
              1. Aerodynamic Scooping
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Precision scooped channels remove dead weight from non-impact areas of the wood while maintaining colossal 48mm–50mm edges for extreme ball rebound.
            </p>
          </div>

          <div className="bg-[#fbfbfa] p-5 rounded-2xl border border-neutral-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-neutral-900">
              2. Carbon Fiber Mesh Face
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Featured on the <strong>7T7T Black Monster</strong>. Protects the striking face against heavy tennis ball compression, preventing splintering and surface cracks.
            </p>
          </div>

          <div className="bg-[#fbfbfa] p-5 rounded-2xl border border-neutral-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-neutral-900">
              3. Digital Scale Verification
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Every bat is weighed on shop digital scales. Choose your exact weight: from featherlight <strong>957g</strong> for box cricket to <strong>1065g</strong> heavy power hitter.
            </p>
          </div>

          <div className="bg-[#fbfbfa] p-5 rounded-2xl border border-neutral-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Flame className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-neutral-900">
              4. "One Side Hero" Asymmetry
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Our single-side scoop places extra wood mass where you connect on leg-side pulls and lofted shots, giving lightning hand speed with missile punch.
            </p>
          </div>
        </div>

        {/* Comparison Table: Finding Your Perfect 7T7T Bat */}
        <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200">
          <h3 className="text-base font-bold text-neutral-900 mb-4 text-center sm:text-left">
            Quick Comparison: Which 7T7T Bat Fits Your Playing Style?
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-neutral-300 text-neutral-500 font-bold uppercase text-[10px]">
                  <th className="py-2.5 px-3">Model</th>
                  <th className="py-2.5 px-3">Weight</th>
                  <th className="py-2.5 px-3">Scoop Profile</th>
                  <th className="py-2.5 px-3">Best Suited For</th>
                  <th className="py-2.5 px-3">Key Advantage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 text-neutral-800">
                <tr>
                  <td className="py-3 px-3 font-bold text-[#f15b28]">7T7T Gold Edition</td>
                  <td className="py-3 px-3 font-mono">1020g - 1050g</td>
                  <td className="py-3 px-3">Dual Aerodynamic Scoops</td>
                  <td className="py-3 px-3">Hard Tennis Tournament Matches</td>
                  <td className="py-3 px-3">Classic natural wood balance with high rebound</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-bold text-neutral-900">Black Monster</td>
                  <td className="py-3 px-3 font-mono">1040g - 1065g</td>
                  <td className="py-3 px-3">Power Channels + Carbon Face</td>
                  <td className="py-3 px-3">Heavy Hard Tennis Balls</td>
                  <td className="py-3 px-3">Carbon mesh prevents cracks; extreme 50mm edges</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-bold text-neutral-700">Grey Edition</td>
                  <td className="py-3 px-3 font-mono">950g - 980g (957g Scale)</td>
                  <td className="py-3 px-3">Multi-Vent Speed Scooping</td>
                  <td className="py-3 px-3">Box Cricket, Fast Pace Tennis</td>
                  <td className="py-3 px-3">Featherlight pickup for fastest hand reactions</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-bold text-amber-700">One Side Hero</td>
                  <td className="py-3 px-3 font-mono">1000g - 1040g</td>
                  <td className="py-3 px-3">Single-Side Asymmetric Scoop</td>
                  <td className="py-3 px-3">Power Hitting & Wrist Flick Shots</td>
                  <td className="py-3 px-3">Maximum wood retention behind sweet spot</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
