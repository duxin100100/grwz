import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import './FlowingMenu.css';

const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

function RightArrow() {
  return (
    <svg className="fm-item__arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 12h15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function FlowingMenu({
  items = [],
  marqueeBgColor = '#b8ff20',
  marqueeTextColor = '#030506',
  speed = 5,
  onSelect,
  onPreview,
  lowPower = false,
}) {
  const [hoverState, setHoverState] = useState(null);
  const marqueeUnits = Array.from({ length: lowPower ? 5 : 10 });

  useEffect(() => {
    if (lowPower) return;
    items.forEach((item) => {
      if (!item.image) return;
      const image = new Image();
      image.decoding = 'async';
      image.fetchPriority = 'high';
      image.src = asset(`assets/${item.image}`);
    });
  }, [items, lowPower]);

  const getDir = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return (e.clientY - rect.top) / rect.height < 0.5 ? 'top' : 'bottom';
  };

  return (
    <div className="fm-list">
      {items.map((item) => {
        const isActive = hoverState?.id === item.id;
        const enterDir = hoverState?.id === item.id ? hoverState.dir : 'bottom';

        return (
          <a
            key={item.id}
            href={(item.gallery || item.tabs || item.videos) ? undefined : item.href}
            className="fm-item"
            onClick={(e) => {
              if ((item.gallery || item.tabs || item.videos) && onSelect) {
                e.preventDefault();
                onSelect(item);
              }
            }}
            onMouseEnter={(e) => {
              onPreview?.(item);
              setHoverState({ id: item.id, dir: getDir(e) });
            }}
            onTouchStart={() => onPreview?.(item)}
            onFocus={() => onPreview?.(item)}
            onMouseLeave={() => setHoverState(null)}
          >
            {/* ── Static row content ── */}
            <span className="fm-item__index">{item.index}</span>
            <div className="fm-item__body">
              <strong className="fm-item__cat">{item.category}</strong>
              <p className="fm-item__desc">{item.description}</p>
            </div>
            <div className="fm-item__tag">
              <span>{item.en}</span>
              <RightArrow />
            </div>

            {/* ── Marquee overlay ── */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  className="fm-marquee"
                  style={{ backgroundColor: marqueeBgColor, color: marqueeTextColor }}
                  initial={{ y: enterDir === 'top' ? '-101%' : '101%' }}
                  animate={{ y: '0%' }}
                  exit={{ y: enterDir === 'top' ? '-101%' : '101%' }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  aria-hidden="true"
                >
                  <div className="fm-marquee__track" style={{ animationDuration: `${speed}s` }}>
                    {marqueeUnits.map((_, index) => (
                      <span key={`${item.id}-${index}`} className="fm-marquee__unit">
                        <span className="fm-marquee__media">
                          <img className="fm-marquee__img" src={asset(`assets/${item.image}`)} alt="" />
                        </span>
                        <span className="fm-marquee__text">{item.en}</span>
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </a>
        );
      })}
    </div>
  );
}
