You are an expert frontend engineer and UI/UX designer specializing in premium digital wedding invitations.

Your task is to build a complete, polished, production-quality online wedding invitation website using ONLY:

- HTML5
- CSS3
- Vanilla JavaScript

Do NOT use frontend frameworks or heavy third-party dependencies.

The result must be a visually impressive, romantic, elegant, highly responsive, mobile-first wedding invitation website that feels like a premium commercial digital invitation product.

==================================================
1. REFERENCE DESIGN
==================================================

Use these websites as VISUAL AND UX REFERENCES:

1. https://www.wevitation.com/demo/mildness
2. https://www.wevitation.com/demo/espresso

Study the references carefully before implementing anything.

IMPORTANT:

Do NOT clone the websites.
Do NOT reproduce their exact layout, assets, branding, typography, illustrations, or source code.

Instead, extract the design principles from them:

MILDNESS:
- soft romantic atmosphere
- botanical/floral decoration
- airy spacing
- pastel/neutral palette
- elegant wedding typography
- delicate visual hierarchy
- intimate and emotional presentation
- decorative elements integrated into the layout

ESPRESSO:
- sophisticated editorial composition
- warm earthy tones
- restrained visual decoration
- stronger typography hierarchy
- elegant photography
- modern minimal cards and sections
- premium wedding invitation feeling

Combine the strongest design principles from both references into ONE ORIGINAL DESIGN.

The final design should feel inspired by those references, but clearly be its own design.

==================================================
2. PRIMARY DESIGN DIRECTION
==================================================

Create an original visual concept called:

"Modern Editorial Botanical Wedding"

Visual characteristics:

- premium
- romantic
- elegant
- intimate
- editorial
- sophisticated
- warm
- contemporary
- minimal but not boring
- decorative but not excessive

Avoid:

- generic Bootstrap-looking UI
- excessive glassmorphism
- excessive gradients
- excessive shadows
- cheap-looking animations
- overly rounded UI everywhere
- excessive floating elements
- excessive decorative icons
- clutter
- template-like appearance

The design should look intentionally art-directed.

The invitation should feel like a combination of:

luxury wedding stationery
+
modern editorial website
+
botanical wedding album

==================================================
3. MOBILE-FIRST REQUIREMENT
==================================================

Mobile is the PRIMARY design target.

Design for:

360px
375px
390px
414px
430px

Then progressively enhance for:

768px
1024px
1280px
1440px+

The page must never feel like a desktop website squeezed onto mobile.

Mobile requirements:

- comfortable reading width
- excellent typography
- large touch targets
- sticky/floating controls must not obstruct content
- buttons must be thumb friendly
- forms must be easy to interact with
- images must scale correctly
- no horizontal scrolling
- no layout overflow
- no microscopic text
- adequate spacing between interactive elements

Desktop should become a wider editorial composition, NOT a simple scaled-up mobile layout.

==================================================
4. TECHNOLOGY CONSTRAINTS
==================================================

STRICTLY use:

HTML5
CSS3
Vanilla JavaScript

Do NOT use:

React
Vue
Angular
Svelte
Next.js
Nuxt
Tailwind CSS
Bootstrap
jQuery
Alpine.js
GSAP
Three.js
Swiper
Splide
AOS
Font Awesome
Lucide package
Material Icons package
any UI component library
any CSS framework
any build framework

Avoid unnecessary npm dependencies entirely.

Prefer:

- semantic HTML
- CSS custom properties
- CSS Grid
- Flexbox
- CSS transitions
- CSS keyframes
- IntersectionObserver
- native dialog where appropriate
- native HTML controls
- inline SVG icons
- vanilla JavaScript modules only when useful

The website should be able to run by opening index.html or through a trivial local static server.

Do NOT create an unnecessary build pipeline.

==================================================
5. PROJECT STRUCTURE
==================================================

If the repository is empty, create a clean structure such as:

/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
├── assets/
│   ├── images/
│   └── audio/
└── README.md

Keep the architecture simple.

Do not split the project into dozens of unnecessary files.

If the repository already contains a project:

