import { useEffect, useState } from 'react';

import BlurReveal from './components/BlurReveal';
import BlurText from './components/BlurText';
import BorderGlow from './components/BorderGlow';
import CircularGallery from './components/CircularGallery';
import ProfileCard from './components/ProfileCard';
import SplashCursor from './components/SplashCursor';

const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

const navItems = [
  { label: '工作经历', href: '#experience' },
  { label: '精选作品', href: '#projects' },
  { label: '个人优势', href: '#strengths' }
];

const heroWorks = [
  {
    title: 'XXXX-01',
    label: '#### / ####',
    image: asset('assets/project-saas.svg')
  },
  {
    title: 'XXXX-02',
    label: '#### / ####',
    image: asset('assets/project-comic.svg')
  },
  {
    title: 'XXXX-03',
    label: '#### / ####',
    image: asset('assets/project-campaign.svg')
  },
  {
    title: 'XXXX-04',
    label: '#### / ####',
    image: asset('assets/project-system.svg')
  },
  {
    title: 'XXXX-05',
    label: '#### / ####',
    image: asset('assets/project-benefit.svg')
  },
  {
    title: 'XXXX-06',
    label: '#### / ####',
    image: asset('assets/project-ai.svg')
  }
];

const stats = [
  { value: '10', label: '设计经验' },
  { value: '30%', label: '效率提升' },
  { value: '80%+', label: '场景复用' }
];

const timeline = [
  {
    time: '20XX.XX - 20XX.XX',
    company: 'XXXX-01',
    role: '####',
    text: '##########，##########，##########。'
  },
  {
    time: '20XX.XX - 20XX.XX',
    company: 'XXXX-02',
    role: '####',
    text: '##########，##########，##########。'
  },
  {
    time: '20XX.XX - 20XX.XX',
    company: 'XXXX-03',
    role: '####',
    text: '##########，##########，##########。'
  }
];

const projects = [
  {
    title: 'XXXX-A',
    subtitle: '#### ####',
    image: asset('assets/project-comic.svg')
  },
  {
    title: 'XXXX-B',
    subtitle: '#### ####',
    image: asset('assets/project-saas.svg')
  },
  {
    title: 'XXXX-C',
    subtitle: '#### ####',
    image: asset('assets/project-campaign.svg')
  },
  {
    title: 'XXXX-D',
    subtitle: '#### ####',
    image: asset('assets/project-system.svg')
  }
];

const strengths = [
  {
    title: '########',
    type: 'CORE',
    tags: ['####', '####', '####']
  },
  {
    title: '########',
    type: 'SYSTEM',
    tags: ['####', '####', '####']
  },
  {
    title: '########',
    type: 'GROWTH',
    tags: ['####', '####', '####']
  },
  {
    title: '########',
    type: 'VISUAL',
    tags: ['####', '####', '####']
  },
  {
    title: '########',
    type: 'AIGC',
    tags: ['####', '####', '####']
  }
];

function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="brand-pill" href="#top" aria-label="返回首页">
          <img className="brand-logo" src={asset('assets/logo-black.svg')} alt="" aria-hidden="true" />
        </a>
        <nav aria-label="主导航">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
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

function Hero({ onOpenMedia }) {
  const galleryItems = heroWorks.map((work) => ({
    image: work.image,
    text: work.title,
    title: work.title,
    label: work.label,
    mediaType: work.mediaType || 'image',
    mediaSrc: work.mediaSrc || work.image,
    poster: work.poster || work.image
  }));

  return (
    <section className="hero" id="top">
      <div className="hero-video-placeholder" aria-hidden="true" />
      <div className="hero-scrim" />
      <div className="hero-content shell">
        <p className="eyebrow">Portfolio 2026 / UI Designer</p>
        <h1>
          UUU
          <span>PORTFOLIO</span>
        </h1>
        <p className="hero-copy">
          ##########，##########，##########。
        </p>
      </div>
      <div className="hero-gallery" aria-label="作品画廊">
        <CircularGallery
          items={galleryItems}
          bend={2.8}
          textColor="#f6f8f4"
          borderRadius={0.06}
          font="bold 18px Arial"
          scrollSpeed={1.7}
          scrollEase={0.035}
          autoScrollSpeed={-0.012}
          onSelect={onOpenMedia}
        />
      </div>
    </section>
  );
}

