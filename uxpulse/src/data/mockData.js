export const initialCampaigns = [
  {
    id: "camp-001",
    title: "Checkout & Payment Flow Usability Test",
    description: "Evaluate user friction during multi-item checkout, promo code application, and payment gateway selection on our e-commerce store.",
    targetUrl: "https://example.com/checkout-demo",
    createdAt: "2026-08-18T14:20:00Z",
    status: "active",
    tasks: [
      {
        id: "t1",
        title: "Locate Item & Add to Cart",
        description: "Find the 'Wireless Headphones' product and click 'Add to Cart'. Verify item count in top navbar updates."
      },
      {
        id: "t2",
        title: "Apply Promo Code",
        description: "Open cart drawer, type promo code 'SUMMER2026' into the promo box, and click Apply. Confirm 20% discount is applied."
      },
      {
        id: "t3",
        title: "Select Express Checkout Method",
        description: "Proceed to Checkout screen and choose Apple Pay / Google Pay as express payment."
      }
    ],
    customQuestions: [
      {
        id: "q1",
        type: "nps",
        prompt: "Based on this experience, how likely are you to recommend our checkout process to a friend or colleague?"
      },
      {
        id: "q2",
        type: "seq",
        prompt: "Overall, how easy or difficult was it to complete the checkout tasks?"
      },
      {
        id: "q3",
        type: "qualitative",
        prompt: "Did you encounter any confusion or hesitation while applying the promo code?"
      },
      {
        id: "q4",
        type: "qualitative",
        prompt: "What feature or improvement would make this checkout experience 10x smoother?"
      }
    ]
  },
  {
    id: "camp-002",
    title: "SaaS Dashboard Onboarding & Navigation Audit",
    description: "Assess first-time user onboarding clarity, project workspace creation, and invite team member workflow.",
    targetUrl: "https://example.com/saas-dashboard",
    createdAt: "2026-08-19T09:15:00Z",
    status: "active",
    tasks: [
      {
        id: "t1",
        title: "Create a New Project Workspace",
        description: "Click '+ New Project' button in the sidebar, name it 'Q3 Marketing Launch', and select the Agile template."
      },
      {
        id: "t2",
        title: "Invite Teammate via Email",
        description: "Navigate to Workspace Settings -> Members, add 'alex@acme.co' with Admin role, and send invitation."
      }
    ],
    customQuestions: [
      {
        id: "q1",
        type: "nps",
        prompt: "How likely are you to recommend this SaaS onboarding flow?"
      },
      {
        id: "q2",
        type: "seq",
        prompt: "How easy was it to discover where to add new project members?"
      },
      {
        id: "q3",
        type: "qualitative",
        prompt: "Were any button labels or navigation menu titles unclear to you?"
      }
    ]
  },
  {
    id: "camp-003",
    title: "Mobile Banking App - Loan Calculator Usability",
    description: "Test user comprehension of interactive APR sliders, monthly repayment breakdown, and quick loan pre-approval form.",
    targetUrl: "https://example.com/banking-loan-calc",
    createdAt: "2026-08-19T11:00:00Z",
    status: "active",
    tasks: [
      {
        id: "t1",
        title: "Adjust Loan Amount & Term",
        description: "Drag the slider to $15,000 with a 36-month term. Check if monthly payment updates dynamically."
      },
      {
        id: "t2",
        title: "Submit Pre-Approval Request",
        description: "Tap 'Check Approval Rate', enter annual income, and review summary breakdown."
      }
    ],
    customQuestions: [
      {
        id: "q1",
        type: "nps",
        prompt: "How clear was the loan interest rate calculation and disclosure?"
      },
      {
        id: "q2",
        type: "seq",
        prompt: "How easy was it to adjust the loan amount using the slider controls?"
      }
    ]
  },
  {
    id: "camp-004",
    title: "E-Learning Platform - Course Enrollment & Video Player",
    description: "Evaluate course discovery, syllabus preview modal, and video playback speed controls for online learners.",
    targetUrl: "https://example.com/elearning-portal",
    createdAt: "2026-08-19T15:30:00Z",
    status: "active",
    tasks: [
      {
        id: "t1",
        title: "Preview Syllabus & Enroll",
        description: "Search 'Python Masterclass', open Syllabus modal, and click 'Start Free Trial'."
      },
      {
        id: "t2",
        title: "Change Video Speed & Subtitles",
        description: "In the video player controls, change speed to 1.25x and turn on English Closed Captions."
      }
    ],
    customQuestions: [
      {
        id: "q1",
        type: "nps",
        prompt: "How intuitive was the video player interface during lesson playback?"
      },
      {
        id: "q2",
        type: "qualitative",
        prompt: "Was the syllabus breakdown informative enough before committing to enrollment?"
      }
    ]
  },
  {
    id: "camp-005",
    title: "Healthcare Portal - Doctor Appointment Booking",
    description: "Archive campaign evaluating telehealth specialist search, insurance filter, and calendar slot selection.",
    targetUrl: "https://example.com/health-booking",
    createdAt: "2026-08-10T08:00:00Z",
    status: "archived",
    tasks: [
      {
        id: "t1",
        title: "Filter Specialists by Insurance",
        description: "Select 'Dermatology' specialty and filter by 'BlueCross PPO'."
      },
      {
        id: "t2",
        title: "Confirm Telehealth Time Slot",
        description: "Pick Tuesday 2:00 PM slot and confirm appointment details."
      }
    ],
    customQuestions: [
      {
        id: "q1",
        type: "seq",
        prompt: "How easy was it to filter doctors by your specific insurance provider?"
      }
    ]
  },
  {
    id: "camp-006",
    title: "AI Writing Assistant - Prompt Customization Flow",
    description: "Evaluate user speed when crafting custom tone prompts, tone sliders, and export options.",
    targetUrl: "https://example.com/ai-writer",
    createdAt: "2026-08-20T08:45:00Z",
    status: "active",
    tasks: [
      {
        id: "t1",
        title: "Generate Blog Post Outline",
        description: "Select 'Professional Tone', type topic 'Remote Work Strategies', and click Generate."
      },
      {
        id: "t2",
        title: "Export to Google Docs",
        description: "Click 'Export Options' and choose 'Send directly to Google Docs'."
      }
    ],
    customQuestions: [
      {
        id: "q1",
        type: "nps",
        prompt: "How satisfied were you with the response speed and layout of the AI outline?"
      }
    ]
  },
  {
    id: "camp-007",
    title: "Travel Booking - Multi-City Flight & Hotel Search",
    description: "Usability test for complex multi-leg itinerary search, baggage fee calculator, and seat selection map.",
    targetUrl: "https://example.com/travel-booking",
    createdAt: "2026-08-20T10:15:00Z",
    status: "active",
    tasks: [
      {
        id: "t1",
        title: "Build Multi-City Itinerary",
        description: "Add Leg 1 (NYC -> London) and Leg 2 (London -> Paris) with date pickers."
      },
      {
        id: "t2",
        title: "Select Flight & Premium Economy Seats",
        description: "Choose flight option 2 and pick seat 14A on the interactive seat grid."
      }
    ],
    customQuestions: [
      {
        id: "q1",
        type: "seq",
        prompt: "How easy was it to add a second flight leg to your travel itinerary?"
      }
    ]
  }
];

