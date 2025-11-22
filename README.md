# ELCS - Student-First College ERP System

A modern, aesthetic, and student-friendly College ERP web application designed to solve the typical chaos students face at college. Built with React, featuring interactive visuals, smooth animations, and scroll effects.

## 🎨 Features

### Core Modules

1. **Dashboard**
   - Daily summary with classes, deadlines, upcoming events, and messages
   - Real-time clock and date display
   - Quick action cards
   - Visual statistics with gradient cards

2. **Interactive Class Schedule**
   - Day-wise timetable view
   - Upcoming topics preview for each class
   - Notification toggle for class updates
   - Absence tracking with topic review marking
   - Class details sidebar with interactive elements

3. **Assignment & Lab Reminders**
   - Smart reminders for homework, projects, and lab work
   - Priority-based filtering (high, medium, low)
   - Status tracking (pending, in-progress, completed)
   - Lab-specific instructions display
   - Days remaining counter with color coding
   - Overdue assignments highlighting

4. **Events & Workshops**
   - Centralized listing of all college events
   - RSVP/attendance tracking
   - Event type categorization (festival, workshop, seminar, competition)
   - Capacity tracking and full event indicators
   - Days until event counter

5. **Communities/Groups**
   - College-wide announcements group
   - Branch/department groups for academic discussions
   - Year/class-wise groups for peer connections
   - Club-based groups auto-organized by interest/branch
   - Join/leave functionality with member count
   - Recommended groups based on student profile

6. **Study Material Repository**
   - Subject-wise organization
   - Search and filter functionality
   - Material type categorization (notes, manuals, guides)
   - Download tracking
   - Faculty upload information

7. **Canteen Menu**
   - Live "Today's Special" menu
   - Category filtering (main, snack, beverage)
   - Shopping cart functionality
   - Availability status
   - Price display and order total

8. **Customizable Theme**
   - Light/dark mode toggle
   - 6 accent color options (blue, purple, pink, green, orange, red)
   - Persistent theme preferences
   - Smooth theme transitions

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ELCS
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🛠️ Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Navigation
- **Framer Motion** - Animations and transitions
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **date-fns** - Date manipulation

## 📁 Project Structure

```
ELCS/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Interactive navigation bar
│   │   └── ScrollReveal.jsx    # Scroll animation component
│   ├── context/
│   │   └── ThemeContext.jsx    # Theme management
│   ├── data/
│   │   └── demoData.js         # Demo data for all modules
│   ├── pages/
│   │   ├── Dashboard.jsx       # Main dashboard
│   │   ├── Schedule.jsx        # Class schedule
│   │   ├── Assignments.jsx    # Assignments & labs
│   │   ├── Events.jsx         # Events & workshops
│   │   ├── Communities.jsx    # Groups & communities
│   │   ├── StudyMaterials.jsx # Study materials
│   │   ├── Canteen.jsx        # Canteen menu
│   │   └── Settings.jsx       # Settings page
│   ├── App.jsx                # Main app component
│   ├── main.jsx               # Entry point
│   └── index.css             # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## ✨ Interactive Features & Animations

### Navigation Bar
- Smooth scroll-based background blur
- Active tab indicator with spring animation
- Mobile-responsive hamburger menu
- Theme toggle with icon animation
- Logo rotation on hover

### Scroll Effects
- Fade-in animations on scroll
- Slide-up/slide-down effects
- Scale animations for cards
- Staggered animations for lists
- Intersection Observer-based triggers

### Interactive Visuals
- Hover effects on all cards (scale, shadow, translate)
- Gradient backgrounds with smooth transitions
- Color-coded priority indicators
- Animated stat cards
- Interactive buttons with scale feedback
- Smooth page transitions

### UI Enhancements
- Glass morphism effects
- Gradient text effects
- Custom scrollbar styling
- Smooth color transitions
- Loading states and animations

## 🎨 Design Philosophy

- **Student-First**: Designed with students' daily needs in mind
- **Modern & Clean**: No cluttered or corporate-looking interfaces
- **Intuitive**: Easy navigation and clear information hierarchy
- **Visually Appealing**: Beautiful gradients, animations, and interactive elements
- **Responsive**: Works seamlessly on desktop, tablet, and mobile devices

## 📊 Demo Data

The application includes comprehensive demo data for:
- 9 Engineering branches (based on GNITS structure)
- 10 Clubs (coding, robotics, photography, music, etc.)
- 6 Subjects with class schedules
- Multiple assignments with varying priorities
- 4 Events with different types
- Study materials organized by subject
- Canteen menu with daily specials
- Multiple community groups

## 🔐 Access Roles

Currently implemented:
- **Student**: Full access to all modules
- **Admin** (ready for implementation): Can post events, update schedules, upload study materials

## 🎯 Future Enhancements

- Backend integration with database
- Real-time notifications
- Chat functionality for groups
- File upload/download for study materials
- Payment integration for canteen orders
- Calendar sync
- Mobile app version
- Admin dashboard
- Faculty portal

## 📝 License

This project is open source and available for educational purposes.

## 👨‍💻 Development

Built with ❤️ for students, by students.

---

**Note**: This is a frontend-only application with demo data. For production use, integrate with a backend API and database.

