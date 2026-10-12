// MIDAS-2025 Conference Data Store
// 1st International Conference on Machine Intelligence and Data Science
// Centurion University of Technology and Management (CUTM), Paralakhemundi, Odisha

export const conferenceInfo = {
  title: "1st International Conference on Machine Intelligence and Data Science",
  acronym: "MIDAS-2025",
  dates: "March 21 – 22, 2025",
  targetDate: "2025-03-21T09:00:00",
  mode: "Hybrid Mode (In-Person & Online Virtual)",
  venue: "School of Engineering and Technology, Centurion University of Technology and Management",
  location: "Paralakhemundi, Gajapati District, Odisha - 761211, India",
  publisher: "Springer Communications in Computer and Information Science (CCIS)",
  proceedingsLink: "https://link.springer.com/book/10.1007/978-3-032-35516-4",
  submissionLink: "https://cmt3.research.microsoft.com/MIDAS2024",
  registrationFormLink: "https://forms.gle/My7XGRQESgVEB4L39",
  sponsorFormLink: "https://forms.gle/vJ7BHaKk5nyEnE37A",
  templatesLink: "https://drive.google.com/drive/folders/1oNJQRIflGwu1LVNeXk6BYNHTn_h1au2A?usp=sharing",
  contacts: [
    { name: "Prof. (Dr.) Ashok Misra", role: "Convener", phone: "+91 9937563329", email: "midas2024@cutm.ac.in" },
    { name: "Dr. Abhishek Das", role: "Program Chair", phone: "+91 7008809932", email: "midas2024@cutm.ac.in" }
  ]
};

export const importantDates = [
  { event: "Full Paper Submission Deadline", date: "January 15, 2025", status: "Closed", highlight: false },
  { event: "Notification of Acceptance", date: "February 15, 2025", status: "Completed", highlight: false },
  { event: "Camera-Ready Paper Due", date: "March 01, 2025", status: "Upcoming", highlight: false },
  { event: "Early-Bird Registration Deadline", date: "March 05, 2025", status: "Active", highlight: true },
  { event: "Conference Inauguration & Day 1", date: "March 21, 2025", status: "Confirmed", highlight: true },
  { event: "Technical Sessions & Day 2", date: "March 22, 2025", status: "Confirmed", highlight: true }
];

export const tracks = [
  {
    id: "ml-dl",
    title: "Machine Learning & Deep Learning",
    description: "Deep neural networks, transfer learning, federated learning, and predictive computational modeling.",
    topics: ["Deep Learning Architectures", "Transfer & Meta Learning", "Reinforcement Learning", "Self-Supervised Representation", "Explainable AI (XAI)"]
  },
  {
    id: "data-mining",
    title: "Big Data & Data Mining",
    description: "Large scale data management, streaming analytics, warehousing, and spatial-temporal data systems.",
    topics: ["Big Data Analytics & Pipelines", "Data Warehousing & OLAP", "Stream Processing Algorithms", "High-Dimensional Data Mining", "Data Quality & Cleaning"]
  },
  {
    id: "security-privacy",
    title: "Data Security & Privacy",
    description: "Trustworthy intelligent computing, differential privacy, blockchain-backed databases, and cryptographic safety.",
    topics: ["Privacy Preserving Data Mining", "Differential Privacy in ML", "Adversarial Machine Learning", "Blockchain & Distributed Ledgers", "Cloud Data Encryption"]
  },
  {
    id: "ai-systems",
    title: "Intelligent Systems & Applications",
    description: "Healthcare informatics, IoT analytics, smart agriculture, computer vision, and NLP in practical systems.",
    topics: ["Healthcare & Biomedical Informatics", "Intelligent IoT Sensor Networks", "Smart Agriculture & AgTech", "Natural Language Processing", "Robotics & Cognitive Systems"]
  }
];

