import { useState, useEffect, useRef } from "react"
import section1Img from "@/imports/Gemini_Generated_Image_9kxxnr9kxxnr9kxx.jpg"
import section2Img from "@/imports/Untitled.png"
import section3Img from "@/imports/Azul-1.jpg"
import logoIcon from "@/imports/Frame.png"


/* ─── Scroll animation ─── */
function useScrollAnimation() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-animate]"))

    const reveal = (el: HTMLElement) => el.classList.add("is-visible")

    // Immediately reveal anything already in the viewport
    els.forEach((el) => {
      const r = el.getBoundingClientRect()
      if (r.top < window.innerHeight && r.bottom > 0) reveal(el)
    })

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { reveal(e.target as HTMLElement); io.unobserve(e.target) } }),
      { threshold: 0, rootMargin: "0px 0px -30px 0px" }
    )

    els.forEach((el) => { if (!el.classList.contains("is-visible")) io.observe(el) })
    return () => io.disconnect()
  }, [])
}

function useScrollY() {
  const [y, setY] = useState(0)
  useEffect(() => {
    const h = () => setY(window.scrollY)
    window.addEventListener("scroll", h, { passive: true })
    return () => window.removeEventListener("scroll", h)
  }, [])
  return y
}

/* ─── Animated counter ─── */
function useCounter(target: number, duration = 1400) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1)
        setVal(Math.floor(p * target))
        if (p < 1) requestAnimationFrame(tick)
        else setVal(target)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [target, duration])
  return { val, ref }
}

/* ─── Logo ─── */
function Logo({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-3 select-none">
      <img src={logoIcon} alt="Logo Dra. Hellen Oliveira"
        style={{ width: 52, height: 52, objectFit: "contain", display: "block" }} />
      <div className="leading-none" translate="no">
        <p className="text-[10px] font-bold tracking-widest uppercase mb-0.5"
          style={{ color: light ? "rgba(255,255,255,0.6)" : "#0D7C8D", fontFamily: "Nunito" }}>Dra.</p>
        <p className="text-[22px] font-bold leading-none"
          style={{ color: light ? "white" : "#063D47", fontFamily: "Fraunces" }}>Hellen</p>
        <p className="text-[18px] font-semibold italic leading-none mt-0.5"
          style={{ color: "#F2C84A", fontFamily: "Fraunces" }}>Oliveira</p>
      </div>
    </div>
  )
}

