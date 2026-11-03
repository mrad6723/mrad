class MradHeaderNav extends HTMLElement {
  connectedCallback() {
    const active = this.getAttribute("active") || "help";

    this.innerHTML = `
      <nav class="mrad-local-nav">
        <div class="mrad-local-container">
          <a href="/" class="${active === 'help' ? 'active' : ''}">Help Center</a>
          <a href="/tickets" class="${active === 'tickets' ? 'active' : ''}">My Tickets</a>
          <a href="/guides" class="${active === 'guides' ? 'active' : ''}">Guides</a>
          <a href="https://status.mrad.co" class="${active === 'status' ? 'active' : ''}">Status</a>
        </div>
      </nav>

      <style>
        mrad-header-nav {
          display: block;
          position: -webkit-sticky;
          position: sticky;
          top: 56px;
          z-index: 9999;
          width: 100%;
          background: #ffffff;
        }

        .mrad-local-nav {
          width: 100%;
          background: #ffffff;
          border-bottom: 1px solid #e2e8f0;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

        .mrad-local-container {
          max-width: 1200px;
          margin: 0 auto;
          height: 44px;
          padding: 0 20px;
          display: flex;
          align-items: center;
          gap: 24px;
          overflow-x: auto;
          white-space: nowrap;
        }

        .mrad-local-container a {
          color: #000000;
          text-decoration: none;
          font-size: 0.88rem;
          font-weight: 500;
          transition: opacity 0.15s ease;
          padding: 11px 0;
          position: relative;
        }

        .mrad-local-container a:hover {
          opacity: 0.65;
        }

        .mrad-local-container a.active {
          font-weight: 700;
        }

        .mrad-local-container a.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: #000000;
          border-radius: 2px;
        }
      </style>
    `;
  }
}

if (!customElements.get("mrad-header-nav")) {
  customElements.define("mrad-header-nav", MradHeaderNav);
}
