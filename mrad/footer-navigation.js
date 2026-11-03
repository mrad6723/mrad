class MradFooterNav extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="mrad-footer-columns">
        <div class="mrad-col">
          <h4>Mrad Mrad</h4>
          <a href="/">Overview</a>
          <a href="/features">Features</a>
          <a href="/docs">Documentation</a>
        </div>
        <div class="mrad-col">
          <h4>Connected Services</h4>
          <a href="https://domains.mrad.co">Domains</a>
          <a href="https://email.mrad.co">Email</a>
          <a href="https://account.mrad.co/id/home">Mrad ID</a>
        </div>
        <div class="mrad-col">
          <h4>Ecosystem</h4>
          <a href="https://mrad.co">Mrad Home</a>
          <a href="https://status.mrad.co">System Status</a>
          <a href="https://mrad.co/privacy">Privacy Policy</a>
        </div>
      </div>

      <style>
        mrad-footer-nav {
          display: block;
          width: 100%;
        }

        .mrad-footer-columns {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 32px;
        }

        .mrad-col h4 {
          font-size: 0.88rem;
          font-weight: 700;
          color: #000000;
          margin-bottom: 14px;
        }

        .mrad-col a {
          display: block;
          color: #64748b;
          text-decoration: none;
          font-size: 0.85rem;
          margin-bottom: 10px;
          transition: color 0.15s ease;
        }

        .mrad-col a:hover {
          color: #000000;
        }
      </style>
    `;
  }
}

if (!customElements.get("mrad-footer-nav")) {
  customElements.define("mrad-footer-nav", MradFooterNav);
}
