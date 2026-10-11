# The White Lotus Archive

In an effort to play `Avatar Legends` with my friends, I wanted to make a companion application similar to D&D Beyond. Something that could provide tools to make characters, roll dice, and put references in one uniform place!

From that desire came the White Lotus Archive.

Below is a development roadmap for creating and hosting the application so that it exists beyond my own system and an online repository:

## Phase 1 - Building a foundation

### Goals

- [x] Create repository
- [x] Create Next.js application
- [x] Configure Tailwind
- [x] Create Supabase Project (Database and authorization) (`Update`: We also use Cloudflare D1)
- [ ] ~~Configure Prisma (Object relationship between database and application)~~ (`Update`: Prisma is no longer considered / needed.)
- [x] Configure Cloudflare Pages deployment
- [x] Configure environment variables (local and hosted)
- [ ] ~~Setup automatic deployments~~ (`Update`: This is not yet in place, but is a goal for moving forward)

**Phase 1 Deliverable(s):**

- [x] Hosted GitHub repository to remotely store codebase
- [x] Deployed application connected to Supabase

---

## Phase 2 - Authentication

### Goals

- [x] User registration
- [x] Login + Logout
- [ ] Password Reset
- [x] Email verification
- [x] Protected Routing
- [x] User Profile Page

**Phase 2 Deliverable(s):**

- [x] Login + Signup Pages
- [x] Users should be able to create & authenticate accounts

---

## Phase 3 - Character Creation

### Goals

- [x] Implement Avatar Legends character sheets

Potential Sections:

- Basic Info
- Playbook
- Training
- Stats
- Balance
- Fatigue
- Conditions
- Growth
- Techniques
- Background
- History
- Equipment
- Notes
- Portrait

App Features:

- [x] Create character
- [x] Edit character
- [x] Delete character
- [x] Autosave changes
- [x] Character dashboard (See and manage characters)

**Phase 3 Deliverable(s):**

- [x] Create and view or export digital character sheet (`Update`: Export is not yet implemented.)
- [x] Users can access their own character dashboard

---

## Phase 4 - Sharing (Because we care <3)

### Goals

- [ ] Character privacy
- [ ] Account privacy
- [ ] View-only permissions
- [ ] Optional edit permissions

Use RLS and app auth to achieve this goal.

**Phase 4 Deliverable(s):**

- [ ] Secure character sheets + option to share

---

## Phase 5 - QoL

### Goals

- [ ] Mobile responsiveness + UI
- [ ] Portait uploads
- [ ] Printable layout
- [ ] Export JSON
- [ ] PDF export
- [ ] Duplicate characters

---

## Future Phases:

- Campaigns
- Polish
