import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

// --- DATA ---------------------------------------------------------

const PROJECTS = [
  {
    title: "Luna — AI Companion",
    desc: "A personalized AI chatbot with long-term memory capabilities and conversational awareness.",
    tags: ["Python", "API", "OpenAI", "Flask"],
    link: "https://github.com/wonders-why",
    viewLink: "#",
    wip: false,
  },
  {
    title: "Restaurant Platform",
    desc: "A SaaS solution designed to optimize tables and digitize orders for restaurant management.",
    tags: ["Flask", "REST API", "PostgreSQL"],
    link: "https://github.com/wonders-why",
    viewLink: "#",
    wip: true,
  },
  {
    title: "Anime Recommender",
    desc: "A machine learning-driven engine that recommends anime based on nuanced user preferences.",
    tags: ["Python", "Algorithms", "ML"],
    link: "https://github.com/wonders-why",
    viewLink: "#",
    wip: true,
  },
  {
    title: "Personal E-Commerce",
    desc: "A scalable digital storefront featuring cart management and secure checkout.",
    tags: ["Flask", "PostgreSQL", "Supabase"],
    link: "https://github.com/wonders-why",
    viewLink: "#",
    wip: true,
  }
];

const SKILL_GROUPS = [
  {
    label: "Languages",
    items: ["Python", "HTML / CSS", "SQL"],
  },
  {
    label: "Frameworks / Libs",
    items: ["Flask", "PyTorch", "TensorFlow", "React", "JSON"],
  },
  {
    label: "Core / Concepts",
    items: ["Machine Learning", "REST APIs", "Data Structures", "Algorithms"],
  },
  {
    label: "Tools & DBs",
    items: ["Git", "PostgreSQL", "Supabase", "Cursor AI", "Claude Code", "Antigravity"],
  },
];

const FOOL_SKILL_GROUPS = [
  { label: "Languages", items: ["Python", "JavaScript", "SQL"] },
  { label: "Frontend", items: ["React", "Tailwind CSS", "Framer Motion"] },
  { label: "Backend", items: ["Flask", "REST APIs", "Node.js"] },
  { label: "Database & Infra", items: ["PostgreSQL", "Supabase"] },
  { label: "AI / Vibe Coding Tools", items: ["Claude", "ChatGPT", "Cursor", "Replit Ghostwriter", "Supabase AI"] },
];

const STATS = [
  { label: "Projects Built", value: "10+" },
  { label: "Experience", value: "3 Years" },
  { label: "Focus", value: "Backend & ML" },
];

const FOOL_STATS = [
  { label: "Projects Built", value: "10+" },
  { label: "Consistent Building", value: "3 Months" },
  { label: "Focus", value: "Backend Systems · Machine Learning · Scalable Applications" },
];

// --- HOOKS --------------------------------------------------------

function useInView(threshold = 0.08) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, delay = 0, x = 0, style = {} }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : `translateY(24px) translateX(${x}px)`,
      transition: `opacity 1s ${delay}s cubic-bezier(0.16,1,0.3,1), transform 1s ${delay}s cubic-bezier(0.16,1,0.3,1)`,
      ...style,
    }}>
      {children}
    </div>
  );
}

// --- MAIN COMPONENT -----------------------------------------------

