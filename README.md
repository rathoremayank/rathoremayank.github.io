# Resume Website - Mayank Singh Rathore

A modern, responsive static resume website built with HTML, CSS, and JavaScript.

## Features

✨ **Core Features:**
- Clean, professional, and modern design
- Fully responsive layout (mobile, tablet, desktop)
- Light/Dark theme toggle with localStorage persistence
- Smooth scrolling navigation
- Dynamic content loading from `data/profile.json`
- Sections: Home, About, Work Experience, Projects, Education, Skills, Contact
- Social media links in footer
- Print-friendly styles for PDF export

🎨 **Design:**
- Minimalist color scheme with accent colors
- Consistent typography using system fonts
- Hover effects and smooth transitions
- Card-based layout for content sections
- FontAwesome icons

📱 **Responsive:**
- Mobile-first approach
- Hamburger menu for mobile devices
- Flexible grid layouts
- Optimized for all screen sizes

## Project Structure

```
rathoremayank.github.io/
├── index.html              # Main HTML file
├── css/
│   └── styles.css          # All styles with theme support
├── js/
│   └── main.js            # JavaScript for dynamic content & interactions
├── data/
│   └── profile.json       # Resume data source
├── images/                # Image assets
└── 0-requirements/
    └── requirements.md    # Project requirements
```

## How to Use

### Local Development

1. Clone or download this repository
2. Open `index.html` in a web browser
3. Or use a local server:
   ```bash
   # Python
   python -m http.server 8000
   
   # Node.js
   npx serve
   ```
4. Navigate to `http://localhost:8000`

### Updating Content

All content is dynamically loaded from `data/profile.json`. To update your resume:

1. Edit `data/profile.json` with your information
2. Follow the existing JSON structure
3. Refresh the website to see changes

### Theme Toggle

- Click the moon/sun icon in the navigation bar
- Theme preference is saved in localStorage
- Automatically applied on future visits

### Download Resume

- Click "Download Resume" in navigation
- Opens print dialog (save as PDF)
- Or replace with a link to your PDF file

## Deployment

### GitHub Pages

1. Push code to GitHub repository named `username.github.io`
2. Enable GitHub Pages in repository settings
3. Site will be available at `https://username.github.io`

### Netlify

1. Connect repository to Netlify
2. Deploy with default settings
3. Site will be live at your Netlify URL

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS variables
- **JavaScript (ES6+)** - Dynamic content and interactions
- **FontAwesome 6** - Icons
- **JSON** - Data storage

## Accessibility

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- High contrast color ratios
- Screen reader friendly

## Performance

- Minimal dependencies (only FontAwesome CDN)
- Lazy loading with Intersection Observer
- Optimized CSS with variables
- Fast load times
- Print-optimized styles

## License

MIT License - Feel free to use this template for your own resume!

## Credits

Built by Mayank Singh Rathore
My GH Landing Site
