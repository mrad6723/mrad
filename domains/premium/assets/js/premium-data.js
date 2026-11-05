const MRAD_PREMIUM = (function () {
  const CSV_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQp4Vfe2iJ4cdQi8LF81nVzLizlIaVebNSWmmAf1AEYk6IXTVfZphfed1341_lWKBU_LXuiuVzLdYoO/pub?gid=0&single=true&output=csv";
  const CACHE_KEY = "mrad_premium_domains_cache";
  const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

  // Lightweight RFC-4180 compliant CSV parser
  function parseCSV(text) {
    const lines = [];
    let row = [];
    let entry = "";
    let insideQuotes = false;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const nextChar = text[i + 1];

      if (char === '"') {
        if (insideQuotes && nextChar === '"') {
          entry += '"';
          i++;
        } else {
          insideQuotes = !insideQuotes;
        }
      } else if (char === "," && !insideQuotes) {
        row.push(entry.trim());
        entry = "";
      } else if ((char === "\r" || char === "\n") && !insideQuotes) {
        if (char === "\r" && nextChar === "\n") i++;
        row.push(entry.trim());
        if (row.length > 1 || row[0] !== "") lines.push(row);
        row = [];
        entry = "";
      } else {
        entry += char;
      }
    }
    if (entry.length > 0 || row.length > 0) {
      row.push(entry.trim());
      if (row.length > 1 || row[0] !== "") lines.push(row);
    }
    return lines;
  }

  function cleanPrice(val) {
    if (!val) return null;
    const cleaned = String(val).replace(/[^0-9.]/g, "");
    const num = parseFloat(cleaned);
    return isNaN(num) ? null : num;
  }

  function mapRowsToObjects(rows) {
    if (!rows || rows.length < 2) return [];

    // Header index mapping based on column names (fallback to default A-F indices)
    const headers = rows[0].map((h) => h.toLowerCase());
    const findIndex = (keys, fallback) => {
      const idx = headers.findIndex((h) => keys.some((k) => h.includes(k)));
      return idx !== -1 ? idx : fallback;
    };

    const domainIdx = findIndex(["domain"], 0);
    const nameIdx = findIndex(["name"], 1);
    const extIdx = findIndex(["ext"], 2);
    const buyIdx = findIndex(["buy"], 3);
    const instIdx = findIndex(["installment"], 4);

    const items = [];
    for (let i = 1; i < rows.length; i++) {
      const r = rows[i];
      const domain = (r[domainIdx] || "").trim();
      if (!domain) continue;

      const name = (r[nameIdx] || domain.split(".")[0]).trim();
      let extension = (r[extIdx] || "").trim();
      if (!extension && domain.includes(".")) {
        extension = "." + domain.split(".").slice(1).join(".");
      }
      if (extension && !extension.startsWith(".")) {
        extension = "." + extension;
      }

      items.push({
        domain: domain,
        name: name,
        extension: extension.toLowerCase(),
        buyPrice: cleanPrice(r[buyIdx]),
        installmentPrice: cleanPrice(r[instIdx]),
      });
    }
    return items;
  }

  async function getDomains(forceRefresh = false) {
    if (!forceRefresh) {
      try {
        const cached = sessionStorage.getItem(CACHE_KEY);
        if (cached) {
          const { timestamp, data } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_TTL_MS && Array.isArray(data)) {
            return data;
          }
        }
      } catch (e) {
        console.warn("Mrad Premium: Failed to read sessionStorage cache", e);
      }
    }

    try {
      const res = await fetch(CSV_URL);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const csvText = await res.text();
      const rows = parseCSV(csvText);
      const domains = mapRowsToObjects(rows);

      try {
        sessionStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ timestamp: Date.now(), data: domains })
        );
      } catch (e) {
        console.warn("Mrad Premium: Failed to set sessionStorage cache", e);
      }

      return domains;
    } catch (err) {
      console.error("Mrad Premium: Error loading domain inventory", err);
      return [];
    }
  }

  async function getDomainByName(domainName) {
    if (!domainName) return null;
    const cleanTarget = domainName.toLowerCase().trim();
    const domains = await getDomains();
    return (
      domains.find(
        (d) =>
          d.domain.toLowerCase() === cleanTarget ||
          d.name.toLowerCase() === cleanTarget
      ) || null
    );
  }

  return {
    getDomains,
    getDomainByName,
  };
})();
