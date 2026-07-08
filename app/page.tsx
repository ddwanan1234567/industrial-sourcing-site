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

const email = "metalprototype.lab@gmail.com"; // Edit: primary inquiry email
const linkedInUrl = "https://www.linkedin.com/in/ding-lilac-52384041b/"; // Edit: LinkedIn URL

const navItems = [
  ["Home", "home"],
  ["Capabilities", "capabilities"],
  ["Materials", "materials"],
  ["Applications", "applications"],
  ["Use Cases", "use-cases"],
  ["Process", "process"],
  ["Contact", "contact"]
];

const capabilities: DetailItem[] = [
  {
    title: "Custom Precision Parts",
    copy: "For complex metal components and engineered part requirements.",
    detail: "Share drawings, CAD files, material, quantity and application notes so the project can be reviewed before quotation."
  },
  {
    title: "Prototype & Small Batch",
    copy: "Support for early-stage prototypes and low-volume production needs.",
    detail: "Useful when machining, tooling, or geometry constraints make conventional routes harder to evaluate early."
  },
  {
    title: "DFM Review",
    copy: "Coordinate manufacturability review before quotation.",
    detail: "Part geometry, material choice, support strategy, post-processing and inspection needs can be discussed."
  },
  {
    title: "Quote Coordination",
    copy: "Clarify material, process, quantity, and production requirements.",
    detail: "Inquiry coordination helps international buyers prepare clear technical inputs for manufacturing partners."
  },
  {
    title: "Post-Processing Support",
    copy: "Coordinate follow-up processing steps where applicable.",
    detail: "Surface finish, heat treatment, machining or other follow-up steps depend on part requirements and review."
  },
  {
    title: "International Inquiry",
    copy: "Clear communication support for overseas project discussions.",
    detail: "Lilac Ding supports international inquiry communication and project information collection."
  }
];

const materials: DetailItem[] = [
  {
    title: "Titanium Alloys",
    copy: "Lightweight metal part options for suitable industrial and medical-related prototyping needs.",
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
  },
  {
    title: "More on Request",
    copy: "Additional material options can be discussed during project review.",
    detail: "Send the drawing and target application so options can be checked before quotation direction."
  }
];

