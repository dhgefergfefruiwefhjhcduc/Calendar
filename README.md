# Premium Interactive Wall Calendar

A high-fidelity, production-quality digital wall calendar experience built with **Next.js**, **Tailwind CSS 4**, and **Framer Motion**. Designed for a single-viewport (scroll-free) environment with a focus on Indian cultural context, vibrant glassmorphism, and fluid 3D animations.

![Project Overview](https://img.shields.io/badge/Powered%20By-Next.js-black?style=for-the-badge&logo=next.js)
![Styling](https://img.shields.io/badge/Styling-Tailwind%20CSS%204-38B2AC?style=for-the-badge&logo=tailwind-css)
![Animations](https://img.shields.io/badge/Animations-Framer%20Motion-0055FF?style=for-the-badge&logo=framer)

## ✨ Core Features

### 🗓️ Dynamic Viewport Layout
- **Scroll-Free Interface**: Designed to fit perfectly within a single screen (No Scroll UX), maximizing visibility of the calendar and schedule panels simultaneously.
- **Responsive Sizing**: Automatically balances grid dimensions and side panels for an immersive experience across different monitor sizes.
- **Glassmorphism Aesthetic**: Deep-mesh backgrounds combined with translucent, blurred surfaces for a state-of-the-art "digital glass" feel.

### ☸️ Indian Seasonal Branding
- **Cultural Mapping**: Features dynamic seasonal logic based on the Indian calendar (Vasant, Sharad, Hemant, Monsoon, etc.).
- **Panoramic Hero**: A high-resolution seasonal header that cross-fades based on the current month, providing instant atmospheric context.

### ⚡ Advanced Interaction & Persistence
- **Range Selection**: Supports intuitive start/end date selection with subtle, professional indigo highlights.
- **Real-Time Schedule Flow**: An "Active Date" tracking system ensures the schedule box always follows your most recent click, even within a range.
- **Persistent Storage**: All monthly goals and daily schedules are stored locally via `localStorage`, ensuring data persists across browser restarts without a backend.
- **High-Contrast Navigation**: A sleek, centered modal picker for rapid jumps to any month or year across the decade.

## 🛠️ Technical Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) (Standardized CSS-variable theme engine)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) (Staggered reveals, 3D month flips, interactive hovers)
- **Date Handling**: [date-fns](https://date-fns.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone [your-repo-url]
   ```
2. Navigate to the project directory:
   ```bash
   cd website
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### Deployment
Build the production bundle:
```bash
npm run build
```

## 📂 Project Structure

- `/app`: Next.js App Router and global styling.
- `/components`: Modular UI components (CalendarGrid, DayCell, HeroSection, NotesPanel).
- `/hooks`: Custom state logic for persistence and calendar math.
- `/utils`: Date formatting, Indian seasonal mapping, and holiday data.
- `/public/images`: Local high-resolution seasonal assets.

---

> [!TIP]
> This calendar is optimized for full-screen desktop viewing (1920x1080 or higher) to fully experience the glassmorphic depth and panoramic seasonal scenes.