1. Inspect the existing files first.
2. Understand the current architecture.
3. Preserve useful existing infrastructure.
4. Avoid unnecessary rewrites.
5. Only introduce files when they improve maintainability.

==================================================
6. PAGE EXPERIENCE
==================================================

The invitation should behave as one continuous storytelling experience.

Recommended flow:

01. Opening Cover
02. Hero / Couple Introduction
03. Wedding Quote
04. Couple Profile
05. Event Information
06. Countdown
07. Love Story / Timeline
08. Photo Gallery
09. RSVP
10. Gift / Cashless Gift
11. Wishes / Guestbook
12. Closing / Thank You

You may modify the order slightly when necessary to improve UX.

The entire experience should feel like a narrative rather than a collection of unrelated cards.

==================================================
7. OPENING COVER
==================================================

Create a beautiful full-screen opening invitation.

Requirements:

- elegant background image or placeholder
- subtle botanical decoration
- couple names
- wedding date
- recipient name
- invitation type
- prominent "Buka Undangan" button

Example:

UNDANGAN PERNIKAHAN

Alya & Raka

Sabtu, 21 November 2026

Kepada:
Bapak/Ibu/Saudara/i

[ Nama Tamu ]

[Buka Undangan]

The cover should immediately communicate:

luxury
romance
personalization

The opening button should feel visually important.

When clicked:

- unlock the invitation
- optionally start background music
- smoothly transition into the main invitation
- prevent the page from remaining locked unnecessarily

Do not autoplay audio before user interaction.

==================================================
8. HERO SECTION
==================================================

Create a strong visual hero after the invitation is opened.

Use:

- couple portrait placeholder
- elegant typography
- decorative botanical elements
- subtle texture
- date
- short invitation message

The couple names should be one of the strongest visual elements on the entire page.

Use typography contrast:

display/script-like feeling for names
+
clean serif/sans-serif body typography

Because external font dependencies are not allowed, build a sophisticated typography hierarchy using available system fonts.

Use font-family fallbacks intelligently.

==================================================
9. QUOTE SECTION
==================================================

Create an elegant quote section.

Example:

"Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup..."

Include:

- quote
- source
- restrained decorative treatment

Do not make this section too tall.

Typography should feel editorial and calm.

==================================================
10. COUPLE SECTION
==================================================

Create a beautiful introduction for both people.

Structure:

Bride

Alya Putri
Putri dari Bapak ... & Ibu ...

+

Groom

Raka Pratama
Putra dari Bapak ... & Ibu ...

Use photography and typography to distinguish both profiles.

Avoid overly generic circular avatar layouts.

Prefer editorial photography composition.

==================================================
11. EVENT SECTION
==================================================

Display wedding events clearly.

At minimum:

Akad Nikah
Reception

Each event should contain:

- date
- time
- venue
- address
- navigation button
- calendar button

Example:

AKAD NIKAH

21 November 2026
08:00 – 10:00 WIB

The Grand Garden
Jl. Example No. 10
Makassar

[Navigasi]
[Simpan ke Kalender]

RESEPSI

21 November 2026
11:00 – 14:00 WIB

The Grand Garden
Jl. Example No. 10
Makassar

[Navigasi]
[Simpan ke Kalender]

Buttons should use inline SVG icons.

No icon library.

==================================================
12. COUNTDOWN
==================================================

Create a live countdown timer:

Days
Hours
Minutes
Seconds

Requirements:

- update every second
- handle completed countdown gracefully
- never display NaN
- never display negative values
- use accessible labels
- maintain visual elegance

Make the countdown visually integrated with the invitation.

==================================================
13. LOVE STORY
==================================================

Create an elegant horizontal/vertical timeline.

Example:

2021
Pertemuan Pertama

2023
Mulai Menjalin Hubungan

2025
Lamaran

2026
Hari Pernikahan

The mobile layout should become a vertical timeline.

Desktop may use a horizontal or asymmetric editorial timeline.

Use subtle animation when the section enters the viewport.

==================================================
14. GALLERY
==================================================

Create a visually interesting wedding photo gallery.

Requirements:

- responsive masonry/editorial grid
- different image aspect ratios
- elegant spacing
- lazy loading
- hover effects on desktop
- tap interaction on mobile

