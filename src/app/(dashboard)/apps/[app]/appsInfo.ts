type App = {
  title: string;
  description: string;
  features: string[];
  testimonials: {
    name: string;
    feedback: string;
  }[];
};

type AppData = {
  [key: string]: App;
};

export const appData: AppData = {
  "1wxcw&89am1": {
    title: "Meditation Master",
    description: "A guided meditation app to help you relax and focus.",
    features: [
      "Guided sessions for beginners",
      "Relaxing background music",
      "Daily reminders",
      "Track your progress",
      "Customizable session lengths",
    ],
    testimonials: [
      {
        name: "Anna P.",
        feedback:
          "This app has transformed my mornings! I feel so much more focused and relaxed throughout the day.",
      },
      {
        name: "James R.",
        feedback:
          "The guided sessions are perfect for beginners like me. Highly recommend it!",
      },
      {
        name: "Mila S.",
        feedback:
          "The relaxing background music is my favorite part. It really helps me to meditate better.",
      },
      {
        name: "Olivia M.",
        feedback:
          "The daily reminders keep me on track. I’ve never been more consistent with my meditation.",
      },
      {
        name: "Liam T.",
        feedback:
          "Customizable session lengths make it easy to fit meditation into my busy schedule.",
      },
    ],
  },
  "1wxcw&89am2": {
    title: "Recipe Finder",
    description: "Discover and save recipes from around the world.",
    features: [
      "Over 1000+ recipes",
      "Save your favorite recipes",
      "Create a shopping list",
      "Nutritional information included",
      "Filter by dietary preferences",
    ],
    testimonials: [
      {
        name: "Sophia G.",
        feedback:
          "I found so many amazing recipes that I wouldn’t have discovered otherwise!",
      },
      {
        name: "Ethan B.",
        feedback:
          "The shopping list feature is a game-changer. I love how easy it is to plan meals.",
      },
      {
        name: "Isabella V.",
        feedback:
          "The variety of recipes is fantastic. There’s something for every occasion.",
      },
      {
        name: "Lucas H.",
        feedback:
          "I appreciate the nutritional information. It’s helpful to see exactly what I’m eating.",
      },
      {
        name: "Charlotte W.",
        feedback:
          "Filtering by dietary preferences has made meal planning so much easier.",
      },
    ],
  },
  "1wxcw&89am3": {
    title: "Fitness Tracker",
    description: "Track your workouts and monitor your fitness progress.",
    features: [
      "Log your workouts",
      "Track your progress",
      "Set fitness goals",
      "Connect with friends",
      "Access to workout plans",
    ],
    testimonials: [
      {
        name: "Noah K.",
        feedback:
          "This app keeps me motivated and on track with my fitness goals.",
      },
      {
        name: "Mia L.",
        feedback:
          "I love the workout plans. They’re challenging but doable, and I’m seeing great results.",
      },
      {
        name: "Oliver J.",
        feedback:
          "Being able to log my workouts and track progress is incredibly motivating.",
      },
      {
        name: "Amelia F.",
        feedback:
          "The community aspect of connecting with friends keeps me accountable.",
      },
      {
        name: "Elijah D.",
        feedback:
          "Setting fitness goals and watching my progress is the best part of this app.",
      },
    ],
  },
  "1wxcw&89am4": {
    title: "Travel Guide",
    description: "Get recommendations and travel tips for your next adventure.",
    features: [
      "Personalized destination recommendations",
      "Local tips and hidden gems",
      "Packing checklists",
      "Travel budget planner",
      "Offline access to maps",
    ],
    testimonials: [
      {
        name: "Ava M.",
        feedback:
          "The personalized recommendations were spot on. I discovered places I would have never found!",
      },
      {
        name: "William S.",
        feedback:
          "The packing checklist was a lifesaver. I didn’t forget a thing!",
      },
      {
        name: "Emily C.",
        feedback:
          "Offline maps are so handy when traveling abroad without data.",
      },
      {
        name: "Benjamin W.",
        feedback:
          "The local tips helped me explore the city like a local. I had the best experience!",
      },
      {
        name: "Harper N.",
        feedback:
          "The travel budget planner helped me stay on budget and still have an amazing trip.",
      },
    ],
  },
  "1wxcw&89am5": {
    title: "Budget Planner",
    description: "Manage your finances and plan your budget effectively.",
    features: [
      "Track your expenses",
      "Set savings goals",
      "Create custom budget categories",
      "Visualize your spending habits",
      "Detailed financial reports",
    ],
    testimonials: [
      {
        name: "Henry F.",
        feedback:
          "This app has helped me save so much money by tracking my expenses.",
      },
      {
        name: "Ella R.",
        feedback:
          "Setting savings goals and reaching them has never been easier.",
      },
      {
        name: "Alexander Z.",
        feedback:
          "Custom budget categories allow me to plan my spending down to the penny.",
      },
      {
        name: "Grace T.",
        feedback:
          "Visualizing my spending habits has helped me cut unnecessary costs.",
      },
      {
        name: "Sebastian P.",
        feedback:
          "The detailed financial reports are perfect for keeping track of where my money goes.",
      },
    ],
  },
  "1wxcw&89am6": {
    title: "Learning Hub",
    description:
      "Explore a wide range of online courses and educational resources.",
    features: [
      "Access to thousands of courses",
      "Learn at your own pace",
      "Certificates upon course completion",
      "Interactive learning modules",
      "Course recommendations",
    ],
    testimonials: [
      {
        name: "Jack B.",
        feedback:
          "I’ve learned so much from the courses available. Highly recommend it to anyone looking to learn new skills.",
      },
      {
        name: "Scarlett Y.",
        feedback:
          "The interactive modules make learning so much more engaging.",
      },
      {
        name: "Samuel O.",
        feedback: "The ability to learn at my own pace is a huge plus for me.",
      },
      {
        name: "Aria J.",
        feedback:
          "Getting certificates after completing courses has boosted my resume.",
      },
      {
        name: "Daniel K.",
        feedback:
          "Course recommendations have helped me find exactly what I need to learn.",
      },
    ],
  },
  "1wxcw&89am7": {
    title: "News Digest",
    description:
      "Stay updated with the latest news and headlines from around the world.",
    features: [
      "Daily news updates",
      "Personalized news feed",
      "Breaking news alerts",
      "Save articles for later",
      "In-depth analysis",
    ],
    testimonials: [
      {
        name: "Victoria M.",
        feedback:
          "I stay informed with the daily news updates. It’s become part of my morning routine.",
      },
      {
        name: "Matthew I.",
        feedback:
          "The personalized news feed keeps me updated on topics I care about most.",
      },
      {
        name: "Evelyn G.",
        feedback: "Breaking news alerts help me stay ahead of the curve.",
      },
      {
        name: "Joseph Q.",
        feedback:
          "I love being able to save articles and read them when I have time.",
      },
      {
        name: "Luna S.",
        feedback:
          "The in-depth analysis is second to none. I trust the information I get from this app.",
      },
    ],
  },
  "1wxcw&89am8": {
    title: "Photo Editor Pro",
    description: "Enhance and edit your photos with professional tools.",
    features: [
      "Advanced editing tools",
      "Customizable filters",
      "Retouch and enhance photos",
      "Create collages",
      "High-resolution export",
    ],
    testimonials: [
      {
        name: "Levi N.",
        feedback:
          "This app takes my photos to the next level. The editing tools are top-notch.",
      },
      {
        name: "Abigail L.",
        feedback:
          "The customizable filters let me create the exact look I’m going for.",
      },
      {
        name: "David H.",
        feedback:
          "Retouching photos has never been easier. My pictures look amazing.",
      },
      {
        name: "Sofia E.",
        feedback: "Creating collages is so fun and easy with this app!",
      },
      {
        name: "Michael P.",
        feedback:
          "I love that I can export my photos in high resolution. The quality is superb.",
      },
    ],
  },
};
