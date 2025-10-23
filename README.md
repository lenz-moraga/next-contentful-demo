# Next.js Contentful Demo

This is a demo project that demonstrates how to use Next.js with Contentful. It includes a Next.js frontend and an Express.js backend.

## Frontend (Next.js)

The frontend is a Next.js application that displays content from Contentful.

### Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

## Backend (Express.js)

The backend is an Express.js application that provides an API for the frontend.

### Getting Started

Navigate to the `api-server` directory and install the dependencies:

```bash
cd api-server
npm install
```

Then, start the server:

```bash
npm start
```

The API server will be running on [http://localhost:3001](http://localhost:3001).

## Contentful

This project uses Contentful to manage content. You will need to create a Contentful account and set up a space with the required content models.

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
