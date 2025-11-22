# Quick Start Guide

## Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   - Navigate to `http://localhost:3000`
   - The app will automatically open in your default browser

## First Steps

1. **Explore the Dashboard**
   - View your daily summary
   - Check today's classes
   - See upcoming deadlines
   - Quick access to all modules

2. **Try the Features**
   - Navigate through different modules using the top navigation
   - Toggle between light/dark mode (top right)
   - Change accent colors in Settings
   - Join communities and RSVP to events
   - Add items to canteen cart

3. **Interactive Elements**
   - Hover over cards to see animations
   - Click on stat cards to navigate
   - Use filters and search in various modules
   - Scroll to see reveal animations

## Key Features to Try

### Dashboard
- Real-time clock
- Clickable stat cards
- Today's schedule overview
- Upcoming deadlines with color coding

### Schedule
- Switch between days
- Enable notifications for classes
- View upcoming topics
- Mark absence and review topics

### Assignments
- Filter by status
- See priority indicators
- Days remaining counter
- Lab-specific instructions

### Events
- RSVP to events
- See capacity and attendance
- Filter upcoming/past events
- Days until event counter

### Communities
- Join/leave groups
- See recommended groups
- Filter by type
- View member counts

### Study Materials
- Search functionality
- Filter by subject and type
- See download counts
- Faculty attribution

### Canteen
- Browse today's specials
- Add items to cart
- Adjust quantities
- See total price

### Settings
- Toggle theme (light/dark)
- Change accent color
- Update profile
- Configure notifications

## Tips

- **Theme**: Click the moon/sun icon in the navbar to toggle dark mode
- **Navigation**: Use the top navigation bar or click stat cards on dashboard
- **Mobile**: The app is fully responsive - try resizing your browser
- **Animations**: Scroll slowly to see the reveal animations
- **Interactions**: Hover over elements to see interactive feedback

## Troubleshooting

**Port already in use?**
- Change the port in `vite.config.js` or kill the process using port 3000

**Dependencies not installing?**
- Try deleting `node_modules` and `package-lock.json`, then run `npm install` again

**Styles not loading?**
- Make sure Tailwind CSS is properly configured
- Check that `postcss.config.js` exists

## Next Steps

- Customize the demo data in `src/data/demoData.js`
- Add your own components
- Integrate with a backend API
- Deploy to production

Enjoy exploring the ELCS College ERP System! 🎓

