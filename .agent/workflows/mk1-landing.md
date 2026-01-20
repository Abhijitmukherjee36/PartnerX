---
description: Revert landing page to mk1 (original design with orbiting avatars)
---

# MK1 Landing Page Checkpoint

When the user says "back to mk1", restore the landing page to this original design:

## Hero Section Features (mk1):

- **Two-column layout**: Text on left, orbiting avatars on right
- **Headline**: "Find Your Perfect Partner For Every Moment — Just One Click Away!"
- **CTA Button**: "Get Started" with raspberry glow
- **Right side**: Orbit rings with floating avatars and tags (Travel, Events, Co-living, Activities)
- **Center stats**: "1k+ Partners Ready" box with glow

## Key Code Structure:

- No video background
- No NetworkVisualization component
- Grid layout with `lg:grid-cols-2`
- Floating avatars with images from `/images/` folder
- Orbit ring animations

## Files:

- `src/pages/Landing.jsx` - Main landing page (no NetworkVisualization import)
- NetworkVisualization.jsx component should NOT exist

## To restore mk1:

1. Remove any NetworkVisualization component
2. Remove video elements from hero section
3. Restore the two-column grid layout with orbiting avatars