export default function Portfolio({ mode = "professional" }) {
  const [scrollY, setScrollY] = useState(0);
  const [navScrolled, setNavScrolled] = useState(false);
  const [heroOpacity, setHeroOpacity] = useState(1);
  const [activeSection, setActiveSection] = useState("about");
  const [logoClicks, setLogoClicks] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isFool = mode === "fool";
  const accent = isFool ? "#FF3CAC" : "#3B82F6";
  const highlight = isFool ? "#F7971E" : "#60A5FA";
  const bg = isFool ? "#05030c" : "#0B0F19";
  const bg2 = isFool ? "#080512" : "#111827";
  const textPrimary = isFool ? "#f1f5f9" : "#E5E7EB";
  const textSecondary = isFool ? "rgba(245,239,224,0.62)" : "#9CA3AF";
  const textMuted = isFool ? "rgba(255,255,255,0.28)" : "#6B7280";
  const border = isFool ? "rgba(255,255,255,0.07)" : "#1F2937";

  const headingFont = isFool ? "'Cormorant Garamond', Georgia, serif" : "'Poppins', sans-serif";
  const bodyFont = isFool ? "'Cormorant Garamond', Georgia, serif" : "'Inter', sans-serif";
  const headingWeight = isFool ? 300 : 700;
  const headingStyle = isFool ? "italic" : "normal";

  const currentStats = isFool ? FOOL_STATS : STATS;
  const currentSkills = isFool ? FOOL_SKILL_GROUPS : SKILL_GROUPS;

  useEffect(() => {
    const h = () => {
      const y = window.scrollY;
      setScrollY(y);
      setNavScrolled(y > 20);
      setHeroOpacity(Math.max(0, 1 - y / (window.innerHeight * 0.7)));
      setIsMobile(window.innerWidth < 768);
    };
    h();
    window.addEventListener("scroll", h, { passive: true });
    window.addEventListener("resize", h);
    return () => {
      window.removeEventListener("scroll", h);
      window.removeEventListener("resize", h);
    };
  }, []);

  useEffect(() => {
    const ids = ["about", "skills", "projects", "contact"];
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { threshold: 0.25 }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const scrollTo = useCallback(id => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }, []);

  return (
    <div style={{ 
      backgroundColor: bg,
      backgroundImage: isFool ? "none" : `radial-gradient(circle at 20% 30%, #1e3a8a33, transparent 50%), radial-gradient(circle at 80% 70%, #3b82f633, transparent 50%)`,
      color: textPrimary, 
      fontFamily: bodyFont, 
      minHeight: "100vh", 
      overflowX: "hidden", 
      transition: "background 0.8s ease, background-image 0.8s ease" 
    }}>
      <style>{css(accent, bg, border, isFool)}</style>

      {/* --- TOP NAV --- */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 900,
        height: navScrolled ? (isMobile ? 60 : 64) : (isMobile ? 70 : 80),
        padding: isMobile ? "0 1.5rem" : "0 3rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: navScrolled ? (isFool ? "rgba(5,3,12,0.85)" : "rgba(11,15,25,0.85)") : "transparent",
        backdropFilter: navScrolled ? "blur(12px)" : "none",
        borderBottom: navScrolled ? `1px solid ${border}` : "1px solid transparent",
        transition: "all 0.5s ease",
      }}>
        {/* Brand Logo with Hidden Easter Egg */}
        <div 
          onClick={() => {
            const next = logoClicks + 1;
            if (next >= 9) {
              window.open("https://www.instagram.com/wonders.why/", "_blank");
              setLogoClicks(0);
            } else {
              setLogoClicks(next);
            }
          }}
          style={{
            cursor: "default",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            userSelect: "none",
            width: 44,
            height: 44,
            borderRadius: "50%",
            border: `1px solid ${border}`,
            background: navScrolled ? "rgba(255,255,255,0.03)" : "transparent",
            transition: "all 0.5s ease"
          }}
        >
          <span style={{
            fontFamily: isFool ? headingFont : "'Space Mono', monospace", 
            fontSize: isFool ? 14 : 10,
            fontWeight: isFool ? 400 : 700,
            letterSpacing: isFool ? "0.05em" : "0.1em", 
            textTransform: "uppercase",
            color: accent, 
            transition: "color 0.8s",
            pointerEvents: "none"
          }}>
            {isFool ? "TF" : "DS"}
          </span>
        </div>

        {/* Center — Placeholder */}
        <div style={{ flexGrow: 1 }} />

        {isMobile ? (
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ 
              background: "none", border: "none", cursor: "pointer", 
              color: textPrimary, display: "flex", flexDirection: "column", gap: 5 
            }}
          >
            <div style={{ width: 22, height: 2, background: "currentColor", borderRadius: 2 }} />
            <div style={{ width: 22, height: 2, background: "currentColor", borderRadius: 2 }} />
          </button>
        ) : (
          <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
            {[["about","About"],["projects","Projects"],["skills","Skills"],["contact","Contact"]].map(([id, label]) => (
              <NavBtn
                key={id} id={id} label={label}
                active={activeSection === id}
                onClick={scrollTo}
                textPrimary={textPrimary} textSecondary={textSecondary}
                bodyFont={bodyFont} isFool={isFool} accent={accent}
              />
            ))}
          </div>
        )}
      </nav>

      {/* --- MOBILE OVERLAY --- */}
      <motion.div 
        initial={false}
        animate={{ opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? "auto" : "none" }}
        style={{
          position: "fixed", inset: 0, zIndex: 950,
          background: isFool ? "rgba(5,3,12,0.98)" : "rgba(11,15,25,0.98)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2.5rem"
        }}
      >
        <button 
           onClick={() => setMenuOpen(false)}
           style={{ position: "absolute", top: 30, right: 30, background: "none", border: "none", color: textPrimary, fontSize: 32, cursor: "pointer" }}
        >×</button>
        {[["about","About"],["projects","Projects"],["skills","Skills"],["contact","Contact"]].map(([id, label]) => (
          <button key={id} onClick={() => scrollTo(id)} style={{
            fontFamily: headingFont, fontSize: "2.5rem", fontWeight: 600, color: activeSection === id ? accent : textPrimary,
            background: "none", border: "none", cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.1em"
          }}>{label}</button>
        ))}
      </motion.div>

      {/* --- HERO --- */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 80, paddingBottom: 80 }}>
        
        {isFool && (
          <video autoPlay muted loop playsInline style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", zIndex: 0, opacity: 0.45
          }}>
            <source src="/tarot-shuffle.mp4" type="video/mp4" />
          </video>
        )}

        {/* Subtly glowing blurred accents for depth */}
        {!isFool && (
          <>
            <div style={{ position: "absolute", top: "10%", left: "10%", width: 400, height: 400, background: accent, filter: "blur(120px)", opacity: 0.15, borderRadius: "50%", pointerEvents: "none", zIndex: 1 }} />
            <div style={{ position: "absolute", bottom: "10%", right: "10%", width: 500, height: 500, background: highlight, filter: "blur(150px)", opacity: 0.12, borderRadius: "50%", pointerEvents: "none", zIndex: 1 }} />
          </>
        )}

        {/* Gradient overlay */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 1,
          background: isFool
            ? "linear-gradient(105deg, rgba(5,3,12,0.88) 0%, rgba(5,3,12,0.5) 50%, rgba(5,3,12,0.7) 100%)"
            : "transparent",
          transition: "background 0.8s ease",
        }} />

        {/* Grain texture */}
        <div style={{ position: "absolute", inset: 0, zIndex: 2, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`, opacity: isFool ? 0.045 : 0.02, pointerEvents: "none" }} />

        {/* Split content */}
        <div className="hero-grid" style={{
          position: "relative", zIndex: 3,
          width: "100%", maxWidth: 1280, margin: "0 auto",
          padding: isMobile ? "0 1.5rem" : "0 4rem",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1.2fr",
          gap: isMobile ? "3rem" : "6rem",
          alignItems: "center",
          textAlign: isMobile ? "center" : "left",
        }}>

          {/* LEFT — Photo */}
          <motion.div
            className="hero-photo-wrap"
            initial={{ opacity: 0, x: isMobile ? 0 : -40, y: isMobile ? 20 : 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16,1,0.3,1] }}
            style={{
              width: "100%", maxWidth: isMobile ? 320 : 460, aspectRatio: "4/5", 
              margin: isMobile ? "0 auto" : "0 auto",
              position: "relative", borderRadius: "16px", overflow: "hidden",
              order: isMobile ? 2 : 1,
            }}
          >
            <img
              src="/deepak-photo.jpg"
              alt="Deepak Singh"
              style={{
                width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center",
                display: "block",
                filter: isFool ? "contrast(1.1) brightness(0.95)" : "grayscale(20%) contrast(1.1) brightness(0.9)",
                transition: "filter 1s ease",
              }}
            />
            {/* Subtle inner shadow / overlay */}
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${bg} 0%, transparent 40%)`, opacity: 0.8 }} />
          </motion.div>

          {/* RIGHT — Content */}
          <div style={{ order: isMobile ? 1 : 2 }}>
            <motion.p
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{
                fontFamily: bodyFont,
                fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase",
                fontWeight: 600, color: highlight, marginBottom: "1.2rem",
              }}
            >
               Hi, I'm
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.16,1,0.3,1] }}
              style={{
                fontFamily: headingFont, fontWeight: headingWeight, fontStyle: headingStyle,
                fontSize: "clamp(2.8rem, 8vw, 6.5rem)",
                lineHeight: 1.05, letterSpacing: "-0.02em",
                color: textPrimary, marginBottom: "0.5rem",
                textShadow: isFool ? "none" : `0 0 40px rgba(229, 231, 235, 0.15)`,
                position: "relative",
              }}
            >
              {isFool ? "The Fool" : "Deepak Singh"}
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.16,1,0.3,1] }}
              style={{
                fontFamily: bodyFont, fontWeight: isFool ? 400 : 500, fontStyle: isFool ? "italic" : "normal",
                fontSize: "clamp(1.1rem, 4vw, 2rem)",
                color: textSecondary, marginBottom: "1.8rem",
              }}
            >
              {isFool ? "Vibe Coder · Builder" : "Backend / ML Developer"}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.6, ease: [0.16,1,0.3,1] }}
              style={{
                fontFamily: bodyFont, fontSize: "clamp(1.05rem, 4vw, 1.25rem)",
                lineHeight: 1.6, color: textSecondary, maxWidth: 540,
                margin: isMobile ? "0 auto 3rem" : "0 0 3rem",
                whiteSpace: "pre-line",
              }}
            >
              {isFool 
                ? "The wise hesitate.\nThe Fool builds, ships, and pushes to production." 
                : "learning how to Build scalable AI systems and solving real-world computing problems. Focused on high-performance backends and intelligent algorithms."}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7 }}
              style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap", justifyContent: isMobile ? "center" : "flex-start" }}
            >
              <PrimaryBtn accent={accent} highlight={highlight} onClick={() => scrollTo("projects")}>View Work</PrimaryBtn>
              <SecondaryBtn border={border} textPrimary={textPrimary} href="https://github.com/wonders-why" target="_blank">GitHub</SecondaryBtn>
            </motion.div>
          </div>
        </div>

        {/* Scroll cue */}
        <motion.div
          animate={{ y: [0, 10, 0] }} transition={{ duration: 2.5, repeat: Infinity }}
          style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", zIndex: 4 }}
        >
          <div style={{ width: 1, height: 56, background: `linear-gradient(to bottom, ${accent}66, transparent)` }} />
        </motion.div>
      </section>

      {/* ══ ABOUT ME ════════════════════════════════════════════════ */}
      <section id="about" style={{ padding: isMobile ? "5rem 1.5rem" : "8rem 4rem", background: bg2, borderTop: `1px solid ${border}` }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Reveal>
            <SectionHeader label="01" heading="About Me" accent={accent} isFool={isFool} headingFont={headingFont} textPrimary={textPrimary} />
          </Reveal>
          
          <div className="about-grid" style={{ 
            display: "grid", 
            gridTemplateColumns: isMobile ? "1fr" : "1fr 300px", 
            gap: isMobile ? "3rem" : "4rem", 
            marginTop: "3rem", 
            alignItems: "center" 
          }}>
            <Reveal delay={0.1}>
              <p style={{ fontFamily: bodyFont, fontSize: isMobile ? "1.05rem" : "1.15rem", lineHeight: 1.8, color: textSecondary, marginBottom: "1.5rem" }}>
                {isFool 
                   ? "I’m a builder driven by curiosity and instinct — what I call vibe coding. My approach is influenced by the archetype of The Fool: someone who explores, experiments, and creates without overthinking."
                   : "I am a third-year BCA student at Rayat Bahra University, driven by a deep technical curiosity to understand how intelligent systems work under the hood. My development philosophy centers on strong system architecture, clean abstraction boundaries, and writing reliable code."}
              </p>
              <p style={{ fontFamily: bodyFont, fontSize: isMobile ? "1.05rem" : "1.15rem", lineHeight: 1.8, color: textSecondary, whiteSpace: "pre-line" }}>
                {isFool 
                   ? "While others wait for certainty, I focus on execution — building real systems, testing ideas, and learning through action.\n\nI work across full-stack development, with a growing focus on backend systems and machine learning."
                   : "Whether it's deploying conversational AI agents, optimizing PostgreSQL schemas, or mapping algorithms to recommend anime, I focus on building software that genuinely delivers value and performance. Unhired and relentlessly leveling up."}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(auto-fit, minmax(200px, 1fr))" : "1fr", gap: "1.5rem" }}>
                {currentStats.map((stat, i) => (
                  <div key={i} style={{ padding: "1.5rem", background: "rgba(255,255,255,0.02)", borderRadius: 12, border: `1px solid ${border}` }}>
                    <p style={{ fontFamily: headingFont, fontSize: stat.value.length > 20 ? "1.2rem" : "2rem", fontWeight: 700, color: textPrimary, marginBottom: "0.25rem", lineHeight: 1.3 }}>{stat.value}</p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: textSecondary, fontWeight: 600 }}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ PROJECTS ══════════════════════════════════════════════ */}
      <section id="projects" style={{ padding: isMobile ? "5rem 1.5rem" : "8rem 4rem", maxWidth: 1280, margin: "0 auto", overflowX: "hidden" }}>
        <Reveal>
          <SectionHeader label="02" heading="Projects" accent={accent} isFool={isFool} headingFont={headingFont} textPrimary={textPrimary} />
        </Reveal>

        {/* --- INFINITE MARQUEE --- */}
        {!isFool && (
          <Reveal delay={0.1}>
            <div style={{ position: "relative", width: "100%", overflow: "hidden", marginTop: "2rem", marginBottom: isMobile ? "2rem" : "4rem" }}>
              {/* Fade edges */}
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "100px", background: `linear-gradient(to right, ${bg2}, transparent)`, zIndex: 10, pointerEvents: "none" }} />
              <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "100px", background: `linear-gradient(to left, ${bg2}, transparent)`, zIndex: 10, pointerEvents: "none" }} />
              
              <div className="marquee-track" style={{ display: "flex", width: "fit-content", gap: "2rem", animation: "marquee 20s linear infinite" }}
                onMouseEnter={e => e.currentTarget.style.animationPlayState = 'paused'}
                onMouseLeave={e => e.currentTarget.style.animationPlayState = 'running'}
              >
                {[...PROJECTS, ...PROJECTS, ...PROJECTS, ...PROJECTS].map((p, i) => (
                  <a key={i} href={p.viewLink || "#"} style={{
                    padding: isMobile ? "12px 24px" : "16px 32px", borderRadius: 40, border: `1px solid ${border}`,
                    background: "rgba(255,255,255,0.02)", color: textSecondary, textDecoration: "none",
                    fontFamily: headingFont, fontSize: isMobile ? "1rem" : "1.2rem", fontWeight: 600, whiteSpace: "nowrap",
                    transition: "all 0.3s", cursor: "pointer", display: "inline-block"
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = textPrimary; e.currentTarget.style.borderColor = accent; }}
                  onMouseLeave={e => { e.currentTarget.style.color = textSecondary; e.currentTarget.style.borderColor = border; }}
                  >
                    {p.title} ↗
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(400px, 1fr))", 
          gap: isMobile ? "1.5rem" : "2.5rem", 
          marginTop: isFool ? (isMobile ? "2rem" : "4rem") : "1rem" 
        }}>
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <ProjectCard project={p} accent={accent} highlight={highlight} bg2={bg2} border={border} textMuted={textMuted} textSecondary={textSecondary} textPrimary={textPrimary} headingFont={headingFont} bodyFont={bodyFont} isMobile={isMobile} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ SKILLS & TECH STACK ══════════════════════════════════════════════ */}
      <section id="skills" style={{ background: bg2, borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}` }}>
        <div style={{ padding: isMobile ? "5rem 1.5rem" : "8rem 4rem", maxWidth: 1280, margin: "0 auto" }}>
          <Reveal>
            <SectionHeader label="03" heading="Tech Stack" accent={accent} isFool={isFool} headingFont={headingFont} textPrimary={textPrimary} />
          </Reveal>
          
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: isMobile ? "repeat(auto-fit, minmax(100%, 1fr))" : "repeat(auto-fit, minmax(260px, 1fr))", 
            gap: "1.5rem", 
            marginTop: "4rem" 
          }}>
            {currentSkills.map((grp, gi) => (
              <Reveal key={grp.label} delay={gi * 0.1}>
                <SkillGroup group={grp} accent={accent} border={border} textSecondary={textSecondary} textPrimary={textPrimary} bg={bg} bodyFont={bodyFont} isMobile={isMobile} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CONTACT ════════════════════════════════════════════ */}
      <section id="contact" style={{ padding: isMobile ? "6rem 1.5rem" : "10rem 4rem", textAlign: "center" }}>
        <Reveal>
          <SectionHeader label="04" heading="Let's Build" accent={accent} isFool={isFool} headingFont={headingFont} textPrimary={textPrimary} align="center" />
        </Reveal>
        <Reveal delay={0.1}>
          <p style={{ fontFamily: bodyFont, fontSize: isMobile ? "1.1rem" : "1.2rem", color: textSecondary, marginBottom: "3rem", maxWidth: 500, margin: "0 auto 3rem", lineHeight: 1.6 }}>
            {isFool 
               ? "Seeking curious minds who prefer building over overthinking. If you’re creating, experimenting, or pushing ideas into reality — we’ll get along."
               : "Currently seeking internship and junior developer opportunities. If you're looking for a backend engineer who thinks deeply about data and performance, my inbox is open."}
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <a href="mailto:deepakgariya987@gmail.com" style={{
            fontFamily: headingFont, fontSize: isMobile ? "1.2rem" : "1.5rem", fontWeight: 600, 
            color: textPrimary, textDecoration: "none",
            borderBottom: `2px solid ${accent}`, paddingBottom: 6,
            display: "inline-block", transition: "all 0.3s",
          }}
          onMouseEnter={e => { e.currentTarget.style.color = accent; }}
          onMouseLeave={e => { e.currentTarget.style.color = textPrimary; }}
          >
            deepakgariya987@gmail.com
          </a>
        </Reveal>
        
        <Reveal delay={0.3}>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "4rem", flexWrap: "wrap" }}>
            {[
              { label: "GitHub", href: "https://github.com/wonders-why" },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/wonders-why/" },
            ].map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" style={{
                fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600,
                color: textSecondary, textDecoration: "none", padding: isMobile ? "12px 20px" : "12px 28px",
                border: `1px solid ${border}`, borderRadius: 8, transition: "all 0.3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.color = textPrimary; e.currentTarget.style.borderColor = accent; e.currentTarget.style.background = "rgba(59,130,246,0.05)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = textSecondary; e.currentTarget.style.borderColor = border; e.currentTarget.style.background = "transparent"; }}
              >{label}</a>
            ))}
          </div>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer style={{
        display: "flex", justifyContent: isMobile ? "center" : "space-between",
        textAlign: isMobile ? "center" : "left",
        padding: isMobile ? "2rem 1.5rem" : "3rem 4rem", background: bg2,
        fontFamily: bodyFont, fontSize: 11, letterSpacing: "0.05em", color: textMuted,
        flexDirection: isMobile ? "column" : "row",
        gap: "1rem", borderTop: `1px solid ${border}`
      }}>
        <span>© 2026 {isFool ? "The Fool" : "Deepak Singh"}. All rights reserved.</span>
        <span>Built with React & Framer Motion</span>
      </footer>
    </div>
  );
}

// --- SUB-COMPONENTS -----------------------------------------------

function SectionHeader({ label, heading, accent, isFool, headingFont, textPrimary, align="left" }) {
  return (
    <div style={{ marginBottom: "2rem", textAlign: align }}>
      <p style={{ 
        fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, 
        letterSpacing: "0.15em", textTransform: "uppercase", 
        color: accent, marginBottom: "1rem" 
      }}>{label}</p>
      <h2 style={{
        fontFamily: headingFont, fontWeight: isFool ? 400 : 700, fontStyle: isFool ? "italic" : "normal",
        fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.1, letterSpacing: "-0.02em",
        color: textPrimary, margin: 0,
      }}>{heading}</h2>
    </div>
  );
}

function PrimaryBtn({ children, accent, highlight, onClick }) {
  const [hv, setHv] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHv(true)}
      onMouseLeave={() => setHv(false)}
      style={{
        fontFamily: "'Inter', sans-serif", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600,
        padding: "16px 32px", borderRadius: "8px", border: "none",
        background: `linear-gradient(135deg, ${accent}, ${highlight})`,
        color: "#fff", cursor: "pointer",
        boxShadow: hv ? `0 12px 30px ${accent}66` : `0 4px 15px ${accent}40`,
        transform: hv ? "translateY(-2px) scale(1.02)" : "translateY(0) scale(1)",
        transition: "all 0.3s ease",
      }}
    >{children}</button>
  );
}

function SecondaryBtn({ children, border, textPrimary, href, target }) {
  const [hv, setHv] = useState(false);
  return (
    <a
      href={href} target={target} rel={href ? "noreferrer" : undefined}
      onMouseEnter={() => setHv(true)}
      onMouseLeave={() => setHv(false)}
      style={{
        fontFamily: "'Inter', sans-serif", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600,
        padding: "16px 32px", borderRadius: "8px", border: `1px solid ${border}`,
        background: hv ? "rgba(255,255,255,0.03)" : "transparent",
        color: textPrimary, cursor: "pointer", textDecoration: "none", display: "inline-block",
        transform: hv ? "translateY(-2px) scale(1.02)" : "translateY(0) scale(1)",
        boxShadow: hv ? `0 10px 30px rgba(0,0,0,0.2)` : "none",
        transition: "all 0.3s ease",
        textAlign: "center"
      }}
    >{children}</a>
  );
}

function ProjectCard({ project, accent, highlight, bg2, border, textMuted, textSecondary, textPrimary, headingFont, bodyFont, isMobile }) {
  const [hv, setHv] = useState(false);
  return (
    <div onMouseEnter={() => setHv(true)} onMouseLeave={() => setHv(false)}
      style={{
        padding: isMobile ? "2rem" : "2.5rem",
        background: hv ? "rgba(255,255,255,0.03)" : bg2,
        backdropFilter: "blur(12px)",
        border: `1px solid ${hv ? accent + "66" : border}`,
        borderRadius: "16px",
        position: "relative", overflow: "hidden",
        transform: hv ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hv ? `0 24px 50px rgba(0,0,0,0.3)` : "0 4px 20px rgba(0,0,0,0.1)",
        transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
        display: "flex", flexDirection: "column", height: "100%",
      }}
    >
      {/* Top accent line */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(to right, ${accent}, ${highlight})`, opacity: hv ? 1 : 0, transition: "opacity 0.4s" }} />

      <h3 style={{
        fontFamily: headingFont, fontWeight: 600, fontSize: isMobile ? "1.4rem" : "1.6rem",
        color: textPrimary, marginBottom: "1rem", transition: "color 0.4s",
      }}>{project.title}</h3>

      <p style={{ 
        fontFamily: bodyFont, fontSize: isMobile ? "1rem" : "1.1rem", color: textSecondary, 
        lineHeight: 1.6, marginBottom: "2rem", flexGrow: 1 
      }}>{project.desc}</p>

      {/* Tech Stack */}
      <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", marginBottom: "2rem" }}>
        {project.tags.map(t => (
          <span key={t} style={{ 
            fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: "0.05em", fontWeight: 500, textTransform: "uppercase",
            padding: "4px 10px", color: textMuted, border: `1px solid ${border}`,
            background: "rgba(255,255,255,0.02)", borderRadius: "6px" 
          }}>{t}</span>
        ))}
      </div>

      {/* Links container */}
      <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginTop: "2rem", flexWrap: isMobile ? "wrap" : "nowrap" }}>
        <a href={project.viewLink || "#"} style={{
           fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
           color: hv ? "#fff" : textPrimary, textDecoration: "none",
           padding: "10px 20px", background: hv ? accent : "transparent",
           border: `1px solid ${hv ? accent : border}`, borderRadius: 6,
           transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
           transform: hv ? "scale(1.05)" : "scale(1)",
           boxShadow: hv ? `0 8px 20px ${accent}40` : "none",
           width: isMobile ? "100%" : "auto",
           textAlign: "center"
        }}>
          View Project
        </a>
        <a href={project.link} target="_blank" rel="noreferrer" style={{
           fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
           color: hv ? textPrimary : textSecondary, textDecoration: "none",
           display: "inline-flex", alignItems: "center", gap: "0.5rem",
           transition: "color 0.3s",
           width: isMobile ? "100%" : "auto",
           justifyContent: "center"
        }}>
          Source <span>↗</span>
        </a>
      </div>
    </div>
  );
}

