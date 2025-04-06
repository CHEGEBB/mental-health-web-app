"use client";
import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import {
  Mic,
  MicOff,
  Smile,
  Frown,
  Meh,
  BookOpen,
  Tag,
  Clock,
  Calendar,
  BarChart2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Save,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Image,
  Send,
  X,
  Check,
  HelpCircle,
  Heart,
  Edit3,
  Sun,
  Moon,
  Coffee,
  Cloud,
  Droplet,
  Wind,
  Umbrella,
  Menu,
  Trash2,
  AlertCircle,
} from "lucide-react";
import { format } from "date-fns";
import toast from "react-hot-toast";
// Dynamically import components that use browser APIs
const Sidebar = dynamic(() => import("../components/Sidebar"), { ssr: false });

// Import the service only on the client
let journalService;
if (typeof window !== "undefined") {
  journalService = require("../services/journalService").default;
}

const JournalPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState("journal");
  const [isRecording, setIsRecording] = useState(false);
  const [journalContent, setJournalContent] = useState("");
  const [journalTitle, setJournalTitle] = useState("");
  const [mood, setMood] = useState(null);
  const [showTagMenu, setShowTagMenu] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [journalHistory, setJournalHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showAIHelp, setShowAIHelp] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [weather, setWeather] = useState("sunny");
  const [entryDate, setEntryDate] = useState(null);
  const [saveStatus, setSaveStatus] = useState(null);
  const [currentEntryId, setCurrentEntryId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [aiMode, setAiMode] = useState(false);
  const [aiThinking, setAiThinking] = useState(false);
  const [resources, setResources] = useState([]);

  const journalInputRef = useRef(null);
  const voiceRecognition = useRef(null);

  // Initialize date on client only
  useEffect(() => {
    setEntryDate(new Date());
  }, []);

  // Load journal entries from backend - only on client
  useEffect(() => {
    if (typeof window !== "undefined" && journalService) {
      fetchJournalEntries();
    }
  }, []);

  const fetchJournalEntries = async () => {
    try {
      setIsLoading(true);
      const entries = await journalService.getEntries();
      setJournalHistory(entries);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching journal entries:", error);
      setError(error.message || "Failed to load journal entries");
      setIsLoading(false);
      toast.error("Failed to load journal entries");
    }
  };

  // Simulating voice recording functionality
  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    // Mock implementation - in real app would use Web Speech API
    console.log("Started recording...");
    // Add text as if transcribing after 2 seconds
    setTimeout(() => {
      setJournalContent(
        (prev) =>
          prev +
          " I'm feeling a bit mixed today. Some good things happened at work, but I'm also feeling some anxiety about upcoming deadlines."
      );
    }, 2000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    console.log("Stopped recording");
  };

  // List of available tags
  const availableTags = [
    { id: "anxiety", label: "Anxiety", color: "bg-red-100 text-red-800" },
    {
      id: "depression",
      label: "Depression",
      color: "bg-blue-100 text-blue-800",
    },
    {
      id: "happy",
      label: "Happy Moment",
      color: "bg-green-100 text-green-800",
    },
    { id: "stress", label: "Stress", color: "bg-orange-100 text-orange-800" },
    {
      id: "sleep",
      label: "Sleep Issue",
      color: "bg-purple-100 text-purple-800",
    },
    { id: "gratitude", label: "Gratitude", color: "bg-teal-100 text-teal-800" },
    { id: "work", label: "Work", color: "bg-gray-100 text-gray-800" },
    {
      id: "relationships",
      label: "Relationships",
      color: "bg-pink-100 text-pink-800",
    },
    {
      id: "exercise",
      label: "Exercise",
      color: "bg-indigo-100 text-indigo-800",
    },
    {
      id: "nutrition",
      label: "Nutrition",
      color: "bg-yellow-100 text-yellow-800",
    },
  ];

  const toggleTag = (tagId) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((id) => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  const getTagColor = (tagId) => {
    const tag = availableTags.find((tag) => tag.id === tagId);
    return tag ? tag.color : "bg-gray-100 text-gray-800";
  };

  const getTagLabel = (tagId) => {
    const tag = availableTags.find((tag) => tag.id === tagId);
    return tag ? tag.label : tagId;
  };

  const handleSaveJournal = async () => {
    if (!journalContent.trim()) {
      toast.error("Journal content cannot be empty");
      return;
    }

    try {
      setSaveStatus("saving");

      const entryData = {
        title:
          journalTitle ||
          `Journal Entry - ${
            entryDate ? format(entryDate, "MMM dd, yyyy") : "New Entry"
          }`,
        content: journalContent,
        mood: mood || "neutral",
        tags: selectedTags,
        isPrivate: true,
      };

      let updatedEntry;

      if (currentEntryId) {
        // Update existing entry
        updatedEntry = await journalService.updateEntry(
          currentEntryId,
          entryData
        );
        toast.success("Journal entry updated successfully");
      } else {
        // Create new entry
        updatedEntry = await journalService.createEntry(entryData);
        toast.success("Journal entry saved successfully");
      }

      // Refresh journal history
      await fetchJournalEntries();

      // Update current entry ID
      setCurrentEntryId(updatedEntry._id);

      setSaveStatus("saved");

      // Reset after a few seconds
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (error) {
      console.error("Error saving journal entry:", error);
      setSaveStatus(null);
      toast.error(error.message || "Failed to save journal entry");
    }
  };

  const loadJournalEntry = async (entryId) => {
    try {
      setIsLoading(true);
      const entry = await journalService.getEntry(entryId);

      setJournalTitle(entry.title);
      setJournalContent(entry.content);
      setMood(entry.mood);
      setSelectedTags(entry.tags);
      setEntryDate(new Date(entry.createdAt));
      setCurrentEntryId(entry._id);
      setShowHistory(false);
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading journal entry:", error);
      setIsLoading(false);
      toast.error("Failed to load journal entry");
    }
  };

  const handleDeleteEntry = async (entryId) => {
    try {
      if (
        window.confirm("Are you sure you want to delete this journal entry?")
      ) {
        await journalService.deleteEntry(entryId);

        // If the deleted entry is the current one, reset the form
        if (entryId === currentEntryId) {
          handleNewEntry();
        }

        // Refresh journal history
        await fetchJournalEntries();
        toast.success("Journal entry deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting journal entry:", error);
      toast.error("Failed to delete journal entry");
    }
  };

  const handleNewEntry = () => {
    setJournalTitle("");
    setJournalContent("");
    setMood(null);
    setSelectedTags([]);
    setEntryDate(new Date());
    setCurrentEntryId(null);
    setShowHistory(false);
  };

 // Replace or update the aiResources object

const aiResources = {
  anxiety: [
    { type: 'link', title: 'Anxiety Coping Techniques', url: 'https://www.mind.org.uk/information-support/types-of-mental-health-problems/anxiety-and-panic-attacks/self-care/' },
    { type: 'hotline', title: 'Anxiety Support Hotline', number: '1-800-950-6264' },
    { type: 'meme', title: 'Anxiety Cat', image: 'https://images.pexels.com/photos/8889333/pexels-photo-8889333.jpeg?auto=compress&cs=tinysrgb&w=400' }
  ],
  depression: [
    { type: 'link', title: 'Depression Self-Care Guide', url: 'https://www.helpguide.org/articles/depression/coping-with-depression.htm' },
    { type: 'hotline', title: 'Depression Helpline', number: '1-800-273-8255' },
    { type: 'meme', title: 'Supportive Sloth', image: 'https://media1.tenor.com/m/AzmzzMRvQzQAAAAC/zootopia-sloth.gif' }
  ],
  anger: [
    { type: 'link', title: 'Managing Anger Effectively', url: 'https://www.apa.org/topics/anger/control' },
    { type: 'technique', title: 'Progressive Muscle Relaxation', description: 'Tense and then relax each muscle group, starting from toes to head' },
    { type: 'meme', title: 'Calm Down Cat', image: 'https://images.pexels.com/photos/127028/pexels-photo-127028.jpeg?auto=compress&cs=tinysrgb&w=400' }
  ],
  stress: [
    { type: 'link', title: 'Stress Management Techniques', url: 'https://www.health.harvard.edu/mind-and-mood/six-relaxation-techniques-to-reduce-stress' },
    { type: 'app', title: 'Headspace', description: 'Meditation and mindfulness app' },
    { type: 'meme', title: 'Stress Relief Dog', image: 'https://images.pexels.com/photos/1629781/pexels-photo-1629781.jpeg?auto=compress&cs=tinysrgb&w=400' }
  ],
  sad: [
    { type: 'link', title: 'Coping with Sadness', url: 'https://www.psychologytoday.com/us/blog/in-practice/201801/feeling-sad-try-these-8-ways-actively-combat-unhappiness' },
    { type: 'video', title: 'Cute Animal Videos', url: 'https://www.youtube.com/results?search_query=cute+animals' },
    { type: 'meme', title: 'Happy Puppy', image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400' }
  ],
  lonely: [
    { type: 'link', title: 'Overcoming Loneliness', url: 'https://www.mind.org.uk/information-support/tips-for-everyday-living/loneliness/about-loneliness/' },
    { type: 'app', title: 'Meetup', description: 'Find local groups and events' },
    { type: 'meme', title: 'Friendship Cat', image: 'https://images.pexels.com/photos/1828875/pexels-photo-1828875.jpeg?auto=compress&cs=tinysrgb&w=400' }
  ],
  happy: [
    { type: 'link', title: 'Practicing Gratitude', url: 'https://greatergood.berkeley.edu/article/item/how_gratitude_changes_you_and_your_brain' },
    { type: 'journal', title: 'Happiness Journal Prompts', description: '1. What made you smile today? 2. What are you looking forward to?' },
    { type: 'meme', title: 'Celebration Dog', image: 'https://images.pexels.com/photos/58997/pexels-photo-58997.jpeg?auto=compress&cs=tinysrgb&w=400' }
  ],
  overwhelmed: [
    { type: 'link', title: 'Managing Overwhelm', url: 'https://www.verywellmind.com/how-to-deal-with-feeling-overwhelmed-3144561' },
    { type: 'technique', title: 'Box Breathing', description: 'Breathe in for 4, hold for 4, out for 4, hold for 4' },
    { type: 'meme', title: 'Calm Llama', image: 'https://images.pexels.com/photos/2253609/pexels-photo-2253609.jpeg?auto=compress&cs=tinysrgb&w=400' }
  ],
  grateful: [
    { type: 'link', title: 'Benefits of Gratitude', url: 'https://www.health.harvard.edu/healthbeat/giving-thanks-can-make-you-happier' },
    { type: 'journal', title: 'Gratitude Prompts', description: 'List 3 things youre grateful for today, no matter how small' },
    { type: 'meme', title: 'Grateful Cat', image: 'https://images.pexels.com/photos/2558605/pexels-photo-2558605.jpeg?auto=compress&cs=tinysrgb&w=400' }
  ],
  tired: [
    { type: 'link', title: 'Better Sleep Guide', url: 'https://www.sleepfoundation.org/sleep-hygiene/healthy-sleep-tips' },
    { type: 'technique', title: 'Progressive Relaxation', description: 'Tense and relax each muscle group to prepare for sleep' },
    { type: 'meme', title: 'Sleepy Kitten', image: 'https://images.pexels.com/photos/596590/pexels-photo-596590.jpeg?auto=compress&cs=tinysrgb&w=400' }
  ],
  disappointed: [
    { type: 'link', title: 'Coping with Disappointment', url: 'https://www.psychologytoday.com/us/blog/the-squeaky-wheel/201908/5-ways-deal-disappointment' },
    { type: 'technique', title: 'Expectation Adjustment', description: 'Write down your expectations, then revise them to be more realistic while still positive' },
    { type: 'meme', title: 'Resilient Penguin', image: 'https://images.pexels.com/photos/52509/penguins-emperor-antarctic-life-52509.jpeg?auto=compress&cs=tinysrgb&w=400' }
  ],
  jealous: [
    { type: 'link', title: 'Understanding Envy and Jealousy', url: 'https://www.apa.org/topics/emotions/jealousy' },
    { type: 'journal', title: 'Envy Reflection Prompts', description: 'What does this feeling tell me about my values? What steps can I take toward what I desire?' },
    { type: 'meme', title: 'Content Cat', image: 'https://images.pexels.com/photos/1056251/pexels-photo-1056251.jpeg?auto=compress&cs=tinysrgb&w=400' }
  ],
  frustrated: [
    { type: 'link', title: 'Managing Frustration', url: 'https://www.healthline.com/health/mental-health/how-to-deal-with-frustration' },
    { type: 'technique', title: 'The Paper Technique', description: 'Write down your frustration on paper, then physically crumple it up and throw it away' },
    { type: 'meme', title: 'Patient Turtle', image: 'https://images.pexels.com/photos/1618606/pexels-photo-1618606.jpeg?auto=compress&cs=tinysrgb&w=400' }
  ],
  embarrassed: [
    { type: 'link', title: 'Overcoming Embarrassment', url: 'https://www.verywellmind.com/what-is-embarrassment-5086504' },
    { type: 'technique', title: 'Normalization Exercise', description: 'List three examples of times others have experienced similar embarrassment' },
    { type: 'meme', title: 'Awkward Penguin', image: 'https://images.pexels.com/photos/86405/penguin-funny-blue-water-86405.jpeg?auto=compress&cs=tinysrgb&w=400' }
  ],
  insecure: [
    { type: 'link', title: 'Building Self-Confidence', url: 'https://www.mind.org.uk/information-support/types-of-mental-health-problems/self-esteem/about-self-esteem/' },
    { type: 'journal', title: 'Evidence Collection', description: 'List evidence that contradicts your negative self-belief, including accomplishments and positive feedback' },
    { type: 'meme', title: 'Confident Duckling', image: 'https://images.pexels.com/photos/132468/pexels-photo-132468.jpeg?auto=compress&cs=tinysrgb&w=400' }
  ],
  nostalgic: [
    { type: 'link', title: 'The Psychology of Nostalgia', url: 'https://www.psychologytoday.com/us/blog/mind-tapestry/202012/the-psychology-nostalgia' },
    { type: 'technique', title: 'Memory Integration', description: 'Identify values from cherished memories and find ways to express them in your present life' },
    { type: 'meme', title: 'Reflective Fox', image: 'https://images.pexels.com/photos/2295744/pexels-photo-2295744.jpeg?auto=compress&cs=tinysrgb&w=400' }
  ],
  impatient: [
    { type: 'link', title: 'Cultivating Patience', url: 'https://www.mindful.org/how-to-practice-patience/' },
    { type: 'technique', title: '5-4-3-2-1 Grounding', description: 'Notice 5 things you see, 4 you can touch, 3 you hear, 2 you smell, and 1 you taste' },
    { type: 'meme', title: 'Waiting Sloth', image: 'https://images.pexels.com/photos/1109558/pexels-photo-1109558.jpeg?auto=compress&cs=tinysrgb&w=400' }
  ],
  excited: [
    { type: 'link', title: 'Savoring Positive Emotions', url: 'https://greatergood.berkeley.edu/article/item/10_steps_to_savoring_the_good_things_in_life' },
    { type: 'journal', title: 'Anticipation Journal', description: 'Document what you are looking forward to and why it matters to you' },
    { type: 'meme', title: 'Excited Puppy', image: 'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=400' }
  ],
  surprised: [
    { type: 'link', title: 'Adapting to Unexpected Change', url: 'https://www.apa.org/topics/resilience/unexpected-change' },
    { type: 'technique', title: 'Perspective Taking', description: 'Consider three different ways to view the surprising situation' },
    { type: 'meme', title: 'Surprised Owl', image: 'https://images.pexels.com/photos/86596/owl-bird-eyes-eagle-owl-86596.jpeg?auto=compress&cs=tinysrgb&w=400' }
  ],
  powerful: [
    { type: 'link', title: 'Building Personal Empowerment', url: 'https://positivepsychology.com/empowerment/' },
    { type: 'technique', title: 'Power Pose', description: 'Stand in a confident posture for 2 minutes to boost confidence hormones' },
    { type: 'meme', title: 'Mighty Lion', image: 'https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?auto=compress&cs=tinysrgb&w=400' }
  ],
  curious: [
    { type: 'link', title: 'The Benefits of Curiosity', url: 'https://www.health.harvard.edu/blog/the-power-of-curiosity-2018102115212' },
    { type: 'technique', title: 'Question Collection', description: 'Start a collection of interesting questions to explore when you have time' },
    { type: 'meme', title: 'Curious Cat', image: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=400' }
  ],
  tired: [
    { type: 'link', title: 'Better Sleep Guide', url: 'https://www.sleepfoundation.org/sleep-hygiene/healthy-sleep-tips' },
    { type: 'technique', title: 'Progressive Relaxation', description: 'Tense and relax each muscle group to prepare for sleep' },
    { type: 'meme', title: 'Sleepy Kitten', image: 'https://images.pexels.com/photos/596590/pexels-photo-596590.jpeg?auto=compress&cs=tinysrgb&w=400' }
  ],
  confused: [
    { type: 'link', title: 'Decision-Making Strategies', url: 'https://www.verywellmind.com/decision-making-strategies-2795483' },
    { type: 'technique', title: 'Mind Mapping', description: 'Create a visual map of your thoughts to organize complex ideas' },
    { type: 'meme', title: 'Puzzled Dog', image: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=400' }
  ],
  hope: [
    { type: 'link', title: 'The Science of Hope', url: 'https://greatergood.berkeley.edu/article/item/the_science_of_hope' },
    { type: 'technique', title: 'Future Writing', description: 'Write a letter from your future self describing how things worked out positively' },
    { type: 'meme', title: 'Sunrise Bird', image: 'https://images.pexels.com/photos/635428/pexels-photo-635428.jpeg?auto=compress&cs=tinysrgb&w=400' }
  ],
  proud: [
    { type: 'link', title: 'Healthy Pride and Self-Esteem', url: 'https://www.psychologytoday.com/us/blog/hide-and-seek/201205/our-hierarchy-needs' },
    { type: 'journal', title: 'Achievement Journal', description: 'Document your accomplishments, big and small, to reference during difficult times' },
    { type: 'meme', title: 'Proud Eagle', image: 'https://images.pexels.com/photos/53581/bald-eagle-eagle-raptor-bird-of-prey-53581.jpeg?auto=compress&cs=tinysrgb&w=400' }
  ],
  love: [
    { type: 'link', title: 'Love Languages', url: 'https://www.mindbodygreen.com/articles/the-5-love-languages-explained' },
    { type: 'technique', title: 'Appreciation Expression', description: 'Share three specific things you appreciate about someone you care for' },
    { type: 'meme', title: 'Loving Ducks', image: 'https://images.pexels.com/photos/4871011/pexels-photo-4871011.jpeg?auto=compress&cs=tinysrgb&w=400' }
  ],
  bored: [
    { type: 'link', title: 'Creative Boredom', url: 'https://www.scientificamerican.com/article/the-power-of-boredom/' },
    { type: 'resource', title: 'Activity Jar', description: 'Fill a jar with papers listing different activities to try when bored' },
    { type: 'meme', title: 'Yawning Fox', image: 'https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg?auto=compress&cs=tinysrgb&w=400' }
  ],
  inspired: [
    { type: 'link', title: 'Nurturing Creativity', url: 'https://www.psychologytoday.com/us/blog/creative-thinkering/201901/9-ways-boost-your-creativity' },
    { type: 'technique', title: 'Idea Capture', description: 'Keep a small notebook or app handy to record ideas as they come' },
    { type: 'meme', title: 'Creative Bird', image: 'https://images.pexels.com/photos/3196662/pexels-photo-3196662.jpeg?auto=compress&cs=tinysrgb&w=400' }
  ],
  fear: [
    { type: 'link', title: 'Facing Fears', url: 'https://www.apa.org/topics/anxiety/facing-fear' },
    { type: 'technique', title: 'Fear Inventory', description: 'Rate your fear from 1-10 and list specific aspects that trigger it' },
    { type: 'meme', title: 'Brave Mouse', image: 'https://images.pexels.com/photos/9801975/pexels-photo-9801975.jpeg?auto=compress&cs=tinysrgb&w=400' }
  ],
  guilt: [
    { type: 'link', title: 'Healthy vs. Unhealthy Guilt', url: 'https://www.psychologytoday.com/us/blog/the-squeaky-wheel/201411/10-things-you-should-know-about-guilt' },
    { type: 'technique', title: 'Compassion Letter', description: 'Write a letter to yourself from the perspective of a compassionate friend' },
    { type: 'meme', title: 'Forgiveness Dove', image: 'https://images.pexels.com/photos/16910847/pexels-photo-16910847/free-photo-of-white-dove-perching-on-fence.jpeg?auto=compress&cs=tinysrgb&w=400' }
  ],
  peaceful: [
    { type: 'link', title: 'Cultivating Inner Peace', url: 'https://www.mindful.org/how-to-create-peace-of-mind/' },
    { type: 'technique', title: 'Peace Anchoring', description: 'Create a physical or mental anchor to recall peaceful states when needed' },
    { type: 'meme', title: 'Tranquil Lake', image: 'https://images.pexels.com/photos/358532/pexels-photo-358532.jpeg?auto=compress&cs=tinysrgb&w=400' }
  ]
};

  // Advanced AI response patterns
  const aiResponsePatterns = [
    {
      keywords: ["anxious", "anxiety", "worried", "nervous", "uneasy", "apprehensive", "concerned", "panicky", "restless", "jittery", "fretting", "scared", "frightened", "dread"],
      responses: [
        "I notice you're feeling anxious. 😰 This is completely normal and actually a natural response from your body. Try using the 5-4-3-2-1 grounding technique: acknowledge 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.",
        "Anxiety can feel overwhelming, but there are ways to manage it. 🌬️ Deep breathing can help calm your nervous system - try breathing in for 4 counts, holding for 2, and exhaling for 6. This activates your parasympathetic nervous system and helps reduce anxiety.",
        "When anxiety hits, it can be helpful to challenge anxious thoughts. 🧠 Ask yourself: What's the evidence for this worry? Is there another way to look at this situation? What advice would I give a friend feeling this way?",
        "Feeling anxious is challenging. 🚶‍♀️ Studies show that physical movement can help reduce anxiety. Consider a short 5-minute walk or even just standing up and stretching to help release some of that nervous energy.",
        "I'm noticing signs of anxiety in your entry. ⏱️ Sometimes setting a 'worry time' of 15 minutes to focus on your concerns can help contain them and free up the rest of your day.",
      ],
      resourceType: "anxiety",
    },
    {
      keywords: [
        "sad", "unhappy", "depressed", "down", "blue", "miserable", "heartbroken", "gloomy", "melancholy", "sorrowful", "dejected", "dismal", "despondent", "grief", "hopeless"
      ],
      responses: [
        "I'm noticing signs of sadness in your entry. 💙 Remember that emotions come in waves - they will rise and eventually subside. Be gentle with yourself during this time. Consider reaching out to someone you trust to talk about how you're feeling.",
        "Feeling down is a natural part of being human. 🚶 Research shows that even small amounts of physical activity can help improve mood by releasing endorphins. Could you try a short 10-minute walk outside today?",
        "When sadness comes, it's tempting to isolate, but connection is often what we need most. 🫂 Consider reaching out to a supportive friend or family member. Even brief social interactions can improve your mood and perspective.",
        "I see you're experiencing sadness. ✨ Consider creating a 'joy list' of small things that bring you happiness - a favorite song, a comforting drink, or a beautiful view. When feeling low, choose one item from your list to bring a moment of relief.",
        "Your writing reflects some heaviness today. 🌧️ It might help to remember that experiencing difficult emotions is part of the full spectrum of being human. What would a compassionate friend say to you right now?",
      ],
      resourceType: "sad",
    },
    {
      keywords: [
        "angry", "anger", "furious", "mad", "irritated", "frustrated", "annoyed", "aggravated", "agitated", "resentful", "enraged", "outraged", "hostile", "bitter", "exasperated", "infuriated"
      ],
      responses: [
        "I notice you're feeling angry. 😠 Anger often serves as a signal that a boundary has been crossed or a need isn't being met. When you're ready, try to identify what triggered your anger - this awareness can help you address the root cause.",
        "Anger is a natural emotion that provides energy and information. 🔥 Before responding to what's making you angry, try a cooling-down technique like taking 10 deep breaths or counting to 20. This gives your rational mind time to catch up with your emotional response.",
        "When feeling angry, your body is in fight mode, which involves tension. 💪 Try progressive muscle relaxation - tense and then release each muscle group, starting from your toes and working up to your head. This physical release can help diminish anger's intensity.",
        "I see you're experiencing anger. 🌧️ Consider using the 'RAIN' approach: Recognize the anger, Allow it to be there without judgment, Investigate what need is behind it, and Nurture yourself with understanding.",
        "Your entry shows signs of frustration. 📝 Sometimes writing a letter that you don't send can help process angry feelings in a safe way. What would you say if there were no consequences?",
      ],
      resourceType: "anger",
    },
    {
      keywords: [
        "stress", "stressed", "overwhelmed", "pressured", "tense", "burden", "swamped", "overloaded", "strained", "taxed", "overextended", "hassled", "frazzled"
      ],
      responses: [
        "I notice signs of stress in your entry. 📋 When we're stressed, our thinking can become scattered. Try breaking down what's overwhelming you into smaller, manageable tasks. What's one small step you could take today?",
        "Feeling stressed is common when facing numerous demands. 🧘 Your body's stress response can be calmed through mindfulness. Try taking a short 'mindful minute' - focus completely on your breathing for just 60 seconds to reset your nervous system.",
        "When stress accumulates, it can be helpful to distinguish between what's in your control and what isn't. ⚖️ Consider making two lists to clarify this, then focus your energy on what you can actually influence.",
        "I see you're experiencing stress. 🌳 Research shows that brief exposure to nature can significantly reduce stress hormones. If possible, try spending even 5 minutes outside today, paying attention to the natural elements around you.",
        "Your writing suggests you're feeling overwhelmed. 🛑 Sometimes we need to set boundaries and say no to additional responsibilities. Is there something you could decline or delegate right now?",
      ],
      resourceType: "stress",
    },
    {
      keywords: [
        "happy", "joy", "excited", "good", "great", "wonderful", "amazing", "delighted", "cheerful", "blissful", "content", "pleased", "elated", "jubilant", "thrilled", "ecstatic"
      ],
      responses: [
        "I'm noticing positive emotions in your entry! 😊 Savoring positive experiences can extend their benefits. Take a moment to fully absorb this good feeling - what specifically contributed to this happiness?",
        "It's wonderful to see you're experiencing joy! ✍️ Research shows that writing about positive experiences can enhance wellbeing. Consider elaborating on what went well and how it made you feel - this can help encode the positive memory more deeply.",
        "I'm detecting happiness in your writing. 🗣️ Sharing positive experiences can amplify their effect. Consider telling someone about this positive moment - it benefits both the sharer and the listener.",
        "Your entry reflects positive emotions! 🏺 Consider creating a 'joy jar' where you write down happy moments on small papers and collect them. On difficult days, you can read through these notes to remind yourself of positive experiences.",
        "Your writing radiates happiness today! 📸 Taking a mental snapshot of happy moments helps build resilience. What details about this experience would you like to remember?",
      ],
      resourceType: "happy",
    },
    {
      keywords: [
        "grateful", "thankful", "appreciation", "blessed", "gratitude", "appreciative", "fortunate", "indebted", "honored", "humbled"
      ],
      responses: [
        "I notice expressions of gratitude in your entry. 🙏 This is wonderful! Research shows that regularly practicing gratitude can improve mental health, sleep quality, and even physical health. What specifically are you feeling grateful for today?",
        "Your gratitude is apparent in this entry. 📊 Studies show that people who regularly practice gratitude experience more positive emotions and are more resilient in facing challenges. Consider making gratitude journaling a regular practice.",
        "I see you're experiencing gratitude. 🔍 To deepen this beneficial emotion, try being specific about why you're grateful for something or someone. How has it impacted your life in a positive way?",
        "Your entry reflects appreciation, which is wonderful to see. ✉️ Consider expressing your gratitude directly to someone who's made a difference in your life - research shows this strengthens relationships and enhances wellbeing for both parties.",
        "I'm noticing gratitude in your writing. 🌱 This mindset has been shown to increase happiness and life satisfaction. What three things, big or small, could you add to your gratitude list today?",
      ],
      resourceType: "grateful",
    },
    {
      keywords: ["lonely", "alone", "isolated", "disconnected", "solitary", "abandoned", "neglected", "forgotten", "alienated", "excluded", "rejected", "unwanted"],
      responses: [
        "I notice feelings of loneliness in your entry. 📱 It's important to remember that loneliness is a common human experience that many people face. Consider reaching out to someone today, even with a simple text or brief call.",
        "Feeling lonely can be challenging. 🛒 Research suggests that even small social interactions, like chatting with a cashier or neighbor, can help reduce feelings of isolation. Could you create an opportunity for a brief connection today?",
        "I see you're experiencing loneliness. 🤝 Sometimes quality matters more than quantity with social connections. Is there one person you could have a meaningful conversation with this week?",
        "Your entry suggests feelings of isolation. 👥 Consider joining a group activity aligned with your interests - whether online or in-person. Shared experiences often create natural connections with less pressure than one-on-one interactions.",
        "I'm noticing feelings of disconnection in your writing. 🌐 Technology can sometimes help bridge gaps - perhaps a video call with someone you care about could provide a sense of togetherness.",
      ],
      resourceType: "lonely",
    },
    {
      keywords: [
        "tired", "exhausted", "fatigued", "sleepy", "drained", "weary", "lethargic", "worn out", "spent", "depleted", "drowsy", "beat", "burned out"
      ],
      responses: [
        "I notice you're feeling tired. 😴 Listen to what your body is telling you - rest is essential for mental and physical wellbeing. Could you prioritize sleep tonight by going to bed 30 minutes earlier?",
        "Feeling exhausted can affect everything from mood to decision-making. 🛌 Consider evaluating your sleep hygiene - things like consistent sleep/wake times, limiting screen time before bed, and creating a restful environment can make a big difference.",
        "I see signs of fatigue in your entry. 🧠 Sometimes tiredness stems from mental rather than physical exhaustion. A brief meditation or even a 10-minute break without screens can help refresh your mental energy.",
        "Your entry reflects weariness. 🚶 While it seems counterintuitive, light physical activity like a short walk can sometimes boost energy when you're feeling drained. Hydration and proper nutrition also play key roles in energy levels.",
        "I'm noticing exhaustion in your writing. ⏱️ Sometimes our bodies need true breaks, not just switching between different types of work. Could you schedule a short period today with absolutely no productivity goals?",
      ],
      resourceType: "tired",
    },
    {
      keywords: [
        "confused", "uncertain", "unsure", "indecisive", "lost", "doubt", "puzzled", "perplexed", "baffled", "bewildered", "disoriented", "unclear", "questioning", "ambivalent"
      ],
      responses: [
        "I notice you're feeling uncertain. 📝 When facing confusion, it can help to write out all possible options without judging them. This brain dump can create clarity and make decision-making easier.",
        "Feeling unsure is common when facing complex situations. ⚖️ Consider using a pros and cons list for each option you're considering. Sometimes seeing things visually can help clarify your true preferences.",
        "I see you're experiencing doubt. 🗣️ Sometimes talking through your thoughts with someone neutral can bring clarity. Is there someone you trust who could listen without necessarily offering solutions?",
        "Your entry reflects confusion. 🧭 When feeling lost, it can help to reconnect with your values. Ask yourself what matters most to you in this situation - this can often guide you toward the right decision for you.",
        "I'm noticing some uncertainty in your writing. 🧩 Breaking down complex issues into smaller questions can sometimes make them more manageable. What's one aspect of this situation you could clarify first?",
      ],
    },
    {
      keywords: [
        "hope", "hopeful", "optimistic", "encouraged", "promising", "looking forward", "anticipation", "expectant", "upbeat", "positive", "enthusiastic", "eager", "confident", "faith"
      ],
      responses: [
        "I notice feelings of hope in your entry. 🌱 Hope can be a powerful motivator and resilience builder. What specific possibilities are you looking forward to?",
        "Your writing reflects optimism. 🔍 Research shows that visualizing positive outcomes can help motivate us toward our goals. What do you imagine might go well?",
        "I see you're feeling hopeful. 📝 Consider writing down the specific hopes you have - this can make them feel more tangible and help you notice steps toward them.",
        "Your entry contains positive anticipation. 🌟 Hope often grows when we take small actions in the direction of our desires. Is there one tiny step you could take toward what you're hoping for?",
        "I'm detecting a sense of possibility in your writing. 🧠 Our brains are naturally drawn to notice evidence that confirms our existing beliefs. What signs have you noticed that support your hopeful outlook?",
      ],
      resourceType: "happy",
    },
    {
      keywords: [
        "proud", "accomplished", "achievement", "success", "satisfied", "fulfilled", "confidence", "achievement", "mastery", "triumph", "victorious", "capable", "successful"
      ],
      responses: [
        "I notice pride in your accomplishment! 🏆 Taking time to acknowledge our achievements helps build confidence. What skills or qualities helped you succeed?",
        "Your entry reflects satisfaction with what you've accomplished. 📊 Tracking progress, even small wins, can boost motivation. How does this achievement compare to where you started?",
        "I see you're feeling proud of yourself. 🌟 This is worth celebrating! Research shows acknowledging our successes increases our resilience for future challenges. How might you celebrate this win?",
        "Your writing shows a sense of accomplishment. 🧩 Breaking down how you achieved this success can help you replicate it in the future. What specific steps led to this outcome?",
        "I'm noticing feelings of pride in your entry. 🤝 Sharing our accomplishments can inspire others. Is there someone who might benefit from hearing about your journey to success?",
      ],
      resourceType: "happy",
    },
    {
      keywords: [
        "love", "affection", "caring", "adoration", "fondness", "tenderness", "attachment", "compassion", "crush", "desire", "infatuated", "romance", "intimate", "connection", "bonded"
      ],
      responses: [
        "I notice feelings of love in your entry. ❤️ Connection is one of our deepest human needs. What qualities do you most appreciate about this person or relationship?",
        "Your writing reflects deep caring. 🤗 Research shows that quality relationships are one of the strongest predictors of happiness and wellbeing. How has this connection enriched your life?",
        "I see you're experiencing love or affection. 🌱 Nurturing relationships requires attention. What's one small way you could express your feelings to this person?",
        "Your entry shows feelings of attachment. 🔄 Healthy relationships involve a balance of giving and receiving. How do you feel supported in this connection?",
        "I'm noticing warmth and tenderness in your writing. 💌 Expressing appreciation specifically rather than generally can strengthen bonds. What's something specific you value about this person?",
      ],
      resourceType: "happy",
    },
    {
      keywords: [
        "bored", "boring", "uninterested", "monotonous", "tedious", "dull", "mundane", "repetitive", "unstimulated", "unengaged", "apathetic", "indifferent", "listless"
      ],
      responses: [
        "I notice you're feeling bored. 🧠 Boredom can actually spark creativity when we sit with it. What new idea or activity might emerge if you let your mind wander?",
        "Your entry reflects feelings of monotony. 📝 Sometimes making a list of activities you enjoy can remind you of possibilities you've forgotten. What are 5 activities that typically engage you?",
        "I see you're experiencing boredom. 🔍 This can sometimes be a signal that we're craving more meaning or purpose. What activities make you lose track of time because you're so engaged?",
        "Your writing suggests a lack of stimulation. 🌱 Learning something new activates the brain's reward system. Is there a skill or topic you've been curious about but haven't explored?",
        "I'm noticing feelings of disengagement in your entry. 🔄 Sometimes changing our routine even slightly can refresh our perspective. What's one small way you could break from your usual pattern today?",
      ],
    },
    {
      keywords: [
        "inspired", "motivated", "creative", "energized", "sparked", "stimulated", "innovative", "imaginative", "driven", "passionate", "enthusiastic", "ingenious", "resourceful"
      ],
      responses: [
        "I notice you're feeling inspired! 💡 This creative energy is precious. What specific ideas are coming to mind that you might want to capture?",
        "Your entry reflects a spark of creativity. 📝 Research shows that writing down ideas increases the likelihood of acting on them. How might you take a small step toward exploring this inspiration?",
        "I see you're feeling motivated. 🌊 Creative energy often comes in waves. What would help you ride this wave while it's here?",
        "Your writing shows creative excitement. 🔄 Inspiration often comes from unusual combinations of ideas. What connections are you making that feel fresh or unexpected?",
        "I'm noticing a sense of possibility in your entry. 🏃‍♀️ Sometimes the key to creativity is maintaining momentum. How could you schedule a short follow-up session to continue developing these ideas?",
      ],
      resourceType: "happy",
    },
    {
      keywords: [
        "fear", "afraid", "terrified", "scared", "frightened", "petrified", "horrified", "spooked", "threatened", "intimidated", "alarmed", "dreading", "panic", "terror"
      ],
      responses: [
        "I notice feelings of fear in your entry. 🧠 Fear activates our threat-response system, which can make it hard to think clearly. Taking slow, deep breaths can help calm your body's alarm system.",
        "Your writing reflects concern or fear. 🔍 Sometimes naming specific fears can help reduce their power. What exactly are you afraid might happen?",
        "I see you're experiencing fear. 🛡️ Our minds often overestimate threats and underestimate our ability to cope. What resources or strengths might help you face this challenge?",
        "Your entry shows signs of worry or fear. 📊 Consider rating your fear on a scale of 1-10 and asking: What would move this down just one point on the scale?",
        "I'm noticing anxiety or fear in your writing. 🌳 Grounding techniques can help when fear feels overwhelming. Try naming 5 things you can see right now to bring your attention back to the present moment.",
      ],
      resourceType: "anxiety",
    },
    {
      keywords: [
        "guilt", "regret", "remorse", "sorry", "apologetic", "ashamed", "blame", "fault", "responsible", "mistake", "error", "wrongdoing", "conscience", "repentant"
      ],
      responses: [
        "I notice feelings of guilt in your entry. 🔄 While uncomfortable, guilt can sometimes signal our values. What important value of yours might this feeling be connected to?",
        "Your writing reflects regret. 🧠 We're often harder on ourselves than others. How would you respond to a friend who made the same mistake?",
        "I see you're experiencing remorse. 🌱 Making amends can help transform guilt into growth. Is there a way to make things right or learn from this situation?",
        "Your entry shows signs of self-blame. ⚖️ It's helpful to distinguish between responsibility and blame. You can acknowledge your part without taking on more than your share.",
        "I'm noticing feelings of guilt in your writing. 🔍 Sometimes we confuse feeling guilty with being guilty. What evidence supports or challenges your assessment of the situation?",
      ],
    },
    {
      keywords: [
        "peaceful", "calm", "serene", "tranquil", "relaxed", "at ease", "centered", "settled", "harmonious", "balanced", "composed", "still", "quiet", "zen", "mellow"
      ],
      responses: [
        "I notice a sense of peace in your entry. 🌊 Calm moments are worth savoring. What sensations or feelings are you experiencing in this tranquil state?",
        "Your writing reflects serenity. 📝 Making note of what brings you peace can help you recreate these conditions when needed. What contributed to this calm state?",
        "I see you're experiencing tranquility. 🧘 Peaceful moments are excellent opportunities for gentle reflection. What insights or clarity might be available to you now?",
        "Your entry shows a sense of calm. 🏡 Creating an environment that supports peace can be powerful. What elements of your surroundings are contributing to this feeling?",
        "I'm noticing contentment in your writing. 🌱 Peaceful moments can be nourishing. How might you extend or revisit this feeling throughout your day?",
      ],
      resourceType: "happy",
    },
    {
      keywords: [
        "disappointed", "letdown", "disheartened", "dismayed", "disillusioned", "crestfallen", "deflated", "dissatisfied", "discouraged", "disenchanted"
      ],
      responses: [
        "I notice you're feeling disappointed. 🌧️ Disappointment often stems from unmet expectations. Taking a moment to acknowledge what you hoped would happen can help process these feelings.",
        "Your entry suggests feelings of letdown. 🧩 Sometimes adjusting expectations while still maintaining hope can create a more balanced approach. What realistic positive outcome might still be possible?",
        "I see disappointment in your writing. 📈 It can be helpful to remember that setbacks are usually temporary. What have previous disappointments taught you about resilience?",
        "Your entry reflects feelings of discouragement. 🌱 Small steps forward can rebuild momentum. What's one tiny action you could take to move in a positive direction?",
        "I'm noticing feelings of disillusionment. 🔍 Sometimes disappointment reveals important information about our values and priorities. What does this situation teach you about what matters most to you?",
      ],
      resourceType: "disappointed",
    },
    {
      keywords: [
        "jealous", "envy", "envious", "covetous", "resentful", "begrudging", "green with envy", "jealousy"
      ],
      responses: [
        "I notice feelings of jealousy in your entry. 🪞 These feelings often reflect something we desire for ourselves. What specific quality or circumstance are you drawn to?",
        "Your writing suggests envy. 🧠 It can be helpful to reframe jealousy as information about your own desires. What might this feeling be telling you about your goals or needs?",
        "I see you're experiencing jealousy. ⚖️ Comparing ourselves to others often focuses on their highlights and our struggles. What strengths or positives in your own life might you be overlooking?",
        "Your entry reflects feelings of envy. 🌱 Sometimes jealousy can motivate positive change when channeled constructively. Could this feeling guide you toward something you'd like to develop in your own life?",
        "I'm noticing jealousy in your writing. 🙏 Practicing gratitude for what we already have can help balance feelings of wanting what others possess. What's one thing you appreciate about your current circumstances?",
      ],
      resourceType: "jealous",
    },
    {
      keywords: [
        "frustrated", "hindered", "thwarted", "blocked", "impeded", "obstructed", "stymied", "stalled", "impasse", "roadblock"
      ],
      responses: [
        "I notice feelings of frustration in your entry. 🧗‍♀️ Obstacles often feel larger when we're focused on them. Taking a step back to see the larger picture can sometimes reveal alternative paths.",
        "Your writing suggests you're feeling blocked. 🔄 Sometimes a short break can reset your thinking. Could you step away briefly and return with fresh eyes?",
        "I see you're experiencing frustration. 📝 Breaking down the problem into smaller components might help identify which specific part is causing the blockage.",
        "Your entry reflects feeling stymied. 💬 Explaining the problem to someone else (or even out loud to yourself) can sometimes trigger new insights or approaches.",
        "I'm noticing frustration in your writing. 🔍 It can help to ask: 'What's within my control right now?' Focus your energy there rather than on factors you can't influence.",
      ],
      resourceType: "frustrated",
    },
    {
      keywords: [
        "embarrassed", "mortified", "humiliated", "awkward", "self-conscious", "ashamed", "discomfited", "flustered", "uncomfortable"
      ],
      responses: [
        "I notice you're feeling embarrassed. ⏱️ While embarrassment can feel intense in the moment, these feelings typically fade much faster than we expect. How might you view this situation a week from now?",
        "Your entry suggests feelings of self-consciousness. 🌍 Remember that most people are focused on their own concerns rather than scrutinizing others. This perspective can help reduce social anxiety.",
        "I see embarrassment in your writing. 🧠 It can help to remember that making mistakes and experiencing awkward moments is a universal human experience. What would you tell a friend in the same situation?",
        "Your entry reflects feeling mortified. 💪 Resilience often grows from situations that test our comfort zones. How might this experience contribute to your personal growth?",
        "I'm noticing feelings of discomfort in your writing. 🔄 Sometimes reframing embarrassment as a shared human experience rather than a personal failing can help ease these feelings.",
      ],
      resourceType: "embarrassed",
    },
    {
      keywords: [
        "insecure", "inadequate", "insufficient", "not enough", "unworthy", "inferior", "deficient", "lacking", "self-doubt"
      ],
      responses: [
        "I notice feelings of insecurity in your entry. 📊 Our minds often overemphasize our weaknesses while minimizing our strengths. What are three strengths or successes you might be overlooking?",
        "Your writing suggests self-doubt. 🧠 Insecurity often stems from comparing our internal struggles with others' external presentations. Remember that everyone has their own insecurities and challenges.",
        "I see you're feeling inadequate. 🗣️ Sometimes the critical voice in our head uses standards we'd never apply to others. How would you respond to a friend expressing these same concerns?",
        "Your entry reflects feelings of unworthiness. 📝 Making a list of times you've overcome challenges or positively impacted others can provide evidence against these negative beliefs.",
        "I'm noticing insecurity in your writing. 🌱 Self-compassion—treating yourself with the kindness you'd offer a good friend—can be a powerful antidote to feelings of inadequacy.",
      ],
      resourceType: "insecure",
    },
    {
      keywords: [
        "nostalgic", "reminiscing", "sentimental", "yearning", "longing", "wistful", "pining", "homesick", "miss", "missing"
      ],
      responses: [
        "I notice feelings of nostalgia in your entry. 📷 Nostalgia can be bittersweet but also comforting. What specific memories are bringing you this feeling?",
        "Your writing suggests sentimentality. 🌉 Nostalgia often helps us bridge our past and present. What values or meaningful elements from those memories could you incorporate into your life today?",
        "I see you're feeling wistful. 🧠 Our memories tend to highlight the positives and filter out negatives from the past. What challenges from that time might you be overlooking?",
        "Your entry reflects longing. 🌱 Sometimes nostalgia points us toward needs or desires that aren't being met in our current situation. What specifically are you missing?",
        "I'm noticing nostalgic feelings in your writing. 🔄 Reminiscing can be a way of honoring important chapters in our lives. How have these past experiences shaped who you are today?",
      ],
      resourceType: "nostalgic",
    },
    {
      keywords: [
        "impatient", "restless", "antsy", "fidgety", "agitated", "on edge", "eager", "anxious", "cant wait", "hurry"
      ],
      responses: [
        "I notice feelings of impatience in your entry. ⏱️ When we're focused solely on the future outcome, we miss the present. Are there aspects of this waiting period that could be meaningful or useful?",
        "Your writing suggests restlessness. 🧘 Mindful breathing can help ground you in the present when impatience arises. Try focusing on your breath for just 30 seconds when you notice these feelings.",
        "I see you're feeling antsy. 📝 Setting smaller milestones between now and your desired outcome can provide a sense of progress during waiting periods.",
        "Your entry reflects eagerness. 🔍 Sometimes impatience stems from uncertainty. Is there something specific you're concerned about regarding the outcome?",
        "I'm noticing impatience in your writing. 📊 It can help to zoom out and view this waiting period in the context of your larger life timeline. Will this delay matter in a month or a year?",
      ],
      resourceType: "impatient",
    },
    {
      keywords: [
        "excited", "enthusiastic", "eager", "thrilled", "animated", "exhilarated", "pumped", "stoked", "amped", "psyched", "charged"
      ],
      responses: [
        "I notice excitement in your entry! ✨ Anticipation is one of life's great pleasures. What specifically are you looking forward to about this?",
        "Your writing reflects enthusiasm. 📝 Capturing these excited feelings can be valuable. What details of this anticipation would you like to remember?",
        "I see you're feeling thrilled. 🗣️ Sharing our excitement often amplifies it. Is there someone you could tell about what you're looking forward to?",
        "Your entry shows exhilaration. 🧠 Our brains release dopamine both during anticipation and the actual experience. What aspects of the anticipation itself are you enjoying?",
        "I'm noticing genuine excitement in your writing. 🌱 This positive energy can be channeled into other areas of life too. How might you harness this enthusiasm today?",
      ],
      resourceType: "excited",
    },
    {
      keywords: [
        "surprised", "shocked", "startled", "astonished", "amazed", "stunned", "taken aback", "blindsided", "floored", "dumbfounded"
      ],
      responses: [
        "I notice surprise in your entry. 🧠 Unexpected events can take time to process properly. Giving yourself space to adjust to new information is completely normal.",
        "Your writing reflects shock. ⏱️ When surprised, our immediate reactions aren't always the same as our considered responses. How might your perspective evolve as you process this?",
        "I see you're feeling astonished. 🧭 Surprises often challenge our expectations or assumptions. What belief or expectation might need updating in light of this new information?",
        "Your entry shows you were taken aback. 📝 Writing about surprising events can help us integrate them into our understanding. What aspects of this situation are most unexpected?",
        "I'm noticing feelings of amazement in your writing. 🌱 Surprises, even challenging ones, often create growth opportunities. What might you learn from this unexpected situation?",
      ],
      resourceType: "surprised",
    },
    {
      keywords: [
        "powerful", "strong", "capable", "confident", "empowered", "robust", "mighty", "potent", "forceful", "vigorous", "influential"
      ],
      responses: [
        "I notice feelings of empowerment in your entry! 💪 This sense of capability is worth acknowledging. What specific strengths are you connecting with right now?",
        "Your writing reflects confidence. 🔄 These moments of feeling strong can be referenced during more challenging times. Consider documenting what contributed to this empowered state.",
        "I see you're feeling capable. 🌱 This confident energy often helps us take on new challenges. Is there something you'd like to tackle while feeling this sense of strength?",
        "Your entry shows a sense of personal power. 🧠 Confidence often builds upon itself through positive experiences. What action, even small, might reinforce this feeling?",
        "I'm noticing strength in your writing. 🗣️ Sometimes sharing our capabilities helps others see their own potential. Is there someone who might benefit from your example or guidance?",
      ],
      resourceType: "powerful",
    },
    {
      keywords: [
        "curious", "inquisitive", "interested", "intrigued", "fascinated", "wonder", "questioning", "eager to learn", "inquiring", "prying"
      ],
      responses: [
        "I notice curiosity in your entry. 🔍 Curiosity is a powerful driver for learning and growth. What specific aspects of this topic most interest you?",
        "Your writing reflects an inquisitive mindset. 📚 Following our natural curiosities often leads to meaningful discoveries. How might you explore this interest further?",
        "I see you're feeling intrigued. 🧠 Curiosity activates our brain's reward systems, making learning more enjoyable. What questions would you most like answered about this?",
        "Your entry shows fascination. 🔄 Curiosity often crosses different areas of interest. Are there connections between this and other topics you've been interested in?",
        "I'm noticing wonder in your writing. 📝 Documenting your questions can help direct your exploration. What are the top three things you'd like to understand about this?",
      ],
      resourceType: "curious",
    }
  ];

  // Find matching AI response for given input
  const getAIResponse = (input) => {
    const inputLower = input.toLowerCase();

    // Check each pattern for keyword matches
    for (const pattern of aiResponsePatterns) {
      for (const keyword of pattern.keywords) {
        if (inputLower.includes(keyword)) {
          // Get random response from matching pattern
          const randomIndex = Math.floor(
            Math.random() * pattern.responses.length
          );
          const response = pattern.responses[randomIndex];

          // Get resources if available
          const resources = pattern.resourceType
            ? aiResources[pattern.resourceType]
            : null;

          return { response, resources };
        }
      }
    }

    // Fallback response if no keywords match
    return {
      response:
        "Thank you for sharing your thoughts. Journaling regularly is a powerful tool for self-reflection and emotional awareness. Is there anything specific you'd like to explore further about what you've written?",
      resources: null,
    };
  };

  // Enhanced AI assistance feature
  const handleAIHelp = async () => {
    if (!aiPrompt.trim()) return;

    setAiLoading(true);
    setResources([]);

    try {
      // Simulated AI processing delay for realism
      setTimeout(() => {
        const { response, resources } = getAIResponse(aiPrompt);
        setAiResponse(response);

        if (resources) {
          setResources(resources);
        }

        setAiLoading(false);
      }, 1500);
    } catch (error) {
      console.error("Error getting AI response:", error);
      setAiLoading(false);
      toast.error("Failed to get AI assistance");
    }
  };

  // Toggle AI Mode
  const toggleAIMode = () => {
    if (!aiMode) {
      // Set AI mode to true and transition UI
      setAiMode(true);
      // Clear previous responses
      setAiResponse("");
      setResources([]);
      setAiPrompt("");

      // Simulate AI thinking for 1 second
      setAiThinking(true);
      setTimeout(() => {
        setAiThinking(false);
        setShowAIHelp(true);
      }, 1000);
    } else {
      // Revert to normal mode
      setAiMode(false);
      setShowAIHelp(false);
    }
  };

  const getWeatherIcon = () => {
    switch (weather) {
      case "sunny":
        return <Sun className="w-5 h-5 text-amber-400" />;
      case "cloudy":
        return <Cloud className="w-5 h-5 text-slate-400" />;
      case "rainy":
        return <Droplet className="w-5 h-5 text-blue-400" />;
      case "windy":
        return <Wind className="w-5 h-5 text-slate-400" />;
      case "stormy":
        return <Umbrella className="w-5 h-5 text-purple-400" />;
      default:
        return <Sun className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <div
      className={`flex h-screen font-['Poppins'] ${
        aiMode ? "bg-slate-800" : "bg-slate-600"
      } transition-colors duration-300`}
    >
      {/* Sidebar Component */}
      {typeof window !== "undefined" && (
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          activeRoute={activeRoute}
        />
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header
          className={`flex items-center justify-between px-4 py-3 shadow-sm ${
            aiMode ? "bg-indigo-900" : "bg-slate-800"
          } transition-colors duration-300 sm:px-6 lg:px-8`}
        >
          <div className="flex items-center">
            <button
              className={`p-1 mr-3 rounded-md ${
                aiMode
                  ? "text-indigo-200 hover:bg-indigo-800"
                  : "text-slate-300 hover:bg-slate-700"
              } lg:hidden`}
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1
              className={`text-xl font-semibold ${
                aiMode ? "text-indigo-100" : "text-slate-100"
              }`}
            >
              Mental Health Journal
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            {saveStatus === "saving" && (
              <span className="text-sm text-slate-300">Saving...</span>
            )}
            {saveStatus === "saved" && (
              <span className="flex items-center text-sm text-emerald-400">
                <Check className="w-4 h-4 mr-1" /> Saved
              </span>
            )}
            <button
              className={`flex items-center px-3 py-1 mr-2 text-sm font-medium rounded-md ${
                aiMode
                  ? "bg-indigo-800 text-indigo-200 hover:bg-indigo-700"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
              onClick={() => setShowHistory(!showHistory)}
            >
              <BookOpen className="w-4 h-4 mr-1" />
              {showHistory ? "Hide History" : "Journal History"}
            </button>
            <button
              className={`flex items-center px-3 py-1 mr-2 text-sm font-medium rounded-md ${
                aiMode
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "bg-purple-600 text-white hover:bg-purple-700"
              }`}
              onClick={toggleAIMode}
            >
              <Sparkles className="w-4 h-4 mr-1" />
              {aiMode ? "Exit AI Mode" : "AI Mode"}
            </button>
            <button
              className={`p-1 rounded-full ${
                aiMode
                  ? "bg-indigo-800 text-indigo-200 hover:bg-indigo-700"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
              onClick={() =>
                setWeather(weather === "sunny" ? "cloudy" : "sunny")
              }
            >
              {getWeatherIcon()}
            </button>
          </div>
        </header>

        {/* Content */}
        <main
          className={`relative flex flex-1 overflow-hidden ${
            aiMode ? "bg-slate-900" : "bg-slate-800"
          } transition-colors duration-300`}
        >
          {/* Error Alert */}
          {error && (
            <div className="absolute top-0 left-0 right-0 z-50 p-4 bg-red-500">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-white" />
                <p className="text-white">{error}</p>
                <button
                  className="ml-auto text-white"
                  onClick={() => setError(null)}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* AI Mode Transition */}
          {aiThinking && (
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-indigo-900 bg-opacity-50 backdrop-blur-sm">
              <div className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 border-4 rounded-full border-t-indigo-500 border-r-transparent border-b-indigo-500 border-l-transparent animate-spin"></div>
                <h2 className="text-2xl font-bold text-white">
                  Activating AI Expert System
                </h2>
                <p className="mt-2 text-indigo-200">
                  Loading mental health analysis framework...
                </p>
              </div>
            </div>
          )}

          {/* Journal History Sidebar */}
          {showHistory && (
            <div
              className={`absolute top-0 right-0 z-10 w-full h-full overflow-y-auto shadow-xl ${
                aiMode ? "bg-indigo-800" : "bg-slate-700"
              } md:w-96`}
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-white">
                    Journal History
                  </h2>
                  <button
                    className="text-slate-300 hover:text-slate-100"
                    onClick={() => setShowHistory(false)}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <button
                  className={`flex items-center justify-center w-full px-4 py-2 mb-4 font-medium text-white transition-colors rounded-md ${
                    aiMode
                      ? "bg-indigo-600 hover:bg-indigo-700"
                      : "bg-emerald-600 hover:bg-emerald-700"
                  }`}
                  onClick={handleNewEntry}
                >
                  <Edit3 className="w-4 h-4 mr-2" /> New Entry
                </button>

                {isLoading ? (
                  <div className="flex justify-center p-8">
                    <div
                      className={`w-8 h-8 border-4 rounded-full ${
                        aiMode
                          ? "border-t-indigo-500 border-r-transparent border-b-indigo-500 border-l-transparent"
                          : "border-t-emerald-500 border-r-transparent border-b-emerald-500 border-l-transparent"
                      } animate-spin`}
                    ></div>
                  </div>
                ) : journalHistory.length === 0 ? (
                  <div className="p-6 text-center text-slate-400">
                    <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No journal entries yet.</p>
                    <p className="mt-2 text-sm">
                      Start writing to see your entries here.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {journalHistory.map((entry) => (
                      <div
                        key={entry._id}
                        className={`p-3 transition-colors rounded-lg cursor-pointer ${
                          aiMode
                            ? "bg-indigo-900 hover:bg-indigo-700"
                            : "bg-slate-800 hover:bg-slate-600"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <h3
                            className="font-medium text-white cursor-pointer"
                            onClick={() => loadJournalEntry(entry._id)}
                          >
                            {entry.title}
                          </h3>
                          <div className="flex items-center space-x-2">
                            {entry.mood === "happy" && (
                              <Smile className="w-4 h-4 text-emerald-400" />
                            )}
                            {entry.mood === "sad" && (
                              <Frown className="w-4 h-4 text-blue-400" />
                            )}
                            {entry.mood === "anxious" && (
                              <Meh className="w-4 h-4 rotate-180 text-amber-400" />
                            )}
                            {entry.mood === "neutral" && (
                              <Meh className="w-4 h-4 text-slate-400" />
                            )}
                            {entry.mood === "angry" && (
                              <Frown className="w-4 h-4 text-red-400" />
                            )}
                            <button
                              className="p-1 text-slate-400 hover:text-red-400"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteEntry(entry._id);
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div
                          className="flex items-center mb-2 text-xs text-slate-400"
                          onClick={() => loadJournalEntry(entry._id)}
                        >
                          <Calendar className="w-3 h-3 mr-1" />
                          {format(new Date(entry.createdAt), "yyyy-MM-dd")}
                        </div>
                        <p
                          className="text-sm text-slate-300 line-clamp-2"
                          onClick={() => loadJournalEntry(entry._id)}
                        >
                          {entry.content}
                        </p>
                        {entry.tags && entry.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {entry.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className={`text-xs px-2 py-0.5 rounded-full ${getTagColor(
                                  tag
                                )}`}
                              >
                                {getTagLabel(tag)}
                              </span>
                            ))}
                            {entry.tags.length > 3 && (
                              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-600 text-slate-300">
                                +{entry.tags.length - 3}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex flex-col w-full h-full overflow-auto">
            {/* If AI Mode is active and showing AI Help, display AI interface */}
            {aiMode && showAIHelp ? (
              <div
                className={`flex flex-col flex-1 p-4 ${
                  aiMode ? "bg-indigo-900 bg-opacity-30" : ""
                } sm:p-6 lg:p-8`}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-10 h-10 bg-indigo-600 rounded-full">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div className="ml-3">
                      <h2 className="text-xl font-semibold text-white">
                        Mental Health AI Assistant
                      </h2>
                      <p className="text-sm text-indigo-200">
                        Powered by advanced pattern recognition
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex-1 p-6 mb-6 rounded-lg bg-slate-800 bg-opacity-70">
                  <div className="flex mb-4">
                    <input
                      type="text"
                      placeholder="Describe how you're feeling today..."
                      className="flex-1 px-4 py-3 text-white rounded-l-md bg-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleAIHelp()}
                    />
                    <button
                      className="px-4 py-3 text-white bg-indigo-600 rounded-r-md hover:bg-indigo-700"
                      onClick={handleAIHelp}
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center mb-6 text-xs text-indigo-200">
                    <HelpCircle className="w-3 h-3 mr-1" />
                    <span>
                      Try statements like: "I'm feeling anxious about work
                      deadlines" or "I feel sad and unmotivated today"
                    </span>
                  </div>

                  {aiLoading ? (
                    <div className="flex items-center justify-center p-10 mb-6 rounded-md bg-slate-800">
                      <div className="w-8 h-8 border-4 rounded-full border-t-indigo-500 border-r-transparent border-b-indigo-500 border-l-transparent animate-spin"></div>
                      <span className="ml-3 text-indigo-200">
                        Analyzing emotional patterns...
                      </span>
                    </div>
                  ) : aiResponse ? (
                    <div className="mb-6">
                      <div className="p-6 mb-4 rounded-lg bg-slate-900">
                        <div className="flex items-start mb-3">
                          <Sparkles className="w-5 h-5 mr-2 text-indigo-400" />
                          <span className="font-medium text-white">
                            AI Analysis
                          </span>
                        </div>
                        <p className="leading-relaxed text-slate-200">
                          {aiResponse}
                        </p>

                        <div className="flex items-center justify-end mt-4 space-x-2">
                          <button className="p-1 text-slate-400 hover:text-indigo-400">
                            <ThumbsUp className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-slate-400 hover:text-red-400">
                            <ThumbsDown className="w-4 h-4" />
                          </button>
                          <button
                            className="p-1 text-slate-400 hover:text-amber-400"
                            onClick={() => {
                              setJournalContent(
                                (prev) => prev + "\n\n" + aiResponse
                              );
                              toast.success("Response added to journal");
                            }}
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Resources Section */}
                      {resources && resources.length > 0 && (
                        <div className="p-6 bg-indigo-900 rounded-lg bg-opacity-30">
                          <h3 className="mb-4 text-lg font-medium text-white">
                            Recommended Resources
                          </h3>
                          <div className="grid gap-4 md:grid-cols-2">
                            {resources.map((resource, index) => (
                              <div
                                key={index}
                                className="p-4 rounded-lg bg-slate-800 hover:bg-slate-700"
                              >
                                {resource.type === "link" && (
                                  <div className="flex items-start">
                                    <div className="p-2 mr-3 bg-indigo-700 rounded-md">
                                      <ExternalLink className="w-4 h-4 text-white" />
                                    </div>
                                    <div>
                                      <h4 className="mb-1 font-medium text-white">
                                        {resource.title}
                                      </h4>
                                      <a
                                        href={resource.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-indigo-300 hover:text-indigo-200"
                                      >
                                        Visit Resource
                                      </a>
                                    </div>
                                  </div>
                                )}
                                {resource.type === "hotline" && (
                                  <div className="flex items-start">
                                    <div className="p-2 mr-3 rounded-md bg-emerald-700">
                                      <Phone className="w-4 h-4 text-white" />
                                    </div>
                                    <div>
                                      <h4 className="mb-1 font-medium text-white">
                                        {resource.title}
                                      </h4>
                                      <p className="text-sm text-emerald-300">
                                        {resource.number}
                                      </p>
                                    </div>
                                  </div>
                                )}
                                {resource.type === "technique" && (
                                  <div className="flex items-start">
                                    <div className="p-2 mr-3 rounded-md bg-amber-700">
                                      <Lightbulb className="w-4 h-4 text-white" />
                                    </div>
                                    <div>
                                      <h4 className="mb-1 font-medium text-white">
                                        {resource.title}
                                      </h4>
                                      <p className="text-sm text-slate-300">
                                        {resource.description}
                                      </p>
                                    </div>
                                  </div>
                                )}
                                {resource.type === "app" && (
                                  <div className="flex items-start">
                                    <div className="p-2 mr-3 bg-blue-700 rounded-md">
                                      <Smartphone className="w-4 h-4 text-white" />
                                    </div>
                                    <div>
                                      <h4 className="mb-1 font-medium text-white">
                                        {resource.title}
                                      </h4>
                                      <p className="text-sm text-slate-300">
                                        {resource.description}
                                      </p>
                                    </div>
                                  </div>
                                )}
                                {resource.type === "meme" && (
                                  <div>
                                    <h4 className="mb-2 font-medium text-white">
                                      {resource.title}
                                    </h4>
                                    <div className="overflow-hidden rounded-md bg-slate-700">
                                      <div className="aspect-w-16 aspect-h-9 bg-slate-900">
                                        <div className="flex items-center justify-center">
                                          {/* <Image
                                            src="https://media1.tenor.com/m/AzmzzMRvQzQAAAAC/zootopia-sloth.gif"
                                            width={100}
                                            height={100}
                                          /> */}
                                          {/* <span className="ml-2 text-sm text-slate-500">
                                            Supportive meme would display here
                                          </span> */}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                                {resource.type === "meme" && (
                                  <div>
                                    <h4 className="mb-2 font-medium text-white">
                                      {resource.title}
                                    </h4>
                                    <div className="overflow-hidden rounded-md bg-slate-700">
                                      <div className="h-48 bg-slate-900">
                                        {/* Use proper image rendering with error handling */}
                                        {resource.image ? (
                                          <img
                                            src={resource.image}
                                            alt={resource.title}
                                            className="object-contain w-full h-full"
                                            onError={(e) => {
                                              e.target.onerror = null;
                                              e.target.src =
                                                "../../public/assets/download.png";
                                            }}
                                          />
                                        ) : (
                                          <div className="flex items-center justify-center w-full h-full">
                                            <span className="text-sm text-slate-500">
                                              Image not available
                                            </span>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-8 text-center text-indigo-300">
                      <Sparkles className="w-12 h-12 mx-auto mb-4 text-indigo-500" />
                      <h3 className="mb-2 text-xl font-medium text-white">
                        AI Mental Health Analysis
                      </h3>
                      <p>
                        Describe how you're feeling to receive personalized
                        insights and resources.
                      </p>
                      <p className="mt-3 text-sm text-indigo-200">
                        Our pattern recognition system analyzes emotional
                        patterns to provide supportive guidance.
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex justify-end">
                  <button
                    className="px-4 py-2 text-white rounded-md bg-slate-700 hover:bg-slate-600"
                    onClick={() => {
                      setShowAIHelp(false);
                      setAiMode(false);
                    }}
                  >
                    Return to Journal
                  </button>
                </div>
              </div>
            ) : (
              // Standard Journal Interface
              <div
                className={`flex flex-col flex-1 p-4 ${
                  aiMode ? "bg-indigo-900 bg-opacity-20" : ""
                } sm:p-6 lg:p-8`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="10 absolut"></div>
                    <div className="ml-2">
                      <h2
                        className={`text-xl font-semibold ${
                          aiMode ? "text-indigo-100" : "text-white"
                        }`}
                      >
                        How are you feeling today?
                      </h2>
                      <p
                        className={`text-sm ${
                          aiMode ? "text-indigo-300" : "text-slate-400"
                        }`}
                      >
                        {entryDate
                          ? format(entryDate, "EEEE, MMMM d, yyyy")
                          : "Today"}
                      </p>
                    </div>
                  </div>

                  <div className="items-center hidden sm:flex">
                    <button
                      className={`flex items-center px-3 py-1 mr-2 text-sm font-medium rounded-md ${
                        aiMode
                          ? "bg-indigo-800 text-indigo-200 hover:bg-indigo-700"
                          : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                      }`}
                      onClick={() =>
                        aiMode
                          ? setShowAIHelp(true)
                          : setShowAIHelp(!showAIHelp)
                      }
                    >
                      <Sparkles className="w-4 h-4 mr-1" />
                      AI Help
                    </button>
                    <button
                      className={`flex items-center px-3 py-1 text-sm font-medium text-white rounded-md ${
                        aiMode
                          ? "bg-indigo-600 hover:bg-indigo-700"
                          : "bg-emerald-600 hover:bg-emerald-700"
                      }`}
                      onClick={handleSaveJournal}
                    >
                      <Save className="w-4 h-4 mr-1" />
                      {currentEntryId ? "Update Entry" : "Save Entry"}
                    </button>
                  </div>
                </div>

                {/* Mood Selection */}
                <div
                  className={`flex items-center justify-center p-4 mb-6 rounded-lg ${
                    aiMode ? "bg-indigo-800 bg-opacity-50" : "bg-slate-700"
                  }`}
                >
                  <button
                    className={`flex flex-col items-center p-2 mx-2 rounded-lg ${
                      aiMode ? "hover:bg-indigo-700" : "hover:bg-slate-600"
                    } ${
                      mood === "happy"
                        ? aiMode
                          ? "bg-indigo-700 ring-2 ring-emerald-400"
                          : "bg-slate-600 ring-2 ring-emerald-400"
                        : ""
                    }`}
                    onClick={() => setMood("happy")}
                  >
                    <Smile
                      className={`w-8 h-8 ${
                        mood === "happy"
                          ? "text-emerald-400"
                          : aiMode
                          ? "text-indigo-200"
                          : "text-slate-300"
                      }`}
                    />
                    <span
                      className={`mt-1 text-sm ${
                        mood === "happy"
                          ? "text-emerald-400"
                          : aiMode
                          ? "text-indigo-200"
                          : "text-slate-300"
                      }`}
                    >
                      Happy
                    </span>
                  </button>
                  <button
                    className={`flex flex-col items-center p-2 mx-2 rounded-lg ${
                      aiMode ? "hover:bg-indigo-700" : "hover:bg-slate-600"
                    } ${
                      mood === "neutral"
                        ? aiMode
                          ? "bg-indigo-700 ring-2 ring-slate-400"
                          : "bg-slate-600 ring-2 ring-slate-400"
                        : ""
                    }`}
                    onClick={() => setMood("neutral")}
                  >
                    <Meh
                      className={`w-8 h-8 ${
                        mood === "neutral"
                          ? "text-slate-400"
                          : aiMode
                          ? "text-indigo-200"
                          : "text-slate-300"
                      }`}
                    />
                    <span
                      className={`mt-1 text-sm ${
                        mood === "neutral"
                          ? "text-slate-400"
                          : aiMode
                          ? "text-indigo-200"
                          : "text-slate-300"
                      }`}
                    >
                      Neutral
                    </span>
                  </button>
                  <button
                    className={`flex flex-col items-center p-2 mx-2 rounded-lg ${
                      aiMode ? "hover:bg-indigo-700" : "hover:bg-slate-600"
                    } ${
                      mood === "sad"
                        ? aiMode
                          ? "bg-indigo-700 ring-2 ring-blue-400"
                          : "bg-slate-600 ring-2 ring-blue-400"
                        : ""
                    }`}
                    onClick={() => setMood("sad")}
                  >
                    <Frown
                      className={`w-8 h-8 ${
                        mood === "sad"
                          ? "text-blue-400"
                          : aiMode
                          ? "text-indigo-200"
                          : "text-slate-300"
                      }`}
                    />
                    <span
                      className={`mt-1 text-sm ${
                        mood === "sad"
                          ? "text-blue-400"
                          : aiMode
                          ? "text-indigo-200"
                          : "text-slate-300"
                      }`}
                    >
                      Sad
                    </span>
                  </button>
                  <button
                    className={`flex flex-col items-center p-2 mx-2 rounded-lg ${
                      aiMode ? "hover:bg-indigo-700" : "hover:bg-slate-600"
                    } ${
                      mood === "anxious"
                        ? aiMode
                          ? "bg-indigo-700 ring-2 ring-amber-400"
                          : "bg-slate-600 ring-2 ring-amber-400"
                        : ""
                    }`}
                    onClick={() => setMood("anxious")}
                  >
                    <Meh
                      className={`w-8 h-8 rotate-180 ${
                        mood === "anxious"
                          ? "text-amber-400"
                          : aiMode
                          ? "text-indigo-200"
                          : "text-slate-300"
                      }`}
                    />
                    <span
                      className={`mt-1 text-sm ${
                        mood === "anxious"
                          ? "text-amber-400"
                          : aiMode
                          ? "text-indigo-200"
                          : "text-slate-300"
                      }`}
                    >
                      Anxious
                    </span>
                  </button>
                  <button
                    className={`flex flex-col items-center p-2 mx-2 rounded-lg ${
                      aiMode ? "hover:bg-indigo-700" : "hover:bg-slate-600"
                    } ${
                      mood === "angry"
                        ? aiMode
                          ? "bg-indigo-700 ring-2 ring-red-400"
                          : "bg-slate-600 ring-2 ring-red-400"
                        : ""
                    }`}
                    onClick={() => setMood("angry")}
                  >
                    <Frown
                      className={`w-8 h-8 ${
                        mood === "angry"
                          ? "text-red-400"
                          : aiMode
                          ? "text-indigo-200"
                          : "text-slate-300"
                      }`}
                    />
                    <span
                      className={`mt-1 text-sm ${
                        mood === "angry"
                          ? "text-red-400"
                          : aiMode
                          ? "text-indigo-200"
                          : "text-slate-300"
                      }`}
                    >
                      Angry
                    </span>
                  </button>
                </div>

                {/* Journal Entry Fields */}
                <div className="flex-1 mb-6">
                  <input
                    type="text"
                    placeholder="Journal title (optional)"
                    className={`w-full px-4 py-2 mb-4 text-lg bg-transparent border-b ${
                      aiMode
                        ? "text-indigo-100 border-indigo-700 focus:border-indigo-500"
                        : "text-white border-slate-600 focus:border-emerald-500"
                    } focus:outline-none`}
                    value={journalTitle}
                    onChange={(e) => setJournalTitle(e.target.value)}
                  />

                  <div className="relative flex-1">
                    <textarea
                      ref={journalInputRef}
                      className={`w-full h-48 p-4 text-white rounded-lg resize-none ${
                        aiMode
                          ? "bg-indigo-800 bg-opacity-50 focus:ring-indigo-500"
                          : "bg-slate-700 focus:ring-emerald-500"
                      } focus:outline-none focus:ring-2`}
                      placeholder="Write about your day, thoughts, feelings, or experiences... (or click the microphone to speak)"
                      value={journalContent}
                      onChange={(e) => setJournalContent(e.target.value)}
                    />

                    <div className="absolute bottom-0 right-0 flex p-2">
                      <button
                        className={`p-2 rounded-full ${
                          isRecording
                            ? "bg-red-500 text-white"
                            : aiMode
                            ? "bg-indigo-700 text-indigo-200 hover:bg-indigo-600"
                            : "bg-slate-600 text-slate-300 hover:bg-slate-500"
                        }`}
                        onClick={toggleRecording}
                      >
                        {isRecording ? (
                          <MicOff className="w-5 h-5" />
                        ) : (
                          <Mic className="w-5 h-5" />
                        )}
                      </button>
                    </div>

                    {isRecording && (
                      <div className="absolute top-0 left-0 right-0 flex items-center justify-center w-full p-2 text-white bg-red-500 rounded-t-lg animate-pulse">
                        Recording... Speak clearly
                      </div>
                    )}
                  </div>
                </div>

                {/* Tags Section */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Tag
                        className={`w-5 h-5 mr-2 ${
                          aiMode ? "text-indigo-300" : "text-slate-300"
                        }`}
                      />
                      <h3
                        className={`text-sm font-medium ${
                          aiMode ? "text-indigo-100" : "text-white"
                        }`}
                      >
                        Tags
                      </h3>
                    </div>
                    <button
                      className={`flex items-center text-sm ${
                        aiMode
                          ? "text-indigo-300 hover:text-indigo-100"
                          : "text-slate-300 hover:text-white"
                      }`}
                      onClick={() => setShowTagMenu(!showTagMenu)}
                    >
                      {showTagMenu ? (
                        <>
                          <ChevronUp className="w-4 h-4 mr-1" /> Hide Tags
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4 mr-1" /> Browse Tags
                        </>
                      )}
                    </button>
                  </div>

                  {selectedTags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {selectedTags.map((tagId) => (
                        <div
                          key={tagId}
                          className={`flex items-center px-3 py-1 text-sm rounded-full ${getTagColor(
                            tagId
                          )}`}
                        >
                          {getTagLabel(tagId)}
                          <button
                            className="ml-1 text-slate-500 hover:text-slate-700"
                            onClick={() => toggleTag(tagId)}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {showTagMenu && (
                    <div
                      className={`p-3 rounded-lg ${
                        aiMode ? "bg-indigo-800 bg-opacity-50" : "bg-slate-700"
                      }`}
                    >
                      <div className="flex flex-wrap gap-2">
                        {availableTags.map((tag) => (
                          <button
                            key={tag.id}
                            className={`px-3 py-1 text-sm rounded-full ${
                              selectedTags.includes(tag.id)
                                ? tag.color
                                : aiMode
                                ? "bg-indigo-700 text-indigo-200"
                                : "bg-slate-600 text-slate-300"
                            } hover:opacity-80`}
                            onClick={() => toggleTag(tag.id)}
                          >
                            {tag.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons for Mobile */}
                <div className="flex items-center justify-between sm:hidden">
                  <button
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                      aiMode
                        ? "bg-indigo-800 text-indigo-200 hover:bg-indigo-700"
                        : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                    }`}
                    onClick={() =>
                      aiMode ? setShowAIHelp(true) : setShowAIHelp(!showAIHelp)
                    }
                  >
                    <Sparkles className="w-4 h-4 mr-1" />
                    AI Help
                  </button>
                  <button
                    className={`flex items-center px-3 py-2 text-sm font-medium text-white rounded-md ${
                      aiMode
                        ? "bg-indigo-600 hover:bg-indigo-700"
                        : "bg-emerald-600 hover:bg-emerald-700"
                    }`}
                    onClick={handleSaveJournal}
                  >
                    <Save className="w-4 h-4 mr-1" />
                    {currentEntryId ? "Update Entry" : "Save Entry"}
                  </button>
                </div>
              </div>
            )}

            {/* AI Help Panel in normal mode */}
            {showAIHelp && !aiMode && (
              <div
                className={`p-4 border-t ${
                  aiMode
                    ? "border-indigo-800 bg-indigo-900"
                    : "border-slate-700 bg-slate-800"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-white">
                    AI Journal Assistant
                  </h3>
                  <button
                    className="text-slate-300 hover:text-white"
                    onClick={() => setShowAIHelp(false)}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="mb-4">
                  <div className="flex mb-2">
                    <input
                      type="text"
                      placeholder="Ask for journaling prompts or mental health tips..."
                      className={`flex-1 px-4 py-2 text-white rounded-l-md ${
                        aiMode
                          ? "bg-indigo-800 focus:ring-indigo-500"
                          : "bg-slate-700 focus:ring-emerald-500"
                      } focus:outline-none focus:ring-2`}
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleAIHelp()}
                    />
                    <button
                      className={`px-4 py-2 text-white rounded-r-md ${
                        aiMode
                          ? "bg-indigo-600 hover:bg-indigo-700"
                          : "bg-emerald-600 hover:bg-emerald-700"
                      }`}
                      onClick={handleAIHelp}
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center text-xs text-slate-400">
                    <HelpCircle className="w-3 h-3 mr-1" />
                    <span>
                      Try asking: I am feeling anxious, what should I focus on?
                    </span>
                  </div>
                </div>

                {aiLoading ? (
                  <div
                    className={`flex items-center justify-center p-6 rounded-md ${
                      aiMode ? "bg-indigo-800" : "bg-slate-700"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 border-4 rounded-full ${
                        aiMode
                          ? "border-t-indigo-500 border-r-transparent border-b-indigo-500 border-l-transparent"
                          : "border-t-emerald-500 border-r-transparent border-b-emerald-500 border-l-transparent"
                      } animate-spin`}
                    ></div>
                    <span
                      className={`ml-3 ${
                        aiMode ? "text-indigo-200" : "text-slate-300"
                      }`}
                    >
                      Thinking...
                    </span>
                  </div>
                ) : aiResponse ? (
                  <div
                    className={`p-4 rounded-md ${
                      aiMode ? "bg-indigo-800" : "bg-slate-700"
                    }`}
                  >
                    <div className="flex items-start mb-2">
                      <Sparkles
                        className={`w-5 h-5 mr-2 ${
                          aiMode ? "text-indigo-400" : "text-emerald-400"
                        }`}
                      />
                      <span className="font-medium text-white">
                        Journal Assistant
                      </span>
                    </div>
                    <p
                      className={`${
                        aiMode ? "text-indigo-100" : "text-slate-300"
                      }`}
                    >
                      {aiResponse}
                    </p>

                    {/* Resources Section */}
                    {resources && resources.length > 0 && (
                      <div className="pt-4 mt-4 border-t border-slate-600">
                        <h4 className="mb-3 font-medium text-white">
                          Resources
                        </h4>
                        <div className="space-y-3">
                          {resources.map((resource, index) => (
                            <div
                              key={index}
                              className={`p-3 rounded ${
                                aiMode ? "bg-indigo-900" : "bg-slate-800"
                              }`}
                            >
                              {resource.type === "link" && (
                                <div className="flex items-center">
                                  <div
                                    className={`p-1 rounded ${
                                      aiMode
                                        ? "bg-indigo-700"
                                        : "bg-emerald-700"
                                    } mr-2`}
                                  >
                                    <ExternalLink className="w-4 h-4 text-white" />
                                  </div>
                                  <div>
                                    <span className="font-medium text-white">
                                      {resource.title}
                                    </span>
                                    <a
                                      href={resource.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className={`block text-sm ${
                                        aiMode
                                          ? "text-indigo-300"
                                          : "text-emerald-300"
                                      }`}
                                    >
                                      Visit Resource →
                                    </a>
                                  </div>
                                </div>
                              )}

                              {resource.type === "hotline" && (
                                <div className="flex items-center">
                                  <div
                                    className={`p-1 rounded ${
                                      aiMode ? "bg-indigo-700" : "bg-blue-700"
                                    } mr-2`}
                                  >
                                    <Phone className="w-4 h-4 text-white" />
                                  </div>
                                  <div>
                                    <span className="font-medium text-white">
                                      {resource.title}
                                    </span>
                                    <span
                                      className={`block text-sm ${
                                        aiMode
                                          ? "text-indigo-300"
                                          : "text-blue-300"
                                      }`}
                                    >
                                      {resource.number}
                                    </span>
                                  </div>
                                </div>
                              )}

                              {resource.type === "meme" && (
                                <div className="text-center">
                                  <span className="block mb-2 font-medium text-white">
                                    {resource.title}
                                  </span>
                                  <div
                                    className={`rounded p-6 text-center ${
                                      aiMode ? "bg-indigo-900" : "bg-slate-900"
                                    }`}
                                  >
                                    <span className="text-sm text-slate-400">
                                      Supportive image would appear here
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-end mt-3 space-x-2">
                      <button
                        className={`p-1 ${
                          aiMode
                            ? "text-indigo-400 hover:text-indigo-300"
                            : "text-slate-400 hover:text-emerald-400"
                        }`}
                      >
                        <ThumbsUp className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-slate-400 hover:text-red-400">
                        <ThumbsDown className="w-4 h-4" />
                      </button>
                      <button
                        className={`p-1 ${
                          aiMode
                            ? "text-indigo-400 hover:text-indigo-300"
                            : "text-slate-400 hover:text-blue-400"
                        }`}
                      >
                        <MessageCircle className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1 text-slate-400 hover:text-amber-400"
                        onClick={() => {
                          setJournalContent(
                            (prev) => prev + "\n\n" + aiResponse
                          );
                          setAiResponse("");
                          setAiPrompt("");
                          setShowAIHelp(false);
                        }}
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

// Additional components used in the AI section
const ExternalLink = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

const Phone = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const Smartphone = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
    <line x1="12" y1="18" x2="12.01" y2="18"></line>
  </svg>
);

const Lightbulb = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="9" y1="18" x2="15" y2="18"></line>
    <line x1="10" y1="22" x2="14" y2="22"></line>
    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"></path>
  </svg>
);

export default JournalPage;