export const keynoteSpeakers = [
  {
    id: "vincenzo-piuri",
    name: "Prof. (Dr.) Vincenzo Piuri",
    designation: "Full Professor in Computer Engineering",
    affiliation: "University of Milan, Italy",
    role: "IEEE Fellow, ACM Distinguished Scientist, IEEE Region 8 Past Director",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    talkTime: "March 21, 2025 (Friday) • 12:30 PM – 1:30 PM",
    bio: "Vincenzo Piuri received his Ph.D. in computer engineering at Polytechnic of Milan, Italy (1989). He is Full Professor in computer engineering at the University of Milan, Italy (since 2000). He has been Associate Professor at Polytechnic of Milan, Italy and Visiting Professor at the University of Texas at Austin, USA. His research covers AI, computational intelligence, biometrics, intelligent measurement systems, fault tolerance, and IoT. He has published 400+ papers, is Fellow of IEEE and served as IEEE Vice President for Technical Activities."
  },
  {
    id: "celestine-iwendi",
    name: "Prof. (Dr.) Celestine Iwendi",
    designation: "Professor of Artificial Intelligence & Head of CIoTh",
    affiliation: "University of Bolton, United Kingdom",
    role: "SMIEEE, FHEA, FIMC, World Top 2% Influential Scientist (Elsevier)",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    talkTime: "March 22, 2025 (Saturday) • 12:00 PM – 1:00 PM",
    bio: "Professor Celestine Iwendi is an IEEE Brand Ambassador, Professor of Artificial Intelligence and Head of the Centre of Intelligence of Things (CIoTh) at the University of Bolton. With over 25 years of technical expertise in wireless sensor networks, AI, ML, and IoT, he was featured in Elsevier's World's Top 2% Influential Scientists list for four consecutive years. His research spans 13 of the 17 UN SDGs with over 90% international co-authorship."
  },
  {
    id: "swagatam-das",
    name: "Prof. (Dr.) Swagatam Das",
    designation: "Professor-in-Charge, Computer and Communication Sciences",
    affiliation: "Indian Statistical Institute (ISI), Kolkata, India",
    role: "Founding Co-Editor-in-Chief of Swarm and Evolutionary Computation (Elsevier)",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    talkTime: "March 21, 2025 (Friday) • 11:00 AM – 12:00 PM",
    bio: "Professor Swagatam Das is Professor at the Electronics and Communication Sciences Unit and Professor-in-Charge of the Computer and Communication Sciences Division at ISI Kolkata. His research interests encompass deep learning and non-convex optimization, with 400+ research papers and over 33,000 Google Scholar citations (H-index 87). Dr. Das is an ACM Distinguished Speaker and recipient of the Young Engineer Award from INAE."
  },
  {
    id: "mihir-narayan-mohanty",
    name: "Prof. (Dr.) Mihir Narayan Mohanty",
    designation: "Professor, Electronics & Communication Engineering",
    affiliation: "ITER, Siksha ‘O’ Anusandhan (Deemed University), Bhubaneswar, India",
    role: "IEEE Senior Member, Fellow of IETE & IE(I)",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80",
    talkTime: "March 22, 2025 (Saturday) • 10:30 AM – 11:30 AM",
    bio: "Dr. Mihir Narayan Mohanty is Professor in the Department of Electronics and Communication Engineering at ITER, SOA Bhubaneswar. He holds a Ph.D. in Applied Signal Processing and has published over 440 papers in international journals and conferences with 27+ years of academic and research experience in Machine Learning, Deep Learning, Applied Signal, and Biomedical Signal Processing."
  }
];

export const committeeData = {
  patrons: [
    { name: "Prof. (Dr.) Mukti Kanta Mishra", role: "Chief Patron", designation: "President, CUTM, Odisha & AP, India" },
    { name: "Prof. D. Narsimha Rao", role: "Chief Patron", designation: "Vice President, CUTM, Odisha & AP, India" },
    { name: "Prof. (Dr.) Supriya Pattanayak", role: "Patron", designation: "Vice-Chancellor, CUTM, Odisha, India" }
  ],
  generalChairs: [
    { name: "Prof. (Dr.) Anita Patra", role: "General Chair", designation: "Registrar, CUTM, Odisha, India" }
  ],
  organizingChairs: [
    { name: "Dr. Prafulla Kumar Panda", role: "Organizing Chair", designation: "Centurion University of Technology & Management, Odisha" },
    { name: "Dr. Ashish Ranjan Dash", role: "Organizing Chair", designation: "Centurion University of Technology & Management, Odisha" },
    { name: "Prof. (Dr.) Sujata Chakravarty", role: "Organizing Chair", designation: "Centurion University of Technology & Management, Odisha" }
  ],
  programChairs: [
    { name: "Dr. Abhishek Das", role: "Program Chair", designation: "Centurion University of Technology & Management, Odisha" },
    { name: "Prof. (Dr.) Mihir Narayan Mohanty", role: "Program Chair", designation: "ITER, Siksha 'O' Anusandhan, Bhubaneswar, India" },
    { name: "Prof. (Dr.) Swagatam Das", role: "Program Chair", designation: "Indian Statistical Institute (ISI), Kolkata, India" },
    { name: "Prof. (Dr.) Masoud Mohammadian", role: "Program Chair", designation: "University of Canberra, Australia" },
    { name: "Prof. (Dr.) Vaclav Snasel", role: "Program Chair", designation: "VSB – Technical University of Ostrava, Czech Republic" },
    { name: "Prof. (Dr.) Celestine Iwendi", role: "Program Chair", designation: "University of Bolton, United Kingdom" },
    { name: "Prof. (Dr.) Vincenzo Piuri", role: "Program Chair", designation: "University of Milan, Italy" }
  ],
  conveners: [
    { name: "Prof. (Dr.) Ashok Misra", role: "Convener", designation: "Centurion University of Technology & Management, Odisha" },
    { name: "Prof. (Dr.) Sangram Keshari Swain", role: "Co-Convener", designation: "Centurion University of Technology & Management, Odisha" },
    { name: "Prof. Debendra Maharana", role: "Co-Convener", designation: "Centurion University of Technology & Management, Odisha" },
    { name: "Dr. Dhawaleswar Rao CH", role: "Co-Convener", designation: "Centurion University of Technology & Management, Odisha" }
  ],
  advisoryCommittee: [
    { name: "Prof. Ahmed Khader Habboush", role: "International Advisory", designation: "Jerash University, Jerash, Jordan" },
    { name: "Prof. Gyoo-Soo Chae", role: "International Advisory", designation: "Baekseok University, South Korea" },
    { name: "Prof. S. R. Niranjana", role: "National Advisory", designation: "Former Vice-Chancellor, Gulbarga University, India" },
    { name: "Prof. Ganapati Panda", role: "National Advisory", designation: "Former Deputy Director, IIT Bhubaneswar, India" },
    { name: "Prof. Bhabani P. Sinha", role: "National Advisory", designation: "Former Professor, ISI Kolkata, India" }
  ]
};

