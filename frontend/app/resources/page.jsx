"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Book,
  Video,
  Headphones,
  Download,
  Filter,
  Search,
  ArrowRight,
  Heart,
  BookOpen,
  Clock,
  CheckCircle,
  ThumbsUp,
  Award,
  Bookmark,
  Share,
  PlayCircle,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Calendar,
  User,
  Coffee,
  CloudRain,
  Sun,
  Moon,
  Wind,
  ThumbsDown,
  Star,
  PenLine,
  MessageCircle,
  Smile,
  Frown,
  Meh,
  Brain,
  Sparkles,
  ChevronLeft,
  Info,
  Play,
  Pause,
  MessageSquare,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import Image from "next/image";

const ResourcesPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState("resources");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSubcategory, setActiveSubcategory] = useState("all");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [mood, setMood] = useState("neutral");
  const [showMoodRecommendations, setShowMoodRecommendations] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", content: "" });
  const [likedResources, setLikedResources] = useState([]);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [showThanks, setShowThanks] = useState(false);
  const [resourceNavigatorOpen, setResourceNavigatorOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const fallbackVideoUrl = "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";


  const getCategoryLabel = (category) => {
    const categoryLabels = {
      anxiety: "Anxiety",
      depression: "Depression",
      mindfulness: "Mindfulness",
      stress: "Stress Management",
      trauma: "Trauma",
      "self-care": "Self Care",
      therapy: "Therapy",
      "coping-skills": "Coping Skills",
      "mental-wellness": "Mental Wellness",
    };

    return (
      categoryLabels[category] ||
      category.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
    );
  };

  // Mock data - Resources
  const resourcesData = [
    // Articles
    {
      id: "a1",
      type: "article",
      category: "mental-health",
      subcategory: "anxiety",
      title: "Understanding Anxiety: Causes, Symptoms, and Coping Strategies",
      author: "Dr. Emily Chen",
      date: "2025-03-15",
      readTime: "7 min read",
      image:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1074&auto=format&fit=crop",
      excerpt:
        "Anxiety is more than just feeling stressed or worried. Learn about the different types of anxiety disorders, their symptoms, and effective strategies to manage them.",
      tags: ["anxiety", "mental health", "coping strategies"],
      recommended: ["stress", "anxiety", "overwhelmed"],
      content:
        "Anxiety is a normal and often healthy emotion. However, when a person regularly feels disproportionate levels of anxiety, it might become a medical disorder. Anxiety disorders form a category of mental health diagnoses that lead to excessive nervousness, fear, apprehension, and worry.\n\nThese disorders alter how a person processes emotions and behaves, also causing physical symptoms. Mild anxiety might be vague and unsettling, while severe anxiety may seriously affect day-to-day living.\n\n<h3>Common Symptoms of Anxiety</h3>\n<ul>\n<li>Feeling nervous, restless, or tense</li>\n<li>Having a sense of impending danger, panic, or doom</li>\n<li>Increased heart rate and breathing</li>\n<li>Sweating and trembling</li>\n<li>Feeling weak or tired</li>\n<li>Difficulty concentrating</li>\n<li>Sleep problems</li>\n</ul>\n\n<h3>Effective Coping Strategies</h3>\n<p>While anxiety can feel overwhelming, there are many proven techniques to manage symptoms:</p>\n<ol>\n<li><strong>Deep breathing exercises</strong> - Slow, deliberate breathing can activate your parasympathetic nervous system, which helps reduce the stress response.</li>\n<li><strong>Progressive muscle relaxation</strong> - Tensing and then releasing muscle groups throughout your body can reduce physical tension associated with anxiety.</li>\n<li><strong>Mindfulness meditation</strong> - Focusing on the present moment without judgment can help break cycles of worrying about the future.</li>\n<li><strong>Regular physical activity</strong> - Exercise releases endorphins that improve mood and reduce stress.</li>\n<li><strong>Limiting caffeine and alcohol</strong> - Both substances can worsen anxiety symptoms.</li>\n</ol>\n\n<p>If your anxiety is persistent and interferes with daily activities, it is important to speak with a mental health professional. Treatments like cognitive-behavioral therapy (CBT) and medication can be very effective for managing anxiety disorders.</p>",
      likes: 143,
      shares: 58,
    },
    {
      id: "a2",
      type: "article",
      category: "mental-health",
      subcategory: "depression",
      title: "Depression: Beyond Feeling Sad",
      author: "Dr. James Wilson",
      date: "2025-03-10",
      readTime: "9 min read",
      image:
        "https://images.unsplash.com/photo-1536766820879-059fec98ec0a?q=80&w=1287&auto=format&fit=crop",
      excerpt:
        "Depression affects millions of people worldwide. This article explains the science behind depression, common symptoms, and evidence-based treatment approaches.",
      tags: ["depression", "mental health", "treatment"],
      recommended: ["sad", "down", "hopeless"],
      content:
        "Depression is a common and serious medical illness that negatively affects how you feel, the way you think and how you act. Fortunately, it is also treatable. Depression causes feelings of sadness and/or a loss of interest in activities you once enjoyed. It can lead to a variety of emotional and physical problems and can decrease your ability to function at work and at home.\n\n<h3>Understanding Depression</h3>\n<p>Depression is more than just feeling sad or going through a rough patch. It's a serious mental health condition that requires understanding and medical care. Left untreated, depression can be devastating for those who have it and their families. Fortunately, with early detection, diagnosis and a treatment plan consisting of medication, psychotherapy and healthy lifestyle choices, many people can and do get better.</p>\n\n<h3>Common Symptoms</h3>\n<ul>\n<li>Persistent sad, anxious, or \"empty\" mood</li>\n<li>Loss of interest in activities once pleasurable</li>\n<li>Feelings of hopelessness or pessimism</li>\n<li>Decreased energy, fatigue</li>\n<li>Difficulty sleeping or oversleeping</li>\n<li>Appetite or weight changes</li>\n<li>Thoughts of death or suicide</li>\n</ul>\n\n<h3>The Science Behind Depression</h3>\n<p>Depression is believed to be caused by a combination of genetic, biological, environmental, and psychological factors. Research suggests that depression doesn't spring from simply having too much or too little of certain brain chemicals. Rather, there are many possible causes of depression, including faulty mood regulation by the brain, genetic vulnerability, stressful life events, medications, and medical problems.</p>\n\n<h3>Treatment Approaches</h3>\n<p>Depression is among the most treatable of mental disorders. Between 80% and 90% of people with depression eventually respond well to treatment. Almost all patients gain some relief from their symptoms.</p>\n\n<p>Effective treatments include:</p>\n<ol>\n<li><strong>Medication</strong> - Antidepressants work to normalize naturally occurring brain chemicals called neurotransmitters, notably serotonin and norepinephrine. Other antidepressants work on the neurotransmitter dopamine.</li>\n<li><strong>Psychotherapy</strong> - Particularly cognitive-behavioral therapy (CBT), which helps patients identify and change negative thought patterns.</li>\n<li><strong>Electroconvulsive Therapy (ECT)</strong> - For severe or treatment-resistant depression.</li>\n<li><strong>Lifestyle changes</strong> - Regular exercise, adequate sleep, and a healthy diet can help manage depression symptoms.</li>\n</ol>\n\n<p>If you are experiencing symptoms of depression, it's important to seek help from a healthcare provider. Remember, depression is treatable, and you don't have to face it alone.</p>",
      likes: 98,
      shares: 42,
    },
    {
      id: "a3",
      type: "article",
      category: "self-care",
      subcategory: "mindfulness",
      title: "The Science of Mindfulness: How Being Present Changes Your Brain",
      author: "Dr. Sarah Johnson",
      date: "2025-03-25",
      readTime: "6 min read",
      image:
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1022&auto=format&fit=crop",
      excerpt:
        "Discover how mindfulness practices physically change your brain structure and improve mental health, backed by the latest neuroscience research.",
      tags: ["mindfulness", "neuroscience", "brain health"],
      recommended: ["stressed", "anxious", "overwhelmed", "distracted"],
      content:
        "Mindfulness has been practiced for thousands of years in various religious and secular traditions. In recent decades, it has been studied extensively by neuroscientists, who have discovered that mindfulness meditation can actually change the physical structure of your brain in beneficial ways.\n\n<h3>What Exactly Is Mindfulness?</h3>\n<p>At its core, mindfulness is the practice of purposely focusing your attention on the present moment—and accepting it without judgment. It involves being fully aware of whatever is happening in the moment, without filtering or evaluating it. When you practice mindfulness, you tune into what you're sensing and feeling in the moment, without interpretation or judgment.</p>\n\n<h3>The Neuroscience of Mindfulness</h3>\n<p>Using advanced brain imaging techniques like fMRI (functional magnetic resonance imaging), scientists have been able to observe changes in brain activity and structure that occur with regular mindfulness practice. Here are some key findings:</p>\n\n<ul>\n<li><strong>Increased gray matter density</strong> in the hippocampus, an area important for learning and memory</li>\n<li><strong>Reduced activity in the amygdala</strong>, the brain's \"fight or flight\" center</li>\n<li><strong>Strengthened prefrontal cortex</strong>, associated with higher-order brain functions such as awareness, concentration, and decision-making</li>\n<li><strong>Changes in the default mode network</strong>, a brain network associated with mind-wandering and self-referential thoughts</li>\n</ul>\n\n<h3>Benefits for Mental Health</h3>\n<p>Research shows that mindfulness practices can:</p>\n<ul>\n<li>Reduce symptoms of anxiety and depression</li>\n<li>Improve focus and attention</li>\n<li>Enhance emotional regulation</li>\n<li>Reduce stress and its physical effects on the body</li>\n<li>Improve sleep quality</li>\n<li>Increase self-awareness and cognitive flexibility</li>\n</ul>\n\n<h3>Simple Mindfulness Practices to Try</h3>\n<ol>\n<li><strong>Mindful breathing</strong>: Focus your attention on your breath, noticing the sensation of air flowing in and out. When your mind wanders, gently bring your attention back to your breath.</li>\n<li><strong>Body scan meditation</strong>: Systematically focus your attention on different parts of your body, from your feet to the top of your head, being aware of sensations without judgment.</li>\n<li><strong>Mindful observation</strong>: Choose an object in your environment and focus on watching it for a few minutes. Notice its colors, texture, and shape without analyzing or judging it.</li>\n<li><strong>Mindful eating</strong>: Pay close attention to the taste, texture, and smell of your food. Notice the colors and feel the temperature. Chew slowly and savor each bite.</li>\n</ol>\n\n<p>Even just a few minutes of mindfulness practice each day can lead to measurable changes in your brain and improvements in your mental well-being. The key is consistency—making mindfulness a regular part of your routine.</p>",
      likes: 215,
      shares: 87,
    },
    {
      id: "a4",
      type: "article",
      category: "relationships",
      subcategory: "communication",
      title: "Healthy Communication: The Foundation of Strong Relationships",
      author: "Dr. Lisa Rodriguez",
      date: "2025-03-05",
      readTime: "8 min read",
      image:"https://img.freepik.com/free-photo/two-dark-skinned-male-female-administrative-managers-check-messages-cellular-keyboard-laptop-computer-check-information_273609-3233.jpg?t=st=1743928028~exp=1743931628~hmac=0ddd9b71b6cfa80e9497ae1e8be8b587c9a4048381f3ffbbb6d39e1924acbfb0&w=996",
      excerpt:
        "Learn effective communication techniques to build healthier relationships, resolve conflicts, and deepen your connections with others.",
      tags: ["relationships", "communication", "social health"],
      recommended: ["anxious", "lonely", "frustrated"],
      content:
        'Communication forms the foundation of all human relationships. Effective communication involves not just exchanging information, but also understanding the emotion behind the information. It includes listening, expressing yourself clearly, and being aware of your own and others\' non-verbal signals. Good communication requires practice and conscious effort, but the rewards in terms of relationship satisfaction are immense.\n\n<h3>The Elements of Effective Communication</h3>\n<ol>\n<li><strong>Active Listening</strong>: This means fully concentrating on what is being said rather than passively "hearing" the message. It involves giving your full attention to the speaker, avoiding interruptions, and reflecting back what you have heard to ensure understanding.</li>\n<li><strong>Clarity and Directness</strong>: Say what you mean and mean what you say. Avoid hints, mixed messages, or passive-aggressive behavior.</li>\n<li><strong>Emotional Awareness</strong>: Recognize and manage your own emotions during conversations. Be aware of how your emotional state may influence your communication style.</li>\n<li><strong>Empathy</strong>: Try to understand the other person\'s perspective, feelings, and needs, even if you disagree.</li>\n<li><strong>Non-verbal Communication</strong>: Pay attention to body language, facial expressions, and tone of voice—both your own and others.</li>\n</ol>\n\n<h3>Common Communication Pitfalls</h3>\n<ul>\n<li><strong>Criticism</strong>: Attacking someone character rather than addressing specific behaviors</li>\n<li><strong>Defensiveness</strong>: Responding to feedback with excuses or counter-attacks</li>\n<li><strong>Stonewalling</strong>: Withdrawing from the conversation or giving someone the "silent treatment"</li>\n<li><strong>Contempt</strong>: Expressing disgust or superiority through eye-rolling, sarcasm, or mockery</li>\n</ul>\n\n<h3>Techniques for Improving Communication</h3>\n<h4>1. "I" Statements</h4>\n<p>Instead of saying "You never listen to me," try "I feel unheard when I\'m interrupted." This reduces defensiveness and avoids blame.</p>\n\n<h4>2. Reflective Listening</h4>\n<p>Paraphrase what you\'ve heard to confirm understanding: "So what I\'m hearing is that you feel overwhelmed by your workload. Is that right?"</p>\n\n<h4>3. The 48-Hour Rule</h4>\n<p>For non-urgent issues that trigger strong emotions, give yourself 48 hours before responding. This allows you to process your feelings and respond rather than react.</p>\n\n<h4>4. Regular Check-ins</h4>\n<p>Schedule time to talk about your relationship, not just logistics or problems. Ask questions like "How are you feeling about us?" or "What\'s been on your mind lately?"</p>\n\n<h3>Communication in Conflict</h3>\n<p>Conflict is inevitable in any relationship. How you communicate during disagreements can either strengthen or damage your connection. Here are tips for healthy conflict communication:</p>\n<ul>\n<li>Focus on one issue at a time</li>\n<li>Avoid bringing up past grievances</li>\n<li>Take breaks if emotions become overwhelming</li>\n<li>Look for points of agreement and compromise</li>\n<li>Remember you\'re on the same team, not opponents</li>\n</ul>\n\n<p>With practice and patience, anyone can improve their communication skills. The effort you put into becoming a better communicator pays dividends in all your relationships—romantic, family, friendships, and professional.</p>',
      likes: 176,
      shares: 63,
    },
    {
      id: "a5",
      type: "article",
      category: "self-care",
      subcategory: "sleep",
      title: "Sleep and Mental Health: The Vital Connection",
      author: "Dr. Mark Thompson",
      date: "2025-03-20",
      readTime: "5 min read",
      image:
        "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=1160&auto=format&fit=crop",
      excerpt:
        "Discover why quality sleep is essential for mental health and learn practical strategies for improving your sleep habits.",
      tags: ["sleep", "mental health", "self-care"],
      recommended: ["tired", "anxious", "stressed", "irritable"],
      content:
        "Sleep is a biological necessity that profoundly affects our mental health and emotional wellbeing. During sleep, your brain processes emotional information and consolidates memories. Lack of quality sleep can impair thinking, regulate emotions, and cope with stress. Research has established strong connections between sleep quality and mental health conditions like depression, anxiety, and bipolar disorder.\n\n<h3>How Sleep Affects Mental Health</h3>\n<p>The relationship between sleep and mental health is bidirectional – mental health issues can disrupt sleep, and poor sleep can contribute to the development and worsening of mental health problems. Here's how sleep impacts key aspects of mental functioning:</p>\n\n<ul>\n<li><strong>Emotional regulation</strong>: Sleep deprivation amplifies negative emotional reactions and dampens positive ones</li>\n<li><strong>Stress hormone levels</strong>: Poor sleep increases cortisol production, contributing to anxiety and depression</li>\n<li><strong>Memory and cognition</strong>: Sleep consolidates learning and memory, with REM sleep particularly important for emotional memory processing</li>\n<li><strong>Decision making</strong>: Sleep loss impairs judgment and increases impulsivity</li>\n</ul>\n\n<h3>Sleep and Specific Mental Health Conditions</h3>\n\n<h4>Depression</h4>\n<p>Up to 90% of people with depression complain about sleep quality. Insomnia is often one of the first symptoms of depression and may persist even after other symptoms have responded to treatment.</p>\n\n<h4>Anxiety</h4>\n<p>Anxiety can cause racing thoughts that make falling asleep difficult. This creates a cycle where sleep deprivation worsens anxiety symptoms, making it even harder to sleep the next night.</p>\n\n<h4>Bipolar Disorder</h4>\n<p>Sleep disturbances are core features of both manic and depressive episodes. During mania, people may feel little need for sleep, while depressive episodes often involve insomnia or hypersomnia (excessive sleeping).</p>\n\n<h3>Sleep Hygiene: Evidence-Based Strategies</h3>\n<p>Improving your sleep habits can have significant benefits for your mental health. Here are research-backed strategies:</p>\n\n<ol>\n<li><strong>Maintain a consistent sleep schedule</strong>: Go to bed and wake up at the same time every day, including weekends</li>\n<li><strong>Create a restful environment</strong>: Keep your bedroom cool, dark, and quiet</li>\n<li><strong>Limit screen time before bed</strong>: The blue light from screens interferes with melatonin production</li>\n<li><strong>Develop a relaxing bedtime routine</strong>: Reading, gentle stretching, or meditation can signal to your body that it's time to sleep</li>\n<li><strong>Watch your diet</strong>: Avoid caffeine, large meals, and alcohol close to bedtime</li>\n<li><strong>Exercise regularly</strong>: Physical activity promotes better sleep, but try to finish workouts at least a few hours before bedtime</li>\n<li><strong>Manage worry</strong>: Try writing down concerns before bed to \"park\" them until morning</li>\n</ol>\n\n<h3>When to Seek Help</h3>\n<p>If you've tried improving your sleep habits but still struggle with sleep problems that affect your daytime functioning or mood, it's worth speaking with a healthcare professional. Effective treatments exist for sleep disorders, including:</p>\n\n<ul>\n<li>Cognitive-behavioral therapy for insomnia (CBT-I)</li>\n<li>Brief behavioral therapy for insomnia</li>\n<li>Relaxation training</li>\n<li>In some cases, medication</li>\n</ul>\n\n<p>Remember that prioritizing sleep is not a luxury—it's a fundamental aspect of mental health care that deserves attention and respect.</p>",
      likes: 127,
      shares: 51,
    },
    {
      id: "a6",
      type: "article",
      category: "self-care",
      subcategory: "gratitude",
      title: "The Transformative Power of Gratitude Practice",
      author: "Dr. Maya Peterson",
      date: "2025-04-01",
      readTime: "6 min read",
      image:
        "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=1170&auto=format&fit=crop",
      excerpt:
        "Learn how regular gratitude practice can significantly improve your mood, relationships, and overall mental wellbeing.",
      tags: ["gratitude", "positive psychology", "happiness"],
      recommended: ["sad", "hopeless", "unmotivated"],
      content:
        'Gratitude is the practice of noticing and appreciating the positive aspects of life—both big and small. While it might sound simple, research in positive psychology has shown that cultivating gratitude can have profound effects on mental health, emotional wellbeing, and even physical health.\n\n<h3>The Science Behind Gratitude</h3>\n<p>A growing body of research demonstrates that practicing gratitude can lead to measurable improvements in various aspects of life:</p>\n\n<ul>\n<li><strong>Mental Health Benefits</strong>: Studies show that gratitude practices can reduce symptoms of depression and anxiety while increasing feelings of happiness and life satisfaction</li>\n<li><strong>Neurological Effects</strong>: Gratitude activates regions in the brain associated with pleasure, social connection, and stress relief</li>\n<li><strong>Physical Health Impacts</strong>: Regular gratitude practice has been linked to better sleep, lower blood pressure, and stronger immune function</li>\n<li><strong>Relationship Improvements</strong>: Expressing gratitude strengthens social bonds and increases prosocial behavior</li>\n</ul>\n\n<h3>Simple Gratitude Practices to Try</h3>\n\n<h4>1. Gratitude Journaling</h4>\n<p>One of the most well-researched gratitude interventions is keeping a gratitude journal. Take a few minutes each day or several times a week to write down 3-5 things you\'re grateful for. These can be significant events or small pleasures—from a promotion at work to the taste of your morning coffee.</p>\n\n<h4>2. Gratitude Letter</h4>\n<p>Write a letter to someone who has positively impacted your life but whom you have never properly thanked. Be specific about what they did and how it affected you. You can choose to send the letter or simply write it as an exercise.</p>\n\n<h4>3. Gratitude Meditation</h4>\n<p>Set aside 5-10 minutes to sit quietly and reflect on what you are thankful for. Focus on the feeling of gratitude in your body as you bring to mind people, experiences, and things that enrich your life.</p>\n\n<h4>4. Three Good Things</h4>\n<p>Each night before bed, identify three good things that happened during the day and reflect on why they occurred. This practice helps train your brain to notice positive events more readily.</p>\n\n<h3>Overcoming Challenges to Gratitude</h3>\n<p>Developing a gratitude practice is not always easy, particularly during difficult times or for those struggling with mental health challenges. Here are some strategies for cultivating gratitude even when it is challenging:</p>\n\n<ul>\n<li><strong>Start small</strong>: Look for tiny moments of joy or comfort</li>\n<li><strong>Be specific</strong>: Instead of "I am grateful for my family," try "I am grateful that my sister called to check on me today"</li>\n<li><strong>Focus on the present</strong>: Find something to appreciate in the current moment</li>\n<li><strong>Acknowledge the full range of emotions</strong>: Gratitude does not mean ignoring difficulties—you can recognize challenges while still finding things to appreciate</li>\n</ul>\n\n<h3>Integrating Gratitude Into Daily Life</h3>\n<p>Beyond formal practices, look for ways to weave gratitude into your everyday routines:</p>\n\n<ul>\n<li>Express appreciation to others verbally or through small gestures</li>\n<li>Pause before meals to appreciate your food</li>\n<li>Take a moment during transitions (like commuting) to notice something positive</li>\n<li>Create physical reminders, like gratitude stones or apps with notifications</li>\n</ul>\n\n<p>Like any skill, gratitude becomes stronger with practice. Even when it feels forced at first, the research suggests that the act of looking for things to be grateful for gradually trains your brain to notice the positive more readily. Over time, gratitude can become less of a practice and more of a natural orientation toward life.</p>',
      likes: 194,
      shares: 78,
    },
    {
      id: "v1",
      type: "video",
      category: "mental-health",
      subcategory: "stress",
      title: "5-Minute Stress Relief Breathing Exercise",
      creator: "MindfulMovement",
      duration: "5:14",
      thumbnail:
        "https://img.freepik.com/free-photo/young-black-man-lying-dead-body-exercise_1163-4996.jpg?t=st=1743927946~exp=1743931546~hmac=42beecf28941442ecb4e869aff61581cece7db6d12e57ee7726ddd34303e8894&w=996",
      description:
        "A simple yet powerful breathing exercise you can do anywhere to quickly reduce stress and create a sense of calm.",
      tags: ["stress relief", "breathing", "quick exercise"],
      recommended: ["stressed", "anxious", "overwhelmed", "tense"],
      videoUrl: "../videos/vid1.mp4",
      transcript:
        "Welcome to this 5-minute stress relief breathing exercise. In this short practice, we will use a simple breathing technique that can help activate your body relaxation response, bringing you back to a state of calm and centeredness...",
      likes: 3872,
      views: 124582,
    },
    {
      id: "v2",
      type: "video",
      category: "meditation",
      subcategory: "guided",
      title: "15-Minute Guided Meditation for Beginners",
      creator: "Mindful Mind",
      duration: "15:28",
      thumbnail:"https://img.freepik.com/free-photo/african-american-yoga-teacher-practicing-outdoors_23-2148935442.jpg?t=st=1743927859~exp=1743931459~hmac=2f16cb7083ea21a4c762f4db14b78c07561fa3dd89b61d0cf1f2e4bda2d80041&w=826",
      description:
        "A perfect introduction to meditation for those new to the practice. Learn the basics of mindfulness in this gentle guided session.",
      tags: ["meditation", "mindfulness", "beginners"],
      recommended: ["anxious", "stressed", "overwhelmed", "restless"],
      videoUrl:
        "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
      transcript:
        "Welcome to this 15-minute guided meditation designed especially for beginners. If you've never meditated before, or if you're just getting started with your mindfulness practice, this session will guide you through the basics in a simple, accessible way...",
      likes: 5214,
      views: 178453,
    },
    {
      id: "v3",
      type: "video",
      category: "exercise",
      subcategory: "yoga",
      title: "20-Minute Gentle Yoga for Anxiety Relief",
      creator: "Yoga with Sarah",
      duration: "21:07",
      thumbnail:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1220&auto=format&fit=crop",
      description:
        "A gentle, accessible yoga practice designed specifically to help calm the nervous system and reduce feelings of anxiety.",
      tags: ["yoga", "anxiety relief", "gentle exercise"],
      recommended: ["anxious", "tense", "stressed", "restless"],
      videoUrl:
        "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
      transcript:
        "Welcome to this gentle yoga practice designed specifically for anxiety relief. Today's sequence focuses on poses and breathing techniques that help activate the parasympathetic nervous system—your body's natural relaxation response...",
      likes: 4183,
      views: 156729,
    },
    {
      id: "v4",
      type: "video",
      category: "mental-health",
      subcategory: "education",
      title: "Understanding the Science of Happiness",
      creator: "MindScience Academy",
      duration: "18:42",
      thumbnail:
        "https://img.freepik.com/free-photo/surprised-playful-touched-good-looking-african-american-woman-glasses-stylish-brown-t-shirt-clasping-hands-smiling-from-joy-excitement-liking-great-show_176420-23322.jpg?t=st=1743928094~exp=1743931694~hmac=375d5ed296c4ce108f82d1961cd18c71c875e2c29fbd01f265051bc0a5339243&w=996",
      description:
        "A fascinating look at the neuroscience behind happiness and practical ways to increase your happiness based on scientific research.",
      tags: ["happiness", "neuroscience", "positive psychology"],
      recommended: ["sad", "neutral", "unmotivated", "curious"],
      videoUrl:
        "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
      transcript:
        'Welcome to "Understanding the Science of Happiness." In this video, we\'ll explore what neuroscience and psychology research tell us about what makes humans happy, and more importantly, how you can apply these findings to increase your own wellbeing...',
      likes: 2983,
      views: 98742,
    },
    {
      id: "v5",
      type: "video",
      category: "relationships",
      subcategory: "communication",
      title: "How to Have Difficult Conversations",
      creator: "Communication Academy",
      duration: "12:36",
      thumbnail:
        "https://img.freepik.com/free-photo/talk-co-workers_1098-14399.jpg?t=st=1743928180~exp=1743931780~hmac=beba8e38958e38aa81c15f000a773f10da967eaf77390d3508fb6f2ce3d1a70c&w=996",
      description:
        "Learn practical techniques for navigating challenging conversations with confidence and compassion.",
      tags: ["communication", "relationships", "conflict resolution"],
      recommended: ["anxious", "frustrated", "avoidant"],
      videoUrl:
        "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
      transcript:
        "Welcome to this guide on how to have difficult conversations. We all face situations where we need to discuss sensitive topics, address problems, or navigate conflicts. In this video, I'll share research-based techniques that can help you approach these conversations in a way that builds understanding rather than creating more tension...",
      likes: 3546,
      views: 127835,
    },

    // Audio
    {
      id: "au1",
      type: "audio",
      category: "meditation",
      subcategory: "sleep",
      title: "Deep Sleep Meditation",
      creator: "Peaceful Minds",
      duration: "45:32",
      thumbnail:
        "https://img.freepik.com/free-photo/young-calm-woman-pajamas-sleeping-bed_171337-8146.jpg?t=st=1743928233~exp=1743931833~hmac=5e189bcc4298c8a3e4a4de0c4386a9206f3230214d561a1cefc7525f25751786&w=996",
      description:
        "Fall asleep faster and enjoy deeper, more restorative sleep with this guided meditation designed to calm your nervous system.",
      tags: ["sleep", "meditation", "relaxation"],
      recommended: ["anxious", "stressed", "tired", "restless"],
      audioUrl:
        "https://cdn.pixabay.com/download/audio/2022/01/18/audio_3edfed17c2.mp3?filename=ambient-piano-amp-strings-10711.mp3",
      transcript:
        "Welcome to this Deep Sleep Meditation. As you settle in, allow your body to find a comfortable position. You don't need to try to fall asleep—sleep will come naturally as you relax and let go...",
      likes: 4267,
      plays: 158932,
    },
    {
      id: "au2",
      type: "audio",
      category: "mental-health",
      subcategory: "anxiety",
      title: "Anxiety Relief Breathing Session",
      creator: "Calm Collective",
      duration: "10:15",
      thumbnail:
        "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=1170&auto=format&fit=crop",
      description:
        "A guided breathing exercise specifically designed to activate your body's relaxation response and reduce anxiety quickly.",
      tags: ["anxiety", "breathing", "relaxation"],
      recommended: ["anxious", "panicky", "stressed", "overwhelmed"],
      audioUrl:
        "https://cdn.pixabay.com/download/audio/2021/11/02/audio_84e73aacd8.mp3?filename=relaxing-mountains-rivers-music-7497.mp3",
      transcript:
        "Welcome to this Anxiety Relief Breathing Session. Wherever you are right now, take a moment to find a comfortable position. You can be sitting or lying down, whatever feels best for your body...",
      likes: 3892,
      plays: 142753,
    },
    {
      id: "au3",
      type: "audio",
      category: "meditation",
      subcategory: "focus",
      title: "Focus & Concentration Meditation",
      creator: "Mind Training",
      duration: "15:27",
      thumbnail:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1170&auto=format&fit=crop",
      description:
        "Improve your focus and concentration with this meditation designed to train your attention and reduce mental distractions.",
      tags: ["focus", "concentration", "productivity"],
      recommended: ["distracted", "overwhelmed", "scattered", "unfocused"],
      audioUrl:
        "https://cdn.pixabay.com/download/audio/2021/04/07/audio_8ac2624e4c.mp3?filename=floating-abstract-142819.mp3",
      transcript:
        "Welcome to this Focus and Concentration Meditation. In our distraction-filled world, the ability to direct and sustain attention is increasingly valuable. This practice will help you strengthen your mind's ability to stay present and focused...",
      likes: 2985,
      plays: 104268,
    },
    {
      id: "au4",
      type: "audio",
      category: "self-care",
      subcategory: "relaxation",
      title: "Progressive Muscle Relaxation Guide",
      creator: "Relaxation Experts",
      duration: "18:42",
      thumbnail:
        "https://images.unsplash.com/photo-1531354755998-195b9eca7061?q=80&w=1287&auto=format&fit=crop",
      description:
        "Learn to release physical tension throughout your body with this guided progressive muscle relaxation technique.",
      tags: ["relaxation", "stress relief", "body awareness"],
      recommended: ["tense", "stressed", "anxious", "sore"],
      audioUrl:
        "https://cdn.pixabay.com/download/audio/2022/03/09/audio_f4a06dbe0c.mp3?filename=peaceful-piano-and-strings-11254.mp3",
      transcript:
        "Welcome to this Progressive Muscle Relaxation guide. This practice works by systematically tensing and then releasing different muscle groups in your body. This helps you become more aware of physical tension and gives you a method to release it...",
      likes: 2156,
      plays: 87342,
    },
  ];

  // List of categories and subcategories
  const categories = [
    { id: "all", label: "All Resources" },
    {
      id: "mental-health",
      label: "Mental Health",
      subcategories: [
        { id: "all", label: "All Topics" },
        { id: "anxiety", label: "Anxiety" },
        { id: "depression", label: "Depression" },
        { id: "stress", label: "Stress Management" },
        { id: "education", label: "Education & Awareness" },
      ],
    },
    {
      id: "self-care",
      label: "Self-Care",
      subcategories: [
        { id: "all", label: "All Topics" },
        { id: "mindfulness", label: "Mindfulness" },
        { id: "sleep", label: "Sleep Hygiene" },
        { id: "nutrition", label: "Nutrition & Mental Health" },
        { id: "gratitude", label: "Gratitude Practice" },
      ],
    },
    {
      id: "meditation",
      label: "Meditation",
      subcategories: [
        { id: "all", label: "All Types" },
        { id: "guided", label: "Guided Meditation" },
        { id: "sleep", label: "Sleep Meditation" },
        { id: "focus", label: "Focus & Concentration" },
      ],
    },
    {
      id: "exercise",
      label: "Movement & Exercise",
      subcategories: [
        { id: "all", label: "All Activities" },
        { id: "yoga", label: "Yoga" },
        { id: "walking", label: "Walking Meditation" },
        { id: "stretching", label: "Stretching & Relaxation" },
      ],
    },
    {
      id: "relationships",
      label: "Relationships",
      subcategories: [
        { id: "all", label: "All Topics" },
        { id: "communication", label: "Communication Skills" },
        { id: "boundaries", label: "Setting Boundaries" },
        { id: "conflict", label: "Conflict Resolution" },
      ],
    },
  ];

  const resourceTypes = [
    { id: "article", label: "Articles", icon: <Book className="w-4 h-4" /> },
    { id: "video", label: "Videos", icon: <Video className="w-4 h-4" /> },
    {
      id: "audio",
      label: "Audio Guides",
      icon: <Headphones className="w-4 h-4" />,
    },
  ];

  // Quiz questions
  const quizQuestions = [
    {
      id: "q1",
      question: "How would you describe your mood lately?",
      options: [
        { id: "q1a", label: "Anxious or worried", value: "anxious" },
        { id: "q1b", label: "Sad or down", value: "sad" },
        { id: "q1c", label: "Stressed or overwhelmed", value: "stressed" },
        { id: "q1d", label: "Tired or low energy", value: "tired" },
        { id: "q1e", label: "Generally okay", value: "neutral" },
      ],
    },
    {
      id: "q2",
      question: "Which of these is most affecting your daily life?",
      options: [
        { id: "q2a", label: "Difficulty sleeping", value: "sleep" },
        { id: "q2b", label: "Racing thoughts", value: "anxiety" },
        { id: "q2c", label: "Low motivation", value: "depression" },
        { id: "q2d", label: "Relationship challenges", value: "relationships" },
        { id: "q2e", label: "Work or study stress", value: "stress" },
      ],
    },
    {
      id: "q3",
      question: "What type of support interests you most?",
      options: [
        {
          id: "q3a",
          label: "Learning about mental health",
          value: "education",
        },
        {
          id: "q3b",
          label: "Practical exercises and techniques",
          value: "practical",
        },
        {
          id: "q3c",
          label: "Relaxation and stress relief",
          value: "relaxation",
        },
        {
          id: "q3d",
          label: "Support for specific challenges",
          value: "specific",
        },
        {
          id: "q3e",
          label: "Building daily mental health habits",
          value: "habits",
        },
      ],
    },
    {
      id: "q4",
      question: "How do you prefer to engage with content?",
      options: [
        { id: "q4a", label: "Reading articles", value: "article" },
        { id: "q4b", label: "Watching videos", value: "video" },
        { id: "q4c", label: "Listening to audio", value: "audio" },
        { id: "q4d", label: "Interactive exercises", value: "interactive" },
        { id: "q4e", label: "A mix of different formats", value: "mixed" },
      ],
    },
    {
      id: "q5",
      question: "How much time can you commit to mental wellbeing activities?",
      options: [
        {
          id: "q5a",
          label: "Just a few minutes when needed",
          value: "minimal",
        },
        { id: "q5b", label: "5-10 minutes daily", value: "short" },
        { id: "q5c", label: "15-30 minutes daily", value: "medium" },
        { id: "q5d", label: "30+ minutes daily", value: "extended" },
        {
          id: "q5e",
          label: "Variable depending on the day",
          value: "variable",
        },
      ],
    },
  ];

  // Custom hooks for mood recommendations
  const moodBasedRecommendations = [
    {
      mood: "anxious",
      title: "For Anxiety & Worry",
      resources: resourcesData
        .filter((r) => r.recommended && r.recommended.includes("anxious"))
        .slice(0, 3),
    },
    {
      mood: "sad",
      title: "For Low Mood & Sadness",
      resources: resourcesData
        .filter((r) => r.recommended && r.recommended.includes("sad"))
        .slice(0, 3),
    },
    {
      mood: "stressed",
      title: "For Stress Relief",
      resources: resourcesData
        .filter((r) => r.recommended && r.recommended.includes("stressed"))
        .slice(0, 3),
    },
    {
      mood: "tired",
      title: "For Energy & Motivation",
      resources: resourcesData
        .filter(
          (r) =>
            r.recommended &&
            (r.recommended.includes("tired") ||
              r.recommended.includes("unmotivated"))
        )
        .slice(0, 3),
    },
  ];

  // State initialization and simulation
  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);


    // Simulate previously saved favorites and bookmarks
    setFavorites(["a1", "v1"]);
    setBookmarks(["a3", "au2"]);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [selectedResource]);

  // Filter resources based on current filters
  const filteredResources = resourcesData.filter((resource) => {
    // Filter by search term
    if (
      searchTerm &&
      !resource.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    // Filter by category
    if (activeCategory !== "all" && resource.category !== activeCategory) {
      return false;
    }

    // Filter by subcategory
    if (
      activeSubcategory !== "all" &&
      resource.subcategory !== activeSubcategory
    ) {
      return false;
    }

    return true;
  });

  // Toggle favorite status
  const toggleFavorite = (id, e) => {
    if (e) e.stopPropagation();

    if (favorites.includes(id)) {
      setFavorites(favorites.filter((item) => item !== id));
    } else {
      setFavorites([...favorites, id]);

      // Show animation feedback
      setShowThanks({
        show: true,
        message: "Added to favorites!",
        type: "success",
      });

      setTimeout(() => {
        setShowThanks(false);
      }, 2000);
    }
  };

  // Toggle bookmark status
  const toggleBookmark = (id, e) => {
    if (e) e.stopPropagation();

    if (bookmarks.includes(id)) {
      setBookmarks(bookmarks.filter((item) => item !== id));
    } else {
      setBookmarks([...bookmarks, id]);

      // Show animation feedback
      setShowThanks({
        show: true,
        message: "Saved for later!",
        type: "info",
      });

      setTimeout(() => {
        setShowThanks(false);
      }, 2000);
    }
  };

  // Toggle like status for a resource
  const toggleLike = (id, e) => {
    if (e) e.stopPropagation();

    if (likedResources.includes(id)) {
      setLikedResources(likedResources.filter((item) => item !== id));
    } else {
      setLikedResources([...likedResources, id]);

      // Show animation feedback
      setShowThanks({
        show: true,
        message: "Thanks for the feedback!",
        type: "success",
      });

      setTimeout(() => {
        setShowThanks(false);
      }, 2000);
    }
  };

  // Get current subcategories based on active category
  const getSubcategories = () => {
    const category = categories.find((cat) => cat.id === activeCategory);
    return category && category.subcategories ? category.subcategories : [];
  };

  // Open resource detail view
  const openResourceDetail = (resource) => {
    setSelectedResource(resource);

    // Reset video/audio time if it was previously playing
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(error => {
          console.error("Video play failed:", error);
          // If original URL fails, try fallback
          videoRef.current.src = fallbackVideoUrl;
          videoRef.current.load();
          videoRef.current.play()
            .then(() => setIsPlaying(true))
            .catch(e => console.error("Fallback video failed too:", e));
        });
    }
  };
  const handlePauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Handle audio player functionality
  const handlePlayAudio = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };

  // Share functionality
  const handleShare = (resource, e) => {
    if (e) e.stopPropagation();

    // In a real app, this would use the Web Share API if available,
    // or copy a link to clipboard
    setShowThanks({
      show: true,
      message: "Resource link copied to clipboard!",
      type: "info",
    });

    setTimeout(() => {
      setShowThanks(false);
    }, 2000);
  };

  // Comment functionality
  const handleAddComment = () => {
    if (comment.trim() === "") return;

    const newComment = {
      id: `comment-${Date.now()}`,
      text: comment,
      author: "You",
      timestamp: new Date().toISOString(),
    };

    setComments([newComment, ...comments]);
    setComment("");

    // Show animation feedback
    setShowThanks({
      show: true,
      message: "Comment added!",
      type: "success",
    });

    setTimeout(() => {
      setShowThanks(false);
    }, 2000);
  };

  // Quiz functionality
  const startQuiz = () => {
    setQuizStep(1);
    setQuizAnswers({});
    setShowQuiz(true);
  };

  const handleQuizAnswer = (questionId, answer) => {
    setQuizAnswers({
      ...quizAnswers,
      [questionId]: answer,
    });

    if (quizStep < quizQuestions.length) {
      setQuizStep(quizStep + 1);
    } else {
      // Process quiz results
      processQuizResults();
    }
  };

  const processQuizResults = () => {
    // Simple algorithm to determine dominant mood/needs
    const answers = Object.values(quizAnswers);

    let dominantMood = "neutral";
    if (answers.includes("anxious")) dominantMood = "anxious";
    else if (answers.includes("sad")) dominantMood = "sad";
    else if (answers.includes("stressed")) dominantMood = "stressed";
    else if (answers.includes("tired")) dominantMood = "tired";

    // Determine content types preference
    const contentPreference =
      answers.find((a) =>
        ["article", "video", "audio", "interactive", "mixed"].includes(a)
      ) || "mixed";

    // Generate recommendations based on quiz results
    const recommendedResources = resourcesData
      .filter((r) => r.recommended && r.recommended.includes(dominantMood))
      .slice(0, 6);

    // Set quiz result
    setQuizResult({
      mood: dominantMood,
      contentPreference,
      recommendedResources,
    });

    // Show final step of quiz
    setQuizStep(quizQuestions.length + 1);
  };

  const resetQuiz = () => {
    setShowQuiz(false);
    setQuizStep(0);
    setQuizResult(null);
  };

  // Modal functionality
  const openModal = (title, content) => {
    setModalContent({ title, content });
    setShowModal(true);
  };

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  const categoryVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 30,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 30,
      transition: {
        duration: 0.2,
      },
    },
  };

  const notificationVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      y: 50,
      transition: {
        duration: 0.2,
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.2,
      },
    },
  };

  const fadeInUp = {
    hidden: {
      y: 20,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  return (
    <div className="flex h-screen bg-slate-800 font-['Poppins']">
      {/* Sidebar Component */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeRoute={activeRoute}
      />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-3 shadow-md bg-slate-800 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <button
              className="p-1 mr-3 rounded-md text-slate-300 hover:bg-slate-600 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-white">
                Mental Health Resources
              </h1>
              <p className="hidden text-sm text-slate-300 sm:block">
                Tools, guides, and support for your mental wellbeing journey
              </p>
            </div>
          </div>
          <div className="items-center hidden md:flex">
            <div className="relative">
              <input
                type="text"
                placeholder="Search resources..."
                className="py-1.5 px-3 pr-10 rounded-md bg-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute w-4 h-4 transform -translate-y-1/2 right-3 top-1/2 text-slate-400" />
            </div>
            <button
              className="flex items-center px-3 py-1.5 ml-3 text-sm rounded-md bg-slate-600 text-slate-300 hover:bg-slate-500"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <Filter className="w-4 h-4 mr-1.5" />
              Filter
            </button>
            <button
              className="flex items-center px-3 py-1.5 ml-3 text-sm text-white rounded-md bg-emerald-600 hover:bg-emerald-700"
              onClick={() =>
                setShowMoodRecommendations(!showMoodRecommendations)
              }
            >
              <Heart className="w-4 h-4 mr-1.5" />
              Mood Recommendations
            </button>
            <button
              className="flex items-center px-3 py-1.5 ml-3 text-sm font-medium text-white rounded-md bg-blue-600 hover:bg-blue-700"
              onClick={() => setResourceNavigatorOpen(true)}
            >
              <Sparkles className="w-4 h-4 mr-1.5" />
              Resource Navigator
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto">
          {/* Mobile search */}
          <div className="flex items-center gap-2 p-4 md:hidden">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search resources..."
                className="w-full py-2 pl-3 pr-10 text-white rounded-md bg-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute w-4 h-4 transform -translate-y-1/2 right-3 top-1/2 text-slate-400" />
            </div>
            <button
              className="p-2 rounded-md bg-slate-700 text-slate-300 hover:bg-slate-600"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile actions */}
          <div className="grid grid-cols-2 gap-2 p-4 md:hidden">
            <button
              className="flex items-center justify-center py-2 text-white rounded-md bg-gradient-to-r from-emerald-600 to-teal-600"
              onClick={() =>
                setShowMoodRecommendations(!showMoodRecommendations)
              }
            >
              <Heart className="w-5 h-5 mr-2" />
              Mood Finder
            </button>
            <button
              className="flex items-center justify-center py-2 text-white rounded-md bg-gradient-to-r from-blue-600 to-indigo-600"
              onClick={() => startQuiz()}
            >
              <Brain className="w-5 h-5 mr-2" />
              Take Quiz
            </button>
            <button
              className="flex items-center justify-center col-span-2 py-2 text-white rounded-md bg-gradient-to-r from-purple-600 to-pink-600"
              onClick={() => setResourceNavigatorOpen(true)}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Resource Navigator
            </button>
          </div>

          {/* Mood-based recommendations section */}
          <AnimatePresence>
            {showMoodRecommendations && (
              <motion.div
                className="p-4 mx-4 my-4 sm:mx-6 lg:mx-8 rounded-xl bg-gradient-to-r from-slate-700/80 to-slate-600/80 backdrop-blur-sm"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-white">
                    How are you feeling today?
                  </h2>
                  <button
                    className="text-slate-300 hover:text-white"
                    onClick={() => setShowMoodRecommendations(false)}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex flex-wrap gap-3 mb-6">
                  <motion.button
                    className={`flex items-center px-4 py-2 rounded-full ${
                      mood === "anxious"
                        ? "bg-amber-500 text-amber-900"
                        : "bg-slate-600 text-white hover:bg-slate-500"
                    }`}
                    onClick={() => setMood("anxious")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Wind className="w-4 h-4 mr-1.5" />
                    Anxious
                  </motion.button>
                  <motion.button
                    className={`flex items-center px-4 py-2 rounded-full ${
                      mood === "sad"
                        ? "bg-blue-500 text-blue-900"
                        : "bg-slate-600 text-white hover:bg-slate-500"
                    }`}
                    onClick={() => setMood("sad")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <CloudRain className="w-4 h-4 mr-1.5" />
                    Sad
                  </motion.button>
                  <motion.button
                    className={`flex items-center px-4 py-2 rounded-full ${
                      mood === "stressed"
                        ? "bg-red-500 text-red-900"
                        : "bg-slate-600 text-white hover:bg-slate-500"
                    }`}
                    onClick={() => setMood("stressed")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Coffee className="w-4 h-4 mr-1.5" />
                    Stressed
                  </motion.button>
                  <motion.button
                    className={`flex items-center px-4 py-2 rounded-full ${
                      mood === "tired"
                        ? "bg-purple-500 text-purple-900"
                        : "bg-slate-600 text-white hover:bg-slate-500"
                    }`}
                    onClick={() => setMood("tired")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Moon className="w-4 h-4 mr-1.5" />
                    Tired
                  </motion.button>
                </div>

                {mood && (
                  <motion.div
                    className="space-y-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {moodBasedRecommendations
                      .filter((rec) => rec.mood === mood)
                      .map((recommendation) => (
                        <div key={recommendation.mood}>
                          <h3 className="mb-3 text-lg font-medium text-white">
                            {recommendation.title}
                          </h3>
                          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {recommendation.resources.map((resource) => (
                              <motion.div
                                key={resource.id}
                                className="overflow-hidden transition-shadow rounded-lg bg-slate-800 hover:shadow-lg hover:shadow-emerald-900/20"
                                whileHover={{ y: -5 }}
                                onClick={() => openResourceDetail(resource)}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                  type: "spring",
                                  stiffness: 300,
                                  damping: 24,
                                }}
                              >
                                <div className="relative h-32 overflow-hidden">
                                  <img
                                    src={resource.thumbnail || resource.image}
                                    alt={resource.title}
                                    className="object-cover w-full h-full"
                                  />
                                  {resource.type === "video" && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                      <PlayCircle className="w-12 h-12 text-white" />
                                    </div>
                                  )}
                                  {resource.type === "audio" && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                      <Headphones className="w-12 h-12 text-white" />
                                    </div>
                                  )}
                                  <motion.button
                                    className="absolute p-1.5 rounded-full top-2 right-2 bg-slate-800/70 hover:bg-slate-800"
                                    onClick={(e) =>
                                      toggleFavorite(resource.id, e)
                                    }
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                  >
                                    <Heart
                                      className={`w-5 h-5 ${
                                        favorites.includes(resource.id)
                                          ? "fill-red-500 text-red-500"
                                          : "text-white"
                                      }`}
                                    />
                                  </motion.button>
                                </div>
                                <div className="p-3">
                                  <div className="flex items-center mb-1 text-xs text-slate-400">
                                    {resource.type === "article" && (
                                      <Book className="w-3 h-3 mr-1" />
                                    )}
                                    {resource.type === "video" && (
                                      <Video className="w-3 h-3 mr-1" />
                                    )}
                                    {resource.type === "audio" && (
                                      <Headphones className="w-3 h-3 mr-1" />
                                    )}
                                    <span className="capitalize">
                                      {resource.type}
                                    </span>
                                    {resource.duration && (
                                      <>
                                        <span className="mx-1">•</span>
                                        <Clock className="w-3 h-3 mr-1" />
                                        {resource.duration}
                                      </>
                                    )}
                                    {resource.readTime && (
                                      <>
                                        <span className="mx-1">•</span>
                                        <Clock className="w-3 h-3 mr-1" />
                                        {resource.readTime}
                                      </>
                                    )}
                                  </div>
                                  <h3 className="font-medium text-white line-clamp-2">
                                    {resource.title}
                                  </h3>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                          <div className="flex justify-center mt-4">
                            <motion.button
                              className="flex items-center px-4 py-2 text-sm text-white rounded-md bg-slate-600 hover:bg-slate-500"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                setShowMoodRecommendations(false);
                                setActiveCategory(
                                  mood === "stressed"
                                    ? "mental-health"
                                    : mood === "sad"
                                    ? "mental-health"
                                    : mood === "anxious"
                                    ? "mental-health"
                                    : "self-care"
                                );
                                setActiveSubcategory(
                                  mood === "stressed"
                                    ? "stress"
                                    : mood === "sad"
                                    ? "depression"
                                    : mood === "anxious"
                                    ? "anxiety"
                                    : "all"
                                );
                              }}
                            >
                              View More <ArrowRight className="w-4 h-4 ml-2" />
                            </motion.button>
                          </div>
                        </div>
                      ))}
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Filter drawer */}
          <AnimatePresence>
            {filterOpen && (
              <motion.div
                className="fixed inset-0 z-20 lg:static"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div
                  className="fixed inset-0 bg-black/50 lg:hidden"
                  onClick={() => setFilterOpen(false)}
                />
                <motion.div
                  className="fixed right-0 w-full h-full max-w-sm p-4 overflow-y-auto bg-slate-800 sm:p-6 lg:static lg:block lg:h-auto lg:w-64 lg:rounded-lg lg:mt-0 lg:ml-6 lg:mr-0 lg:p-4"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="flex items-center justify-between mb-4 lg:hidden">
                    <h2 className="text-lg font-medium text-white">
                      Filter Resources
                    </h2>
                    <button
                      className="text-slate-300 hover:text-white"
                      onClick={() => setFilterOpen(false)}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="mb-6">
                    <h3 className="mb-2 text-sm font-medium text-slate-300">
                      Resource Type
                    </h3>
                    <div className="space-y-2">
                      {resourceTypes.map((type) => (
                        <motion.button
                          key={type.id}
                          className="flex items-center w-full px-3 py-2 text-left transition-colors rounded-md text-slate-300 hover:bg-slate-700"
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div className="flex items-center justify-center w-8 h-8 mr-3 rounded-full bg-slate-700">
                            {type.icon}
                          </div>
                          {type.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="mb-2 text-sm font-medium text-slate-300">
                      Categories
                    </h3>
                    <div className="space-y-1">
                      {categories.map((category) => (
                        <motion.button
                          key={category.id}
                          className={`flex items-center w-full px-3 py-2 text-left text-sm transition-colors rounded-md ${
                            activeCategory === category.id
                              ? "bg-emerald-600 text-white"
                              : "text-slate-300 hover:bg-slate-700"
                          }`}
                          onClick={() => {
                            setActiveCategory(category.id);
                            setActiveSubcategory("all");
                            setFilterOpen(false);
                          }}
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {activeCategory === category.id ? (
                            <CheckCircle className="w-4 h-4 mr-2" />
                          ) : (
                            <div className="w-4 h-4 mr-2" />
                          )}
                          {category.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {activeCategory !== "all" &&
                    getSubcategories().length > 0 && (
                      <div className="mb-6">
                        <h3 className="mb-2 text-sm font-medium text-slate-300">
                          Subcategories
                        </h3>
                        <div className="pl-4 space-y-1 border-l border-slate-700">
                          {getSubcategories().map((subcategory) => (
                            <motion.button
                              key={subcategory.id}
                              className={`flex items-center w-full px-3 py-1.5 text-left text-sm transition-colors rounded-md ${
                                activeSubcategory === subcategory.id
                                  ? "bg-emerald-600/70 text-white"
                                  : "text-slate-300 hover:bg-slate-700"
                              }`}
                              onClick={() => {
                                setActiveSubcategory(subcategory.id);
                                setFilterOpen(false);
                              }}
                              whileHover={{ x: 5 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {activeSubcategory === subcategory.id ? (
                                <CheckCircle className="w-3 h-3 mr-2" />
                              ) : (
                                <div className="w-3 h-3 mr-2" />
                              )}
                              {subcategory.label}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    )}

                  <div className="pt-4 mt-6 border-t border-slate-700">
                    <motion.button
                      className="flex items-center justify-center w-full px-4 py-2 mb-2 text-white rounded-md bg-emerald-600 hover:bg-emerald-700"
                      whileHover={{ y: -2 }}
                      whileTap={{ y: 0 }}
                      onClick={() => setFilterOpen(false)}
                    >
                      Apply Filters
                    </motion.button>
                    <motion.button
                      className="flex items-center justify-center w-full px-4 py-2 border rounded-md border-slate-600 text-slate-300 hover:bg-slate-700"
                      whileHover={{ y: -2 }}
                      whileTap={{ y: 0 }}
                      onClick={() => {
                        setActiveCategory("all");
                        setActiveSubcategory("all");
                        setFilterOpen(false);
                      }}
                    >
                      Reset
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Resource Navigator Modal */}
          <AnimatePresence>
            {resourceNavigatorOpen && (
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setResourceNavigatorOpen(false)} // Close when clicking the overlay
              >
                <motion.div
                  className="relative w-full max-w-4xl p-6 overflow-hidden rounded-lg bg-gradient-to-b from-slate-800 to-slate-900"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  onClick={(e) => e.stopPropagation()} // Prevent clicks inside modal from closing it
                >
                  <button
                    className="absolute p-1 rounded-full top-4 right-4 bg-slate-700 hover:bg-slate-600"
                    onClick={() => setResourceNavigatorOpen(false)}
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>

                  <h2 className="mb-6 text-2xl font-bold text-center text-white">
                    Mental Health Resource Navigator
                  </h2>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <motion.div
                      className="p-5 rounded-lg shadow-lg cursor-pointer bg-gradient-to-br from-indigo-900/70 to-indigo-800/70 hover:from-indigo-800 hover:to-indigo-700 shadow-indigo-900/20"
                      whileHover={{ y: -5 }}
                      onClick={() => {
                        setActiveCategory("mental-health");
                        setActiveSubcategory("anxiety");
                        setResourceNavigatorOpen(false);
                      }}
                    >
                      <div className="flex items-center mb-3">
                        <div className="flex items-center justify-center w-12 h-12 mr-4 rounded-full bg-indigo-700/50">
                          <Wind className="w-6 h-6 text-indigo-300" />
                        </div>
                        <h3 className="text-lg font-semibold text-white">
                          Anxiety Resources
                        </h3>
                      </div>
                      <p className="mb-3 text-indigo-100/90">
                        Find strategies, exercises, and information to help
                        manage anxiety and worry.
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-indigo-200">
                          {
                            resourcesData.filter(
                              (r) => r.subcategory === "anxiety"
                            ).length
                          }{" "}
                          resources
                        </span>
                        <ArrowRight className="w-5 h-5 text-indigo-300" />
                      </div>
                    </motion.div>

                    <motion.div
                      className="p-5 rounded-lg shadow-lg cursor-pointer bg-gradient-to-br from-blue-900/70 to-blue-800/70 hover:from-blue-800 hover:to-blue-700 shadow-blue-900/20"
                      whileHover={{ y: -5 }}
                      onClick={() => {
                        setActiveCategory("mental-health");
                        setActiveSubcategory("depression");
                        setResourceNavigatorOpen(false);
                      }}
                    >
                      <div className="flex items-center mb-3">
                        <div className="flex items-center justify-center w-12 h-12 mr-4 rounded-full bg-blue-700/50">
                          <CloudRain className="w-6 h-6 text-blue-300" />
                        </div>
                        <h3 className="text-lg font-semibold text-white">
                          Depression Support
                        </h3>
                      </div>
                      <p className="mb-3 text-blue-100/90">
                        Resources to help understand and manage low mood,
                        sadness, and depression.
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-blue-200">
                          {
                            resourcesData.filter(
                              (r) => r.subcategory === "depression"
                            ).length
                          }{" "}
                          resources
                        </span>
                        <ArrowRight className="w-5 h-5 text-blue-300" />
                      </div>
                    </motion.div>

                    <motion.div
                      className="p-5 rounded-lg shadow-lg cursor-pointer bg-gradient-to-br from-emerald-900/70 to-emerald-800/70 hover:from-emerald-800 hover:to-emerald-700 shadow-emerald-900/20"
                      whileHover={{ y: -5 }}
                      onClick={() => {
                        setActiveCategory("self-care");
                        setActiveSubcategory("mindfulness");
                        setResourceNavigatorOpen(false);
                      }}
                    >
                      <div className="flex items-center mb-3">
                        <div className="flex items-center justify-center w-12 h-12 mr-4 rounded-full bg-emerald-700/50">
                          <Sun className="w-6 h-6 text-emerald-300" />
                        </div>
                        <h3 className="text-lg font-semibold text-white">
                          Mindfulness Practice
                        </h3>
                      </div>
                      <p className="mb-3 text-emerald-100/90">
                        Mindfulness and meditation resources to help you stay
                        present and reduce stress.
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-emerald-200">
                          {
                            resourcesData.filter(
                              (r) => r.subcategory === "mindfulness"
                            ).length
                          }{" "}
                          resources
                        </span>
                        <ArrowRight className="w-5 h-5 text-emerald-300" />
                      </div>
                    </motion.div>

                    <motion.div
                      className="p-5 rounded-lg shadow-lg cursor-pointer bg-gradient-to-br from-amber-900/70 to-amber-800/70 hover:from-amber-800 hover:to-amber-700 shadow-amber-900/20"
                      whileHover={{ y: -5 }}
                      onClick={() => {
                        setActiveCategory("mental-health");
                        setActiveSubcategory("stress");
                        setResourceNavigatorOpen(false);
                      }}
                    >
                      <div className="flex items-center mb-3">
                        <div className="flex items-center justify-center w-12 h-12 mr-4 rounded-full bg-amber-700/50">
                          <Coffee className="w-6 h-6 text-amber-300" />
                        </div>
                        <h3 className="text-lg font-semibold text-white">
                          Stress Management
                        </h3>
                      </div>
                      <p className="mb-3 text-amber-100/90">
                        Techniques and resources to help you manage stress in
                        daily life.
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-amber-200">
                          {
                            resourcesData.filter(
                              (r) => r.subcategory === "stress"
                            ).length
                          }{" "}
                          resources
                        </span>
                        <ArrowRight className="w-5 h-5 text-amber-300" />
                      </div>
                    </motion.div>

                    <motion.div
                      className="p-5 rounded-lg shadow-lg cursor-pointer bg-gradient-to-br from-purple-900/70 to-purple-800/70 hover:from-purple-800 hover:to-purple-700 shadow-purple-900/20"
                      whileHover={{ y: -5 }}
                      onClick={() => {
                        setActiveCategory("self-care");
                        setActiveSubcategory("sleep");
                        setResourceNavigatorOpen(false);
                      }}
                    >
                      <div className="flex items-center mb-3">
                        <div className="flex items-center justify-center w-12 h-12 mr-4 rounded-full bg-purple-700/50">
                          <Moon className="w-6 h-6 text-purple-300" />
                        </div>
                        <h3 className="text-lg font-semibold text-white">
                          Sleep Improvement
                        </h3>
                      </div>
                      <p className="mb-3 text-purple-100/90">
                        Resources to help you get better quality sleep and
                        manage sleep problems.
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-purple-200">
                          {
                            resourcesData.filter(
                              (r) => r.subcategory === "sleep"
                            ).length
                          }{" "}
                          resources
                        </span>
                        <ArrowRight className="w-5 h-5 text-purple-300" />
                      </div>
                    </motion.div>

                    <motion.div
                      className="p-5 rounded-lg shadow-lg cursor-pointer bg-gradient-to-br from-pink-900/70 to-pink-800/70 hover:from-pink-800 hover:to-pink-700 shadow-pink-900/20"
                      whileHover={{ y: -5 }}
                      onClick={() => {
                        setActiveCategory("relationships");
                        setActiveSubcategory("communication");
                        setResourceNavigatorOpen(false);
                      }}
                    >
                      <div className="flex items-center mb-3">
                        <div className="flex items-center justify-center w-12 h-12 mr-4 rounded-full bg-pink-700/50">
                          <MessageCircle className="w-6 h-6 text-pink-300" />
                        </div>
                        <h3 className="text-lg font-semibold text-white">
                          Relationship Skills
                        </h3>
                      </div>
                      <p className="mb-3 text-pink-100/90">
                        Communication, boundaries, and conflict resolution
                        resources for healthier relationships.
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-pink-200">
                          {
                            resourcesData.filter(
                              (r) => r.category === "relationships"
                            ).length
                          }{" "}
                          resources
                        </span>
                        <ArrowRight className="w-5 h-5 text-pink-300" />
                      </div>
                    </motion.div>
                  </div>

                  <div className="flex justify-center mt-8">
                    <motion.button
                      className="flex items-center px-5 py-2 font-medium text-white rounded-md bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => startQuiz()}
                    >
                      <Brain className="w-5 h-5 mr-2" />
                      Take Mental Health Quiz
                    </motion.button>
                  </div>

                  <div className="flex flex-wrap justify-center gap-2 mt-6">
                    {categories
                      .filter((cat) => cat.id !== "all")
                      .map((category) => (
                        <motion.button
                          key={category.id}
                          className="px-3 py-1 text-xs font-medium rounded-full bg-slate-700 text-slate-300 hover:bg-slate-600"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setActiveCategory(category.id);
                            setActiveSubcategory("all");
                            setResourceNavigatorOpen(false);
                          }}
                        >
                          {category.label}
                        </motion.button>
                      ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quiz Modal */}
          <AnimatePresence>
            {showQuiz && (
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="relative w-full max-w-2xl p-6 overflow-hidden rounded-lg bg-gradient-to-b from-slate-800 to-slate-900"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  <button
                    className="absolute p-1 rounded-full top-4 right-4 bg-slate-700 hover:bg-slate-600"
                    onClick={resetQuiz}
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>

                  {quizStep === 0 && (
                    <motion.div
                      key="quiz-intro"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <h2 className="mb-3 text-2xl font-bold text-center text-white">
                        Mental Health Resource Quiz
                      </h2>
                      <p className="mb-6 text-center text-slate-300">
                        Answer a few questions to get personalized resource
                        recommendations.
                      </p>

                      <div className="p-5 mb-6 rounded-lg bg-slate-700/50">
                        <h3 className="mb-2 text-lg font-medium text-white">
                          What this quiz will help you with:
                        </h3>
                        <ul className="pl-5 mb-4 space-y-2 list-disc text-slate-300">
                          <li>
                            Find resources tailored to your current mood and
                            needs
                          </li>
                          <li>Discover content in formats you prefer</li>
                          <li>
                            Get recommendations based on your available time
                          </li>
                          <li>
                            Learn about new tools and techniques you might not
                            have tried
                          </li>
                        </ul>
                        <p className="text-sm text-slate-400">
                          Note: This is not a diagnostic tool. If you're
                          experiencing severe distress, please seek professional
                          help.
                        </p>
                      </div>

                      <div className="flex justify-center">
                        <motion.button
                          className="px-6 py-3 font-medium text-white rounded-md bg-emerald-600 hover:bg-emerald-700"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setQuizStep(1)}
                        >
                          Start Quiz
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {quizStep > 0 && quizStep <= quizQuestions.length && (
                    <motion.div
                      key={`quiz-question-${quizStep}`}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                    >
                      <div className="mb-6 text-center">
                        <div className="flex items-center justify-center mb-2">
                          <div className="flex items-center">
                            {[...Array(quizQuestions.length)].map((_, i) => (
                              <div
                                key={i}
                                className={`w-2.5 h-2.5 rounded-full mx-1 ${
                                  i + 1 === quizStep
                                    ? "bg-emerald-500"
                                    : i + 1 < quizStep
                                    ? "bg-emerald-700"
                                    : "bg-slate-600"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-slate-400">
                          Question {quizStep} of {quizQuestions.length}
                        </span>
                      </div>

                      <h2 className="mb-6 text-xl font-semibold text-center text-white">
                        {quizQuestions[quizStep - 1].question}
                      </h2>

                      <div className="space-y-3">
                        {quizQuestions[quizStep - 1].options.map((option) => (
                          <motion.button
                            key={option.id}
                            className="flex items-center justify-between w-full p-4 text-left transition-colors rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200"
                            whileHover={{ x: 5 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() =>
                              handleQuizAnswer(
                                quizQuestions[quizStep - 1].id,
                                option.value
                              )
                            }
                          >
                            <span>{option.label}</span>
                            <ChevronRight className="w-5 h-5 text-slate-400" />
                          </motion.button>
                        ))}
                      </div>

                      {quizStep > 1 && (
                        <div className="flex justify-center mt-6">
                          <motion.button
                            className="px-4 py-2 text-sm text-slate-300 hover:text-white"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setQuizStep(quizStep - 1)}
                          >
                            Back to previous question
                          </motion.button>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {quizStep > quizQuestions.length && quizResult && (
                    <motion.div
                      key="quiz-results"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <h2 className="mb-2 text-2xl font-bold text-center text-white">
                        Your Personalized Recommendations
                      </h2>
                      <p className="mb-6 text-center text-slate-300">
                        Based on your responses, we've selected resources that
                        may help you most.
                      </p>

                      <motion.div
                        className="p-5 mb-6 rounded-lg bg-gradient-to-r from-emerald-900/50 to-teal-900/50"
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                      >
                        <h3 className="mb-4 text-lg font-medium text-white">
                          Recommended Resources
                        </h3>

                        <div className="grid gap-4 mb-4 sm:grid-cols-2">
                          {quizResult.recommendedResources
                            .slice(0, 4)
                            .map((resource, index) => (
                              <motion.div
                                key={resource.id}
                                className="overflow-hidden transition-shadow rounded-lg cursor-pointer bg-slate-800/80 hover:shadow-lg hover:shadow-emerald-900/20"
                                onClick={() => {
                                  resetQuiz();
                                  openResourceDetail(resource);
                                }}
                                variants={fadeInUp}
                              >
                                <div className="relative overflow-hidden h-28">
                                  <img
                                    src={resource.thumbnail || resource.image}
                                    alt={resource.title}
                                    className="object-cover w-full h-full"
                                  />
                                  {resource.type === "video" && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                      <PlayCircle className="w-10 h-10 text-white" />
                                    </div>
                                  )}
                                  {resource.type === "audio" && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                      <Headphones className="w-10 h-10 text-white" />
                                    </div>
                                  )}
                                </div>
                                <div className="p-3">
                                  <div className="flex items-center mb-1 text-xs text-slate-400">
                                    {resource.type === "article" && (
                                      <Book className="w-3 h-3 mr-1" />
                                    )}
                                    {resource.type === "video" && (
                                      <Video className="w-3 h-3 mr-1" />
                                    )}
                                    {resource.type === "audio" && (
                                      <Headphones className="w-3 h-3 mr-1" />
                                    )}
                                    <span className="capitalize">
                                      {resource.type}
                                    </span>
                                  </div>
                                  <h4 className="text-sm font-medium text-white line-clamp-2">
                                    {resource.title}
                                  </h4>
                                </div>
                              </motion.div>
                            ))}
                        </div>

                        <div className="flex flex-col items-center">
                          <motion.button
                            className="flex items-center px-5 py-2 font-medium text-white rounded-md bg-emerald-600 hover:bg-emerald-700"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              resetQuiz();
                              // Set mood based on quiz result
                              setMood(quizResult.mood);
                              setShowMoodRecommendations(true);
                            }}
                          >
                            View All Recommendations
                          </motion.button>

                          <motion.button
                            className="mt-3 text-sm text-slate-300 hover:text-white"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={resetQuiz}
                          >
                            Close Quiz
                          </motion.button>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Generic Modal */}
          <AnimatePresence>
            {showModal && (
              <motion.div
                className="fixed inset-0 z-40 flex items-center justify-center p-4 overflow-y-auto bg-black/70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowModal(false)}
              >
                <motion.div
                  className="relative w-full max-w-md p-6 overflow-hidden rounded-lg bg-slate-800"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="absolute p-1 rounded-full top-4 right-4 bg-slate-700 hover:bg-slate-600"
                    onClick={() => setShowModal(false)}
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>

                  <h2 className="mb-4 text-xl font-semibold text-white">
                    {modalContent.title}
                  </h2>
                  <div
                    className="text-slate-300"
                    dangerouslySetInnerHTML={{ __html: modalContent.content }}
                  />

                  <div className="flex justify-center mt-6">
                    <motion.button
                      className="px-4 py-2 font-medium text-white rounded-md bg-emerald-600 hover:bg-emerald-700"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Notification Toast */}
          <AnimatePresence>
            {showThanks && (
              <motion.div
                className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg flex items-center ${
                  showThanks.type === "success"
                    ? "bg-emerald-600"
                    : showThanks.type === "info"
                    ? "bg-blue-600"
                    : "bg-amber-600"
                }`}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={notificationVariants}
              >
                {showThanks.type === "success" ? (
                  <CheckCircle className="w-5 h-5 mr-3 text-white" />
                ) : (
                  <Info className="w-5 h-5 mr-3 text-white" />
                )}
                <span className="font-medium text-white">
                  {showThanks.message}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Featured sections and resource grid */}
          <div className="p-4 lg:flex lg:p-0">
            {/* Desktop sidebar for filters - only visible at larger breakpoints */}
            <div className="sticky top-0 hidden h-screen pl-8 pr-4 overflow-y-auto lg:block lg:w-64">
              <div className="py-6 space-y-6">
                <div>
                  <h3 className="mb-3 text-sm font-medium text-slate-300">
                    Resource Type
                  </h3>
                  <div className="space-y-2">
                    {resourceTypes.map((type) => (
                      <motion.button
                        key={type.id}
                        className="flex items-center w-full px-3 py-2 text-left transition-colors rounded-md text-slate-300 hover:bg-slate-700"
                        variants={categoryVariants}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="flex items-center justify-center w-8 h-8 mr-3 rounded-full bg-slate-700">
                          {type.icon}
                        </div>
                        {type.label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-medium text-slate-300">
                    Categories
                  </h3>
                  <div className="space-y-1">
                    {categories.map((category) => (
                      <motion.button
                        key={category.id}
                        className={`flex items-center w-full px-3 py-2 text-left text-sm transition-colors rounded-md ${
                          activeCategory === category.id
                            ? "bg-emerald-600 text-white"
                            : "text-slate-300 hover:bg-slate-700"
                        }`}
                        onClick={() => {
                          setActiveCategory(category.id);
                          setActiveSubcategory("all");
                        }}
                        variants={categoryVariants}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {activeCategory === category.id ? (
                          <CheckCircle className="w-4 h-4 mr-2" />
                        ) : (
                          <div className="w-4 h-4 mr-2" />
                        )}
                        {category.label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {activeCategory !== "all" && getSubcategories().length > 0 && (
                  <div>
                    <h3 className="mb-3 text-sm font-medium text-slate-300">
                      Subcategories
                    </h3>
                    <div className="pl-4 space-y-1 border-l border-slate-700">
                      {getSubcategories().map((subcategory) => (
                        <motion.button
                          key={subcategory.id}
                          className={`flex items-center w-full px-3 py-1.5 text-left text-sm transition-colors rounded-md ${
                            activeSubcategory === subcategory.id
                              ? "bg-emerald-600/70 text-white"
                              : "text-slate-300 hover:bg-slate-700"
                          }`}
                          onClick={() => setActiveSubcategory(subcategory.id)}
                          variants={categoryVariants}
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {activeSubcategory === subcategory.id ? (
                            <CheckCircle className="w-3 h-3 mr-2" />
                          ) : (
                            <div className="w-3 h-3 mr-2" />
                          )}
                          {subcategory.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="p-4 rounded-lg bg-slate-700/50">
                  <h3 className="mb-2 text-sm font-medium text-white">
                    Need Help?
                  </h3>
                  <p className="mb-3 text-sm text-slate-300">
                    Not sure where to start? Our mental health quiz can help you
                    find the most relevant resources.
                  </p>
                  <motion.button
                    className="flex items-center justify-center w-full px-3 py-2 text-sm text-white rounded-md bg-emerald-600 hover:bg-emerald-700"
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    onClick={() => startQuiz()}
                  >
                    Take the Quiz
                  </motion.button>
                </div>

                <div className="p-4 rounded-lg bg-gradient-to-r from-purple-900/30 to-indigo-900/30">
                  <div className="flex items-center mb-2">
                    <Calendar className="w-4 h-4 mr-2 text-purple-300" />
                    <h3 className="text-sm font-medium text-white">
                      Daily Wellness Tip
                    </h3>
                  </div>
                  <p className="mb-3 text-sm text-slate-300">
                    Try the "3-3-3 Rule" for anxiety: Name 3 things you see, 3
                    sounds you hear, and move 3 parts of your body.
                  </p>
                  <div className="flex justify-end">
                    <button className="text-xs font-medium text-purple-300 hover:text-purple-200">
                      New Tip →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Main content area */}
            <div className="flex-1 px-0 py-4 lg:px-6">
              {isLoading ? (
                // Loading state
                <div className="flex flex-col items-center justify-center h-64">
                  <div className="w-12 h-12 border-4 rounded-full border-t-emerald-500 border-slate-700 animate-spin"></div>
                  <p className="mt-4 text-slate-300">Loading resources...</p>
                </div>
              ) : (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-8"
                >
                  {/* Featured resource section */}
                  <motion.section variants={itemVariants} className="mb-8">
                    <h2 className="mb-4 text-xl font-semibold text-white">
                      Featured Resources
                    </h2>
                    <div className="relative overflow-hidden rounded-xl">
                      <div className="absolute inset-0 z-10 bg-gradient-to-r from-emerald-900/90 to-teal-900/40"></div>
                      <img
                        src="https://images.unsplash.com/photo-1477332552946-cfb384aeaf1c?q=80&w=1170&auto=format&fit=crop"
                        alt="Mindfulness Practice"
                        className="object-cover w-full h-64"
                      />
                      <div className="absolute bottom-0 left-0 right-0 z-10 p-6">
                        <span className="inline-block px-2 py-1 mb-2 text-xs font-medium rounded-md bg-emerald-600 text-emerald-50">
                          New Resource
                        </span>
                        <h3 className="mb-2 text-2xl font-bold text-white">
                          30-Day Mindfulness Challenge
                        </h3>
                        <p className="mb-4 text-emerald-50">
                          Begin your journey to mindfulness with our guided
                          30-day program designed to reduce stress and improve
                          focus.
                        </p>
                        <motion.button
                          className="px-4 py-2 text-sm font-medium text-white rounded-md bg-emerald-600 hover:bg-emerald-700"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() =>
                            openModal(
                              "30-Day Mindfulness Challenge",
                              '<p class="mb-4">Welcome to the 30-Day Mindfulness Challenge! This program is designed to help you develop a consistent mindfulness practice through small, manageable daily exercises.</p><p class="mb-4">Each day introduces a new mindfulness technique or concept, gradually building your skills and awareness over the course of a month.</p><h3 class="text-lg font-medium text-white mb-2">How it works:</h3><ol class="list-decimal pl-5 mb-4 space-y-1"><li>Receive a daily 5-10 minute mindfulness exercise</li><li>Track your progress and mood changes</li><li>Access guided audio for each practice</li><li>Learn techniques you can use anytime, anywhere</li></ol><p>Starting the challenge will give you access to Day 1, with new content unlocking each day you complete a practice.</p>'
                            )
                          }
                        >
                          Start Now
                        </motion.button>
                      </div>
                    </div>
                  </motion.section>

                  {/* Quick access section */}
                  <motion.section variants={itemVariants} className="mb-8">
                    <h2 className="mb-4 text-xl font-semibold text-white">
                      Quick Access
                    </h2>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      <motion.button
                        className="flex flex-col items-center p-4 transition-colors rounded-lg bg-slate-700 hover:bg-slate-600"
                        whileHover={{ y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          openModal(
                            "Beginner's Guide to Mental Wellbeing",
                            '<p class="mb-4">Welcome to your mental wellbeing journey! This guide will help you understand the basics of mental health and introduce you to practices that support emotional wellbeing.</p><h3 class="text-lg font-medium text-white mb-2">What you\'ll learn:</h3><ul class="list-disc pl-5 mb-4 space-y-1"><li>The connection between mental and physical health</li><li>Simple daily habits that support mental wellbeing</li><li>When and how to seek professional support</li><li>Strategies for managing common challenges like stress and anxiety</li></ul><p>This guide is designed for those new to the concept of intentional mental health practices, but contains valuable reminders for everyone.</p>'
                          )
                        }
                      >
                        <div className="flex items-center justify-center w-12 h-12 mb-3 rounded-full bg-emerald-700/50">
                          <BookOpen className="w-6 h-6 text-emerald-300" />
                        </div>
                        <span className="text-sm font-medium text-white">
                          Beginners Guide
                        </span>
                      </motion.button>
                      <motion.button
                        className="flex flex-col items-center p-4 transition-colors rounded-lg bg-slate-700 hover:bg-slate-600"
                        whileHover={{ y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setActiveCategory("meditation");
                          setActiveSubcategory("guided");
                        }}
                      >
                        <div className="flex items-center justify-center w-12 h-12 mb-3 rounded-full bg-blue-700/50">
                          <Headphones className="w-6 h-6 text-blue-300" />
                        </div>
                        <span className="text-sm font-medium text-white">
                          Guided Meditations
                        </span>
                      </motion.button>
                      <motion.button
                        className="flex flex-col items-center p-4 transition-colors rounded-lg bg-slate-700 hover:bg-slate-600"
                        whileHover={{ y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => startQuiz()}
                      >
                        <div className="flex items-center justify-center w-12 h-12 mb-3 rounded-full bg-amber-700/50">
                          <Brain className="w-6 h-6 text-amber-300" />
                        </div>
                        <span className="text-sm font-medium text-white">
                          Self-Assessment
                        </span>
                      </motion.button>
                      <motion.button
                        className="flex flex-col items-center p-4 transition-colors rounded-lg bg-slate-700 hover:bg-slate-600"
                        whileHover={{ y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          openModal(
                            "Creating Your Wellness Plan",
                            '<p class="mb-4">A personalized wellness plan helps you maintain mental health through intentional daily practices and strategies.</p><h3 class="text-lg font-medium text-white mb-2">Components of a Wellness Plan:</h3><ul class="list-disc pl-5 mb-4 space-y-1"><li><strong>Daily practices</strong>: Brief activities like meditation, journaling, or deep breathing</li><li><strong>Physical wellbeing</strong>: Exercise, nutrition, and sleep routines</li><li><strong>Social connection</strong>: Regular meaningful interaction with supportive people</li><li><strong>Stress management</strong>: Techniques to use when facing challenges</li><li><strong>Warning signs</strong>: Personal indicators that you need additional support</li><li><strong>Professional resources</strong>: Contacts for when self-care isn\'t enough</li></ul><p>Click "Create My Plan" to build a customized wellness plan based on your needs and preferences.</p>'
                          )
                        }
                      >
                        <div className="flex items-center justify-center w-12 h-12 mb-3 rounded-full bg-purple-700/50">
                          <Calendar className="w-6 h-6 text-purple-300" />
                        </div>
                        <span className="text-sm font-medium text-white">
                          Wellness Plans
                        </span>
                      </motion.button>
                    </div>
                  </motion.section>

                  {/* Horizontal category nav - replaces the vertical one on desktop */}
                  <motion.section variants={itemVariants} className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold text-white">
                        Browse Categories
                      </h2>
                      <button
                        className="flex items-center text-sm text-emerald-400 hover:text-emerald-300"
                        onClick={() => setResourceNavigatorOpen(true)}
                      >
                        View All <ChevronRight className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                    <div className="flex pb-2 space-x-3 overflow-x-auto hide-scrollbar">
                      {categories.slice(1).map((category) => (
                        <motion.button
                          key={category.id}
                          className={`flex flex-col items-center py-3 px-5 rounded-lg min-w-[100px] ${
                            activeCategory === category.id
                              ? "bg-gradient-to-b from-emerald-600 to-emerald-700 text-white"
                              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                          }`}
                          whileHover={{ y: -5 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setActiveCategory(category.id);
                            setActiveSubcategory("all");
                          }}
                        >
                          {category.id === "mental-health" && (
                            <Brain className="w-6 h-6 mb-2" />
                          )}
                          {category.id === "self-care" && (
                            <Heart className="w-6 h-6 mb-2" />
                          )}
                          {category.id === "meditation" && (
                            <Moon className="w-6 h-6 mb-2" />
                          )}
                          {category.id === "exercise" && (
                            <Wind className="w-6 h-6 mb-2" />
                          )}
                          {category.id === "relationships" && (
                            <User className="w-6 h-6 mb-2" />
                          )}
                          <span className="text-sm font-medium">
                            {category.label}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.section>

                  {/* If we have a subcategory active, show subcategory tabs */}
                  {activeCategory !== "all" &&
                    getSubcategories().length > 0 && (
                      <motion.section variants={itemVariants} className="mb-8">
                        <div className="flex flex-wrap gap-2">
                          {getSubcategories().map((subcategory) => (
                            <motion.button
                              key={subcategory.id}
                              className={`px-4 py-2 text-sm font-medium rounded-md ${
                                activeSubcategory === subcategory.id
                                  ? "bg-emerald-600 text-white"
                                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                              }`}
                              whileHover={{ y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() =>
                                setActiveSubcategory(subcategory.id)
                              }
                            >
                              {subcategory.label}
                            </motion.button>
                          ))}
                        </div>
                      </motion.section>
                    )}

                  {/* Resources section */}
                  <motion.section variants={itemVariants}>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold text-white">
                        {activeCategory === "all"
                          ? "All Resources"
                          : activeSubcategory === "all"
                          ? categories.find((c) => c.id === activeCategory)
                              ?.label
                          : getSubcategories().find(
                              (s) => s.id === activeSubcategory
                            )?.label}
                      </h2>
                      <div className="flex items-center text-sm text-slate-400">
                        <span>{filteredResources.length} resources found</span>
                      </div>
                    </div>

                    {filteredResources.length === 0 ? (
                      <div className="flex flex-col items-center justify-center p-8 rounded-lg bg-slate-700">
                        <Search className="w-12 h-12 mb-4 text-slate-500" />
                        <h3 className="mb-2 text-lg font-medium text-white">
                          No resources found
                        </h3>
                        <p className="mb-4 text-center text-slate-400">
                          Try adjusting your search or filters to find what you
                          are looking for.
                        </p>
                        <motion.button
                          className="px-4 py-2 text-sm font-medium text-white rounded-md bg-emerald-600 hover:bg-emerald-700"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setActiveCategory("all");
                            setActiveSubcategory("all");
                            setSearchTerm("");
                          }}
                        >
                          Reset Filters
                        </motion.button>
                      </div>
                    ) : (
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredResources.map((resource) => (
                          <motion.div
                            key={resource.id}
                            className="overflow-hidden transition-shadow rounded-lg cursor-pointer bg-slate-700 hover:shadow-lg hover:shadow-emerald-900/20"
                            whileHover={{ y: -5 }}
                            onClick={() => openResourceDetail(resource)}
                            variants={itemVariants}
                          >
                            <div className="relative h-40 overflow-hidden">
                              <img
                                src={resource.thumbnail || resource.image}
                                alt={resource.title}
                                className="object-cover w-full h-full"
                              />
                              {resource.type === "video" && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                  <PlayCircle className="w-12 h-12 text-white" />
                                </div>
                              )}
                              {resource.type === "audio" && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                  <Headphones className="w-12 h-12 text-white" />
                                </div>
                              )}
                              <motion.button
                                className="absolute p-1.5 rounded-full top-2 right-2 bg-slate-800/70 hover:bg-slate-800"
                                onClick={(e) => toggleFavorite(resource.id, e)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Heart
                                  className={`w-5 h-5 ${
                                    favorites.includes(resource.id)
                                      ? "fill-red-500 text-red-500"
                                      : "text-white"
                                  }`}
                                />
                              </motion.button>
                              <motion.button
                                className="absolute p-1.5 rounded-full top-2 left-2 bg-slate-800/70 hover:bg-slate-800"
                                onClick={(e) => toggleBookmark(resource.id, e)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Bookmark
                                  className={`w-5 h-5 ${
                                    bookmarks.includes(resource.id)
                                      ? "fill-emerald-500 text-emerald-500"
                                      : "text-white"
                                  }`}
                                />
                              </motion.button>
                            </div>
                            <div className="p-4">
                              <div className="flex items-center mb-2 text-xs text-slate-400">
                                {resource.type === "article" && (
                                  <Book className="w-3 h-3 mr-1" />
                                )}
                                {resource.type === "video" && (
                                  <Video className="w-3 h-3 mr-1" />
                                )}
                                {resource.type === "audio" && (
                                  <Headphones className="w-3 h-3 mr-1" />
                                )}
                                <span className="capitalize">
                                  {resource.type}
                                </span>
                                {resource.duration && (
                                  <>
                                    <span className="mx-1">•</span>
                                    <Clock className="w-3 h-3 mr-1" />
                                    {resource.duration}
                                  </>
                                )}
                                {resource.readTime && (
                                  <>
                                    <span className="mx-1">•</span>
                                    <Clock className="w-3 h-3 mr-1" />
                                    {resource.readTime}
                                  </>
                                )}
                              </div>
                              <h3 className="mb-2 font-medium text-white line-clamp-2">
                                {resource.title}
                              </h3>
                              <p className="mb-3 text-sm text-slate-300 line-clamp-2">
                                {resource.excerpt || resource.description}
                              </p>
                              <div className="flex flex-wrap mt-2 text-xs gap-1.5">
                                {resource.tags &&
                                  resource.tags.slice(0, 3).map((tag) => (
                                    <span
                                      key={tag}
                                      className="px-2 py-1 rounded-full bg-slate-600 text-slate-300"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.section>

                  {/* Expert advice section */}
                  <motion.section
                    variants={itemVariants}
                    className="p-6 my-10 rounded-xl bg-gradient-to-r from-slate-700 to-slate-600"
                  >
                    <h2 className="mb-6 text-xl font-semibold text-white">
                      Expert Mental Health Advice
                    </h2>
                    <div className="grid gap-6 md:grid-cols-2">
                      <motion.div className="flex" whileHover={{ x: 5 }}>
                        <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mr-4 rounded-full bg-amber-600/30">
                          <Award className="w-6 h-6 text-amber-300" />
                        </div>
                        <div>
                          <h3 className="mb-1 font-medium text-white">
                            Building Healthy Habits
                          </h3>
                          <p className="text-sm text-slate-300">
                            Small, consistent changes are the most effective way
                            to create lasting mental health habits.
                          </p>
                          <button className="flex items-center mt-2 text-xs font-medium text-emerald-400 hover:text-emerald-300">
                            Read article <ArrowRight className="w-3 h-3 ml-1" />
                          </button>
                        </div>
                      </motion.div>
                      <motion.div className="flex" whileHover={{ x: 5 }}>
                        <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mr-4 rounded-full bg-blue-600/30">
                          <MessageCircle className="w-6 h-6 text-blue-300" />
                        </div>
                        <div>
                          <h3 className="mb-1 font-medium text-white">
                            Effective Communication
                          </h3>
                          <p className="text-sm text-slate-300">
                            Learning to express your needs clearly can transform
                            relationships and reduce stress.
                          </p>
                          <button className="flex items-center mt-2 text-xs font-medium text-emerald-400 hover:text-emerald-300">
                            Read article <ArrowRight className="w-3 h-3 ml-1" />
                          </button>
                        </div>
                      </motion.div>
                      <motion.div className="flex" whileHover={{ x: 5 }}>
                        <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mr-4 rounded-full bg-purple-600/30">
                          <Moon className="w-6 h-6 text-purple-300" />
                        </div>
                        <div>
                          <h3 className="mb-1 font-medium text-white">
                            Sleep Hygiene
                          </h3>
                          <p className="text-sm text-slate-300">
                            Quality sleep is foundational to mental health.
                            Learn evidence-based techniques.
                          </p>
                          <button className="flex items-center mt-2 text-xs font-medium text-emerald-400 hover:text-emerald-300">
                            Read article <ArrowRight className="w-3 h-3 ml-1" />
                          </button>
                        </div>
                      </motion.div>
                      <motion.div className="flex" whileHover={{ x: 5 }}>
                        <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mr-4 rounded-full bg-emerald-600/30">
                          <Coffee className="w-6 h-6 text-emerald-300" />
                        </div>
                        <div>
                          <h3 className="mb-1 font-medium text-white">
                            Stress Management
                          </h3>
                          <p className="text-sm text-slate-300">
                            Practical techniques to identify stressors and
                            develop effective coping strategies.
                          </p>
                          <button className="flex items-center mt-2 text-xs font-medium text-emerald-400 hover:text-emerald-300">
                            Read article <ArrowRight className="w-3 h-3 ml-1" />
                          </button>
                        </div>
                      </motion.div>
                    </div>
                    <div className="flex justify-center mt-6">
                      <motion.button
                        className="flex items-center px-4 py-2 text-sm font-medium text-white rounded-md bg-emerald-600 hover:bg-emerald-700"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View All Expert Articles
                      </motion.button>
                    </div>
                  </motion.section>
                </motion.div>
              )}

              {/* Pagination (simplified version) */}
              {filteredResources.length > 0 && (
                <div className="flex items-center justify-center py-6 mt-6">
                  <button className="flex items-center px-3 py-1 mr-2 text-sm rounded-md bg-slate-700 text-slate-300 hover:bg-slate-600">
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                  </button>
                  <span className="px-3 py-1 mx-1 text-sm text-white rounded-md bg-emerald-600">
                    1
                  </span>
                  <span className="px-3 py-1 mx-1 text-sm rounded-md bg-slate-700 text-slate-300 hover:bg-slate-600">
                    2
                  </span>
                  <span className="px-3 py-1 mx-1 text-sm rounded-md bg-slate-700 text-slate-300 hover:bg-slate-600">
                    3
                  </span>
                  <button className="flex items-center px-3 py-1 ml-2 text-sm rounded-md bg-slate-700 text-slate-300 hover:bg-slate-600">
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Resource detail drawer */}
      <AnimatePresence>
        {selectedResource && (
          <motion.div
            className="fixed inset-0 z-30 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/70"
              onClick={() => setSelectedResource(null)}
            ></div>
            <motion.div
              className="absolute inset-y-0 right-0 flex max-w-full"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="relative flex flex-col w-screen max-w-3xl">
                <div className="flex flex-col h-full py-6 overflow-y-auto shadow-xl bg-slate-800">
                  <div className="px-4 sm:px-6">
                    <div className="flex items-start justify-between pb-3 border-b border-slate-700">
                      <h2 className="text-xl font-semibold text-white">
                        Resource Details
                      </h2>
                      <button
                        className="p-1 ml-3 rounded-md bg-slate-700 hover:bg-slate-600"
                        onClick={() => setSelectedResource(null)}
                      >
                        <X className="w-6 h-6 text-white" />
                      </button>
                    </div>
                  </div>
                  <div className="relative flex-1 px-4 mt-6 sm:px-6">
                    {/* Resource details content */}
                    <div className="space-y-6">
                      <div className="relative overflow-hidden rounded-lg aspect-video">
                        <img
                          src={ selectedResource.thumbnail}
                          alt={selectedResource.title}
                          className="object-cover w-full h-full"
                        />
                        {selectedResource.type === "video" && (
                          <div className="relative w-full overflow-hidden bg-black rounded-lg aspect-video">
                            {!isPlaying ? (
                              <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/30">
                                <button
                                  className="flex items-center justify-center w-16 h-16 transition-colors rounded-full bg-emerald-600 hover:bg-emerald-700 z-9"
                                  onClick={handlePlayVideo}
                                >
                                  <Play className="w-8 h-8 ml-1 text-emerald-400 z-100" />
                                </button>
                              </div>
                            ) : (
                              <div className="absolute z-10 bottom-4 right-4">
                                <button
                                  className="flex items-center justify-center w-10 h-10 transition-colors rounded-full bg-emerald-600/70 hover:bg-emerald-700"
                                  onClick={handlePauseVideo}
                                >
                                  <Pause className="w-5 h-5 text-emerald-400" />
                                </button>
                              </div>
                            )}

                            <video
                              ref={videoRef}
                              src={
                                 fallbackVideoUrl
                              }
                              className="absolute object-cover w-full h-full z-6000"
                              onEnded={() => setIsPlaying(false)}
                              onClick={() =>
                                isPlaying
                                  ? handlePauseVideo()
                                  : handlePlayVideo()
                              }
                              playsInline
                            />
                          </div>
                        )}{" "}
                        {selectedResource.type === "audio" && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                            <motion.button
                              className="flex items-center justify-center w-16 h-16 rounded-full bg-emerald-600 hover:bg-emerald-700"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={handlePlayAudio}
                            >
                              <Play className="w-8 h-8 ml-1 text-white" />
                            </motion.button>
                            <audio
                              ref={audioRef}
                              src={selectedResource.audioSrc}
                            ></audio>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className="px-2 py-1 text-xs font-medium capitalize rounded-md bg-slate-700 text-slate-300">
                          {selectedResource.type}
                        </span>
                        {selectedResource.category && (
                          <span className="px-2 py-1 text-xs font-medium rounded-md bg-emerald-900/60 text-emerald-300">
                            {getCategoryLabel(selectedResource.category)}
                          </span>
                        )}
                        {selectedResource.level && (
                          <span className="px-2 py-1 text-xs font-medium text-blue-300 rounded-md bg-blue-900/60">
                            {selectedResource.level}
                          </span>
                        )}
                        {selectedResource.tags &&
                          selectedResource.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 text-xs font-medium rounded-md bg-slate-700 text-slate-300"
                            >
                              {tag}
                            </span>
                          ))}
                      </div>

                      <div>
                        <h1 className="mb-2 text-2xl font-bold text-white">
                          {selectedResource.title}
                        </h1>
                        <div className="flex items-center mb-4 text-sm text-slate-400">
                          {selectedResource.author && (
                            <>
                              <User className="w-4 h-4 mr-1" />
                              <span className="mr-3">
                                {selectedResource.author}
                              </span>
                            </>
                          )}
                          {selectedResource.date && (
                            <>
                              <Calendar className="w-4 h-4 mr-1" />
                              <span className="mr-3">
                                {selectedResource.date}
                              </span>
                            </>
                          )}
                          {selectedResource.duration && (
                            <>
                              <Clock className="w-4 h-4 mr-1" />
                              <span>{selectedResource.duration}</span>
                            </>
                          )}
                          {selectedResource.readTime && (
                            <>
                              <Clock className="w-4 h-4 mr-1" />
                              <span>{selectedResource.readTime}</span>
                            </>
                          )}
                        </div>

                        <div className="flex items-center mb-6 space-x-3">
                          <motion.button
                            className={`flex items-center px-3 py-1.5 rounded-md ${
                              favorites.includes(selectedResource.id)
                                ? "bg-red-600/20 text-red-400"
                                : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => toggleFavorite(selectedResource.id)}
                          >
                            <Heart
                              className={`w-4 h-4 mr-1.5 ${
                                favorites.includes(selectedResource.id)
                                  ? "fill-red-500"
                                  : ""
                              }`}
                            />
                            {favorites.includes(selectedResource.id)
                              ? "Favorited"
                              : "Add to Favorites"}
                          </motion.button>
                          <motion.button
                            className={`flex items-center px-3 py-1.5 rounded-md ${
                              bookmarks.includes(selectedResource.id)
                                ? "bg-emerald-600/20 text-emerald-400"
                                : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => toggleBookmark(selectedResource.id)}
                          >
                            <Bookmark
                              className={`w-4 h-4 mr-1.5 ${
                                bookmarks.includes(selectedResource.id)
                                  ? "fill-emerald-500"
                                  : ""
                              }`}
                            />
                            {bookmarks.includes(selectedResource.id)
                              ? "Bookmarked"
                              : "Bookmark"}
                          </motion.button>
                          <motion.button
                            className="flex items-center px-3 py-1.5 rounded-md bg-slate-700 text-slate-300 hover:bg-slate-600"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => handleShare(selectedResource, e)}
                          >
                            <Share className="w-4 h-4 mr-1.5" />
                            Share
                          </motion.button>
                        </div>

                        <div className="prose prose-invert max-w-none">
                          <p className="text-slate-300">
                            {selectedResource.description}
                          </p>
                          {selectedResource.content && (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: selectedResource.content,
                              }}
                            />
                          )}
                        </div>

                        {selectedResource.takeaways && (
                          <div className="p-4 mt-6 rounded-lg bg-slate-700/50">
                            <h3 className="mb-3 text-lg font-medium text-white">
                              Key Takeaways
                            </h3>
                            <ul className="pl-5 space-y-1 list-disc text-slate-300">
                              {selectedResource.takeaways.map(
                                (takeaway, index) => (
                                  <li key={index}>{takeaway}</li>
                                )
                              )}
                            </ul>
                          </div>
                        )}

                        {selectedResource.steps && (
                          <div className="mt-6">
                            <h3 className="mb-4 text-lg font-medium text-white">
                              Steps to Practice
                            </h3>
                            <div className="space-y-4">
                              {selectedResource.steps.map((step, index) => (
                                <div key={index} className="flex">
                                  <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 mr-3 rounded-full bg-emerald-900/60 text-emerald-300">
                                    <span className="text-sm font-medium">
                                      {index + 1}
                                    </span>
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-white">
                                      {step.title}
                                    </h4>
                                    <p className="text-sm text-slate-300">
                                      {step.description}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {selectedResource.resources && (
                          <div className="p-4 mt-6 rounded-lg bg-slate-700/50">
                            <h3 className="mb-3 text-lg font-medium text-white">
                              Additional Resources
                            </h3>
                            <ul className="space-y-2">
                              {selectedResource.resources.map(
                                (resource, index) => (
                                  <li key={index}>
                                    <a
                                      href={resource.url}
                                      className="flex items-center text-emerald-400 hover:text-emerald-300"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <ExternalLink className="w-4 h-4 mr-2" />
                                      {resource.title}
                                    </a>
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Comments section */}
                      <div className="pt-6 mt-6 border-t border-slate-700">
                        <h3 className="mb-4 text-lg font-medium text-white">
                          Comments
                        </h3>
                        <div className="mb-4">
                          <textarea
                            placeholder="Share your thoughts or experience..."
                            className="w-full p-3 rounded-md resize-none bg-slate-700 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            rows={3}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></textarea>
                          <motion.button
                            className="flex items-center px-4 py-2 mt-2 ml-auto text-sm font-medium text-white rounded-md bg-emerald-600 hover:bg-emerald-700"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleAddComment}
                          >
                            <MessageSquare className="w-4 h-4 mr-1.5" />
                            Add Comment
                          </motion.button>
                        </div>

                        <div className="space-y-4">
                          {comments.map((comment) => (
                            <motion.div
                              key={comment.id}
                              className="p-4 rounded-lg bg-slate-700"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 24,
                              }}
                            >
                              <div className="flex items-center mb-2">
                                <div className="flex items-center justify-center w-8 h-8 mr-2 rounded-full bg-emerald-700/50 text-emerald-300">
                                  <span className="text-sm font-medium">
                                    {comment.author.charAt(0)}
                                  </span>
                                </div>
                                <div>
                                  <span className="font-medium text-white">
                                    {comment.author}
                                  </span>
                                  <span className="ml-2 text-xs text-slate-400">
                                    {new Date(
                                      comment.timestamp
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                              <p className="text-slate-300">{comment.text}</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Related resources */}
                      <div className="pt-6 mt-6 border-t border-slate-700">
                        <h3 className="mb-4 text-lg font-medium text-white">
                          Related Resources
                        </h3>
                        <div className="grid gap-4 sm:grid-cols-2">
                          {resourcesData
                            .filter(
                              (r) =>
                                r.id !== selectedResource.id &&
                                (r.category === selectedResource.category ||
                                  r.subcategory ===
                                    selectedResource.subcategory)
                            )
                            .slice(0, 2)
                            .map((resource) => (
                              <motion.div
                                key={resource.id}
                                className="flex overflow-hidden transition-shadow rounded-lg cursor-pointer bg-slate-700 hover:shadow-lg hover:shadow-emerald-900/20"
                                whileHover={{ y: -5 }}
                                onClick={() => {
                                  setSelectedResource(resource);
                                  window.scrollTo(0, 0);
                                }}
                              >
                                <div className="relative w-24 h-24 overflow-hidden">
                                  <img
                                    src={resource.thumbnail || resource.image}
                                    alt={resource.title}
                                    className="object-cover w-full h-full"
                                  />
                                  {resource.type === "video" && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                      <PlayCircle className="w-8 h-8 text-white" />
                                    </div>
                                  )}
                                  {resource.type === "audio" && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                      <Headphones className="w-8 h-8 text-white" />
                                    </div>
                                  )}
                                </div>
                                <div className="flex-1 p-3">
                                  <div className="flex items-center mb-1 text-xs text-slate-400">
                                    <span className="capitalize">
                                      {resource.type}
                                    </span>
                                  </div>
                                  <h4 className="font-medium text-white line-clamp-2">
                                    {resource.title}
                                  </h4>
                                </div>
                              </motion.div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResourcesPage;
