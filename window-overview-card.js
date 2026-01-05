/**
 * Window Overview Card for Home Assistant
 * 
 * A custom Lovelace card showing window states (open/tilted/closed),
 * simple contacts, and tamper alerts with a visual editor.
 */

const CARD_VERSION = "1.0.0";

// Styles for the card
const styles = `
  :host {
    --woc-open-color: var(--error-color, #db4437);
    --woc-tilted-color: var(--warning-color, #ffa726);
    --woc-closed-color: var(--success-color, #43a047);
    --woc-tamper-color: var(--error-color, #db4437);
  }
  
  ha-card {
    padding: 16px;
  }
  
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }
  
  .header h2 {
    margin: 0;
    font-size: 1.2em;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .header-icon {
    --mdc-icon-size: 24px;
  }
  
  .summary {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 16px;
    padding: 12px;
    background: var(--primary-background-color);
    border-radius: 12px;
  }
  
  .summary-item {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 12px;
    border-radius: 8px;
    background: var(--card-background-color);
    min-width: 80px;
    justify-content: center;
  }
  
  .summary-item.open {
    border-left: 3px solid var(--woc-open-color);
  }
  
  .summary-item.tilted {
    border-left: 3px solid var(--woc-tilted-color);
  }
  
  .summary-item.closed {
    border-left: 3px solid var(--woc-closed-color);
  }
  
  .summary-item.tamper {
    border-left: 3px solid var(--woc-tamper-color);
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
  }
  
  .summary-count {
    font-size: 1.4em;
    font-weight: 600;
  }
  
  .summary-label {
    font-size: 0.85em;
    opacity: 0.8;
  }
  
  .status-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  
  .status-dot.open { background: var(--woc-open-color); }
  .status-dot.tilted { background: var(--woc-tilted-color); }
  .status-dot.closed { background: var(--woc-closed-color); }
  .status-dot.tamper { background: var(--woc-tamper-color); }
  
  .details-section {
    margin-top: 8px;
  }
  
  .section-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 0;
    font-weight: 500;
    font-size: 0.95em;
    cursor: pointer;
    user-select: none;
  }
  
  .section-header ha-icon {
    --mdc-icon-size: 18px;
  }
  
  .section-header .expand-icon {
    margin-left: auto;
    transition: transform 0.2s;
  }
  
  .section-header .expand-icon.expanded {
    transform: rotate(180deg);
  }
  
  .window-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  
  .window-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    background: var(--primary-background-color);
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.2s;
  }
  
  .window-item:hover {
    background: var(--secondary-background-color);
  }
  
  .window-item.tamper-alert {
    border: 1px solid var(--woc-tamper-color);
    animation: pulse 2s infinite;
  }
  
  .window-icon {
    --mdc-icon-size: 20px;
  }
  
  .window-icon.open { color: var(--woc-open-color); }
  .window-icon.tilted { color: var(--woc-tilted-color); }
  .window-icon.closed { color: var(--woc-closed-color); }
  .window-icon.tamper { color: var(--woc-tamper-color); }
  
  .window-info {
    flex: 1;
    min-width: 0;
  }
  
  .window-name {
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .window-details {
    font-size: 0.8em;
    opacity: 0.7;
    display: flex;
    gap: 8px;
  }
  
  .window-state {
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 0.8em;
    font-weight: 500;
  }
  
  .window-state.open {
    background: rgba(219, 68, 55, 0.15);
    color: var(--woc-open-color);
  }
  
  .window-state.tilted {
    background: rgba(255, 167, 38, 0.15);
    color: var(--woc-tilted-color);
  }
  
  .window-state.closed {
    background: rgba(67, 160, 71, 0.15);
    color: var(--woc-closed-color);
  }
  
  .all-ok {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px;
    opacity: 0.7;
  }
  
  .all-ok ha-icon {
    --mdc-icon-size: 48px;
    color: var(--woc-closed-color);
    margin-bottom: 8px;
  }
  
  .compact-mode .details-section {
    display: none;
  }
  
  .compact-mode.has-issues .details-section.issues-only {
    display: block;
  }
  
  .toggle-details {
    background: none;
    border: none;
    color: var(--primary-color);
    cursor: pointer;
    font-size: 0.85em;
    padding: 4px 8px;
    border-radius: 4px;
  }
  
  .toggle-details:hover {
    background: var(--primary-background-color);
  }
  
  .no-entities {
    padding: 24px;
    text-align: center;
    opacity: 0.6;
  }
  
  .area-group {
    margin-bottom: 16px;
  }
  
  .area-header {
    font-size: 0.85em;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    opacity: 0.6;
    margin-bottom: 8px;
    padding-left: 4px;
  }
`;

