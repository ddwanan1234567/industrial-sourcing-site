"use client";

import { useEffect, useMemo, useState, type KeyboardEvent } from "react";

type DetailItem = {
  title: string;
  copy: string;
  detail: string;
};

type DialogState = {
  eyebrow: string;
  title: string;
  copy: string;
} | null;

const email = "metalprototypelab@gmail.com"; // Edit: primary inquiry email
const linkedInUrl = "https://www.linkedin.com/in/ding-lilac-52384041b/"; // Edit: LinkedIn URL

const navItems = [
  ["Home", "home"],
  ["Cases", "cases"],
  ["Capabilities", "capabilities"],
  ["Gallery", "gallery"],
  ["Materials", "materials"],
  ["Applications", "applications"],
  ["Part Types", "use-cases"],
  ["Process", "process"],
  ["Contact", "contact"]
];

const capabilities: DetailItem[] = [
  {
    title: "Complex Precision Parts",
    copy: "Review support for complex metal components and engineered requirements.",
    detail: "Share drawings, CAD files, material, quantity and application notes so the project can be reviewed before quotation."
  },
  {
    title: "Prototype & Low-Volume Production",
    copy: "Support for prototypes, functional samples, and small-batch parts.",
    detail: "Useful when machining, tooling, or geometry constraints make conventional routes harder to evaluate early."
  },
  {
    title: "DFM / Manufacturability Review",
    copy: "Early review of geometry, material, supports, and inspection needs.",
    detail: "Part geometry, material choice, support strategy, post-processing and inspection needs can be discussed."
  },
  {
    title: "Quote Coordination",
    copy: "Clear quotation inputs for material, quantity, process route, and lead time.",
    detail: "Inquiry coordination helps international buyers prepare clear technical inputs for manufacturing partners."
  },
  {
    title: "Post-Processing Coordination",
    copy: "Surface finish, heat treatment, machining, and inspection planning where applicable.",
    detail: "Surface finish, heat treatment, machining or other follow-up steps depend on part requirements and review."
  },
  {
    title: "International Project Communication",
    copy: "English-language inquiry handling and project follow-up for overseas teams.",
    detail: "Lilac Ding supports international inquiry communication and project information collection."
  }
];

const caseHighlights = [
  {
    title: "Large TC4 Lattice Structure",
    material: "TC4 Titanium",
    specs: ["Size: 657 x 168 x 678 mm", "Layer thickness: 0.06 mm", "Build time: Approx. 300 h"],
    detail:
      "A large-format titanium lattice structure showing the type of complex, lightweight geometry that should be reviewed through CAD and manufacturing constraints before quotation."
  },
  {
    title: "GH4099 Engine Model",
    material: "GH4099 High-Temperature Alloy",
    specs: ["Size: Approx. 400 x 200 x 200 mm", "Build time: Approx. 50 h", "Weight: Approx. 13 kg"],
    detail:
      "A high-temperature alloy demonstration project for complex metal geometry. Final material route, inspection, and feasibility still depend on the submitted drawing."
  },
  {
    title: "316L Impeller Batch Build",
    material: "316L Stainless Steel",
    specs: ["Size: Approx. 200 x 200 x 150 mm", "Quantity: 4 parts in one build", "Build time: Approx. 200 h", "Layer thickness: 0.06 mm", "Full-build dimensional accuracy: +/-0.1 mm"],
    detail:
      "A stainless steel batch-build reference for small-volume production planning. Build orientation, support strategy, and finishing should be reviewed from actual CAD files."
  }
];

