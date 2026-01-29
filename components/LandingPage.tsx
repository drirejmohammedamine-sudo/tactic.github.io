import React, { useState, useEffect, useRef } from 'react';
import { LogoIcon, CheckIcon, ZapIcon, GlobeIcon, UsersIcon, ShieldIcon, StarIcon, ChevronDownIcon, ShirtIcon, MoveIcon, DrawIcon, PlayIcon, TextIcon, ArrowIcon, TargetIcon, ConnectIcon, ChevronLeftIcon, ChevronRightIcon, HeartIcon } from './Icons';

// Definining missing interfaces and components
interface LandingPageProps {
  onStart: () => void;
  onOpenPage: (page: string) => void;
}

const PrimeCinemaLogo = () => (
    <div className="flex items-center gap-1.5">
        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white p-1 shadow-lg">
            <PlayIcon />
        </div>
        <span className="text-white font-black tracking-tighter text-sm sm:text-lg uppercase italic">Prime</span>
    </div>
);

const AnimatedCounter = ({ value }: { value: string }) => {
    const [displayValue, setDisplayValue] = useState('0');
    
    useEffect(() => {
        // Simple immediate update for now, but component is defined to satisfy TS
        setDisplayValue(value);
    }, [value]);

    return <span>{displayValue}</span>;
};

