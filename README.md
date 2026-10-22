# QuickChartMaker (Chart Creator)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Framework: Astro](https://img.shields.io/badge/Framework-Astro-ff5d01.svg)](https://astro.build)
[![UI: React](https://img.shields.io/badge/UI-React%2019-61dafb.svg)](https://react.dev)
[![Charts: Recharts](https://img.shields.io/badge/Charts-Recharts-22b5bf.svg)](https://recharts.org)

A lightweight, zero-install, browser-based charting utility designed for quick, beautiful data visualization without cumbersome spreadsheets or complex design software.

All data remains 100% local in the client browser—no accounts, no trackers, and zero server uploads.

---

## ✨ Features

- **5 Chart Types:**
  - **Vertical Bar Chart:** Ideal for discrete categories and standard distributions.
  - **Horizontal Bar Chart:** Perfect for longer category names and ranking lists.
  - **Line Chart:** Best for trends, time series, and sequential data.
  - **Pie / Donut Chart:** Visualizes proportional and share-of-wallet breakdowns.
  - **Radar Chart:** Multi-variable capability and performance matrix comparisons.

- **8 Handcrafted Colour Themes:**
  - `Pastel`, `Vibrant`, `Dark`, `Sunset`, `Ocean`, `Navy`, `Gold`, and `Mixed`.

- **Instant Pre-Built Templates:**
  - One-click sample sets including *Budget Breakdown*, *Survey Results*, *Monthly Progress*, *Team Comparison*, and *Social Media Distribution*.

- **Export & Capture:**
  - Crisp vector SVG and raster PNG rendering with instant clipboard screenshot shortcuts (`Win+Shift+S` / `Cmd+Shift+4`).

- **Zero-Install & Privacy-First:**
  - Pure client-side execution; data is rendered in-memory and never sent over the wire.

---

## 🛠️ Tech Stack

- **Framework:** [Astro](https://astro.build/) (Static Site Generation & Islands Architecture)
- **Component Engine:** [React 19](https://react.dev/)
- **Data Visualization:** [Recharts](https://recharts.org/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `>= 22.12.0`
- **npm** (or `pnpm` / `yarn`)

### Installation & Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/majidrajpar/chart-creator.git
   cd chart-creator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:4321
   ```

### Production Build

To build the static site for production deployment:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 📄 License

This project is open-source and licensed under the [MIT License](LICENSE).
Copyright (c) 2026 Majid Mumtaz.
