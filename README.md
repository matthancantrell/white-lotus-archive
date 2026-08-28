# The White Lotus Archive

In an effort to play `Avatar Legends` with my friends, I wanted to make a companion application similar to D&D Beyond. Something that could provide tools to make characters, roll dice, and put references in one uniform place!

From that desire came the White Lotus Archive.

Below is a development roadmap for creating and hosting the application so that it exists beyond my own system and an online repository:

## Phase 1 - Building a foundation

### Goals

- [ ] Create repository
- [ ] Create Next.js application
- [ ] Configure Tailwind
- [ ] Create Supabase Project (Databse and authorization)
- [ ] Configure Prisma (Object relationship between database and application)
- [ ] Configure Cloudflare Pages deployment
- [ ] Configure environment variables (local and hosted)
- [ ] Setup automatic deployments

**Phase 1 Deliverable(s):**

- [ ] Hosted GitHub repository to remotely store codebase
- [ ] Deployed application connected to Supabase

---

## Phase 2 - Authentication

### Goals

- [ ] User registration
- [ ] Login + Logout
- [ ] Password Reset
- [ ] Email verification
- [ ] Protected Routing
- [ ] User Profile Page

**Phase 2 Deliverable(s):**

- [ ] Login + Signup Pages
- [ ] Users should be able to create & authenticate accounts

---

## Phase 3 - Character Creation

### Goals

- [ ] Implement Avatar Legends character sheets

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

- [ ] Create character
- [ ] Edit character
- [ ] Delete character
- [ ] Autosave changes
- [ ] Character dashboard (See and manage characters)

**Phase 3 Deliverable(s):**

- [ ] Create and view or export digital character sheet
- [ ] Users can access their own character dashboard

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
