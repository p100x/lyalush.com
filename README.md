# Lya Lush - Content Creator Landing Page

A high-converting, responsive landing page with a luxury dark mode aesthetic.

## Design Language

- **Primary Background:** Deep Obsidian (#0B0B0B)
- **Accent Color:** Champagne Gold (#D4AF37)
- **Highlight:** Neon Pink (#FF10F0)

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Fonts:** Inter + Playfair Display

## Features

- Responsive design (mobile-first)
- Smooth scroll animations
- Interactive link cards
- Newsletter signup form
- Social media integration
- Optimized for conversions

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customization

### Update Social Links

Edit the `socialLinks` array in `app/page.tsx` to add your actual URLs:

```tsx
const socialLinks = [
  {
    name: 'Exclusive Content',
    href: 'https://your-platform.com/lyalush',
    // ...
  },
  // ...
]
```

### Add Profile Image

Replace the placeholder avatar in the Hero section with an actual image:

```tsx
<Image
  src="/images/profile.jpg"
  alt="Lya Lush"
  fill
  className="object-cover"
/>
```

### Update Colors

Modify the color palette in `tailwind.config.js`:

```js
colors: {
  obsidian: '#0B0B0B',
  gold: '#D4AF37',
  pink: {
    neon: '#FF10F0',
  },
}
```

## Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## License

MIT License
