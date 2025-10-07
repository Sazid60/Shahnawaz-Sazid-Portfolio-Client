## SHAHNAWAZ SAZID PORTFOLIO - CLEINT

### Project Overview

This is the frontend for the Portfolio project a modern, dynamic, and responsive portfolio web application.
It showcases my skills, projects, experience, and blogs, with a private admin dashboard for content management. My Portfolio Website built on Next.js + Prisma + Express.js + PostgreSQL + Typescript. The frontend is built with Next.js (App Router) and TypeScript, providing both static and dynamic rendering with ISR (Incremental Static Regeneration) for public content and SSR (Server-Side Rendering) for authenticated dashboard pages. It communicates with the backend via REST APIs built using Express.js and Prisma, deployed separately.

### Key Features

#### Public Features

- Home Page with interactive animations and personal introduction.
- Projects Page: Displays portfolio projects dynamically from backend.
- Blog Page: Lists all blog posts and individual blog details.
- About / Experience / Academics / Skills Sections.
- Contact Page with email form submission.
- Resume Download Button

### Authentication

- Next auth credential authentication
- Only Login with the automated seeded admin.
- Private protected route for dashboard routes

#### Admin Dashboard

- Protected via NextAuth (JWT session).
- Manage blogs, projects, academics, skills, resume, and experience.
- CRUD modals for adding, editing, and deleting data.
- Integrated image uploader (Cloudinary) for project and blog thumbnails.
- Form validation using React Hook Form + Zod.
- Rich text editor for blog and project.

#### Extra Features

- Built with Tailwind CSS v4 and Framer Motion for smooth animations.
- Radix UI + shadcn/ui components for accessible, consistent design.
- Sonner toast notifications for feedback.
- Fully responsive and optimized for all devices.

### Rendering Strategy Overview

| Page / Section                                       | Rendering Type                            | Description                                                                                                                                                                   |
| ---------------------------------------------------- | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Home Page**                                        | **SSG + ISR**                             | Statically generated at build time and revalidated periodically for updated experience data.                                                                                  |
| **Projects Page (`/projects`)**                      | **ISR (Incremental Static Regeneration)** | Projects are pre-rendered at build and automatically revalidated after a set interval to fetch new data from the backend without a full rebuild.                              |
| **Project Details (`/projects/[projectId]`)**        | **SSG with `generateStaticParams`**       | Individual project pages are pre-rendered for all available project IDs at build time for fast load and SEO.                                                                  |
| **Blogs Page (`/blogs`)**                            | **ISR**                                   | Lists all blogs dynamically from backend, regenerated periodically to keep content up-to-date.                                                                                |
| **Blog Details (`/blogs/[blogId]`)**                 | **SSG with `generateStaticParams`**       | Each blog post is statically generated at build time for fast performance and SEO.                                                                                            |
| **About / Experience / Academics / Skills Sections** | **SSG + ISR**                             | Statically generated pages that revalidate periodically to reflect latest profile data.                                                                                       |
| **Contact Page**                                     | **SSR**                                   | Rendered dynamically on each request to handle real-time form submission and server-side email logic.                                                                         |
| **Dashboard (Admin Area)**                           | **SSR (Protected)**                       | All `/dashboard` routes are server-side rendered for authenticated admin sessions using **NextAuth** (JWT session). Ensures secure, real-time data updates and form handling. |
| **Login Page**                                       | **SSR**                                   | Dynamically rendered to handle authentication state securely.                                                                                                                 |

### Tech Stacks

| Category            | Technology                           |
| ------------------- | ------------------------------------ |
| **Framework**       | Next.js 15 (App Router + Turbopack)  |
| **Language**        | TypeScript                           |
| **UI / Styling**    | Tailwind CSS v4, Radix UI, shadcn/ui |
| **State & Forms**   | React Hook Form + Zod                |
| **Animations**      | Framer Motion, Motion                |
| **Auth**            | NextAuth.js (JWT-based)              |
| **WYSIWYG Editor**  | Froala Editor                        |
| **Notifications**   | Sonner                               |
| **Deployment**      | Vercel                               |
| **Version Control** | Git + GitHub                         |

### Project Structure

```
├─ src
│  ├─ app/                     # App Router structure
│  │  ├─ (dashboard)/          # Protected admin dashboard pages
│  │  ├─ (public)/             # Public-facing pages
│  │  ├─ api/                  # NextAuth API route
│  │  ├─ layout.tsx            # Root layout
│  │  ├─ globals.css           # Global styles
│  │  ├─ error.tsx             # Error page
│  │  └─ not-found.tsx         # 404 page
│  ├─ components/              # Reusable UI components
│  │  ├─ modules/              # Feature-specific components
│  │  ├─ ui/                   # shadcn-ui components
│  │  ├─ shared/               # Navbar, Footer, etc.
│  │  ├─ solo-components/      # Individual small UI parts
│  │  └─ dashboard/            # Admin dashboard components
│  ├─ actions/                 # Client actions for CRUD requests
│  ├─ hooks/                   # Custom React hooks
│  ├─ lib/                     # Utilities and helper functions
│  ├─ providers/               # Context providers (Auth, Theme)
│  └─ types/                   # Global TypeScript types
├─ public/                     # Static assets
├─ next.config.ts              # Next.js configuration
├─ tsconfig.json               # TypeScript configuration
├─ tailwind.config.mjs         # Tailwind config
├─ postcss.config.mjs          # PostCSS config
├─ eslint.config.mjs           # ESLint config
└─ package.json

```

### Project Routes Overview

| Route                   | Description              | Access  |
| ----------------------- | ------------------------ | ------- |
| `/`                     | Home Page                | Public  |
| `/blogs`                | All blog posts           | Public  |
| `/blogs/[blogId]`       | Blog details             | Public  |
| `/projects`             | All projects             | Public  |
| `/projects/[projectId]` | Project details          | Public  |
| `/contact`              | Contact form             | Public  |
| `/login`                | Admin login page         | Public  |
| `/dashboard`            | Admin Dashboard Overview | Private |
| `/dashboard/blogs`      | Manage Blogs             | Private |
| `/dashboard/projects`   | Manage Projects          | Private |
| `/dashboard/skills`     | Manage Skills            | Private |
| `/dashboard/experience` | Manage Experience        | Private |
| `/dashboard/academics`  | Manage Academics         | Private |
| `/dashboard/resume`     | Manage Resume            | Private |

### Installation Steps

#### Clone the repository

```bash
git clone https://github.com/Sazid60/Shahnawaz-Sazid-Portfolio-Client

# Navigate into the project
cd b5a7-portfolio-frontend

```

#### Set The env

```bash
NEXT_PUBLIC_BASE_API=
NEXTAUTH_SECRET=
```

#### Install dependencies

```bash
npm install
```

#### Run in development mode

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

#### Start production server

```bash
npm start
```
