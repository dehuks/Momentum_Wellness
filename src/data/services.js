import {
  FiHome,
  FiUsers,
  FiBriefcase,
  FiHeart,
  FiZap,
  FiUserCheck,
  FiShield
} from 'react-icons/fi';
import homeDetoxImg from '../assets/services/home-detox.jpg?format=webp';
import inpatientRehabImg from '../assets/services/inpatient-rehab.jpg?format=webp';
import counselingImg from '../assets/services/counseling.jpg?format=webp';
import occupationalTherapyImg from '../assets/services/occupational-therapy.jpg?format=webp';
import wellnessProgramsImg from '../assets/services/wellness-programs.jpg?format=webp';
import neuropsychAssessmentImg from '../assets/services/neuropsych-assessment.jpg?format=webp';
import csrHandshakeImg from '../assets/services/csr-handshake.jpg?format=webp';

export const services = [
  {
    key: 'service-corporate-wellness',
    icon: FiUserCheck,
    image: csrHandshakeImg,
    title: "Corporate Wellness & CSR",
    description: "Strategic wellness solutions aligning employee health with Corporate Social Responsibility goals.",
    details: "Our programs go beyond basic compliance, fostering a culture of holistic well-being. Services include CSR-aligned mental health initiatives, executive coaching, stress management workshops, and comprehensive Employee Assistance Programs (EAPs) that drive productivity and social impact."
  },
  {
    key: 'service-home-detox',
    icon: FiShield,
    image: homeDetoxImg,
    title: "Home-Based Detox Program",
    description: "Discreet, medically-supervised detoxification in the comfort and privacy of your home.",
    details: "A premium service offering 24/7 professional support, medical monitoring, and a personalized recovery plan. Designed for individuals requiring absolute privacy and convenience while managing withdrawal safely.",
    highlight: true
  },
  {
    key: 'service-inpatient-rehab',
    icon: FiHome,
    image: inpatientRehabImg,
    title: "Inpatient Rehabilitation",
    description: "Comprehensive residential treatment for severe mental health conditions in a supportive environment.",
    details: "Our inpatient program provides 24/7 care with a multidisciplinary team including psychiatrists, psychologists, nurses, and therapists. Patients receive personalized treatment plans, medication management, group therapy, and life skills training."
  },
  {
    key: 'service-counseling',
    icon: FiUsers,
    image: counselingImg,
    title: "Psychological Counseling",
    description: "Individual and group therapy sessions to address emotional and behavioral challenges.",
    details: "We offer evidence-based therapies including CBT, DBT, and trauma-focused therapy. Our counselors specialize in depression, anxiety, PTSD, relationship issues, and more. Both in-person and telehealth options available."
  },
  {
    key: 'service-occupational-therapy',
    icon: FiBriefcase,
    image: occupationalTherapyImg,
    title: "Occupational Therapy",
    description: "Therapy focused on improving daily living skills and functional abilities.",
    details: "Our occupational therapists help clients develop or regain skills needed for daily living and work. This includes cognitive rehabilitation, stress management techniques, and adaptive strategies for mental health challenges."
  },
  {
    key: 'service-wellness-programs',
    icon: FiHeart,
    image: wellnessProgramsImg,
    title: "Wellness Programs",
    description: "Holistic approaches to enhance overall mental and physical well-being.",
    details: "Our wellness programs include mindfulness meditation, yoga therapy, nutrition counseling, art therapy, and stress reduction workshops. Designed to promote resilience and prevent burnout."
  },
  {
    key: 'service-neuropsych-assessment',
    icon: FiZap,
    image: neuropsychAssessmentImg,
    title: "Neuropsychological Assessments",
    description: "Evaluations to assess cognitive functions and identify neurological issues.",
    details: "Comprehensive assessments for memory, attention, executive functioning, and more. Used to diagnose conditions like ADHD, dementia, traumatic brain injuries, and learning disabilities."
  }
];

export const getServiceByKey = (key) => services.find((s) => s.key === key);
