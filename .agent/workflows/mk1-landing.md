---
description: Revert landing page to mk1 (premium orbital network design)
---

# MK1 Landing Page Checkpoint (Updated 2026-01-21)

When the user says "back to mk1", restore the landing page to this design:

## Hero Section Features (mk1):

- **Two-column layout**: Text on left, premium orbital network on right
- **Headline**: "Find Your Perfect Partner For Every Moment — Just One Click Away!"
- **CTA Button**: "Get Started" with pink/raspberry background and glow shadow
- **Transparent navbar**: Only PartnerX title and Log In / Join Now buttons visible

## Orbital Network (Right Side):

- **3 concentric orbit rings** with pink glow (`orbit-glow-ring`)
- **8 orbiting nodes** (2 on inner, 3 on middle, 3 on outer orbit)
- **Center**: PartnerX logo in circular black core with pulsing glow
- **Wrapper-based orbital animation**: Each orbit rotates, nodes counter-rotate to stay upright
- **Hover effects**: Nodes scale 20% and glow stronger on hover
- **Category labels**: Travel, Events, Dating, Social, Co-living, Activities around perimeter

## Orbital Animation Speeds:

- Orbit 1 (Inner): 28s clockwise
- Orbit 2 (Middle): 40s counter-clockwise
- Orbit 3 (Outer): 55s clockwise

## Background Effect:

- **Corner glow**: Pink/purple radial gradient from top-left corner
- Fades to dark black as it spreads toward center/bottom
- Multiple layers for depth (60-80px blur)

## Key Code Structure:

- No separate NetworkVisualization component (inline in Landing.jsx)
- Grid layout with `lg:grid-cols-2`
- Orbiting profile images from `/images/` folder
- CSS keyframes for `orbitSpin`, `counterSpin`, `centerGlow`
- Transparent navbar (no bg-black/80 or backdrop-blur)

## Files:

- `src/pages/Landing.jsx` - All orbital code inline
- No NetworkVisualization.jsx component

## Git Commit Reference:

- Commit: `3e7085e` - "Updated UI and added new files"

## To restore mk1:

1. Ensure no separate NetworkVisualization component exists
2. Landing.jsx should have inline orbital network with wrapper-based animation
3. Transparent navbar
4. Corner glow background effect
5. Pink CTA button with glow shadow
