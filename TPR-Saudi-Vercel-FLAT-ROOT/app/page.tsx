"use client";

import { useEffect, useRef, useState } from "react";

const LEADS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxmx7Ni3wE5AgF9k01uvIe1RcqJz_Qi66TsZ6Oj-IvSUUntLjDdSjmVtHrWKWuoCdKFzQ/exec";

const storyScenes = [
  {
    image: "/media/child-response.webp",
    kicker: "المعنى أولًا",
    title: "نحوّل الجملة إلى حدث يراه الطفل ويعيشه.",
    body: "المعنى يصل من خلال الموقف، والإشارة، والمجسم؛ حتى ترتبط اللغة بتجربة حقيقية داخل ذاكرة الطفل.",
  },
  {
    image: "/media/gesture-class.webp",
    kicker: "الحركة تُثبّت اللغة",
    title: "كل أمر، وكل تعبير، له حركة تُبقي الطفل حاضرًا.",
    body: "الحفظ هنا يأتي بالحركة والتكرار والتفاعل؛ مش بالتلقين والدفتر فقط.",
  },
  {
    image: "/media/hand-raise.webp",
    kicker: "التعبير بثقة",
    title: "نعطي الطفل مساحة يسمع، يشارك، ثم يتحدث.",
    body: "بيئة حية تشجع الطفل على المحاولة والتعبير، مع متابعة فردية داخل المجموعة.",
  },
];

const benefits = [
  {
    number: "01",
    title: "سوق يتجه للتعليم النشط",
    body: "تجربة تتقاطع مع توجهات تطوير التعليم والحلول المبتكرة للأطفال في المملكة العربية السعودية.",
    image: "/media/school-circle.webp",
  },
  {
    number: "02",
    title: "نموذج مطبّق ومؤلفات مسجلة",
    body: "منهجية واضحة، مواد تعليمية أصلية، وتجربة تشغيلية قابلة للنقل والتوسع.",
    image: "/media/tpr-books.webp",
  },
  {
    number: "03",
    title: "بديل حي للجمود والشاشات",
    body: "نحوّل وقت التعلم إلى طاقة حركية واجتماعية ممتعة داخل مساحة حقيقية.",
    image: "/media/action-kids.webp",
  },
  {
    number: "04",
    title: "منظومة أكاديمية وتشغيلية",
    body: "تدريب، مواد، دعم تسويقي، وإشراف مستمر يساعد الشريك على النمو بثبات.",
    image: "/media/certificates.webp",
  },
];

const offers = [
  {
    number: "01",
    title: "حقوق التمثيل والتوزيع",
    body: "امتياز محلي للعلامة والمنهج في المنطقة أو المدينة المتفق عليها.",
    image: "/media/outdoor-circle.webp",
  },
  {
    number: "02",
    title: "تدريب وتأهيل الطاقم",
    body: "نقل المعرفة وتدريب المعلمين والمدربين على المنهجية والمعايير التشغيلية.",
    image: "/media/teacher-training.webp",
  },
  {
    number: "03",
    title: "حقيبة جاهزة للانطلاق",
    body: "مواد تعليمية، أدوات صفية، وخطط تسويق وتشغيل مخصصة لاستقطاب الطلاب.",
    image: "/media/learning-kit.webp",
  },
  {
    number: "04",
    title: "دعم مستمر للنمو",
    body: "إشراف أكاديمي، متابعة للأداء، وتطوير مستمر للمبيعات والتجربة.",
    image: "/media/book-achievement.webp",
  },
];

