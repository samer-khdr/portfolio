# Portfolio Data Management Guide

Your portfolio now uses JSON files to manage all content. This means you can easily update your portfolio without touching any code. Here's how to manage each section:

## File Structure

```
src/data/
├── about.json
├── skills.json
├── projects.json
└── experience.json
```

## Files & How to Update

### 1. `about.json` - Personal Information
Contains your name, title, bio, location, contact info, and languages.

**Fields to update:**
- `name` - Your full name
- `title` - Your current title (e.g., "AI/ML & Backend Engineer")
- `location` - Where you're based
- `email` - Contact email
- `linkedIn` - Your LinkedIn profile URL
- `github` - Your GitHub profile URL
- `tagline` - Short tagline for the hero section
- `bio` - Main bio paragraph
- `bio2` - Secondary bio paragraph
- `languages` - Array of languages with proficiency levels

### 2. `skills.json` - Skills & Technologies
Organized by skill categories (AI/ML Stack, Backend & Infrastructure, etc.)

**How to update:**
- Add or remove skill categories by adding/removing objects in `skillCategories`
- Each category has a `category` name and `skills` array
- Edit skills directly in the array

Example:
```json
{
  "skillCategories": [
    {
      "category": "Frontend",
      "skills": ["React", "Tailwind CSS", "Framer Motion"]
    }
  ]
}
```

### 3. `projects.json` - Work & Projects
Showcase your projects with descriptions, technologies, and optional images.

**Fields per project:**
- `id` - Unique number
- `title` - Project title
- `description` - What the project does
- `tags` - Technologies/skills used
- `year` - When you worked on it
- `image` - Path to project image (e.g., `/images/project-1.jpg`)
- `company` - Company or organization

**Adding images:**
1. Create an `images/` folder in the `public/` directory
2. Add your project images (e.g., `public/images/project-1.jpg`)
3. Update the `image` field in the JSON to the path (e.g., `/images/project-1.jpg`)

### 4. `experience.json` - Work History
Your complete employment history and roles.

**Fields per experience:**
- `id` - Unique number
- `company` - Company name
- `position` - Job title
- `startDate` - Start date (e.g., "Jun 2025")
- `endDate` - End date or "Present"
- `duration` - Duration (e.g., "2 yrs 6 mos")
- `location` - Work location
- `type` - Employment type (Full-time, Part-time, etc.)
- `mode` - Work mode (Remote, Hybrid, On-site)
- `description` - What you did
- `keySkills` - Array of main skills from this role

## Quick Edit Checklist

To update your portfolio:

1. ✏️ Edit `about.json` - Update personal info and bio
2. ✏️ Edit `skills.json` - Add/remove skills
3. ✏️ Edit `projects.json` - Add new projects, update descriptions
4. ✏️ Edit `experience.json` - Update work history
5. 📁 Add images to `public/images/` folder
6. 🔗 Update image paths in `projects.json`

## No Code Changes Needed

All changes to these JSON files will automatically update your website. Just save the files and refresh your browser (or reload the dev server).

## Example: Adding a New Project

1. Open `src/data/projects.json`
2. Add a new object to the `projects` array:
```json
{
  "id": 5,
  "title": "Your Project Title",
  "description": "What you built and why",
  "tags": ["Tech1", "Tech2", "Tech3"],
  "year": "2024",
  "image": "/images/project-5.jpg",
  "company": "Your Company"
}
```
3. Save the file
4. Your project appears on the website automatically

## Deploying Changes

After updating your data:

```bash
# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

Your updated portfolio goes live automatically!