// Comprehensive Localization Dictionary for Landing Page
export const translations: Record<string, any> = {
  en: {
    dir: 'ltr',
    nav_about: 'About',
    nav_features: 'Features',
    nav_launch: 'Launch',
    hero_badge: 'Global Standard 2026',
    hero_title: 'Win The Strategic Battle.',
    hero_desc: 'Professional-grade tactical engine designed for the next generation of football managers. Visualize runs, passes, and victory.',
    hero_cta_start: 'Start Session',
    hero_cta_prime: 'PRIME SHOW',
    stats_users: 'Users',
    stats_teams: 'Pro Teams',
    stats_rating: 'Rating',
    cinema_title: 'Experience Live Football Like Never Before',
    cinema_desc: 'Crystal clear 4K UHD streaming for all global leagues. Zero lag, zero downtime, pure football adrenaline.',
    cinema_cta: 'View Subscriptions',
    cinema_active: '12k+ Active Users',
    about_badge: 'The Organization',
    about_title: 'Architects of the Modern Pitch',
    about_desc: 'TacticalBoard Pro isn\'t just a tool; it\'s a legacy project built by football obsessives for professional clarity.',
    about_feat1_t: 'Surgical Precision',
    about_feat1_d: 'Every pixel represents a strategic coordinate. No guesswork.',
    about_feat2_t: 'Fluid Dynamics',
    about_feat2_d: 'Simulation engines that respect the laws of motion and pace.',
    about_feat3_t: 'Global Reach',
    about_feat3_d: 'Trusted by amateur visionaries and elite academies worldwide.',
    about_card_title: 'Powered by Strategy.',
    about_card_registry: 'Innovation Registry 2026.04',
    features_badge: 'The Analytical Core',
    features_title: 'Professional Intelligence',
    features_feat1_t: 'Systemic Architecture',
    features_feat1_d: 'Manage your roster with surgical precision. Every player profile carries unique spatial data.',
    features_feat2_t: 'Fluid Logic',
    features_feat2_d: 'Proprietary Physics-based Simulation',
    eco_badge: 'Analytical Dual-Core',
    eco_title: 'Tactical Ecosystem',
    eco_desc: 'A revolutionary two-stage workflow designed for total pitch dominance.',
    eco_b1_t: 'The Blueprint',
    eco_b1_p: 'Phase 01 • Structural Analysis',
    eco_b1_d: 'Your architect\'s workstation. Define the DNA of your squad. Every detail is crafted here.',
    eco_b2_t: 'The Arena',
    eco_b2_p: 'Phase 02 • Motion Dynamics',
    eco_b2_d: 'Where theory becomes reality. Simulate complex ball-runs and watch our AI provide counter-logic.',
    vision_badge: 'Our Future Path',
    vision_title: 'Redefining Tactical Limits',
    vision_desc: 'Our vision is to bridge the gap between imagination and execution.',
    vision_p1_t: 'Hyper-Precision',
    vision_p1_d: 'Total control over every coordinate and player micro-interaction.',
    vision_p2_t: 'Universal Sync',
    vision_p2_d: 'Share tactics seamlessly across any platform, device, or league.',
    vision_p3_t: 'Real-Time AI',
    vision_p3_d: 'Predictive intelligence that suggests counters before the match starts.',
    footer_tag: 'TACTICAL BOARD PRO. GLOBAL COACHING ENGINE.',
    back_home: 'Back to Home',
    pricing_title: 'Premium Cinema Subscription Plans',
    pricing_subtitle: 'Join the elite. 24/7 access to everything, everywhere.',
    pricing_gold: 'Gold Warranty',
    pricing_popular: 'Most Popular',
    pricing_sub: 'Subscribe Now'
  },
  ar: {
    dir: 'rtl',
    nav_about: 'حول',
    nav_features: 'الميزات',
    nav_launch: 'إطلاق',
    hero_badge: 'المعيار العالمي 2026',
    hero_title: 'اربح المعركة الاستراتيجية.',
    hero_desc: 'محرك تكتيكي احترافي مصمم للجيل القادم من مدربي كرة القدم. تخيل الجري، التمريرات، والانتصار.',
    hero_cta_start: 'بدء الجلسة',
    hero_cta_prime: 'عرض برايم',
    stats_users: 'مستخدم',
    stats_teams: 'فرق محترفة',
    stats_rating: 'تقييم',
    cinema_title: 'جرب كرة القدم الحية كما لم تفعل من قبل',
    cinema_desc: 'بث بدقة 4K UHD لجميع الدوريات العالمية. لا تأخير، لا انقطاع، أدرينالين كرة قدم خالص.',
    cinema_cta: 'عرض الاشتراكات',
    cinema_active: '+12 ألف مستخدم نشط',
    about_badge: 'المنظمة',
    about_title: 'مهندسو الملعب الحديث',
    about_desc: 'تكتيكال بورد برو ليس مجرد أداة؛ إنه مشروع إرث بني من قبل مهووسي كرة القدم من أجل الوضوح الاحترافي.',
    about_feat1_t: 'دقة جراحية',
    about_feat1_d: 'كل بكسل يمثل إحداثية استراتيجية. لا مجال للتخمين.',
    about_feat2_t: 'ديناميكيات السوائل',
    about_feat2_d: 'محركات محاكاة تحترم قوانين الحركة والسرعة.',
    about_feat3_t: 'وصول عالمي',
    about_feat3_d: 'موثوق به من قبل أصحاب الرؤى الهواة والأكاديميات النخبة في جميع أنحاء العالم.',
    about_card_title: 'مدعوم بالاستراتيجية.',
    about_card_registry: 'سجل الابتكار 2026.04',
    features_badge: 'الجوهر التحليلي',
    features_title: 'الذكاء الاحترافي',
    features_feat1_t: 'الهندسة النظامية',
    features_feat1_d: 'إدارة تشكيلتك بدقة جراحية. يحمل كل ملف تعريف للاعب بيانات مكانية فريدة.',
    features_feat2_t: 'منطق مرن',
    features_feat2_d: 'محاكاة قائمة على الفيزياء الخاصة',
    eco_badge: 'ثنائي النواة التحليلي',
    eco_title: 'النظام البيئي التكتيكي',
    eco_desc: 'سير عمل ثوري من مرحلتين مصمم للهيمنة الكاملة على الملعب.',
    eco_b1_t: 'المخطط',
    eco_b1_p: 'المرحلة 01 • التحليل الهيكلي',
    eco_b1_d: 'محطة عمل المهندس الخاص بك. حدد الحمض النووي لفريقك. يتم صياغة كل التفاصيل هنا.',
    eco_b2_t: 'الساحة',
    eco_b2_p: 'المرحلة 02 • ديناميكيات الحركة',
    eco_b2_d: 'حيث يصبح النظرية واقعاً. قم بمحاكاة حركات الكرة المعقدة وشاهد ذكائنا الاصطناعي يقدم منطقاً مضاداً.',
    vision_badge: 'مسارنا المستقبلي',
    vision_title: 'إعادة تعريف الحدود التكتيكية',
    vision_desc: 'رؤيتنا هي سد الفجوة بين الخيال والتنفيذ.',
    vision_p1_t: 'دقة فائقة',
    vision_p1_d: 'تحكم كامل في كل إحداثية وتفاعل دقيق للاعبين.',
    vision_p2_t: 'مزامنة عالمية',
    vision_p2_d: 'شارك التكتيكات بسلاسة عبر أي منصة أو جهاز أو دوري.',
    vision_p3_t: 'ذكاء اصطناعي فوري',
    vision_p3_d: 'ذكاء تنبؤي يقترح حلولاً مضادة قبل بدء المباراة.',
    footer_tag: 'تكتيكال بورد برو. محرك التدريب العالمي.',
    back_home: 'العودة للرئيسية',
    pricing_title: 'خطط اشتراك برايم سينما',
    pricing_subtitle: 'انضم إلى النخبة. وصول 24/7 لكل شيء في كل مكان.',
    pricing_gold: 'ضمان ذهبي',
    pricing_popular: 'الأكثر شعبية',
    pricing_sub: 'اشترك الآن'
  },
  tr: {
    dir: 'ltr',
    nav_about: 'Hakkımızda',
    nav_features: 'Özellikler',
    nav_launch: 'Başlat',
    hero_badge: 'Küresel Standart 2026',
    hero_title: 'Stratejik Savaşı Kazanın.',
    hero_desc: 'Yeni nesil futbol menajerleri için tasarlanmış profesyonel düzeyde taktik motoru. Koşuları, pasları ve zaferi görselleştirin.',
    hero_cta_start: 'Oturumu Başlat',
    hero_cta_prime: 'PRIME SHOW',
    stats_users: 'Kullanıcı',
    stats_teams: 'Pro Takımlar',
    stats_rating: 'Puanlama',
    cinema_title: 'Canlı Futbolu Hiç Olmadığı Gibi Deneyimleyin',
    cinema_desc: 'Tüm küresel ligler için kristal netliğinde 4K UHD yayın. Sıfır gecikme, sıfır kesinti, saf futbol adrenalini.',
    cinema_cta: 'Abonelikleri Görüntüle',
    cinema_active: '12k+ Aktif Kullanıcı',
    about_badge: 'Organizasyon',
    about_title: 'Modern Sahanın Mimarları',
    about_desc: 'TacticalBoard Pro sadece bir araç değildir; profesyonel netlik için futbol tutkunları tarafından inşa edilmiş bir miras projesidir.',
    about_feat1_t: 'Cerrahi Hassasiyet',
    about_feat1_d: 'Her piksel stratejik bir koordinatı temsil eder. Tahminlere yer yok.',
    about_feat2_t: 'Akışkanlar Dinamiği',
    about_feat2_d: 'Hareket ve hız kurallarına saygı duyan simülasyon motorları.',
    about_feat3_t: 'Küresel Erişim',
    about_feat3_d: 'Dünya çapında amatör vizyonerler ve seçkin akademiler tarafından güveniliyor.',
    about_card_title: 'Stratejiyle Güçlendirildi.',
    about_card_registry: 'İnovasyon Kaydı 2026.04',
    features_badge: 'Analitik Çekirdek',
    features_title: 'Profesyonel Zeka',
    features_feat1_t: 'Sistemik Mimari',
    features_feat1_d: 'Kadronuzu cerrahi hassasiyetle yönetin. Her oyuncu profili benzersiz konumsal veriler taşır.',
    features_feat2_t: 'Akışkan Mantık',
    features_feat2_d: 'Tescilli Fizik Tabanlı Simülasyon',
    eco_badge: 'Analitik Çift Çekirdek',
    eco_title: 'Taktik Ekosistem',
    eco_desc: 'Toplam saha hakimiyeti için tasarlanmış devrim niteliğinde iki aşamalı iş akışı.',
    eco_b1_t: 'Plan (Blueprint)',
    eco_b1_p: 'Aşama 01 • Yapısal Analiz',
    eco_b1_d: 'Mimarınızın iş istasyonu. Kadronuzun DNA\'sını tanımlayın. Her detay burada işlenir.',
    eco_b2_t: 'Arena',
    eco_b2_p: 'Aşama 02 • Hareket Dinamiği',
    eco_b2_d: 'Teorinin gerçeğe dönüştüğü yer. Karmaşık top koşularını simüle edin ve yapay zekamızın karşı hamlelerini izleyin.',
    vision_badge: 'Gelecek Yolumuz',
    vision_title: 'Taktik Sınırları Yeniden Tanımlamak',
    vision_desc: 'Vizyonumuz hayal gücü ile uygulama arasındaki boşluğu doldurmaktır.',
    vision_p1_t: 'Hiper-Hassasiyet',
    vision_p1_d: 'Her koordinat ve oyuncu mikro etkileşimi üzerinde tam kontrol.',
    vision_p2_t: 'Evrensel Senkronizasyon',
    vision_p2_d: 'Taktikleri herhangi bir platform, cihaz veya ligde sorunsuz bir şekilde paylaşın.',
    vision_p3_t: 'Gerçek Zamanlı Yapay Zeka',
    vision_p3_d: 'Maç başlamadan önce karşı taktikler öneren öngörülü zeka.',
    footer_tag: 'TACTICAL BOARD PRO. KÜRESEL ANTRENÖRLÜK MOTORU.',
    back_home: 'Ana Sayfaya Dön',
    pricing_title: 'Premium Cinema Abonelik Planları',
    pricing_subtitle: 'Elite katılın. Her şeye, her yerden 7/24 erişim.',
    pricing_gold: 'Altın Garanti',
    pricing_popular: 'En Popüler',
    pricing_sub: 'Şimdi Abone Ol'
  },
  es: {
    dir: 'ltr',
    nav_about: 'Nosotros',
    nav_features: 'Características',
    nav_launch: 'Lanzar',
    hero_badge: 'Estándar Global 2026',
    hero_title: 'Gana la Batalla Estratégica.',
    hero_desc: 'Motor táctico de nivel profesional diseñado para la próxima generación de entrenadores. Visualiza carreras, pases y victoria.',
    hero_cta_start: 'Iniciar Sesión',
    hero_cta_prime: 'PRIME SHOW',
    stats_users: 'Usuarios',
    stats_teams: 'Equipos Pro',
    stats_rating: 'Calificación',
    cinema_title: 'Vive el Fútbol en Vivo como Nunca Antes',
    cinema_desc: 'Streaming 4K UHD cristalino para todas las ligas globales. Sin lag, sin interrupciones, pura adrenalina de fútbol.',
    cinema_cta: 'Ver Suscripciones',
    cinema_active: '12k+ Usuarios Activos',
    about_badge: 'La Organización',
    about_title: 'Arquitectos del Campo Moderno',
    about_desc: 'TacticalBoard Pro no es solo una herramienta; es un legado construido por obsesionados del fútbol para la claridad profesional.',
    about_feat1_t: 'Precisión Quirúrgica',
    about_feat1_d: 'Cada píxel representa una coordenada estratégica. Sin adivinanzas.',
    about_feat2_t: 'Dinámica de Fluidos',
    about_feat2_d: 'Motores de simulación que respetan las leyes del movimiento y el ritmo.',
    about_feat3_t: 'Alcance Global',
    about_feat3_d: 'Confiado por visionarios amateurs y academias de élite en todo el mundo.',
    about_card_title: 'Potenciado por Estrategia.',
    about_card_registry: 'Registro de Innovación 2026.04',
    features_badge: 'El Núcleo Analítico',
    features_title: 'Inteligencia Profesional',
    features_feat1_t: 'Arquitectura Sistémica',
    features_feat1_d: 'Gestiona tu plantilla con precisión quirúrgica. Cada perfil de jugador lleva datos espaciales únicos.',
    features_feat2_t: 'Lógica Fluida',
    features_feat2_d: 'Simulación patentada basada en física',
    eco_badge: 'Dual-Core Analítico',
    eco_title: 'Ecosistema Táctico',
    eco_desc: 'Un flujo de trabajo revolucionario de dos etapas diseñado para el dominio total del campo.',
    eco_b1_t: 'El Plano (Blueprint)',
    eco_b1_p: 'Fase 01 • Análisis Estructural',
    eco_b1_d: 'La estación de trabajo de tu arquitecto. Define el ADN de tu equipo. Cada detalle se crea aquí.',
    eco_b2_t: 'La Arena',
    eco_b2_p: 'Fase 02 • Dinámica de Movimiento',
    eco_b2_d: 'Donde la teoría se vuelve realidad. Simula carreras complejas y observa cómo nuestra IA ofrece contra-lógica.',
    vision_badge: 'Nuestro Camino Futuro',
    vision_title: 'Redefiniendo los Límites Tácticos',
    vision_desc: 'Nuestra visión es cerrar la brecha entre la imaginación y la ejecución.',
    vision_p1_t: 'Hiper-Precisión',
    vision_p1_d: 'Control total sobre cada coordenada y micro-interacción del jugador.',
    vision_p2_t: 'Sincronización Universal',
    vision_p2_d: 'Comparte tácticas sin problemas en cualquier plataforma, dispositivo o liga.',
    vision_p3_t: 'IA en Tiempo Real',
    vision_p3_d: 'Inteligencia predictiva que sugiere contra-movimientos antes de que empiece el partido.',
    footer_tag: 'TACTICAL BOARD PRO. MOTOR DE ENTRENAMIENTO GLOBAL.',
    back_home: 'Volver al Inicio',
    pricing_title: 'Planes de Suscripción Prime Cinema',
    pricing_subtitle: 'Únete a la élite. Acceso 24/7 a todo, en cualquier lugar.',
    pricing_gold: 'Garantía de Oro',
    pricing_popular: 'Más Popular',
    pricing_sub: 'Suscribirse Ahora'
  },
  fr: {
    dir: 'ltr',
    nav_about: 'À propos',
    nav_features: 'Fonctionnalités',
    nav_launch: 'Lancer',
    hero_badge: 'Standard Mondial 2026',
    hero_title: 'Gagnez la Bataille Stratégique.',
    hero_desc: 'Moteur tactique de niveau professionnel conçu pour la nouvelle génération d\'entraîneurs. Visualisez les courses, les passes et la victoire.',
    hero_cta_start: 'Démarrer la Session',
    hero_cta_prime: 'PRIME SHOW',
    stats_users: 'Utilisateurs',
    stats_teams: 'Équipes Pro',
    stats_rating: 'Note',
    cinema_title: 'Vivez le Football en Direct comme Jamais Auparavant',
    cinema_desc: 'Streaming 4K UHD cristallin pour toutes les ligues mondiales. Zéro latence, zéro interruption, pure adrénaline.',
    cinema_cta: 'Voir les Abonnements',
    cinema_active: '12k+ Utilisateurs Actifs',
    about_badge: 'L\'Organisation',
    about_title: 'Architectes du Terrain Moderne',
    about_desc: 'TacticalBoard Pro n\'est pas seulement un outil ; c\'est un projet d\'héritage construit par des passionnés pour la clarté professionnelle.',
    about_feat1_t: 'Précision Chirurgicale',
    about_feat1_d: 'Chaque pixel représente une coordonnée stratégique. Pas de devinettes.',
    about_feat2_t: 'Dynamique des Fluides',
    about_feat2_d: 'Moteurs de simulation respectant les lois du mouvement et du rythme.',
    about_feat3_t: 'Portée Mondiale',
    about_feat3_d: 'Approuvé par les visionnaires amateurs et les académies d\'élite du monde entier.',
    about_card_title: 'Propulsé par la Stratégie.',
    about_card_registry: 'Registre d\'Innovation 2026.04',
    features_badge: 'Le Cœur Analytique',
    features_title: 'Intelligence Professionnelle',
    features_feat1_t: 'Architecture Systémique',
    features_feat1_d: 'Gérez votre effectif avec une précision chirurgicale. Chaque profil possède des données spatiales uniques.',
    features_feat2_t: 'Logique Fluide',
    features_feat2_d: 'Simulation exclusive basée sur la physique',
    eco_badge: 'Dual-Core Analytique',
    eco_title: 'Écosystème Tactique',
    eco_desc: 'Un flux de travail révolutionnaire en deux étapes conçu pour une domination totale du terrain.',
    eco_b1_t: 'Le Plan (Blueprint)',
    eco_b1_p: 'Phase 01 • Analyse Structurelle',
    eco_b1_d: 'Votre station de travail d\'architecte. Définissez l\'ADN de votre équipe. Chaque détail est soigné ici.',
    eco_b2_t: 'L\'Arène',
    eco_b2_p: 'Phase 02 • Dynamique du Mouvement',
    eco_b2_d: 'Où la théorie devient réalité. Simulez des courses complexes et observez notre IA proposer une contre-logique.',
    vision_badge: 'Notre Chemin Futur',
    vision_title: 'Redefini les Limites Tactiques',
    vision_desc: 'Notre vision est de combler le fossé entre l\'imagination et l\'exécution.',
    vision_p1_t: 'Hyper-Précision',
    vision_p1_d: 'Contrôle total sur chaque coordonnée et micro-interaction des joueurs.',
    vision_p2_t: 'Sync Universelle',
    vision_p2_d: 'Partagez vos tactiques de manière fluide sur n\'importe quelle plateforme ou ligue.',
    vision_p3_t: 'IA en Temps Réel',
    vision_p3_d: 'Intelligence prédictive suggérant des contres avant même le début du match.',
    footer_tag: 'TACTICAL BOARD PRO. MOTEUR D\'ENTRAÎNEMENT MONDIAL.',
    back_home: 'Retour à l\'accueil',
    pricing_title: 'Plans d\'Abonnement Prime Cinema',
    pricing_subtitle: 'Rejoignez l\'élite. Accès 24/7 à tout, partout.',
    pricing_gold: 'Garantie Or',
    pricing_popular: 'Plus Populaire',
    pricing_sub: 'S\'abonner Maintenant'
  }
};

