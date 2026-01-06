import { LitElement, html, css, CSSResultGroup, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, LovelaceCardConfig, LovelaceCardEditor } from 'custom-card-helpers';

export interface SecurityOverviewCardConfig extends LovelaceCardConfig {
  type: string;
  title?: string;
  entities?: string[];
  devices?: string[];
  show_header?: boolean;
  show_compact_overview?: boolean;
  theme?: string;
  max_height?: string;
  show_alarms?: boolean;
  show_locks?: boolean;
  show_doors?: boolean;
  show_windows?: boolean;
  show_motion?: boolean;
  show_cameras?: boolean;
  show_tamper?: boolean;
}

@customElement('security-overview-card')
export class SecurityOverviewCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config!: SecurityOverviewCardConfig;

  public static getStubConfig(): SecurityOverviewCardConfig {
    return {
      type: 'custom:security-overview-card',
      title: 'Security Overview',
      entities: [],
      devices: [],
      show_header: true,
      show_compact_overview: true,
      show_alarms: true,
      show_locks: true,
      show_doors: true,
      show_windows: true,
      show_motion: true,
      show_cameras: true,
      show_tamper: false,
    };
  }

  public setConfig(config: SecurityOverviewCardConfig): void {
    if (!config) {
      throw new Error('Invalid configuration');
    }
    this.config = {
      title: 'Security Overview',
      show_header: true,
      show_compact_overview: true,
      show_alarms: true,
      show_locks: true,
      show_doors: true,
      show_windows: true,
      show_motion: true,
      show_cameras: true,
      show_tamper: false,
      ...config,
    };
  }

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import('./security-overview-card-editor');
    return document.createElement('security-overview-card-editor') as LovelaceCardEditor;
  }

  protected render(): TemplateResult {
    if (!this.config || !this.hass) {
      return html``;
    }

    const entities = this.config.entities || [];
    const devices = this.config.devices || [];
    const securityEntities = this._getSecurityEntities(entities, devices);
    const maxHeightStyle = this.config.max_height ? `max-height: ${this.config.max_height};` : '';

    return html`
      <ha-card .header="${this.config.show_header ? this.config.title : undefined}">
        <div class="card-content" style="${maxHeightStyle}">
          ${securityEntities.length === 0
            ? html`<p class="empty-state">No security entities configured</p>`
            : html`
                ${this.config.show_compact_overview !== false ? this._renderCompactOverview(securityEntities) : ''}
                <div class="entities">
                  ${securityEntities.map((entity) => this._renderEntity(entity))}
                </div>
              `}
        </div>
      </ha-card>
    `;
  }

  private _getSecurityEntities(entities: string[], devices: string[]) {
    let allSecurityEntities: any[] = [];

    // If specific entities are configured, use those
    if (entities.length > 0) {
      allSecurityEntities = entities
        .map((entityId) => this.hass.states[entityId])
        .filter((entity) => entity !== undefined);
    } else {
      // Get all security-related entities
      allSecurityEntities = Object.values(this.hass.states).filter((entity) => {
        const domain = entity.entity_id.split('.')[0];
        return ['alarm_control_panel', 'binary_sensor', 'lock', 'camera', 'sensor'].includes(domain) &&
          (entity.entity_id.includes('security') ||
           entity.entity_id.includes('alarm') ||
           entity.entity_id.includes('door') ||
           entity.entity_id.includes('window') ||
           entity.entity_id.includes('motion') ||
           entity.entity_id.includes('lock') ||
           entity.entity_id.includes('tamper') ||
           entity.attributes.device_class === 'door' ||
           entity.attributes.device_class === 'window' ||
           entity.attributes.device_class === 'motion' ||
           entity.attributes.device_class === 'opening' ||
           entity.attributes.device_class === 'lock' ||
           entity.attributes.device_class === 'safety' ||
           entity.attributes.device_class === 'smoke' ||
           entity.attributes.device_class === 'gas' ||
           entity.attributes.device_class === 'tamper');
      });

      // Filter by selected devices if any
      if (devices.length > 0) {
        allSecurityEntities = allSecurityEntities.filter((entity) => {
          const entityDeviceId = this._getEntityDeviceId(entity);
          return entityDeviceId && devices.includes(entityDeviceId);
        });
      }
    }

    // Apply entity type visibility settings to all entities (manual or auto-discovered)
    allSecurityEntities = allSecurityEntities.filter((entity) => {
      const entityType = this._getEntityType(entity);

      switch (entityType) {
        case 'alarm':
          return this.config.show_alarms !== false;
        case 'lock':
          return this.config.show_locks !== false;
        case 'door':
          return this.config.show_doors !== false;
        case 'window':
          return this.config.show_windows !== false;
        case 'motion':
          return this.config.show_motion !== false;
        case 'camera':
          return this.config.show_cameras !== false;
        case 'tamper':
          return this.config.show_tamper === true; // Default false for tamper
        default:
          return true;
      }
    });

    return allSecurityEntities;
  }

  private _getEntityType(entity: any): string {
    const domain = entity.entity_id.split('.')[0];
    const deviceClass = entity.attributes.device_class;

    // Check tamper first (highest priority to exclude from other categories)
    if (deviceClass === 'tamper' || entity.entity_id.includes('tamper')) {
      return 'tamper';
    }

    if (domain === 'alarm_control_panel') {
      return 'alarm';
    }

    if (domain === 'lock') {
      return 'lock';
    }

    if (domain === 'camera') {
      return 'camera';
    }

    if (deviceClass === 'door' || (entity.entity_id.includes('door') && domain === 'binary_sensor')) {
      return 'door';
    }

    if (deviceClass === 'window' || (entity.entity_id.includes('window') && domain === 'binary_sensor')) {
      return 'window';
    }

    if (deviceClass === 'motion' || (entity.entity_id.includes('motion') && domain === 'binary_sensor')) {
      return 'motion';
    }

    return 'other';
  }

  private _getEntityDeviceId(entity: any): string {
    const domain = entity.entity_id.split('.')[0];

    // Try to get device_id from entity attributes first
    if (entity.attributes.device_id) {
      return entity.attributes.device_id;
    }

    // Fallback: Group by friendly name prefix (must match editor logic)
    const friendlyName = entity.attributes.friendly_name || '';
    const nameParts = friendlyName.split(' ');
    if (nameParts.length > 1) {
      // Use all but last word as device identifier
      return nameParts.slice(0, -1).join(' ').toLowerCase().replace(/\s+/g, '_');
    }

    // Use entity domain as grouping
    return `${domain}_devices`;
  }

  private _renderCompactOverview(entities: any[]): TemplateResult {
    // Helper to check if entity is tamper
    const isTamper = (e: any) =>
      e.attributes.device_class === 'tamper' ||
      e.entity_id.includes('tamper');

    // Group entities by type (excluding tamper from other groups)
    const groups: Record<string, any[]> = {
      alarms: entities.filter((e: any) => e.entity_id.split('.')[0] === 'alarm_control_panel'),
      locks: entities.filter((e: any) => e.entity_id.split('.')[0] === 'lock'),
      doors: entities.filter((e: any) =>
        !isTamper(e) && (
          e.attributes.device_class === 'door' ||
          (e.entity_id.includes('door') && e.entity_id.split('.')[0] === 'binary_sensor')
        )
      ),
      windows: entities.filter((e: any) =>
        !isTamper(e) && (
          e.attributes.device_class === 'window' ||
          (e.entity_id.includes('window') && e.entity_id.split('.')[0] === 'binary_sensor')
        )
      ),
      motion: entities.filter((e: any) =>
        !isTamper(e) && (
          e.attributes.device_class === 'motion' ||
          (e.entity_id.includes('motion') && e.entity_id.split('.')[0] === 'binary_sensor')
        )
      ),
      cameras: entities.filter((e: any) => e.entity_id.split('.')[0] === 'camera'),
      tamper: entities.filter((e: any) => isTamper(e)),
    };

    const groupConfig = [
      { key: 'alarms', icon: 'mdi:shield-home', label: 'Alarms', activeLabel: 'triggered', inactiveLabel: 'disarmed' },
      { key: 'locks', icon: 'mdi:lock', label: 'Locks', activeLabel: 'unlocked', inactiveLabel: 'locked' },
      { key: 'doors', icon: 'mdi:door-closed', label: 'Doors', activeLabel: 'open', inactiveLabel: 'closed' },
      { key: 'windows', icon: 'mdi:window-closed', label: 'Windows', activeLabel: 'open', inactiveLabel: 'closed' },
      { key: 'motion', icon: 'mdi:motion-sensor', label: 'Motion', activeLabel: 'detected', inactiveLabel: 'clear' },
      { key: 'cameras', icon: 'mdi:cctv', label: 'Cameras', activeLabel: 'active', inactiveLabel: 'active' },
      { key: 'tamper', icon: 'mdi:shield-alert', label: 'Tamper', activeLabel: 'triggered', inactiveLabel: 'ok' },
    ];

    return html`
      <div class="compact-overview">
        ${groupConfig
          .filter(group => groups[group.key].length > 0)
          .map(group => {
            const groupEntities = groups[group.key];
            const activeCount = groupEntities.filter((e: any) => this._isEntityActive(e)).length;
            const total = groupEntities.length;
            const hasActive = activeCount > 0;
            const stateLabel = hasActive
              ? `${activeCount}/${total} ${group.activeLabel}`
              : `${total}/${total} ${group.inactiveLabel}`;

            return html`
              <div class="overview-group ${hasActive ? 'has-active' : ''}">
                <ha-icon .icon="${group.icon}"></ha-icon>
                <div class="overview-info">
                  <div class="overview-label">${group.label}</div>
                  <div class="overview-count ${hasActive ? 'active' : ''}">
                    ${stateLabel}
                  </div>
                </div>
              </div>
            `;
          })}
      </div>
    `;
  }

  private _renderEntity(entity: any): TemplateResult {
    const state = entity.state;
    const name = entity.attributes.friendly_name || entity.entity_id;
    const isActive = this._isEntityActive(entity);
    
    const icon = this._getEntityIcon(entity);
    const stateClass = isActive ? 'state-active' : 'state-inactive';

    return html`
      <div class="entity-row ${stateClass}" @click="${() => this._handleEntityClick(entity.entity_id)}">
        <div class="entity-icon">
          <ha-icon .icon="${icon}"></ha-icon>
        </div>
        <div class="entity-info">
          <div class="entity-name">${name}</div>
          <div class="entity-state">${this._formatState(entity)}</div>
        </div>
        <div class="entity-status">
          <span class="status-badge ${stateClass}">${state}</span>
        </div>
      </div>
    `;
  }

  private _isEntityActive(entity: any): boolean {
    const state = entity.state.toLowerCase();
    const domain = entity.entity_id.split('.')[0];

    if (domain === 'alarm_control_panel') {
      return ['triggered', 'arming', 'pending'].includes(state);
    }
    
    if (domain === 'binary_sensor') {
      return state === 'on';
    }
    
    if (domain === 'lock') {
      return state === 'unlocked';
    }

    return ['on', 'open', 'unlocked', 'detected', 'triggered'].includes(state);
  }

  private _getEntityIcon(entity: any): string {
    const domain = entity.entity_id.split('.')[0];
    const deviceClass = entity.attributes.device_class;
    const state = entity.state.toLowerCase();

    // Use custom icon if available
    if (entity.attributes.icon) {
      return entity.attributes.icon;
    }

    // Domain-based icons
    if (domain === 'alarm_control_panel') {
      if (state === 'triggered') return 'mdi:bell-ring';
      if (state === 'armed_away' || state === 'armed_home' || state === 'armed_night') return 'mdi:shield-lock';
      return 'mdi:shield-home';
    }

    if (domain === 'lock') {
      return state === 'locked' ? 'mdi:lock' : 'mdi:lock-open';
    }

    if (domain === 'camera') {
      return 'mdi:cctv';
    }

    // Device class based icons for binary sensors
    if (deviceClass === 'tamper' || entity.entity_id.includes('tamper')) {
      return state === 'on' ? 'mdi:shield-alert' : 'mdi:shield-check';
    }
    if (deviceClass === 'door') {
      return state === 'on' ? 'mdi:door-open' : 'mdi:door-closed';
    }
    if (deviceClass === 'window') {
      return state === 'on' ? 'mdi:window-open' : 'mdi:window-closed';
    }
    if (deviceClass === 'motion') {
      return state === 'on' ? 'mdi:motion-sensor' : 'mdi:motion-sensor-off';
    }
    if (deviceClass === 'smoke') {
      return 'mdi:smoke-detector';
    }
    if (deviceClass === 'gas') {
      return 'mdi:gas-cylinder';
    }

    return 'mdi:shield-check';
  }

  private _formatState(entity: any): string {
    const state = entity.state;
    const unit = entity.attributes.unit_of_measurement;
    const deviceClass = entity.attributes.device_class;
    const domain = entity.entity_id.split('.')[0];

    if (unit) {
      return `${state} ${unit}`;
    }

    // Format tamper sensor states
    if (deviceClass === 'tamper' || entity.entity_id.includes('tamper')) {
      if (state.toLowerCase() === 'on') return 'Triggered';
      if (state.toLowerCase() === 'off') return 'OK';
    }

    // Format window and door states
    if (deviceClass === 'window' || deviceClass === 'door' || deviceClass === 'opening') {
      if (state.toLowerCase() === 'on') return 'Open';
      if (state.toLowerCase() === 'off') return 'Closed';
    }

    // Format lock states
    if (domain === 'lock') {
      if (state.toLowerCase() === 'locked') return 'Locked';
      if (state.toLowerCase() === 'unlocked') return 'Unlocked';
    }

    // Format motion sensor states
    if (deviceClass === 'motion') {
      if (state.toLowerCase() === 'on') return 'Detected';
      if (state.toLowerCase() === 'off') return 'Clear';
    }

    return state.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());
  }

  private _handleEntityClick(entityId: string): void {
    const event = new CustomEvent('hass-more-info', {
      bubbles: true,
      composed: true,
      detail: { entityId },
    });
    this.dispatchEvent(event);
  }

  public getCardSize(): number {
    const entities = this.config.entities || [];
    const devices = this.config.devices || [];
    const autoEntities = this._getSecurityEntities(entities, devices);
    return Math.max(1, Math.ceil(autoEntities.length / 2));
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        display: block;
      }

      ha-card {
        padding: 16px;
      }

      .card-content {
        padding: 0;
        overflow-y: auto;
      }

      .empty-state {
        text-align: center;
        color: var(--secondary-text-color);
        padding: 20px;
      }

      .entities {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .entity-row {
        display: flex;
        align-items: center;
        padding: 12px;
        background: var(--card-background-color);
        border-radius: 8px;
        cursor: pointer;
        transition: background 0.2s;
        border: 1px solid var(--divider-color);
      }

      .entity-row:hover {
        background: var(--secondary-background-color);
      }

      .entity-row.state-active {
        border-left: 4px solid var(--error-color);
      }

      .entity-row.state-inactive {
        border-left: 4px solid var(--success-color);
      }

      .entity-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        margin-right: 12px;
      }

      .entity-icon ha-icon {
        --mdc-icon-size: 24px;
      }

      .entity-row.state-active .entity-icon ha-icon {
        color: var(--error-color);
      }

      .entity-row.state-inactive .entity-icon ha-icon {
        color: var(--success-color);
      }

      .entity-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .entity-name {
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .entity-state {
        font-size: 0.9em;
        color: var(--secondary-text-color);
      }

      .entity-status {
        display: flex;
        align-items: center;
      }

      .status-badge {
        padding: 4px 12px;
        border-radius: 12px;
        font-size: 0.85em;
        font-weight: 500;
        text-transform: capitalize;
      }

      .status-badge.state-active {
        background: var(--error-color);
        color: white;
      }

      .status-badge.state-inactive {
        background: var(--success-color);
        color: white;
      }

      .compact-overview {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 12px;
        margin-bottom: 16px;
        padding: 12px;
        background: var(--secondary-background-color);
        border-radius: 8px;
      }

      .overview-group {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px;
        background: var(--card-background-color);
        border-radius: 6px;
        border-left: 3px solid var(--success-color);
        transition: all 0.2s;
      }

      .overview-group.has-active {
        border-left-color: var(--error-color);
      }

      .overview-group ha-icon {
        --mdc-icon-size: 20px;
        color: var(--primary-text-color);
        flex-shrink: 0;
      }

      .overview-group.has-active ha-icon {
        color: var(--error-color);
      }

      .overview-info {
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 0;
      }

      .overview-label {
        font-size: 0.75em;
        color: var(--secondary-text-color);
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .overview-count {
        font-size: 0.9em;
        font-weight: 600;
        color: var(--success-color);
      }

      .overview-count.active {
        color: var(--error-color);
      }

      .overview-count .active-count {
        font-size: 1.1em;
        font-weight: 700;
      }
    `;
  }
}

// Register the card
declare global {
  interface HTMLElementTagNameMap {
    'security-overview-card': SecurityOverviewCard;
  }
}

// Add card to custom cards list
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'security-overview-card',
  name: 'Security Overview Card',
  description: 'A card to display security-related entities in Home Assistant',
  preview: true,
});

console.info(
  '%c SECURITY-OVERVIEW-CARD %c 1.0.0 ',
  'color: white; background: #1976d2; font-weight: 700;',
  'color: #1976d2; background: white; font-weight: 700;',
);
