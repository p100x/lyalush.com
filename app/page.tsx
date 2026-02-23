'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Hls from 'hls.js'
import {
  Instagram,
  Twitter,
  Youtube,
  Heart,
  Star,
  Sparkles,
  Crown,
  Lock,
  Camera,
  MessageCircle,
  Gift,
  ChevronDown,
  ExternalLink,
  Mail,
  ArrowRight,
  Play,
  Image as ImageIcon,
  Globe,
  Check,
} from 'lucide-react'

// Language Types
type Language = 'en' | 'de' | 'es'

interface LanguageOption {
  code: Language
  name: string
  flag: string
}

const languages: LanguageOption[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
]

// Translations
const translations = {
  en: {
    verifiedCreator: 'Verified Creator',
    tagline: 'Pure Colombian energy. Sweet face, boldest curves',
    joinExclusive: 'Join Exclusive',
    followMe: 'Follow Me',
    stat1Label: 'Colombian',
    stat2Label: 'Spicy Content',
    stat3Label: 'Premium Quality',
    latestContent: 'Latest Content',
    sneakPeek: 'Sneak',
    peekHighlight: 'Peek',
    glimpse: 'A glimpse of what\'s waiting for you inside',
    subscribeToUnlock: 'Subscribe to unlock',
    photoSet: 'Photo Set',
    video: 'Video',
    exclusive: 'Exclusive',
    viewAllContent: 'View All Content',
    connectWithMe: 'Connect With Me',
    choosePlatform: 'Choose your favorite platform',
    exclusiveAccess: 'Exclusive Access',
    whatYouGet: 'What You\'ll',
    getHighlight: 'Get',
    unlockPremium: 'Unlock premium content and perks reserved only for my VIP subscribers',
    subscribeNow: 'Subscribe Now',
    joinSubscribers: 'Join 50,000+ subscribers already inside',
    stayUpdated: 'Stay',
    updatedHighlight: 'Updated',
    newsletterDesc: 'Get exclusive updates, special offers, and behind-the-scenes content delivered straight to your inbox.',
    enterEmail: 'Enter your email',
    subscribe: 'Subscribe',
    subscribed: 'Subscribed!',
    noSpam: 'No spam, ever. Unsubscribe anytime.',
    allRights: 'All rights reserved.',
    fansly: 'Fansly',
    fanslyDesc: 'Exclusive content & premium access',
    onlyfans: 'OnlyFans',
    onlyfansDesc: 'Premium photos, videos & behind-the-scenes',
    instagramDesc: '@lyalush • Daily updates & stories',
    twitterDesc: '@lyalush • Thoughts & interactions',
    youtubeDesc: 'Vlogs, tutorials & more',
    exclusivePhotos: 'Exclusive Photos',
    exclusivePhotosDesc: 'High-quality, never-before-seen content updated weekly',
    directMessages: 'Direct Messages',
    directMessagesDesc: 'Personal conversations and priority responses',
    specialPerks: 'Special Perks',
    specialPerksDesc: 'Early access, giveaways, and subscriber-only events',
    privateContent: 'Private Content',
    privateContentDesc: 'Behind-the-scenes access you won\'t find anywhere else',
    summerVibes: 'Summer Vibes',
    behindTheScenes: 'Behind the Scenes',
    goldenHour: 'Golden Hour',
    nightOut: 'Night Out',
    qaSession: 'Q&A Session',
    weekendMood: 'Weekend Mood',
  },
  de: {
    verifiedCreator: 'Verifizierter Creator',
    tagline: 'Pure kolumbianische Energie. Süßes Gesicht, krasseste Kurven.',
    joinExclusive: 'Exklusiv beitreten',
    followMe: 'Folge mir',
    stat1Label: 'Kolumbianerin',
    stat2Label: 'Heißer Content',
    stat3Label: 'Premium Qualität',
    latestContent: 'Neueste Inhalte',
    sneakPeek: 'Ein kleiner',
    peekHighlight: 'Vorgeschmack',
    glimpse: 'Ein Einblick in das, was dich erwartet',
    subscribeToUnlock: 'Abonnieren zum Freischalten',
    photoSet: 'Foto-Set',
    video: 'Video',
    exclusive: 'Exklusiv',
    viewAllContent: 'Alle Inhalte ansehen',
    connectWithMe: 'Verbinde dich mit mir',
    choosePlatform: 'Wähle deine Lieblingsplattform',
    exclusiveAccess: 'Exklusiver Zugang',
    whatYouGet: 'Was du',
    getHighlight: 'bekommst',
    unlockPremium: 'Schalte Premium-Inhalte und Vorteile frei, die nur meinen VIP-Abonnenten vorbehalten sind',
    subscribeNow: 'Jetzt abonnieren',
    joinSubscribers: 'Schließe dich 50.000+ Abonnenten an',
    stayUpdated: 'Bleib auf dem',
    updatedHighlight: 'Laufenden',
    newsletterDesc: 'Erhalte exklusive Updates, Sonderangebote und Behind-the-Scenes-Inhalte direkt in deinen Posteingang.',
    enterEmail: 'E-Mail eingeben',
    subscribe: 'Abonnieren',
    subscribed: 'Abonniert!',
    noSpam: 'Kein Spam, niemals. Jederzeit abmelden.',
    allRights: 'Alle Rechte vorbehalten.',
    fansly: 'Fansly',
    fanslyDesc: 'Exklusive Inhalte & Premium-Zugang',
    onlyfans: 'OnlyFans',
    onlyfansDesc: 'Premium Fotos, Videos & Behind-the-Scenes',
    instagramDesc: '@lyalush • Tägliche Updates & Stories',
    twitterDesc: '@lyalush • Gedanken & Interaktionen',
    youtubeDesc: 'Vlogs, Tutorials & mehr',
    exclusivePhotos: 'Exklusive Fotos',
    exclusivePhotosDesc: 'Hochwertige, nie zuvor gesehene Inhalte, wöchentlich aktualisiert',
    directMessages: 'Direktnachrichten',
    directMessagesDesc: 'Persönliche Gespräche und bevorzugte Antworten',
    specialPerks: 'Besondere Vorteile',
    specialPerksDesc: 'Frühzeitiger Zugang, Gewinnspiele und exklusive Events',
    privateContent: 'Private Inhalte',
    privateContentDesc: 'Behind-the-Scenes Zugang, den du nirgendwo anders findest',
    summerVibes: 'Sommer-Vibes',
    behindTheScenes: 'Behind the Scenes',
    goldenHour: 'Goldene Stunde',
    nightOut: 'Abend unterwegs',
    qaSession: 'Frage & Antwort',
    weekendMood: 'Wochenend-Stimmung',
  },
  es: {
    verifiedCreator: 'Creador Verificado',
    tagline: 'Pura energía colombiana. Cara dulce, curvas de infarto.',
    joinExclusive: 'Unirse Exclusivo',
    followMe: 'Sígueme',
    stat1Label: 'Colombiana',
    stat2Label: 'Contenido Picante',
    stat3Label: 'Calidad Premium',
    latestContent: 'Contenido Reciente',
    sneakPeek: 'Un',
    peekHighlight: 'Adelanto',
    glimpse: 'Una vista previa de lo que te espera',
    subscribeToUnlock: 'Suscríbete para desbloquear',
    photoSet: 'Set de Fotos',
    video: 'Video',
    exclusive: 'Exclusivo',
    viewAllContent: 'Ver Todo el Contenido',
    connectWithMe: 'Conéctate Conmigo',
    choosePlatform: 'Elige tu plataforma favorita',
    exclusiveAccess: 'Acceso Exclusivo',
    whatYouGet: 'Lo que',
    getHighlight: 'Obtendrás',
    unlockPremium: 'Desbloquea contenido premium y beneficios reservados solo para mis suscriptores VIP',
    subscribeNow: 'Suscríbete Ahora',
    joinSubscribers: 'Únete a más de 50,000 suscriptores',
    stayUpdated: 'Mantente',
    updatedHighlight: 'Actualizado',
    newsletterDesc: 'Recibe actualizaciones exclusivas, ofertas especiales y contenido detrás de cámaras directamente en tu bandeja de entrada.',
    enterEmail: 'Ingresa tu email',
    subscribe: 'Suscribirse',
    subscribed: '¡Suscrito!',
    noSpam: 'Sin spam, nunca. Cancela cuando quieras.',
    allRights: 'Todos los derechos reservados.',
    fansly: 'Fansly',
    fanslyDesc: 'Contenido exclusivo y acceso premium',
    onlyfans: 'OnlyFans',
    onlyfansDesc: 'Fotos premium, videos y detrás de cámaras',
    instagramDesc: '@lyalush • Actualizaciones diarias e historias',
    twitterDesc: '@lyalush • Pensamientos e interacciones',
    youtubeDesc: 'Vlogs, tutoriales y más',
    exclusivePhotos: 'Fotos Exclusivas',
    exclusivePhotosDesc: 'Contenido de alta calidad nunca antes visto, actualizado semanalmente',
    directMessages: 'Mensajes Directos',
    directMessagesDesc: 'Conversaciones personales y respuestas prioritarias',
    specialPerks: 'Beneficios Especiales',
    specialPerksDesc: 'Acceso anticipado, sorteos y eventos solo para suscriptores',
    privateContent: 'Contenido Privado',
    privateContentDesc: 'Acceso detrás de cámaras que no encontrarás en ningún otro lugar',
    summerVibes: 'Vibras de Verano',
    behindTheScenes: 'Detrás de Cámaras',
    goldenHour: 'Hora Dorada',
    nightOut: 'Noche de Fiesta',
    qaSession: 'Sesión de Preguntas',
    weekendMood: 'Mood de Fin de Semana',
  },
}

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
}


