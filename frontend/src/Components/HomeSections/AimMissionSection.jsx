import { motion } from 'framer-motion';
import StatsSection from '../StatsSection';
import { aimAndMission } from '../../data/homepageContent';
import { reveal, stagger } from './motion';

const AimMissionSection = () => (
  <section className="relative bg-[radial-gradient(circle_at_top,#132039_0%,#081324_38%,#040811_100%)] py-16 md:py-22 px-4 sm:px-6 lg:px-8">
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="max-w-6xl mx-auto"
    >
      <motion.div variants={reveal} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <article className="glass-card soft-shadow rounded-3xl p-7 md:p-9">
          <p className="uppercase tracking-[0.25em] text-xs text-[#bfc8dc]">Who We Are</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-serif text-[#f7f3eb]">{aimAndMission.aimTitle}</h2>
          <p className="mt-5 text-[#d7dceb] leading-relaxed">{aimAndMission.aimText}</p>
        </article>

        <article className="glass-card soft-shadow rounded-3xl p-7 md:p-9">
          <p className="uppercase tracking-[0.25em] text-xs text-[#bfc8dc]">Our Promise</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-serif text-[#f7f3eb]">{aimAndMission.missionTitle}</h2>
          <ul className="mt-5 space-y-3 text-[#d7dceb]">
            {aimAndMission.missionPoints.map(point => (
              <li key={point} className="flex gap-3 leading-relaxed">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-[#b8d4ff]" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </article>
      </motion.div>

      <motion.div variants={reveal} className="mt-10 rounded-3xl overflow-hidden border border-white/10 bg-[#0a1425]">
        <StatsSection />
      </motion.div>
    </motion.div>
  </section>
);

export default AimMissionSection;
