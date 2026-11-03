class MradFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const currentYear = new Date().getFullYear();

    this.shadowRoot.innerHTML = `
      <footer class="mrad-global-footer">
        
        <div class="mrad-local-slot-container">
          <slot></slot>
        </div>

        <div class="mrad-footer-bottom">
          <div class="mrad-footer-bottom-container">
            <div class="mrad-footer-brand">
              <img src="https://mrad.co/image/logo.png" alt="Mrad" class="mrad-footer-logo" onerror="this.style.display='none'" />
              <span>&copy; ${currentYear} Mrad. All rights reserved.</span>
            </div>

            <div class="mrad-footer-legal">
              <a href="https://mrad.co/privacy">Privacy</a>
              <a href="https://mrad.co/terms">Terms</a>
              <a href="https://status.mrad.co">System Status</a>
            </div>
          </div>
        </div>

      </footer>

      <style>
        :host {
          display: block;
          width: 100%;
          background: #ffffff;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          margin-top: auto;
        }

        .mrad-global-footer {
          width: 100%;
          border-top: 1px solid #e2e8f0;
          background: #ffffff;
        }

        .mrad-local-slot-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 48px 20px 32px;
        }

        .mrad-footer-bottom {
          border-top: 1px solid #f1f5f9;
          background: #ffffff;
          padding: 20px 0;
        }

        .mrad-footer-bottom-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }

        .mrad-footer-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #64748b;
          font-size: 0.85rem;
        }

        .mrad-footer-logo {
          width: 20px;
          height: 20px;
          object-fit: contain;
        }

        .mrad-footer-legal {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .mrad-footer-legal a {
          color: #64748b;
          text-decoration: none;
          font-size: 0.85rem;
          transition: color 0.15s ease;
        }

        .mrad-footer-legal a:hover {
          color: #000000;
        }

        @media (max-width: 640px) {
          .mrad-footer-bottom-container {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      </style>
    `;
  }
}

if (!customElements.get("mrad-footer")) {
  customElements.define("mrad-footer", MradFooter);
}
