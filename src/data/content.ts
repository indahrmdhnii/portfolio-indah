import boteenLogo from '../assets/projects/boteen.webp';
import wiramudaLogo from '../assets/projects/wiramuda.svg';
import writeenLogo from '../assets/projects/writeen.svg';
import lintasHome from '../assets/lintas/home.webp';
import lintasRoutes from '../assets/lintas/routes.webp';
import lintasTrip from '../assets/lintas/trip.webp';
import lintasSearch from '../assets/lintas/search.webp';
import lintasSplash from '../assets/lintas/splash.webp';
import lintasLogo from '../assets/projects/lintas.webp';
import boteenIdea from '../assets/boteen/idea.webp';
import boteenGraduate from '../assets/boteen/graduate.webp';
import boteenBusiness from '../assets/boteen/business.webp';
import boteenCurious from '../assets/boteen/curious.webp';
import boteenTrophy from '../assets/boteen/trophy.webp';
/**
 * All portfolio content lives here, in English (en) and Indonesian (id).
 * Edit this file to update the text on the site.
 */

export type Lang = 'en' | 'id';
export type L = { en: string; id: string };

export const profile = {
  name: 'Indah Ramadhani',
  shortName: 'Indah',
  location: { en: 'Jakarta, Indonesia', id: 'Jakarta, Indonesia' } as L,
  email: 'indah.rmdhni241@gmail.com',
  linkedin: 'https://www.linkedin.com/in/indahrmadh',
  linkedinDisplay: 'linkedin.com/in/indahrmadh',
  instagram: 'https://www.instagram.com/indahramadhnii',
  instagramDisplay: '@indahramadhnii',
};

export const hero = {
  greeting: { en: "Hi, I'm Indah Ramadhani", id: 'Hai, saya Indah Ramadhani' } as L,
  taglineA: { en: 'Analyze like a skeptic.', id: 'Menganalisis dengan kritis.' } as L,
  taglineB: { en: 'Build like a believer.', id: 'Membangun dengan yakin.' } as L,
  label: {
    en: 'Business Analyst & Business Development · Digital Business',
    id: 'Business Analyst & Business Development · Bisnis Digital',
  } as L,
  rolePrefix: { en: 'I am a', id: 'Saya seorang' } as L,
  roles: {
    en: ['Business Analyst', 'Business Developer', 'BI Enthusiast', 'Founder', 'Lifelong Learner'],
    id: ['Business Analyst', 'Business Developer', 'BI Enthusiast', 'Founder', 'Pembelajar Seumur Hidup'],
  },
  ctaProjects: { en: 'Projects →', id: 'Proyek →' } as L,
  ctaContact: { en: 'Contact →', id: 'Kontak →' } as L,
  photoAlt: { en: 'Portrait of Indah Ramadhani', id: 'Foto Indah Ramadhani' } as L,
  photoCaption: { en: "hi, it's me!", id: 'halo, ini aku!' } as L,
};

export const about = {
  leftTitle: { en: 'about me', id: 'tentang saya' } as L,
  leftBody: {
    en: [
      "I'm a double-degree student in Computer Science and Management, sitting right where tech meets business.",
      "I love the messy early stage: when an idea is still a hunch, the numbers are thin, and someone has to turn both into a plan people actually believe in.",
    ],
    id: [
      'Saya mahasiswa double-degree Ilmu Komputer dan Manajemen, tepat di titik temu teknologi dan bisnis.',
      'Saya suka tahap awal yang masih berantakan: saat ide masih sebatas firasat, datanya tipis, dan perlu seseorang yang mengubah keduanya jadi rencana yang benar-benar dipercaya orang.',
    ],
  },
  invite: {
    en: 'Got a digital business idea? Let\'s build it together.',
    id: 'Punya ide bisnis digital? Yuk, bangun bareng.',
  } as L,
  inviteCta: { en: 'say hi →', id: 'sapa aku →' } as L,
  rightTitle: { en: 'quick notes', id: 'catatan singkat' } as L,
  notes: {
    en: [
      'Based in Jakarta',
      'Informatics, Universitas Mercu Buana (2023 – now)',
      'Management, Universitas Terbuka (2024 – now)',
      '2x founder · 3x inventor awardee',
      '{certCount} certificates and counting',
      'Indonesian & English',
    ],
    id: [
      'Berdomisili di Jakarta',
      'Informatika, Universitas Mercu Buana (2023 – sekarang)',
      'Manajemen, Universitas Terbuka (2024 – sekarang)',
      '2x founder · 3x peraih penghargaan inovasi',
      '{certCount} sertifikat dan terus bertambah',
      'Bahasa Indonesia & Inggris',
    ],
  },
  openTo: {
    en: 'Open to: Business Analyst, Business Intelligence & Business Development roles, and co-building digital ventures',
    id: 'Terbuka untuk: peran Business Analyst, Business Intelligence & Business Development, serta membangun bisnis digital bersama',
  } as L,
};

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export type ProjectStatus = 'live' | 'development' | 'concept' | 'completed';

export const projectStatusLabel: Record<ProjectStatus, L> = {
  live: { en: 'Live', id: 'Live' },
  development: { en: 'In development', id: 'Dalam pengembangan' },
  concept: { en: 'Concept', id: 'Konsep' },
  completed: { en: 'Completed', id: 'Selesai' },
};

