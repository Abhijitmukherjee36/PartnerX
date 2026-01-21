---
description: Revert to mk2 (premium login/signup with mobile OTP + transparent glass design)
---

# MK2 Checkpoint (2026-01-22)

When the user says "back to mk2", restore to this design state:

## Login/Signup Pages (mk2):

### Design Features:

- **Background**: Pink 3D glass ribbon image (`/images/login-bg.png`)
- **Main container**: Dark transparent (`bg-black/25`) with rounded corners
- **Two-column layout**: Form on left, visual branding on right
- **Input fields**: Transparent with 40% white opacity (`bg-white/40`)
- **Text**: White on transparent backgrounds

### Form Elements:

- **Compact sizing**: `h-[88vh] max-h-[680px]` container
- **Smaller padding**: `py-2.5 px-3` inputs
- **Smaller font**: `text-sm` for inputs and buttons
- **Rounded corners**: `rounded-lg` (not xl)

### Button Animation:

- **Slide effect**: Pink gradient slides in from left on hover
- **Duration**: 500ms with cubic-bezier easing
- **Mobile support**: `group-active` for touch devices
- **Press feedback**: `active:scale-[0.98]`

### Mobile OTP Flow:

- Click "Continue with Mobile Number" to switch modes
- Mobile number input with +91 prefix
- 6-digit OTP boxes with auto-focus on next
- Send OTP / Verify buttons with slide animation
- "Back to Email" option to return

### Right Panel (Visual):

- PartnerX logo with gradient background
- Animated heart illustration
- Floating decorative icons
- Spinning dashed orbit ring (signup page)
- Text content with carousel dots

## Landing Page (mk2):

### Buttons redirect to /login:

- "Get Started" → /login
- "Join the Community" → /login
- "Sign up" → /login
- "Find your partner" → /login
- "Find your events" → /login
- "Read more stories" → /login
- "Meet in person" → /login

### Header:

- "Log In" → /login
- "Join Now" → /signup

## Files Modified:

- `src/pages/Login.jsx` - Full redesign with mobile OTP
- `src/pages/Signup.jsx` - Full redesign with mobile OTP
- `src/pages/Landing.jsx` - CTA buttons redirect to login
- `public/images/login-bg.png` - Pink 3D glass background

## Git Commit Reference:

- Commit: `96b1acd` - "Updated UI and added new files"

## To restore mk2:

1. Login/Signup have transparent glass design
2. Mobile OTP authentication enabled
3. Slide button animation (500ms cubic-bezier)
4. All landing CTAs go to /login
5. Compact form sizing (no scrollbar)
