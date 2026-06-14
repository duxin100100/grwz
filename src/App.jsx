import CircularGallery from './components/CircularGallery';
import ProfileCard from './components/ProfileCard';

const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

const navItems = [
  { label: '工作经历', href: '#experience' },
  { label: '精选作品', href: '#projects' },
  { label: '个人优势', href: '#strengths' }
];

const heroWorks = [
  {
    title: 'SaaS 运营平台',
    label: 'B端后台 / 设计系统',
    image: asset('assets/project-saas.svg')
  },
  {
    title: '会员视觉升级',
    label: 'C端会员 / 转化路径',
    image: asset('assets/project-comic.svg')
  },
  {
    title: '营销活动 H5',
    label: '活动视觉 / 互动体验',
    image: asset('assets/project-campaign.svg')
  },
  {
    title: '组件规范',
    label: 'Design System / 复用效率',
    image: asset('assets/project-system.svg')
  },
  {
    title: '权益运营',
    label: '银行场景 / 用户触达',
    image: asset('assets/project-benefit.svg')
  },
  {
    title: 'AI 设计提效',
    label: 'AIGC / 视觉探索',
    image: asset('assets/project-ai.svg')
  }
];

const stats = [
  { value: '8+', label: '设计经验' },
  { value: '30%', label: '效率提升' },
  { value: '80%+', label: '场景复用' }
];

const timeline = [
  {
    time: '2018.03 - 2018.06',
    company: '小红书',
    role: 'UI设计实习生',
    text: '协助产品页面和运营活动视觉设计，参与素材整理、细节优化、切图标注和设计稿交付。'
  },
  {
    time: '2018.07 - 2021.05',
    company: '上海哔哩哔哩科技有限公司',
    role: 'UI设计师',
    text: '负责哔哩哔哩漫画会员产品、超漫俱乐部视觉升级，以及暑期活动、周年庆等大型营销项目设计。'
  },
  {
    time: '2021.06 - 至今',
    company: '上海海湾汇信息科技有限公司',
    role: 'UI设计师',
    text: '负责数字化营销 SaaS 平台 B端后台与 C端产品设计，推动组件化、体验规范与多银行业务场景落地。'
  }
];

const projects = [
  {
    title: 'C端设计',
    subtitle: 'Consumer Design',
    image: asset('assets/project-comic.svg')
  },
  {
    title: 'B端设计',
    subtitle: 'B-end Design',
    image: asset('assets/project-saas.svg')
  },
  {
    title: '运营设计',
    subtitle: 'Operation Design',
    image: asset('assets/project-campaign.svg')
  },
  {
    title: '品牌设计',
    subtitle: 'Brand Design',
    image: asset('assets/project-system.svg')
  }
];

const strengths = [
  {
    title: '复杂业务流程拆解',
    type: 'CORE',
    tags: ['活动配置链路', '权益运营模型', '订单与数据追踪']
  },
  {
    title: '设计系统与组件库',
    type: 'SYSTEM',
    tags: ['组件规范沉淀', '多场景复用', '交付标准统一']
  },
  {
    title: 'C端会员转化体验',
    type: 'GROWTH',
    tags: ['权益展示', '付费转化路径', '年轻化视觉']
  },
  {
    title: '营销活动视觉落地',
    type: 'VISUAL',
    tags: ['主视觉延展', 'H5互动玩法', '运营物料统一']
  },
  {
    title: 'AI辅助设计提效',
    type: 'AIGC',
    tags: ['概念探索', '网页搭建', '设计交付提速']
  }
];

function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="brand-pill" href="#top" aria-label="返回首页">
          <span className="brand-mark">DX</span>
          <span>DuXin</span>
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

function Hero() {
  const galleryItems = heroWorks.map((work) => ({
    image: work.image,
    text: work.title
  }));

  return (
    <section className="hero" id="top">
      <div className="hero-video-placeholder" aria-hidden="true" />
      <div className="hero-scrim" />
      <div className="hero-content shell">
        <p className="eyebrow">Portfolio 2026 / UI Designer</p>
        <h1>
          DUXIN
          <span>PORTFOLIO</span>
        </h1>
        <p className="hero-copy">
          用系统化设计与 AI 工作流，让复杂业务更清晰、交付更高效、产品更易落地。
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
          autoScrollSpeed={0.012}
        />
      </div>
    </section>
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
          <h2>WORK EXPERIENCE <span>↘</span></h2>
          <p>个人经历</p>
        </div>
        <div className="experience-grid">
          <div className="profile-card-frame">
            <ProfileCard
              className="profile-card-static"
              name="DuXin"
              title="UI Designer"
              handle="duxin.design"
              status="8 YEARS / UXUI / SaaS / Growth"
              contactText="Contact"
              avatarUrl={asset('assets/portrait.svg')}
              miniAvatarUrl={asset('assets/portrait.svg')}
              showUserInfo
              enableTilt={false}
              enableMobileTilt={false}
              onContactClick={handleProfileContact}
              behindGlowEnabled={false}
              behindGlowColor="rgba(184, 255, 32, 0.48)"
              behindGlowSize="58%"
              innerGradient="linear-gradient(145deg, rgba(12,18,18,0.96) 0%, rgba(42,68,48,0.86) 48%, rgba(184,255,32,0.28) 100%)"
            />
          </div>
          <div className="about-panel">
            <span className="lime-label">ABOUT ME</span>
            <h3>Hi, I am DuXin!</h3>
            <p>
              我把复杂业务流程、设计规范和视觉表达整合成可落地的产品体验。曾参与哔哩哔哩漫画会员体系与大型营销活动设计，近年主导数字化营销 SaaS 平台的 UI、组件库和体验规范建设。
            </p>
            <div className="info-grid">
              <div>
                <small>当前身份</small>
                <strong>UI Designer</strong>
              </div>
              <div>
                <small>服务方向</small>
                <strong>B端 SaaS / C端会员 / 活动视觉</strong>
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
          <h2>SELECTED WORKS <span>↘</span></h2>
          <p>项目入口</p>
        </div>
        <div className="project-mosaic">
          {projects.map((project, index) => (
            <a className={`work-tile tile-${index + 1}`} href="#contact" key={project.title}>
              <img src={project.image} alt={`${project.title}作品入口`} />
              <div>
                <h3>{project.title}</h3>
                <p>{project.subtitle}</p>
              </div>
            </a>
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
          <h2>CORE STRENGTHS <span>↘</span></h2>
          <p>个人优势</p>
        </div>
        <div className="strength-grid">
          {strengths.map((item, index) => (
            <article className="strength-card" key={item.title}>
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
            </article>
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
        <div>
          <p>联系方式</p>
          <h2>
            LET'S BUILD
            <span>BETTER VISUAL</span>
            SYSTEMS ↘
          </h2>
          <a className="brand-pill contact-brand" href="#top">
            <span className="brand-mark">DX</span>
            <span>DuXin</span>
          </a>
        </div>
        <aside className="contact-card">
          <h3>CONTACT</h3>
          <a href="tel:17645050083">手机：17645050083</a>
          <a href="mailto:1923993777@qq.com">邮箱：1923993777@qq.com</a>
          <span>城市：上海</span>
          <small>UI Design / SaaS / Visual System</small>
          <div className="qr-mark">DX</div>
        </aside>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <main>
      <Header />
      <Hero />
      <Experience />
      <Projects />
      <Strengths />
      <Contact />
    </main>
  );
}