function SkillGroup({ group, accent, border, textSecondary, textPrimary, bg, bodyFont, isMobile }) {
  const [hv, setHv] = useState(false);
  return (
    <div 
      onMouseEnter={() => setHv(true)} onMouseLeave={() => setHv(false)}
      style={{ 
        padding: isMobile ? "1.5rem" : "2.5rem", 
        border: `1px solid ${hv ? accent + "55" : border}`, 
        background: hv ? "rgba(255,255,255,0.02)" : bg, 
        transition: "all 0.3s ease",
        borderRadius: "16px",
      }}
    >
      <p style={{ 
        fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", 
        color: textPrimary, marginBottom: "2rem" 
      }}>{group.label}</p>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {group.items.map(skill => (
          <div key={skill} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: hv ? accent : border, transition: "background 0.3s" }} />
            <span style={{ fontFamily: bodyFont, fontSize: isMobile ? "1rem" : "1.1rem", color: textSecondary }}>
              {skill}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function NavBtn({ id, label, active, onClick, textPrimary, textSecondary, bodyFont, isFool, accent }) {
  const [hv, setHv] = useState(false);
  
  return (
    <button
      onClick={() => onClick(id)}
      onMouseEnter={() => setHv(true)}
      onMouseLeave={() => setHv(false)}
      style={{
        position: "relative",
        fontFamily: bodyFont,
        fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600,
        background: "none", border: "none", cursor: "pointer",
        color: (active || hv) ? textPrimary : textSecondary,
        transition: isFool ? "none" : "color 0.4s",
        padding: "8px 0",
        animation: (isFool && hv) ? "chaoticHover 0.12s infinite" : "none",
        textShadow: (isFool && hv) ? `2px 0 ${accent}, -2px 0 #0ff` : "none"
      }}
    >
      {label}
      
      {/* Elegant Active Indicator */}
      {!isFool && active && (
        <motion.div
          layoutId="navIndicator"
          style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
            background: accent,
            boxShadow: `0 0 8px ${accent}`
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}

      {/* Elegant Hover Indicator */}
      {!isFool && !active && hv && (
        <motion.div
           initial={{ scaleX: 0, opacity: 0 }}
           animate={{ scaleX: 1, opacity: 1 }}
           exit={{ scaleX: 0, opacity: 0 }}
           style={{
             position: "absolute", bottom: 0, left: "20%", right: "20%", height: 1,
             background: textSecondary, transformOrigin: "center"
           }}
           transition={{ duration: 0.2 }}
        />
      )}
    </button>
  );
}

// --- CSS ----------------------------------------------------------

function css(accent, bg, border, isFool) {
  return `
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&display=swap');
    *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
    html { scroll-behavior:smooth; }
    body { overflow-x:hidden; background:${bg}; transition:background 0.8s; }
    button { font:inherit; }
    section[id] { scroll-margin-top:80px; }

    ::selection { background: ${accent}44; color: #fff; }

    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(calc(-50% - 1rem)); }
    }

    @keyframes chaoticHover {
      0% { transform: translate(0, 0) scale(1) rotate(0); }
      25% { transform: translate(1px, -1px) scale(1.04) rotate(1deg); filter: contrast(1.5); }
      50% { transform: translate(-2px, 1px) scale(0.96) rotate(-1deg); filter: brightness(1.2); }
      75% { transform: translate(1px, 2px) scale(1.02) rotate(2deg); filter: invert(0.1); }
      100% { transform: translate(0, 0) scale(1) rotate(0); }
    }

    @media (max-width:768px) {
      .hero-grid { grid-template-columns:1fr !important; gap: 3rem !important; }
      .about-grid { grid-template-columns:1fr !important; }
      .hero-photo-wrap { max-width:320px !important; margin:0 auto !important; }
      
      /* Hide scroll cue on small mobiles to save space */
      @media (max-height: 600px) {
        div[style*="bottom: 36px"] { display: none; }
      }
    }
  `;
}
