import React, { useState, useEffect, useRef } from "react";
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useTransform 
} from "motion/react";
import { 
  Coffee, 
  Sparkles, 
  Compass, 
  Volume2, 
  Sliders, 
  Calendar, 
  Clock, 
  Users, 
  VolumeX, 
  Plus, 
  ArrowRight, 
  ChevronRight, 
  Star, 
  Check, 
  X, 
  ArrowUpRight, 
  MapPin, 
  Phone, 
  Mail, 
  Info,
  ChevronDown,
  Instagram,
  Facebook,
  Award
} from "lucide-react";

import SpiceHubLogo from "./components/SpiceHubLogo";
import CustomCursor from "./components/CustomCursor";
import { AmbientSynth } from "./utils/audio";
import { 
  NAV_ITEMS, 
  SERVICE_ITEMS, 
  MENU_CATEGORIES, 
  GALLERY_ITEMS, 
  TESTIMONIALS, 
  TEAM_MEMBERS, 
  FAQS 
} from "./data";
import { GalleryItem, MenuItem, TestimonialItem } from "./types";

export default function App() {
  // Navigation & Page State
  const [activeTab, setActiveTab] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [pairingItem, setPairingItem] = useState<string | null>(null);

  // Hero Carousel State
  const [heroIndex, setHeroIndex] = useState(0);
  const heroBackgrounds = [
    {
      url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=2000",
      title: "Good Food. Good Vibes.",
      subtitle: "The Legendary Cinematic Arch Lounge"
    },
    {
      url: "https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?auto=format&fit=crop&q=80&w=2000",
      title: "Artisanal Extraction Physics",
      subtitle: "Specialty Micro-Lots Scoring 88+"
    },
    {
      url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=2000",
      title: "Symphony of Senses",
      subtitle: "Chevron Bricks & Acoustic Timber Slats"
    }
  ];

  // Audio Engine Control
  const [audioInitialized, setAudioInitialized] = useState(false);
  const [vinylVol, setVinylVol] = useState(0.4);
  const [rainVol, setRainVol] = useState(0.3);
  const [masterVol, setMasterVol] = useState(0.5);
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [showAudioControls, setShowAudioControls] = useState(false);

  // Menu Category Filter
  const [activeCategory, setActiveCategory] = useState("coffee");

  // Booking Engine State
  const [bookingZone, setBookingZone] = useState<"hearth" | "timber" | "courtyard">("hearth");
  const [bookingDate, setBookingDate] = useState("2026-07-16");
  const [bookingTime, setBookingTime] = useState("20:00");
  const [bookingGuests, setBookingGuests] = useState(2);
  const [bookingLighting, setBookingLighting] = useState<"dim-amber" | "ochre" | "midnight">("ochre");
  const [bookingAcoustic, setBookingAcoustic] = useState<"ambient-rain" | "vinyl-jazz" | "silence">("vinyl-jazz");
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [bookingCode, setBookingCode] = useState("");

  // Gallery Filters & Lightbox
  const [galleryFilter, setGalleryFilter] = useState("All");
  const [activeLightboxImage, setActiveLightboxImage] = useState<GalleryItem | null>(null);

  // Review Form & Testimonials list
  const [testimonialsList, setTestimonialsList] = useState<TestimonialItem[]>(TESTIMONIALS);
  const [newReviewName, setNewReviewName] = useState("");
  const [newReviewRole, setNewReviewRole] = useState("");
  const [newReviewQuote, setNewReviewQuote] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewZone, setNewReviewZone] = useState("Arched Lounge");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // FAQ Accordion
  const [openFaqId, setOpenFaqId] = useState<string | null>("f1");

  // Track page scroll to transform header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Simple spy navigation highlight
      const sections = NAV_ITEMS.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveTab(NAV_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hero slideshow interval
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroBackgrounds.length);
    }, 8500);
    return () => clearInterval(timer);
  }, [heroBackgrounds.length]);

  // Audio Engine Synchronizer
  useEffect(() => {
    if (audioInitialized) {
      if (isAudioMuted) {
        AmbientSynth.setVolumes(0, 0, 0);
      } else {
        AmbientSynth.setVolumes(vinylVol, rainVol, masterVol);
      }
    }
  }, [vinylVol, rainVol, masterVol, isAudioMuted, audioInitialized]);

  const handleToggleMute = () => {
    if (!audioInitialized) {
      AmbientSynth.setVolumes(vinylVol, rainVol, masterVol);
      setAudioInitialized(true);
    }
    setIsAudioMuted(!isAudioMuted);
    AmbientSynth.resume();
  };

  const handleReservation = (e: React.FormEvent) => {
    e.preventDefault();
    AmbientSynth.playChime();
    
    // Create random ultra-premium reservation code
    const zones = { hearth: "HRT", timber: "TMB", courtyard: "CYD" };
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const code = `SPICE-${zones[bookingZone]}-${randomNum}`;
    
    setBookingCode(code);
    setBookingSubmitted(true);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName || !newReviewQuote) return;

    const newReview: TestimonialItem = {
      id: `custom-${Date.now()}`,
      name: newReviewName,
      role: newReviewRole || "Spice Hub Aficionado",
      quote: newReviewQuote,
      rating: newReviewRating,
      avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150" // generic premium avatar
    };

    setTestimonialsList([newReview, ...testimonialsList]);
    setNewReviewName("");
    setNewReviewRole("");
    setNewReviewQuote("");
    setNewReviewRating(5);
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 5000);
  };

  // Pairing guide finder
  const getPairingRecommendation = (itemId: string) => {
    // Return a pairing suggestion between coffee & plates or cocktails
    if (itemId === "c1") return { name: "Brick-Oven Sourdough Tartine", price: "$24.00" };
    if (itemId === "c2") return { name: "Deconstructed Matcha Mascarpone", price: "$16.00" };
    if (itemId === "c3") return { name: "Truffle Wild Mushroom Risotto", price: "$36.00" };
    if (itemId === "p1") return { name: "Gold Dust Cortado", price: "$12.00" };
    if (itemId === "p2") return { name: "Single-Origin Pour Over (Ice-Chilled)", price: "$18.00" };
    if (itemId === "x1") return { name: "Smoked Sage & Espresso Crusted Ribeye", price: "$48.00" };
    return null;
  };

  // Filtered gallery items
  const filteredGallery = galleryFilter === "All" 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === galleryFilter);

  return (
    <div className="min-h-screen bg-luxury-black text-white relative font-sans selection:bg-luxury-gold selection:text-black">
      {/* Custom premium micro-interaction pointer & cursor glow */}
      <CustomCursor />

      {/* Floating Audio Controller */}
      <div id="ambient-audio-floater" className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-2">
        <AnimatePresence>
          {showAudioControls && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="glass-panel p-5 rounded-2xl w-64 mb-2 shadow-2xl flex flex-col gap-4 text-xs font-mono border border-white/10"
            >
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-luxury-gold uppercase tracking-wider font-semibold flex items-center gap-1">
                  <Sliders size={12} /> Ambient Mixer
                </span>
                <button 
                  onClick={() => setShowAudioControls(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Master volume */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-[10px] text-gray-400">
                  <span>MASTER VOLUME</span>
                  <span>{Math.round(masterVol * 100)}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="1" 
                  step="0.05"
                  value={masterVol}
                  onChange={(e) => {
                    setMasterVol(parseFloat(e.target.value));
                    if (isAudioMuted) setIsAudioMuted(false);
                    if (!audioInitialized) setAudioInitialized(true);
                  }}
                  className="w-full accent-luxury-gold bg-luxury-light-gray h-1 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Vinyl Crackle */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-[10px] text-gray-400">
                  <span>VINYL DUST HUM</span>
                  <span>{Math.round(vinylVol * 100)}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="1" 
                  step="0.05"
                  value={vinylVol}
                  onChange={(e) => {
                    setVinylVol(parseFloat(e.target.value));
                    if (isAudioMuted) setIsAudioMuted(false);
                    if (!audioInitialized) setAudioInitialized(true);
                  }}
                  className="w-full accent-luxury-gold bg-luxury-light-gray h-1 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Rain Ambient */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-[10px] text-gray-400">
                  <span>AMBIENT COFFEE RAIN</span>
                  <span>{Math.round(rainVol * 100)}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="1" 
                  step="0.05"
                  value={rainVol}
                  onChange={(e) => {
                    setRainVol(parseFloat(e.target.value));
                    if (isAudioMuted) setIsAudioMuted(false);
                    if (!audioInitialized) setAudioInitialized(true);
                  }}
                  className="w-full accent-luxury-gold bg-luxury-light-gray h-1 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <p className="text-[9px] text-gray-500 leading-tight">
                Synthesized live using high-precision Web Audio oscillators. No files are downloaded.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-2">
          {/* Main mute/unmute action badge */}
          <button
            onClick={handleToggleMute}
            className={`h-11 px-4 rounded-full flex items-center gap-2 text-xs font-mono uppercase tracking-widest shadow-lg transition-all duration-500 border ${
              isAudioMuted 
                ? "bg-luxury-black border-white/10 text-gray-400 hover:text-white" 
                : "bg-white text-black border-white font-semibold"
            }`}
          >
            {isAudioMuted ? <VolumeX size={14} /> : <Volume2 className="animate-pulse" size={14} />}
            <span>{isAudioMuted ? "Sound: Off" : "Ambient: Live"}</span>
          </button>

          {/* Sider adjusters */}
          <button
            onClick={() => setShowAudioControls(!showAudioControls)}
            className="h-11 w-11 rounded-full bg-luxury-gray hover:bg-luxury-light-gray border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all shadow-lg"
          >
            <Sliders size={14} />
          </button>
        </div>
      </div>

      {/* Top Navigation Bar */}
      <header 
        id="main-navigation"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled 
            ? "py-4 bg-luxury-black/80 backdrop-blur-md border-b border-white/5" 
            : "py-7 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo Brand Combo */}
          <a href="#intro" className="flex items-center gap-3 group">
            <SpiceHubLogo size={42} className="transition-transform duration-700 group-hover:rotate-180" />
            <div className="flex flex-col">
              <span className="font-display text-lg font-black tracking-widest text-white leading-none">
                SPICE HUB
              </span>
              <span className="font-mono text-[9px] tracking-[0.25em] text-luxury-gold leading-none mt-1">
                RESTRO CAFÉ
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-8 text-[11px] uppercase tracking-[0.2em] font-medium text-gray-400">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={`hover:text-white transition-colors py-1 relative ${
                  activeTab === item.id ? "text-white" : ""
                }`}
              >
                {item.label}
                {activeTab === item.id && (
                  <motion.div 
                    layoutId="navIndicator" 
                    className="absolute bottom-0 left-0 w-full h-[1px] bg-luxury-gold" 
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Reservation CTA */}
          <div className="flex items-center gap-4">
            <a 
              href="#contact"
              className="px-6 py-2.5 rounded-full bg-white text-black text-[11px] font-bold uppercase tracking-widest hover:bg-luxury-gold hover:text-black transition-all duration-300 shadow-md hover:shadow-luxury-gold/20"
            >
              Reserve
            </a>
          </div>
        </div>
      </header>

      {/* Hero / Intro Cinematic Section */}
      <section 
        id="intro"
        className="relative h-screen flex flex-col justify-center overflow-hidden"
      >
        {/* Cinematic Backdrop Slideshow */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={heroIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.45, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${heroBackgrounds[heroIndex].url}')` }}
            />
          </AnimatePresence>
          {/* Rich Dark vignette filters to enforce high luxury aesthetic */}
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-luxury-black via-transparent to-luxury-black" />
          
          {/* Glowing Ambient light in the background */}
          <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full accent-glow filter blur-[100px] pointer-events-none opacity-40" />
        </div>

        {/* Content Area */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 pt-20">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="mb-6 flex items-center gap-3"
            >
              <span className="h-[1px] w-12 bg-luxury-gold/50" />
              <span className="text-[11px] uppercase tracking-[0.44em] text-luxury-gold font-semibold font-mono">
                {heroBackgrounds[heroIndex].subtitle}
              </span>
            </motion.div>

            <h1 className="text-[42px] sm:text-[68px] lg:text-[96px] leading-[1.0] font-display font-bold tracking-tighter mb-8 uppercase text-reveal-mask">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="block"
              >
                THE ART OF <span className="text-luxury-gold">PRECISION</span> & GOOD VIBES.
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.6 }}
              className="max-w-xl text-lg sm:text-2xl font-serif italic text-gray-300 leading-relaxed font-light"
            >
              A multisensory gastronomy lounge where modern brick arch architecture, warm tripodal lighting, and the ultimate technical mastery of specialty coffee meet.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-12 flex flex-wrap items-center gap-6"
            >
              <a 
                href="#services"
                className="group px-8 py-4 rounded-full bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-luxury-gold hover:text-black transition-all duration-300 flex items-center gap-3 shadow-lg"
              >
                <span>Explore the Atmosphere</span>
                <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
              </a>

              <button
                onClick={handleToggleMute}
                className="group px-6 py-3.5 rounded-full border border-white/10 hover:border-white/30 text-xs font-mono tracking-widest text-gray-300 hover:text-white transition-all flex items-center gap-3 bg-white/5 backdrop-blur-sm"
              >
                <div className="w-2 h-2 rounded-full bg-luxury-gold animate-ping" />
                <span>{isAudioMuted ? "Activate Cinematic Audio" : "Acoustics are Live"}</span>
              </button>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-50">
          <span className="text-[9px] uppercase tracking-[0.3em] font-mono text-gray-400">Scroll down</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* Infinite luxury marquee ribbon */}
      <div className="py-6 border-y border-white/5 bg-luxury-dark overflow-hidden relative z-10">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array(4).fill(null).map((_, i) => (
            <div key={i} className="flex gap-20 text-xs tracking-[0.3em] uppercase font-mono text-gray-500 items-center mx-10">
              <span>● SPICE HUB RESTRO CAFÉ</span>
              <span className="text-luxury-gold">● SINGLE-ORIGIN BREWING</span>
              <span>● CHEVRON BRICK ARCHES</span>
              <span className="text-luxury-gold">● GOOD FOOD / GOOD VIBES</span>
              <span>● SOUND ACOUSTICS</span>
              <span className="text-luxury-gold">● AFTER-HOURS MIXOLOGY</span>
            </div>
          ))}
        </div>
      </div>

      {/* Brand Story / Architectural Heritage Section */}
      <section 
        id="story"
        className="py-24 md:py-36 relative overflow-hidden px-6 md:px-12"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Story Text */}
            <div className="lg:col-span-6 space-y-8">
              <div className="space-y-3">
                <span className="text-[11px] uppercase tracking-[0.4em] text-luxury-gold font-mono font-semibold">
                  ESTABLISHED 2024 / DESIGN PHILOSOPHY
                </span>
                <h2 className="text-4xl sm:text-6xl font-display font-bold tracking-tight uppercase leading-tight">
                  Where Herringbone Bricks Meet Slat Acoustics
                </h2>
              </div>

              <p className="text-lg text-gray-300 font-light leading-relaxed">
                Spice Hub Restro Café is an ode to architectural charm and sensory detail. Framed by monumental brick-vaulted arches that cast an amber-hued glow, our physical lounge provides the ultimate haven for creative souls and coffee purists alike.
              </p>

              <p className="text-base text-gray-400 leading-relaxed font-light">
                Our interior details are carefully synchronized to promote tranquility: vertical timber wood slats line the bar, tripodal warm floor lamps softly spotlight quiet conversation corners, and our outdoor courtyard features cylindrical concrete planters shaded by tropical palm leaves under strings of stardust fairy lights.
              </p>

              {/* Mini counters */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/5">
                <div>
                  <div className="text-3xl font-display font-bold text-white">88+</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest font-mono mt-1">Cupping Score</div>
                </div>
                <div>
                  <div className="text-3xl font-display font-bold text-white">36 hrs</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest font-mono mt-1">Sourdough Ferment</div>
                </div>
                <div>
                  <div className="text-3xl font-display font-bold text-white">4.9 ★</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest font-mono mt-1">Critic Rating</div>
                </div>
              </div>
            </div>

            {/* Immersive Photo Layout (2 Layered Frame) */}
            <div className="lg:col-span-6 relative">
              {/* Outer Glow behind photos */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] radial-glow filter blur-[60px] opacity-45" />

              {/* Primary large image (Warm lamp & brick chevron) */}
              <div className="relative z-10 w-4/5 aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1000" 
                  alt="Spice Hub Cozy Corner" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2000ms]"
                />
                <div className="absolute bottom-6 left-6 right-6 bg-black/40 backdrop-blur-md border border-white/10 p-5 rounded-2xl">
                  <span className="text-[10px] uppercase tracking-widest font-mono text-luxury-gold">INTERIOR MOOD</span>
                  <p className="text-xs text-gray-300 mt-1">Tripodal standing lamp against custom chevron layout brickwork.</p>
                </div>
              </div>

              {/* Secondary offset image (Towering arches facade) */}
              <div className="absolute bottom-[-40px] right-0 z-20 w-3/5 aspect-[1/1] rounded-[2rem] overflow-hidden border border-white/15 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1000" 
                  alt="Spice Hub Arch Exterior" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2000ms]"
                />
                <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                  <span className="text-[9px] uppercase tracking-widest font-mono text-white">THE ARCHWAY EXTERIOR</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Premium Services - Experience Section */}
      <section 
        id="services"
        className="py-24 bg-luxury-dark px-6 md:px-12 relative border-y border-white/5"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <span className="text-[11px] uppercase tracking-[0.4em] text-luxury-gold font-mono font-semibold">
              SENSORY CURATION
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-bold tracking-tight uppercase">
              The Four pillars of Spice Hub
            </h2>
            <p className="text-gray-400 font-light">
              Crafted precisely to stimulate the five human senses, orchestrating a perfect environment of good food and outstanding vibes.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICE_ITEMS.map((service, index) => {
              // Map icon string to actual Lucide component
              const IconComp = {
                Coffee: Coffee,
                Compass: Compass,
                Sparkles: Sparkles,
                Volume2: Volume2
              }[service.iconName] || Coffee;

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass-panel p-8 rounded-3xl flex flex-col justify-between group cursor-pointer hover:border-luxury-gold/30 transition-all duration-500 interactive-card min-h-[320px]"
                >
                  <div>
                    {/* Icon Base */}
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-luxury-gold border border-white/5 mb-8 group-hover:bg-luxury-gold group-hover:text-black transition-all duration-500">
                      <IconComp size={20} />
                    </div>

                    <span className="text-[9px] uppercase tracking-[0.2em] font-mono text-luxury-gold">
                      {service.tag}
                    </span>
                    <h3 className="text-xl font-display font-semibold text-white mt-2 group-hover:text-luxury-gold transition-colors duration-300">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-gray-400 text-xs leading-relaxed font-light mt-4">
                    {service.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* The Epicurean Menu Lounge Section */}
      <section 
        id="menu"
        className="py-24 md:py-36 relative px-6 md:px-12 overflow-hidden"
      >
        {/* Glow */}
        <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] radial-glow filter blur-[100px] pointer-events-none opacity-30" />

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-8 mb-16">
            <div className="space-y-4">
              <span className="text-[11px] uppercase tracking-[0.4em] text-luxury-gold font-mono font-semibold">
                SENSORY PARINGS
              </span>
              <h2 className="text-4xl sm:text-6xl font-display font-bold uppercase tracking-tight">
                The Gastronomic Lounge Menu
              </h2>
              <p className="text-gray-400 max-w-xl font-light">
                Hover or click on any elixir to activate the **Intelligent Pairing Engine** and discover our chef's recommended complementary culinary plates.
              </p>
            </div>

            {/* Menu Tabs / Filters */}
            <div className="flex flex-wrap gap-3">
              {MENU_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 border ${
                    activeCategory === cat.id 
                      ? "bg-white text-black border-white" 
                      : "bg-transparent text-gray-400 border-white/10 hover:text-white"
                  }`}
                >
                  {cat.title}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content Panels */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12"
            >
              {/* Category Showcase Block (Left) */}
              <div className="space-y-8 lg:pr-8 border-r border-white/5">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 bg-luxury-gold/10 px-3.5 py-1 rounded-full border border-luxury-gold/20">
                    <Award size={10} className="text-luxury-gold" />
                    <span className="text-[9px] uppercase tracking-widest font-mono text-luxury-gold font-bold">
                      AWARDS SELECTION
                    </span>
                  </div>
                  <h3 className="text-3xl font-serif italic text-white">
                    {MENU_CATEGORIES.find(c => c.id === activeCategory)?.title}
                  </h3>
                  <p className="text-gray-400 text-sm font-light leading-relaxed">
                    {MENU_CATEGORIES.find(c => c.id === activeCategory)?.subtitle}
                  </p>
                </div>

                {/* Simulated coffee pouring visuals */}
                <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden border border-white/10 group">
                  <img 
                    src={
                      activeCategory === "coffee" 
                        ? "https://images.unsplash.com/photo-1510972527409-cca19de31749?auto=format&fit=crop&q=80&w=1000"
                        : activeCategory === "plates"
                        ? "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1000"
                        : "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=1000"
                    } 
                    alt="Category visual" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3000ms]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-luxury-gold animate-ping" />
                    <span className="text-xs font-mono tracking-widest uppercase">94pt Specialty Grader Standard</span>
                  </div>
                </div>
              </div>

              {/* Items List (Right) */}
              <div className="space-y-6 flex flex-col justify-center">
                {MENU_CATEGORIES.find(c => c.id === activeCategory)?.items.map((item) => {
                  const isPairingPartner = pairingItem && getPairingRecommendation(pairingItem)?.name === item.name;

                  return (
                    <motion.div
                      key={item.id}
                      onMouseEnter={() => setPairingItem(item.id)}
                      onMouseLeave={() => setPairingItem(null)}
                      className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                        isPairingPartner 
                          ? "bg-luxury-gold/5 border-luxury-gold/40 shadow-lg shadow-luxury-gold/5 scale-[1.02]" 
                          : "bg-white/[0.01] border-white/5 hover:bg-white/[0.03] hover:border-white/10"
                      }`}
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="text-lg font-display font-semibold text-white hover:text-luxury-gold transition-colors">
                              {item.name}
                            </h4>
                            {item.isSignature && (
                              <span className="bg-luxury-gold/10 text-luxury-gold border border-luxury-gold/20 px-2 py-0.5 rounded text-[8px] uppercase tracking-widest font-mono font-bold">
                                SIGNATURE
                              </span>
                            )}
                          </div>
                          <p className="text-gray-400 text-xs leading-relaxed font-light">
                            {item.description}
                          </p>
                        </div>
                        <span className="text-lg font-mono text-luxury-gold font-light">
                          {item.price}
                        </span>
                      </div>

                      {/* Pairing Intelligence guide line indicator */}
                      <AnimatePresence>
                        {pairingItem === item.id && getPairingRecommendation(item.id) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-luxury-gold"
                          >
                            <span className="flex items-center gap-1">
                              <Sparkles size={10} className="animate-spin" />
                              RECOMMENDED PAIRING:
                            </span>
                            <span className="uppercase tracking-widest text-white">
                              {getPairingRecommendation(item.id)?.name} ({getPairingRecommendation(item.id)?.price})
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Interactive Sensory Tasting Reservation Engine */}
      <section 
        id="contact"
        className="py-24 bg-luxury-dark border-y border-white/5 relative px-6 md:px-12"
      >
        <div className="absolute inset-0 bg-radial-glow filter blur-[120px] pointer-events-none opacity-20" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-stretch">
            
            {/* Context Narrative (Left) */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 text-luxury-gold">
                  <Star size={12} className="fill-luxury-gold" />
                  <span className="text-[11px] uppercase tracking-[0.4em] font-mono font-bold">
                    RESERVE A CHAMBER
                  </span>
                </div>

                <h2 className="text-4xl sm:text-5xl font-display font-bold uppercase leading-tight">
                  Design Your Sensory Seating
                </h2>

                <p className="text-gray-300 text-sm leading-relaxed font-light">
                  A reservation at Spice Hub goes beyond reserving a table. Our advanced booking portal allows you to pre-select your micro-acoustic playlist and room lighting vibe, establishing pristine sensory alignment before you step inside.
                </p>

                {/* Physical Contact Coordinates */}
                <div className="space-y-4 pt-8 border-t border-white/5 font-mono text-xs text-gray-400">
                  <div className="flex items-center gap-3">
                    <MapPin size={14} className="text-luxury-gold" />
                    <span>H-21 Sector 9, Chevron Boulevard, Digital Hub</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={14} className="text-luxury-gold" />
                    <span>+1 (800) SPICE-HUB / (800) 774-2348</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail size={14} className="text-luxury-gold" />
                    <span>lounge@spicehubcafe.luxury</span>
                  </div>
                </div>
              </div>

              {/* Business operating timings */}
              <div className="pt-8 lg:pt-0 mt-8 border-t border-white/5 lg:border-t-0">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">LOUNGE HOURS</span>
                <div className="flex justify-between text-xs font-mono text-gray-300 mt-2">
                  <span>Mon – Fri:</span>
                  <span>07:00 – 23:00 (Twilight Cocktails from 18:00)</span>
                </div>
                <div className="flex justify-between text-xs font-mono text-gray-300 mt-1">
                  <span>Sat – Sun:</span>
                  <span>08:00 – Midnight (Live Jazz & Roastery Sessions)</span>
                </div>
              </div>
            </div>

            {/* Interactive Form (Right) */}
            <div className="lg:col-span-7">
              <div className="glass-panel p-8 md:p-12 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden">
                
                {/* Visual decoration */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-luxury-gold/5 rounded-full filter blur-xl" />

                <AnimatePresence mode="wait">
                  {!bookingSubmitted ? (
                    <motion.form 
                      key="booking-form"
                      onSubmit={handleReservation}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                    >
                      {/* STEP 1: SELECT LOUNGE ZONE */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block">
                          1. Select Spatial Zone
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                          <button
                            type="button"
                            onClick={() => setBookingZone("hearth")}
                            className={`p-4 rounded-xl border text-left transition-all duration-300 ${
                              bookingZone === "hearth"
                                ? "border-luxury-gold bg-luxury-gold/5 text-white shadow-md shadow-luxury-gold/5"
                                : "border-white/5 bg-white/[0.01] hover:bg-white/[0.03]"
                            }`}
                          >
                            <span className="text-xs font-display font-semibold block">The Hearth</span>
                            <span className="text-[8px] text-gray-400 font-mono mt-1 block uppercase">Brick Chevron</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setBookingZone("timber")}
                            className={`p-4 rounded-xl border text-left transition-all duration-300 ${
                              bookingZone === "timber"
                                ? "border-luxury-gold bg-luxury-gold/5 text-white shadow-md shadow-luxury-gold/5"
                                : "border-white/5 bg-white/[0.01] hover:bg-white/[0.03]"
                            }`}
                          >
                            <span className="text-xs font-display font-semibold block">Timber Slat</span>
                            <span className="text-[8px] text-gray-400 font-mono mt-1 block uppercase">Acoustic Bar</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setBookingZone("courtyard")}
                            className={`p-4 rounded-xl border text-left transition-all duration-300 ${
                              bookingZone === "courtyard"
                                ? "border-luxury-gold bg-luxury-gold/5 text-white shadow-md shadow-luxury-gold/5"
                                : "border-white/5 bg-white/[0.01] hover:bg-white/[0.03]"
                            }`}
                          >
                            <span className="text-xs font-display font-semibold block">The Courtyard</span>
                            <span className="text-[8px] text-gray-400 font-mono mt-1 block uppercase">Palm Trees</span>
                          </button>
                        </div>
                      </div>

                      {/* STEP 2: DETAILS */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block">
                            Date
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-3.5 text-luxury-gold" size={14} />
                            <input 
                              type="date"
                              required
                              value={bookingDate}
                              onChange={(e) => setBookingDate(e.target.value)}
                              className="w-full bg-white/[0.02] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs font-mono text-white focus:outline-none focus:border-luxury-gold focus:bg-white/[0.04]"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block">
                            Hour
                          </label>
                          <div className="relative">
                            <Clock className="absolute left-3 top-3.5 text-luxury-gold" size={14} />
                            <select
                              value={bookingTime}
                              onChange={(e) => setBookingTime(e.target.value)}
                              className="w-full bg-white/[0.02] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs font-mono text-white focus:outline-none focus:border-luxury-gold focus:bg-white/[0.04] appearance-none"
                            >
                              <option className="bg-luxury-black" value="18:00">18:00 (Sunset)</option>
                              <option className="bg-luxury-black" value="19:30">19:30 (Golden Hour)</option>
                              <option className="bg-luxury-black" value="20:00">20:00 (Fairy Lights)</option>
                              <option className="bg-luxury-black" value="21:30">21:30 (Acoustic Solo)</option>
                              <option className="bg-luxury-black" value="22:30">22:30 (Midnight Jazz)</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block">
                            Guests
                          </label>
                          <div className="relative">
                            <Users className="absolute left-3 top-3.5 text-luxury-gold" size={14} />
                            <select
                              value={bookingGuests}
                              onChange={(e) => setBookingGuests(parseInt(e.target.value))}
                              className="w-full bg-white/[0.02] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs font-mono text-white focus:outline-none focus:border-luxury-gold focus:bg-white/[0.04]"
                            >
                              <option className="bg-luxury-black" value={1}>1 Aesthete</option>
                              <option className="bg-luxury-black" value={2}>2 Guests</option>
                              <option className="bg-luxury-black" value={4}>4 Chamber Party</option>
                              <option className="bg-luxury-black" value={6}>6 Curated Dinner</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* STEP 3: SENSORY CONFIGURATOR */}
                      <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 space-y-4">
                        <span className="text-[9px] font-mono text-luxury-gold uppercase tracking-[0.2em] font-bold block">
                          🛠 Sensory Alignment Engine
                        </span>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <span className="text-[9px] font-mono text-gray-500 uppercase">Lighting Preset</span>
                            <div className="flex gap-2">
                              {["dim-amber", "ochre", "midnight"].map((light) => (
                                <button
                                  key={light}
                                  type="button"
                                  onClick={() => setBookingLighting(light as any)}
                                  className={`px-3 py-1.5 rounded-lg text-[9px] font-mono uppercase tracking-widest border transition-all ${
                                    bookingLighting === light
                                      ? "border-luxury-gold bg-luxury-gold/10 text-white"
                                      : "border-white/5 text-gray-400 hover:text-white"
                                  }`}
                                >
                                  {light.replace("-", " ")}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <span className="text-[9px] font-mono text-gray-500 uppercase">Acoustic Audio Sync</span>
                            <div className="flex gap-2">
                              {["ambient-rain", "vinyl-jazz", "silence"].map((track) => (
                                <button
                                  key={track}
                                  type="button"
                                  onClick={() => setBookingAcoustic(track as any)}
                                  className={`px-3 py-1.5 rounded-lg text-[9px] font-mono uppercase tracking-widest border transition-all ${
                                    bookingAcoustic === track
                                      ? "border-luxury-gold bg-luxury-gold/10 text-white"
                                      : "border-white/5 text-gray-400 hover:text-white"
                                  }`}
                                >
                                  {track.replace("-", " ")}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* SUBMIT BUTTON */}
                      <button
                        type="submit"
                        className="w-full py-4 rounded-xl bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-luxury-gold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-luxury-gold/10"
                      >
                        <span>Secure Private Placement</span>
                        <ChevronRight size={14} />
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="booking-success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center space-y-6 py-6"
                    >
                      {/* Verified Badge */}
                      <div className="w-16 h-16 rounded-full bg-luxury-gold/10 border border-luxury-gold/20 flex items-center justify-center text-luxury-gold mx-auto">
                        <Check size={28} />
                      </div>

                      <div className="space-y-2">
                        <span className="text-[10px] font-mono text-luxury-gold uppercase tracking-[0.25em]">
                          RESERVATION CONFIRMED
                        </span>
                        <h3 className="text-3xl font-display font-bold uppercase">
                          Sensory Placement Secured
                        </h3>
                        <p className="text-gray-400 text-xs max-w-md mx-auto leading-relaxed">
                          Your private experience has been logged into our digital ledger. A personalized table configuration matching your lighting and acoustic preferences has been prepared.
                        </p>
                      </div>

                      {/* Ticket Mock */}
                      <div className="max-w-xs mx-auto border border-dashed border-white/20 p-5 rounded-2xl bg-white/[0.01] text-left font-mono text-[11px] space-y-3">
                        <div className="flex justify-between pb-2 border-b border-white/5">
                          <span className="text-gray-400">PASSPORT ID:</span>
                          <span className="text-white font-bold">{bookingCode}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">ZONE:</span>
                          <span className="text-white uppercase">{bookingZone}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">DATE:</span>
                          <span className="text-white">{bookingDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">HOUR:</span>
                          <span className="text-white">{bookingTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">LIGHTING:</span>
                          <span className="text-luxury-gold uppercase">{bookingLighting}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">ACOUSTIC:</span>
                          <span className="text-luxury-gold uppercase">{bookingAcoustic}</span>
                        </div>

                        {/* QR Code Art */}
                        <div className="pt-4 border-t border-white/5 flex flex-col items-center gap-2">
                          <div className="w-24 h-24 bg-white p-1 rounded-lg flex flex-wrap justify-between">
                            {/* A highly elegant, abstract matrix to resemble a high-end barcode/QR */}
                            {Array(16).fill(null).map((_, idx) => (
                              <div 
                                key={idx} 
                                className={`w-5 h-5 rounded-sm ${
                                  (idx % 2 === 0 && idx % 3 !== 0) || idx === 0 || idx === 15 
                                    ? "bg-black" 
                                    : "bg-white"
                                }`} 
                              />
                            ))}
                          </div>
                          <span className="text-[8px] text-gray-500">SCAN AT PHYSICAL LOUNGE ENTRY</span>
                        </div>
                      </div>

                      <button
                        onClick={() => setBookingSubmitted(false)}
                        className="px-6 py-2.5 rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-white/20 text-[10px] font-mono tracking-widest uppercase transition-all"
                      >
                        Modify Booking Preferences
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* The Arch Lightbox Gallery Section */}
      <section 
        id="gallery"
        className="py-24 md:py-36 relative px-6 md:px-12"
      >
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-8 mb-16">
            <div className="space-y-4">
              <span className="text-[11px] uppercase tracking-[0.4em] text-luxury-gold font-mono font-semibold">
                CURATED ARCHIVES
              </span>
              <h2 className="text-4xl sm:text-6xl font-display font-bold uppercase tracking-tight">
                Atmosphere Gallery
              </h2>
              <p className="text-gray-400 max-w-xl font-light">
                Explore the actual visual blueprints of our physical space—spanning chevron-brickwork, wood-slat configurations, and espresso extraction symmetry.
              </p>
            </div>

            {/* Gallery Category Filters */}
            <div className="flex flex-wrap gap-2">
              {["All", "Architecture", "Brewing", "Interior", "Exterior", "Gastronomy"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setGalleryFilter(cat)}
                  className={`px-4 py-2.5 rounded-full text-[9px] font-mono uppercase tracking-wider transition-all duration-300 border ${
                    galleryFilter === cat 
                      ? "bg-white text-black border-white" 
                      : "bg-transparent text-gray-400 border-white/10 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Masonry Layout Grid */}
          <motion.div 
            layout
            className="masonry-grid"
          >
            <AnimatePresence mode="popLayout">
              {filteredGallery.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  onClick={() => setActiveLightboxImage(item)}
                  className={`relative rounded-3xl overflow-hidden border border-white/5 cursor-pointer group shadow-lg ${
                    item.aspectRatio === "tall" 
                      ? "row-span-2 h-[500px]" 
                      : item.aspectRatio === "wide" 
                      ? "col-span-1 md:col-span-2 h-[300px]" 
                      : "h-[350px]"
                  }`}
                >
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                  {/* Subtle hover gradient and overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-all duration-300" />
                  
                  {/* Text labels revealed on hover */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <span className="text-[9px] font-mono text-luxury-gold uppercase tracking-[0.2em] font-bold">
                      {item.category}
                    </span>
                    <h4 className="text-xl font-display font-semibold text-white mt-1">
                      {item.title}
                    </h4>
                    <p className="text-gray-400 text-xs mt-2 font-light line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {item.description}
                    </p>
                    <div className="mt-4 flex items-center gap-1.5 text-[10px] font-mono text-luxury-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <span>OPEN EXQUISITE DETAILS</span>
                      <ArrowUpRight size={10} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>

      {/* Guest Reviews & Live Digital Feedback Lounge */}
      <section 
        id="team"
        className="py-24 bg-luxury-dark border-y border-white/5 relative px-6 md:px-12"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Column: Testimonials & Submissions */}
            <div className="lg:col-span-7 space-y-12">
              <div className="space-y-4">
                <span className="text-[11px] uppercase tracking-[0.4em] text-luxury-gold font-mono font-semibold">
                  GUEST JOURNAL
                </span>
                <h2 className="text-3xl sm:text-5xl font-display font-bold uppercase tracking-tight">
                  The Lounge Chronicles
                </h2>
                <p className="text-gray-400 font-light text-sm max-w-lg">
                  Read authentic feedback or contribute your own entry. Our digital Guest Ledger is saved directly to local state for future visitors to discover.
                </p>
              </div>

              {/* Scrolling reviews list */}
              <div className="space-y-6 max-h-[500px] overflow-y-auto pr-4 scrollbar-thin">
                <AnimatePresence initial={false}>
                  {testimonialsList.map((test) => (
                    <motion.div
                      key={test.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <img 
                            src={test.avatarUrl} 
                            alt={test.name} 
                            className="w-10 h-10 rounded-full object-cover border border-white/10"
                          />
                          <div>
                            <h4 className="text-sm font-semibold text-white">{test.name}</h4>
                            <span className="text-[10px] font-mono text-gray-500 uppercase">{test.role}</span>
                          </div>
                        </div>

                        {/* Ratings */}
                        <div className="flex gap-1">
                          {Array(test.rating).fill(null).map((_, i) => (
                            <Star key={i} size={11} className="fill-luxury-gold text-luxury-gold" />
                          ))}
                        </div>
                      </div>

                      <p className="text-xs text-gray-300 font-light leading-relaxed italic">
                        "{test.quote}"
                      </p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Right Column: Write a feedback */}
            <div className="lg:col-span-5">
              <div className="glass-panel p-8 rounded-[2rem] border border-white/10 relative">
                
                <h3 className="text-xl font-display font-bold uppercase mb-2">
                  Sign our Guestbook
                </h3>
                <p className="text-xs text-gray-400 font-light mb-6">
                  Add your experience, rate our brews, and tell other travelers about the Spice Hub vibe.
                </p>

                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono uppercase tracking-widest text-gray-400 block">
                      Name
                    </label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. Marcus Aurelius"
                      value={newReviewName}
                      onChange={(e) => setNewReviewName(e.target.value)}
                      className="w-full bg-white/[0.02] border border-white/10 rounded-xl py-3 px-4 text-xs font-mono text-white focus:outline-none focus:border-luxury-gold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-mono uppercase tracking-widest text-gray-400 block">
                      Role / Tag
                    </label>
                    <input 
                      type="text"
                      placeholder="e.g. Design Enthusiast"
                      value={newReviewRole}
                      onChange={(e) => setNewReviewRole(e.target.value)}
                      className="w-full bg-white/[0.02] border border-white/10 rounded-xl py-3 px-4 text-xs font-mono text-white focus:outline-none focus:border-luxury-gold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-mono uppercase tracking-widest text-gray-400 block">
                      Lounge Rating
                    </label>
                    <div className="flex gap-2 py-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReviewRating(star)}
                          className="text-luxury-gold hover:scale-110 transition-transform"
                        >
                          <Star size={18} className={newReviewRating >= star ? "fill-luxury-gold" : "text-gray-600"} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-mono uppercase tracking-widest text-gray-400 block">
                      Experience Entry
                    </label>
                    <textarea 
                      required
                      rows={3}
                      placeholder="Share your thoughts on our brick arches, temperature profiling, or good vibes..."
                      value={newReviewQuote}
                      onChange={(e) => setNewReviewQuote(e.target.value)}
                      className="w-full bg-white/[0.02] border border-white/10 rounded-xl py-3 px-4 text-xs font-sans text-white focus:outline-none focus:border-luxury-gold"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-luxury-gold transition-all duration-300"
                  >
                    Append to Digital Ledger
                  </button>

                  <AnimatePresence>
                    {reviewSubmitted && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-[10px] font-mono text-luxury-gold text-center pt-2"
                      >
                        ✔ Added successfully. Thank you for your sensory review!
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>

              </div>
            </div>

          </div>

          {/* Artisanal Team Block */}
          <div className="mt-24 pt-16 border-t border-white/5">
            <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
              <span className="text-[10px] uppercase tracking-[0.35em] text-luxury-gold font-mono">OUR EXPERTS</span>
              <h3 className="text-3xl font-display font-semibold uppercase">The Beverage & Food Architects</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {TEAM_MEMBERS.map((member) => (
                <div key={member.id} className="glass-panel p-6 rounded-3xl border border-white/5 flex flex-col sm:flex-row gap-6 items-center">
                  <img 
                    src={member.imageUrl} 
                    alt={member.name} 
                    className="w-28 h-28 rounded-2xl object-cover border border-white/10 shadow-lg"
                  />
                  <div className="space-y-2 text-center sm:text-left">
                    <div>
                      <h4 className="text-lg font-display font-semibold text-white">{member.name}</h4>
                      <span className="text-[10px] font-mono text-luxury-gold uppercase tracking-wider">{member.role}</span>
                    </div>
                    <p className="text-[11px] text-gray-400 font-light leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Frequently Asked Inquiries Section */}
      <section 
        id="faq"
        className="py-24 md:py-36 px-6 md:px-12 relative overflow-hidden"
      >
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center space-y-4 mb-16">
            <span className="text-[11px] uppercase tracking-[0.4em] text-luxury-gold font-mono font-semibold">
              EXQUISITE INQUIRIES
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-bold uppercase tracking-tight">
              Curated FAQ & Details
            </h2>
            <p className="text-gray-400 font-light text-sm max-w-md mx-auto">
              We look forward to hosting you. Here are details regarding our space sourcing, acoustical science, and private events.
            </p>
          </div>

          {/* Accordion Panels */}
          <div className="space-y-4">
            {FAQS.map((faq) => {
              const isOpen = openFaqId === faq.id;

              return (
                <div 
                  key={faq.id}
                  className="glass-panel rounded-2xl border border-white/5 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full p-6 text-left flex justify-between items-center transition-all hover:bg-white/[0.01]"
                  >
                    <span className="font-display font-semibold text-sm sm:text-base text-white hover:text-luxury-gold transition-colors">
                      {faq.question}
                    </span>
                    <div className={`text-luxury-gold transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                      <ChevronDown size={16} />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="p-6 pt-0 border-t border-white/5 text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-luxury-dark border-t border-white/5 py-16 px-6 md:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            
            {/* Column 1: Brand details */}
            <div className="md:col-span-4 space-y-6">
              <div className="flex items-center gap-3">
                <SpiceHubLogo size={54} />
                <div className="flex flex-col">
                  <span className="font-display text-xl font-black tracking-widest text-white leading-none">
                    SPICE HUB
                  </span>
                  <span className="font-mono text-[9px] tracking-[0.25em] text-luxury-gold leading-none mt-1">
                    RESTRO CAFÉ
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
                Celebrating modern brick-arch architecture, temperature-profiled single-origin coffee brewing, and outstanding gastronomic platters under ambient tripodal lighting.
              </p>
              <div className="flex gap-4 text-gray-500">
                <a href="#" className="hover:text-luxury-gold transition-colors"><Instagram size={16} /></a>
                <a href="#" className="hover:text-luxury-gold transition-colors"><Facebook size={16} /></a>
              </div>
            </div>

            {/* Column 2: Navigation Links */}
            <div className="md:col-span-3 space-y-4">
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">EXPLORATION</span>
              <ul className="space-y-2 text-xs text-gray-400 font-light">
                {NAV_ITEMS.map(item => (
                  <li key={item.id}>
                    <a href={item.href} className="hover:text-white transition-colors flex items-center gap-1.5 group">
                      <ChevronRight size={10} className="text-luxury-gold group-hover:translate-x-1 transition-transform" />
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Ambient Synths Coordinates */}
            <div className="md:col-span-5 space-y-4 font-mono text-xs text-gray-400">
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">SENSORY STATUS</span>
              <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-2 text-[11px]">
                <div className="flex justify-between">
                  <span>Vibe Generator:</span>
                  <span className="text-luxury-gold">Active (Web Audio)</span>
                </div>
                <div className="flex justify-between">
                  <span>Acoustic Sync:</span>
                  <span className="text-luxury-gold">Ready for Table Pairing</span>
                </div>
                <div className="flex justify-between">
                  <span>Average Score:</span>
                  <span>94/100 Specialty standard</span>
                </div>
                <div className="flex justify-between">
                  <span>Operating standard:</span>
                  <span>60 FPS Cinematic Scrolling</span>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-gray-500 gap-4">
            <span>© 2026 SPICE HUB RESTRO CAFÉ. PRIVACY PRESERVED. DESIGNED FOR COFFEE AESTHETES.</span>
            <span className="flex items-center gap-1">
              <span>Made with premium precision in deep twilight</span>
              <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold animate-pulse" />
            </span>
          </div>
        </div>
      </footer>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-luxury-black/95 z-[99999] flex items-center justify-center p-4 md:p-12 backdrop-blur-md"
          >
            {/* Close trigger area */}
            <div className="absolute inset-0" onClick={() => setActiveLightboxImage(null)} />

            {/* Main content modal */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-panel rounded-3xl max-w-5xl w-full overflow-hidden relative z-10 border border-white/10 shadow-2xl flex flex-col md:flex-row"
            >
              <button
                onClick={() => setActiveLightboxImage(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 flex items-center justify-center text-white transition-all"
              >
                <X size={16} />
              </button>

              {/* Image Frame */}
              <div className="md:w-3/5 aspect-square md:aspect-auto md:h-[550px] relative">
                <img 
                  src={activeLightboxImage.imageUrl} 
                  alt={activeLightboxImage.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Narratives Frame */}
              <div className="md:w-2/5 p-8 md:p-10 flex flex-col justify-between bg-luxury-dark border-l border-white/5">
                <div className="space-y-6">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-luxury-gold uppercase tracking-[0.2em] font-bold block">
                      {activeLightboxImage.category} Blueprint
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-display font-semibold text-white uppercase">
                      {activeLightboxImage.title}
                    </h3>
                  </div>

                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light">
                    {activeLightboxImage.description}
                  </p>

                  <div className="pt-6 border-t border-white/5 space-y-4">
                    <span className="text-[9px] font-mono text-gray-500 uppercase block">Spatial Highlights</span>
                    <div className="grid grid-cols-2 gap-3 text-[10px] font-mono text-gray-300">
                      <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                        <span className="text-gray-500 block">LIGHT LEVEL</span>
                        <span className="text-luxury-gold">Amber Warmth</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                        <span className="text-gray-500 block">ACOUSTICS</span>
                        <span className="text-luxury-gold">Timber Deflected</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-8 md:pt-0 mt-8 md:mt-0">
                  <button
                    onClick={() => {
                      setActiveLightboxImage(null);
                      // Scroll to contact form with preselected zone
                      const zoneMap: { [key: string]: any } = {
                        "Interior": "hearth",
                        "Architecture": "hearth",
                        "Exterior": "courtyard",
                        "Brewing": "timber"
                      };
                      const zone = zoneMap[activeLightboxImage.category] || "hearth";
                      setBookingZone(zone);
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full py-3.5 rounded-xl bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-luxury-gold transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span>Reserve this Exact Spot</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
