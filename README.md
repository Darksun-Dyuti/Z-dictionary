<div align="center">

# Arcanaz

### *Knowledge Beyond Definitions*

<p>
  <img src="https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Auth.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Gemini_AI-8E75B2?style=for-the-badge&logo=googlebard&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
</p>

### Arcanaz does the digging. You do the learning.

### Because opening 37 tabs to understand one concept is not a research strategy.

</div>

---

## What is Arcanaz?

Ever searched for something simple like:

> "What is Stoicism?"

And somehow ended up with:

* 12 Wikipedia tabs
* 4 YouTube videos
* 3 Reddit threads
* 2 existential crises
* and absolutely no idea what Stoicism actually is.

Yeah.

Arcanaz was built because knowledge on the internet is everywhere, but understanding is somehow still in beta.

It's an AI-powered knowledge platform that combines:

* 📚 Encyclopedia-style exploration
* 🔍 Dictionary-grade search
* 🧠 AI explanations
* 🔗 Connected topic discovery
* 📖 Deep learning paths

All in one place.

No tab hoarding required.

---

## Why Arcanaz Exists

Because modern learning looks like this:

```text
Google Search
    ↓
Wikipedia
    ↓
YouTube
    ↓
Reddit
    ↓
Random Blog
    ↓
Stack Overflow
    ↓
"What was I even searching for?"
```

Arcanaz tries to fix that.

Search once.

Understand faster.

Stay curious.

Keep your sanity.

---

## Features

### 🧠 AI Explanations

Wikipedia explains things like it's defending a doctoral thesis.

Arcanaz explains things like a normal human.

---

### 📚 Encyclopedia Mode

Go deeper than definitions.

Explore ideas, concepts, people, events, theories, philosophies, and rabbit holes you didn't know you needed.

---

### 🔍 Search That Doesn't Waste Your Time

Find information faster than your group project members disappear after saying:

> "Bro don't worry, I'll do my part."

---

### 🔖 Save Topics

Found something interesting?

Save it.

Because your future self definitely isn't remembering that topic at 2:17 AM.

---

### 🌙 Dark Mode

For developers.

Students.

Researchers.

Night owls.

Vampires.

And anyone who values their retinas.

---

### 📱 Responsive Design

Desktop.

Tablet.

Mobile.

Smart fridge.

Okay maybe not the fridge.

Yet.

---

## Tech Stack

*No, I didn't train a thousand monks in a hidden mountain temple to power this thing.*

### 🎨 Frontend

* **Next.js 15** – Because routing manually is character development.
* **React** – The reason my browser fan sounds like a jet engine.
* **TypeScript** – JavaScript, but with consequences.
* **Tailwind CSS** – Utility classes until your eyes start seeing `flex justify-center items-center` in your dreams.
* **Framer Motion** – Making pixels move so the website feels richer than I am.

---

### 🔐 Authentication

* **Auth.js** – Handles authentication so I don't accidentally invent new cybersecurity vulnerabilities.

* **Google OAuth** – One-click login because nobody remembers passwords anymore.

---

### 🧠 AI

* **Google Gemini API** – The brain of Arcanaz.

It explains things faster than I can explain to my relatives what I actually do.

---

### 🗄️ Database

* **MongoDB** – Where all the saved knowledge, bookmarks, and questionable late-night searches live forever.

---

### 🚀 Deployment

* **Render** – The place where my code either goes live or publicly embarrasses me.

---

### 🎭 Design & UX

* **Shadcn/UI**
* **Lucide Icons**
* **Dark Mode**
* Excessive attention to spacing, typography, and making things look cooler than they probably need to.

---

## Screenshots

Screenshots were supposed to be here.

Then I remembered I could either:

- take screenshots
- keep building features

The features won.

Go check the live demo instead.

---

## 🚀 Live Demo

### Curious?

### Go break it.

