# Tour Booking 2023

A modern tour booking website built with NextJS, TypeScript, TailwindCSS, GraphQL, Prisma. This project allows users to browse, book, and manage tours, with integrated Paypal payment support and an admin dashboard for managing tours, categories, and orders.

## Demo

https://tour-booking-2023.quang.work

## Features

- User authentication (sign up, login, password reset)
- Browse and search tours
- Book tours with Paypal payment integration
- Manage bookings and saved tours
- Admin dashboard for managing tours, categories, users, and orders
- Responsive design for desktop and mobile

## Tech Stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS, MUI
- **State Management:** React Context, Apollo Client
- **API:** GraphQL, REST (Next.js API routes)
- **Database:** Prisma ORM (with PostgreSQL or other supported DB)
- **Authentication:** NextAuth.js
- **Payments:** Paypal SDK
- **Other:** CKEditor, SWR, React Hook Form, Yup, Framer Motion

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- [Optional] PostgreSQL or another database for Prisma

### Installation

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd tour-booking-2023
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Set up environment variables:
   - Copy `.env.example` to `.env` and fill in required values (database, Paypal, etc).
4. Generate Prisma client:
   ```bash
   npm run prisma:generate
   ```
5. Push Prisma schema to your database:
   ```bash
   npm run prisma:migrate
   ```

### Development

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

### Build for Production

```bash
npm run build
npm start
```

## Folder Structure

```
tour-booking-2023/
├── prisma/           # Prisma schema and migrations
├── public/           # Static assets
├── src/
│   ├── app/          # Next.js app directory (pages, API routes, components)
│   ├── components/   # Shared React components
│   ├── data/         # Static data and mock data
│   ├── db/           # Offline/mock DB data
│   ├── hooks/        # Custom React hooks
│   ├── images/       # Image assets
│   ├── queries/      # GraphQL queries
│   ├── shared/       # Shared UI components
│   ├── styles/       # SCSS/CSS files
│   └── utils/        # Utility functions
├── package.json      # Project metadata and scripts
├── README.md         # Project documentation
└── ...
```

## Useful Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run prettier:fixAll` - Format code with Prettier
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Push Prisma schema to DB
- `npm run codegen:gql` - Generate GraphQL code

## Author

- **quang1225** ([quang1225@gmail.com](mailto:quang1225@gmail.com))

## License

MIT