const applications: DetailItem[] = [
  {
    title: "Shipbuilding & Marine",
    copy: "Civil marine, offshore engineering and ship-related precision part discussions.",
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
    title: "Industrial Machinery",
    copy: "Complex custom parts, tooling support and engineered industrial components.",
    detail: "LPBF / SLM can help evaluate designs that need complex geometry or small-batch manufacturing."
  },
  {
    title: "Energy Equipment",
    copy: "Thermal-fluid, heat-transfer and precision industrial energy-related component discussions.",
    detail: "Material and post-processing choices depend on drawings and intended operating environment."
  },
  {
    title: "Automotive Manufacturing",
    copy: "Prototype parts, fixtures, inserts and low-volume development requirements.",
    detail: "Best fit depends on geometry, target material and post-processing requirements."
  },
  {
    title: "Tooling & Molds",
    copy: "Tooling inserts, molds, fixtures and process development support.",
    detail: "Send CAD and expected use conditions for manufacturability and quotation direction."
  },
  {
    title: "Education & Research",
    copy: "Support for research, training and design validation projects.",
    detail: "Project scope, material requirements and intended test conditions can be reviewed before quotation."
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
  "2D drawing or 3D CAD file",
  "Material requirement",
  "Quantity",
  "Surface finish or post-processing needs",
  "Application environment",
  "Tolerance or inspection requirements if applicable",
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
      <Capabilities onOpen={setDialog} />
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
            Y
          </span>
          <span className="text-sm font-semibold tracking-[0.22em] text-white/90">YCJG Metal AM</span>
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
        <a
          href={`mailto:${email}?subject=Inquiry%20-%20Metal%20AM%20/%20SLM%20Project%20Review`}
          className="hidden rounded-full border border-cyan-200/25 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#071016] transition hover:border-cyan-200 hover:bg-cyan-100 sm:inline-flex"
        >
          Send Drawing
        </a>
      </div>
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
              Civil industrial metal AM
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="max-w-5xl text-balance text-5xl font-semibold leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-8xl">
              Metal LPBF / SLM for Custom Precision Parts
            </h1>
          </Reveal>
          <Reveal delay={150}>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/68 sm:text-xl">
              From drawing review to quotation coordination and small-batch production.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a className="premium-button" href={mailto}>
                Send Drawing
              </a>
              <a className="ghost-button" href="#contact">
                Request a Quote
              </a>
            </div>
          </Reveal>
          <div className="mt-9 flex flex-wrap gap-2">
            {["Precision Parts", "DFM Support", "Small-Batch Production", "International Inquiry"].map((tag, index) => (
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
        Available options depend on part geometry, application requirements, and technical review.
      </p>
    </Section>
  );
}

function Applications({ onOpen }: { onOpen: (dialog: DialogState) => void }) {
  return (
    <Section id="applications" eyebrow="Applications" title="Civilian Industrial Applications" copy="Focused on civil industrial buyers: shipbuilding, civil aviation, medical prototyping, machinery, energy, tooling and research.">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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
    </Section>
  );
}

function UseCases() {
  return (
    <Section id="use-cases" eyebrow="Use cases" title="Typical Use Cases" copy="Generic application examples, not customer case studies.">
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
      title: "Send Your Drawing",
      copy: "2D drawing, 3D CAD file, material requirement, quantity, or application notes."
    },
    {
      title: "Review & Quote Coordination",
      copy: "Coordinate manufacturability review, material discussion, and quotation direction."
    },
    {
      title: "Production Support",
      copy: "Support communication for printing, post-processing, quality control, and shipment follow-up."
    }
  ];

  return (
    <Section id="process" eyebrow="Process" title="From Drawing to Review">
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
  return (
    <Section id="quote" eyebrow="Input checklist" title="What to Send for Quotation" copy="Clear files and requirements make review faster and more accurate.">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {quoteChecklist.map((item) => (
          <div key={item} className="flex min-h-24 items-start gap-3 border border-white/10 bg-black/18 p-4">
            <span className="mt-1 h-2 w-2 shrink-0 bg-red-400 shadow-[0_0_16px_rgba(248,113,113,0.8)]" />
            <p className="text-sm leading-6 text-white/68">{item}</p>
          </div>
        ))}
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
            <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">Ready for Project Review?</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/62">
              Send your drawing, material requirement, or part idea. We&apos;ll help coordinate manufacturability review and quotation direction.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a className="premium-button" href={mailto}>
                Email Your Project
              </a>
              <a className="ghost-button" href={linkedInUrl} target="_blank" rel="noreferrer">
                Contact on LinkedIn
              </a>
            </div>
          </div>
          <div className="border border-white/10 bg-black/20 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-100/65">Contact for International Inquiries</p>
            <h3 className="mt-6 text-2xl font-semibold">Lilac Ding</h3>
            <p className="mt-2 text-white/62">International Inquiry Coordinator</p>
            <p className="mt-6 text-sm leading-7 text-white/62">
              YCJG Metal Additive Manufacturing
              <br />
              Luoyang Yingchuang Aurora Precision Manufacturing Co., Ltd.
              <br />
              Production Base: Luoyang, Henan, China
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
          <p className="font-semibold text-white">Lilac Ding</p>
          <p>International Inquiry Coordinator</p>
          <p>YCJG Metal Additive Manufacturing</p>
          <a className="mt-2 inline-flex text-cyan-100/80 hover:text-cyan-100" href={`mailto:${email}`}>
            {email}
          </a>
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
      <a
        href={mailto}
        className="fixed bottom-8 right-8 z-30 hidden border border-cyan-200/30 bg-cyan-100 px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-[#061016] shadow-[0_18px_60px_rgba(34,211,238,0.22)] transition hover:bg-white lg:inline-flex"
      >
        Send Drawing
      </a>
      {scrolled ? (
        <a
          href="#home"
          className="fixed bottom-8 left-8 z-30 hidden border border-white/10 bg-black/35 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/68 backdrop-blur transition hover:bg-white/10 lg:inline-flex"
        >
          Back to top
        </a>
      ) : null}
      <a
        href={mailto}
        className="fixed inset-x-4 bottom-4 z-30 rounded-full bg-cyan-100 px-5 py-4 text-center text-xs font-black uppercase tracking-[0.2em] text-[#061016] shadow-[0_18px_60px_rgba(34,211,238,0.24)] lg:hidden"
      >
        Send Drawing
      </a>
    </>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <div className="reveal" style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}
