import { motion } from 'framer-motion';
import { trustSnapshot } from '../../data/homepageContent';
import { reveal, stagger } from './motion';

const TransparencySection = () => (
  <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-[linear-gradient(180deg,#050a15_0%,#061024_100%)]">
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="max-w-6xl mx-auto"
    >
      <motion.div variants={reveal} className="mb-10 text-center">
        <p className="uppercase tracking-[0.24em] text-xs text-[#aab6ce]">Governance</p>
        <h2 className="font-serif text-3xl md:text-5xl text-[#f5f1e8] mt-3">{trustSnapshot.title}</h2>
        <p className="max-w-3xl mx-auto mt-4 text-[#d1d9eb] leading-relaxed">{trustSnapshot.description}</p>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <motion.article variants={reveal} className="glass-card rounded-3xl p-7 md:p-9 soft-shadow">
          <h3 className="font-serif text-3xl text-[#f4f0e7]">Key Compliance IDs</h3>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {trustSnapshot.compliance.map(item => (
              <div
                key={item.label}
                className="rounded-xl border border-white/15 bg-white/[0.06] p-3"
              >
                <p className="text-xs uppercase tracking-[0.12em] text-[#aeb8d1]">{item.label}</p>
                <p className="text-sm mt-1 text-[#edf1fa] break-all">{item.value}</p>
              </div>
            ))}
          </div>
        </motion.article>

        <motion.article variants={reveal} className="glass-card rounded-3xl p-7 md:p-9 soft-shadow">
          <h3 className="font-serif text-3xl text-[#f4f0e7]">Audited Financial Snapshot</h3>
          <div className="mt-6 space-y-3">
            {trustSnapshot.audits.map(row => (
              <div
                key={row.year}
                className="rounded-xl border border-white/15 bg-white/[0.05] p-4 flex items-center justify-between gap-4"
              >
                <div>
                  <p className="text-[#edf1fa] font-medium">{row.year}</p>
                  <p className="text-xs uppercase tracking-[0.12em] text-[#9eabc7]">{row.status}</p>
                </div>
                <p className="text-[#dce7ff] font-semibold">{row.amount}</p>
              </div>
            ))}
          </div>
        </motion.article>
      </div>
    </motion.div>
  </section>
);

export default TransparencySection;
