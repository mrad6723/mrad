class MradHeaderNav extends HTMLElement {
  connectedCallback() {
    const path = window.location.pathname;

    let activeMenu = "domains";
    if (path.startsWith("/premium")) {
      activeMenu = "premium";
    }

    this.innerHTML = `
      <nav class="mrad-local-nav">
        <div class="mrad-local-container">

          <!-- Tab 1: Domains (No Link) -->
          <div class="mrad-nav-item ${activeMenu === 'domains' ? 'active' : ''}">
            <button type="button" class="mrad-nav-trigger">
              Domains
              <svg class="mrad-arrow" width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M1 1L5 5L9 1"/>
              </svg>
            </button>
            <div class="mrad-dropdown-menu">
              <a href="https://domains.mrad.co/search">Search</a>
              <a href="https://domains.mrad.co/register">Register</a>
              <a href="https://domains.mrad.co/transfer">Transfer</a>
            </div>
          </div>

          <!-- Tab 2: Premium (No Link) -->
          <div class="mrad-nav-item ${activeMenu === 'premium' ? 'active' : ''}">
            <button type="button" class="mrad-nav-trigger">
              Premium
              <svg class="mrad-arrow" width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M1 1L5 5L9 1"/>
              </svg>
            </button>
            <div class="mrad-dropdown-menu">
              <a href="https://domains.mrad.co/premium">Search</a>
              <a href="https://domains.mrad.co/premium/search">Advanced Search</a>
              <a href="https://domains.mrad.co/premium/all">All</a>
              <a href="https://domains.mrad.co/premium/sell">Sell</a>
            </div>
          </div>

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
          gap: 28px;
        }

        .mrad-nav-item {
          position: relative;
          display: flex;
          align-items: center;
          height: 100%;
        }

        .mrad-nav-trigger {
          background: none;
          border: none;
          outline: none;
          cursor: pointer;
          color: #000000;
          font-size: 0.88rem;
          font-weight: 500;
          font-family: inherit;
          height: 100%;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 0;
          transition: opacity 0.15s ease;
          position: relative;
        }

        .mrad-arrow {
          transition: transform 0.15s ease;
        }

        .mrad-nav-item:hover .mrad-arrow,
        .mrad-nav-item.open .mrad-arrow {
          transform: rotate(180deg);
        }

        .mrad-nav-item:hover .mrad-nav-trigger {
          opacity: 0.7;
        }

        .mrad-nav-item.active .mrad-nav-trigger {
          font-weight: 700;
          opacity: 1;
        }

        .mrad-nav-item.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: #000000;
          border-radius: 2px;
        }

        .mrad-dropdown-menu {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          min-width: 175px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
          padding: 6px 0;
          z-index: 10000;
        }

        .mrad-nav-item:hover .mrad-dropdown-menu,
        .mrad-nav-item.open .mrad-dropdown-menu {
          display: flex;
          flex-direction: column;
        }

        .mrad-dropdown-menu a {
          padding: 8px 16px;
          color: #1e293b;
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 500;
          transition: background-color 0.12s ease, color 0.12s ease;
          white-space: nowrap;
        }

        .mrad-dropdown-menu a:hover {
          background-color: #f8fafc;
          color: #000000;
        }
      </style>
    `;

    // Support tap to toggle on mobile devices
    const navItems = this.querySelectorAll(".mrad-nav-item");
    navItems.forEach((item) => {
      const btn = item.querySelector(".mrad-nav-trigger");
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = item.classList.contains("open");
        navItems.forEach((n) => n.classList.remove("open"));
        if (!isOpen) item.classList.add("open");
      });
    });

    document.addEventListener("click", () => {
      navItems.forEach((n) => n.classList.remove("open"));
    });
  }
}

if (!customElements.get("mrad-header-nav")) {
  customElements.define("mrad-header-nav", MradHeaderNav);
}
