import { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

import BlurText from './components/BlurText';
import BorderGlow from './components/BorderGlow';
import FlowingMenu from './components/FlowingMenu';
import SpotlightCard from './components/SpotlightCard';

const ProfileCard = lazy(() => import('./components/ProfileCard'));
const SplashCursor = lazy(() => import('./components/SplashCursor'));

const asset = (path) => `${import.meta.env.BASE_URL}${path}`;
const HERO_VIDEO_MP4_SRC = asset('assets/hero-video.mp4');
const HERO_VIDEO_WEBM_SRC = asset('assets/hero-video.webm');

const navItems = [
  { label: '工作经历', href: '#experience' },
  { label: '精选作品', href: '#projects' },
  { label: '个人优势', href: '#strengths' }
];

const stats = [
  { value: '8+', label: '设计经验' },
  { value: '50+', label: '落地项目' },
  { value: '500万+', label: '月Token消耗' }
];

const timeline = [
  {
    time: '2018.03 - 2018.06',
    company: '小红书',
    role: 'UI 设计实习生',
    text: '参与 C 端页面及运营活动视觉设计。'
  },
  {
    time: '2018.07 - 2021.05',
    company: '哔哩哔哩',
    role: 'UI 设计师',
    text: '负责漫画产品 UI 设计及会员、暑期活动项目。'
  },
  {
    time: '2021.06 - 至今',
    company: '海湾汇信息科技',
    role: '高级UI设计师 / 组长',
    text: '负责 SaaS 平台 UI/UE 设计、组件规范及团队管理。'
  }
];

const consumerGallery = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) =>
  asset(`assets/C端作品/${n}.${n <= 4 || n === 9 ? 'png' : 'gif'}`)
);

const businessGallery = ['整理01','整理02','整理03','整理04','整理05','整理06'].map((n) =>
  asset(`assets/B端作品/${n}.png`)
);

const operationGallery = ['Slice 1','Slice 2','Slice 3','Slice 4','Slice 5'].map((n) =>
  asset(`assets/运营作品/${n}.jpg`)
);

const brandGallery = [1,2,3,4,5,6].map((n) =>
  asset(`assets/品牌作品/${n}.png`)
);

const summerActivityGallery = [
  '01.png', '02.png', '03.png', '04.png', '05.png', '06.png', '07.png', '08.png',
  '09.png', '10.gif', '11.png', '12.png', '13.png', '14.png', '15.gif', '16.png',
  '17.png', '18.png', '19.png', '20.png', '21.gif', '22.gif', '23.png', '24.gif'
].map((file) => asset(`assets/暑期活动/${file}`));

const comicClubGallery = [
  '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg',
  '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg',
  '18.jpg', '19.jpg', '20.gif', '21.jpg', '22.gif', '23.jpg', '24.jpg', '25.jpg',
  '26.jpg', '27.jpg', '28.jpg', '29.jpg'
].map((file) => asset(`assets/超漫俱乐部/${file}`));

const projects = [
  {
    id: 'consumer',
    index: '01',
    category: 'C 端产品',
    en: 'OPEN',
    description: '海牙湾惊喜商城',
    image: 'project-consumer-abstract.svg',
    href: '#contact',
    gallery: consumerGallery
  },
  {
    id: 'business',
    index: '02',
    category: 'B 端产品',
    en: 'OPEN',
    description: '商城 SaaS 运营管理平台',
    image: 'project-business-abstract.svg',
    href: '#contact',
    gallery: businessGallery
  },
  {
    id: 'operation-brand',
    index: '03',
    category: '运营/品牌设计',
    en: 'OPEN',
    description: '节气海报/IP设计',
    image: 'project-operation-abstract.svg',
    href: '#contact',
    tabs: [
      { label: '节气海报', type: 'gallery', images: operationGallery },
      { label: 'IP设计', type: 'gallery', images: brandGallery },
    ]
  },
  {
    id: 'bilibili',
    index: '04',
    category: '哔哩哔哩',
    en: 'OPEN',
    description: '暑期活动/超漫俱乐部',
    image: 'project-brand-abstract.svg',
    href: '#contact',
    tabs: [
      { label: '暑期活动', type: 'gallery', images: summerActivityGallery },
      { label: '超漫俱乐部', type: 'gallery', images: comicClubGallery },
    ]
  },
  {
    id: 'ecommerce',
    index: '05',
    category: '视频剪辑',
    en: 'OPEN',
    description: '平时的一些自拍视频',
    image: 'project-brand-abstract.svg',
    href: '#contact',
    videos: [
      { label: '泰山', type: 'video', src: asset('assets/泰山.mp4') },
      { label: '黄山', type: 'video', src: asset('assets/黄山.mp4') },
      { label: '照片', type: 'photos', images: [
        asset('assets/个人照片/01.jpg'),
        asset('assets/个人照片/02.jpg'),
        asset('assets/个人照片/03.jpg'),
        asset('assets/个人照片/05.jpg'),
      ]},
    ]
  }
];