Clicking an image should open a fullscreen lightbox.

Lightbox requirements:

- enlarged image
- close button
- next/previous controls
- keyboard support on desktop
- ESC closes the lightbox
- clicking backdrop closes it
- body scroll locking
- accessible labels

Do NOT use a third-party gallery library.

Implement everything with vanilla JavaScript.

Use placeholder images if actual image assets are unavailable.

Use descriptive local placeholder assets or remote placeholder image URLs only when absolutely necessary.

Prefer local assets.

==================================================
15. RSVP
==================================================

Create an elegant RSVP section.

Fields:

Nama
Kehadiran
Jumlah Tamu
Ucapan / Catatan

Attendance options:

Hadir
Tidak Hadir

The interface should feel simple and friendly.

Do not make the form excessively long.

Use native form validation.

Provide visually clear success/error states.

Because there is no backend:

DO NOT pretend that the form is connected to a real database.

For this prototype, simulate submission locally and show an elegant confirmation state.

Optionally use localStorage to remember the local demo submission.

==================================================
16. GIFT / CASHLESS SECTION
==================================================

Create a tasteful gift section.

Example:

Kado & Kasih

Doa dan kehadiran Anda adalah hadiah terindah bagi kami.

Bank BCA

Alya Putri

1234567890

[Salin Nomor Rekening]

Also provide:

QRIS

[ Lihat QR ]

When "Salin Nomor Rekening" is clicked:

- copy the account number
- show temporary feedback:
  "Nomor rekening berhasil disalin"

Do not use third-party clipboard libraries.

Use navigator.clipboard when available with a fallback.

QR modal:

- large QR image placeholder
- close button
- accessible
- responsive

==================================================
17. WISHES / GUESTBOOK
==================================================

Create a wishes section.

Example message cards:

"Selamat menempuh hidup baru..."

Nama Tamu
21 November 2026

Add a simple form:

Nama
Pesan

[Kirim Ucapan]

Since this is frontend-only:

- store demo wishes in localStorage
- render them dynamically
- sanitize user-generated content
- avoid innerHTML for untrusted content whenever practical
- display newest wishes first

Create 3–5 initial demo wishes.

==================================================
18. FLOATING CONTROLS
==================================================

Add a very subtle floating utility area.

Possible controls:

Music
Scroll to top
Navigation / menu

Do not make the interface cluttered.

Music control:

- play/pause
- animated state
- accessible label
- do not autoplay before user interaction

When invitation is opened, music may start because this is directly triggered by user interaction.

Keep audio behavior browser-safe.

==================================================
19. NAVIGATION
==================================================

Create intuitive navigation for a long invitation.

On mobile:

use a compact floating navigation or bottom navigation.

Possible destinations:

Home
Acara
Galeri
RSVP
Ucapan

The navigation should not constantly cover important content.

Use smooth scrolling.

Use IntersectionObserver to update active navigation state.

On desktop:

you may use a minimal sticky navigation.

==================================================
20. VISUAL LANGUAGE
==================================================

Create a refined color system.

Suggested direction:

Background:
warm ivory
soft cream
light beige

Primary:
deep espresso / warm charcoal

Accent:
muted olive
sage
dusty rose
warm gold

Do not use overly saturated colors.

Example CSS variables:

--color-bg
--color-surface
--color-text
--color-muted
--color-accent
--color-accent-soft
--color-border

Use CSS variables throughout the project.

Do not scatter raw colors everywhere.

==================================================
21. TYPOGRAPHY
==================================================

Typography is extremely important.

Use at least three levels:

Display
Heading
Body

Recommended approach:

Display:
elegant serif/system fallback

Heading:
refined serif

Body:
clean sans-serif/system fallback

For example, intelligently combine:

Georgia
Times New Roman
Palatino
system-ui
-apple-system
BlinkMacSystemFont
Segoe UI

Do NOT import Google Fonts or use external font CDNs.

The website must remain dependency-light.

==================================================
22. DECORATIVE ELEMENTS
==================================================

Use decorative elements inspired by botanical wedding stationery.

Examples:

- leaves
- line art
- floral corner decorations
- thin borders
- subtle ornaments
- small geometric dividers