export const sponsorTiers = [
  {
    tier: "Platinum Sponsor",
    amount: "INR 5,00,000",
    badgeColor: "bg-blue-600 text-white",
    features: [
      "10 Complimentary delegate passes",
      "40 minutes dedicated presentation slot in main hall",
      "Acknowledgement during Awards & Valedictory Function",
      "2 Complimentary exhibition booths at Prime Location",
      "Prominent display of corporate logo on all printed media, stage backdrop and portal",
      "Company promotional brochure placed in every official Delegate Registration Kit"
    ]
  },
  {
    tier: "Gold Sponsor",
    amount: "INR 3,00,000",
    badgeColor: "bg-amber-500 text-white",
    features: [
      "8 Complimentary delegate passes",
      "30-minute presentation slot during conference tracks",
      "Acknowledgement during Valedictory Function",
      "1 Complimentary exhibition booth at conference venue",
      "Prominent display of corporate logo on backdrops and website",
      "Company brochure in delegate registration kits"
    ]
  },
  {
    tier: "Silver Sponsor",
    amount: "INR 2,00,000",
    badgeColor: "bg-slate-400 text-white",
    features: [
      "5 Complimentary delegate passes",
      "20 minutes presentation slot",
      "1 Complimentary exhibition booth",
      "Display of corporate logo on banners, program guide, and conference portal",
      "Permission to include company flyers in registration kits"
    ]
  },
  {
    tier: "Bronze Sponsor",
    amount: "INR 1,00,000",
    badgeColor: "bg-orange-600 text-white",
    features: [
      "2 Complimentary delegate passes",
      "10 minutes pre-recorded video slot in breakaway sessions",
      "1 Complimentary exhibit booth",
      "Corporate logo visibility on print and web media"
    ]
  }
];

export const placesToVisit = [
  {
    name: "Gajapati Palace",
    distance: "8.8 KM from Conference Venue",
    description: "Architectural masterpiece built by Maharaja Krushna Chandra Gajapati Narayan Deo, blending British colonial and Odishan heritage. Historical birthplace of separate Odisha state movement.",
    image: "/images/gajapati_palace.jpg",
    mapQuery: "Gajapati+Palace+Paralakhemundi"
  },
  {
    name: "Gandahati Waterfall",
    distance: "19.6 KM from Conference Venue",
    description: "Scenic perennial waterfall cascading year-round amidst dense green canopy in Gajapati district. Famous for its sparkling spray and tranquil picnic surroundings.",
    image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80",
    mapQuery: "Gandahati+Waterfall"
  },
  {
    name: "Mahendragiri Peak",
    distance: "46.2 KM from Conference Venue",
    description: "Revered biodiversity hotspot in the Eastern Ghats rising 1,501 meters above sea level. Rich in mythological heritage, ancient stone temples, and panoramic cloud-capped vistas.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    mapQuery: "Mahendragiri+Odisha"
  },
  {
    name: "Padmasambhava Mahavihara Monastery",
    distance: "73 KM from Conference Venue",
    description: "The largest Buddhist Monastery in South Asia located at Chandragiri, Mohana. Inhabited by around 200 resident monks with serene Tibetan Buddhist murals and prayer halls.",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    mapQuery: "Padmasambhava+Mahavihara+Monastery+Jirang"
  },
  {
    name: "Taptapani Hot Springs",
    distance: "77.9 KM from Conference Venue",
    description: "Renowned natural hot sulfur water spring attributed with medicinal wellness properties, located on the forested hill slopes of the Eastern Ghats.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    mapQuery: "Taptapani+Odisha"
  },
  {
    name: "Historic Paralakhemundi Town",
    distance: "Dist. Headquarters (Venue Vicinity)",
    description: "One of the oldest municipalities in Odisha established in 1885, renowned for classical Odia poetry, handlooms, century-old temples, and the scenic River Mahendra Tanaya.",
    image: "/images/campus.jpg",
    mapQuery: "Paralakhemundi"
  }
];