const strengths = [
  {
    title: '复杂问题解决',
    type: 'CORE',
    tags: ['快速理解需求', '关键问题判断', '高质量方案落地']
  },
  {
    title: '设计管理统筹',
    type: 'SYSTEM',
    tags: ['多项目并行排期', '设计标准与复盘沉淀', '稳定交付与风险控制']
  },
  {
    title: '业务增长思维',
    type: 'GROWTH',
    tags: ['核心目标拆解', '数据反馈验证', '持续迭代优化']
  },
  {
    title: '多场景视觉设计',
    type: 'VISUAL',
    tags: ['B/C端产品设计', '运营活动设计', '品牌视觉表达', '动效设计']
  },
  {
    title: 'AI 工作流提效',
    type: 'AIGC',
    tags: ['AI辅助创作', '独立建站落地', '设计流程提效']
  }
];

function DownRightArrow({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <path d="M9 9 27 27" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M27 13v14H13" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SectionHeading({ title }) {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return undefined;
    const node = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.25, rootMargin: '0px 0px -8% 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <h2 ref={ref} className="section-heading">
      <BlurText as="span" text={title} delay={42} animateBy="letters" direction="top" />
      <motion.span
        className="section-heading__arrow-wrap"
        initial={{ filter: 'blur(12px)', opacity: 0, y: -36 }}
        animate={inView
          ? {
              filter: ['blur(12px)', 'blur(5px)', 'blur(0px)'],
              opacity: [0, 0.55, 1],
              y: [-36, 4, 0]
            }
          : { filter: 'blur(12px)', opacity: 0, y: -36 }}
        transition={{ duration: 0.84, times: [0, 0.5, 1], delay: Math.min(title.length * 0.042, 1.05), ease: [0.22, 1, 0.36, 1] }}
      >
        <DownRightArrow className="section-heading__arrow" />
      </motion.span>
    </h2>
  );
}

const getProjectImageSources = (project) => {
  if (project.gallery) return project.gallery;
  if (project.tabs) return project.tabs.flatMap((tab) => tab.images || []);
  if (project.videos) {
    return project.videos.flatMap((item) => (item.type === 'photos' ? item.images || [] : []));
  }
  return [];
};

const uniqueSources = (sources) => [...new Set(sources.filter(Boolean))];
const imagePreloadCache = new Set();

function preloadImage(src, fetchPriority = 'low') {
  if (!src || imagePreloadCache.has(src)) return Promise.resolve();
  imagePreloadCache.add(src);

  return new Promise((resolve) => {
    const image = new Image();
    image.decoding = 'async';
    image.fetchPriority = fetchPriority;
    image.onload = resolve;
    image.onerror = resolve;
    image.src = src;
  });
}

async function preloadImages(sources, fetchPriority = 'low', batchSize = 2) {
  const queue = uniqueSources(sources).filter((src) => !imagePreloadCache.has(src));
  for (let index = 0; index < queue.length; index += batchSize) {
    await Promise.all(queue.slice(index, index + batchSize).map((src) => preloadImage(src, fetchPriority)));
  }
}

function shouldUseHeavyEffects() {
  if (typeof window === 'undefined') return false;
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const coarsePointer = window.matchMedia?.('(pointer: coarse)').matches;
  const narrowScreen = window.matchMedia?.('(max-width: 900px)').matches;
  const saveData = navigator.connection?.saveData;
  const memory = navigator.deviceMemory || 8;
  const cores = navigator.hardwareConcurrency || 8;

  return !reducedMotion && !coarsePointer && !narrowScreen && !saveData && memory >= 6 && cores >= 6;
}

function shouldAutoStartAudio() {
  if (typeof window === 'undefined') return false;
  const coarsePointer = window.matchMedia?.('(pointer: coarse)').matches;
  const saveData = navigator.connection?.saveData;
  return !coarsePointer && !saveData;
}