const galleryItems = [
  {
    title: "Titanium lightweight component",
    caption: "Weight-saving geometry for precision review.",
    tone: "titanium",
    detail: "Useful for lightweight brackets, structural forms, and complex shapes where conventional machining may limit design freedom."
  },
  {
    title: "Stainless steel functional prototype",
    caption: "Durable prototype parts for fit and function.",
    tone: "stainless",
    detail: "Suitable for robust prototype discussions, industrial components, fixtures, and low-volume functional part review."
  },
  {
    title: "Copper alloy thermal component",
    caption: "Thermal-fluid part discussions where suitable.",
    tone: "copper",
    detail: "Copper-related feasibility depends strongly on geometry, thermal requirements, and post-processing expectations."
  },
  {
    title: "Aluminum complex structure",
    caption: "Lightweight forms with complex internal features.",
    tone: "aluminum",
    detail: "Best reviewed when the CAD file, target strength, surface finish, and lightweight requirements are provided together."
  },
  {
    title: "Medical prototype component",
    caption: "Development-stage components where applicable.",
    tone: "medical",
    detail: "For development-stage prototype discussions only. Project-specific standards, inspection, and compliance requirements must be stated clearly."
  },
  {
    title: "Marine precision part",
    caption: "Civil marine and shipbuilding part inquiries.",
    tone: "marine",
    detail: "Relevant for civil marine and offshore part inquiries where geometry, environment, and material requirements need early review."
  },
  {
    title: "Post-processing surface finish",
    caption: "Follow-up finishing coordination by requirement.",
    tone: "finish",
    detail: "Heat treatment, machining, polishing, and other finishing needs should be confirmed before final quotation."
  },
  {
    title: "Dimensional inspection",
    caption: "Inspection needs discussed with drawings.",
    tone: "inspection",
    detail: "Inspection planning depends on drawing callouts, tolerance requirements, datum strategy, and the intended application."
  },
  {
    title: "Material sample display",
    caption: "Material options subject to technical review.",
    tone: "samples",
    detail: "Material availability and process route should be confirmed from the actual part geometry and working environment."
  }
];

const materials: DetailItem[] = [
  {
    title: "Titanium Alloys",
    copy: "Lightweight metal part options for suitable industrial and medical device prototyping needs.",
    detail: "Availability depends on part geometry, application environment and technical review."
  },
  {
    title: "Stainless Steels",
    copy: "Common choice for durable industrial precision components.",
    detail: "Material and inspection requirements can be coordinated based on drawings and project needs."
  },
  {
    title: "Aluminum Alloys",
    copy: "For lightweight industrial components where aluminum is technically suitable.",
    detail: "Material selection should be confirmed through part geometry and application review."
  },
  {
    title: "Copper Materials",
    copy: "For heat-transfer and copper-related industrial component discussions.",
    detail: "Copper feasibility depends strongly on geometry, thermal requirements and process review."
  },
  {
    title: "High-Temperature Alloys",
    copy: "For demanding thermal-fluid and industrial equipment component requirements.",
    detail: "Use depends on project conditions, material availability and technical review."
  }
];

const applications: DetailItem[] = [
  {
    title: "Robotics & Automation",
    copy: "Complex brackets, end-effectors, functional prototypes, and precision mechanical components.",
    detail: "Best fit depends on geometry, target material, quantity, and inspection requirements."
  },
  {
    title: "Industrial Machinery",
    copy: "Complex custom parts, tooling support, and engineered industrial components.",
    detail: "LPBF / SLM can help evaluate designs that need complex geometry or small-batch manufacturing."
  },
  {
    title: "Marine & Offshore",
    copy: "Civil marine, offshore engineering, and ship-related precision part discussions.",
    detail: "Suitable inquiries may include brackets, ducts, fixtures, replacement development, or complex low-volume parts."
  },
  {
    title: "Civil Aviation Manufacturing",
    copy: "Civil aviation component prototyping and precision manufacturing support where applicable.",
    detail: "All feasibility, material selection and compliance requirements must be reviewed project by project."
  },
  {
    title: "Medical Device Prototyping",
    copy: "Prototype and development support where project requirements allow.",
    detail: "No medical certification is implied. Project-specific requirements should be discussed before quotation."
  },
  {
    title: "Energy & Thermal-Fluid Equipment",
    copy: "Heat-transfer, thermal-fluid, and precision industrial energy component discussions.",
    detail: "Material and post-processing choices depend on drawings and intended operating environment."
  },
  {
    title: "Tooling & Fixtures",
    copy: "Tooling inserts, molds, fixtures, and process development support.",
    detail: "Send CAD and expected use conditions for manufacturability and quotation direction."
  }
];