const PricingCard = ({ duration, currentPrice, oldPrice, quality, showStars = false, isPopular = false, t }: any) => (
    <div className={`relative group w-full max-w-[340px] bg-[#020617] rounded-[2.5rem] border transition-all duration-700 hover:scale-[1.03] ${isPopular ? 'border-blue-500/50 shadow-[0_0_50px_rgba(59,130,246,0.2)]' : 'border-white/10 shadow-2xl'}`}>
        {isPopular && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30">
                <div className="bg-blue-600 text-white text-[10px] font-black uppercase px-6 py-1.5 rounded-full shadow-xl tracking-widest ring-4 ring-[#020617]">{t.pricing_popular}</div>
            </div>
        )}
        
        <div className="absolute top-0 right-0 z-20">
            <div className="bg-[#f87171] text-white text-[9px] font-black uppercase px-5 py-2 rounded-bl-3xl shadow-lg tracking-wider">{t.pricing_gold}</div>
        </div>
        
        <div className="h-56 relative overflow-hidden rounded-t-[2.5rem]">
            <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-[url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <PrimeCinemaLogo />
                <h3 className="text-white font-black text-4xl mt-4 tracking-tighter uppercase italic">Prime Show</h3>
            </div>

            {showStars && (
                <div className="absolute bottom-6 left-6 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/5">
                    <span className="text-white text-xs font-black">5.0</span>
                    <span className="text-yellow-400 w-3.5 h-3.5"><StarIcon /></span>
                </div>
            )}
        </div>

        <div className="p-8 space-y-6">
            <div className="flex justify-between items-center">
                <div className="space-y-1">
                    <h4 className="text-white text-2xl font-black italic tracking-tight">{duration}</h4>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{quality}</p>
                </div>
                <div className="text-right">
                    <div className="text-slate-500 text-sm line-through decoration-red-500/50 font-black mb-1">{oldPrice} €</div>
                    <div className="text-[#f87171] text-3xl font-black drop-shadow-[0_0_10px_rgba(248,113,113,0.3)]">{currentPrice} €</div>
                </div>
            </div>

            <div className="space-y-3">
                {['Premium Stable Server', 'All Global Channels', '4K/UHD Resolution', '24/7 Priority Support'].map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        {feat}
                    </div>
                ))}
            </div>
            
            <button 
                onClick={() => window.open('https://prime-cinema.com/', '_blank')}
                className="w-full py-5 bg-white text-[#020617] font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl hover:bg-blue-400 hover:text-white transition-all shadow-xl active:scale-95"
            >
                {t.pricing_sub}
            </button>
        </div>
    </div>
);