function Header({ activeSection, onNavigate }) {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="brand-pill" href="#top" aria-label="返回首页">
          <img className="brand-logo" src={asset('assets/logo-black.svg')} alt="" aria-hidden="true" />
        </a>
        <nav aria-label="主导航">
          {navItems.map((item) => (
            <a
              className={activeSection === item.href.slice(1) ? 'is-active' : undefined}
              aria-current={activeSection === item.href.slice(1) ? 'page' : undefined}
              key={item.href}
              href={item.href}
              onClick={(event) => onNavigate(event, item.href.slice(1))}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a className="header-cta" href="#contact">
          联系我
        </a>
      </div>
    </header>
  );
}

function ProfileCardFallback() {
  return (
    <div className="profile-card-fallback" aria-hidden="true">
      <img src={asset('assets/个人ip.jpg')} alt="" loading="lazy" decoding="async" />
    </div>
  );
}

function getBufferedPercent(video) {
  if (!video?.duration || !Number.isFinite(video.duration) || video.duration <= 0) {
    return 0;
  }

  let bufferedEnd = 0;
  for (let index = 0; index < video.buffered.length; index += 1) {
    bufferedEnd = Math.max(bufferedEnd, video.buffered.end(index));
  }

  return Math.min(100, Math.round((bufferedEnd / video.duration) * 100));
}

function Hero({ onHeroVideoProgress, onHeroVideoReady }) {
  const videoRef = useRef(null);

  const playHeroVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.play?.().catch(() => {});
  }, []);

  const syncVideoProgress = useCallback(() => {
    const video = videoRef.current;
    const percent = getBufferedPercent(video);

    if (percent > 0) {
      onHeroVideoProgress(percent);
    }

    if (percent >= 100 || video?.readyState >= 2) {
      onHeroVideoProgress(100);
      onHeroVideoReady();
      playHeroVideo();
    }
  }, [onHeroVideoProgress, onHeroVideoReady, playHeroVideo]);

  useEffect(() => {
    playHeroVideo();

    const handleUserGesture = () => playHeroVideo();
    const handleVisibilityChange = () => {
      if (!document.hidden) playHeroVideo();
    };

    document.addEventListener('WeixinJSBridgeReady', handleUserGesture);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('touchstart', handleUserGesture, { once: true, passive: true });
    document.addEventListener('click', handleUserGesture, { once: true });

    return () => {
      document.removeEventListener('WeixinJSBridgeReady', handleUserGesture);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('touchstart', handleUserGesture);
      document.removeEventListener('click', handleUserGesture);
    };
  }, [playHeroVideo]);

  useEffect(() => {
    const fallback = window.setTimeout(() => {
      onHeroVideoProgress(100);
      onHeroVideoReady();
      playHeroVideo();
    }, 4000);

    return () => window.clearTimeout(fallback);
  }, [onHeroVideoProgress, onHeroVideoReady, playHeroVideo]);

  return (
    <section className="hero" id="top">
      <video
        ref={videoRef}
        className="hero-video-placeholder"
        preload="auto"
        autoPlay
        loop
        muted
        defaultMuted
        playsInline
        webkit-playsinline=""
        x5-playsinline=""
        x5-video-player-type="h5"
        aria-hidden="true"
        onLoadedMetadata={syncVideoProgress}
        onLoadedData={syncVideoProgress}
        onProgress={syncVideoProgress}
        onCanPlay={syncVideoProgress}
        onCanPlayThrough={syncVideoProgress}
      >
        <source src={HERO_VIDEO_MP4_SRC} type="video/mp4" />
        <source src={HERO_VIDEO_WEBM_SRC} type="video/webm" />
      </video>
      <div className="hero-scrim" />
      <div className="hero-content shell">
        <h1>
          <img className="hero-logo" src={asset('assets/logo-lime.svg')} alt="杜鑫 DX" />
          <span className="hero-title-row">
            <span>PORTFOLIO</span>
            <img className="hero-sig" src={asset('assets/签名.png')} alt="" aria-hidden="true" />
          </span>
        </h1>
        <p className="hero-copy">
          以视觉系统与 AI 工作流，打造更高效、更具辨识度的数字体验。
        </p>
        <a className="hero-cta" href="#experience">
          了解我
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
      <div className="hero-bottom-bar">
        <div className="hero-bottom-inner shell">
          <div className="hero-bottom-left">
            <span className="hero-avail-dot" />
            <span>Work Location: Shanghai</span>
          </div>
          <div className="hero-bottom-right">
            <span>SCROLL</span>
            <span className="hero-scroll-arrow">↓</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function PagePreloader({ progress, isReady }) {
  const displayProgress = Math.min(100, Math.max(0, Math.round(progress)));

  return (
    <div className={`page-preloader${isReady ? ' is-hiding' : ''}`} aria-hidden={isReady}>
      <div className="page-preloader__inner">
        <div className="page-preloader__logo" aria-hidden="true">
          <img className="page-preloader__logo-base" src={asset('assets/logo-lime.svg')} alt="" />
          <div className="page-preloader__logo-fill" style={{ width: `${displayProgress}%` }}>
            <img src={asset('assets/logo-lime.svg')} alt="" />
          </div>
        </div>
        <div className="page-preloader__meta">
          <span>LOADING</span>
          <span>{displayProgress}%</span>
        </div>
        <div className="page-preloader__bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={displayProgress}>
          <span style={{ transform: `scaleX(${displayProgress / 100})` }} />
        </div>
      </div>
    </div>
  );
}

function ProgressiveGalleryMedia({ src, alt, priority = false, onPreviewReady }) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleFullImageSettled = () => {
    setIsLoaded(true);
    onPreviewReady?.();
  };

  return (
    <div className={`progressive-gallery-media${isLoaded ? ' is-loaded' : ''}`}>
      <div className="progressive-gallery-media__loader" aria-hidden="true">
        <img src={asset('assets/logo-lime.svg')} alt="" />
        <span>LOADING</span>
      </div>
      <img
        className="progressive-gallery-media__full"
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'low'}
        decoding={priority ? 'sync' : 'async'}
        onLoad={handleFullImageSettled}
        onError={handleFullImageSettled}
      />
    </div>
  );
}