const useCases = [
  "Lightweight Metal Structures",
  "Complex Internal Channels",
  "Custom Brackets & Fixtures",
  "Precision Prototypes",
  "Small-Batch Functional Parts",
  "Tooling Inserts"
];

const quoteChecklist = [
  "2D drawing or 3D CAD",
  "Material",
  "Quantity",
  "Tolerance / inspection requirements",
  "Surface finish / post-processing",
  "Application environment",
  "Target timeline",
  "Shipping destination"
];

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [dialog, setDialog] = useState<DialogState>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sections = navItems.map(([, id]) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0.12, 0.28, 0.5] }
    );
    sections.forEach((section) => section && observer.observe(section));

    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!dialog) return;
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setDialog(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [dialog]);

  const mailto = useMemo(
    () => `mailto:${email}?subject=Inquiry%20-%20Metal%20AM%20/%20SLM%20Project%20Review`,
    []
  );

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#05080d] text-white">
      <Header activeSection={activeSection} scrolled={scrolled} />
      <Hero mailto={mailto} />
      <CaseHighlights onOpen={setDialog} />
      <Capabilities onOpen={setDialog} />
      <CapabilityGallery mailto={mailto} onOpen={setDialog} />
      <Materials onOpen={setDialog} />
      <Applications onOpen={setDialog} />
      <UseCases />
      <Process />
      <QuoteChecklist />
      <FinalCta mailto={mailto} />
      <Footer />
      <FloatingActions mailto={mailto} scrolled={scrolled} />
      <DetailDialog dialog={dialog} onClose={() => setDialog(null)} />
    </main>
  );
}

