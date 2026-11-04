class MradHeader extends HTMLElement {
  connectedCallback() {
    const host = window.location.hostname.toLowerCase();

    // 1. Auto-detect service from hostname or fallback to manual attribute
    let service = this.getAttribute("service") || "";

    if (!service) {
      if (host.startsWith("mrad.mrad.")) {
        service = "Mrad";
      } else if (host.includes("account.")) {
        service = "Account";
      } else if (host.includes("support.")) {
        service = "Support";
      } else if (host.includes("email.")) {
        service = "Email";
      } else if (host.includes("domains.")) {
        service = "Domains";
      }
    }

    const brandDisplay = service
      ? `Mrad <span class="mrad-service-badge">${service}</span>`
      : `Mrad`;

    // 2. Persistent session check across root domain (.mrad.co)
    const isLoggedIn = document.cookie
      .split("; ")
      .some((cookie) => cookie.startsWith("mrad_session="));

    const authActions = isLoggedIn
      ? `
        <div class="mrad-dropdown-wrap">
          <button type="button" class="mrad-btn-account" id="mradAccountBtn">
            <span>My Account</span>
            <svg class="mrad-caret" width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <div class="mrad-dropdown-menu" id="mradAccountMenu">
            <a href="https://account.mrad.co/uid/home" class="mrad-dropdown-item">Dashboard</a>
            <button type="button" class="mrad-dropdown-item mrad-item-signout" id="mradSignOutBtn">Sign Out</button>
          </div>
        </div>
      `
      : `
        <a href="https://account.mrad.co/sign-in" class="mrad-btn-auth">Sign In</a>
        <a href="https://account.mrad.co/sign-up" class="mrad-btn-auth">Sign Up</a>
      `;

    this.innerHTML = `
      <header class="mrad-global-bar">
        <div class="mrad-global-container">
          <a href="/" class="mrad-global-brand">
            <img
              src="https://mrad.co/image/logo.png"
              alt="Mrad"
              class="mrad-brand-logo"
              onerror="this.style.display='none'"
            />
            <span class="mrad-brand-title">${brandDisplay}</span>
          </a>

          <div class="mrad-global-actions">
            <a href="https://support.mrad.co" class="mrad-support-link">Support</a>
            <div class="mrad-auth-group">
              ${authActions}
            </div>
          </div>
        </div>
      </header>

      <style>
        mrad-header {
          display: block;
          position: -webkit-sticky;
          position: sticky;
          top: 0;
          z-index: 10000;
          width: 100%;
          background: #ffffff;
        }

        .mrad-global-bar {
          width: 100%;
          background: #ffffff;
          border-bottom: 1px solid #e2e8f0;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

        .mrad-global-container {
          max-width: 1200px;
          margin: 0 auto;
          height: 56px;
          padding: 0 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .mrad-global-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }

        .mrad-brand-logo {
          width: 28px;
          height: 28px;
          object-fit: contain;
          border-radius: 4px;
          display: block;
        }

        .mrad-brand-title {
          color: #000000;
          font-size: 1.18rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .mrad-service-badge {
          background: #f1f5f9;
          border: 1px solid #cbd5e1;
          color: #000000;
          font-size: 0.78rem;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 5px;
          text-transform: uppercase;
        }

        .mrad-global-actions {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .mrad-support-link {
          color: #000000;
          text-decoration: none;
          font-size: 0.88rem;
          font-weight: 500;
          transition: opacity 0.15s ease;
        }

        .mrad-support-link:hover {
          opacity: 0.65;
        }

        .mrad-auth-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .mrad-btn-auth {
          background: #ffffff;
          color: #000000;
          text-decoration: none;
          padding: 6px 14px;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          font-size: 0.84rem;
          font-weight: 600;
          transition: background-color 0.15s ease, border-color 0.15s ease;
          white-space: nowrap;
        }

        .mrad-btn-auth:hover {
          background-color: #f8fafc;
          border-color: #cbd5e1;
        }

        .mrad-dropdown-wrap {
          position: relative;
          display: inline-block;
        }

        .mrad-btn-account {
          background: #000000;
          color: #ffffff;
          border: none;
          outline: none;
          padding: 6px 14px;
          border-radius: 6px;
          font-size: 0.84rem;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          white-space: nowrap;
          font-family: inherit;
          transition: opacity 0.15s ease;
        }

        .mrad-btn-account:hover {
          opacity: 0.85;
        }

        .mrad-caret {
          display: block;
          transition: transform 0.2s ease;
        }

        .mrad-dropdown-wrap.open .mrad-caret {
          transform: rotate(180deg);
        }

        .mrad-dropdown-menu {
          display: none;
          position: absolute;
          top: calc(100% + 6px);
          right: 0;
          min-width: 150px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
          padding: 4px;
          z-index: 10001;
        }

        .mrad-dropdown-wrap.open .mrad-dropdown-menu {
          display: block;
        }

        .mrad-dropdown-item {
          display: block;
          width: 100%;
          text-align: left;
          padding: 8px 12px;
          font-size: 0.85rem;
          font-weight: 500;
          color: #000000;
          text-decoration: none;
          background: transparent;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-family: inherit;
          box-sizing: border-box;
          transition: background 0.12s ease;
        }

        .mrad-dropdown-item:hover {
          background: #f1f5f9;
        }

        .mrad-item-signout {
          color: #dc2626;
          border-top: 1px solid #f1f5f9;
          margin-top: 2px;
          padding-top: 8px;
        }

        .mrad-item-signout:hover {
          background: #fef2f2;
          color: #b91c1c;
        }

        @media (max-width: 480px) {
          .mrad-support-link {
            display: none;
          }
        }
      </style>
    `;

    // 3. Dropdown toggle and sign-out logic
    if (isLoggedIn) {
      const wrap = this.querySelector(".mrad-dropdown-wrap");
      const accountBtn = this.querySelector("#mradAccountBtn");
      const signOutBtn = this.querySelector("#mradSignOutBtn");

      if (accountBtn && wrap) {
        accountBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          wrap.classList.toggle("open");
        });
      }

      if (signOutBtn) {
        signOutBtn.addEventListener("click", () => {
          // Clear session cookie across all mrad.co domains
          document.cookie = "mrad_session=; path=/; domain=.mrad.co; max-age=0; SameSite=Lax";
          document.cookie = "mrad_session=; path=/; max-age=0; SameSite=Lax";
          window.location.href = "https://account.mrad.co/sign-in";
        });
      }

      // Close dropdown when tapping anywhere outside
      document.addEventListener("click", (e) => {
        if (wrap && !wrap.contains(e.target)) {
          wrap.classList.remove("open");
        }
      });
    }
  }
}

if (!customElements.get("mrad-header")) {
  customElements.define("mrad-header", MradHeader);
}
