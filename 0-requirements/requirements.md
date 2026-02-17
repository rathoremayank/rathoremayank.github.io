# Resume Website Requirements

## Goal
Build a simple, static resume website using HTML, CSS, and JavaScript.

## Scope
The site is a single-page resume with multiple sections and a navigation menu that scrolls to each section.

## Technology & Project Constraints
- Use only HTML, CSS, and JavaScript (static site).
- Keep `index.html` in the project root.
- Use separate folders for other HTML (if any), CSS, JavaScript, and images.
- Populate content dynamically from `data/profile.json` using JavaScript (so updates do not require editing the HTML structure).

## Information Architecture

### Header
- Display name.
- Navigation menu with smooth scrolling to sections.
- Navigation links: Home, About Me, Work Experience, Projects, Education, Skills, Resume, Contact.

### Sections
- **Home**: landing section.
- **About Me**: professional summary / objective statement.
- **Work Experience**: job title, company name, and descriptions of responsibilities and achievements.
- **Projects**: cards showcasing projects, including links to repositories and/or live demos.
- **Education**: institution name, degree earned, graduation date.
- **Skills**: technical skills and soft skills.
- **Resume**: a way to download the resume.
- **Contact**: email address and phone number.

### Footer
- Links to social media profiles.
- Copyright notice.

## Design Requirements
- Clean, professional, modern (not tacky) visual design.
- Consistent color scheme and typography.
- Clear headings and well-organized, easy-to-read layout.
- Suitable images and icons to enhance visual appeal.
- Overall look should reflect personal brand and style.

## Theme Requirements
- Light/dark mode toggle.
- Toggle is easily accessible.
- Theme preference is remembered for future visits.

## Non-Functional Requirements
- **Responsive**: works well on different screen sizes.
- **Performance**: optimized so pages load quickly.
- **Accessibility**: usable by people with disabilities.

## Hosting
- Host on a reliable platform such as GitHub Pages or Netlify.

## Acceptance Criteria
- Navigation links smoothly scroll to the correct sections.
- All required sections and footer elements are present.
- Work experience includes title, company, responsibilities, and achievements.
- Projects render as cards and include repo/live links where available.
- Light/dark mode toggle works and persists user preference.
- Site is responsive, fast to load, and reasonably accessible.
- Content is sourced from `data/profile.json`.
