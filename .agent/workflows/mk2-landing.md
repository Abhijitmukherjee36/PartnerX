---
description: Revert landing page to mk2 (premium testimonial carousel with animated counter)
---

# MK2 Landing Page Checkpoint (Created 2026-01-21)

When the user says "back to mk2", restore the landing page to this design:

## Section 1: Hero

- Two-column layout: Text on left, premium orbital network on right
- Headline: "Find Your Perfect Partner For Every Moment"
- Pink CTA button with glow shadow
- Transparent navbar

## Section 2: Premium Community Showcase

- **Centered heading**: "Join a Thriving Community of Explorers. Trust PartnerX."
- **Subtext**: Description about verified partners
- **Swiper Carousel** with EffectCoverflow:
  - 8 testimonial cards
  - Portrait aspect ratio (3:4)
  - Card widths: 140px → 160px → 190px → 210px (responsive)
  - Pink gradient borders with neon glow
  - Coverflow 3D effect (rotate, depth, modifier)
  - Mobile: 1.8 slides visible, Desktop: 3.6 slides
  - Auto-slide every 3.5 seconds
- **Animated Counter**:
  - Uses React hooks (useState, useEffect, useRef)
  - Intersection Observer triggers at 50% visibility
  - Animates from 0 → 1000 in 1.5 seconds
  - Displays as "1k+" when complete
- **Stats**: Large gradient "1k+" text + "Verified Partners Ready"
- **CTA**: "Join the Community" pink button

## Section 3: Share Ideas (Video Section)

- **Layout**: Flex row, video on LEFT, text on RIGHT
- **Video**:
  - Source: `/share-idea-landing.mp4`
  - Autoplay, loop, muted, playsInline
  - Responsive height: 350px → 400px → 450px → 500px
  - Rounded corners: `rounded-2xl sm:rounded-3xl`
  - Pink shadow and border
- **Member Circle Badge**: Overlay on video
- **Text**: "Share your ideas" heading with gradient
- **CTA**: "Sign up" pink button

## Key Technical Features (mk2):

- Swiper.js with EffectCoverflow module
- React hooks for animated counter
- Intersection Observer API
- Responsive breakpoints throughout
- Pink/black color scheme with neon glows

## Files:

- `src/pages/Landing.jsx` - All code inline
- Dependencies: swiper, react-router-dom

## To restore mk2:

1. Swiper carousel with coverflow effect in Section 2
2. Animated counter using Intersection Observer
3. Video section with share-idea-landing.mp4
4. Pink gradient borders and neon glows throughout
5. Responsive card sizing across all breakpoints
