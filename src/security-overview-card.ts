import { LitElement, html, css, CSSResultGroup, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, LovelaceCardConfig, LovelaceCardEditor } from 'custom-card-helpers';

export interface SecurityOverviewCardConfig extends LovelaceCardConfig {
  type: string;
  title?: string;
  entities?: string[];
  show_header?: boolean;
  theme?: string;
  max_height?: string;
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
      show_header: true,
    };
  }

  public setConfig(config: SecurityOverviewCardConfig): void {
    if (!config) {
      throw new Error('Invalid configuration');
    }
    this.config = {
      title: 'Security Overview',
      show_header: true,
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
    const securityEntities = this._getSecurityEntities(entities);
    const maxHeightStyle = this.config.max_height ? `max-height: ${this.config.max_height};` : '';

    return html`
      <ha-card .header="${this.config.show_header ? this.config.title : undefined}">
        <div class="card-content" style="${maxHeightStyle}">
          ${securityEntities.length === 0
            ? html`<p class="empty-state">No security entities configured</p>`
            : html`
                <div class="entities">
                  ${securityEntities.map((entity) => this._renderEntity(entity))}
                </div>
              `}
        </div>
      </ha-card>
    `;
  }

  private _getSecurityEntities(entities: string[]) {
    if (entities.length > 0) {
      return entities
        .map((entityId) => this.hass.states[entityId])
        .filter((entity) => entity !== undefined);
    }

    // Auto-discover security-related entities
    return Object.values(this.hass.states).filter((entity) => {
      const domain = entity.entity_id.split('.')[0];
      return ['alarm_control_panel', 'binary_sensor', 'lock', 'camera', 'sensor'].includes(domain) &&
        (entity.entity_id.includes('security') ||
         entity.entity_id.includes('alarm') ||
         entity.entity_id.includes('door') ||
         entity.entity_id.includes('window') ||
         entity.entity_id.includes('motion') ||
         entity.entity_id.includes('lock') ||
         entity.attributes.device_class === 'door' ||
         entity.attributes.device_class === 'window' ||
         entity.attributes.device_class === 'motion' ||
         entity.attributes.device_class === 'opening' ||
         entity.attributes.device_class === 'lock' ||
         entity.attributes.device_class === 'safety' ||
         entity.attributes.device_class === 'smoke' ||
         entity.attributes.device_class === 'gas');
    });
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
    
    if (unit) {
      return `${state} ${unit}`;
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
    const autoEntities = this._getSecurityEntities(entities);
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