Prefer:

inline SVG
CSS pseudo-elements
CSS borders
CSS gradients used carefully

Do not use huge decorative elements that interfere with readability.

==================================================
23. ANIMATION SYSTEM
==================================================

Animations must be subtle.

Use:

- opacity
- transform
- translateY
- scale
- subtle reveal
- image zoom
- fade
- decorative floating movement

Avoid:

- excessive bouncing
- spinning
- flashy transitions
- long blocking animations

Respect:

prefers-reduced-motion

When reduced motion is enabled:

- disable non-essential animation
- preserve functionality

Use IntersectionObserver for section reveals.

==================================================
24. UX DETAILS
==================================================

Pay special attention to:

- focus states
- keyboard navigation
- contrast
- button states
- loading states
- form validation
- empty states
- modal behavior
- body scroll locking
- touch interactions
- accidental clicks
- text wrapping
- image loading
- responsive overflow

Every interactive control should communicate its state.

Buttons need:

hover
focus
active
disabled

states where applicable.

==================================================
25. ACCESSIBILITY
==================================================

Implement reasonable WCAG-oriented practices.

Include:

- semantic landmarks
- proper heading hierarchy
- alt attributes
- accessible buttons
- aria-label where necessary
- keyboard navigation
- visible focus states
- sufficient color contrast
- reduced motion support
- form labels
- dialog accessibility

Do not sacrifice visual quality for accessibility.

Instead integrate accessibility into the design.

==================================================
26. PERFORMANCE
==================================================

The invitation should be lightweight.

Prioritize:

- minimal JavaScript
- minimal DOM complexity
- CSS over JS where possible
- lazy-loading images
- efficient event listeners
- no polling unless necessary
- no unnecessary animation loops
- no heavy dependencies

Avoid unnecessary abstractions.

Do not build an overengineered architecture for a simple invitation.

==================================================
27. DATA MODEL
==================================================

Keep invitation content easy to customize.

Prefer a centralized JS configuration object such as:

const invitationData = {
  couple: {
    bride: "...",
    groom: "..."
  },

  date: "...",

  venue: {
    name: "...",
    address: "..."
  },

  events: [],

  gallery: [],

  bank: {
    name: "...",
    accountName: "...",
    accountNumber: "..."
  }
};

The HTML should not become difficult to maintain.

The developer should be able to change:

- couple names
- guest name
- date
- venue
- event schedule
- gallery
- bank information
- story timeline

without rewriting the entire interface.

==================================================
28. PERSONALIZED GUEST
==================================================

Support guest personalization through URL parameters.

Example:

index.html?to=John%20Doe

Then display:

Kepada:
John Doe

If no parameter exists:

Kepada:
Bapak/Ibu/Saudara/i

Sanitize and safely render the parameter.

Never directly inject the query string into innerHTML.

==================================================
29. CALENDAR SUPPORT
==================================================

Create "Simpan ke Kalender" functionality.

Prefer generating an ICS file client-side using vanilla JavaScript.

Do not depend on:

Google Calendar SDK
calendar libraries
third-party services

Provide a downloadable .ics file or a browser-compatible calendar action.

==================================================
30. MAP / NAVIGATION
==================================================

Do not embed a heavy map library.

A simple navigation button is sufficient.

Example:

https://www.google.com/maps/search/?api=1&query=...

Build the URL from configurable venue data.

Open it safely in a new tab.

==================================================
31. RESPONSIVE DESIGN
==================================================

Test carefully at:

360x800
375x812
390x844
414x896
430x932
768x1024
1024x768
1280x800
1440x900

Check:

- hero composition
- typography
- gallery
- timeline
- cards
- navigation
- modals
- RSVP
- footer
- long text
- buttons
- image cropping

Fix every overflow problem you find.

==================================================
32. VISUAL QUALITY BAR
==================================================

Do not stop when the website merely works.

The result should look like a premium commercial wedding invitation.

Pay attention to:

- spacing rhythm
- typography scale
- visual hierarchy
- alignment
- image cropping
- balance between text and whitespace
- decoration
- section transitions
- consistency
- mobile composition

Every section should feel deliberately designed.

