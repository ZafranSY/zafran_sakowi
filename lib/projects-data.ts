export interface ProjectData {
  id: string
  slug: string
  context: string
  name: string
  year: string
  status: "Production" | "Academic" | "Open Source"
  statusColor: string
  summary: string
  liveUrl?: string
  githubUrl?: string
  githubPublic: boolean
  stack: string[]
  impact: { metric: string; label: string }[]
  highlights: { label: string; sub: string }[]
  problem: string
  solution: string
  // Case study extras
  stakeholders: { role: string; responsibility: string }[]
  architecture: {
    overview: string
    layers: { name: string; description: string }[]
  }
  devSetup: {
    prerequisites: string[]
    steps: { cmd: string; note?: string }[]
  }
  challenges: { title: string; description: string }[]
  learnings: string[]
}

export const PROJECTS: ProjectData[] = [
  {
    id: "xfitness",
    slug: "xfitness",
    context: "Cipta Craft · Lead Developer",
    name: "XFitness",
    year: "2024",
    status: "Production",
    statusColor: "text-green-400 border-green-900/50 bg-green-950/20",
    summary:
      "Comprehensive gym management ecosystem integrating memberships, payments, QR-based access control, and trainer booking into a unified web + mobile platform. Consolidated multiple operational systems, reducing administrative overhead by 50%.",
    githubUrl: "https://github.com/zafransakowi",
    githubPublic: false,
    stack: ["Next.js 15", "React Native (Expo)", "Supabase", "PostgreSQL", "Cloudflare R2", "Razorpay", "TypeScript", "Docker"],
    impact: [
      { metric: "50%", label: "Reduction in admin overhead" },
      { metric: "< 3 min", label: "New member onboarding time" },
      { metric: "0 staff", label: "Required at entry gate" },
    ],
    highlights: [
      { label: "Payment Integration", sub: "Revenue Monster · Razorpay" },
      { label: "Real-time Chat", sub: "Trainer ↔ Member messaging" },
      { label: "QR Access Control", sub: "Keycard-free gym entry" },
      { label: "Row-Level Security", sub: "Supabase RLS enforcement" },
    ],
    problem:
      "The client operated a gym chain relying on spreadsheets, physical logbooks, and manual payment receipts. New member onboarding took 15–20 minutes per person, access control was handled by staff manually checking IDs, and trainers had no dedicated channel to communicate with members.",
    solution:
      "Architected a multi-tenant platform across web (Next.js 15) and mobile (React Native / Expo) backed by a single Supabase + PostgreSQL database with row-level security. Integrated Revenue Monster and Razorpay for payment processing, a QR-code generation system for keycard-free gym entry, and a real-time chat layer for trainer–member messaging.",
    stakeholders: [
      { role: "Gym Owner (Client)", responsibility: "Final approval on feature scope, payment gateway selection, and brand requirements" },
      { role: "Gym Manager", responsibility: "Day-to-day admin dashboard user — key tester for onboarding and reporting flows" },
      { role: "Trainers", responsibility: "Primary users of the mobile app for session booking and member chat" },
      { role: "Members", responsibility: "End-consumers of both web portal and mobile app; QR entry and payment flows" },
      { role: "Zafran (Lead Dev)", responsibility: "System architecture, full-stack development, DevOps, payment integration" },
    ],
    architecture: {
      overview:
        "Three-tier architecture: a Next.js 15 web dashboard (admin + member portal), a React Native Expo mobile app (trainer + member-facing), and a shared Supabase backend (PostgreSQL + Auth + Realtime + Storage). All database access is governed by Supabase Row-Level Security policies — no server-side proxy needed for read paths. Write operations that require payment or QR validation go through edge functions.",
      layers: [
        { name: "Web Dashboard (Next.js 15)", description: "App Router with Server Components for data fetching. Admin CRUD for members, packages, and reports. Member portal for booking and payment history. Deployed on Vercel with environment-scoped Supabase keys." },
        { name: "Mobile App (React Native / Expo)", description: "Expo Router for file-based navigation. Trainer dashboard for session management and real-time chat. Member app for QR entry display, class booking, and payment. OTA updates via Expo EAS." },
        { name: "Supabase Backend", description: "PostgreSQL with RLS policies per user role. Supabase Auth (JWT) for session management. Supabase Realtime for chat subscriptions. Supabase Storage + Cloudflare R2 for media assets." },
        { name: "Payment Layer", description: "Razorpay for card payments (web). Revenue Monster for local e-wallet support (TNG, Boost, ShopeePay). Webhook receivers validate and write to the payments table inside a DB transaction." },
        { name: "QR Access Control", description: "On check-in, the member's app generates a time-scoped JWT-signed QR code. The gym's tablet scanner decodes and verifies the signature + expiry server-side before granting entry." },
      ],
    },
    devSetup: {
      prerequisites: ["Node.js 20+", "pnpm", "Supabase CLI", "Expo CLI", "Docker (for local Supabase)"],
      steps: [
        { cmd: "git clone https://github.com/zafransakowi/xfitness-web && cd xfitness-web" },
        { cmd: "pnpm install" },
        { cmd: "cp .env.example .env.local", note: "Fill in NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, RAZORPAY_KEY_ID, etc." },
        { cmd: "supabase start", note: "Starts local Postgres + Auth + Storage" },
        { cmd: "supabase db push", note: "Applies migrations and seed data" },
        { cmd: "pnpm dev", note: "Starts Next.js dev server on localhost:3000" },
        { cmd: "# Mobile: cd ../xfitness-mobile && pnpm install && npx expo start" },
      ],
    },
    challenges: [
      {
        title: "Multi-gateway payment reconciliation",
        description:
          "Revenue Monster and Razorpay have different webhook schemas and retry behaviours. A payment could be confirmed by the gateway but the webhook could arrive out-of-order or duplicated. Solved with idempotency keys stored in the DB — every webhook handler checks for an existing processed event ID before writing.",
      },
      {
        title: "RLS policy complexity at scale",
        description:
          "Supabase RLS policies are powerful but can become a performance liability with joins across many tables. Early policies were written naively and caused N+1 query patterns. Refactored using security definer functions and materialised role checks to keep query plans efficient.",
      },
      {
        title: "QR code replay attacks",
        description:
          "Early prototype used static member IDs as QR content — trivially screenshotted and reused. Replaced with HMAC-SHA256 signed tokens with a 90-second expiry window. Scanner validates signature and timestamp server-side before granting entry.",
      },
    ],
    learnings: [
      "Design your RLS policies before your schema — retrofitting them is painful.",
      "Payment webhooks are unreliable; always build idempotency into your write handlers.",
      "Expo EAS makes OTA updates genuinely painless for iterating with clients without a full app-store review cycle.",
      "Supabase Realtime is easy to get started with but needs careful channel management to avoid memory leaks in React Native.",
    ],
  },
  {
    id: "anjung-meriah",
    slug: "anjung-meriah",
    context: "Cipta Craft · Full-Stack Dev",
    name: "Anjung Meriah CMS",
    year: "2024",
    status: "Production",
    statusColor: "text-green-400 border-green-900/50 bg-green-950/20",
    summary:
      "Full-stack corporate platform with a public-facing marketing website and a secure internal CMS. Designed for zero developer intervention in daily operations — all content managed through the admin panel.",
    liveUrl: "https://anjungmeriah.com",
    githubUrl: "https://github.com/zafransakowi",
    githubPublic: false,
    stack: ["Next.js", "TypeScript", "PostgreSQL", "JWT", "shadcn/ui", "Docker", "Nginx"],
    impact: [
      { metric: "100%", label: "Content managed by non-devs" },
      { metric: "ISR", label: "Page rebuilds in < 1s" },
      { metric: "∞", label: "Append-only audit trail" },
    ],
    highlights: [
      { label: "Public Site + CMS", sub: "Decoupled architecture" },
      { label: "JWT Auth", sub: "Rate-limited admin panel" },
      { label: "Full CRUD", sub: "Projects, media, promotions" },
      { label: "ISR", sub: "Next.js incremental static regen" },
    ],
    problem:
      "A property development firm needed their website rebuilt, but had no technical team to manage content updates. Every text change required contacting the original developer and waiting days for deployment.",
    solution:
      "Built a decoupled architecture: a statically generated Next.js public site (ISR for near-instant rebuilds) and a private admin CMS protected by JWT auth with rate limiting. All models are database-driven and fully CRUD-capable from the dashboard.",
    stakeholders: [
      { role: "Property Developer (Client)", responsibility: "Business owner — defines content categories, approves design system, and manages day-to-day content" },
      { role: "Marketing Team", responsibility: "Primary CMS users — upload property listings, promotions, and media assets" },
      { role: "Site Visitors", responsibility: "Public-facing audience — prospective property buyers browsing listings" },
      { role: "Zafran (Developer)", responsibility: "Full system design, frontend, backend, CMS, deployment, and ongoing support" },
    ],
    architecture: {
      overview:
        "Monorepo with two Next.js applications sharing a PostgreSQL database. The public site is statically generated with ISR — each page revalidates on a schedule or on-demand when the CMS triggers a revalidation webhook. The admin panel is a separate Next.js app behind JWT auth, served from the same Docker host via Nginx reverse proxy.",
      layers: [
        { name: "Public Site (Next.js ISR)", description: "Statically generated pages for property listings, services, and promotions. On-demand revalidation triggered from the CMS on any content save. Cloudflare CDN sits in front for global edge caching." },
        { name: "Admin CMS (Next.js App Router)", description: "Server Actions for all mutations. shadcn/ui component library for consistent admin UI. JWT sessions stored in httpOnly cookies. Rate limiting middleware on auth endpoints." },
        { name: "Database (PostgreSQL)", description: "Single database shared by both apps. Separate schemas for public-readable content and admin audit logs. Append-only audit_log table records every mutation with actor, timestamp, and diff." },
        { name: "Media Pipeline", description: "File uploads go directly to Cloudflare R2 from the browser via pre-signed URLs. Metadata (filename, size, alt text, URL) is stored in the DB. No server memory pressure from file uploads." },
        { name: "Infra (Docker + Nginx)", description: "Both Next.js apps containerised with Docker. Nginx reverse proxy routes traffic by subdomain. Deployed on a self-hosted VPS. Let's Encrypt certificates auto-renewed via Certbot." },
      ],
    },
    devSetup: {
      prerequisites: ["Node.js 20+", "pnpm", "Docker + Docker Compose", "PostgreSQL 16"],
      steps: [
        { cmd: "git clone https://github.com/zafransakowi/anjung-meriah && cd anjung-meriah" },
        { cmd: "cp .env.example .env", note: "Set DATABASE_URL, JWT_SECRET, R2_BUCKET, REVALIDATE_TOKEN" },
        { cmd: "docker compose up -d postgres", note: "Starts local Postgres" },
        { cmd: "pnpm install && pnpm db:migrate", note: "Runs Drizzle ORM migrations" },
        { cmd: "pnpm dev:cms", note: "CMS on localhost:3001" },
        { cmd: "pnpm dev:public", note: "Public site on localhost:3000" },
      ],
    },
    challenges: [
      {
        title: "On-demand ISR without a paid plan",
        description:
          "Vercel's on-demand revalidation is straightforward on their platform but we were self-hosting. Implemented a custom revalidation webhook endpoint in the public site that the CMS calls after each save — secured with a shared secret token — which calls Next.js's res.revalidate() internally.",
      },
      {
        title: "Media upload UX for non-technical users",
        description:
          "The client's marketing team had no experience with file size constraints or image formats. Added client-side image compression (browser-image-compression library) before upload and enforced 5MB hard limits with clear error messages. Reduced average upload size by 70%.",
      },
    ],
    learnings: [
      "ISR on self-hosted Next.js requires deliberate plumbing — the revalidation webhook pattern is simple once understood but not obvious from the docs.",
      "Designing for non-technical users means UX constraints are as important as API design.",
      "An append-only audit log is cheap to build upfront and invaluable when clients ask 'who changed this?'",
    ],
  },
  {
    id: "florascan",
    slug: "florascan",
    context: "Final Year Project · ML Developer",
    name: "FloraScan",
    year: "2024",
    status: "Academic",
    statusColor: "text-amber-400 border-amber-900/50 bg-amber-950/20",
    summary:
      "AI-powered papaya crop diagnostic tool using a two-stage ML pipeline: EfficientNetB0 for disease image classification, followed by a Hugging Face LLM generating human-readable treatment recommendations.",
    githubUrl: "https://github.com/zafransakowi/florascan",
    githubPublic: true,
    stack: ["Python", "FastAPI", "TensorFlow", "EfficientNetB0", "Hugging Face", "Docker", "React Native"],
    impact: [
      { metric: "92%", label: "Disease classification accuracy" },
      { metric: "2-stage", label: "Vision + language pipeline" },
      { metric: "< 3s", label: "End-to-end inference time" },
    ],
    highlights: [
      { label: "EfficientNetB0", sub: "Custom-trained disease classifier" },
      { label: "Hugging Face LLM", sub: "Treatment text generation" },
      { label: "FastAPI Backend", sub: "REST API inference layer" },
      { label: "Containerised", sub: "Docker + CI/CD pipeline" },
    ],
    problem:
      "Malaysian smallholder papaya farmers lack affordable, real-time access to crop disease diagnostics. Agronomist consultations are expensive and slow — by the time a diagnosis is made, crop damage has spread significantly.",
    solution:
      "Trained a custom EfficientNetB0 model on a curated papaya disease dataset for multi-class image classification. A second stage pipes the classification result into a Hugging Face LLM that generates plain-language treatment recommendations in Bahasa Malaysia and English.",
    stakeholders: [
      { role: "Academic Supervisor", responsibility: "Research guidance, model evaluation criteria, and thesis assessment" },
      { role: "Smallholder Farmers (End Users)", responsibility: "Target users — evaluated usability and diagnostic trust during field testing" },
      { role: "UTM Department of Computing", responsibility: "Project scope approval and academic evaluation panel" },
      { role: "Zafran (ML Developer + Backend)", responsibility: "Dataset curation, model training, FastAPI backend, Docker deployment, React Native frontend" },
    ],
    architecture: {
      overview:
        "Two-stage inference pipeline exposed via a FastAPI REST API. Stage 1: A fine-tuned EfficientNetB0 model classifies the uploaded leaf image into one of 7 disease categories. Stage 2: The label and confidence score are passed as a structured prompt to a Hugging Face Inference API (Mistral-7B-Instruct) which generates a treatment recommendation paragraph. The mobile app sends images to the API and renders results.",
      layers: [
        { name: "React Native Frontend", description: "Camera capture and gallery picker for leaf image input. Displays classification result with confidence bar and LLM-generated treatment text. Supports both English and Bahasa Malaysia output." },
        { name: "FastAPI Backend", description: "Single /predict endpoint accepts multipart image upload. Preprocesses image (resize, normalize) before passing to the TF SavedModel. Constructs prompt from classification output and calls HF Inference API. Returns structured JSON." },
        { name: "EfficientNetB0 Model", description: "Fine-tuned on a curated dataset of 2,800 papaya leaf images across 7 classes (healthy + 6 disease types). Transfer learning from ImageNet weights. Saved as TensorFlow SavedModel for efficient serving." },
        { name: "Hugging Face LLM Layer", description: "Mistral-7B-Instruct via HF Inference API. Prompt engineering to produce structured, actionable recommendations. Fallback to a static recommendation template if API call fails or exceeds timeout." },
        { name: "Docker Deployment", description: "FastAPI + TF model containerised in a single image. Model weights baked into the image at build time for zero cold-start latency. Deployed on self-hosted Ubuntu server." },
      ],
    },
    devSetup: {
      prerequisites: ["Python 3.11+", "Docker", "Hugging Face API key", "Expo CLI (for mobile)"],
      steps: [
        { cmd: "git clone https://github.com/zafransakowi/florascan && cd florascan" },
        { cmd: "python -m venv venv && source venv/bin/activate" },
        { cmd: "pip install -r requirements.txt" },
        { cmd: "cp .env.example .env", note: "Set HF_API_KEY and MODEL_PATH" },
        { cmd: "# To train model: python train.py --epochs 30 --data ./dataset", note: "Or download pre-trained weights from releases" },
        { cmd: "uvicorn app.main:app --reload", note: "API on localhost:8000" },
        { cmd: "# Docker: docker build -t florascan . && docker run -p 8000:8000 florascan" },
      ],
    },
    challenges: [
      {
        title: "Small dataset with high class imbalance",
        description:
          "The papaya disease dataset had severe imbalance — healthy samples outnumbered some disease classes 8:1. Addressed with weighted loss functions, aggressive data augmentation (random crop, flip, brightness jitter, mixup), and class-weighted sampling during training. Validation F1 improved from 0.74 to 0.91 after these interventions.",
      },
      {
        title: "LLM latency in a mobile context",
        description:
          "The HF Inference API adds 1.5–2.5s of latency to each request. On slow Malaysian mobile networks this felt unacceptable. Implemented optimistic UI — shows the classification result immediately while the LLM recommendation streams in separately, so the user sees useful output within 1 second.",
      },
      {
        title: "Prompt engineering for agricultural domain",
        description:
          "General-purpose LLM prompts produced verbose, academic-sounding recommendations. Iteratively refined the system prompt with few-shot examples of good recommendations (concise, actionable, locally-relevant). Also added a post-processing step to strip disclaimers and references to 'consult a doctor'.",
      },
    ],
    learnings: [
      "Transfer learning with EfficientNet is remarkably effective even on small, domain-specific datasets — you don't need millions of images.",
      "Dataset quality beats quantity: cleaning mislabelled images had more impact than adding more raw data.",
      "Optimistic UI patterns significantly improve perceived performance on slow networks — show what you have immediately.",
      "Prompt engineering is an iterative craft — budget time for it like you would for model tuning.",
    ],
  },
  {
    id: "tvpss",
    slug: "tvpss",
    context: "Academic Project · Full-Stack Dev",
    name: "TVPSS Management Information System",
    year: "2023",
    status: "Academic",
    statusColor: "text-amber-400 border-amber-900/50 bg-amber-950/20",
    summary:
      "Centralised system for managing school TV station operations across Johor. Role-based access for administrators, teachers, and student crews, covering scheduling, equipment inventory, and automated student onboarding workflows.",
    githubUrl: "https://github.com/zafransakowi/tvpss-mis",
    githubPublic: true,
    stack: ["Java", "Spring Boot", "Hibernate", "MySQL", "REST APIs", "Thymeleaf"],
    impact: [
      { metric: "35%", label: "Reporting efficiency improvement" },
      { metric: "3-tier", label: "Role-based access control" },
      { metric: "0 emails", label: "For standard crew onboarding" },
    ],
    highlights: [
      { label: "Role-based Access", sub: "3-tier hierarchy" },
      { label: "Hibernate ORM", sub: "MySQL schema + audit log" },
      { label: "REST APIs", sub: "Scheduling + inventory endpoints" },
      { label: "Layered Architecture", sub: "Controller / Service / Repo" },
    ],
    problem:
      "The Johor state education department managed dozens of school TV stations (TVPSS) through a fragmented system of emails, Excel sheets, and phone calls. Equipment tracking was unreliable, and student crew management had no audit trail.",
    solution:
      "Designed a layered Java Spring Boot application with Hibernate ORM and a MySQL database. Three distinct role hierarchies (state admin, school admin, teacher/crew) each see tailored dashboards. RESTful API endpoints support scheduling, inventory CRUD, and a bulk-onboarding CSV import for student crews.",
    stakeholders: [
      { role: "Johor State Education Dept.", responsibility: "System owner — state-level admin who manages all schools' TVPSS data and generates compliance reports" },
      { role: "School Administrators", responsibility: "Per-school admin — manages teacher assignments, equipment inventory, and student crew rosters" },
      { role: "Teachers / Crew Advisors", responsibility: "Manage production schedules and supervise student crew activities" },
      { role: "Student Crews", responsibility: "End users — view their schedules and assigned roles via the student portal" },
      { role: "Development Team (4 members)", responsibility: "Academic group project; Zafran led backend architecture and REST API design" },
    ],
    architecture: {
      overview:
        "Classic layered Spring Boot MVC application. Controller layer handles HTTP routing and input validation. Service layer contains business logic. Repository layer abstracts MySQL via Spring Data JPA / Hibernate. Thymeleaf renders server-side HTML views. REST endpoints coexist with MVC controllers for AJAX-powered dashboard widgets.",
      layers: [
        { name: "Controller Layer", description: "Spring MVC @RestController and @Controller classes. Input validation via Jakarta Bean Validation. Role-based route protection via Spring Security with method-level @PreAuthorize annotations." },
        { name: "Service Layer", description: "Business logic — scheduling conflict detection, inventory availability checks, CSV parsing for bulk student import. Transactional boundaries managed with @Transactional." },
        { name: "Repository Layer", description: "Spring Data JPA repositories over Hibernate ORM. Custom JPQL queries for reporting aggregations. Optimistic locking on inventory records to prevent concurrent over-allocation." },
        { name: "Database (MySQL)", description: "Normalised schema with tables for schools, users, equipment, schedules, and crews. Audit log table captures all state changes. Database migrations managed with Flyway." },
        { name: "Frontend (Thymeleaf)", description: "Server-rendered HTML templates with Bootstrap 5 for layout. AJAX calls to REST endpoints for dynamic table filtering and dashboard charts (Chart.js)." },
      ],
    },
    devSetup: {
      prerequisites: ["Java 21 (JDK)", "Maven 3.9+", "MySQL 8+", "IntelliJ IDEA (recommended)"],
      steps: [
        { cmd: "git clone https://github.com/zafransakowi/tvpss-mis && cd tvpss-mis" },
        { cmd: "mysql -u root -p < src/main/resources/schema.sql", note: "Creates tvpss_db and initial schema" },
        { cmd: "cp src/main/resources/application.example.properties src/main/resources/application.properties", note: "Set spring.datasource.url, username, password" },
        { cmd: "mvn spring-boot:run", note: "App runs on localhost:8080" },
        { cmd: "# Default admin login: admin@tvpss.edu.my / Admin1234!" },
      ],
    },
    challenges: [
      {
        title: "Designing a three-tier role hierarchy",
        description:
          "State admin, school admin, and teacher/crew roles have overlapping but distinct data visibility. A state admin can see all schools; a school admin only their own; a teacher only their own schedules. Implemented with Spring Security's method-level security and service-layer ownership checks rather than pure database-level filtering, which kept the SQL simpler but required careful test coverage.",
      },
      {
        title: "Bulk CSV import reliability",
        description:
          "The client required importing 300+ student records from Excel exports. CSV parsing had to handle inconsistent column ordering, BOM characters, and duplicate entries. Built a multi-pass validator that first checks for structural errors, then for duplicates, and only writes to the DB if the entire batch is clean — giving a clear error report before any data is committed.",
      },
    ],
    learnings: [
      "Spring Security's method-level @PreAuthorize is more maintainable than URL-based rules for complex role hierarchies.",
      "Flyway database migrations from day one prevent the 'works on my machine' schema drift problem in team projects.",
      "Transactional batch imports should validate entirely before writing — partial commits create worse state than a clean failure.",
      "Optimistic locking is easy to add with JPA and prevents subtle concurrent-update bugs that only appear under real usage.",
    ],
  },
  {
    id: "job-email",
    slug: "job-email",
    context: "Personal Project · Full-Stack + AI",
    name: "Job Application AI Tool",
    year: "2025",
    status: "Open Source",
    statusColor: "text-sky-400 border-sky-900/50 bg-sky-950/20",
    summary:
      "AI-powered suite that generates tailored job application emails and optimizes resumes using Google Gemini 2.5 Flash. Evolved from a single-purpose generator into a full Career Operating System with a Kanban pipeline, bulk JSON ingestion, and PostgreSQL-backed persistence.",
    githubUrl: "https://github.com/ZafranSY/job-email",
    githubPublic: true,
    liveUrl: undefined,
    stack: ["Python", "FastAPI", "React.js", "Google Gemini 2.5 Flash", "SQLAlchemy", "SQLite", "PostgreSQL", "Docker"],
    impact: [
      { metric: "5+", label: "Input modes (text, PDF, image, URL)" },
      { metric: "2", label: "AI endpoints (email + resume)" },
      { metric: "O(1)", label: "Local OCR compute cost" },
    ],
    highlights: [
      { label: "Gemini Vision OCR", sub: "No Tesseract — pure API OCR" },
      { label: "Kanban Pipeline", sub: "Applied → Offer tracking board" },
      { label: "ATS Resume Tuner", sub: "Keyword alignment + match score" },
      { label: "Bulk JSON Import", sub: "Multi-application ingestion" },
    ],
    problem:
      "Job seekers waste hours manually tailoring emails and resumes for each application, with no systematic way to track which roles they've applied to or which documents they sent. Traditional OCR tools require heavy system dependencies, making the setup painful.",
    solution:
      "Built a decoupled FastAPI + React.js platform that accepts job descriptions and resumes through any format — text paste, PDF upload, image upload (OCR via Gemini vision), or a direct URL. Gemini 2.5 Flash generates tailored emails and ATS-optimised resume rewrites. A SQLAlchemy-backed application tracker with Kanban and list views manages the full job application lifecycle.",
    stakeholders: [
      { role: "Job Seekers (End Users)", responsibility: "Primary users — generate tailored application materials and track pipeline stages" },
      { role: "Zafran (Developer)", responsibility: "Full system architecture, AI prompt engineering, backend, frontend, and database design" },
      { role: "Open Source Community", responsibility: "Public GitHub contributors — feature requests, bug reports, and pull requests" },
    ],
    architecture: {
      overview:
        "Decoupled client-server architecture. A React.js SPA handles all UI state (tone, length, focus strategy, view mode). A FastAPI backend exposes two core endpoints (/generate for emails, /tailor-resume for resumes) plus CRUD routes for the application tracker. Multi-modal inputs are normalised server-side into a unified text context before being fed to the Gemini API. State is persisted via SQLAlchemy ORM — SQLite for local dev, PostgreSQL for production.",
      layers: [
        { name: "React.js Frontend (SPA)", description: "State managed via React hooks. Supports Kanban board (drag-to-transition stages), dense list table with badge filters, and a glassmorphic floating drawer for application detail views. Tone, length, and focus strategy selectors drive generation parameters." },
        { name: "FastAPI Backend (Async)", description: "Python async event loop via uvicorn. Non-blocking request handlers process multipart/form-data uploads concurrently. Routes: POST /generate, POST /tailor-resume, full CRUD for /applications. Alembic manages schema migrations." },
        { name: "Multi-Modal Ingestion Layer", description: "Accepts text strings, PDF byte streams (text extracted server-side), raw image buffers (passed directly to Gemini vision as inline data), and HTTP URLs (fetched and parsed server-side). No Tesseract or poppler binaries required — OCR is entirely offloaded to Gemini's vision API." },
        { name: "Gemini 2.5 Flash Orchestration", description: "Structured prompts enforce rigid JSON response schemas. POST /generate returns subject, body, keywords[], match_score, and tips[]. POST /tailor-resume returns header, summary, experience, keywords[], and match_score. Prompt templates are parameterised by tone (professional/concise/formal/etc.), length, and focus strategy." },
        { name: "Database Layer (SQLAlchemy + Alembic)", description: "SQLAlchemy ORM abstracts the storage backend. Single env variable switches between SQLite (sqlite:///./career_os.db) and PostgreSQL (postgresql://...). Alembic migration scripts track schema evolution. ACID-compliant transactions protect bulk import operations." },
      ],
    },
    devSetup: {
      prerequisites: ["Python 3.9+", "Node.js 18+", "Gemini API key (free at aistudio.google.com)", "Docker (optional, for PostgreSQL)"],
      steps: [
        { cmd: "git clone https://github.com/ZafranSY/job-email.git && cd job-email" },
        { cmd: "# Option 1 — one-command start (Mac/Linux)" },
        { cmd: "chmod +x start.sh && ./start.sh" },
        { cmd: "# Option 2 — manual" },
        { cmd: "cd backend && echo 'GEMINI_API_KEY=your_key_here' > .env" },
        { cmd: "python -m venv venv && source venv/bin/activate && pip install -r requirements.txt" },
        { cmd: "uvicorn main:app --reload --port 8000", note: "Backend API on localhost:8000" },
        { cmd: "cd ../frontend && npm install && npm start", note: "Frontend on localhost:3000" },
        { cmd: "# PostgreSQL (optional): docker run --name career-os-postgres -e POSTGRES_PASSWORD=mysecretpassword -e POSTGRES_DB=career_os -p 5432:5432 -d postgres" },
      ],
    },
    challenges: [
      {
        title: "Eliminating server-side OCR dependencies",
        description:
          "Traditional OCR pipelines require libtesseract and poppler system binaries, massively increasing container footprint and creating memory bottlenecks under concurrent usage. Refactored to pass raw image byte buffers directly to Gemini's multi-modal API as inline data payloads. This offloads all OCR compute to Google's infrastructure, bringing local OCR cost to O(1) — zero system dependencies, zero memory overhead on the server.",
      },
      {
        title: "Enforcing structured JSON from LLM outputs",
        description:
          "Raw Gemini responses were initially free-form text — unparseable by the frontend without post-processing fragility. Implemented a strict response_schema in the Gemini API call that enforces exact field names and types. Added a fallback parsing layer that extracts JSON from markdown code fences if the model wraps output in triple backticks. This eliminated all parsing failures in production.",
      },
      {
        title: "Transitioning from ephemeral tool to stateful Career OS",
        description:
          "The original generator had zero persistence — every session was stateless. Adding the application tracker required a full relational schema, migration tooling, and a UI that supports two distinct view modes (Kanban and dense list) without a page reload. Implemented Alembic for schema versioning and a SQLAlchemy session factory that swaps backends via a single environment variable — no code changes required to go from SQLite to PostgreSQL.",
      },
    ],
    learnings: [
      "Offloading OCR to a vision LLM eliminates an entire class of server dependency problems — the tradeoff is latency, which is acceptable for async user-facing generation.",
      "Enforcing JSON schemas in LLM API calls is more reliable than post-processing free-form text — build the schema contract first, then write the prompt around it.",
      "SQLAlchemy's session abstraction makes database backend swaps genuinely painless — but you must commit to it from day one, not retrofit it after writing raw SQL.",
      "Kanban UI feels simple to design but is deceptively complex to implement correctly with optimistic updates and concurrent stage transitions.",
      "A well-scoped README is a product in itself — the open-source adoption rate correlates directly with setup friction.",
    ],
  },
  {
    id: "automation-wasap",
    slug: "automation-wasap",
    context: "Open Source · Core Developer",
    name: "WhatsApp Automation & Third-Party Sync Engine",
    year: "2025",
    status: "Open Source",
    statusColor: "text-sky-400 border-sky-900/50 bg-sky-950/20",
    summary:
      "An enterprise-grade, headless browser automation engine designed to programmatically interface with WhatsApp Web infrastructure without relying on official API wrappers. Features an advanced anti-detection stealth framework, decoupled filtering pipelines, and real-time syncing to Notion workspaces.",
    githubUrl: "https://github.com/ZafranSY/automation-wasap.git",
    githubPublic: true,
    stack: ["Python", "Playwright", "Selenium", "Notion API", "YAML", "Unittest"],
    impact: [
      { metric: "Stealth", label: "Anti-bot evasion framework" },
      { metric: "Real-time", label: "Notion workspace synchronization" },
      { metric: "Modular", label: "Pipeline architecture pattern" },
    ],
    highlights: [
      { label: "Stealth Injector", sub: "Bypasses behavioral telemetry scanners" },
      { label: "Modular Pipeline", sub: "Decoupled engine, filters, sync layers" },
      { label: "Notion Integration", sub: "Asynchronous real-time telemetry syncing" },
      { label: "Local Fallback", sub: "State reconciliation on network blips" },
    ],
    problem:
      "Enterprise operations require programmatically interfacing with WhatsApp messages to synchronize states and logging telemetry to platforms like Notion. However, modern bot mitigation systems employ sophisticated behavioral fingerprinting (analyzing navigator.webdriver flags, WebGL capabilities, mouse movements) that instantly block standard headless automation engines. Additionally, real-time sync introduces a high risk of duplicate records or data gaps during API rate limits and network blips.",
    solution:
      "Developed a Python-based headless browser automation engine powered by Playwright and Selenium, featuring a modular pipeline architecture with isolated boundaries. The engine includes a stealth injection layer that dynamically overrides client-side JavaScript automation properties and simulates human-like timing variations to evade detection. To handle network blips, the pipeline uses an isolated filter layer and a localized exclusion system (excluded_log.txt) for robust state reconciliation without duplication.",
    stakeholders: [
      { role: "Enterprise Operations Team", responsibility: "Utilize real-time WhatsApp logging and message synchronization to Notion for business tracking" },
      { role: "Automation Developers", responsibility: "Maintain browser wrapper mechanics, update xpath and class selectors as WhatsApp Web layout evolves" },
      { role: "Zafran (Lead Architect)", responsibility: "Designed the bot evasion abstraction layer, central pipeline supervisor, and the synchronization engine" },
    ],
    architecture: {
      overview:
        "The system implements a Modular Pipeline Architecture across four decoupled components: an Infrastructure Layer (for low-level browser orchestration and stealth injection), a Processing Pipeline (for page state management and DOM event extraction), a Logical Filter Layer (for payload screening and local state tracking), and an External Sync Layer (for shipping messages to the Notion API). This ensures that scraping mechanics, filter rules, and third-party integrations can be updated independently without affecting one another.",
      layers: [
        { name: "Infrastructure & Evasion Layer (browser.py, stealth.py)", description: "Configures headless/headful Playwright/Selenium instances. Dynamically overrides client-side JS flags (such as navigator.webdriver) and mimics human-like mouse movement delays to bypass advanced bot protection systems." },
        { name: "Processing Supervisor (engine.py, main.py)", description: "Serves as the execution coordinator. Monitors page states, tracks real-time chat DOM mutations, extracts message payloads, and pipes them securely to the logic pipeline." },
        { name: "Logical Filter Layer (filters.py, excluded_log.txt)", description: "An isolated step in the data pipeline. Screens extracted payloads against configurable business rules, filtering out unwanted logs and maintaining a local exclusion state to guarantee zero duplication." },
        { name: "External Sync Integration (notion_sync.py)", description: "A third-party state synchronizer. Standardizes message payloads and dispatches them asynchronously to the target Notion database via the Notion REST API with rate-limit handling." },
      ],
    },
    devSetup: {
      prerequisites: ["Python 3.9+", "Playwright / Selenium", "Notion API Integration Token"],
      steps: [
        { cmd: "git clone https://github.com/ZafranSY/automation-wasap.git && cd automation-wasap" },
        { cmd: "python -m venv venv && source venv/bin/activate", note: "Windows: venv\\Scripts\\activate" },
        { cmd: "pip install -r requirements.txt" },
        { cmd: "cp config/settings.yaml.example config/settings.yaml", note: "Or edit existing config/settings.yaml with database_id and api_key" },
        { cmd: "python main.py", note: "Starts the automation orchestration engine" },
        { cmd: "python -m unittest src/test_filters.py", note: "Runs filter matrix unit tests" },
        { cmd: "python -m unittest src/test_browser.py", note: "Runs browser context validation tests" },
      ],
    },
    challenges: [
      {
        title: "Anti-Automation Telemetry & Bot Mitigation Bypasses",
        description:
          "Modern web applications deploy sophisticated fingerprinting algorithms that analyze browser properties (such as navigator.webdriver flags, WebGL capabilities, and exact mouse movement delays) to detect and block headless chromium instances instantly. Mitigation: Developed an independent stealth abstraction layer (src/stealth.py) that modifies runtime browser configurations and injects custom evaluation scripts before loading page code, effectively masking automation variables and simulating randomized timing patterns.",
      },
      {
        title: "Processing Synchronization Failures & Network Blips",
        description:
          "Synchronizing data between real-time browser streams and a cloud-based API introduces a high risk of message duplication or data gaps whenever network calls drop, rate limits hit, or browser sessions reset. Mitigation: Built a defensive logging system backed by strict message filter logic (src/filters.py, data/excluded_log.txt). The platform maintains a localized exclusion record to track previously handled states, falling back gracefully to local logs in the event of API sync failures.",
      },
    ],
    learnings: [
      "Bypassing modern bot detection requires overriding browser variables *before* any client-side script executes — late injection is useless.",
      "Decoupling data extraction (scraping) from data persistence (syncing) makes the codebase resilient to API changes and rate limit adjustments.",
      "Local state fallbacks are essential for headless automation platforms that lack built-in queueing mechanisms.",
      "Rigorous unit testing of page/DOM extraction logic is vital since target web platforms change their UI structures frequently.",
    ],
  },
  {
    id: "study-flow",
    slug: "study-flow",
    context: "Academic Project · Full-Stack Dev",
    name: "StudyFlow ERP & Academic Analytics Engine",
    year: "2024",
    status: "Academic",
    statusColor: "text-amber-400 border-amber-900/50 bg-amber-950/20",
    summary:
      "An enterprise academic ERP and performance tracking portal designed to automate grading workflows, advisor intervention channels, and multi-tenant student tracking. Features dynamic Vite + Vue 3 client-side analytics dashboards and a native custom Object-Oriented PHP REST API engine protected by JWT authentication middleware.",
    githubUrl: "https://github.com/ZafranSY/study-flow.git",
    githubPublic: true,
    stack: ["Vue.js 3", "Vite", "TypeScript", "Pinia", "PHP", "MySQL", "Nginx", "Docker", "Tailwind CSS", "Swagger"],
    impact: [
      { metric: "Vite + Vue 3", label: "Client-side analytics engine" },
      { metric: "Native PHP", label: "Object-Oriented API service" },
      { metric: "Multi-Role", label: "Custom dashboard matrices" },
    ],
    highlights: [
      { label: "Role-Based Guards", sub: "Admins, Advisors, Lecturers, Students" },
      { label: "JWT Auth Middleware", sub: "Stateless secure session tracking" },
      { label: "Client Analytics", sub: "Vue-based peer matrix comparison" },
      { label: "OpenAPI / Swagger", sub: "Interactive route contracts" },
    ],
    problem:
      "Traditional educational facilities rely on outdated, manual grading spreadsheets and disjointed, error-prone academic record keeping. This fragmentation slows down advisor intervention loops, makes real-time student performance comparison extremely difficult, and leaves student grade-remarking workflows opaque and unmonitored.",
    solution:
      "Engineered StudyFlow, a multi-tenant academic ERP designed with a decoupled client-server model. It implements dynamic Vue 3 dashboards tailored for administrators, lecturers, academic advisors, and students. The backend utilizes a Native OOP PHP REST API with Custom JWT authentication middleware, orchestrating grading pipelines, peer matrices, and re-marking loops inside a containerized Docker-Compose stack.",
    stakeholders: [
      { role: "Academic Advisors", responsibility: "Monitor student tracking systems, manage academic intervention alerts, and evaluate peer performance matrices" },
      { role: "Lecturers / Instructors", responsibility: "Manage course assessment components, submit grading records, and review re-marking requests" },
      { role: "Students", responsibility: "Track grades, review performance against peer averages, and submit academic re-marking requests" },
      { role: "Zafran (Lead Architect)", responsibility: "Designed the multi-role state engine, built the OOP PHP service engine, secure JWT interceptors, and Docker orchestration layers" },
    ],
    architecture: {
      overview:
        "StudyFlow uses a strictly decoupled, service-oriented structure. The frontend is a Vue 3 Single Page Application (SPA) powered by Vite, utilizing Pinia for client-side state hydration and Vue Router role guards for navigation restrictions. The backend is a stateless Native PHP REST API engine that integrates decoupled business controllers with custom JWT authentication middleware. Communication is secured and routed via a containerized Nginx reverse proxy.",
      layers: [
        { name: "Vue 3 Client SPA (Vite + TypeScript)", description: "Dynamic analytics dashboards utilizing Pinia for auth and grade state caches. Computes and renders interactive charts (Peer Matrices, Performance Trackers) on the client, minimizing database overhead." },
        { name: "Native PHP Service Engine", description: "An Object-Oriented REST API utilizing unified controller routing (public/index.php). Business components (Marks, Enrollments, Remarks) are split into standalone controllers." },
        { name: "JWT Authentication Interceptor", description: "Decoupled middleware (jwtMiddleware.php) validating incoming Cryptographically Signed JSON Web Tokens sent as HTTP Bearer Credentials, mapping identity metadata to active threads." },
        { name: "Relational Storage (MySQL)", description: "Structured relational schemas indexing course assessment matrices, student enrollments, remark request auditing logs, and system triggers." },
        { name: "Containerized Orchestration (Docker Compose)", description: "Binds Vue frontend, PHP runtime, Nginx proxy, and MySQL databases inside a standardized microservice context with self-signed TLS certificates." },
      ],
    },
    devSetup: {
      prerequisites: ["Docker & Docker Compose", "Git", "Web Browser"],
      steps: [
        { cmd: "git clone https://github.com/ZafranSY/study-flow.git && cd study-flow" },
        { cmd: "cat <<EOF > studyflowbackend/.env\nDB_HOST=studyflow-db\nDB_NAME=studyflow_db\nDB_USER=root\nDB_PASSWORD=secured_root_database_password\nJWT_SECRET=enterprise_level_cryptographic_signing_key_vector\nEOF", note: "Initializes relational access parameters and token signing vector" },
        { cmd: "docker-compose up --build -d", note: "Spins up frontend, OOP PHP service, Nginx reverse proxy, and seeds the MySQL database" },
        { cmd: "docker-compose logs -f studyflow-backend", note: "Monitors the background API service health and setup status" },
        { cmd: "cat studyflowbackend/apidoc/apidochowto.txt", note: "Review instructions to load the apidocumentation.yaml Swagger contract locally" },
      ],
    },
    challenges: [
      {
        title: "Secure Data Layer Isolations inside a Multi-Role System",
        description:
          "Because different users (Students, Lecturers, Advisors, and Admins) use the same database, it is critical to prevent privilege escalation (e.g. students accessing exam keys or modifying others' grades). Mitigation: Implemented a strict row-level authorization filter strategy inside individual controllers. The system ignores client-supplied student IDs and instead extracts the verified, immutable user ID directly from the JWT payload for all data access.",
      },
      {
        title: "Real-time Multi-Dimensional Analytical Calculations without Query Degradation",
        description:
          "Dynamic dashboards (PeerComparisonChart.vue, CompareAllStudents.vue) require heavy relational calculations to display comparative averages. Executing these continuously on hot tables slows down DB engines. Mitigation: Offloaded mathematical data aggregations to the client browser by fetching transactional indexing-supported foreign join arrays and caching them in Pinia stores, enabling smooth chart renders without database lockups.",
      },
    ],
    learnings: [
      "Offloading heavy statistical aggregations to Vue/Pinia client stores keeps our relational databases fast and responsive even under peak academic assessment windows.",
      "Constructing stateless custom PHP JWT verification middleware provides a lightweight, highly customizable alternative to bloated corporate API frameworks.",
      "Docker Compose simplifies the staging of multi-tenant microservices, ensuring identical environments between local developer machines and cloud hosts.",
      "Self-documenting API contracts with Swagger dramatically reduces communication friction between frontend developers and backend engineers.",
    ],
  },
  {
    id: "studysync-perl",
    slug: "studysync-perl",
    context: "Open Source · Lead Developer",
    name: "StudySync Polyglot Indexing Matrix",
    year: "2024",
    status: "Open Source",
    statusColor: "text-sky-400 border-sky-900/50 bg-sky-950/20",
    summary:
      "An enterprise academic resource indexing platform featuring a decoupled architecture. The backend runs on a custom, un-nested framework-less Perl 5 HTTP socket daemon, providing secure granular access matrices. The front end uses a reactive Vue.js single page application for cohort-scoped document visibility controls.",
    githubUrl: "https://github.com/ZafranSY/studysync-perl",
    githubPublic: true,
    stack: ["Perl", "MySQL", "Vue.js", "CGI", "Socket Programming", "Docker", "ACID"],
    impact: [
      { metric: "Perl 5 Socket", label: "Custom HTTP parser & daemon" },
      { metric: "Vue.js SPA", label: "State-synchronized interface" },
      { metric: "Granular", label: "ACID access control matrices" },
    ],
    highlights: [
      { label: "Framework-less Daemon", sub: "Custom HTTP socket parsing loop" },
      { label: "Multi-Tier Access", sub: "Semester, category, & link permission mappings" },
      { label: "Unified SQL Gateway", sub: "Secure procedural DBI database mapping" },
      { label: "Automated Auditing", sub: "Low-level endpoint CLI validation scripts" },
    ],
    problem:
      "Traditional multi-tenant file indexes rely on heavy application servers and complex routing stacks that create massive memory overhead. Enforcing granular dynamic permissions across institutional semesters, categories, and direct links via traditional ORM queries introduces severe database bottlenecks and security privilege escalations.",
    solution:
      "Engineered StudySync, utilizing an un-nested, low-overhead custom Perl 5 TCP daemon that parses socket headers manually to serve stateless API routes. Built a highly normalized MySQL permission schema mapping semester, category, and direct link matrices, and paired it with a decoupled, reactive Vue.js front end. This shifts access-control verification to efficient single-step database joins, keeping idle server memory footprint minimal.",
    stakeholders: [
      { role: "Institutional Admins", responsibility: "Manage dynamic student cohorts, category permissions, and direct document access bounds" },
      { role: "Academic Cohorts", responsibility: "Access shared learning resources restricted securely by semester clearances" },
      { role: "Zafran (Systems Architect)", responsibility: "Developed the framework-less socket daemon, header parsers, ACID-compliant database scripts, and Vue.js view adapters" },
    ],
    architecture: {
      overview:
        "The system features a decoupled, multi-container architecture. The presentation layer is a reactive Vue.js Single Page Application (SPA) that coordinates file permissions via popup views. The backend is an extremely lean custom Perl 5 socket daemon (server.pl) that handles connection endpoints, executes safe DBI database actions (CRUD.pl), and stores transactions inside a relational MySQL schema with cascaded foreign-key constraints.",
      layers: [
        { name: "Vue.js Presentation Layer (studysyncc)", description: "Handles responsive interface layouts. Interacts with the backend via cross-origin AJAX requests and updates user access scopes dynamically via popup component triggers (LinkPermissionPopup.vue)." },
        { name: "Custom HTTP Socket Daemon (server.pl)", description: "A framework-less TCP socket listener in Perl 5. Intercepts incoming packets, parses headers manually to locate parameters and payloads, and routes actions without heavy server libraries." },
        { name: "DBI Database Gateway (CRUD.pl)", description: "The database execution engine. Utilizes raw Database Interface (DBI:mysql) statements with parameterized prepared placeholders, mitigating SQL injection hazards natively." },
        { name: "Relational Schema Infrastructure (createtable.sql)", description: "A normalized MySQL schema representing Semesters, Categories, Links, and cross-permissions. Enforces ACID transactional safety and cascading key deletions." },
        { name: "Verification Suites (testing/)", description: "A set of native CLI Perl scripts (Authorization.pl, Categories.pl) to execute and test endpoint routing and permission behaviors directly." },
      ],
    },
    devSetup: {
      prerequisites: ["Docker & Docker Compose", "Perl 5 (local CLI testing)", "Git"],
      steps: [
        { cmd: "git clone https://github.com/ZafranSY/studysync-perl.git && cd studysync-perl" },
        { cmd: "docker-compose up --build -d", note: "Orchestrates decoupled Perl daemon server and Vue.js web container" },
        { cmd: "docker exec -i studysync-db mysql -u root -psecured_root_password studysync_db < createtable.sql", note: "Injects structure database schemas to the live DB container" },
        { cmd: "docker exec -i studysync-db mysql -u root -psecured_root_password studysync_db < dummydata.sql", note: "Seeds testing vectors and cohort mock entries" },
        { cmd: "perl testing/Authorization.pl", note: "Verifies authorization pathways using low-level domain validation scripts" } ,
        { cmd: "perl testing/Categories.pl", note: "Validates category configuration and endpoint state rules" } ,
      ],
    },
    challenges: [
      {
        title: "Implementing a Framework-less HTTP Router and State Parser in Perl",
        description:
          "Modern web platforms rely on robust pre-built libraries to parse payloads and manage connection pooling. Operating directly on TCP streams in Perl 5 meant any buffer or header parsing bug could easily freeze daemon cycles or leak server memory. Mitigation: Designed an isolated socket reader in server.pl that parses stream boundaries manually, validates headers explicitly, and formats JSON streams prior to database dispatch, keeping backend runtime footprints exceptionally low.",
      },
      {
        title: "Handling Complex Multi-Tier Document Visibility Mappings",
        description:
          "Securing resources across Semesters, CategoryPermissions, and LinkPermissions via nested ORM layers introduces significant SQL query degradation. Mitigation: Designed highly normalized databases with explicit cascades, executing permission constraints in single-step optimized joins rather than iterative application code checks. This offloads access control directly to the database engine for maximum speed.",
      },
    ],
    learnings: [
      "Manual HTTP socket handling in Perl 5 provides unparalleled insight into low-level connection lifecycles and keeps idle memory usage down to single-digit megabytes.",
      "Offloading dynamic multi-layered access matrices to optimized relational database joins is significantly faster than managing authorization iterations inside backend code.",
      "Low-level endpoint CLI validation suites let you rapidly audit backend stability without waiting for front-end interface adjustments.",
      "A decoupled architectural pattern ensures that even legacy low-level script servers can smoothly back sleek, modern single-page applications.",
    ],
  },
]

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return PROJECTS.find((p) => p.slug === slug)
}