/* ─── Navbar ─── */
function Navbar() {
  const y = useScrollY()
  const solid = y > 60
  const scroll = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })

  return (
    <header className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={{
        background: solid ? "rgba(255,248,243,0.97)" : "transparent",
        backdropFilter: solid ? "blur(14px)" : "none",
        boxShadow: solid ? "0 1px 0 rgba(107,31,60,0.1)" : "none",
      }}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Logo light={!solid} />
        <nav className="hidden md:flex items-center gap-7">
          {[["Serviços","servicos"],["Como Funciona","como-funciona"],["A Médica","medica"],["Dúvidas","faq"]].map(([l,id])=>(
            <button key={id} onClick={()=>scroll(id)}
              className="text-sm font-semibold transition-opacity hover:opacity-50"
              style={{ color: solid ? "#063D47" : "white" }}>{l}</button>
          ))}
        </nav>
        <a href={WA} target="_blank" rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all hover:scale-105 active:scale-95"
          style={{ background: "#EF8050", color: "white" }}>
          <WAIcon size={16} color="white" /> Agendar
        </a>
      </div>
    </header>
  )
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col" style={{ background: "#0D7C8D" }}>
      {/* Ambient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.10]"
          style={{ background: "radial-gradient(circle, #F2C84A, transparent 70%)", transform: "translate(30%,-30%)" }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-[0.12]"
          style={{ background: "radial-gradient(circle, #EFA0B4, transparent 70%)", transform: "translate(-20%, 30%)" }} />
      </div>

      <div className="relative flex-1 max-w-6xl mx-auto w-full px-6 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-0 items-center pt-20 lg:pt-0 z-10">
        {/* Copy */}
        <div className="py-20 lg:py-0 order-2 lg:order-1 pr-0 lg:pr-24">
          <div data-animate className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-8"
            style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.85)", border: "1px solid rgba(255,255,255,0.2)" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#EFA0B4" }} />
            <span translate="no">Dra. Hellen Oliveira · CRM-PR 63225</span>
          </div>

          <h1 data-animate data-delay="100"
            className="text-4xl lg:text-5xl xl:text-[3.4rem] font-bold leading-[1.12] mb-6"
            style={{ fontFamily: "Fraunces", color: "white" }}>
            Atendimento médico para{" "}
            <em className="not-italic" style={{ color: "#F2C84A" }}>adultos e crianças</em>,
            {" "}onde você estiver.
          </h1>

          <p data-animate data-delay="200" className="text-lg leading-relaxed mb-9"
            style={{ color: "rgba(255,255,255,0.68)" }}>
            Consultas online com a{" "}
            <strong style={{ color: "white" }} translate="no">Dra. Hellen Oliveira</strong>, com atendimento
            humanizado, seguro e prático, sem filas ou deslocamento.
          </p>

          {/* Benefit pills */}
          <div data-animate data-delay="250" className="flex flex-wrap gap-2.5 mb-10">
            {[
              { l: "Adultos e crianças", c: "#EFA0B4" },
              { l: "100% online", c: "#F2C84A" },
              { l: "Receitas e atestados", c: "#EF8050" },
              { l: "Sem filas", c: "#8AAF9B" },
            ].map(({ l, c }) => (
              <span key={l} className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold"
                style={{ background: `${c}1A`, color: c, border: `1px solid ${c}33` }}>
                ✓ {l}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div data-animate data-delay="300" className="flex flex-col sm:flex-row gap-3">
            <a href={WA} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl font-bold text-[15px] transition-all hover:scale-[1.03] active:scale-95"
              style={{ background: "#EF8050", color: "white", boxShadow: "0 8px 30px rgba(239,128,80,0.45)" }}>
              <WAIcon size={20} color="white" />
              AGENDAR MINHA CONSULTA
            </a>
            <button onClick={() => document.getElementById("servicos")?.scrollIntoView({ behavior: "smooth" })}
              className="flex items-center justify-center gap-2 px-7 py-4 rounded-2xl font-bold text-[15px] transition-all hover:scale-[1.03] active:scale-95"
              style={{ border: "1.5px solid rgba(255,255,255,0.25)", color: "white" }}>
              Saiba mais ↓
            </button>
          </div>

          <p data-animate data-delay="400" className="text-xs mt-4" style={{ color: "rgba(255,255,255,0.35)" }}>
            Agendamento rápido · Atendimento personalizado
          </p>
        </div>

        {/* Doctor photo */}
        <div className="order-1 lg:order-2 absolute inset-y-0 right-0 hidden lg:flex items-end justify-end pointer-events-none"
          style={{ width: "44%" }}>
          <img src={section1Img} alt="Dra. Hellen Oliveira"
            className="w-full h-full object-cover object-top" />
        </div>
        {/* Mobile photo */}
        <div className="order-1 lg:hidden flex justify-center pt-20" style={{ height: 300 }}>
          <img src={section1Img} alt="Dra. Hellen Oliveira"
            className="h-full w-auto object-contain object-bottom" />
        </div>
      </div>

    </section>
  )
}

/* ─── Stat item (hooks at top-level) ─── */
function StatItem({ n, suf, label }: { n: number; suf: string; label: string }) {
  const { val, ref } = useCounter(n)
  return (
    <div className="text-center">
      <p className="text-3xl font-bold mb-1" style={{ fontFamily: "Fraunces", color: "#1A3D2B" }}>
        <span ref={ref}>{val}</span>{suf}
      </p>
      <p className="text-xs font-semibold" style={{ color: "#8AAF9B" }}>{label}</p>
    </div>
  )
}

/* ─── Trust strip ─── */
function TrustStrip() {
  return (
    <section className="py-10 border-b" style={{ background: "#FFF8F3", borderColor: "rgba(26,61,43,0.07)" }}>
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
        <StatItem n={500} suf="+" label="Consultas realizadas" />
        <StatItem n={3} suf=" anos" label="de experiência clínica" />

        <StatItem n={100} suf="%" label="Regulamentado pelo CFM" />
      </div>
    </section>
  )
}

/* ─── Services ─── */
function Services() {
  const cards = [
    { icon: "🩺", title: "Avaliação de sintomas", desc: "Orientação médica para sintomas e queixas do dia a dia.", bg: "#FDE8DC", accent: "#EF8050" },
    { icon: "🏥", title: "Clínica geral", desc: "Acompanhamento, orientações e cuidados com a saúde.", bg: "#FEF9E7", accent: "#D4A820" },
    { icon: "👶", title: "Saúde da criança", desc: "Atendimento e suporte aos pais e cuidadores.", bg: "#FDEDF4", accent: "#EFA0B4" },
    { icon: "📋", title: "Receitas e tratamentos", desc: "Emissão de receitas conforme avaliação médica.", bg: "#EAF3EE", accent: "#3D6B50" },
    { icon: "🔬", title: "Solicitação de exames", desc: "Pedidos quando indicados durante a consulta.", bg: "#FDE8DC", accent: "#EF8050" },
    { icon: "📱", title: "100% online", desc: "Atendimento seguro por videochamada de onde você estiver.", bg: "#FEF9E7", accent: "#D4A820" },
  ]
  return (
    <section id="servicos" className="py-24" style={{ background: "#FFF8F3" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-xl mb-14">
          <p data-animate className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#EF8050" }}>Para quem é</p>
          <h2 data-animate data-delay="100" className="text-3xl lg:text-4xl font-bold leading-tight mb-4"
            style={{ fontFamily: "Fraunces", color: "#1A3D2B" }}>
            Precisa de atendimento médico sem enfrentar filas?
          </h2>
          <p data-animate data-delay="200" className="text-base leading-relaxed" style={{ color: "#3D6B50" }}>
            A telemedicina é uma alternativa prática para quem precisa de orientação médica
            com comodidade e agilidade.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {cards.map(({ icon, title, desc, bg, accent }, i) => (
            <div key={title} data-animate data-delay={["100","200","300","100","200","300"][i]}
              className="group p-7 rounded-2xl cursor-default transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
              style={{ background: bg }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${accent}22` }}>
                {icon}
              </div>
              <h3 className="font-bold text-[15px] mb-2" style={{ color: "#1A3D2B", fontFamily: "Fraunces" }}>{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#3D6B50" }}>{desc}</p>
            </div>
          ))}
        </div>

        <div data-animate className="flex justify-center">
          <a href={WA} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-[15px] border-2 transition-all hover:scale-105 active:scale-95"
            style={{ borderColor: "#1A3D2B", color: "#1A3D2B" }}>
            <WAIcon size={18} color="#1A3D2B" /> QUERO AGENDAR UM ATENDIMENTO
          </a>
        </div>
      </div>
    </section>
  )
}

/* ─── Step icons (SVG) ─── */
function IconChat() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}
function IconVideo() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  )
}
function IconDoc() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  )
}

/* ─── How it works ─── */
function HowItWorks() {
  const steps = [
    { n: "01", Icon: IconChat, title: "Agende sua consulta", desc: "Entre em contato pelo WhatsApp e escolha o melhor horário disponível." },
    { n: "02", Icon: IconVideo, title: "Converse com a médica", desc: "No horário marcado, receba o acesso e realize sua consulta com privacidade." },
    { n: "03", Icon: IconDoc, title: "Receba seus documentos", desc: "Receitas, atestados e pedidos de exames enviados digitalmente." },
  ]

  return (
    <section id="como-funciona" className="relative py-24 overflow-hidden" style={{ background: "#0D7C8D" }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #F2C84A, transparent 60%)" }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <p data-animate className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#F2C84A" }}>Como funciona</p>
          <h2 data-animate data-delay="100" className="text-3xl lg:text-4xl font-bold leading-tight"
            style={{ fontFamily: "Fraunces", color: "white" }}>
            Cuidar da sua saúde pode ser mais simples do que você imagina.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {steps.map(({ n, Icon, title, desc }, i) => (
            <div key={n} data-animate data-delay={["100","200","300"][i]}
              className="group relative p-8 rounded-3xl transition-all duration-300 hover:-translate-y-1"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl font-bold leading-none" style={{ fontFamily: "Fraunces", color: "rgba(242,200,74,0.25)" }}>{n}</span>
                <span className="text-white opacity-80"><Icon /></span>
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "Fraunces", color: "white" }}>{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.62)" }}>{desc}</p>
              {i < 2 && (
                <div className="hidden md:block absolute top-1/2 -right-3 z-10 -translate-y-1/2 font-bold text-lg" style={{ color: "rgba(242,200,74,0.45)" }}>→</div>
              )}
            </div>
          ))}
        </div>

        <div data-animate className="text-center">
          <p className="text-xl font-semibold italic" style={{ fontFamily: "Fraunces", color: "rgba(255,255,255,0.38)" }}>
            "Uma consulta médica com praticidade, sem abrir mão da atenção e do cuidado."
          </p>
        </div>
      </div>

      {/* Wave divider bottom */}
      <div className="absolute bottom-0 inset-x-0 pointer-events-none leading-none" style={{ height: 64 }}>
        <svg viewBox="0 0 1440 64" className="w-full h-full" preserveAspectRatio="none">
          <path d="M0 64 C480 0 960 64 1440 0 L1440 64 Z" fill="#FFF8F3" />
        </svg>
      </div>
    </section>
  )
}

/* ─── Testimonials ─── */
function Testimonials() {
  const items = [
    { name: "Ana Paula M.", text: "Atendimento incrível! Dra. Hellen me ouviu com muita atenção e resolveu tudo online. Não precisei sair de casa.", tag: "Consulta adulto" },
    { name: "Fernanda R.", text: "Minha filha estava com febre e consegui atendimento no mesmo dia. Recomendo muito para quem tem crianças.", tag: "Saúde infantil" },
    { name: "Carlos S.", text: "Prático, rápido e humanizado. Recebi minha receita digitalmente em menos de 1 hora após a consulta.", tag: "Receita digital" },
  ]
  return (
    <section className="py-24" style={{ background: "#FFF8F3" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p data-animate className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#EF8050" }}>Depoimentos</p>
          <h2 data-animate data-delay="100" className="text-3xl lg:text-4xl font-bold" style={{ fontFamily: "Fraunces", color: "#1A3D2B" }}>
            O que os pacientes dizem
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map(({ name, text, tag }, i) => (
            <div key={name} data-animate data-delay={["100","200","300"][i]}
              className="p-8 rounded-3xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
              style={{ background: "white", border: "1px solid rgba(26,61,43,0.07)" }}>
              <div className="flex gap-1 mb-5">
                {Array(5).fill(0).map((_, j) => <span key={j} className="text-base" style={{ color: "#F2C84A" }}>★</span>)}
              </div>
              <p className="text-[15px] leading-relaxed mb-6 italic" style={{ color: "#3D6B50", fontFamily: "Fraunces" }}>"{text}"</p>
              <div className="flex items-center justify-between">
                <p className="font-bold text-sm" style={{ color: "#1A3D2B" }}>{name}</p>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: "#FDE8DC", color: "#EF8050" }}>{tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Doctor bio ─── */
function DoctorBio() {
  return (
    <section id="medica" className="py-24 overflow-hidden" style={{ background: "#F7F2ED" }}>
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 items-center" style={{ gap: "5rem" }}>
        {/* Photo */}
        <div data-animate className="relative flex justify-center">
          <div className="relative overflow-hidden rounded-3xl shadow-2xl" style={{ maxWidth: 440, width: "100%" }}>
            <img src={section2Img} alt="Dra. Hellen Cristina Lima de Oliveira"
              className="w-full object-cover" style={{ aspectRatio: "3/4", objectPosition: "center top" }} />
          </div>
          {/* CRM badge */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-5 py-3 rounded-2xl text-center whitespace-nowrap shadow-xl"
            style={{ background: "white", border: "1px solid rgba(26,61,43,0.08)" }}>
            <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "#8AAF9B" }}>Médica Registrada</p>
            <p className="text-sm font-bold" style={{ color: "#1A3D2B" }} translate="no">CRM-PR 63225</p>
          </div>
        </div>

        {/* Copy */}
        <div>
          <p data-animate className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#EF8050" }}>A médica</p>
          <h2 data-animate data-delay="100" className="text-3xl lg:text-[2.2rem] font-bold leading-tight mb-6"
            style={{ fontFamily: "Fraunces", color: "#1A3D2B" }}>
            Uma médica que acredita que cuidar também é saber ouvir.
          </h2>

          <blockquote data-animate data-delay="150" className="pl-5 mb-7 text-lg leading-relaxed"
            style={{ borderLeft: "3px solid #EF8050", fontFamily: "Fraunces", fontStyle: "italic", color: "#3D6B50" }}>
            "Acredito em uma medicina que une conhecimento técnico, escuta atenta e empatia.
            Meu objetivo é oferecer um atendimento acessível, seguro e humanizado."
          </blockquote>

          <p data-animate data-delay="180" className="font-bold text-[15px] mb-0.5" style={{ color: "#1A3D2B" }} translate="no">
            Dra. Hellen Cristina Lima de Oliveira
          </p>
          <p data-animate data-delay="200" className="text-sm mb-7" style={{ color: "#8AAF9B" }} translate="no">Médica · CRM-PR 63225</p>

          <p data-animate data-delay="220" className="text-[10px] font-bold tracking-widest uppercase mb-4" style={{ color: "#3D6B50" }}>
            Experiência & qualificação
          </p>
          <ul data-animate data-delay="260" className="space-y-3">
            {[
              "Experiência em Pronto Atendimento, Urgência e Emergência",
              "Atuação com adultos e crianças",
              "Diploma revalidado — Universidade Estadual de Londrina (UEL)",
              "Certificação PALS — Suporte Avançado de Vida Pediátrico",
              "Certificação ACLS — Suporte Avançado de Vida em Cardiologia",
              "Formação em atenção primária e saúde da criança",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "#3D6B50" }}>
                <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold"
                  style={{ background: "#EAF3EE", color: "#3D6B50" }}>✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ─── Differentials ─── */
function Differentials() {
  return (
    <section className="py-16" style={{ background: "#FFF8F3" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center mb-10">
          <div className="lg:col-span-3">
            <p data-animate className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#EF8050" }}>Diferenciais</p>
            <h2 data-animate data-delay="100" className="text-3xl lg:text-4xl font-bold leading-tight"
              style={{ fontFamily: "Fraunces", color: "#1A3D2B" }}>
              Mais do que uma consulta online: um atendimento pensado para você.
            </h2>
          </div>
          <div data-animate className="lg:col-span-2 flex justify-end">
            <div className="overflow-hidden rounded-3xl shadow-xl" style={{ maxWidth: 340, width: "100%", background: "#e8edf5" }}>
              <img src={section3Img} alt="Dra. Hellen Oliveira"
                className="w-full object-cover object-top" style={{ aspectRatio: "3/4" }} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon:"🤝", title:"Escuta e acolhimento", desc:"Cada consulta conduzida com atenção às suas queixas e necessidades.", bg:"#FDE8DC", accent:"#EF8050" },
            { icon:"🏡", title:"Comodidade para toda a família", desc:"Receba atendimento médico sem precisar sair de casa.", bg:"#FEF9E7", accent:"#D4A820" },
            { icon:"👨‍👩‍👧", title:"Adultos e crianças", desc:"Pensado para diferentes momentos e necessidades da família.", bg:"#FDEDF4", accent:"#EFA0B4" },
            { icon:"🛡️", title:"Segurança e responsabilidade", desc:"Atendimento dentro das normas do CFM para telemedicina.", bg:"#EAF3EE", accent:"#3D6B50" },
          ].map(({ icon, title, desc, bg, accent }, i) => (
            <div key={title} data-animate data-delay={["100","200","300","400"][i]}
              className="group p-7 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-default"
              style={{ background: bg }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${accent}20` }}>{icon}</div>
              <h3 className="font-bold text-[15px] mb-2" style={{ color: "#1A3D2B", fontFamily: "Fraunces" }}>{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#3D6B50" }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Ideal for ─── */
function IdealFor() {
  return (
    <section className="relative py-24 overflow-hidden" style={{ background: "#0D7C8D" }}>
      {/* Wave top */}
      <div className="absolute top-0 inset-x-0 pointer-events-none" style={{ height: 64 }}>
        <svg viewBox="0 0 1440 64" className="w-full h-full" preserveAspectRatio="none">
          <path d="M0 0 C480 64 960 0 1440 64 L1440 0 Z" fill="#FFF8F3" />
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 pt-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <p data-animate className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#F2C84A" }}>Ideal para você quando</p>
          <h2 data-animate data-delay="100" className="text-3xl lg:text-4xl font-bold leading-tight mb-8"
            style={{ fontFamily: "Fraunces", color: "white" }}>
            A consulta online pode ser a melhor escolha
          </h2>
          <ul className="space-y-4">
            {[
              "Você precisa de orientação médica, mas não consegue se deslocar.",
              "Seu filho apresenta uma queixa que precisa de avaliação inicial.",
              "Você busca acompanhamento e orientação médica.",
              "Precisa avaliar sintomas e entender os próximos passos.",
              "Precisa de atendimento médico com mais comodidade.",
            ].map((s, i) => (
              <li key={i} data-animate data-delay={["100","200","300","400","500"][i]} className="flex items-start gap-4">
                <span className="mt-0.5 shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: "rgba(242,200,74,0.18)", color: "#F2C84A" }}>✓</span>
                <p className="text-[15px] leading-relaxed" style={{ color: "rgba(255,255,255,0.78)" }}>{s}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-5">
          <div data-animate className="p-7 rounded-3xl"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#EF8050" }}>Importante</p>
            <p className="text-[15px] leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
              Alguns casos podem exigir avaliação presencial. Durante o atendimento, a médica
              orientará sobre a melhor conduta para cada situação.
            </p>
          </div>

          <div data-animate data-delay="150" className="relative overflow-hidden p-8 rounded-3xl"
            style={{ background: "#EF8050" }}>
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20" style={{ background: "white" }} />
            <p className="relative text-xl font-bold mb-4" style={{ fontFamily: "Fraunces", color: "white" }}>
              Pronto para cuidar da sua saúde?
            </p>
            <a href={WA} target="_blank" rel="noopener noreferrer"
              className="relative inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm transition-all hover:scale-105"
              style={{ background: "white", color: "#EF8050" }}>
              <WAIcon size={18} color="#EF8050" /> AGENDAR AGORA
            </a>
          </div>
        </div>
      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 inset-x-0 pointer-events-none" style={{ height: 64 }}>
        <svg viewBox="0 0 1440 64" className="w-full h-full" preserveAspectRatio="none">
          <path d="M0 64 C480 0 960 64 1440 0 L1440 64 Z" fill="#FFF8F3" />
        </svg>
      </div>
    </section>
  )
}

/* ─── FAQ ─── */
function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  const faqs = [
    { q:"A consulta online é segura?", a:"Sim. O atendimento é realizado por videochamada, com privacidade e orientação médica individualizada, dentro das normas do CFM para telemedicina." },
    { q:"A Dra. Hellen atende crianças?", a:"Sim. A médica possui experiência em atendimento infantil e qualificação PALS — Suporte Avançado de Vida Pediátrico, atendendo bebês, crianças e adolescentes." },
    { q:"Posso receber receita, atestado ou pedido de exame?", a:"Quando houver indicação médica, os documentos podem ser emitidos e enviados digitalmente." },
    { q:"Preciso baixar algum aplicativo?", a:"Não. Você receberá as orientações e o link de acesso antes do horário da consulta." },
    { q:"E se eu precisar de atendimento presencial?", a:"Caso a avaliação indique necessidade de exame físico ou encaminhamento, você receberá a orientação adequada." },
  ]
  return (
    <section id="faq" className="py-24" style={{ background: "#FFF8F3" }}>
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <p data-animate className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#EF8050" }}>Dúvidas frequentes</p>
          <h2 data-animate data-delay="100" className="text-3xl lg:text-4xl font-bold" style={{ fontFamily: "Fraunces", color: "#1A3D2B" }}>
            Ainda tem dúvidas?
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map(({ q, a }, i) => (
            <div key={i} data-animate data-delay={["100","200","300","400","500"][i]}
              className="overflow-hidden rounded-2xl transition-all duration-300"
              style={{
                background: open === i ? "white" : "#FAF5F0",
                border: `1px solid ${open === i ? "#EF8050" : "transparent"}`,
                boxShadow: open === i ? "0 4px 24px rgba(239,128,80,0.1)" : "none",
              }}>
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-7 py-5 text-left">
                <span className="font-bold text-[15px]" style={{ color: "#1A3D2B", fontFamily: "Fraunces" }}>{q}</span>
                <span className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300"
                  style={{
                    background: open === i ? "#EF8050" : "#EAF3EE",
                    color: open === i ? "white" : "#3D6B50",
                    transform: open === i ? "rotate(45deg)" : "none",
                  }}>+</span>
              </button>
              <div style={{
                maxHeight: open === i ? "200px" : "0",
                overflow: "hidden",
                transition: "max-height 0.38s ease",
                paddingBottom: open === i ? "20px" : "0",
              }}>
                <p className="px-7 text-[15px] leading-relaxed" style={{ color: "#3D6B50" }}>{a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Final CTA ─── */
function FinalCTA() {
  return (
    <section className="relative py-28 overflow-hidden" style={{ background: "#EF8050" }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-[0.12]" style={{ background: "white" }} />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full opacity-[0.08]" style={{ background: "#1A3D2B" }} />
      </div>
      <div className="relative max-w-2xl mx-auto px-6 text-center">
        <h2 data-animate className="text-3xl lg:text-5xl font-bold leading-tight mb-5"
          style={{ fontFamily: "Fraunces", color: "white" }}>
          Sua saúde merece atenção. E cuidar dela pode ser mais simples.
        </h2>
        <p data-animate data-delay="100" className="text-xl mb-10" style={{ color: "rgba(255,255,255,0.8)" }}>
          Agende sua consulta com a <strong style={{ color: "white" }} translate="no">Dra. Hellen Oliveira</strong> e receba
          atendimento com acolhimento, segurança e praticidade.
        </p>
        <div data-animate data-delay="200">
          <a href={WA} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-9 py-5 rounded-2xl font-bold text-[15px] transition-all hover:scale-105 active:scale-95 shadow-2xl"
            style={{ background: "white", color: "#EF8050", boxShadow: "0 16px 48px rgba(0,0,0,0.2)" }}>
            <WAIcon size={22} color="#EF8050" />
            AGENDAR MINHA CONSULTA PELO WHATSAPP
          </a>
        </div>
        <p data-animate data-delay="300" className="text-sm mt-5" style={{ color: "rgba(255,255,255,0.55)" }}>
          Atendimento online para adultos e crianças.
        </p>
      </div>
    </section>
  )
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="py-12" style={{ background: "#0D7C8D" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <Logo light />
          <div className="text-center md:text-right">
            <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.5)" }} translate="no">
              Dra. Hellen Cristina Lima de Oliveira
            </p>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }} translate="no">Médica · CRM-PR 63225</p>
          </div>
        </div>
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-3 text-xs"
          style={{ borderTop: "1px solid rgba(255,255,255,0.09)", color: "rgba(255,255,255,0.28)" }}>
          <p>© 2025 Dra. Hellen Oliveira. Todos os direitos reservados.</p>
          <p>Telemedicina regulamentada pelo CFM · Res. CFM nº 2.314/2022</p>
        </div>
      </div>
    </footer>
  )
}

/* ─── Floating WhatsApp ─── */
function FloatingWA() {
  const y = useScrollY()
  const show = y > 120
  return (
    <a href={WA} target="_blank" rel="noopener noreferrer" aria-label="Agendar pelo WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300"
      style={{
        background: "#25D366",
        boxShadow: "0 8px 32px rgba(37,211,102,0.5)",
        opacity: show ? 1 : 0,
        transform: show ? "scale(1)" : "scale(0.7)",
        pointerEvents: show ? "auto" : "none",
      }}>
      <WAIcon size={26} color="white" />
    </a>
  )
}

/* ─── Shared constants ─── */
const WA = "https://wa.me/5545999605228?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20consulta"

function WAIcon({ size = 24, color = "white" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

/* ─── App ─── */
export default function App() {
  useScrollAnimation()
  return (
    <div style={{ background: "#FFF8F3" }}>
      <Navbar />
      <Hero />
      <TrustStrip />
      <Services />
      <HowItWorks />
      <Testimonials />
      <DoctorBio />
      <Differentials />
      <IdealFor />
      <FAQ />
      <FinalCTA />
      <Footer />
      <FloatingWA />
    </div>
  )
}
