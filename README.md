# MindHarmony - Mental Health Support Platform

Live link ➡️ [https://mindharmony.vercel.app/]

## Project Overview

MindHarmony is a comprehensive mental health support platform designed to help users track their emotional wellbeing, gain insights into their mental health patterns, access helpful resources, connect with professionals, and engage with a supportive community. The platform focuses on mood tracking, personalized insights, and community support features.

## Core Features

### 1. Mood Tracking & Journal System
- Daily mood logging with customizable emotion selections
- Interactive mood graphs and trend visualization
- Event tagging to connect emotions with life experiences
- Voice and text input options for journal entries
- Secure and private journaling experience

### 2. AI-Powered Analysis & Insights
- Sentiment analysis to detect emotional patterns
- Personalized recommendations based on mood data
- Early detection of concerning patterns with helpful suggestions
- Custom mental health tips based on user's unique journey

### 3. Resource Hub
- Curated articles on various mental health topics
- Guided meditation and breathing exercises
- CBT-based self-help worksheets and activities
- Educational videos and expert talks

### 4. Community Support
- Anonymous forums organized by topics
- Moderated support groups for specific concerns
- Option to share journal entries anonymously (if desired)
- Community challenges and growth activities

### 5. Therapist Connection
- Directory of licensed mental health professionals
- Appointment booking functionality
- Credential verification system
- Therapist matching based on user needs

### 6. Crisis Resources
- Emergency hotline information
- Crisis intervention resources
- Self-help techniques for difficult moments
- Quick access to immediate support options

## Technology Stack

### Frontend
- **Framework**: Next.js (React)
- **Styling**: SCSS/Sass
- **State Management**: React Context API / Redux
- **Charts**: Chart.js / D3.js for mood visualization
- **Animation**: Lottie for interactive elements

### Backend
- **Framework**: Node.js with Express
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **AI Integration**: OpenAI API for sentiment analysis
- **Storage**: AWS S3 for media storage

## Project Structure

### Frontend Structure
```
/frontend
├── app
│   ├── auth/                # Authentication (login, signup, password reset)
│   ├── components/          # Reusable UI components
│   │   ├── common/          # Buttons, inputs, cards, etc.
│   │   ├── journal/         # Journal entry components
│   │   ├── mood-tracker/    # Mood selection and tracking components
│   │   ├── navigation/      # Navigation components
│   │   ├── resources/       # Resource display components
│   │   └── community/       # Community and forum components
│   ├── dashboard/           # User dashboard
│   ├── journal/             # Journal pages
│   ├── profile/             # User profile pages
│   ├── resources/           # Resource hub pages
│   ├── community/           # Community pages
│   ├── therapists/          # Therapist connection pages
│   ├── crisis/              # Crisis resources pages
│   ├── sass/                # Global SCSS styles
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main entry page
├── public/                  # Public assets
└── next.config.js           # Next.js configuration
```

### Backend Structure
```
/backend
├── config/                  # Configuration files
├── controllers/             # Request handlers
│   ├── authController.js    # Authentication logic
│   ├── journalController.js # Journal and mood tracking
│   ├── resourceController.js # Resources management
│   ├── communityController.js # Community features
│   ├── therapistController.js # Therapist connection features
│   └── aiController.js      # AI analysis and recommendations
├── middlewares/             # Express middlewares
├── models/                  # Database models
├── routes/                  # API routes
├── services/                # Business logic
├── utils/                   # Utility functions
├── app.js                   # Express app setup
└── server.js                # Server entry point
```

## API Endpoints

### Authentication
```
POST   /api/auth/register       - Register new user
POST   /api/auth/login          - User login
POST   /api/auth/refresh        - Refresh token
GET    /api/auth/profile        - Get user profile
PUT    /api/auth/profile        - Update user profile
```

### Journal & Mood Tracking
```
POST   /api/journal/entry       - Create new journal entry
GET    /api/journal/entries     - Get user's journal entries
GET    /api/journal/entry/:id   - Get specific journal entry
PUT    /api/journal/entry/:id   - Update journal entry
DELETE /api/journal/entry/:id   - Delete journal entry

POST   /api/moods/log           - Log daily mood
GET    /api/moods/history       - Get mood history
GET    /api/moods/trends        - Get mood trends and analysis
GET    /api/moods/insights      - Get AI-generated insights
```

### Resources
```
GET    /api/resources           - Get all resources
GET    /api/resources/:id       - Get specific resource
GET    /api/resources/articles  - Get articles
GET    /api/resources/videos    - Get videos
GET    /api/resources/exercises - Get self-help exercises
```

### Community
```
GET    /api/community/forums           - Get all forums
GET    /api/community/forums/:id       - Get specific forum
GET    /api/community/threads/:forumId - Get forum threads
GET    /api/community/thread/:id       - Get specific thread
POST   /api/community/thread           - Create new thread
POST   /api/community/comment          - Post comment
GET    /api/community/groups           - Get support groups
POST   /api/community/groups/join/:id  - Join support group
```

### Therapist Connection
```
GET    /api/therapists              - Get list of therapists
GET    /api/therapists/:id          - Get therapist details
GET    /api/appointments            - Get user's appointments
POST   /api/appointments            - Book new appointment
DELETE /api/appointments/:id        - Cancel appointment
```

### Crisis Support
```
GET    /api/crisis/hotlines         - Get crisis hotlines
GET    /api/crisis/resources        - Get emergency resources
```

## Implementation Strategy

### Phase 1: Core Features (4 weeks)
- Setup project structure and configurations
- Implement authentication system
- Develop journal entry and mood tracking features
- Create the basic dashboard with mood visualization

### Phase 2: AI Analysis & Resources (3 weeks)
- Implement AI analysis for journal entries
- Develop resource hub with articles and exercises
- Enhance dashboard with basic insights
- Add mood trends visualization

### Phase 3: Community & Therapist Support (4 weeks)
- Build community forums and support groups
- Implement therapist connection functionality
- Add appointment booking system
- Develop crisis help resources

### Phase 4: Refinement & Additional Features (2 weeks)
- Implement privacy enhancements
- Add advanced AI recommendations
- Optimize for mobile responsiveness
- Final testing and quality assurance
- Prepare for deployment

## Privacy & Security Considerations
- End-to-end encryption for journal entries
- Secure authentication with JWT
- Anonymized data for community sharing
- Two-factor authentication option
- GDPR and HIPAA compliance measures
- Regular security audits

## Future Enhancements
- Mobile app versions (iOS/Android)
- Integration with wearable devices for physical health metrics
- Advanced AI chatbot for guided exercises
- Gamification elements for consistent engagement
- Expanded therapist resources and matching algorithms