// Editor styles
const editorStyles = `
  .editor-container {
    padding: 16px;
  }
  
  .editor-section {
    margin-bottom: 24px;
  }
  
  .editor-section h3 {
    margin: 0 0 12px 0;
    font-size: 1em;
    font-weight: 500;
  }
  
  .editor-row {
    margin-bottom: 16px;
  }
  
  .editor-row label {
    display: block;
    margin-bottom: 4px;
    font-size: 0.9em;
    font-weight: 500;
  }
  
  .editor-row .hint {
    font-size: 0.8em;
    opacity: 0.7;
    margin-top: 4px;
  }
  
  ha-formfield {
    display: block;
    margin: 8px 0;
  }
`;

/**
 * Main Window Overview Card
 */
class WindowOverviewCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._config = {};
    this._hass = null;
    this._expandedSections = { open: true, tilted: true, closed: false, tamper: true };
  }

  static getConfigElement() {
    return document.createElement("window-overview-card-editor");
  }

  static getStubConfig() {
    return {
      title: "Fenster & Sicherheit",
      icon: "mdi:home-lock",
      auto_discover: true,
      combined_pattern: "^binary_sensor\\.dw_.*_combined$",
      simple_pattern: "^binary_sensor\\.window_security_panel_window_\\d+$",
      tamper_pattern: "^binary_sensor\\..*_tamper$",
      entities: [],
      exclude_entities: [],
      filter_area: "",
      show_closed: true,
      compact_mode: false,
      group_by_area: false,
      show_tamper: true,
      show_last_changed: true,
    };
  }

  set hass(hass) {
    this._hass = hass;
    this._render();
  }

  setConfig(config) {
    this._config = {
      title: "Fenster & Sicherheit",
      icon: "mdi:home-lock",
      auto_discover: true,
      combined_pattern: "^binary_sensor\\.dw_.*_combined$",
      simple_pattern: "^binary_sensor\\.window_security_panel_window_\\d+$",
      tamper_pattern: "^binary_sensor\\..*_tamper$",
      entities: [],
      exclude_entities: [],
      filter_area: "",
      show_closed: true,
      compact_mode: false,
      group_by_area: false,
      show_tamper: true,
      show_last_changed: true,
      ...config,
    };
  }

  getCardSize() {
    return 3;
  }

  /**
   * Get all relevant entities based on config
   */
  _getEntities() {
    if (!this._hass) return { windows: [], tampers: [] };

    const entities = Object.keys(this._hass.states);
    const excludeSet = new Set(this._config.exclude_entities || []);
    
    let windows = [];
    let tampers = [];

    // Manual entities
    if (this._config.entities && this._config.entities.length > 0) {
      this._config.entities.forEach((entityId) => {
        if (this._hass.states[entityId] && !excludeSet.has(entityId)) {
          windows.push(entityId);
        }
      });
    }

    // Auto-discover
    if (this._config.auto_discover) {
      const combinedRegex = new RegExp(this._config.combined_pattern);
      const simpleRegex = new RegExp(this._config.simple_pattern);
      const tamperRegex = new RegExp(this._config.tamper_pattern);

      entities.forEach((entityId) => {
        if (excludeSet.has(entityId)) return;
        
        // Skip if already in manual list
        if (windows.includes(entityId)) return;

        if (combinedRegex.test(entityId) || simpleRegex.test(entityId)) {
          // Exclude tamper sensors from window list
          if (!tamperRegex.test(entityId)) {
            windows.push(entityId);
          }
        }

        if (this._config.show_tamper && tamperRegex.test(entityId)) {
          tampers.push(entityId);
        }
      });
    }

    // Filter by area if specified
    if (this._config.filter_area) {
      const filterAreas = Array.isArray(this._config.filter_area) 
        ? this._config.filter_area 
        : [this._config.filter_area];
      
      windows = windows.filter((entityId) => {
        const area = this._getEntityArea(entityId);
        return filterAreas.includes(area);
      });
      
      tampers = tampers.filter((entityId) => {
        const area = this._getEntityArea(entityId);
        return filterAreas.includes(area);
      });
    }

    return { windows, tampers };
  }

  /**
   * Get area for an entity
   */
  _getEntityArea(entityId) {
    if (!this._hass) return null;
    
    const entityReg = this._hass.entities?.[entityId];
    if (entityReg?.area_id) {
      return entityReg.area_id;
    }
    
    // Try to get from device
    const deviceId = entityReg?.device_id;
    if (deviceId && this._hass.devices?.[deviceId]) {
      return this._hass.devices[deviceId].area_id;
    }
    
    return null;
  }

  /**
   * Get area name
   */
  _getAreaName(areaId) {
    if (!areaId || !this._hass?.areas?.[areaId]) return "Unbekannt";
    return this._hass.areas[areaId].name;
  }

  /**
   * Analyze a window entity and return its state info
   */
  _analyzeWindow(entityId) {
    const state = this._hass.states[entityId];
    if (!state) return null;

    const attrs = state.attributes || {};
    const friendlyName = attrs.friendly_name || entityId.split(".")[1];
    
    // Check if this is a combined sensor (has detailed_state attribute)
    const detailedState = attrs.detailed_state;
    const angle = attrs.angle !== undefined ? parseFloat(attrs.angle) : null;
    
    let status;
    let icon;
    
    if (detailedState) {
      // Combined sensor with tilt detection
      status = detailedState; // offen, gekippt, geschlossen
      switch (detailedState) {
        case "offen":
          icon = "mdi:window-open";
          break;
        case "gekippt":
          icon = "mdi:window-open-variant";
          break;
        default:
          icon = "mdi:window-closed";
      }
    } else {
      // Simple binary sensor
      const isOpen = state.state === "on";
      status = isOpen ? "offen" : "geschlossen";
      icon = isOpen ? "mdi:window-open" : "mdi:window-closed";
    }

    return {
      entityId,
      name: friendlyName,
      status,
      statusClass: status === "offen" ? "open" : status === "gekippt" ? "tilted" : "closed",
      icon,
      angle,
      lux: attrs.lux,
      lastChanged: state.last_changed,
      area: this._getEntityArea(entityId),
    };
  }

  /**
   * Analyze a tamper entity
   */
  _analyzeTamper(entityId) {
    const state = this._hass.states[entityId];
    if (!state) return null;

    const attrs = state.attributes || {};
    const friendlyName = attrs.friendly_name || entityId.split(".")[1];
    const isTriggered = state.state === "on";

    return {
      entityId,
      name: friendlyName,
      triggered: isTriggered,
      lastChanged: state.last_changed,
      area: this._getEntityArea(entityId),
    };
  }

  /**
   * Format time ago
   */
  _formatTimeAgo(isoString) {
    if (!isoString) return "";
    
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "gerade eben";
    if (diffMins < 60) return `vor ${diffMins} Min.`;
    if (diffHours < 24) return `vor ${diffHours} Std.`;
    return `vor ${diffDays} Tag${diffDays > 1 ? "en" : ""}`;
  }

  /**
   * Handle click on entity
   */
  _handleEntityClick(entityId) {
    const event = new CustomEvent("hass-more-info", {
      bubbles: true,
      composed: true,
      detail: { entityId },
    });
    this.dispatchEvent(event);
  }

  /**
   * Toggle section expansion
   */
  _toggleSection(section) {
    this._expandedSections[section] = !this._expandedSections[section];
    this._render();
  }

  /**
   * Main render function
   */
  _render() {
    if (!this._hass) return;

    const { windows, tampers } = this._getEntities();
    
    // Analyze all entities
    const windowData = windows
      .map((e) => this._analyzeWindow(e))
      .filter((w) => w !== null);
    
    const tamperData = tampers
      .map((e) => this._analyzeTamper(e))
      .filter((t) => t !== null);

    // Categorize windows
    const openWindows = windowData.filter((w) => w.status === "offen");
    const tiltedWindows = windowData.filter((w) => w.status === "gekippt");
    const closedWindows = windowData.filter((w) => w.status === "geschlossen");
    const triggeredTampers = tamperData.filter((t) => t.triggered);

    const hasIssues = openWindows.length > 0 || tiltedWindows.length > 0 || triggeredTampers.length > 0;
    const compactClass = this._config.compact_mode ? "compact-mode" : "";
    const hasIssuesClass = hasIssues ? "has-issues" : "";

    // Group by area if configured
    const groupByArea = this._config.group_by_area;

    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <ha-card class="${compactClass} ${hasIssuesClass}">
        <div class="header">
          <h2>
            <ha-icon class="header-icon" icon="${this._config.icon}"></ha-icon>
            ${this._config.title}
          </h2>
          ${this._config.compact_mode ? `
            <button class="toggle-details" id="toggle-btn">
              Details ${hasIssues ? "anzeigen" : ""}
            </button>
          ` : ""}
        </div>

        ${windowData.length === 0 && tamperData.length === 0 ? `
          <div class="no-entities">
            <ha-icon icon="mdi:window-closed"></ha-icon>
            <p>Keine Sensoren gefunden</p>
          </div>
        ` : `
          <!-- Summary Section -->
          <div class="summary">
            ${triggeredTampers.length > 0 ? `
              <div class="summary-item tamper">
                <span class="status-dot tamper"></span>
                <span class="summary-count">${triggeredTampers.length}</span>
                <span class="summary-label">Alarm</span>
              </div>
            ` : ""}
            <div class="summary-item open">
              <span class="status-dot open"></span>
              <span class="summary-count">${openWindows.length}</span>
              <span class="summary-label">Offen</span>
            </div>
            <div class="summary-item tilted">
              <span class="status-dot tilted"></span>
              <span class="summary-count">${tiltedWindows.length}</span>
              <span class="summary-label">Gekippt</span>
            </div>
            <div class="summary-item closed">
              <span class="status-dot closed"></span>
              <span class="summary-count">${closedWindows.length}</span>
              <span class="summary-label">Geschlossen</span>
            </div>
          </div>

          <!-- All OK Message -->
          ${!hasIssues ? `
            <div class="all-ok">
              <ha-icon icon="mdi:check-circle"></ha-icon>
              <span>Alles gesichert!</span>
            </div>
          ` : ""}

          <!-- Details Section -->
          <div class="details-section ${hasIssues ? "issues-only" : ""}">
            ${this._renderSection("tamper", "🚨 Tamper-Alarm", triggeredTampers.map(t => ({
              ...t,
              status: "Ausgelöst",
              statusClass: "tamper",
              icon: "mdi:alert-circle",
            })), groupByArea)}
            
            ${this._renderSection("open", "🔴 Geöffnet", openWindows, groupByArea)}
            
            ${this._renderSection("tilted", "🟡 Gekippt", tiltedWindows, groupByArea)}
            
            ${this._config.show_closed ? this._renderSection("closed", "🟢 Geschlossen", closedWindows, groupByArea) : ""}
          </div>
        `}
      </ha-card>
    `;

    // Add event listeners
    this._addEventListeners();
  }

  /**
   * Render a section of windows
   */
  _renderSection(sectionId, title, items, groupByArea) {
    if (items.length === 0) return "";

    const isExpanded = this._expandedSections[sectionId];

    if (groupByArea) {
      // Group items by area
      const grouped = {};
      items.forEach((item) => {
        const areaName = this._getAreaName(item.area);
        if (!grouped[areaName]) grouped[areaName] = [];
        grouped[areaName].push(item);
      });

      return `
        <div class="section-header" data-section="${sectionId}">
          <span>${title} (${items.length})</span>
          <ha-icon class="expand-icon ${isExpanded ? "expanded" : ""}" icon="mdi:chevron-down"></ha-icon>
        </div>
        ${isExpanded ? `
          <div class="window-list">
            ${Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b)).map(([areaName, areaItems]) => `
              <div class="area-group">
                <div class="area-header">${areaName}</div>
                ${areaItems.sort((a, b) => a.name.localeCompare(b.name)).map((item) => this._renderWindowItem(item)).join("")}
              </div>
            `).join("")}
          </div>
        ` : ""}
      `;
    }

    return `
      <div class="section-header" data-section="${sectionId}">
        <span>${title} (${items.length})</span>
        <ha-icon class="expand-icon ${isExpanded ? "expanded" : ""}" icon="mdi:chevron-down"></ha-icon>
      </div>
      ${isExpanded ? `
        <div class="window-list">
          ${items.sort((a, b) => a.name.localeCompare(b.name)).map((item) => this._renderWindowItem(item)).join("")}
        </div>
      ` : ""}
    `;
  }

  /**
   * Render a single window item
   */
  _renderWindowItem(item) {
    const tamperClass = item.statusClass === "tamper" ? "tamper-alert" : "";
    const details = [];
    
    if (item.angle !== null && item.angle !== undefined) {
      details.push(`${item.angle}°`);
    }
    if (this._config.show_last_changed && item.lastChanged) {
      details.push(this._formatTimeAgo(item.lastChanged));
    }

    return `
      <div class="window-item ${tamperClass}" data-entity="${item.entityId}">
        <ha-icon class="window-icon ${item.statusClass}" icon="${item.icon}"></ha-icon>
        <div class="window-info">
          <div class="window-name">${item.name}</div>
          ${details.length > 0 ? `<div class="window-details">${details.join(" • ")}</div>` : ""}
        </div>
        <span class="window-state ${item.statusClass}">${item.status}</span>
      </div>
    `;
  }

  /**
   * Add event listeners after render
   */
  _addEventListeners() {
    // Entity clicks
    this.shadowRoot.querySelectorAll(".window-item").forEach((el) => {
      el.addEventListener("click", () => {
        this._handleEntityClick(el.dataset.entity);
      });
    });

    // Section toggles
    this.shadowRoot.querySelectorAll(".section-header").forEach((el) => {
      el.addEventListener("click", () => {
        this._toggleSection(el.dataset.section);
      });
    });

    // Compact mode toggle
    const toggleBtn = this.shadowRoot.getElementById("toggle-btn");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        this._config.compact_mode = false;
        this._render();
      });
    }
  }
}

/**
 * Visual Editor for the card
 */
class WindowOverviewCardEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._config = {};
    this._hass = null;
  }

  set hass(hass) {
    this._hass = hass;
    this._render();
  }

  setConfig(config) {
    this._config = { ...config };
    this._render();
  }

  _render() {
    if (!this._hass) return;

    // Get all areas for dropdown
    const areas = this._hass.areas ? Object.values(this._hass.areas).sort((a, b) => a.name.localeCompare(b.name)) : [];
    
    // Get all binary sensors for entity picker
    const binarySensors = Object.keys(this._hass.states)
      .filter((e) => e.startsWith("binary_sensor."))
      .sort();

    this.shadowRoot.innerHTML = `
      <style>${editorStyles}</style>
      <div class="editor-container">
        
        <!-- General Settings -->
        <div class="editor-section">
          <h3>Allgemein</h3>
          
          <div class="editor-row">
            <ha-textfield
              label="Titel"
              id="title"
              .value="${this._config.title || "Fenster & Sicherheit"}"
            ></ha-textfield>
          </div>
          
          <div class="editor-row">
            <ha-icon-picker
              label="Icon"
              id="icon"
              .value="${this._config.icon || "mdi:home-lock"}"
            ></ha-icon-picker>
          </div>
        </div>

        <!-- Entity Discovery -->
        <div class="editor-section">
          <h3>Entitäten</h3>
          
          <ha-formfield label="Automatische Erkennung">
            <ha-switch
              id="auto_discover"
              .checked="${this._config.auto_discover !== false}"
            ></ha-switch>
          </ha-formfield>
          
          <div class="editor-row" id="patterns-section" style="${this._config.auto_discover === false ? "display:none" : ""}">
            <ha-textfield
              label="Kombinierte Sensoren (Regex)"
              id="combined_pattern"
              .value="${this._config.combined_pattern || "^binary_sensor\\.dw_.*_combined$"}"
            ></ha-textfield>
            <div class="hint">z.B. binary_sensor.dw_*_combined</div>
          </div>
          
          <div class="editor-row" id="simple-pattern-section" style="${this._config.auto_discover === false ? "display:none" : ""}">
            <ha-textfield
              label="Einfache Sensoren (Regex)"
              id="simple_pattern"
              .value="${this._config.simple_pattern || "^binary_sensor\\.window_security_panel_window_\\\\d+$"}"
            ></ha-textfield>
            <div class="hint">z.B. binary_sensor.window_security_panel_window_*</div>
          </div>
          
          <div class="editor-row" id="tamper-pattern-section" style="${this._config.auto_discover === false ? "display:none" : ""}">
            <ha-textfield
              label="Tamper Sensoren (Regex)"
              id="tamper_pattern"
              .value="${this._config.tamper_pattern || "^binary_sensor\\..*_tamper$"}"
            ></ha-textfield>
            <div class="hint">z.B. binary_sensor.*_tamper</div>
          </div>

          <div class="editor-row">
            <label>Zusätzliche Entitäten</label>
            <ha-entity-picker
              id="add_entity"
              .hass="${this._hass}"
              .includeDomains="${["binary_sensor"]}"
              label="Entität hinzufügen"
            ></ha-entity-picker>
            <div class="hint">Manuell Entitäten hinzufügen</div>
            ${(this._config.entities || []).length > 0 ? `
              <div style="margin-top: 8px;">
                ${(this._config.entities || []).map((e) => `
                  <div style="display: flex; align-items: center; gap: 8px; margin: 4px 0;">
                    <span style="flex: 1;">${e}</span>
                    <ha-icon-button data-remove-entity="${e}">
                      <ha-icon icon="mdi:close"></ha-icon>
                    </ha-icon-button>
                  </div>
                `).join("")}
              </div>
            ` : ""}
          </div>

          <div class="editor-row">
            <label>Entitäten ausschließen</label>
            <ha-entity-picker
              id="add_exclude"
              .hass="${this._hass}"
              .includeDomains="${["binary_sensor"]}"
              label="Entität ausschließen"
            ></ha-entity-picker>
            ${(this._config.exclude_entities || []).length > 0 ? `
              <div style="margin-top: 8px;">
                ${(this._config.exclude_entities || []).map((e) => `
                  <div style="display: flex; align-items: center; gap: 8px; margin: 4px 0;">
                    <span style="flex: 1;">${e}</span>
                    <ha-icon-button data-remove-exclude="${e}">
                      <ha-icon icon="mdi:close"></ha-icon>
                    </ha-icon-button>
                  </div>
                `).join("")}
              </div>
            ` : ""}
          </div>
        </div>

        <!-- Filters -->
        <div class="editor-section">
          <h3>Filter</h3>
          
          <div class="editor-row">
            <label>Nach Bereich filtern</label>
            <select id="filter_area" style="width: 100%; padding: 8px; border-radius: 4px; border: 1px solid var(--divider-color);">
              <option value="">Alle Bereiche</option>
              ${areas.map((area) => `
                <option value="${area.area_id}" ${this._config.filter_area === area.area_id ? "selected" : ""}>
                  ${area.name}
                </option>
              `).join("")}
            </select>
          </div>
        </div>

        <!-- Display Options -->
        <div class="editor-section">
          <h3>Anzeige</h3>
          
          <ha-formfield label="Geschlossene Fenster anzeigen">
            <ha-switch
              id="show_closed"
              .checked="${this._config.show_closed !== false}"
            ></ha-switch>
          </ha-formfield>
          
          <ha-formfield label="Tamper-Sensoren anzeigen">
            <ha-switch
              id="show_tamper"
              .checked="${this._config.show_tamper !== false}"
            ></ha-switch>
          </ha-formfield>
          
          <ha-formfield label="Letzte Änderung anzeigen">
            <ha-switch
              id="show_last_changed"
              .checked="${this._config.show_last_changed !== false}"
            ></ha-switch>
          </ha-formfield>
          
          <ha-formfield label="Nach Bereich gruppieren">
            <ha-switch
              id="group_by_area"
              .checked="${this._config.group_by_area === true}"
            ></ha-switch>
          </ha-formfield>
          
          <ha-formfield label="Kompakter Modus (nur Probleme anzeigen)">
            <ha-switch
              id="compact_mode"
              .checked="${this._config.compact_mode === true}"
            ></ha-switch>
          </ha-formfield>
        </div>
      </div>
    `;

    this._addEditorListeners();
  }

  _addEditorListeners() {
    // Text fields
    ["title", "combined_pattern", "simple_pattern", "tamper_pattern"].forEach((field) => {
      const el = this.shadowRoot.getElementById(field);
      if (el) {
        el.addEventListener("change", (e) => {
          this._config[field] = e.target.value;
          this._fireConfigChanged();
        });
      }
    });

    // Icon picker
    const iconPicker = this.shadowRoot.getElementById("icon");
    if (iconPicker) {
      iconPicker.addEventListener("value-changed", (e) => {
        this._config.icon = e.detail.value;
        this._fireConfigChanged();
      });
    }

    // Switches
    ["auto_discover", "show_closed", "show_tamper", "show_last_changed", "group_by_area", "compact_mode"].forEach((field) => {
      const el = this.shadowRoot.getElementById(field);
      if (el) {
        el.addEventListener("change", (e) => {
          this._config[field] = e.target.checked;
          this._fireConfigChanged();
          
          // Show/hide pattern sections based on auto_discover
          if (field === "auto_discover") {
            const display = e.target.checked ? "" : "none";
            this.shadowRoot.getElementById("patterns-section").style.display = display;
            this.shadowRoot.getElementById("simple-pattern-section").style.display = display;
            this.shadowRoot.getElementById("tamper-pattern-section").style.display = display;
          }
        });
      }
    });

    // Area filter
    const areaFilter = this.shadowRoot.getElementById("filter_area");
    if (areaFilter) {
      areaFilter.addEventListener("change", (e) => {
        this._config.filter_area = e.target.value || "";
        this._fireConfigChanged();
      });
    }

    // Entity picker - add
    const addEntity = this.shadowRoot.getElementById("add_entity");
    if (addEntity) {
      addEntity.addEventListener("value-changed", (e) => {
        if (e.detail.value) {
          const entities = this._config.entities || [];
          if (!entities.includes(e.detail.value)) {
            this._config.entities = [...entities, e.detail.value];
            this._fireConfigChanged();
            this._render();
          }
          addEntity.value = "";
        }
      });
    }

    // Entity picker - exclude
    const addExclude = this.shadowRoot.getElementById("add_exclude");
    if (addExclude) {
      addExclude.addEventListener("value-changed", (e) => {
        if (e.detail.value) {
          const excludes = this._config.exclude_entities || [];
          if (!excludes.includes(e.detail.value)) {
            this._config.exclude_entities = [...excludes, e.detail.value];
            this._fireConfigChanged();
            this._render();
          }
          addExclude.value = "";
        }
      });
    }

    // Remove entity buttons
    this.shadowRoot.querySelectorAll("[data-remove-entity]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const entity = btn.dataset.removeEntity;
        this._config.entities = (this._config.entities || []).filter((e) => e !== entity);
        this._fireConfigChanged();
        this._render();
      });
    });

    // Remove exclude buttons
    this.shadowRoot.querySelectorAll("[data-remove-exclude]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const entity = btn.dataset.removeExclude;
        this._config.exclude_entities = (this._config.exclude_entities || []).filter((e) => e !== entity);
        this._fireConfigChanged();
        this._render();
      });
    });
  }

  _fireConfigChanged() {
    const event = new CustomEvent("config-changed", {
      detail: { config: this._config },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }
}

// Register the card and editor
customElements.define("window-overview-card", WindowOverviewCard);
customElements.define("window-overview-card-editor", WindowOverviewCardEditor);

// Register with Home Assistant
window.customCards = window.customCards || [];
window.customCards.push({
  type: "window-overview-card",
  name: "Window Overview Card",
  description: "A card showing window and security sensor status with open/tilted/closed states and tamper alerts.",
  preview: true,
  documentationURL: "https://github.com/your-repo/window-overview-card",
});

console.info(
  `%c WINDOW-OVERVIEW-CARD %c v${CARD_VERSION} `,
  "color: white; background: #3498db; font-weight: bold;",
  "color: #3498db; background: white; font-weight: bold;"
);
