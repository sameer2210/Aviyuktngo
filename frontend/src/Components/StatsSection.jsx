import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FiAward, FiBriefcase, FiStar, FiUsers } from 'react-icons/fi';
import { statsHighlights } from '../data/homepageContent';

const iconMap = {
  users: FiUsers,
  award: FiAward,
  briefcase: FiBriefcase,
  star: FiStar,
};

const parseMetric = value => {
  const match = value.match(/^(\D*)([\d,]+(?:\.\d+)?)(.*)$/);
  if (!match) {
    return { animatable: false, display: value };
  }

  const [, prefix, numberString, suffix] = match;
  const numeric = Number(numberString.replace(/,/g, ''));
  if (Number.isNaN(numeric)) {
    return { animatable: false, display: value };
  }

  const decimals = numberString.includes('.') ? numberString.split('.')[1].length : 0;
  return {
    animatable: true,
    prefix,
    suffix,
    value: numeric,
    decimals,
    display: value,
  };
};

const formatValue = (value, decimals) => {
  if (decimals > 0) {
    return value.toFixed(decimals);
  }
  return value.toLocaleString();
};

const StatsCard = ({ item, index, reduceMotion }) => {
  const Icon = iconMap[item.icon] || FiStar;
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: true, amount: 0.3 });
  const parsed = useMemo(() => parseMetric(item.value), [item.value]);
  const [animatedValue, setAnimatedValue] = useState(parsed.animatable ? 0 : item.value);

  useEffect(() => {
    if (!inView || !parsed.animatable || reduceMotion) {
      return;
    }

    let frameId;
    const duration = 1400;
    let startTime = null;

    const animate = timestamp => {
      if (!startTime) {
        startTime = timestamp;
      }
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = parsed.value * easeOut;

      setAnimatedValue(currentValue);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [inView, parsed, reduceMotion]);

  const displayValue = parsed.animatable
    ? `${parsed.prefix}${formatValue(animatedValue, parsed.decimals)}${parsed.suffix}`
    : item.value;

  return (
    <motion.article
      ref={cardRef}
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group rounded-3xl border border-[#335288]/10 bg-white px-6 py-7 text-center shadow-lg shadow-[#335288]/5"
    >
      <div className="mx-auto mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#335288]/15 text-[#335288]">
        <Icon className="text-[0.85rem]" />
      </div>

      <h3 className="museum-serif text-[1.65rem] leading-[1.05] tracking-[0.01em] text-[#335288] sm:text-[2.2rem]">
        {displayValue}
      </h3>
      <p className="mt-3 text-[0.88rem] font-semibold uppercase tracking-[0.04em] text-[#1f3355]">
        {item.title}
      </p>
      <p className="mt-2 text-[0.88rem] leading-relaxed text-[#556684]">{item.subtitle}</p>
    </motion.article>
  );
};

const StatsSection = () => {
  const reduceMotion = useReducedMotion();

  if (!statsHighlights?.length) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-[#f5f8ff] px-4 py-14 sm:px-6 md:px-8 md:py-18">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(51,82,136,0.12),_transparent_45%)]" />

      <div className="relative mx-auto max-w-[1700px]">
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.45 }}
          className="mb-8 text-center text-sm font-semibold uppercase tracking-[0.12em] text-[#335288] md:mb-10 md:text-[1.02rem]"
        >
          The Numbers Speak
        </motion.p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statsHighlights.map((item, index) => (
            <StatsCard key={item.id} item={item} index={index} reduceMotion={reduceMotion} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