function MediaLightbox({ media, onClose }) {
  useEffect(() => {
    if (!media) return undefined;
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

  if (!media) return null;

  const isVideo = media.mediaType === 'video';

  return (
    <div className="media-lightbox" role="dialog" aria-modal="true" aria-label={media.title || '作品预览'}>
      <button className="media-lightbox__backdrop" type="button" aria-label="关闭预览" onClick={onClose} />
      <div className="media-lightbox__panel">
        <div className="media-lightbox__stage">
          {isVideo ? (
            <video className="media-lightbox__media" src={media.mediaSrc} poster={media.poster} controls playsInline />
          ) : (
            <img className="media-lightbox__media" src={media.mediaSrc} alt={media.title || '作品预览'} />
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
          <BlurText as="h2" text="WORK EXPERIENCE ↘" delay={42} animateBy="letters" direction="top" />
          <BlurText as="p" text="个人经历" delay={90} animateBy="letters" direction="bottom" />
        </div>
        <div className="experience-grid">
          <BlurReveal className="profile-card-frame" delay={0.12} direction="bottom" duration={0.78} distance={36}>
            <ProfileCard
              className="profile-card-static"
              name="UUU"
              title="UI Designer"
              handle="uuu.mask"
              avatarUrl={asset('assets/profile-gray.png')}
              status="XX YEARS / #### / #### / ####"
              contactText="Contact"
              showUserInfo
              enableTilt
              enableMobileTilt={false}
              onContactClick={handleProfileContact}
              behindGlowEnabled={false}
              behindGlowColor="rgba(184, 255, 32, 0.48)"
              behindGlowSize="58%"
              innerGradient="linear-gradient(145deg, rgba(12,18,18,0.96) 0%, rgba(42,68,48,0.86) 48%, rgba(184,255,32,0.28) 100%)"
            />
          </BlurReveal>
          <div className="about-panel">
            <BlurText as="span" className="lime-label" text="ABOUT ME" delay={70} animateBy="words" direction="top" />
            <BlurText as="h3" text="Hi, I am UUU!" delay={72} animateBy="words" direction="top" />
            <BlurText
              as="p"
              text="####################。 ####################。 ####################。"
              delay={90}
              animateBy="words"
              direction="bottom"
            />
            <div className="info-grid">
              <div>
                <BlurText as="small" text="当前身份" delay={70} animateBy="letters" direction="top" />
                <BlurText as="strong" text="UI Designer" delay={55} animateBy="words" direction="bottom" />
              </div>
              <div>
                <BlurText as="small" text="服务方向" delay={70} animateBy="letters" direction="top" />
                <BlurText as="strong" text="#### / #### / ####" delay={45} animateBy="words" direction="bottom" />
              </div>
              <div>
                <BlurText as="small" text="手机" delay={70} animateBy="letters" direction="top" />
                <BlurText as="strong" text="00000000000" delay={35} animateBy="letters" direction="bottom" />
              </div>
              <div>
                <BlurText as="small" text="邮箱" delay={70} animateBy="letters" direction="top" />
                <BlurText as="strong" text="####" delay={45} animateBy="letters" direction="bottom" />
              </div>
            </div>
            <div className="stats-row">
              {stats.map((item) => (
                <div key={item.label}>
                  <BlurText as="strong" text={item.value} delay={45} animateBy="letters" direction="top" />
                  <BlurText as="span" text={item.label} delay={70} animateBy="letters" direction="bottom" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="career-path">
          <span>CAREER PATH</span>
          <div className="path-line" />
          <div className="timeline-grid">
            {timeline.map((job) => (
              <article key={job.company}>
                <time>{job.time}</time>
                <h4>{job.company}</h4>
                <strong>{job.role}</strong>
                <p>{job.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section className="section projects" id="projects">
      <div className="shell">
        <div className="section-title">
          <BlurText as="h2" text="SELECTED WORKS ↘" delay={42} animateBy="letters" direction="top" />
          <BlurText as="p" text="项目入口" delay={90} animateBy="letters" direction="bottom" />
        </div>
        <div className="project-mosaic">
          {projects.map((project, index) => (
            <BorderGlow
              as="a"
              className={`work-tile tile-${index + 1}`}
              revealDelay={index * 0.09}
              revealDirection={index % 2 === 0 ? 'bottom' : 'top'}
              edgeSensitivity={24}
              glowRadius={34}
              glowIntensity={0.9}
              fillOpacity={0.22}
              href="#contact"
              key={project.title}
            >
              <img src={project.image} alt={`${project.title}作品入口`} />
              <div>
                <h3>{project.title}</h3>
                <p>{project.subtitle}</p>
              </div>
            </BorderGlow>
          ))}
        </div>
      </div>
    </section>
  );
}

function Strengths() {
  return (
    <section className="section strengths" id="strengths">
      <div className="shell">
        <div className="section-title">
          <BlurText as="h2" text="CORE STRENGTHS ↘" delay={42} animateBy="letters" direction="top" />
          <BlurText as="p" text="个人优势" delay={90} animateBy="letters" direction="bottom" />
        </div>
        <div className="strength-grid">
          {strengths.map((item, index) => (
            <BlurReveal as="article" className="strength-card" delay={index * 0.08} key={item.title}>
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
              <i aria-hidden="true" />
            </BlurReveal>
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
          <p>联系方式</p>
          <h2>
            LET'S BUILD
            <span>BETTER VISUAL</span>
            SYSTEMS ↘
          </h2>
          <a className="brand-pill contact-brand" href="#top">
            <img className="brand-logo" src={asset('assets/logo-black.svg')} alt="" aria-hidden="true" />
          </a>
        </div>
        <aside className="contact-card">
          <h3>CONTACT</h3>
          <a href="tel:00000000000">手机：00000000000</a>
          <a href="#">邮箱：####</a>
          <span>城市：XXX</span>
          <small>#### / #### / ####</small>
          <div className="qr-mark">UUU</div>
        </aside>
      </div>
    </section>
  );
}

export default function App() {
  const [activeMedia, setActiveMedia] = useState(null);

  return (
    <main>
      <SplashCursor
        SIM_RESOLUTION={96}
        DYE_RESOLUTION={720}
        DENSITY_DISSIPATION={4.6}
        VELOCITY_DISSIPATION={2.6}
        SPLAT_RADIUS={0.16}
        SPLAT_FORCE={4200}
        COLOR_UPDATE_SPEED={4}
        RAINBOW_MODE={false}
        COLOR="#b8ff20"
      />
      <Header />
      <Hero onOpenMedia={setActiveMedia} />
      <Experience />
      <Projects />
      <Strengths />
      <Contact />
      <MediaLightbox media={activeMedia} onClose={() => setActiveMedia(null)} />
    </main>
  );
}
