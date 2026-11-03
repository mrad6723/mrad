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
      // mrad.co and www.mrad.co stay empty so no badge is rendered
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
        <a href="https://account.mrad.co/id/home" class="mrad-btn-account">My Account</a>
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

        .mrad-btn-account {
          background: #000000;
          color: #ffffff;
          text-decoration: none;
          padding: 6px 14px;
          border-radius: 6px;
          font-size: 0.84rem;
          font-weight: 600;
          transition: opacity 0.15s ease;
          white-space: nowrap;
        }

        .mrad-btn-account:hover {
          opacity: 0.8;
        }

        @media (max-width: 480px) {
          .mrad-support-link {
            display: none;
          }
        }
      </style>
    `;
  }
}

if (!customElements.get("mrad-header")) {
  customElements.define("mrad-header", MradHeader);
}