const HeroVisual = () => {
    const [rotation, setRotation] = useState({ x: 8, y: 4 });
    const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        setMousePos({ x: x * 100, y: y * 100 });
        
        if (window.innerWidth >= 768) {
            setRotation({ x: 12 - y * 24, y: (x * 24) - 12 });
        }
    };

    const handleMouseLeave = () => {
        setRotation({ x: 8, y: 4 });
        setMousePos({ x: 50, y: 50 });
    };

    return (
        <div ref={containerRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className="relative group perspective-3000 py-8 sm:py-16">
            <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-accent/10 blur-[150px] rounded-full pointer-events-none transition-opacity duration-700 group-hover:opacity-100 opacity-40" 
                style={{ transform: `translate(${(mousePos.x - 50) * 0.2}px, ${(mousePos.y - 50) * 0.2}px) translate(-50%, -50%)` }}
            />

            <div 
                style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`, transition: 'transform 0.15s cubic-bezier(0.2, 0, 0.4, 1)' }} 
                className="relative rounded-[2rem] sm:rounded-[3.5rem] border-[8px] sm:border-[16px] border-[#111827] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] sm:shadow-[0_80px_160px_-40px_rgba(0,0,0,0.9)] aspect-[4/3] overflow-hidden bg-[#1B5E20] ring-1 ring-white/10"
            >
                <div className="absolute inset-0 bg-[repeating-linear-gradient(to_right,#237433,#237433_12.5%,#1b6329_12.5%,#1b6329_25%)]" />
                <div 
                    className="absolute inset-0 pointer-events-none z-50 mix-blend-overlay opacity-30"
                    style={{ background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.8), transparent 60%)` }}
                />

                <div className="absolute inset-0 z-40 pointer-events-none overflow-hidden">
                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-brand-accent/60 to-transparent animate-[scan_4s_linear_infinite]" />
                </div>

                <div className="absolute top-[26%] left-[70%] w-[25%] h-[48%] bg-brand-accent/10 border-2 border-dashed border-brand-accent/20 rounded-xl z-10 animate-pulse">
                     <div className="absolute inset-0 flex items-center justify-center">
                         <span className="text-[6px] sm:text-[8px] font-black text-brand-accent/40 uppercase tracking-[0.2em]">Target Zone</span>
                     </div>
                </div>

                <svg className="absolute inset-0 w-full h-full opacity-80 z-0" viewBox="0 0 100 75" preserveAspectRatio="none">
                    <rect x="2" y="2" width="96" height="71" fill="none" stroke="white" strokeWidth="0.6" />
                    <line x1="50" y1="2" x2="50" y2="73" stroke="white" strokeWidth="0.6" />
                    <circle cx="50" cy="37.5" r="9.15" fill="none" stroke="white" strokeWidth="0.6" />
                    <path d="M 2,16 h 16.5 v 43 h -16.5" fill="white" fillOpacity="0.03" stroke="white" strokeWidth="0.6" />
                    <path d="M 98,16 h -16.5 v 43 h 16.5" fill="white" fillOpacity="0.03" stroke="white" strokeWidth="0.6" />
                    <path d="M 2,28 h 5.5 v 19 h -5.5" fill="none" stroke="white" strokeWidth="0.6" />
                    <path d="M 98,28 h -5.5 v 19 h 5.5" fill="none" stroke="white" strokeWidth="0.6" />
                    <path d="M 18.5,30 A 9.15,9.15 0 0 1 18.5,45" fill="none" stroke="white" strokeWidth="0.6" />
                    <path d="M 81.5,30 A 9.15,9.15 0 0 0 81.5,45" fill="none" stroke="white" strokeWidth="0.6" />
                    <path d="M 15,50 Q 40,60 55,35 T 85,38" fill="none" stroke="#FBBF24" strokeWidth="1.2" strokeDasharray="3 2" className="animate-[dash_4s_linear_infinite]" />
                    <circle cx="85" cy="38" r="1.5" fill="#FBBF24" />
                </svg>

                <div 
                    className="absolute top-[25%] left-[30%] w-7 h-7 sm:w-11 sm:h-11 bg-white rounded-full border-[2px] sm:border-[4px] border-[#0F172A] shadow-[0_8px_16px_rgba(0,0,0,0.5)] flex items-center justify-center text-[8px] sm:text-xs font-black text-[#0F172A] z-30 transition-all hover:scale-125 hover:-translate-y-2 ring-2 ring-white/20"
                    style={{ transform: `translate(${(mousePos.x - 50) * -0.05}px, ${(mousePos.y - 50) * -0.05}px)` }}
                >
                    7
                </div>
                
                <div 
                    className="absolute top-[48%] left-[48%] w-7 h-7 sm:w-11 sm:h-11 bg-[#EF4444] rounded-full border-[2px] sm:border-[4px] border-white shadow-[0_10px_20px_rgba(0,0,0,0.6)] flex items-center justify-center text-[8px] sm:text-xs font-black text-white z-30 transition-all hover:scale-125 hover:-translate-y-2"
                    style={{ transform: `translate(${(mousePos.x - 50) * -0.08}px, ${(mousePos.y - 50) * -0.08}px)` }}
                >
                    8
                </div>
                
                <div 
                    className="absolute top-[35%] left-[82%] w-7 h-7 sm:w-11 sm:h-11 bg-[#EF4444] rounded-full border-[2px] sm:border-[4px] border-white shadow-[0_12px_24px_rgba(0,0,0,0.7)] flex items-center justify-center text-[8px] sm:text-xs font-black text-white z-30 transition-all hover:scale-125 hover:-translate-y-2 animate-bounce-slow"
                    style={{ transform: `translate(${(mousePos.x - 50) * -0.12}px, ${(mousePos.y - 50) * -0.12}px)` }}
                >
                    9
                </div>

                <div 
                    className="absolute top-[39%] left-[78%] w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full shadow-[0_4px_8px_rgba(0,0,0,0.8)] z-40 border border-black/20"
                    style={{ transform: `translate(${(mousePos.x - 50) * -0.15}px, ${(mousePos.y - 50) * -0.15}px)` }}
                >
                    <div className="w-full h-full bg-[radial-gradient(circle_at_30%_30%,#fff,#ccc)] rounded-full" />
                </div>
            </div>
            
            <style>{`
                @keyframes scan {
                    0% { transform: translateY(0); opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { transform: translateY(100%); opacity: 0; }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0) translateX(0); }
                    50% { transform: translateY(-15px) translateX(10px); }
                }
                @keyframes dash {
                    to { stroke-dashoffset: -20; }
                }
                .perspective-3000 { perspective: 3000px; }
            `}</style>
        </div>
    );
};