export const initialResponses = [
  {
    id: "resp-101",
    campaignId: "camp-001",
    participantName: "Sarah Jenkins",
    participantEmail: "sarah.j@techreview.io",
    completedAt: "2026-08-20T11:45:00Z",
    device: "Desktop (Chrome / macOS)",
    durationSeconds: 142,
    taskStatuses: [
      { taskId: "t1", completed: true, difficulty: "easy", note: "Found headphones immediately via header search." },
      { taskId: "t2", completed: true, difficulty: "medium", note: "The promo code apply button was slightly small, took 3 seconds to locate." },
      { taskId: "t3", completed: true, difficulty: "easy", note: "Apple Pay option was clear and instant." }
    ],
    npsScore: 9,
    seqScore: 6,
    susScore: 88,
    qualitativeAnswers: {
      "q3": "The promo code input didn't provide immediate feedback while typing, but once I clicked Apply it updated the total correctly.",
      "q4": "Show estimated shipping taxes directly on the cart drawer before proceeding to full checkout page."
    },
    sentiment: "positive",
    tags: ["Minor UI Polishing", "Promo Code Delay", "Fast Express Payment"]
  },
  {
    id: "resp-102",
    campaignId: "camp-001",
    participantName: "Marcus Vance",
    participantEmail: "marcus.v@uxlabs.com",
    completedAt: "2026-08-20T14:10:00Z",
    device: "Mobile (Safari / iPhone 15)",
    durationSeconds: 215,
    taskStatuses: [
      { taskId: "t1", completed: true, difficulty: "easy", note: "Add to cart banner worked smoothly." },
      { taskId: "t2", completed: false, difficulty: "hard", note: "Mobile keyboard covered the Promo Code input box." },
      { taskId: "t3", completed: true, difficulty: "medium", note: "Google Pay worked fine after scrolling past promo section." }
    ],
    npsScore: 6,
    seqScore: 3,
    susScore: 62,
    qualitativeAnswers: {
      "q3": "On mobile Safari, the keyboard pops up and hides the Apply button under the fold. I had to dismiss the keyboard manually to see if it worked.",
      "q4": "Auto-scroll or pin the promo code button above the mobile keyboard!"
    },
    sentiment: "negative",
    tags: ["Mobile Keyboard Blocking", "Usability Friction", "High Effort"]
  },
  {
    id: "resp-103",
    campaignId: "camp-001",
    participantName: "Elena Rostova",
    participantEmail: "elena.r@designers.org",
    completedAt: "2026-08-20T16:30:00Z",
    device: "Desktop (Firefox / Windows)",
    durationSeconds: 110,
    taskStatuses: [
      { taskId: "t1", completed: true, difficulty: "easy", note: "Super quick search." },
      { taskId: "t2", completed: true, difficulty: "easy", note: "Coupon applied 20% discount instantly." },
      { taskId: "t3", completed: true, difficulty: "easy", note: "Loved the clean payment buttons." }
    ],
    npsScore: 10,
    seqScore: 7,
    susScore: 95,
    qualitativeAnswers: {
      "q3": "No confusion at all. Very intuitive!",
      "q4": "Keep it as sleek as it is now. Great micro-animations."
    },
    sentiment: "positive",
    tags: ["High Satisfaction", "Clean Layout", "Flawless Flow"]
  },
  {
    id: "resp-104",
    campaignId: "camp-002",
    participantName: "David Kim",
    participantEmail: "dkim@startupbuilder.co",
    completedAt: "2026-08-20T18:00:00Z",
    device: "Desktop (Chrome / Windows)",
    durationSeconds: 165,
    taskStatuses: [
      { taskId: "t1", completed: true, difficulty: "easy", note: "Creating project was straightforward." },
      { taskId: "t2", completed: true, difficulty: "medium", note: "Took a bit to find Workspace Settings, expected it under User Profile avatar." }
    ],
    npsScore: 8,
    seqScore: 5,
    susScore: 78,
    qualitativeAnswers: {
      "q3": "Member invite option was in Settings -> Team, but I clicked Profile Settings first."
    },
    sentiment: "neutral",
    tags: ["Navigation Hierarchy", "Settings Location"]
  },
  {
    id: "resp-105",
    campaignId: "camp-003",
    participantName: "Michael Chang",
    participantEmail: "mchang@fintech.org",
    completedAt: "2026-08-20T19:15:00Z",
    device: "Mobile (Android / Pixel 8)",
    durationSeconds: 98,
    taskStatuses: [
      { taskId: "t1", completed: true, difficulty: "easy", note: "Slider worked nicely on mobile touchscreen." },
      { taskId: "t2", completed: true, difficulty: "easy", note: "Pre-approval form was fast." }
    ],
    npsScore: 9,
    seqScore: 7,
    susScore: 90,
    qualitativeAnswers: {
      "q1": "Repayment calculation was crystal clear."
    },
    sentiment: "positive",
    tags: ["Smooth Mobile Slider", "Clear Financials"]
  }
];