export interface Project {
  title: string;
  monogram: string;
  /** Optional project logo, replaces the monogram tile */
  logo?: string;
  status: ProjectStatus;
  role?: L;
  description: L;
  tags: L[];
  url?: string;
  urlLabel?: string;
  /** Optional button text replacing "Visit {urlLabel}" */
  urlText?: L;
  /** Optional app screenshots in a small phone frame peeking out of the card (several = slideshow) */
  preview?: { shots: string[] };
  /** Optional character poses shown around the card (e.g. Boteen) */
  mascots?: { src: string; alt: L }[];
}

export const projects: Project[] = [
  {
    title: 'Writeen',
    monogram: 'W',
    logo: writeenLogo,
    status: 'live',
    role: { en: 'UI Designer → Head of Creative', id: 'UI Designer → Head of Creative' },
    description: {
      en: "An all-in-one literacy education media for Indonesia's youth. I helped build it from concept to launch: designing the mobile app interface, then leading creative strategy and brand. Funded through P2MW 2024 and a finalist at KMI Expo 2024.",
      id: 'Media edukasi literasi all-in-one untuk anak muda Indonesia. Saya ikut membangunnya dari konsep sampai rilis: merancang antarmuka aplikasi mobile, lalu memimpin strategi kreatif dan brand. Didanai lewat P2MW 2024 dan menjadi finalis KMI Expo 2024.',
    },
    tags: [
      { en: 'Edu Tech', id: 'Edu Tech' },
      { en: 'UI Design', id: 'Desain UI' },
      { en: 'Brand Strategy', id: 'Strategi Brand' },
      { en: 'P2MW Grantee', id: 'Penerima P2MW' },
    ],
    url: 'https://writeen.id',
    urlLabel: 'writeen.id',
  },
  {
    title: 'Wiramuda',
    monogram: 'Wm',
    logo: wiramudaLogo,
    status: 'development',
    role: { en: 'Data Scientist', id: 'Data Scientist' },
    description: {
      en: 'A data-driven mentoring and growth-strategy consulting platform for MSMEs. I processed and analyzed business data to surface trends, patterns, and opportunities that support strategic decisions.',
      id: 'Platform pendamping dan konsultasi strategi pertumbuhan bisnis UMKM berbasis data. Saya mengolah dan menganalisis data bisnis untuk menemukan tren, pola, dan peluang yang mendukung keputusan strategis.',
    },
    tags: [
      { en: 'Data Analysis', id: 'Analisis Data' },
      { en: 'MSME Growth', id: 'Pertumbuhan UMKM' },
      { en: 'HKI', id: 'HKI' },
    ],
    url: 'https://linktr.ee/wiramuda.co',
    urlLabel: 'Wiramuda',
  },
  {
    title: 'LinTas',
    monogram: 'Lt',
    logo: lintasLogo,
    status: 'concept',
    description: {
      en: 'A mobile platform for public-transport navigation and integration, designed with a human-centered approach.',
      id: 'Platform navigasi dan integrasi transportasi publik berbasis mobile, dirancang dengan pendekatan human-centered design.',
    },
    tags: [
      { en: 'Mobile', id: 'Mobile' },
      { en: 'Human-Centered Design', id: 'Human-Centered Design' },
      { en: 'UI/UX Design', id: 'Desain UI/UX' },
      { en: 'HKI', id: 'HKI' },
    ],
    preview: { shots: [lintasSplash, lintasHome, lintasRoutes, lintasTrip, lintasSearch] },
  },
  {
    title: 'Boteen',
    monogram: 'B',
    logo: boteenLogo,
    status: 'completed',
    role: { en: '2D/3D Character Animator', id: '2D/3D Character Animator' },
    description: {
      en: 'The mascot of Writeen, brought to life in 2D and 3D: from visual ideation and character illustration to 3D modeling and texturing, built to carry the brand across digital platforms.',
      id: 'Maskot Writeen yang dihidupkan dalam format 2D dan 3D: dari ideasi visual dan ilustrasi karakter sampai 3D modeling dan texturing, dirancang untuk membawa brand di berbagai platform digital.',
    },
    tags: [
      { en: 'Character Design', id: 'Desain Karakter' },
      { en: '2D / 3D', id: '2D / 3D' },
      { en: 'Procreate', id: 'Procreate' },
      { en: 'Blender', id: 'Blender' },
      { en: 'Branding', id: 'Branding' },
      { en: 'HKI', id: 'HKI' },
    ],
    mascots: [
      { src: boteenGraduate, alt: { en: 'Boteen flying with a diploma', id: 'Boteen terbang membawa ijazah' } },
      { src: boteenIdea, alt: { en: 'Boteen with a bright idea', id: 'Boteen dapat ide' } },
      { src: boteenBusiness, alt: { en: 'Boteen in glasses and a tie', id: 'Boteen berkacamata dan berdasi' } },
      { src: boteenCurious, alt: { en: 'Boteen asking a question', id: 'Boteen sedang bertanya' } },
      { src: boteenTrophy, alt: { en: 'Boteen holding a trophy', id: 'Boteen memegang piala' } },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Experience                                                          */
/* ------------------------------------------------------------------ */

export type ExpTrack = 'bd' | 'data' | 'creative' | 'program';
export type Domain = 'edutech' | 'socialtech' | 'community';

export const trackLabel: Record<ExpTrack, L> = {
  bd: { en: 'Business Development', id: 'Business Development' },
  data: { en: 'Data & Analysis', id: 'Data & Analisis' },
  creative: { en: 'Creative & Marketing', id: 'Kreatif & Marketing' },
  program: { en: 'Programs & Grants', id: 'Program & Hibah' },
};

export const domainLabel: Record<Domain, L> = {
  edutech: { en: 'Edu Tech', id: 'Edu Tech' },
  socialtech: { en: 'Social Tech', id: 'Social Tech' },
  community: { en: 'Community-based', id: 'Berbasis Komunitas' },
};

export interface ExperienceItem {
  title: L;
  company: string;
  /** Registered legal entity, shown small under the company name */
  legalName?: string;
  location: L;
  period: L;
  track: ExpTrack;
  // NOTE: domain tags are a first guess based on the organisation names.
  // Remove or change any that are not accurate.
  domain?: Domain;
  current?: boolean;
  /** Highlighted achievement shown as a gold badge on the card */
  badge?: L;
  description?: { en: string[]; id: string[] };
}

export const experiences: ExperienceItem[] = [
  {
    title: { en: 'Business Development', id: 'Business Development' },
    company: 'Kunci Hukum Indonesia',
    legalName: 'PT Kunci Hukum Indonesia',
    location: { en: 'West Java, Indonesia', id: 'Jawa Barat, Indonesia' },
    period: { en: 'Sep 2026 – Present', id: 'Sep 2026 – Sekarang' },
    track: 'bd',
    domain: 'socialtech',
    current: true,
  },
  {
    title: { en: 'Business Administration Intelligence Analyst', id: 'Business Administration Intelligence Analyst' },
    company: 'VINIX7',
    legalName: 'PT Vinix Seven Aurum',
    location: { en: 'Jakarta, Indonesia', id: 'Jakarta, Indonesia' },
    period: { en: 'Sep 2026 – Present', id: 'Sep 2026 – Sekarang' },
    track: 'data',
    current: true,
  },
  {
    title: { en: 'Business Development', id: 'Business Development' },
    company: 'HelloBeauty.id',
    legalName: 'PT Halo Grup Indo',
    location: { en: 'North Jakarta, Indonesia', id: 'Jakarta Utara, Indonesia' },
    period: { en: 'Jul 2026 – Present', id: 'Jul 2026 – Sekarang' },
    track: 'bd',
    current: true,
  },
  {
    title: { en: 'Business Development', id: 'Business Development' },
    company: 'Kelana Jiwa',
    location: { en: 'Jakarta, Indonesia', id: 'Jakarta, Indonesia' },
    period: { en: 'May 2026 – Oct 2026', id: 'Mei 2026 – Okt 2026' },
    track: 'bd',
    domain: 'community',
  },
  {
    title: { en: 'Business Development Manager', id: 'Business Development Manager' },
    company: 'Kelas Kampus Indonesia',
    legalName: 'PT Kelas Kampus Indonesia',
    location: { en: 'Indonesia', id: 'Indonesia' },
    period: { en: 'May 2026 – Oct 2026', id: 'Mei 2026 – Okt 2026' },
    track: 'bd',
    domain: 'edutech',
    badge: {
      en: 'Got "Best Manager" across all divisions for Q3 2026!',
      id: 'Meraih "Best Manager" dari seluruh divisi untuk Q3 2026!',
    },
  },
  {
    title: { en: 'ID Camp 2025 · AI Multi-Platform App', id: 'ID Camp 2025 · AI Multi-Platform App' },
    company: 'Dicoding Indonesia',
    location: { en: 'Jakarta, Indonesia', id: 'Jakarta, Indonesia' },
    period: { en: 'Dec 2025 – Apr 2026', id: 'Des 2025 – Apr 2026' },
    track: 'program',
    description: {
      en: [
        'Completed an intensive Flutter development program from beginner to expert level.',
        'Covered multi-platform app development, machine learning integration, and API implementation through hands-on capstone projects.',
      ],
      id: [
        'Menyelesaikan program intensif pengembangan Flutter dari level pemula sampai expert.',
        'Mencakup pengembangan aplikasi multi-platform, integrasi machine learning, dan implementasi API lewat proyek capstone.',
      ],
    },
  },
  {
    title: { en: 'Digital Marketing', id: 'Digital Marketing' },
    company: 'PT Pertamina Bina Medika IHC',
    location: { en: 'South Jakarta, Indonesia', id: 'Jakarta Selatan, Indonesia' },
    period: { en: 'Sep 2025 – Dec 2025', id: 'Sep 2025 – Des 2025' },
    track: 'creative',
    description: {
      en: [
        'Analyzed digital performance metrics to evaluate campaign effectiveness and support data-driven marketing decisions.',
        'Managed website administration and monitored SEO performance to optimize content reach.',
        'Developed digital assets and branding materials aligned with business objectives.',
      ],
      id: [
        'Menganalisis metrik performa digital untuk mengevaluasi efektivitas kampanye dan mendukung keputusan marketing berbasis data.',
        'Mengelola administrasi website dan memantau performa SEO untuk mengoptimalkan jangkauan konten.',
        'Membuat aset digital dan materi branding yang selaras dengan tujuan bisnis.',
      ],
    },
  },
  {
    title: { en: 'Data Scientist', id: 'Data Scientist' },
    company: 'Wiramuda.co',
    location: { en: 'West Jakarta, Indonesia', id: 'Jakarta Barat, Indonesia' },
    period: { en: 'Jan 2025 – Sep 2025', id: 'Jan 2025 – Sep 2025' },
    track: 'data',
    domain: 'socialtech',
    description: {
      en: [
        'Processed and analyzed business data to generate actionable insights supporting strategic decision-making.',
        'Collaborated with cross-functional teams to identify trends, patterns, and business opportunities through data exploration and visualization.',
      ],
      id: [
        'Mengolah dan menganalisis data bisnis untuk menghasilkan insight yang mendukung pengambilan keputusan strategis.',
        'Berkolaborasi dengan tim lintas fungsi untuk menemukan tren, pola, dan peluang bisnis lewat eksplorasi dan visualisasi data.',
      ],
    },
  },
  {
    title: { en: 'Head of Creative', id: 'Head of Creative' },
    company: 'Writeen',
    location: { en: 'West Jakarta, Indonesia', id: 'Jakarta Barat, Indonesia' },
    period: { en: 'May 2024 – Sep 2025', id: 'Mei 2024 – Sep 2025' },
    track: 'creative',
    domain: 'edutech',
    description: {
      en: [
        'Led creative strategy and brand development initiatives, aligning visual identity with business goals.',
        'Monitored brand performance across digital platforms and translated audience insights into content strategies.',
      ],
      id: [
        'Memimpin strategi kreatif dan pengembangan brand, menyelaraskan identitas visual dengan tujuan bisnis.',
        'Memantau performa brand di berbagai platform digital dan menerjemahkan insight audiens menjadi strategi konten.',
      ],
    },
  },
  {
    title: { en: '2D/3D Character Animator', id: '2D/3D Character Animator' },
    company: 'Writeen',
    location: { en: 'West Jakarta, Indonesia', id: 'Jakarta Barat, Indonesia' },
    period: { en: 'Feb 2025 – Mar 2025', id: 'Feb 2025 – Mar 2025' },
    track: 'creative',
    domain: 'edutech',
    description: {
      en: [
        'Created and developed Boteen, a mascot character brought to life in both 2D and 3D formats.',
        'Handled visual ideation, character illustration, 3D modeling, and texturing so the character communicates brand values across digital platforms.',
      ],
      id: [
        'Menciptakan dan mengembangkan Boteen, karakter maskot dalam format 2D dan 3D.',
        'Mengerjakan ideasi visual, ilustrasi karakter, 3D modeling, dan texturing agar karakter mampu menyampaikan nilai brand di berbagai platform digital.',
      ],
    },
  },
  {
    title: { en: 'P2MW Grantee (Funded Project) 2024 · Digital Business', id: 'Penerima P2MW (Proyek Didanai) 2024 · Bisnis Digital' },
    company: 'Kementerian Pendidikan dan Kebudayaan',
    location: { en: 'West Jakarta, Indonesia', id: 'Jakarta Barat, Indonesia' },
    period: { en: 'May 2024 – Nov 2024', id: 'Mei 2024 – Nov 2024' },
    track: 'program',
    description: {
      en: [
        'Selected as a P2MW 2024 grantee in the field of Digital Business, building Writeen through the program.',
        'Selected as a P2MW finalist and presented Writeen at KMI Expo 2024 (Indonesian Student Entrepreneurship) in Kendari, Southeast Sulawesi.',
      ],
      id: [
        'Terpilih sebagai penerima P2MW 2024 bidang Bisnis Digital dan membangun Writeen lewat program ini.',
        'Terpilih sebagai finalis P2MW dan mempresentasikan Writeen di KMI Expo 2024 (Kewirausahaan Mahasiswa Indonesia) di Kendari, Sulawesi Tenggara.',
      ],
    },
  },
  {
    title: { en: 'UI Designer', id: 'UI Designer' },
    company: 'Writeen',
    location: { en: 'West Jakarta, Indonesia', id: 'Jakarta Barat, Indonesia' },
    period: { en: 'Jan 2024 – Apr 2024', id: 'Jan 2024 – Apr 2024' },
    track: 'creative',
    domain: 'edutech',
    description: {
      en: [
        'Involved in developing Writeen, an all-in-one literacy education media, from its inception.',
        'Built and refined the user interface of the Writeen mobile app, focusing on intuitive and engaging user experiences.',
      ],
      id: [
        'Terlibat dalam pengembangan Writeen, media edukasi literasi all-in-one, sejak awal berdiri.',
        'Membangun dan menyempurnakan antarmuka aplikasi mobile Writeen dengan fokus pada pengalaman pengguna yang intuitif dan menarik.',
      ],
    },
  },
  {
    title: { en: 'Media & Creative', id: 'Media & Creative' },
    company: 'Pertemanan Sejiwa',
    location: { en: 'East Java, Indonesia', id: 'Jawa Timur, Indonesia' },
    period: { en: 'Mar 2024 – Aug 2024', id: 'Mar 2024 – Agu 2024' },
    track: 'creative',
    domain: 'community',
    description: {
      en: [
        'Learned digital marketing strategy, creative content creation, and online community management first-hand.',
        'Developed skills in copywriting and creative writing.',
      ],
      id: [
        'Belajar langsung tentang strategi digital marketing, pembuatan konten kreatif, dan pengelolaan komunitas online.',
        'Mengembangkan kemampuan copywriting dan creative writing.',
      ],
    },
  },
];

/* ------------------------------------------------------------------ */
/* Skills                                                              */
/* ------------------------------------------------------------------ */

export const skillGroups: { title: L; items: string[] }[] = [
  {
    title: { en: 'Business', id: 'Bisnis' },
    items: ['Business Development', 'Business Strategy', 'Strategic Partnerships', 'Digital Marketing', 'SEO Analysis', 'Marketing Management'],
  },
  {
    title: { en: 'Data & BI', id: 'Data & BI' },
    items: ['Data Analysis', 'Power BI', 'Looker Studio', 'SQL', 'Python', 'Google Analytics', 'Microsoft Fabric', 'Sentiment Analysis', 'Data Visualization'],
  },
  {
    title: { en: 'Tech & AI', id: 'Teknologi & AI' },
    items: ['Flutter', 'Dart', 'Mobile App Development', 'Machine Learning', 'Generative AI', 'PyTorch', 'Azure', 'AWS'],
  },
  {
    title: { en: 'Creative', id: 'Kreatif' },
    items: ['UI Design', 'Brand Strategy', 'Character Design', '3D Modeling', 'Figma', 'Canva', 'Procreate', 'Blender', 'Copywriting', 'Community Management'],
  },
  {
    title: { en: 'Productivity', id: 'Produktivitas' },
    items: ['Microsoft Office', 'Google Workspace', 'Notion', 'Lark', 'Trello'],
  },
];

/* ------------------------------------------------------------------ */
/* Recognition: awards, intellectual property, publications            */
/* ------------------------------------------------------------------ */

export const awards: { title: L; detail?: L; year: string; medal: 'gold' | 'silver' | 'star' }[] = [
  {
    title: { en: 'Gold Medal · Pekan Inovasi 2025', id: 'Medali Emas · Pekan Inovasi 2025' },
    detail: { en: 'with INNOPA', id: 'bersama INNOPA' },
    year: '2025',
    medal: 'gold',
  },
  {
    title: { en: 'Silver Medal · IID Competition 2024', id: 'Medali Perak · IID Competition 2024' },
    detail: {
      en: 'Indonesia Inventors Day · Educational & Teaching Tools Materials',
      id: 'Indonesia Inventors Day · Educational & Teaching Tools Materials',
    },
    year: '2024',
    medal: 'silver',
  },
  {
    title: { en: 'Top 50 Youth Sociopreneur 2025', id: 'Top 50 Youth Sociopreneur 2025' },
    year: '2025',
    medal: 'star',
  },
  {
    title: { en: 'Duta Baca Nusantara 2025', id: 'Duta Baca Nusantara 2025' },
    detail: { en: 'Inspirator Category', id: 'Kategori Inspirator' },
    year: '2025',
    medal: 'star',
  },
  {
    title: { en: 'MBKM Awards 2023/2024 · Best Group of P2MW', id: 'MBKM Awards 2023/2024 · Kelompok Terbaik P2MW' },
    detail: { en: 'Student Entrepreneurship Development Program', id: 'Program Pembinaan Mahasiswa Wirausaha' },
    year: '2024',
    medal: 'star',
  },
];

// HKI (Hak Cipta, DJKI): `url` opens the official record on hakcipta.dgip.go.id.
export interface IpItem { title: string; kind?: L; number?: string; date?: L; url?: string }
const copyright: L = { en: 'Copyright', id: 'Hak Cipta' };
export const intellectualProperty: IpItem[] = [
  {
    title: 'Wiramuda: Platform Pendamping dan Konsultasi Strategi Pertumbuhan Bisnis UMKM Berbasis Data',
    kind: copyright, number: 'EC002026181940', date: { en: 'Sep 23, 2026', id: '23 Sep 2026' },
    url: 'https://hakcipta.dgip.go.id/legal/c/MDAxNTA1ODc2',
  },
  {
    title: 'LinTas: Platform Navigasi & Integrasi Transportasi Publik Berbasis Mobile Human-Centered Design',
    kind: copyright, number: 'EC002026138027', date: { en: 'Aug 10, 2026', id: '10 Agu 2026' },
    url: 'https://hakcipta.dgip.go.id/legal/c/MDAxNDA0Mzkx',
  },
  {
    title: 'Implementation of Proxy at XYZ Inc. Study: Experiment on Network Performance Optimization',
    kind: copyright, number: 'EC002026113559', date: { en: 'Jul 13, 2026', id: '13 Jul 2026' },
    url: 'https://hakcipta.dgip.go.id/legal/c/MDAxMzQ2MTEy',
  },
  { title: 'Boteen: The Mascot of Writeen', kind: copyright },
];

// Publications: `sinta` = SINTA accreditation rank of the journal (shown as a highlighted badge).
export interface PublicationItem { title: string; venue: string; publisher?: L; date?: L; sinta?: number; doi?: string; url?: string }
export const publications: PublicationItem[] = [
  {
    title: 'Implementation of Proxy at XYZ Inc. Study: Experiment on Network Performance Optimization',
    venue: 'PIKSEL: Penelitian Ilmu Komputer Sistem Embedded & Logic · Vol. 13 (2): 247–254',
    publisher: { en: 'Universitas Islam 45 Bekasi', id: 'Universitas Islam 45 Bekasi' },
    date: { en: 'Sep 30, 2025', id: '30 Sep 2025' },
    sinta: 3,
    doi: '10.33558/piksel.v13i2.11535',
    url: 'https://jurnal.unismabekasi.ac.id/index.php/piksel/article/view/11535',
  },
  {
    title: 'Edukasi Keamanan Jaringan dan Kolaborasi Digital di Kelurahan Duri Kepa',
    venue: 'Jurnal ABDI MOESTOPO · Vol. 8 (2)',
    publisher: { en: 'LPPM, Universitas Prof. Dr. Moestopo (Beragama)', id: 'LPPM, Universitas Prof. Dr. Moestopo (Beragama)' },
    date: { en: 'Jul 25, 2025', id: '25 Jul 2025' },
    sinta: 4,
    doi: '10.32509/abdimoestopo.v8i2.5467',
    url: 'https://doi.org/10.32509/abdimoestopo.v8i2.5467',
  },
];

/* ------------------------------------------------------------------ */
/* Volunteering                                                        */
/* ------------------------------------------------------------------ */

export type Cause = 'children' | 'health' | 'arts' | 'education' | 'social' | 'relief';

export const causeLabel: Record<Cause, L> = {
  children: { en: 'Children', id: 'Anak-anak' },
  health: { en: 'Health', id: 'Kesehatan' },
  arts: { en: 'Arts & Culture', id: 'Seni & Budaya' },
  education: { en: 'Education', id: 'Pendidikan' },
  social: { en: 'Social Services', id: 'Layanan Sosial' },
  relief: { en: 'Disaster & Humanitarian Relief', id: 'Bencana & Kemanusiaan' },
};

export interface VolunteerItem {
  title: L;
  org: string;
  date: L;
  cause: Cause;
  description?: L;
  link?: string;
}

export const volunteering: VolunteerItem[] = [
  {
    title: { en: 'Layangkan Mimpi Bersama Adik-adik di Museum Layang-Layang', id: 'Layangkan Mimpi Bersama Adik-adik di Museum Layang-Layang' },
    org: 'Kita Bahagia',
    date: { en: 'Nov 2026', id: 'Nov 2026' },
    cause: 'arts',
  },
  {
    title: { en: 'Self Workshop: Belajar Bahasa Isyarat & Eco Print', id: 'Self Workshop: Belajar Bahasa Isyarat & Eco Print' },
    org: 'Rumah Kencana',
    date: { en: 'Oct 2026', id: 'Okt 2026' },
    cause: 'education',
  },
  {
    title: { en: 'Ekspedisi Baik #126 · Rumah Singgah CISC', id: 'Ekspedisi Baik #126 · Rumah Singgah CISC' },
    org: 'SoCo Giving',
    date: { en: 'Sep 2026', id: 'Sep 2026' },
    cause: 'health',
  },
  {
    title: { en: 'Art & Craft Class #281 · Yayasan Rumah Singgah', id: 'Art & Craft Class #281 · Yayasan Rumah Singgah' },
    org: 'Rumah Kencana',
    date: { en: 'Sep 2026', id: 'Sep 2026' },
    cause: 'children',
  },
  {
    title: { en: 'Asa Raya Baduy: Eksplor Bahagia', id: 'Asa Raya Baduy: Eksplor Bahagia' },
    org: 'Kita Bahagia',
    date: { en: 'Aug 2026', id: 'Agu 2026' },
    cause: 'arts',
  },
  {
    title: { en: 'Rumah Yatim Rawasari 2: Lace Ribbons, Tiny Happiness', id: 'Rumah Yatim Rawasari 2: Lace Ribbons, Tiny Happiness' },
    org: 'pulangkesinii',
    date: { en: 'Aug 2026', id: 'Agu 2026' },
    cause: 'children',
  },
  {
    title: {
      en: 'Jelajah Nusantara: Merayakan Hari Anak Bersama Adik-Adik Panti Asuhan di TMII',
      id: 'Jelajah Nusantara: Merayakan Hari Anak Bersama Adik-Adik Panti Asuhan di TMII',
    },
    org: 'Kita Bahagia',
    date: { en: 'Jul 2026', id: 'Jul 2026' },
    cause: 'children',
  },
  {
    title: { en: 'H.O.P.E Project with Indonesia Care for Cancer Kids Foundation', id: 'H.O.P.E Project bersama Indonesia Care for Cancer Kids Foundation' },
    org: 'Path Society Indonesia',
    date: { en: 'Jun 2026', id: 'Jun 2026' },
    cause: 'health',
  },
  {
    title: { en: 'Potluck Warga #16: Pancasila Celebration', id: 'Potluck Warga #16: Pancasila Celebration' },
    org: 'SoCo Giving',
    date: { en: 'May – Jun 2026', id: 'Mei – Jun 2026' },
    cause: 'social',
  },
  {
    title: { en: 'Head of Media & Documentation · PENGMAS 2025', id: 'Ketua Divisi Media & Dokumentasi · PENGMAS 2025' },
    org: 'Oase.umb',
    date: { en: 'Aug 2025', id: 'Agu 2025' },
    cause: 'social',
    description: {
      en: 'Led the Media & Documentation division for a community service day at Panti Sosial Bina Grahita "Belaian Kasih", capturing a day of play and a session with a child psychologist.',
      id: 'Memimpin divisi Media & Dokumentasi pada pengabdian masyarakat di Panti Sosial Bina Grahita "Belaian Kasih", mendokumentasikan kegiatan bermain bersama dan sesi dengan psikolog anak.',
    },
    link: 'https://www.instagram.com/s/aGlnaGxpZ2h0OjE4MDUzMTM3NzE1MTYwMzIw/',
  },
  {
    title: { en: "MoRi Jakarta di Panti Yauma Asrama Yatim dan Dhu'afa", id: "MoRi Jakarta di Panti Yauma Asrama Yatim dan Dhu'afa" },
    org: 'Memori Negeri',
    date: { en: 'May 2025', id: 'Mei 2025' },
    cause: 'children',
  },
  {
    title: { en: 'Master of Ceremony · OASE Berbagi 2025', id: 'Master of Ceremony · OASE Berbagi 2025' },
    org: 'Oase.umb',
    date: { en: 'Mar 2025', id: 'Mar 2025' },
    cause: 'social',
    description: {
      en: 'Hosted OASE Berbagi 2025 during Ramadhan, where we raised donations for the children of Panti Asuhan Uswatun Hasanah and spent the evening learning, playing, and breaking fast together.',
      id: 'Menjadi MC OASE Berbagi 2025 di bulan Ramadhan. Kami menggalang donasi untuk anak-anak Panti Asuhan Uswatun Hasanah lalu belajar, bermain, dan berbuka puasa bersama.',
    },
    link: 'https://www.instagram.com/s/aGlnaGxpZ2h0OjE4MDgxOTA4NjA1ODA2NzY2/',
  },
  {
    title: { en: 'Treasurer · OASE Peduli Bencana', id: 'Bendahara · OASE Peduli Bencana' },
    org: 'Oase.umb',
    date: { en: 'Dec 2024', id: 'Des 2024' },
    cause: 'relief',
    description: {
      en: 'Helped coordinate online and offline fundraising for victims of a fire in Kemayoran, Central Jakarta, and delivered the aid directly to those affected.',
      id: 'Membantu mengoordinasikan penggalangan dana online dan offline untuk korban kebakaran di Kemayoran, Jakarta Pusat, dan menyalurkan bantuan langsung kepada warga terdampak.',
    },
    link: 'https://www.instagram.com/oase.umb/reel/DD5xe8ETQ0s/',
  },
  {
    title: { en: 'Media & Documentation · OASE Berbagi Ramadhan 2024', id: 'Media & Dokumentasi · OASE Berbagi Ramadhan 2024' },
    org: 'Oase.umb',
    date: { en: 'Apr 2024', id: 'Apr 2024' },
    cause: 'social',
    description: {
      en: 'Collected donations in person and online, then distributed food and takjil to people in need along the Joglo–Meruya route.',
      id: 'Mengumpulkan donasi secara langsung dan online, lalu membagikan makanan dan takjil kepada yang membutuhkan di sepanjang rute Joglo–Meruya.',
    },
    link: 'https://www.instagram.com/s/aGlnaGxpZ2h0OjE3ODYxNDY1MzkxMDk3MDk0/',
  },
];

/* ------------------------------------------------------------------ */
/* UI strings                                                          */
/* ------------------------------------------------------------------ */

export const highlights = {
  stats: {
    roles: { en: 'Roles & Programs', id: 'Peran & Program' },
    certs: { en: 'Certificates', id: 'Sertifikat' },
    awards: { en: 'Honors & Awards', id: 'Penghargaan' },
    ip: { en: 'Registered HKI', id: 'HKI Terdaftar' },
    volunteer: { en: 'Volunteer Activities', id: 'Kegiatan Sosial' },
  },
  ticker: {
    en: ['Business Development', 'Business Analyst', 'Founder', 'B2B Specialist', 'Digital Business Enthusiast'],
    id: ['Business Development', 'Business Analyst', 'Founder', 'B2B Specialist', 'Digital Business Enthusiast'],
  },
};

export const ui = {
  nav: {
    about: { en: 'About', id: 'Tentang' },
    projects: { en: 'Projects', id: 'Proyek' },
    experience: { en: 'Experience', id: 'Pengalaman' },
    skills: { en: 'Skills', id: 'Keahlian' },
    recognition: { en: 'Recognition', id: 'Penghargaan' },
    volunteering: { en: 'Community', id: 'Komunitas' },
    contact: { en: 'Contact', id: 'Kontak' },
  },
  projects: {
    title: { en: 'Projects', id: 'Proyek' },
    subtitle: {
      en: "Things I've launched, and things I'm still shaping",
      id: 'Yang sudah saya rilis, dan yang masih saya kembangkan',
    },
    role: { en: 'Role', id: 'Peran' },
    visit: { en: 'Visit', id: 'Kunjungi' },
    previewSoon: { en: 'Preview coming soon', id: 'Preview segera hadir' },
    sneakPeek: { en: 'sneak peek 👀', id: 'sneak peek 👀' },
    previewAlt: { en: 'LinTas app screen', id: 'Tampilan aplikasi LinTas' },
    tapNext: { en: 'tap', id: 'ketuk' },
    meetMascot: { en: 'Meet Boteen: tap a pose', id: 'Kenalan sama Boteen: pilih gayanya' },
    dragMe: { en: 'drag me!', id: 'geser aku!' },
  },
  experience: {
    title: { en: 'Experience', id: 'Pengalaman' },
    subtitle: {
      en: 'Business development and analysis across social tech, edu tech, and community-based ventures',
      id: 'Business development dan analisis di ranah social tech, edu tech, dan bisnis berbasis komunitas',
    },
    all: { en: 'All', id: 'Semua' },
    showAll: { en: 'Show all experience', id: 'Tampilkan semua pengalaman' },
    showLess: { en: 'Show less', id: 'Tampilkan lebih sedikit' },
    current: { en: 'Current', id: 'Saat ini' },
  },
  skills: {
    title: { en: 'Skills', id: 'Keahlian' },
    hint: { en: 'Drag the dome to spin it', id: 'Geser kubahnya untuk memutar' },
  },
  certs: {
    title: { en: 'Certifications', id: 'Sertifikasi' },
    subtitle: {
      en: '{count} certificates since 2023, because there is always something new to learn',
      id: '{count} sertifikat sejak 2023, karena selalu ada hal baru untuk dipelajari',
    },
    all: { en: 'All', id: 'Semua' },
    categories: {
      data: { en: 'Data & BI', id: 'Data & BI' },
      ai: { en: 'AI & Cloud', id: 'AI & Cloud' },
      mobile: { en: 'Software & Mobile', id: 'Software & Mobile' },
      business: { en: 'Business & Marketing', id: 'Bisnis & Marketing' },
    },
    issued: { en: 'Issued', id: 'Terbit' },
    expires: { en: 'Expires', id: 'Berlaku sampai' },
    showAll: { en: 'Show all certificates', id: 'Tampilkan semua sertifikat' },
    showLess: { en: 'Show less', id: 'Tampilkan lebih sedikit' },
  },
  recognition: {
    title: { en: 'Recognition', id: 'Penghargaan & Karya' },
    awards: { en: 'Honors & Awards', id: 'Penghargaan' },
    ip: { en: 'Intellectual Property (HKI)', id: 'Hak Kekayaan Intelektual (HKI)' },
    publications: { en: 'Publications', id: 'Publikasi' },
    ipBadge: { en: 'HKI', id: 'HKI' },
    ipCount: { en: '{n} works protected', id: '{n} karya terlindungi' },
    issued: { en: 'Issued', id: 'Terbit' },
    sintaNote: { en: 'Accredited by the Indonesian Ministry of Education (Kemendikbudristek)', id: 'Terakreditasi Kemendikbudristek' },
    pubCount2: { en: 'SINTA-accredited journals', id: 'jurnal terakreditasi SINTA' },
    pubCount: { en: '{n} published works', id: '{n} karya terbit' },
    viewIp: { en: 'View on DJKI', id: 'Lihat di DJKI' },
    readPub: { en: 'Read publication', id: 'Baca publikasi' },
  },
  volunteering: {
    title: { en: 'Community & Volunteering', id: 'Komunitas & Volunteering' },
    subtitle: {
      en: 'Where I spend my weekends: with kids, communities, and good causes',
      id: 'Tempat saya menghabiskan akhir pekan: bersama anak-anak, komunitas, dan kegiatan baik',
    },
    showAll: { en: 'Show all activities', id: 'Tampilkan semua kegiatan' },
    showLess: { en: 'Show less', id: 'Tampilkan lebih sedikit' },
    seeMore: { en: 'See on Instagram', id: 'Lihat di Instagram' },
  },
  contact: {
    title: { en: "Let's Connect!", id: 'Mari Terhubung!' },
    subtitle: {
      en: 'Open to Business Analyst, Business Intelligence, and Business Development opportunities.',
      id: 'Terbuka untuk peluang Business Analyst, Business Intelligence, dan Business Development.',
    },
    email: { en: 'Email', id: 'Email' },
    sendEmail: { en: 'Send Email', id: 'Kirim Email' },
    connect: { en: 'Connect', id: 'Terhubung' },
    follow: { en: 'Follow', id: 'Ikuti' },
    back: { en: 'Back to Home', id: 'Kembali ke Beranda' },
  },
  footer: {
    madeWith: { en: 'Made with', id: 'Dibuat dengan' },
    rights: { en: 'All rights reserved.', id: 'Hak cipta dilindungi.' },
    backToTop: { en: 'back to top', id: 'kembali ke atas' },
  },
};