// HLS Video Component
function HlsVideo({ src, className }: { src: string; className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (Hls.isSupported()) {
      const hls = new Hls({ enableWorker: false })
      hls.loadSource(src)
      hls.attachMedia(video)
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {})
      })
      return () => hls.destroy()
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src
      video.play().catch(() => {})
    }
  }, [src])

  return (
    <video
      ref={videoRef}
      className={className}
      loop
      muted
      playsInline
      autoPlay
      draggable={false}
    />
  )
}

// Language Switcher Component
function LanguageSwitcher({ 
  currentLang, 
  onLanguageChange 
}: { 
  currentLang: Language
  onLanguageChange: (lang: Language) => void 
}) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  const currentLanguage = languages.find(l => l.code === currentLang)!

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={dropdownRef} className="fixed top-6 right-6 z-50">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-2 px-4 py-2.5 bg-obsidian-light/80 backdrop-blur-xl border border-white/10 rounded-full hover:border-gold/30 transition-all duration-300 group"
      >
        <Globe className="w-4 h-4 text-gold" />
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className="text-sm font-medium text-white/80 hidden sm:inline">
          {currentLanguage.name}
        </span>
        <ChevronDown 
          className={`w-4 h-4 text-white/40 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 w-48 py-2 bg-obsidian-light/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  onLanguageChange(lang.code)
                  setIsOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 ${
                  currentLang === lang.code 
                    ? 'bg-gold/10 text-gold' 
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="text-xl">{lang.flag}</span>
                <span className="flex-1 font-medium">{lang.name}</span>
                {currentLang === lang.code && (
                  <Check className="w-4 h-4 text-gold" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Home() {
  const [currentLang, setCurrentLang] = useState<Language>('en')

  const t = translations[currentLang]

  // Dynamic Social Links with translations
  const socialLinks = [
    {
      name: t.fansly,
      description: t.fanslyDesc,
      icon: Crown,
      href: 'https://fansly.com/Lya_Lush/',
      primary: true,
      badge: 'VIP',
    },
    {
      name: t.onlyfans,
      description: t.onlyfansDesc,
      icon: Lock,
      href: 'https://onlyfans.com/lya_lush',
      primary: true,
      badge: 'VIP',
    },
    // {
    //   name: 'Instagram',
    //   description: t.instagramDesc,
    //   icon: Instagram,
    //   href: '#',
    //   followers: '1.2M',
    // },
    // {
    //   name: 'Twitter / X',
    //   description: t.twitterDesc,
    //   icon: Twitter,
    //   href: '#',
    //   followers: '450K',
    // },
    // {
    //   name: 'YouTube',
    //   description: t.youtubeDesc,
    //   icon: Youtube,
    //   href: '#',
    //   followers: '800K',
    // },
  ]

  // Dynamic Features with translations
  const features = [
    {
      icon: Camera,
      title: t.exclusivePhotos,
      description: t.exclusivePhotosDesc,
    },
    {
      icon: MessageCircle,
      title: t.directMessages,
      description: t.directMessagesDesc,
    },
    {
      icon: Gift,
      title: t.specialPerks,
      description: t.specialPerksDesc,
    },
    {
      icon: Lock,
      title: t.privateContent,
      description: t.privateContentDesc,
    },
  ]

  // Dynamic Content Previews with translations
  const imagePreviews = [
    { type: 'image' as const, label: t.photoSet, isNew: true, src: 'https://imagedelivery.net/2Bi2b3ZR7OB7v9uIHcSnmw/c14ca996-01c7-44b2-ca62-c472b30f5f00/public' },
    { type: 'image' as const, label: t.exclusive, isNew: true, src: 'https://imagedelivery.net/2Bi2b3ZR7OB7v9uIHcSnmw/03ba0a4c-177a-421e-f70d-59ff82de3f00/public' },
    { type: 'image' as const, label: t.photoSet, isNew: false, src: 'https://imagedelivery.net/2Bi2b3ZR7OB7v9uIHcSnmw/bf784022-a99b-4b9b-49ad-9d0025bdac00/public' },
    { type: 'image' as const, label: t.exclusive, isNew: true, src: 'https://imagedelivery.net/2Bi2b3ZR7OB7v9uIHcSnmw/c9738506-b047-405d-e37b-a3547d61f200/public' },
  ]

  const videoPreviews = [
    { type: 'video' as const, label: t.video, isNew: true, src: 'https://customer-ixkpt5q6n9uwmb0u.cloudflarestream.com/22df60602e151b18543f2848ce860e61/manifest/video.m3u8' },
    { type: 'video' as const, label: t.video, isNew: false, src: 'https://customer-ixkpt5q6n9uwmb0u.cloudflarestream.com/27ecfa9fc8e5998a4cb8bac0f4105fc3/manifest/video.m3u8' },
    { type: 'video' as const, label: t.video, isNew: false, src: 'https://customer-ixkpt5q6n9uwmb0u.cloudflarestream.com/11445cb41630dfbea8b1ba3801dda370/manifest/video.m3u8' },
  ]

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Language Switcher */}
      <LanguageSwitcher currentLang={currentLang} onLanguageChange={setCurrentLang} />

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Top pink glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-pink-neon/5 rounded-full blur-[120px]" />
        {/* Bottom gold glow */}
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-gold/5 rounded-full blur-[100px]" />
        {/* Left accent */}
        <div className="absolute top-1/2 left-0 w-[300px] h-[500px] bg-gold/3 rounded-full blur-[80px]" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center py-20">
        <div className="section-container text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            {/* Profile Image */}
            <motion.div
              variants={scaleIn}
              className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto mb-8"
            >
              <div className="absolute inset-0 rounded-full bg-gold-gradient p-[3px]">
                <div className="w-full h-full rounded-full bg-obsidian flex items-center justify-center">
                  <div className="w-[calc(100%-6px)] h-[calc(100%-6px)] rounded-full bg-gradient-to-br from-obsidian-light to-obsidian flex items-center justify-center overflow-hidden">
                    <Image
                      src="/portrait.png"
                      alt="Lya Lush"
                      width={192}
                      height={192}
                      className="w-full h-full object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>
              {/* Floating sparkle */}
              <motion.div
                animate={{ y: [-5, 5, -5], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-2 -right-2"
              >
                <Sparkles className="w-8 h-8 text-gold" />
              </motion.div>
            </motion.div>

            {/* Name & Badge */}
            <motion.div variants={fadeInUp} className="mb-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 mb-4">
                <Star className="w-4 h-4 text-gold fill-gold" />
                <span className="text-sm text-gold font-medium">{t.verifiedCreator}</span>
              </div>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold mb-4 tracking-tight"
            >
              <span className="glow-text">Lya</span>{' '}
              <span className="text-white">Lush</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg sm:text-xl text-white/60 max-w-xl mx-auto mb-8 leading-relaxed"
            >
              {t.tagline}
            </motion.p>

            {/* Stats Row */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center justify-center gap-8 sm:gap-12 mb-10"
            >
              {[
                { emoji: '\u{1F1E8}\u{1F1F4}', label: t.stat1Label },
                { emoji: '\u{1F525}', label: t.stat2Label },
                { emoji: '\u{1F48E}', label: t.stat3Label },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl mb-1">{stat.emoji}</div>
                  <div className="text-sm text-white/60 font-medium">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            >
              <a href="https://fansly.com/Lya_Lush/" target="_blank" rel="noopener noreferrer" className="btn-primary group">
                <Crown className="w-5 h-5 mr-2" />
                {t.joinExclusive}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#links" className="btn-secondary">
                <Heart className="w-5 h-5 mr-2" />
                {t.followMe}
              </a>
            </motion.div>

            {/* Social Media Icons - hidden for now */}
            {/* <motion.div
              variants={fadeInUp}
              className="flex items-center justify-center gap-6"
            >
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center hover:bg-gold/20 hover:border-gold/50 hover:scale-110 transition-all duration-300 group"
              >
                <Instagram className="w-5 h-5 text-gold group-hover:text-gold-light" />
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center hover:bg-gold/20 hover:border-gold/50 hover:scale-110 transition-all duration-300 group"
              >
                <Twitter className="w-5 h-5 text-gold group-hover:text-gold-light" />
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center hover:bg-gold/20 hover:border-gold/50 hover:scale-110 transition-all duration-300 group"
              >
                <Youtube className="w-5 h-5 text-gold group-hover:text-gold-light" />
              </a>
            </motion.div> */}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown className="w-6 h-6 text-gold/50" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Content Preview Section */}
      <section className="relative py-20">
        <div className="section-container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm mb-4">
                <Camera className="w-4 h-4" />
                {t.latestContent}
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-3">
                {t.sneakPeek} <span className="glow-text">{t.peekHighlight}</span>
              </h2>
              <p className="text-white/50 max-w-md mx-auto">
                {t.glimpse}
              </p>
            </motion.div>

            {/* Images Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-3xl mx-auto">
              {imagePreviews.map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                  onContextMenu={(e) => e.preventDefault()}
                  className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-obsidian-light border border-white/5 group cursor-pointer select-none"
                >
                  <img
                    src={item.src}
                    alt=""
                    className={`absolute inset-0 w-full h-full object-cover pointer-events-none ${index === 2 ? 'blur-[10px] scale-110' : index >= 3 ? 'blur-[6px] scale-105' : ''}`}
                    draggable={false}
                  />
                  <div className="absolute inset-0 z-10" />
                  <div className="absolute inset-0 z-20 bg-obsidian/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-2">
                        <Lock className="w-5 h-5 text-gold" />
                      </div>
                      <span className="text-sm text-white/80">{t.subscribeToUnlock}</span>
                    </div>
                  </div>
                  <div className="absolute top-3 left-3 z-20">
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-obsidian/70 backdrop-blur-sm">
                      <ImageIcon className="w-3 h-3 text-white/80" />
                      <span className="text-xs text-white/80">{item.label}</span>
                    </div>
                  </div>
                  {item.isNew && (
                    <div className="absolute top-3 right-3 z-20">
                      <span className="px-2 py-0.5 text-xs font-bold bg-pink-neon text-white rounded-full">
                        NEW
                      </span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Videos Row */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto mt-3 sm:mt-4">
              {videoPreviews.map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                  onContextMenu={(e) => e.preventDefault()}
                  className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-obsidian-light border border-white/5 group cursor-pointer select-none"
                >
                  <HlsVideo
                    src={item.src}
                    className={`absolute inset-0 w-full h-full object-cover pointer-events-none ${index === 0 || index === 2 ? 'blur-[6px] scale-105' : ''}`}
                  />
                  <div className="absolute inset-0 z-10" />
                  <div className="absolute inset-0 z-20 bg-obsidian/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-2">
                        <Lock className="w-5 h-5 text-gold" />
                      </div>
                      <span className="text-sm text-white/80">{t.subscribeToUnlock}</span>
                    </div>
                  </div>
                  <div className="absolute top-3 left-3 z-20">
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-obsidian/70 backdrop-blur-sm">
                      <Play className="w-3 h-3 text-white/80 fill-white/80" />
                      <span className="text-xs text-white/80">{item.label}</span>
                    </div>
                  </div>
                  {item.isNew && (
                    <div className="absolute top-3 right-3 z-20">
                      <span className="px-2 py-0.5 text-xs font-bold bg-pink-neon text-white rounded-full">
                        NEW
                      </span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeInUp} className="text-center mt-10">
              <a href="https://fansly.com/Lya_Lush/" target="_blank" rel="noopener noreferrer" className="btn-secondary group">
                <Sparkles className="w-4 h-4 mr-2" />
                {t.viewAllContent}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Social Links Section */}
      <section id="links" className="relative py-20">
        <div className="section-container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="max-w-lg mx-auto"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl font-display font-bold text-center mb-2"
            >
              {t.connectWithMe}
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-white/50 text-center mb-10"
            >
              {t.choosePlatform}
            </motion.p>

            <div className="space-y-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`link-card group flex items-center gap-4 ${
                    link.primary
                      ? 'bg-gradient-to-r from-gold/10 to-pink-neon/10 border-gold/30'
                      : ''
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      link.primary
                        ? 'bg-gold-gradient text-obsidian'
                        : 'bg-white/5 text-white/80 group-hover:bg-gold/20 group-hover:text-gold'
                    } transition-colors`}
                  >
                    <link.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white group-hover:text-gold transition-colors">
                        {link.name}
                      </span>
                      {link.badge && (
                        <span className="px-2 py-0.5 text-xs font-bold bg-gold text-obsidian rounded-full">
                          {link.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-white/50">{link.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {link.followers && (
                      <span className="text-sm text-white/40">{link.followers}</span>
                    )}
                    <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-gold transition-colors" />
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="exclusive" className="relative py-20">
        <div className="section-container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-neon/10 border border-pink-neon/20 text-pink-soft text-sm mb-4">
                <Lock className="w-4 h-4" />
                {t.exclusiveAccess}
              </span>
              <h2 className="text-4xl sm:text-5xl font-display font-bold mb-4">
                {t.whatYouGet} <span className="glow-text">{t.getHighlight}</span>
              </h2>
              <p className="text-white/50 max-w-xl mx-auto">
                {t.unlockPremium}
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -2 }}
                  className="relative p-6 rounded-2xl bg-obsidian-light border border-white/5 hover:border-gold/20 transition-all duration-300 group"
                >
                  {/* Subtle pink glow on hover - reduced opacity */}
                  <div className="absolute inset-0 rounded-2xl bg-pink-glow opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
                  
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                      <feature.icon className="w-6 h-6 text-gold" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-gold transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-white/50 text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div variants={fadeInUp} className="text-center mt-12">
              <a href="https://onlyfans.com/lya_lush" target="_blank" rel="noopener noreferrer" className="btn-primary">
                <Sparkles className="w-5 h-5 mr-2" />
                {t.subscribeNow}
              </a>
              <p className="text-white/30 text-sm mt-4">
                {t.joinSubscribers}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 border-t border-white/5">
        <div className="section-container">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-display font-bold glow-text">Lya Lush</span>
            </div>

            {/* Social icons hidden for now */}
            {/* <div className="flex items-center gap-6">
              <a href="#" className="text-white/40 hover:text-gold transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/40 hover:text-gold transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/40 hover:text-gold transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div> */}

            <p className="text-white/30 text-sm">
              © {new Date().getFullYear()} Lya Lush. {t.allRights}
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