Avoid the common AI-generated website problems:

- excessive cards
- repetitive layouts
- too many pills
- giant headings
- random gradients
- inconsistent spacing
- generic icon placement
- excessive shadows
- too many colors
- inconsistent border radii

==================================================
33. IMPLEMENTATION PROCESS
==================================================

Follow this workflow.

PHASE 1 — INSPECT

Inspect the repository first.

Determine:

- existing files
- existing assets
- existing styles
- existing scripts
- current project structure

Do not modify anything before understanding the repository.

PHASE 2 — PLAN

Create a concise implementation plan internally.

Identify:

- page structure
- visual system
- responsive strategy
- component-like sections
- interaction requirements
- reusable CSS primitives

PHASE 3 — IMPLEMENT

Build:

1. HTML structure
2. CSS visual system
3. responsive behavior
4. JavaScript interactions
5. accessibility
6. localStorage demo behavior
7. calendar generation
8. modals
9. gallery
10. countdown
11. music control

PHASE 4 — REVIEW

Run the page locally.

Inspect the actual rendered result.

Do not rely only on source code reasoning.

Check for:

- broken layout
- overflows
- unreadable typography
- bad image cropping
- broken modal behavior
- console errors
- JavaScript errors
- incorrect responsive behavior

PHASE 5 — REFINE

After the first implementation, perform a visual refinement pass.

Improve:

- typography
- spacing
- hierarchy
- colors
- proportions
- animation
- mobile UX

Do at least one deliberate refinement pass before considering the task complete.

==================================================
34. TESTING
==================================================

Verify at minimum:

- cover opens correctly
- guest personalization works
- countdown works
- navigation works
- scrolling works
- gallery opens
- gallery closes
- next/previous image works
- ESC closes modal
- RSVP validation works
- RSVP success state works
- wish form works
- localStorage works
- copy account number works
- QR modal works
- music play/pause works
- calendar file generation works
- reduced-motion behavior works
- no console errors
- no horizontal overflow

==================================================
35. CODE QUALITY
==================================================

Write maintainable code.

HTML:

- semantic
- readable
- logically structured

CSS:

- organized by system/section
- variables
- responsive breakpoints
- no unnecessary duplication

JavaScript:

- modular enough to understand
- avoid global pollution
- use descriptive function names
- avoid unnecessary complexity
- gracefully handle browser feature limitations

Add short comments only where they provide real value.

Do NOT fill the code with obvious comments.

==================================================
36. CONTENT
==================================================

Use realistic Indonesian wedding invitation copy.

Do not use generic placeholder text such as:

"Lore Ipsum"
"Lorem ipsum dolor sit amet"
"Text here"
"Your text"

Instead create realistic example content.

Example couple:

Alya Putri
&
Raka Pratama

Example:

"Merupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu pada hari bahagia kami."

Use natural Indonesian language.

==================================================
37. FINAL DESIGN TARGET
==================================================

The finished website should feel like:

A premium Indonesian wedding invitation photographed on fine paper, translated into a modern mobile web experience.

Think:

editorial wedding magazine
+
botanical stationery
+
luxury invitation
+
modern mobile UX

The design should make the user immediately understand:

WHO is getting married
WHEN
WHERE
WHAT they need to do

without overwhelming them.

==================================================
38. IMPORTANT IMPLEMENTATION RULE
==================================================

Do not merely create a collection of sections.

Create a coherent EXPERIENCE.

The transition from:

cover
→ hero
→ story
→ event
→ gallery
→ RSVP
→ wishes
→ closing

should feel intentional and emotionally coherent.

The final result should be visually distinctive, polished, and production-quality.

==================================================
39. DELIVERABLE
==================================================

Produce the complete working implementation.

At the end:

1. Ensure all files are actually created.
2. Verify there are no obvious console errors.
3. Verify responsive layout.
4. Verify all major interactions.
5. Provide a concise summary of:
   - files created/modified
   - main features implemented
   - how to run the invitation locally
   - any limitations caused by the frontend-only architecture

Do not leave unfinished TODOs for core functionality.

Do not ask unnecessary questions.

Make reasonable implementation decisions yourself and continue until the website is complete.