export default function Home() {
  const [videoStarted, setVideoStarted] = useState(false);
  const [storyStep, setStoryStep] = useState(0);
  const [offerStep, setOfferStep] = useState(0);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success">("idle");
  const [submitStarted, setSubmitStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const storyRef = useRef<HTMLElement>(null);
  const offersRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let raf = 0;
    const updateMotion = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      document.documentElement.style.setProperty("--scroll-progress", `${progress}`);
      document.documentElement.style.setProperty("--scroll-y", `${window.scrollY}px`);

      if (storyRef.current) {
        const rect = storyRef.current.getBoundingClientRect();
        const distance = rect.height - window.innerHeight;
        const storyProgress = distance > 0 ? Math.min(0.999, Math.max(0, -rect.top / distance)) : 0;
        const nextStep = Math.min(storyScenes.length - 1, Math.floor(storyProgress * storyScenes.length));
        setStoryStep((current) => (current === nextStep ? current : nextStep));
        storyRef.current.style.setProperty("--story-progress", `${storyProgress}`);
      }

      if (offersRef.current) {
        const rect = offersRef.current.getBoundingClientRect();
        const distance = rect.height - window.innerHeight;
        const offerProgress = distance > 0 ? Math.min(0.999, Math.max(0, -rect.top / distance)) : 0;
        const nextOffer = Math.min(offers.length - 1, Math.floor(offerProgress * offers.length));
        setOfferStep((current) => (current === nextOffer ? current : nextOffer));
        offersRef.current.style.setProperty("--offer-progress", `${offerProgress}`);
      }
      raf = 0;
    };

    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(updateMotion);
    };

    const onPointer = (event: PointerEvent) => {
      document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
    };

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.14 },
    );

    document.querySelectorAll("[data-reveal]").forEach((node) => observer.observe(node));
    updateMotion();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  const playVideo = async () => {
    setVideoStarted(true);
    await videoRef.current?.play();
  };

  const submitLeadForm = () => {
    setSubmitStarted(true);
    setFormStatus("sending");
  };

  const completeLeadSubmit = () => {
    if (!submitStarted) return;
    formRef.current?.reset();
    setFormStatus("success");
    setSubmitStarted(false);
  };

  return (
    <main dir="rtl">
      <div className="scroll-progress" aria-hidden="true" />
      <div className="pointer-glow" aria-hidden="true" />

      <header className="site-header">
        <a className="brand" href="#top" aria-label="العودة إلى بداية الصفحة">
          <img src="/media/tpr-logo.png" alt="شعار الاستجابة الحسية الكاملة" />
          <span>
            <strong>TPR For English</strong>
            <small>فرصة الشراكة في المملكة العربية السعودية</small>
          </span>
        </a>
        <nav aria-label="التنقل الرئيسي">
          <a href="#experience">التجربة</a>
          <a href="#partnership">الشراكة</a>
          <a className="nav-cta" href="#apply">اطلب الملف <span>↙</span></a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-team" aria-hidden="true">
          <img src="/media/tpr-team-panorama.webp" alt="" />
        </div>
        <div className="hero-orbit orbit-one" aria-hidden="true" />
        <div className="hero-orbit orbit-two" aria-hidden="true" />

        <div className="hero-copy">
          <p className="eyebrow" data-reveal>
            <span /> فرصة استثمارية تعليمية في المملكة العربية السعودية
          </p>
          <h1 data-reveal>
            ابدأ قصة نجاح
            <em>استثمارية</em>
            <span className="hero-ksa">في المملكة العربية السعودية</span>
          </h1>
          <p className="hero-sub" data-reveal>
            كن شريكًا محليًا لـ <b>TPR For English</b>، وقدّم في مدينتك تجربة
            تعليم الإنجليزية للأطفال بالحركة، والتفاعل، واللعب الهادف.
          </p>
          <div className="hero-actions" data-reveal>
            <a className="primary-button" href="#apply">احصل على ملف الشراكة <span>←</span></a>
            <a className="text-link" href="#experience">اكتشف التجربة <span>↓</span></a>
          </div>
        </div>

        <div className="hero-stage" data-reveal>
          <div className="video-shell">
            <video
              ref={videoRef}
              poster="/media/tpr-event-poster.webp"
              preload="none"
              playsInline
              controls={videoStarted}
              onEnded={() => setVideoStarted(false)}
              aria-label="فيديو يوضح تجربة TPR داخل الحصص"
            >
              <source src="/media/tpr-event-vertical-optimized.mp4" type="video/mp4" />
            </video>
            {!videoStarted && (
              <button className="play-button" type="button" onClick={playVideo} aria-label="تشغيل فيديو تجربة TPR">
                <span className="play-icon">▶</span>
                <span>شاهد التجربة</span>
              </button>
            )}
          </div>
          <div className="stage-stamp" aria-hidden="true">
            <span>MOVE</span><span>•</span><span>SPEAK</span><span>•</span><span>GROW</span>
          </div>
        </div>

        <div className="scroll-cue" aria-hidden="true"><span /> اسحب لتبدأ القصة</div>
      </section>

      <section className="ticker" aria-label="مبادئ تجربة TPR">
        <div className="ticker-track">
          <span>حركة</span><i>●</i><span>تفاعل</span><i>●</i><span>لغة تُعاش</span><i>●</i>
          <span>حركة</span><i>●</i><span>تفاعل</span><i>●</i><span>لغة تُعاش</span><i>●</i>
        </div>
      </section>

      <section className="experience-intro" id="experience">
        <div className="experience-photo" aria-hidden="true">
          <img src="/media/circle-class.webp" alt="" />
          <span className="photo-word">CIRCLE</span>
        </div>
        <div className="experience-copy">
          <p className="section-number" data-reveal>01 / التجربة</p>
          <h2 data-reveal>مش حصة إنجليزي تقليدية.</h2>
          <p data-reveal>
            في مراحل التأسيس والمحادثة، تتحول اللغة من كلمات على صفحة إلى تجربة
            يعيشها الطفل بجسمه، وصوته، وتفاعله مع المجموعة.
          </p>
          <div className="principles" data-reveal>
            <span>نسمع</span><b>→</b><span>نتحرك</span><b>→</b><span>نتحدث</span>
          </div>
        </div>
      </section>

      <section className="method-story" ref={storyRef} aria-label="كيف تعمل تجربة TPR">
        <div className="story-sticky">
          <div className="story-images" aria-hidden="true">
            {storyScenes.map((scene, index) => (
              <img key={scene.image} className={storyStep === index ? "active" : ""} src={scene.image} alt="" />
            ))}
          </div>
          <div className="story-shade" aria-hidden="true" />
          <div className="story-counter" aria-hidden="true">0{storyStep + 1}</div>
          <div className="story-copy" aria-live="polite">
            <p>{storyScenes[storyStep].kicker}</p>
            <h2>{storyScenes[storyStep].title}</h2>
            <span>{storyScenes[storyStep].body}</span>
          </div>
          <div className="story-rail" aria-hidden="true">
            {storyScenes.map((_, index) => <i key={index} className={storyStep === index ? "active" : ""} />)}
          </div>
        </div>
      </section>

      <section className="why-partner" id="partnership">
        <div className="why-heading">
          <p className="section-number" data-reveal>02 / لماذا TPR؟</p>
          <h2 data-reveal>فرصة تبدأ من حاجة حقيقية.</h2>
          <p data-reveal>برنامج تعليمي حي، وهوية واضحة، ومنظومة تمنح الشريك أكثر من مجرد محتوى صفّي.</p>
        </div>
        <div className="benefit-list">
          {benefits.map((benefit) => (
            <article className="benefit-row" key={benefit.number} tabIndex={0}>
              <span className="benefit-number">{benefit.number}</span>
              <h3>{benefit.title}</h3>
              <p>{benefit.body}</p>
              <img src={benefit.image} alt="" aria-hidden="true" />
              <span className="benefit-arrow" aria-hidden="true">↙</span>
            </article>
          ))}
        </div>
      </section>

      <section className="offers" ref={offersRef} aria-label="ما الذي نقدمه للشريك المحلي">
        <div className="offers-sticky">
          <div className="offers-topline">
            <p>03 / ما الذي نقدمه؟</p>
            <span>حرّك الصفحة لتستعرض المنظومة <b>←</b></span>
          </div>
          <div className="offers-track">
            {offers.map((offer) => (
              <article
                className={`offer-panel ${offerStep === Number(offer.number) - 1 ? "active" : ""}`}
                key={offer.number}
                aria-hidden={offerStep !== Number(offer.number) - 1}
              >
                <img src={offer.image} alt="" aria-hidden="true" />
                <div className="offer-overlay" />
                <div className="offer-copy">
                  <span>{offer.number}</span>
                  <h2>{offer.title}</h2>
                  <p>{offer.body}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="offer-dots" aria-hidden="true">
            {offers.map((offer, index) => <i key={offer.number} className={offerStep === index ? "active" : ""} />)}
          </div>
          <div className="offers-progress" aria-hidden="true"><span /></div>
        </div>
      </section>

      <section className="partner-profile">
        <div className="profile-photo" aria-hidden="true"><img src="/media/class-circle-wide.webp" alt="" /></div>
        <div className="profile-heading">
          <p className="section-number" data-reveal>04 / الشريك المثالي</p>
          <h2 data-reveal>عندك المكان؟<br /><em>نحن عندنا التجربة.</em></h2>
        </div>
        <div className="profile-list" data-reveal>
          <p><span>01</span> أصحاب المراكز التعليمية وأكاديميات وأندية الأطفال.</p>
          <p><span>02</span> المستثمرون المهتمون بالتعليم المبكر وتنمية مهارات الطفل.</p>
          <p><span>03</span> المدارس الأهلية والدولية الباحثة عن محادثة إنجليزية نشطة.</p>
        </div>
      </section>

      <section className="proof-scene">
        <img src="/media/certificates.webp" alt="مجموعة من أطفال TPR يحملون شهاداتهم" />
        <div className="proof-overlay" />
        <div className="proof-copy" data-reveal>
          <p>من الحركة الأولى</p>
          <h2>نبني تجربة تستحق أن تصل إلى مدينة جديدة.</h2>
          <span>TPR FOR ENGLISH × SAUDI ARABIA</span>
        </div>
      </section>

      <section className="apply-section" id="apply">
        <img className="apply-background" src="/media/outdoor-circle.webp" alt="" aria-hidden="true" />
        <div className="apply-shade" />
        <div className="apply-intro" data-reveal>
          <div className="saudi-identity">
            <span className="saudi-flag" aria-hidden="true">🇸🇦</span>
            <span className="saudi-copy"><small>فرصة أن تكون وكيلًا محليًا في</small><strong>المملكة العربية السعودية</strong></span>
            <span className="saudi-ksa" aria-hidden="true">KSA</span>
          </div>
          <p>ابدأ من هنا</p>
          <h2>كن وجهة التعليم التفاعلي في مدينتك.</h2>
          <span>سجل بياناتك لطلب ملف الشراكة وتنسيق اجتماع تعريفي عبر Zoom.</span>
          <a
            className="direct-contact"
            href="https://wa.me/962798607000"
            target="_blank"
            rel="noreferrer"
            aria-label="التواصل عبر واتساب على الرقم +962 7 9860 7000"
          >
            <span className="contact-label">للتواصل المباشر عبر واتساب</span>
            <strong dir="ltr">+962 7 9860 7000</strong>
            <span className="contact-arrow" aria-hidden="true">↗</span>
          </a>
        </div>

        <form
          ref={formRef}
          className="partner-form"
          action={LEADS_SCRIPT_URL}
          method="POST"
          target="lead-submit-frame"
          onSubmit={submitLeadForm}
          data-reveal
        >
          <div className="field-row">
            <label>
              <span>الاسم الكامل</span>
              <input required name="fullName" autoComplete="name" placeholder="اكتب اسمك" />
            </label>
            <label>
              <span>اسم الشركة / المركز</span>
              <input name="company" autoComplete="organization" placeholder="إن وجد" />
            </label>
          </div>
          <div className="field-row">
            <label>
              <span>المدينة / المنطقة</span>
              <input required name="city" placeholder="مثال: الرياض" />
            </label>
            <label>
              <span>رقم الجوال (واتساب)</span>
              <input required name="phone" type="tel" autoComplete="tel" placeholder="+966" dir="ltr" />
            </label>
          </div>
          <label>
            <span>البريد الإلكتروني</span>
            <input required name="email" type="email" autoComplete="email" placeholder="name@company.com" dir="ltr" />
          </label>
          <label className="interest-field">
            <span>أنا مهتم بفرصة الشراكة بصفتي</span>
            <select name="profile" defaultValue="">
              <option value="" disabled>اختر الفئة</option>
              <option>مركز أو أكاديمية تعليمية</option>
              <option>مدرسة أهلية أو دولية</option>
              <option>مستثمر في قطاع التعليم</option>
              <option>نادٍ أو مساحة مخصصة للأطفال</option>
            </select>
          </label>
          <button type="submit" disabled={formStatus === "sending"}>
            {formStatus === "sending" ? "جاري إرسال الطلب..." : "احصل على ملف الشراكة"} <span>←</span>
          </button>
          {formStatus === "success" && (
            <p className="prototype-note is-success" role="status">تم استلام طلبك بنجاح. سنتواصل معك قريبًا لتنسيق الاجتماع.</p>
          )}
          {formStatus === "sending" && (
            <p className="prototype-note" role="status">ثواني فقط، يتم حفظ بياناتك الآن...</p>
          )}
          <iframe
            className="submission-frame"
            name="lead-submit-frame"
            title="إرسال طلب الشراكة"
            onLoad={completeLeadSubmit}
          />
        </form>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top">
          <img src="/media/tpr-logo.png" alt="شعار TPR" />
          <span><strong>TPR For English</strong><small>لغة تُسمع، تُعاش، وتُستخدم.</small></span>
        </a>
        <p>فرصة الشراكة في المملكة العربية السعودية</p>
        <a href="#top">العودة للأعلى ↑</a>
      </footer>
    </main>
  );
}
