# Sanad Nassar — Portfolio

Personal developer portfolio built with React, Three.js, Framer Motion, and Tailwind CSS.

**Live Site:** [sanadnassar.github.io/portfolio](https://sanadnassar.github.io/portfolio)

---

## Tech Stack

- **Core:** React 19, Vite
- **3D & Graphics:** Three.js, React Three Fiber, `@react-three/drei`
- **Styling & Motion:** Tailwind CSS v4, Framer Motion

## Project Structure

```text
├── public/
│   ├── model.glb          # 3D hero asset
│   └── resume.pdf         # Served directly for preview & download
└── src/
    ├── App.jsx            # Root layout, intro scroll-lock & resume modal state
    ├── Navbar.jsx         # Fixed frosted-glass navigation bar
    ├── HeroSection.jsx    # 3D canvas, camera intro rig & bio typography
    ├── Model.jsx          # Procedural PBR materials & cursor-tracking rig
    ├── ProjectCarousel.jsx# Dual-tab Projects/Experience Framer Motion carousel
    ├── ProjectsData.jsx   # Centralized project and experience data
    ├── SkillsSection.jsx  # Asymmetric bento grid with spotlight cards
    ├── ContactSection.jsx # Availability status, copy/mailto bar & footer
    ├── ResumeModal.jsx    # Desktop PDF viewer overlay
    └── index.css          # Tailwind v4 theme, custom SVG cursor & keyframes