function Header({ activeSection, scrolled }: { activeSection: string; scrolled: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition ${
        scrolled
          ? "border-white/10 bg-[#05080d]/82 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <a href="#home" className="group flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center border border-cyan-300/25 bg-cyan-200/10 text-sm font-black text-cyan-100 shadow-[0_0_30px_rgba(56,189,248,0.18)]">
            M
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-[0.16em] text-white/90">Metal Prototype Lab</span>
            <span className="hidden text-[10px] font-medium tracking-[0.08em] text-white/42 sm:inline">
              International inquiry & project coordination for YCJG Metal Additive Manufacturing
            </span>
          </span>
        </a>
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              className={`rounded-full px-3 py-2 text-xs font-medium transition ${
                activeSection === id ? "bg-cyan-300/12 text-cyan-100" : "text-white/58 hover:bg-white/7 hover:text-white"
              }`}
            >
              {label}
            </a>
          ))}
        </nav>
        <QuoteCta
          mailto={`mailto:${email}?subject=Inquiry%20-%20Metal%20AM%20/%20SLM%20Project%20Review`}
          className="hidden rounded-full border border-cyan-200/25 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#071016] transition hover:border-cyan-200 hover:bg-cyan-100 sm:inline-flex"
        >
          Send CAD for Review
        </QuoteCta>
        <button
          type="button"
          className="grid h-10 w-10 place-items-center border border-white/12 bg-white/[0.045] text-white/76 lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="relative h-3.5 w-5">
            <span className={`absolute left-0 h-px w-5 bg-current transition ${menuOpen ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 top-1.5 h-px w-5 bg-current transition ${menuOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`absolute left-0 h-px w-5 bg-current transition ${menuOpen ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
        </button>
      </div>
      {menuOpen ? (
        <div className="border-t border-white/10 bg-[#05080d]/96 px-4 py-4 shadow-[0_28px_80px_rgba(0,0,0,0.42)] backdrop-blur-xl lg:hidden">
          <nav className="mx-auto grid max-w-7xl grid-cols-2 gap-2">
            {navItems.map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                className={`border px-3 py-3 text-sm transition ${
                  activeSection === id ? "border-cyan-200/35 bg-cyan-200/10 text-cyan-100" : "border-white/10 bg-white/[0.035] text-white/70"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}

function Hero({ mailto }: { mailto: string }) {
  return (
    <section id="home" className="relative isolate min-h-screen overflow-hidden px-4 pt-28 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_20%,rgba(56,189,248,0.22),transparent_32%),radial-gradient(circle_at_20%_70%,rgba(239,68,68,0.12),transparent_34%),linear-gradient(135deg,#03050a_0%,#07111b_48%,#101820_100%)]" />
      <div className="industrial-grid absolute inset-0 -z-10 opacity-35" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 pb-20 pt-8 lg:grid-cols-[0.94fr_1.06fr] lg:pb-28 lg:pt-20">
        <div className="min-w-0">
          <Reveal>
            <div className="mb-5 inline-flex max-w-full items-center gap-3 border border-cyan-300/20 bg-cyan-200/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">
              <span className="h-2 w-2 bg-red-400 shadow-[0_0_18px_rgba(248,113,113,0.8)]" />
              International inquiry & project coordination for YCJG Metal Additive Manufacturing
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="max-w-5xl text-balance text-4xl font-semibold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl">
              Complex Metal Parts, From CAD Review to Small-Batch Production
            </h1>
          </Reveal>
          <Reveal delay={150}>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/68 sm:text-xl">
              LPBF / SLM manufacturing support for titanium, stainless steel, aluminum, copper, and high-temperature alloys.
              <span className="mt-3 block text-base text-white/56">
                For prototypes, complex precision parts, and low-volume production.
              </span>
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <QuoteCta className="premium-button" mailto={mailto}>
                Send CAD for Review
              </QuoteCta>
              <QuoteCta className="ghost-button" mailto={mailto}>
                Request a Quote
              </QuoteCta>
            </div>
          </Reveal>
          <div className="mt-9 flex flex-wrap gap-2">
            {["Drawing review", "DFM coordination", "Production follow-up", "International communication"].map((tag, index) => (
              <Reveal key={tag} delay={260 + index * 50}>
                <span className="inline-flex border border-white/10 bg-white/[0.045] px-3 py-2 text-xs font-medium uppercase tracking-[0.16em] text-white/70">
                  {tag}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
        <HeroScene />
      </div>
      <div className="absolute bottom-0 left-1/2 h-px w-[min(1100px,90vw)] -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-200/30 to-transparent" />
    </section>
  );
}

function CaseHighlights({ onOpen }: { onOpen: (dialog: DialogState) => void }) {
  return (
    <section id="cases" className="scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="section-eyebrow">Proof</p>
          <div className="mt-5 grid gap-5 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <h2 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">Selected Metal AM Case Highlights</h2>
            <p className="max-w-2xl text-base leading-8 text-white/56 lg:justify-self-end">
              Drawing review · DFM coordination · Production follow-up · International communication
            </p>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {caseHighlights.map((item, index) => (
            <Reveal key={item.title} delay={index * 70}>
              <button
                type="button"
                className="case-highlight-card w-full text-left"
                onClick={() => onOpen({ eyebrow: "Case Highlight", title: item.title, copy: item.detail })}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="text-sm font-semibold text-cyan-100/70">0{index + 1}</span>
                  <span className="h-2 w-2 bg-cyan-200 shadow-[0_0_18px_rgba(125,211,252,0.75)]" />
                </div>
                <h3 className="mt-10 text-2xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm font-semibold uppercase tracking-[0.16em] text-cyan-100/72">{item.material}</p>
                <dl className="mt-8 space-y-3">
                  {item.specs.map((spec) => (
                    <div key={spec} className="border-t border-white/10 pt-3">
                      <dd className="text-sm leading-6 text-white/62">{spec}</dd>
                    </div>
                  ))}
                </dl>
                <span className="mt-8 inline-flex text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100/76">Open case</span>
              </button>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 max-w-4xl text-sm leading-7 text-white/48">
          Project data shown for manufacturing capability reference. Final feasibility and specifications depend on drawing review.
        </p>
      </div>
    </section>
  );
}

function HeroScene() {
  return (
    <Reveal delay={180}>
      <div className="hero-stage relative mx-auto aspect-square w-full max-w-[620px] overflow-hidden border border-white/10 bg-[#08111a]/80 shadow-[0_40px_120px_rgba(0,0,0,0.48)]">
        <div className="laser-sweep" />
        <div className="powder-field">
          {Array.from({ length: 42 }, (_, index) => (
            <span
              key={index}
              style={
                {
                  "--x": `${(index * 37) % 100}%`,
                  "--y": `${(index * 61) % 100}%`,
                  "--d": `${(index % 9) * 0.25}s`
                } as React.CSSProperties
              }
            />
          ))}
        </div>
        <div className="part-assembly" aria-label="Abstract animated metal LPBF SLM part">
          <div className="ring ring-a" />
          <div className="ring ring-b" />
          <div className="ring ring-c" />
          <div className="hub" />
          <div className="brace brace-1" />
          <div className="brace brace-2" />
          <div className="brace brace-3" />
          <div className="brace brace-4" />
          <div className="lattice lattice-1" />
          <div className="lattice lattice-2" />
          <div className="lattice lattice-3" />
        </div>
        <div className="absolute bottom-6 left-6 right-6 grid gap-3 sm:grid-cols-3">
          {["Titanium", "Stainless", "Copper"].map((item) => (
            <div key={item} className="border border-white/10 bg-black/20 px-3 py-3 backdrop-blur">
              <p className="text-[10px] uppercase tracking-[0.22em] text-white/42">Material</p>
              <p className="mt-1 text-sm font-semibold text-white/82">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

function Capabilities({ onOpen }: { onOpen: (dialog: DialogState) => void }) {
  return (
    <Section id="capabilities" eyebrow="Capabilities" title="What We Support" copy="Short technical coordination for buyers who already have drawings, files, or a part requirement.">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {capabilities.map((item) => (
          <InfoCard key={item.title} item={item} eyebrow="Capability" onOpen={onOpen} />
        ))}
      </div>
    </Section>
  );
}

function CapabilityGallery({ mailto, onOpen }: { mailto: string; onOpen: (dialog: DialogState) => void }) {
  return (
    <section id="gallery" className="scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="section-eyebrow">Capability Gallery</p>
          <div className="mt-5 grid gap-5 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
            <h2 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl">
              Visual Direction for Precision Metal Parts
            </h2>
            <p className="max-w-2xl text-base leading-8 text-white/56 lg:justify-self-end">
              Representative civilian manufacturing categories for drawing review, material discussion and quote coordination.
            </p>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {galleryItems.map((item, index) => (
            <Reveal key={item.title} delay={index * 35}>
              <button
                type="button"
                className="gallery-card group w-full text-left"
                onClick={() => onOpen({ eyebrow: "Capability Gallery", title: item.title, copy: item.detail })}
              >
                <div className={`gallery-visual gallery-${item.tone}`} aria-hidden="true">
                  <span className="gallery-scan" />
                  <span className="gallery-part gallery-part-a" />
                  <span className="gallery-part gallery-part-b" />
                  <span className="gallery-part gallery-part-c" />
                  <span className="gallery-grid" />
                </div>
                <div className="flex items-start justify-between gap-4 p-5">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-white/54">{item.caption}</p>
                  </div>
                  <span className="mt-1 h-2 w-2 shrink-0 bg-cyan-200 shadow-[0_0_18px_rgba(125,211,252,0.75)]" />
                </div>
              </button>
            </Reveal>
          ))}
        </div>
        <Reveal delay={180}>
          <div className="mt-8 flex flex-col items-start justify-between gap-5 border border-cyan-200/16 bg-white/[0.035] p-5 sm:flex-row sm:items-center">
            <p className="max-w-2xl text-sm leading-7 text-white/58">
              Have a similar metal part requirement? Send files, material, quantity and application notes for review.
            </p>
            <QuoteCta className="premium-button shrink-0" mailto={mailto}>
              Send CAD for Review
            </QuoteCta>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Materials({ onOpen }: { onOpen: (dialog: DialogState) => void }) {
  return (
    <Section id="materials" eyebrow="Materials" title="Materials" copy="Titanium, stainless steel, copper, aluminum and other metal options for civilian precision components.">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {materials.map((item) => (
          <button
            key={item.title}
            className="group flex min-h-32 flex-col justify-between border border-white/10 bg-white/[0.045] p-5 text-left transition hover:-translate-y-1 hover:border-cyan-200/35 hover:bg-cyan-200/[0.075]"
            onClick={() => onOpen({ eyebrow: "Material", title: item.title, copy: item.detail })}
          >
            <span className="text-lg font-semibold text-white">{item.title}</span>
            <span className="mt-4 text-sm leading-6 text-white/56">{item.copy}</span>
          </button>
        ))}
      </div>
      <p className="mt-6 max-w-3xl text-sm leading-7 text-white/48">
        Available materials and process routes depend on geometry, application requirements, and technical review.
      </p>
    </Section>
  );
}

function Applications({ onOpen }: { onOpen: (dialog: DialogState) => void }) {
  return (
    <Section id="applications" eyebrow="Applications" title="Industrial Applications" copy="Focused on B2B part review for robotics, machinery, marine, civil aviation, medical prototyping, energy and tooling.">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {applications.map((item) => (
          <button
            key={item.title}
            className="group relative min-h-48 overflow-hidden border border-white/10 bg-[#0b1219] p-5 text-left transition hover:-translate-y-1 hover:border-cyan-200/35"
            onClick={() => onOpen({ eyebrow: "Application", title: item.title, copy: item.detail })}
          >
            <span className="absolute right-0 top-0 h-16 w-px bg-gradient-to-b from-cyan-200/80 to-transparent" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100/62">Civilian</span>
            <h3 className="mt-5 text-xl font-semibold text-white">{item.title}</h3>
            <p className="mt-4 text-sm leading-6 text-white/56">{item.copy}</p>
            <span className="mt-5 inline-flex text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100 opacity-70">View details</span>
          </button>
        ))}
      </div>
      <p className="mt-6 max-w-3xl text-sm leading-7 text-white/45">
        Education and research projects can also be reviewed when drawings, material targets, and test conditions are clear.
      </p>
    </Section>
  );
}

function UseCases() {
  return (
    <Section id="use-cases" eyebrow="Part review" title="Common Part Types We Review">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {useCases.map((item, index) => (
          <Reveal key={item} delay={index * 45}>
            <div className="case-card">
              <span className="text-sm font-semibold text-cyan-100/70">0{index + 1}</span>
              <h3 className="mt-8 text-2xl font-semibold">{item}</h3>
              <p className="mt-4 text-sm leading-6 text-white/52">
                Suitable fit depends on drawing review, material discussion and the intended application.
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Process() {
  const steps = [
    {
      title: "Send CAD / Drawing",
      copy: "2D drawing, 3D CAD, material, quantity, tolerance, and application notes."
    },
    {
      title: "DFM & Quote Review",
      copy: "Manufacturability, material, process route, inspection needs, and quotation."
    },
    {
      title: "Production & Follow-Up",
      copy: "Printing, post-processing, quality control, and shipment coordination."
    }
  ];

  return (
    <Section id="process" eyebrow="Process" title="From CAD to Production Follow-Up">
      <div className="grid gap-4 lg:grid-cols-3">
        {steps.map((step, index) => (
          <Reveal key={step.title} delay={index * 80}>
            <div className="relative min-h-72 border border-white/10 bg-white/[0.04] p-6">
              <div className="mb-12 flex items-center justify-between">
                <span className="text-6xl font-semibold text-white/10">0{index + 1}</span>
                <span className="h-px flex-1 bg-gradient-to-r from-cyan-200/40 to-transparent" />
              </div>
              <h3 className="text-2xl font-semibold">{step.title}</h3>
              <p className="mt-5 text-sm leading-7 text-white/58">{step.copy}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function QuoteChecklist() {
  const [selectedItems, setSelectedItems] = useState<string[]>(quoteChecklist.slice(0, 3));
  const selectedCopy = selectedItems.length ? selectedItems.join(", ") : "CAD files and project requirements";
  const dynamicMailto = `mailto:${email}?subject=Inquiry%20-%20Metal%20AM%20/%20SLM%20Project%20Review&body=${encodeURIComponent(
    `Hello Lilac,\n\nI would like to request a review for a metal AM project.\n\nI can provide: ${selectedCopy}.\n\nProject notes:\n`
  )}`;

  const toggleItem = (item: string) => {
    setSelectedItems((current) =>
      current.includes(item) ? current.filter((selected) => selected !== item) : [...current, item]
    );
  };

  return (
    <Section id="quote" eyebrow="Input checklist" title="What to Send for Quotation" copy="Clear files and requirements make review faster and more accurate.">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {quoteChecklist.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={selectedItems.includes(item)}
            className={`flex min-h-24 items-start gap-3 border p-4 text-left transition hover:-translate-y-1 ${
              selectedItems.includes(item)
                ? "border-cyan-200/42 bg-cyan-200/[0.08] text-white"
                : "border-white/10 bg-black/18 text-white/68 hover:border-white/20"
            }`}
            onClick={() => toggleItem(item)}
          >
            <span
              className={`mt-1 grid h-4 w-4 shrink-0 place-items-center border text-[8px] font-black leading-none ${
                selectedItems.includes(item) ? "border-cyan-200 bg-cyan-100 text-[#061016]" : "border-red-300/60 text-transparent"
              }`}
            >
              OK
            </span>
            <p className="text-sm leading-6 text-white/68">{item}</p>
          </button>
        ))}
      </div>
      <div className="mt-6 flex flex-col items-start justify-between gap-5 border border-cyan-200/16 bg-white/[0.035] p-5 sm:flex-row sm:items-center">
        <p className="max-w-2xl text-sm leading-7 text-white/58">
          Selected: <span className="text-cyan-100">{selectedCopy}</span>
        </p>
        <QuoteCta className="premium-button shrink-0" mailto={dynamicMailto}>
          Email Selected Items
        </QuoteCta>
      </div>
    </Section>
  );
}

function FinalCta({ mailto }: { mailto: string }) {
  return (
    <section id="contact" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden border border-cyan-200/18 bg-[linear-gradient(135deg,rgba(10,24,35,0.96),rgba(12,18,25,0.98))] p-6 shadow-[0_36px_120px_rgba(0,0,0,0.45)] sm:p-10 lg:p-14">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="section-eyebrow">Project Review</p>
            <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">Send CAD for Review</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/62">
              Send your drawing, material requirement, or part idea. We&apos;ll help review manufacturability, quotation inputs, and production follow-up needs.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <QuoteCta className="premium-button" mailto={mailto}>
                Send CAD for Review
              </QuoteCta>
              <a className="ghost-button" href={linkedInUrl} target="_blank" rel="noreferrer">
                Contact on LinkedIn
              </a>
            </div>
          </div>
          <div className="border border-white/10 bg-black/20 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-100/65">Contact for International Inquiries</p>
            <h3 className="mt-6 text-2xl font-semibold">Lilac Ding</h3>
            <p className="mt-2 text-white/62">International Inquiry Coordinator</p>
            <p className="mt-1 text-white/62">Metal Prototype Lab</p>
            <p className="mt-6 text-sm leading-7 text-white/62">
              Manufacturing partner: YCJG Metal Additive Manufacturing
              <br />
              Production base: Luoyang, Henan, China
            </p>
            <a className="mt-6 inline-flex text-cyan-100 underline-offset-4 hover:underline" href={`mailto:${email}`}>
              {email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 text-sm text-white/48 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-semibold text-white">Metal Prototype Lab</p>
          <p>International inquiry & project coordination for YCJG Metal Additive Manufacturing</p>
          <p>
            LinkedIn:{" "}
            <a className="text-cyan-100/80 hover:text-cyan-100" href={linkedInUrl} target="_blank" rel="noreferrer">
              {linkedInUrl}
            </a>
          </p>
        </div>
        <p className="max-w-xl leading-6">
          All project feasibility, material selection, and quotation details are subject to technical review.
        </p>
      </div>
    </footer>
  );
}

function Section({
  id,
  eyebrow,
  title,
  copy,
  children
}: {
  id: string;
  eyebrow: string;
  title: string;
  copy?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="section-eyebrow">{eyebrow}</p>
          <div className="mt-5 grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <h2 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">{title}</h2>
            {copy ? <p className="max-w-2xl text-base leading-8 text-white/56 lg:justify-self-end">{copy}</p> : null}
          </div>
        </Reveal>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

function InfoCard({
  item,
  eyebrow,
  onOpen
}: {
  item: DetailItem;
  eyebrow: string;
  onOpen: (dialog: DialogState) => void;
}) {
  return (
    <Reveal>
      <article className="group flex min-h-72 flex-col justify-between border border-white/10 bg-white/[0.045] p-6 transition hover:-translate-y-1 hover:border-cyan-200/35 hover:bg-cyan-200/[0.07]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100/58">{eyebrow}</p>
          <h3 className="mt-7 text-2xl font-semibold">{item.title}</h3>
          <p className="mt-5 text-sm leading-7 text-white/56">{item.copy}</p>
        </div>
        <button
          className="mt-8 w-fit text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100 transition group-hover:translate-x-1"
          onClick={() => onOpen({ eyebrow, title: item.title, copy: item.detail })}
        >
          View details
        </button>
      </article>
    </Reveal>
  );
}

function DetailDialog({ dialog, onClose }: { dialog: DialogState; onClose: () => void }) {
  if (!dialog) return null;

  const onPanelKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") onClose();
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 px-4 backdrop-blur-sm" onMouseDown={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-title"
        tabIndex={-1}
        className="w-full max-w-xl border border-cyan-200/20 bg-[#08111a] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.6)] outline-none sm:p-8"
        onMouseDown={(event) => event.stopPropagation()}
        onKeyDown={onPanelKey}
      >
        <div className="flex items-start justify-between gap-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100/65">{dialog.eyebrow}</p>
          <button className="border border-white/10 px-3 py-2 text-sm text-white/70 hover:bg-white/10" onClick={onClose}>
            Close
          </button>
        </div>
        <h2 id="detail-title" className="mt-8 text-3xl font-semibold">
          {dialog.title}
        </h2>
        <p className="mt-5 leading-8 text-white/62">{dialog.copy}</p>
        <button className="mt-8 text-sm font-semibold text-cyan-100 underline-offset-4 hover:underline" onClick={onClose}>
          Back to section
        </button>
      </div>
    </div>
  );
}

function FloatingActions({ mailto, scrolled }: { mailto: string; scrolled: boolean }) {
  return (
    <>
      <QuoteCta
        mailto={mailto}
        className="fixed bottom-8 right-8 z-30 hidden border border-cyan-200/30 bg-cyan-100 px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-[#061016] shadow-[0_18px_60px_rgba(34,211,238,0.22)] transition hover:bg-white lg:inline-flex"
      >
        Send CAD for Review
      </QuoteCta>
      {scrolled ? (
        <a
          href="#home"
          className="fixed bottom-8 left-8 z-30 hidden border border-white/10 bg-black/35 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/68 backdrop-blur transition hover:bg-white/10 lg:inline-flex"
        >
          Back to top
        </a>
      ) : null}
      <QuoteCta
        mailto={mailto}
        className="fixed inset-x-4 bottom-4 z-30 rounded-full bg-cyan-100 px-5 py-4 text-center text-xs font-black uppercase tracking-[0.2em] text-[#061016] shadow-[0_18px_60px_rgba(34,211,238,0.24)] lg:hidden"
      >
        Send CAD for Review
      </QuoteCta>
    </>
  );
}

function QuoteCta({
  children,
  className,
  mailto
}: {
  children: React.ReactNode;
  className: string;
  mailto: string;
}) {
  return (
    <a className={className} href={mailto}>
      {children}
    </a>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <div className="reveal" style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}