export const programSchedule = {
  day1: [
    { time: "08:30 AM – 09:30 AM", title: "Registration & Welcome Reception", speaker: "Registration Desk, SET Foyer", type: "General" },
    { time: "09:30 AM – 10:45 AM", title: "Inaugural Ceremony & Presidential Address", speaker: "Dignitaries, Vice Chancellor CUTM & Patrons", type: "Ceremony" },
    { time: "10:45 AM – 11:00 AM", title: "High Tea & Networking Break", speaker: "Executive Lounge", type: "Break" },
    { time: "11:00 AM – 12:00 PM", title: "Keynote 1: Deep Learning & Non-Convex Optimization", speaker: "Prof. (Dr.) Swagatam Das (ISI Kolkata)", type: "Keynote" },
    { time: "12:30 PM – 01:30 PM", title: "Keynote 2: Computational Intelligence in IoT & Systems", speaker: "Prof. (Dr.) Vincenzo Piuri (Univ. of Milan, Italy)", type: "Keynote" },
    { time: "01:30 PM – 02:30 PM", title: "Networking Working Lunch", speaker: "Centurion University Dining Pavilion", type: "Break" },
    { time: "02:30 PM – 05:00 PM", title: "Technical Track 1 & 2 Paper Presentations (Parallel Sessions)", speaker: "Track Chairs & Authors (Auditorium A & B)", type: "Technical" },
    { time: "05:00 PM – 05:30 PM", title: "Evening Tea & Poster Session", speaker: "Exhibition Hall", type: "Technical" }
  ],
  day2: [
    { time: "09:00 AM – 10:30 AM", title: "Technical Track 3: Security, Privacy & Cloud Systems", speaker: "Session Chairs & Presenters", type: "Technical" },
    { time: "10:30 AM – 11:30 AM", title: "Keynote 3: Signal Analytics & Expert Systems", speaker: "Prof. (Dr.) Mihir Narayan Mohanty (ITER, SOA)", type: "Keynote" },
    { time: "11:30 AM – 11:45 AM", title: "Tea Break", speaker: "Foyer", type: "Break" },
    { time: "12:00 PM – 01:00 PM", title: "Keynote 4: AI & Machine Intelligence of Things for UN SDGs", speaker: "Prof. (Dr.) Celestine Iwendi (Univ. of Bolton, UK)", type: "Keynote" },
    { time: "01:00 PM – 02:00 PM", title: "Working Lunch", speaker: "Dining Pavilion", type: "Break" },
    { time: "02:00 PM – 04:00 PM", title: "Technical Track 4: Cognitive Computing & Emerging Applications", speaker: "Session Chairs & Authors", type: "Technical" },
    { time: "04:15 PM – 05:30 PM", title: "Valedictory Ceremony, Best Paper Awards & Closing", speaker: "General Chairs & Program Committee", type: "Ceremony" }
  ]
};

export const registrationFees = [
  { category: "Indian Academicians / Faculty", inr: "₹ 7,000", usd: "$ 150", includes: "Kit, Lunch, Tea, Certificate, Proceeding" },
  { category: "Indian Research Scholars / Students", inr: "₹ 5,000", usd: "$ 100", includes: "Kit, Lunch, Tea, Certificate, Proceeding" },
  { category: "Industry Delegates", inr: "₹ 9,000", usd: "$ 200", includes: "Kit, Lunch, Tea, Certificate, Proceeding" },
  { category: "Foreign / International Authors", inr: "₹ 15,000", usd: "$ 250", includes: "Kit, Lunch, Tea, Certificate, Proceeding" },
  { category: "Attendee / Co-Author (Non-presenting)", inr: "₹ 2,500", usd: "$ 50", includes: "Conference Pass, Lunch, High Tea, Kit" }
];

export const galleryImages = [
  { title: "Centurion University Parlakhemundi Campus", category: "Campus", src: "/images/campus.jpg" },
  { title: "MIDAS-2025 Keynote Symposium & Tech Sessions", category: "Conference", src: "/images/hero.jpg" },
  { title: "Gajapati Palace Heritage Site", category: "Tourism", src: "/images/gajapati_palace.jpg" },
  { title: "Advanced Computing Laboratories & Research Wing", category: "Campus", src: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80" },
  { title: "Research Deliberations & Faculty Collaboration", category: "Conference", src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80" },
  { title: "Gandahati Natural Cascade & Forest Landscape", category: "Tourism", src: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80" }
];