function MediaLightbox({ media, onClose }) {
  const [activeTab, setActiveTab] = useState(0);
  const [firstGalleryImageLoaded, setFirstGalleryImageLoaded] = useState(false);

  useEffect(() => {
    if (!media) return undefined;
    setActiveTab(0);
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [media, onClose]);

  useEffect(() => {
    setFirstGalleryImageLoaded(false);
  }, [media, activeTab]);

  if (!media) return null;

  const isGallery = media.type === 'gallery';
  const isTabbed = media.type === 'tabs';
  const isVideos = media.type === 'videos';
  const isVideo = media.mediaType === 'video';
  const renderGalleryImages = (images, label) => (
    <>
      {images.slice(0, firstGalleryImageLoaded ? images.length : 1).map((src, i) => (
        <ProgressiveGalleryMedia
          key={src}
          src={src}
          alt={`${label} ${i + 1}`}
          priority={i === 0}
          onPreviewReady={i === 0 ? () => setFirstGalleryImageLoaded(true) : undefined}
        />
      ))}
      {!firstGalleryImageLoaded && (
        <div className="media-lightbox__gallery-loading">LOADING FIRST IMAGE</div>
      )}
    </>
  );

  if (isTabbed) {
    const current = media.tabs[activeTab];
    return (
      <div className="media-lightbox" role="dialog" aria-modal="true" aria-label={media.title}>
        <button className="media-lightbox__backdrop" type="button" aria-label="关闭预览" onClick={onClose} />
        <div className="media-lightbox__panel media-lightbox__panel--gallery media-lightbox__panel--tabs">
          <div className="media-lightbox__gallery-header">
            <div className="video-tabs">
              {media.tabs.map((tab, i) => (
                <button
                  key={tab.label}
                  className={`video-tab-btn${activeTab === i ? ' active' : ''}`}
                  onClick={() => setActiveTab(i)}
                  type="button"
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <button
              className="media-lightbox__close media-lightbox__gallery-close"
              type="button"
              aria-label="关闭预览"
              onClick={onClose}
            >
              <span aria-hidden="true" />
            </button>
          </div>
          <div className="media-lightbox__gallery-scroll">
            {renderGalleryImages(current.images, current.label)}
          </div>
        </div>
      </div>
    );
  }

  if (isVideos) {
    const current = media.videos[activeTab];
    return (
      <div className="media-lightbox" role="dialog" aria-modal="true" aria-label={media.title}>
        <button className="media-lightbox__backdrop" type="button" aria-label="关闭预览" onClick={() => { window.dispatchEvent(new Event('music-resume')); onClose(); }} />
        <div className="media-lightbox__panel media-lightbox__panel--videos">
          <div className="media-lightbox__gallery-header">
            <div className="video-tabs">
              {media.videos.map((v, i) => (
                <button
                  key={v.label}
                  className={`video-tab-btn${activeTab === i ? ' active' : ''}`}
                  onClick={() => setActiveTab(i)}
                  type="button"
                >
                  {v.label}
                </button>
              ))}
            </div>
            <button className="media-lightbox__close media-lightbox__gallery-close" type="button" aria-label="关闭" onClick={() => { window.dispatchEvent(new Event('music-resume')); onClose(); }}>
              <span aria-hidden="true" />
            </button>
          </div>
          <div className="video-lightbox-stage">
            {current.type === 'photos' ? (
              <div className="video-lightbox-photos">
                {current.images.map((src, i) => (
                  <ProgressiveGalleryMedia
                    key={src}
                    src={src}
                    alt={`照片 ${i + 1}`}
                    priority={i === 0}
                  />
                ))}
              </div>
            ) : (
              <video
                key={current.src}
                className="video-lightbox-player"
                src={current.src}
                controls
                autoPlay
                playsInline
                preload="metadata"
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  if (isGallery) {
    return (
      <div className="media-lightbox" role="dialog" aria-modal="true" aria-label={media.title || '作品预览'}>
        <button className="media-lightbox__backdrop" type="button" aria-label="关闭预览" onClick={onClose} />
        <div className="media-lightbox__panel media-lightbox__panel--gallery">
          <div className="media-lightbox__gallery-header">
            <h4>{media.title}</h4>
            <button
              className="media-lightbox__close media-lightbox__gallery-close"
              type="button"
              aria-label="关闭预览"
              onClick={onClose}
            >
              <span aria-hidden="true" />
            </button>
          </div>
          <div className="media-lightbox__gallery-scroll">
            {renderGalleryImages(media.images, media.title)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="media-lightbox" role="dialog" aria-modal="true" aria-label={media.title || '作品预览'}>
      <button className="media-lightbox__backdrop" type="button" aria-label="关闭预览" onClick={onClose} />
      <div className="media-lightbox__panel">
        <div className="media-lightbox__stage">
          {isVideo ? (
            <video className="media-lightbox__media" src={media.mediaSrc} poster={media.poster} controls playsInline preload="metadata" />
          ) : (
            <img className="media-lightbox__media" src={media.mediaSrc} alt={media.title || '作品预览'} loading="eager" fetchPriority="high" decoding="async" />
          )}
        </div>
        <button className="media-lightbox__close" type="button" aria-label="关闭预览" onClick={onClose}>
          <span aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

function Experience() {
  const handleProfileContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="section experience" id="experience">
      <div className="shell">
        <div className="section-title">
          <SectionHeading title="WORK EXPERIENCE" />
          <BlurText as="p" text="个人经历" delay={90} animateBy="letters" direction="bottom" />
        </div>
        <div className="experience-grid">
          <motion.div
            className="profile-card-frame"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <SpotlightCard
              className="profile-spotlight"
              spotlightColor="rgba(184, 255, 32, 0.12)"
            >
              <Suspense fallback={<ProfileCardFallback />}>
                <ProfileCard
                  className="profile-card-static"
                  name="杜鑫"
                  title="UI Designer"
                  handle="dx.design"
                  avatarUrl={asset('assets/个人ip.jpg')}
                  status="8 YEARS / SaaS / B端 / C端"
                  contactText="Contact"
                  showUserInfo
                  enableTilt={false}
                  enableMobileTilt={false}
                  onContactClick={handleProfileContact}
                  behindGlowEnabled={false}
                  behindGlowColor="rgba(184, 255, 32, 0.48)"
                  behindGlowSize="58%"
                  innerGradient="linear-gradient(145deg, rgba(12,18,18,0.96) 0%, rgba(42,68,48,0.86) 48%, rgba(184,255,32,0.28) 100%)"
                />
              </Suspense>
            </SpotlightCard>
          </motion.div>
          <motion.div
            className="about-panel"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="lime-label">ABOUT ME</span>
            <h3>你好，我叫杜鑫</h3>
            <p>一个能把 PM 的&quot;大概这样&quot;翻译成可落地上线的设计师。</p>
            <div className="info-grid">
              <div>
                <small>当前身份</small>
                <strong>UI Designer</strong>
              </div>
              <div>
                <small>能力覆盖</small>
                <strong>从产品体验到品牌视觉，从创意动效到网站落地</strong>
              </div>
              <div>
                <small>手机</small>
                <strong>17645050083</strong>
              </div>
              <div>
                <small>邮箱</small>
                <strong>1923993777@qq.com</strong>
              </div>
            </div>
            <div className="stats-row">
              {stats.map((item) => (
                <div key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        <div className="career-path">
          <span className="lime-label">CAREER PATH</span>
          <div className="path-line-reveal">
            <div className="path-line" />
          </div>
          <div className="timeline-grid">
            {timeline.map((job, i) => (
              <motion.article
                className="timeline-item"
                key={job.company}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <time>{job.time}</time>
                <div className="timeline-company-row">
                  <h4>{job.company}</h4>
                  <strong>{job.role}</strong>
                </div>
                <p>{job.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects({ onOpenMedia, onPreloadProject }) {
  const handleSelect = (item) => {
    onPreloadProject?.(item, 'high');
    if (item.gallery) {
      onOpenMedia({ type: 'gallery', title: item.category, images: item.gallery });
    } else if (item.tabs) {
      onOpenMedia({ type: 'tabs', title: item.category, tabs: item.tabs });
    } else if (item.videos) {
      window.dispatchEvent(new Event('music-pause'));
      onOpenMedia({ type: 'videos', title: item.category, videos: item.videos });
    } else {
      window.location.href = item.href;
    }
  };

  return (
    <section className="section projects" id="projects">
      <div className="shell">
        <div className="section-title">
          <SectionHeading title="SELECTED WORKS" />
          <BlurText as="p" text="作品展示" delay={90} animateBy="letters" direction="bottom" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <FlowingMenu
            items={projects}
            marqueeBgColor="#b8ff20"
            marqueeTextColor="#030506"
            speed={18}
            onSelect={handleSelect}
            onPreview={(item) => onPreloadProject?.(item, 'high')}
          />
        </motion.div>
      </div>
    </section>
  );
}

const strengthIcons = {
  /* 01 CORE — 双圆交叠，视觉体量与其他统一 */
  CORE: (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id="si-core-a" cx="38%" cy="35%" r="62%">
          <stop offset="0%" stopColor="#b8ff20" stopOpacity="0.95"/>
          <stop offset="100%" stopColor="#b8ff20" stopOpacity="0.1"/>
        </radialGradient>
        <radialGradient id="si-core-b" cx="62%" cy="65%" r="60%">
          <stop offset="0%" stopColor="#7c5af8" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#7c5af8" stopOpacity="0.05"/>
        </radialGradient>
      </defs>
      <circle cx="40" cy="40" r="26" fill="url(#si-core-a)"/>
      <circle cx="60" cy="60" r="22" fill="url(#si-core-b)"/>
      <circle cx="50" cy="50" r="10" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
      <circle cx="48" cy="47" r="4" fill="white" fillOpacity="0.7"/>
    </svg>
  ),
  /* 02 SYSTEM — 等距平台 + 浮球 */
  SYSTEM: (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="si-sys-top" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#b8ff20" stopOpacity="0.95"/>
          <stop offset="100%" stopColor="#b8ff20" stopOpacity="0.55"/>
        </linearGradient>
      </defs>
      <path d="M50 20 L82 38 L50 56 L18 38 Z" fill="url(#si-sys-top)"/>
      <path d="M18 38 L50 56 L50 78 L18 60 Z" fill="#b8ff20" fillOpacity="0.28"/>
      <path d="M50 56 L82 38 L82 60 L50 78 Z" fill="#7c5af8" fillOpacity="0.55"/>
      <circle cx="72" cy="30" r="11" fill="#7c5af8" fillOpacity="0.85"/>
      <circle cx="69" cy="27" r="4.5" fill="white" fillOpacity="0.45"/>
    </svg>
  ),
  /* 03 GROWTH — 三段递升色块 */
  GROWTH: (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="si-grow-1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7c5af8" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#7c5af8" stopOpacity="0.35"/>
        </linearGradient>
        <linearGradient id="si-grow-2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#b8ff20" stopOpacity="0.85"/>
          <stop offset="100%" stopColor="#7c5af8" stopOpacity="0.55"/>
        </linearGradient>
        <linearGradient id="si-grow-3" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#b8ff20" stopOpacity="0.95"/>
          <stop offset="100%" stopColor="#b8ff20" stopOpacity="0.45"/>
        </linearGradient>
      </defs>
      {/* 左：最矮 */}
      <rect x="20" y="64" width="16" height="18" rx="4" fill="url(#si-grow-1)"/>
      {/* 中：中高 */}
      <rect x="42" y="48" width="16" height="34" rx="4" fill="url(#si-grow-2)"/>
      {/* 右：最高 */}
      <rect x="64" y="28" width="16" height="54" rx="4" fill="url(#si-grow-3)"/>
      {/* 顶部高光点 */}
      <circle cx="72" cy="26" r="4" fill="white" fillOpacity="0.65"/>
    </svg>
  ),
  /* 04 VISUAL — 三层叠框（缩小到 ~60px 视觉区） */
  VISUAL: (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="28" y="16" width="52" height="36" rx="6" fill="#7c5af8" fillOpacity="0.5"/>
      <rect x="20" y="30" width="52" height="36" rx="6" fill="#b8ff20" fillOpacity="0.55"/>
      <rect x="12" y="44" width="52" height="36" rx="6" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5"/>
      <rect x="12" y="44" width="52" height="8"  rx="4" fill="white" fillOpacity="0.22"/>
    </svg>
  ),
  /* 05 AIGC — 循环双弧（r=28，视觉区 ~56px） */
  AIGC: (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="si-ai-arc" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#b8ff20" stopOpacity="0.95"/>
          <stop offset="100%" stopColor="#b8ff20" stopOpacity="0.3"/>
        </linearGradient>
      </defs>
      <path d="M50 22 A28 28 0 1 1 22 50" stroke="url(#si-ai-arc)" strokeWidth="12" strokeLinecap="round" fill="none"/>
      <path d="M50 78 A28 28 0 0 1 78 50" stroke="#7c5af8" strokeWidth="12" strokeLinecap="round" fill="none" strokeOpacity="0.8"/>
      <path d="M22 50 L15 40 L27 43 Z" fill="#b8ff20" fillOpacity="0.9"/>
      <path d="M50 78 L40 85 L43 73 Z" fill="#7c5af8" fillOpacity="0.8"/>
      <circle cx="50" cy="50" r="8" fill="rgba(255,255,255,0.15)"/>
      <circle cx="50" cy="50" r="3.5" fill="white" fillOpacity="0.6"/>
    </svg>
  ),
};

function Strengths() {
  return (
    <section className="section strengths" id="strengths">
      <div className="shell">
        <div className="section-title">
          <SectionHeading title="CORE STRENGTHS" />
          <BlurText as="p" text="个人优势" delay={90} animateBy="letters" direction="bottom" />
        </div>
        <div className="strength-grid">
          {strengths.map((item, index) => (
            <motion.article
              className="strength-card"
              key={`${item.type}-${index}`}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="card-meta">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <em>{item.type}</em>
              </div>
              <h3>{item.title}<b>.</b></h3>
              <div className="tag-stack">
                {item.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className="strength-card__icon">
                {strengthIcons[item.type]}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="shell contact-layout">
        <div className="contact-copy">
          <BlurText as="p" text="联系方式" delay={90} animateBy="letters" direction="top" />
          <h2>
            <span>{"LET'S BUILD"}</span>
            <span>BETTER VISUAL</span>
            <span className="contact-heading-line">
              SYSTEMS
              <DownRightArrow className="contact-heading-arrow" />
            </span>
          </h2>
          <a className="brand-pill contact-brand" href="#top">
            <img className="brand-logo" src={asset('assets/logo-black.svg')} alt="" aria-hidden="true" />
          </a>
        </div>
        <BorderGlow
          as="aside"
          className="contact-card"
          edgeSensitivity={24}
          glowRadius={34}
          glowIntensity={0.9}
          fillOpacity={0.18}
          revealDelay={0.08}
          revealDirection="bottom"
          backgroundColor="rgba(24, 30, 25, 0.76)"
          borderRadius={24}
        >
          <h3>CONTACT</h3>
          <a href="tel:17645050083">手机：17645050083</a>
          <a href="mailto:1923993777@qq.com">邮箱：1923993777@qq.com</a>
          <span>城市：上海</span>
          <small>我的微信号</small>
          <div className="qr-mark">
            <img src={asset('assets/wx.png')} alt="微信二维码" />
          </div>
        </BorderGlow>
      </div>
    </section>
  );
}

function MusicPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.5;

    const tryPlay = () => {
      audio.play().then(() => setPlaying(true)).catch(() => {});
      ['click', 'keydown', 'touchstart'].forEach(e =>
        document.removeEventListener(e, tryPlay)
      );
    };

    const onPause = () => { audio.pause(); setPlaying(false); };
    const onResume = () => { audio.play().then(() => setPlaying(true)).catch(() => {}); };

    window.addEventListener('music-pause', onPause);
    window.addEventListener('music-resume', onResume);

    if (shouldAutoStartAudio()) {
      audio.play().then(() => setPlaying(true)).catch(() => {
        ['click', 'keydown', 'touchstart'].forEach(e =>
          document.addEventListener(e, tryPlay, { once: true })
        );
      });
    }

    return () => {
      ['click', 'keydown', 'touchstart'].forEach(e =>
        document.removeEventListener(e, tryPlay)
      );
      window.removeEventListener('music-pause', onPause);
      window.removeEventListener('music-resume', onResume);
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlaying(!playing);
  };

  return (
    <div className="music-player">
      <audio ref={audioRef} src={asset('assets/music.m4a')} loop preload="none" />
      <button className="music-btn" onClick={toggle} aria-label={playing ? '暂停音乐' : '播放音乐'}>
        {playing ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M9 18V5l12-2v13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="1.8"/>
            <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="1.8"/>
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M9 18V5l12-2v13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="1.8"/>
            <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="1.8"/>
            <line x1="3" y1="3" x2="21" y2="21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        )}
      </button>
    </div>
  );
}

export default function App() {
  const [activeMedia, setActiveMedia] = useState(null);
  const [activeSection, setActiveSection] = useState('');
  const [loadProgress, setLoadProgress] = useState(0);
  const [heroVideoReady, setHeroVideoReady] = useState(false);
  const [enableHeavyEffects, setEnableHeavyEffects] = useState(false);

  const preloadProject = useCallback((project, fetchPriority = 'low') => {
    const sources = getProjectImageSources(project);
    preloadImages(sources.map(getThumbnailSrc), fetchPriority, fetchPriority === 'high' ? 4 : 2);
    if (fetchPriority === 'high') {
      preloadImages(sources.slice(0, 2), 'low', 2);
    }
  }, []);

  const handleHeroVideoProgress = useCallback((percent) => {
    setLoadProgress((current) => Math.max(current, percent));
  }, []);

  const handleHeroVideoReady = useCallback(() => {
    setLoadProgress(100);
    window.setTimeout(() => setHeroVideoReady(true), 240);
  }, []);

  const scrollToSection = useCallback((event, sectionId) => {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    const title = section?.querySelector('.section-title');
    const target = title || section;
    if (!target) return;

    const headerOffset = 122;
    const top = window.scrollY + target.getBoundingClientRect().top - headerOffset;
    window.scrollTo({ top, behavior: 'smooth' });
    window.history.replaceState(null, '', `#${sectionId}`);
    setActiveSection(sectionId);
  }, []);

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.slice(1));

    const updateActiveSection = () => {
      const anchorLine = Math.min(window.innerHeight * 0.34, 320);
      let current = '';

      sectionIds.forEach((sectionId) => {
        const section = document.getElementById(sectionId);
        const title = section?.querySelector('.section-title');
        const target = title || section;
        if (target && target.getBoundingClientRect().top <= anchorLine) {
          current = sectionId;
        }
      });

      setActiveSection(current);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('is-preloading', !heroVideoReady);
    document.getElementById('initial-loader')?.remove();

    return () => {
      document.documentElement.classList.remove('is-preloading');
    };
  }, [heroVideoReady]);

  useEffect(() => {
    if (heroVideoReady) return undefined;

    const timer = window.setInterval(() => {
      setLoadProgress((current) => {
        if (current >= 92) return current;
        const step = current < 38 ? 6 : current < 72 ? 3 : 1;
        return Math.min(92, current + step);
      });
    }, 220);

    return () => window.clearInterval(timer);
  }, [heroVideoReady]);

  useEffect(() => {
    if (!heroVideoReady) return undefined;

    let cancelled = false;
    const firstImages = projects.map((project) => getThumbnailSrc(getProjectImageSources(project)[0]));
    const run = async () => {
      await preloadImages(firstImages, 'high', 4);
    };

    const schedule = window.requestIdleCallback
      ? window.requestIdleCallback(() => run(), { timeout: 1800 })
      : window.setTimeout(run, 900);

    return () => {
      cancelled = true;
      if (window.cancelIdleCallback && typeof schedule === 'number') {
        window.cancelIdleCallback(schedule);
      } else {
        window.clearTimeout(schedule);
      }
    };
  }, [heroVideoReady]);

  useEffect(() => {
    setEnableHeavyEffects(shouldUseHeavyEffects());
  }, []);

  return (
    <main>
      <PagePreloader progress={loadProgress} isReady={heroVideoReady} />
      <MusicPlayer />
      {enableHeavyEffects && (
        <Suspense fallback={null}>
          <SplashCursor
            SIM_RESOLUTION={72}
            DYE_RESOLUTION={512}
            DENSITY_DISSIPATION={4.8}
            VELOCITY_DISSIPATION={2.8}
            SPLAT_RADIUS={0.14}
            SPLAT_FORCE={3400}
            COLOR_UPDATE_SPEED={3}
            RAINBOW_MODE={false}
            COLOR="#b8ff20"
          />
        </Suspense>
      )}
      <Header activeSection={activeSection} onNavigate={scrollToSection} />
      <Hero onHeroVideoProgress={handleHeroVideoProgress} onHeroVideoReady={handleHeroVideoReady} />
      <Experience />
      <Projects onOpenMedia={setActiveMedia} onPreloadProject={preloadProject} />
      <Strengths />
      <Contact />
      <MediaLightbox media={activeMedia} onClose={() => setActiveMedia(null)} />
    </main>
  );
}
