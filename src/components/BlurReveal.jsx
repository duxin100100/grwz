import { motion } from 'motion/react';

export default function BlurReveal({
  as = 'div',
  children,
  className = '',
  delay = 0,
  direction = 'bottom',
  duration = 0.72,
  distance = 34,
  ...props
}) {
  const MotionTag = motion[as] || motion.div;
  const y = direction === 'top' ? -distance : distance;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, filter: 'blur(18px)', y, scale: 0.985 }}
      whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.24, margin: '0px 0px -8% 0px' }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