**👉 [Launch Arcanaz](https://arcanaz.onrender.com)**

If you accidentally learn something useful, that's on you.

---

## Project Structure

Every project eventually becomes a maze.

This is my maze.

```text
arcanaz/
├── src/
│   ├── app/             # Next.js App Router (pages, layouts, APIs)
│   │   ├── api/         # Backend endpoints & authentication
│   │   ├── dashboard/   # User dashboard & saved discoveries
│   │   ├── settings/    # User preferences & customization
│   │   ├── topic/       # Encyclopedia mode & topic exploration
│   │   ├── word/        # Dictionary search & word lookups
│   │   ├── globals.css  # Global styling
│   │   ├── layout.tsx   # Root layout & providers
│   │   └── page.tsx     # Homepage
│   │
│   ├── components/      # Reusable UI components
│   ├── lib/             # Utilities, helpers, API integrations
│   ├── models/          # MongoDB models & schemas
│   └── server/          # Server Actions & backend logic
│
├── public/              # Images, icons, logos, assets
├── package.json         # Dependencies & scripts
└── tsconfig.json        # TypeScript configuration
```

### Quick Translation for Non-Developers

* **app/** → Where users see stuff.
* **api/** → Where requests go when buttons get clicked.
* **components/** → Reusable Lego blocks.
* **lib/** → The place where random magic happens.
* **models/** → The database blueprints.
* **server/** → Where business logic lives and bugs are born.
* **public/** → Static files that somehow become important later.

If you're reading this for the first time:

Don't panic.

I barely know where everything is either.

---

## Installation

*So you want to run Arcanaz locally? Respect bruh!!*

### 1. Clone the repository

```bash
git clone https://github.com/Darksun-Dyuti/Z-dictionary.git
cd Z-dictionary
```

---

### 2. Install dependencies

```bash
npm install
```

This may install approximately:

* 17% actual dependencies
* 83% things that other dependencies depend on

Such is modern web development.

---

### 3. Create your environment file

Create:

```bash
.env.local
```

in the root directory.

Then copy the variables from the section below.

---

### 4. Run the development server

```bash
npm run dev
```

---

### 5. Open your browser

```text
http://localhost:3000
```

If everything works:

Congratulations.

You're officially running Arcanaz.

If it doesn't:

Welcome to software development.

---

## Environment Variables

*The secret ingredients. Forget one and the application starts acting like a toddler without a nap.*

Create a file called:

```bash
.env.local
```

and add:

```env
# Authentication
AUTH_SECRET=

# Google OAuth
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=

# Database
MONGODB_URI=

# AI
GEMINI_API_KEY=

# Application URL
AUTH_URL=http://localhost:3000
```

---

### What These Actually Do

#### AUTH_SECRET

Used by Auth.js to secure sessions and authentication.

Think of it as the bouncer guarding your users.

---

#### AUTH_GOOGLE_ID

Your Google OAuth Client ID.

Without this:

Google will pretend it doesn't know you.

---

#### AUTH_GOOGLE_SECRET

Google OAuth Client Secret.

Keep this private.

GitHub does not need to know your secrets.

---

#### MONGODB_URI

Connection string for MongoDB.

This is where bookmarks, users, searches, and future bad decisions are stored.

---

#### GEMINI_API_KEY

API key for Google Gemini.

The AI brain of Arcanaz.

Without it, the AI becomes unemployed.

---

#### AUTH_URL

The application's public URL.

Local:

```env
AUTH_URL=http://localhost:3000
```

Production:

```env
AUTH_URL=https://your-domain.com
```

Use your actual deployment URL.

Not the example.

I believe in you.

---

## 😈 Future Plans

The roadmap is longer than my attention span.

Planned upgrades:

* 🕸️ Interactive Knowledge Graphs
* 🧠 AI Research Assistant
* 🛤️ Learning Paths
* 🔎 Semantic Search
* 📚 Smart Collections
* 🤝 Community Contributions
* 🚀 More things that sounded impossible at 3 AM

---

## 🤝 Contributing

Found a bug?

Nice.

Now we both know about it.

Feel free to:

1. Fork the project
2. Build something cool
3. Open a PR
4. Pretend the bug was a feature

---

## 🌱 Support

If Arcanaz helped you:

* understand something
* finish an assignment
* survive an exam
* win an argument
* avoid opening 37 browser tabs

Drop a ⭐.

GitHub stars don't pay rent.

But they do provide emotional support.

---

## ☕ Credits

Built with:

* Curiosity
* Caffeine
* Stack Overflow
* Google searches that got increasingly specific
* Multiple "why is this not working?" moments
* A concerning amount of determination

Special thanks to the open-source community for carrying modern software development on its back.

---

## 📄 License

Still grinding for an official license.

For now:

Feel free to explore the code.
Learn from it.
Break things (preferably not production).
Build something cooler than this.

A proper license is on the roadmap.

Right after I finish fighting bugs, shipping features, and pretending I know exactly what I'm doing. 😭

---

<div align="center">

### Built with curiosity, caffeine & an unhealthy relationship with debugging.

**Arcanaz — Knowledge Beyond Definitions.**

</div>
