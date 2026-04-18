@import "tailwindcss";

@theme {
  --color-primary: #1a1a2e;
  --color-primary-light: #2d2d4e;
  --color-accent: #c9a96e;
  --color-accent-light: #d4bc8e;
  --color-accent-dark: #b08d4f;
  --color-bg: #fafaf8;
  --color-bg-warm: #f0ece4;
  --color-text: #2d2d2d;
  --color-text-light: #6b6b6b;
  --color-dark: #0d0d0d;
  --color-dark-surface: #1a1a1a;
  --color-surface: #ffffff;
  --color-border: #e5e0d8;
  --font-heading: "Playfair Display", serif;
  --font-body: "Inter", sans-serif;
}

@layer base {
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: var(--font-body);
    color: var(--color-text);
    background-color: var(--color-bg);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-heading);
    font-weight: 700;
    line-height: 1.15;
    letter-spacing: -0.02em;
  }

  ::selection {
    background-color: var(--color-accent);
    color: white;
  }
}

@layer components {
  .heading-xl {
    font-size: clamp(2.5rem, 6vw, 5rem);
    line-height: 1.05;
  }

  .heading-lg {
    font-size: clamp(2rem, 4vw, 3.5rem);
    line-height: 1.1;
  }

  .heading-md {
    font-size: clamp(1.5rem, 3vw, 2.25rem);
    line-height: 1.2;
  }

  .heading-sm {
    font-size: clamp(1.125rem, 2vw, 1.5rem);
    line-height: 1.3;
  }

  .text-body {
    font-size: 1rem;
    line-height: 1.7;
    color: var(--color-text-light);
  }

  .text-body-lg {
    font-size: 1.125rem;
    line-height: 1.7;
    color: var(--color-text-light);
  }

  .section-padding {
    padding: 6rem 1.5rem;
  }

  .container-custom {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.875rem 2rem;
    background-color: var(--color-accent);
    color: white;
    font-family: var(--font-body);
    font-weight: 500;
    font-size: 0.9375rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .btn-primary:hover {
    background-color: var(--color-accent-dark);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(201, 169, 110, 0.3);
  }

  .btn-outline {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.875rem 2rem;
    background-color: transparent;
    color: white;
    font-family: var(--font-body);
    font-weight: 500;
    font-size: 0.9375rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    border: 1.5px solid rgba(255, 255, 255, 0.4);
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .btn-outline:hover {
    border-color: var(--color-accent);
    color: var(--color-accent);
    background-color: rgba(201, 169, 110, 0.05);
  }

  .gold-line {
    width: 60px;
    height: 2px;
    background-color: var(--color-accent);
  }

  .card-hover {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .card-hover:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  }

  .image-reveal {
    overflow: hidden;
  }

  .image-reveal img {
    transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .image-reveal:hover img {
    transform: scale(1.05);
  }

  .gradient-overlay {
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.8) 0%,
      rgba(0, 0, 0, 0.3) 50%,
      rgba(0, 0, 0, 0.1) 100%
    );
  }
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--color-bg);
}

::-webkit-scrollbar-thumb {
  background: var(--color-accent);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-accent-dark);
}

/* Before/After slider */
.before-after-slider {
  position: relative;
  overflow: hidden;
  cursor: col-resize;
  user-select: none;
}

.before-after-slider .slider-handle {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 4px;
  background-color: var(--color-accent);
  z-index: 10;
  cursor: col-resize;
}

.before-after-slider .slider-handle::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--color-accent);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}
