import { motion } from 'framer-motion';
import { trustHighlights } from '../../data/homepageContent';
import { reveal, stagger } from './motion';

const TrustHighlightsSection = () => (
  <section className="relative z-10 -mt-20 px-4 sm:px-6 lg:px-8 pb-6">
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      {trustHighlights.map(item => {
        const Icon = item.icon;

        return (
          <motion.article key={item.title} variants={reveal} className="glass-card soft-shadow rounded-2xl p-6">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-[#f6f3eb] border border-white/20 mb-4">
              <Icon size={20} />
            </div>
            <h3 className="font-serif text-xl text-[#f4f1e8]">{item.title}</h3>
            <p className="text-sm text-[#d8dded] mt-2 leading-relaxed">{item.text}</p>
          </motion.article>
        );
      })}
    </motion.div>
  </section>
);

export default TrustHighlightsSection;