export const LandingPage: React.FC<LandingPageProps & { language?: string; setLanguage?: (l: string) => void }> = ({ onStart, onOpenPage, language = 'en', setLanguage }) => {
  const [scrolled, setScrolled] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [showPricing, setShowPricing] = useState(false);
  const lastScrollY = useRef(0);
  
  const t = translations[language] || translations.en;
  const isRTL = t.dir === 'rtl';

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) setHeaderVisible(false);
      else setHeaderVisible(true);
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    const initObserver = () => {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => { 
              if (entry.isIntersecting) {
                  entry.target.classList.add('revealed');
              }
          });
        }, { threshold: 0.1 });
        document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
        return observer;
    };
    
    const observer = initObserver();
    return () => { 
        window.removeEventListener('scroll', handleScroll); 
        observer.disconnect(); 
    };
  }, [showPricing]);

  if (showPricing) {
      return (
          <div className="min-h-screen bg-[#020617] flex flex-col items-center pt-24 pb-20 px-6 sm:px-12 relative overflow-x-hidden animate-in fade-in zoom-in-95 duration-300" dir={t.dir}>
              <button 
                  onClick={() => setShowPricing(false)} 
                  className={`fixed top-8 ${isRTL ? 'right-8' : 'left-8'} flex items-center gap-3 text-white/40 hover:text-white transition-all font-black uppercase tracking-[0.3em] text-[10px] z-[100] group`}
              >
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/20 group-hover:scale-110 transition-all">
                    {isRTL ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                  </div>
                  <span>{t.back_home}</span>
              </button>

              <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.15),transparent_70%)] pointer-events-none" />

              <div className="relative z-10 text-center mb-16 sm:mb-24">
                  <div className="flex justify-center mb-10 animate-in fade-in duration-700">
                      <PrimeCinemaLogo />
                  </div>
                  <h2 className="text-4xl sm:text-7xl font-black text-white uppercase italic tracking-tighter mb-6 leading-[0.9] animate-in fade-in duration-700 delay-75">
                    {t.pricing_title.split('Subscription')[0]} <br/> <span className="text-blue-500">{t.pricing_title.split('Cinema')[1]}</span>
                  </h2>
                  <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] sm:text-xs max-w-xl mx-auto opacity-70 animate-in fade-in duration-700 delay-150">
                    {t.pricing_subtitle}
                  </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12 w-full max-w-7xl relative z-10 animate-in zoom-in-95 duration-500 delay-200">
                  <PricingCard duration="Yearly Pass" oldPrice="38.19" currentPrice="15.69" quality="Best Value 4K" t={t} />
                  <PricingCard duration="6 Months" oldPrice="22.51" currentPrice="8.87" quality="Professional 4K" showStars={true} isPopular={true} t={t} />
                  <PricingCard duration="3 Months" oldPrice="14.55" currentPrice="5.46" quality="Starter 4K" t={t} />
              </div>

              <div className="mt-24 text-center space-y-4 opacity-40 hover:opacity-100 transition-opacity">
                  <p className="text-white text-[10px] font-black uppercase tracking-[0.4em]">Optimized for Smart TVs • PC • Mobile • Box</p>
                  <div className="flex justify-center gap-8 items-center grayscale">
                      <img src="https://cdn-icons-png.flaticon.com/512/888/888879.png" className="h-6" alt="Android" />
                      <img src="https://cdn-icons-png.flaticon.com/512/888/888841.png" className="h-6" alt="Apple" />
                      <img src="https://cdn-icons-png.flaticon.com/512/888/888871.png" className="h-6" alt="Samsung" />
                  </div>
              </div>
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans selection:bg-brand-accent selection:text-brand-text overflow-x-hidden animate-in fade-in zoom-in-105 duration-300" dir={t.dir}>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? 'py-2 sm:py-4' : 'py-4 sm:py-8'} ${headerVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className={`flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl transition-all ${scrolled ? 'bg-white/80 backdrop-blur-xl shadow-lg border border-slate-200' : 'bg-transparent'}`}>
                  <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#0F172A] rounded-xl flex items-center justify-center text-brand-accent scale-90 sm:scale-100"><LogoIcon /></div>
                      <span className="text-base sm:text-xl font-black tracking-tighter uppercase text-[#0F172A]">Tactical<span className="text-brand-accent">Board</span></span>
                  </div>
                  <div className="flex items-center gap-4 sm:gap-8">
                      <button onClick={() => scrollToSection('about-us')} className="hidden sm:inline text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-brand-accent transition-colors">{t.nav_about}</button>
                      <button onClick={() => scrollToSection('features')} className="hidden sm:inline text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-brand-accent transition-colors">{t.nav_features}</button>
                      <button onClick={onStart} className="px-4 sm:px-6 py-2 sm:py-2.5 bg-brand-accent text-[#0F172A] text-[10px] sm:text-xs font-black uppercase tracking-widest rounded-xl hover:shadow-lg transition-all">{t.nav_launch}</button>
                  </div>
              </div>
          </div>
      </nav>

      <main className="flex-1">
        <section className="relative min-h-[90vh] flex items-center pt-24 sm:pt-32 pb-16 px-4 sm:px-12 lg:px-24 overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0F172A 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
           <div className="max-w-7xl w-full mx-auto grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24 items-center">
                <div className={`space-y-6 sm:space-y-10 z-10 flex flex-col ${isRTL ? 'text-center lg:text-right' : 'text-center lg:text-left'}`}>
                   <div className={`inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-slate-100 text-slate-600 text-[8px] sm:text-[10px] font-black uppercase tracking-widest border border-slate-200 self-center ${isRTL ? 'lg:self-start' : 'lg:self-start'}`}>
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-brand-accent animate-pulse"></div>
                      {t.hero_badge}
                   </div>
                   <div className="reveal-on-scroll transition-all duration-1000">
                      <h1 className="text-[1.8rem] xs:text-[2.2rem] sm:text-[3.2rem] lg:text-[4.2rem] font-black text-[#0F172A] tracking-tighter leading-[1.1] uppercase">
                          {t.hero_title.split('.')[0]}<br/>
                          <span className="text-brand-accent drop-shadow-sm">{t.hero_title.split('.')[1] || ''}</span>
                      </h1>
                   </div>
                   <div className="lg:hidden w-full overflow-visible py-4 max-w-sm mx-auto">
                        <HeroVisual />
                   </div>
                   <p className={`text-sm sm:text-lg text-slate-500 font-medium leading-relaxed max-w-lg ${isRTL ? 'border-r-0 lg:border-r-4 pr-4 sm:pr-6 lg:pr-6 ml-auto lg:ml-0' : 'border-l-0 lg:border-l-4 pl-4 sm:pl-6 lg:pl-6 mr-auto lg:mr-0'} border-brand-accent mx-auto lg:mx-0`}>
                       {t.hero_desc}
                   </p>
                   <div className="flex flex-col xs:flex-row gap-4 sm:gap-5 pt-2 sm:pt-4 justify-center lg:justify-start items-center lg:items-start">
                      <button onClick={onStart} className="w-full xs:w-auto group flex items-center justify-center gap-3 sm:gap-4 px-8 sm:px-10 py-4 sm:py-5 bg-[#0F172A] text-white font-black text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] rounded-2xl shadow-2xl hover:bg-brand-accent hover:text-[#0F172A] transition-all active:scale-95">
                        <ZapIcon /> <span>{t.hero_cta_start}</span>
                      </button>
                      <button onClick={() => scrollToSection('prime-ads')} className="w-full xs:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-white border-2 border-slate-200 text-[#0F172A] font-black text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] rounded-2xl hover:bg-slate-50 transition-all">
                        {t.hero_cta_prime}
                      </button>
                   </div>
                   <div className="pt-8 sm:pt-12 grid grid-cols-3 gap-4 sm:gap-8 mx-auto lg:mx-0">
                       {[{ val: '50k+', label: t.stats_users }, { val: '120+', label: t.stats_teams }, { val: '4.9/5', label: t.stats_rating }].map((stat, i) => (
                           <div key={i} className="space-y-0.5 sm:space-y-1">
                               <div className="text-lg sm:text-2xl font-black text-[#0F172A]"><AnimatedCounter value={stat.val} /></div>
                               <div className="text-[8px] sm:text-[10px] font-bold uppercase tracking-widest text-slate-400">{stat.label}</div>
                           </div>
                       ))}
                   </div>
                </div>
                <div className="relative hidden lg:block"> <HeroVisual /> </div>
           </div>
        </section>

        <section id="prime-ads" className="py-24 sm:py-40 relative overflow-hidden bg-[#020617] group">
            <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-[url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center group-hover:scale-105 transition-transform duration-10000" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/95 to-transparent" />
            
            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                <div className={`max-w-3xl space-y-10 reveal-on-scroll ${isRTL ? 'text-right' : 'text-left'}`}>
                    <div className={`inline-flex items-center gap-3 px-4 py-2 bg-blue-600/10 border border-blue-500/20 rounded-2xl ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <PrimeCinemaLogo />
                    </div>
                    <h2 className="text-4xl sm:text-8xl font-black text-white uppercase italic tracking-tighter leading-[0.85]">
                        {t.cinema_title.split('Football')[0]} <br/> <span className="text-blue-500">Football</span> <br/> {t.cinema_title.split('Football')[1]}
                    </h2>
                    <p className="text-slate-400 text-lg sm:text-xl font-medium leading-relaxed max-w-xl">
                        {t.cinema_desc}
                    </p>
                    <div className={`flex flex-wrap gap-5 pt-4 ${isRTL ? 'justify-start flex-row-reverse' : 'justify-start'}`}>
                        <button 
                            onClick={() => setShowPricing(true)}
                            className="group px-12 py-6 bg-blue-600 text-white font-black uppercase tracking-[0.2em] text-[10px] sm:text-xs rounded-3xl shadow-[0_0_50px_rgba(59,130,246,0.4)] hover:bg-blue-500 hover:scale-105 transition-all flex items-center gap-4"
                        >
                            {t.cinema_cta} <div className={`w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180' : ''}`}><ChevronRightIcon /></div>
                        </button>
                        <div className={`flex items-center gap-3 px-8 py-5 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <div className="flex -space-x-3">
                              {[1,2,3,4].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-[#020617] bg-slate-800 flex items-center justify-center text-[8px] font-black">{i}</div>)}
                            </div>
                            <div className={`flex flex-col ${isRTL ? 'items-end' : 'items-start'}`}>
                              <div className="flex items-center gap-1 text-yellow-400"><StarIcon /> <StarIcon /> <StarIcon /> <StarIcon /> <StarIcon /></div>
                              <span className="text-white font-black text-[8px] uppercase tracking-widest">{t.cinema_active}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="about-us" className="py-24 sm:py-40 bg-white relative overflow-hidden">
             <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-64 flex items-center justify-center pointer-events-none opacity-[0.03]">
                <span className="text-9xl font-black uppercase tracking-widest -rotate-90 whitespace-nowrap text-brand-text">INTELLIGENCE</span>
             </div>
             <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
                  <div className={`reveal-on-scroll ${isRTL ? 'text-right' : 'text-left'}`}>
                      <span className="text-brand-accent font-black uppercase text-[10px] sm:text-xs tracking-[0.5em] block mb-4">{t.about_badge}</span>
                      <h2 className="text-4xl sm:text-7xl font-black text-[#0F172A] uppercase tracking-tighter leading-none mb-8">
                         {t.about_title.split('Modern')[0]} <br/> <span className="text-brand-accent">{t.about_title.split('of the')[1]}</span>
                      </h2>
                      <p className="text-slate-500 text-lg sm:text-xl leading-relaxed mb-10 font-medium">
                          {t.about_desc}
                      </p>
                      <div className="space-y-6">
                           {[
                               { title: t.about_feat1_t, desc: t.about_feat1_d },
                               { title: t.about_feat2_t, desc: t.about_feat2_d },
                               { title: t.about_feat3_t, desc: t.about_feat3_d }
                           ].map((item, i) => (
                               <div key={i} className={`flex gap-5 group ${isRTL ? 'flex-row-reverse' : ''}`}>
                                   <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-brand-accent group-hover:text-white transition-all duration-300 flex-shrink-0">
                                       <TargetIcon />
                                   </div>
                                   <div>
                                       <h4 className="text-[#0F172A] font-black uppercase text-sm tracking-widest mb-1">{item.title}</h4>
                                       <p className="text-slate-400 text-sm">{item.desc}</p>
                                   </div>
                               </div>
                           ))}
                      </div>
                  </div>
                  <div className="relative reveal-on-scroll delay-200">
                       <div className="aspect-square bg-slate-50 rounded-[3rem] border-2 border-slate-100 p-8 sm:p-12 shadow-2xl overflow-hidden relative group">
                            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none" />
                            <div className={`relative z-10 h-full flex flex-col justify-between ${isRTL ? 'items-end text-right' : 'items-start text-left'}`}>
                                <PrimeCinemaLogo />
                                <div className={`space-y-4 ${isRTL ? 'flex flex-col items-end' : ''}`}>
                                     <h3 className="text-3xl sm:text-5xl font-black text-[#0F172A] tracking-tighter uppercase italic leading-none">{t.about_card_title}</h3>
                                     <div className="h-1.5 w-24 bg-brand-accent rounded-full" />
                                     <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">{t.about_card_registry}</p>
                                </div>
                            </div>
                            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-accent/5 rounded-full blur-3xl group-hover:bg-brand-accent/20 transition-all duration-700" />
                       </div>
                  </div>
             </div>
        </section>

        <section id="features" className="py-20 sm:py-32 bg-[#020617] text-white overflow-hidden relative border-y border-white/5">
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                <div className={`mb-12 sm:mb-20 ${isRTL ? 'text-center md:text-right' : 'text-center md:text-left'}`}>
                    <div className={`flex items-center gap-3 mb-3 ${isRTL ? 'justify-center md:justify-end' : 'justify-center md:justify-start'}`}>
                        {!isRTL && <div className="h-[1px] w-8 bg-brand-accent" />}
                        <span className="text-brand-accent font-black uppercase text-[10px] sm:text-xs tracking-[0.4em] block">{t.features_badge}</span>
                        {isRTL && <div className="h-[1px] w-8 bg-brand-accent" />}
                    </div>
                    <h2 className="text-3xl sm:text-6xl font-black tracking-tighter uppercase">{t.features_title}</h2>
                </div>
                <div className="grid md:grid-cols-6 gap-4 sm:gap-6 items-stretch">
                    <div className={`md:col-span-4 bg-white/[0.03] backdrop-blur-md p-8 sm:p-12 rounded-[2rem] sm:rounded-[3rem] border border-white/10 hover:border-brand-accent/30 transition-all duration-500 group relative overflow-hidden shadow-2xl ${isRTL ? 'text-right' : 'text-left'}`}>
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-accent/20 to-transparent" />
                        <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-[#0F172A] border border-white/10 text-brand-accent rounded-2xl flex items-center justify-center mb-6 sm:mb-8 transition-transform shadow-xl ${isRTL ? 'mr-auto md:mr-0 ml-auto group-hover:-rotate-12' : 'mx-auto md:mx-0 group-hover:rotate-12'}`}> 
                            <UsersIcon /> 
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter text-white">{t.features_feat1_t}</h3>
                            <p className="text-slate-400 text-sm sm:text-lg font-medium leading-relaxed max-w-lg mx-auto md:mx-0"> 
                                {t.features_feat1_d} 
                            </p>
                        </div>
                        <div className={`mt-8 pt-8 border-t border-white/5 flex items-center gap-4 text-[8px] font-black uppercase tracking-widest text-slate-500 ${isRTL ? 'flex-row-reverse' : ''}`}>
                             <div className="flex items-center gap-1.5"><div className="w-1 h-1 rounded-full bg-brand-accent" /> 1:1 Scaling</div>
                             <div className="flex items-center gap-1.5"><div className="w-1 h-1 rounded-full bg-brand-accent" /> Zonal Awareness</div>
                        </div>
                    </div>
                    <div className="md:col-span-2 bg-brand-accent p-8 sm:p-12 rounded-[2rem] sm:rounded-[3rem] flex flex-col justify-between items-center md:items-start group cursor-pointer overflow-hidden relative shadow-2xl transition-all duration-500 hover:shadow-brand-accent/20">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                        <div className={`text-[#0F172A] opacity-20 group-hover:scale-110 transition-transform duration-500 ${isRTL ? 'mr-auto' : ''}`}> <MoveIcon /> </div>
                        <div className={`relative z-10 w-full ${isRTL ? 'text-right' : 'text-left'}`}>
                            <h3 className="text-2xl sm:text-3xl font-black text-[#0F172A] mb-2 sm:mb-4 uppercase tracking-tighter">{t.features_feat2_t}</h3>
                            <p className="text-[#0F172A]/70 text-[10px] sm:text-sm font-black uppercase tracking-widest border-t border-[#0F172A]/10 pt-4">{t.features_feat2_d}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="ecosystem" className="py-24 sm:py-40 bg-[#F8FAFC] relative overflow-hidden">
            <div className="absolute inset-0 z-0 pointer-events-none opacity-5">
                <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'linear-gradient(rgba(15,23,42,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-12 relative z-10">
                <div className="text-center mb-16 sm:mb-24 space-y-3 sm:space-y-4 reveal-on-scroll">
                    <div className="inline-block px-4 py-1.5 bg-brand-accent/10 border border-brand-accent/20 rounded-full mb-2">
                        <span className="text-brand-accent font-black uppercase text-[10px] sm:text-xs tracking-[0.5em] sm:tracking-[0.8em]">{t.eco_badge}</span>
                    </div>
                    <h2 className="text-4xl sm:text-7xl font-black tracking-tighter uppercase text-[#0F172A] leading-tight">{t.eco_title}</h2>
                    <p className="max-w-2xl mx-auto text-slate-500 font-medium text-sm sm:text-base">{t.eco_desc}</p>
                </div>
                
                <div className={`grid lg:grid-cols-2 gap-8 sm:gap-12 items-stretch relative ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[2px] bg-slate-200 hidden lg:block z-0 opacity-40" />
                    
                    <div className="flex flex-col h-full group bg-white rounded-[2.5rem] sm:rounded-[3.5rem] p-0.5 border border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-700 reveal-on-scroll relative z-10">
                        <div className={`rounded-[2.4rem] sm:rounded-[3.4rem] p-6 sm:p-14 flex-1 flex flex-col h-full relative overflow-hidden ${isRTL ? 'text-right' : 'text-left'}`}>
                            <div className={`mb-8 flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#0F172A] rounded-2xl flex items-center justify-center text-brand-accent shadow-xl group-hover:rotate-6 transition-all duration-500"><MoveIcon /></div>
                                <div>
                                    <h3 className="text-xl sm:text-3xl font-black text-[#0F172A] uppercase tracking-tighter leading-none mb-1">{t.eco_b1_t}</h3>
                                    <p className="text-slate-400 text-[8px] sm:text-xs font-black uppercase tracking-widest">{t.eco_b1_p}</p>
                                </div>
                            </div>
                            <p className="text-slate-500 text-sm sm:text-lg font-medium leading-relaxed mb-10 flex-1"> 
                                {t.eco_b1_d}
                            </p>
                            <div className="relative aspect-[16/10] bg-[#14532D] rounded-[2rem] shadow-2xl border-[8px] sm:border-[12px] border-[#064e3b] overflow-hidden group-hover:border-brand-accent transition-all duration-500">
                                <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/grass.png')]"></div>
                                <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 100 68" preserveAspectRatio="none">
                                    <rect x="2" y="2" width="96" height="64" fill="none" stroke="white" strokeWidth="0.8" />
                                    <line x1="50" y1="2" x2="50" y2="66" stroke="white" strokeWidth="0.8" />
                                    <circle cx="50" cy="34" r="10" fill="none" stroke="white" strokeWidth="0.8" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex flex-col h-full group bg-[#0F172A] rounded-[2.5rem] sm:rounded-[3.5rem] p-0.5 border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-700 reveal-on-scroll delay-150 relative z-10">
                        <div className={`rounded-[2.4rem] sm:rounded-[3.4rem] p-6 sm:p-14 flex-1 flex flex-col h-full relative overflow-hidden ${isRTL ? 'text-right' : 'text-left'}`}>
                            <div className={`mb-8 flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-brand-accent rounded-2xl flex items-center justify-center text-[#0F172A] shadow-xl group-hover:-rotate-6 transition-all duration-500"><ZapIcon /></div>
                                <div>
                                    <h3 className="text-xl sm:text-3xl font-black text-white uppercase tracking-tighter leading-none mb-1">{t.eco_b2_t}</h3>
                                    <p className="text-blue-400 text-[8px] sm:text-xs font-black uppercase tracking-widest">{t.eco_b2_p}</p>
                                </div>
                            </div>
                            <p className="text-slate-400 text-sm sm:text-lg font-medium leading-relaxed mb-10 flex-1"> 
                                {t.eco_b2_d}
                            </p>
                            <div className="relative aspect-[16/10] bg-[#14532D] rounded-[2rem] shadow-2xl border-[8px] sm:border-[12px] border-[#1e293b] overflow-hidden group-hover:border-blue-400 transition-all duration-500">
                                <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/grass.png')]"></div>
                                <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 100 68" preserveAspectRatio="none">
                                    <rect x="2" y="2" width="96" height="64" fill="none" stroke="white" strokeWidth="0.8" />
                                    <line x1="50" y1="2" x2="50" y2="66" stroke="white" strokeWidth="0.8" />
                                    <circle cx="50" cy="34" r="10" fill="none" stroke="white" strokeWidth="0.8" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="vision" className="py-24 sm:py-48 bg-[#020617] relative overflow-hidden">
             <div className="absolute inset-0 pointer-events-none opacity-20">
                  <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.15),transparent_70%)]" />
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
             </div>
             <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                  <div className="text-center max-w-3xl mx-auto mb-20 sm:mb-32 reveal-on-scroll">
                      <span className="text-blue-500 font-black uppercase text-[10px] sm:text-xs tracking-[0.8em] block mb-6">{t.vision_badge}</span>
                      <h2 className="text-4xl sm:text-8xl font-black text-white uppercase tracking-tighter leading-none mb-8">
                         {t.vision_title.split('Tactical')[0]} <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Tactical</span> {t.vision_title.split('Tactical')[1]}
                      </h2>
                      <p className="text-slate-400 text-lg sm:text-xl font-medium">
                          {t.vision_desc}
                      </p>
                  </div>
                  <div className={`grid md:grid-cols-3 gap-8 reveal-on-scroll ${isRTL ? 'md:flex-row-reverse' : ''}`}>
                       {[
                           { icon: <TargetIcon />, title: t.vision_p1_t, desc: t.vision_p1_d },
                           { icon: <GlobeIcon />, title: t.vision_p2_t, desc: t.vision_p2_d },
                           { icon: <ZapIcon />, title: t.vision_p3_t, desc: t.vision_p3_d }
                       ].map((pillar, i) => (
                           <div key={i} className={`bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-2 group ${isRTL ? 'text-right' : 'text-left'}`}>
                               <div className={`text-blue-400 mb-8 transform group-hover:scale-125 transition-transform duration-500 w-10 h-10 ${isRTL ? 'mr-auto' : ''}`}>
                                   {pillar.icon}
                               </div>
                               <h4 className="text-white font-black uppercase tracking-widest text-lg mb-4">{pillar.title}</h4>
                               <p className="text-slate-500 leading-relaxed font-medium">{pillar.desc}</p>
                           </div>
                       ))}
                  </div>
             </div>
        </section>
      </main>

      <footer className="bg-white border-t border-slate-200 pt-16 sm:pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
               <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                 <div className="w-10 h-10 bg-[#0F172A] rounded-xl flex items-center justify-center text-brand-accent scale-90 sm:scale-100"><LogoIcon /></div>
                 <span className="text-lg sm:text-2xl font-black tracking-tighter uppercase text-[#0F172A]">Tactical<span className="text-brand-accent">Board</span></span>
               </div>
               
               <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
                   {[
                       { id: 'en', label: 'English', native: 'EN' },
                       { id: 'ar', label: 'Arabic', native: 'العربية' },
                       { id: 'tr', label: 'Turkish', native: 'Türkçe' },
                       { id: 'es', label: 'Spain', native: 'Español' },
                       { id: 'fr', label: 'French', native: 'Français' }
                   ].map((lang) => (
                       <button 
                           key={lang.id} 
                           onClick={() => setLanguage && setLanguage(lang.id)}
                           className={`group flex flex-col items-center transition-all ${language === lang.id ? 'scale-110' : 'opacity-60 hover:opacity-100'}`}
                        >
                           <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${language === lang.id ? 'text-brand-accent' : 'text-slate-300'}`}>{lang.label}</span>
                           <span className={`text-xs font-bold transition-colors ${language === lang.id ? 'text-brand-text' : 'text-slate-500'}`}>{lang.native}</span>
                       </button>
                   ))}
               </div>

               <div className="flex gap-6 sm:gap-12 text-center sm:text-left">
                   <button onClick={() => onOpenPage('about')} className="text-slate-400 font-bold text-xs sm:text-sm hover:text-brand-accent transition-colors uppercase tracking-widest">{t.nav_about}</button>
                   <button onClick={() => onOpenPage('privacy')} className="text-slate-400 font-bold text-xs sm:text-sm hover:text-brand-accent transition-colors uppercase tracking-widest">Privacy</button>
                   <button onClick={() => onOpenPage('terms')} className="text-slate-400 font-bold text-xs sm:text-sm hover:text-brand-accent transition-colors uppercase tracking-widest">Terms</button>
               </div>
          </div>
          
          <div className="pt-12 mt-12 border-t border-slate-100 text-center">
             <p className="text-[10px] text-slate-400 font-black tracking-widest uppercase">{t.footer_tag}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
