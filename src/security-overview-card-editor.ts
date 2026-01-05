import { LitElement, html, css, CSSResultGroup, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, LovelaceCardEditor, fireEvent } from 'custom-card-helpers';
import { SecurityOverviewCardConfig } from './security-overview-card';

@customElement('security-overview-card-editor')
export class SecurityOverviewCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: SecurityOverviewCardConfig;

  public setConfig(config: SecurityOverviewCardConfig): void {
    this._config = {
      entities: [],
      devices: [],
      ...config,
    };
  }

  protected render(): TemplateResult {
    if (!this.hass || !this._config) {
      return html``;
    }

    const availableDevices = this._getAvailableDevices();

    return html`
      <div class="card-config">
        <paper-input
          label="Title"
          .value="${this._config.title || ''}"
          .configValue="${'title'}"
          @value-changed="${this._valueChanged}"
        ></paper-input>

        <ha-formfield label="Show Header">
          <ha-switch
            .checked="${this._config.show_header !== false}"
            .configValue="${'show_header'}"
            @change="${this._valueChanged}"
          ></ha-switch>
        </ha-formfield>

        <ha-formfield label="Show Compact Overview">
          <ha-switch
            .checked="${this._config.show_compact_overview !== false}"
            .configValue="${'show_compact_overview'}"
            @change="${this._valueChanged}"
          ></ha-switch>
        </ha-formfield>

        <paper-input
          label="Max Height (e.g., 300px, 50vh)"
          .value="${this._config.max_height || ''}"
          .configValue="${'max_height'}"
          @value-changed="${this._valueChanged}"
          placeholder="Leave empty for auto height"
        ></paper-input>

        <div class="devices-config">
          <h3>Devices</h3>
          <p class="description">
            Select specific security devices to display. Leave empty to show all discovered security devices.
          </p>

          ${availableDevices.length > 0 ? html`
            ${availableDevices.map(device => {
              const isSelected = (this._config.devices || []).includes(device.id);
              return html`
                <div class="device-row">
                  <ha-formfield .label="${device.name || device.id}">
                    <ha-checkbox
                      .checked="${isSelected}"
                      @change="${(ev: Event) => this._deviceToggled(ev, device.id)}"
                    ></ha-checkbox>
                  </ha-formfield>
                  <span class="device-info">${device.entityCount} entities</span>
                </div>
              `;
            })}
          ` : html`
            <p class="info-message">No security devices found. Entities will be auto-discovered.</p>
          `}
        </div>

        <div class="entities-config">
          <h3>Manual Entity Selection</h3>
          <p class="description">
            Manually add specific entities. This will override device selection and auto-discovery.
          </p>

          ${(this._config.entities || []).map(
            (entity, index) => html`
              <div class="entity-row">
                <ha-entity-picker
                  .hass="${this.hass}"
                  .value="${entity}"
                  .configValue="${index}"
                  @value-changed="${this._entityChanged}"
                  allow-custom-entity
                ></ha-entity-picker>
                <ha-icon-button
                  .index="${index}"
                  @click="${this._removeEntity}"
                  .label="${'Remove entity'}"
                >
                  <ha-icon icon="mdi:close"></ha-icon>
                </ha-icon-button>
              </div>
            `
          )}

          <ha-button @click="${this._addEntity}">
            <ha-icon icon="mdi:plus"></ha-icon>
            Add Entity
          </ha-button>
        </div>
      </div>
    `;
  }

  private _valueChanged(ev: CustomEvent): void {
    if (!this._config || !this.hass) {
      return;
    }

    const target = ev.target as any;
    const configValue = target.configValue;

    if (!configValue) {
      return;
    }

    let value: any;
    if (target.checked !== undefined) {
      value = target.checked;
    } else {
      value = ev.detail.value;
    }

    if (this._config[configValue] === value) {
      return;
    }

    const newConfig = {
      ...this._config,
      [configValue]: value,
    };

    fireEvent(this, 'config-changed', { config: newConfig });
  }

  private _entityChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    if (!this._config || !this.hass) {
      return;
    }

    const target = ev.target as any;
    const index = target.configValue;
    const value = ev.detail.value;

    if (value === undefined || value === null) {
      return;
    }

    const entities = [...(this._config.entities || [])];
    entities[index] = value;

    const newConfig = {
      ...this._config,
      entities,
    };

    fireEvent(this, 'config-changed', { config: newConfig });
  }

  private _addEntity(): void {
    const entities = [...(this._config.entities || []), ''];

    const newConfig = {
      ...this._config,
      entities,
    };

    fireEvent(this, 'config-changed', { config: newConfig });
  }

  private _removeEntity(ev: CustomEvent): void {
    const target = ev.currentTarget as any;
    const index = target.index;

    const entities = [...(this._config.entities || [])];
    entities.splice(index, 1);

    const newConfig = {
      ...this._config,
      entities,
    };

    fireEvent(this, 'config-changed', { config: newConfig });
  }

  private _deviceToggled(ev: Event, deviceId: string): void {
    const target = ev.target as any;
    const checked = target.checked;

    let devices = [...(this._config.devices || [])];

    if (checked) {
      if (!devices.includes(deviceId)) {
        devices.push(deviceId);
      }
    } else {
      devices = devices.filter(id => id !== deviceId);
    }

    const newConfig = {
      ...this._config,
      devices,
    };

    fireEvent(this, 'config-changed', { config: newConfig });
  }

  private _getAvailableDevices(): Array<{ id: string; name: string; entityCount: number }> {
    if (!this.hass) {
      return [];
    }

    const deviceMap = new Map<string, { id: string; name: string; entities: Set<string> }>();

    // Get all security-related entities
    Object.values(this.hass.states).forEach((entity) => {
      const domain = entity.entity_id.split('.')[0];
      const isSecurityEntity =
        ['alarm_control_panel', 'binary_sensor', 'lock', 'camera', 'sensor'].includes(domain) &&
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

      if (isSecurityEntity && entity.attributes.device_id) {
        const deviceId = entity.attributes.device_id;
        if (!deviceMap.has(deviceId)) {
          // Try to get device name from entity registry
          const deviceName = this._getDeviceName(deviceId, entity);
          deviceMap.set(deviceId, {
            id: deviceId,
            name: deviceName,
            entities: new Set(),
          });
        }
        deviceMap.get(deviceId)!.entities.add(entity.entity_id);
      }
    });

    return Array.from(deviceMap.values())
      .map(device => ({
        id: device.id,
        name: device.name,
        entityCount: device.entities.size,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  private _getDeviceName(deviceId: string, entity: any): string {
    // Try to extract device name from entity attributes
    if (entity.attributes.device_name) {
      return entity.attributes.device_name;
    }

    // Try to use friendly name prefix
    const friendlyName = entity.attributes.friendly_name || '';
    const parts = friendlyName.split(' ');
    if (parts.length > 1) {
      // Return first part(s) as device name
      return parts.slice(0, -1).join(' ') || deviceId;
    }

    return deviceId;
  }

  static get styles(): CSSResultGroup {
    return css`
      .card-config {
        padding: 16px;
      }

      paper-input,
      ha-formfield {
        display: block;
        margin-bottom: 16px;
      }

      .devices-config,
      .entities-config {
        margin-top: 24px;
        padding-top: 16px;
        border-top: 1px solid var(--divider-color);
      }

      .devices-config h3,
      .entities-config h3 {
        margin-top: 0;
        margin-bottom: 8px;
        font-size: 1.1em;
      }

      .description {
        color: var(--secondary-text-color);
        font-size: 0.9em;
        margin-bottom: 16px;
        margin-top: 0;
      }

      .info-message {
        color: var(--secondary-text-color);
        font-size: 0.9em;
        font-style: italic;
        margin: 8px 0;
      }

      .device-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 0;
        border-bottom: 1px solid var(--divider-color);
      }

      .device-row:last-child {
        border-bottom: none;
      }

      .device-row ha-formfield {
        margin-bottom: 0;
      }

      .device-info {
        color: var(--secondary-text-color);
        font-size: 0.85em;
        margin-left: 8px;
      }

      .entity-row {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
      }

      .entity-row ha-entity-picker {
        flex: 1;
      }

      ha-button {
        margin-top: 8px;
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'security-overview-card-editor': SecurityOverviewCardEditor;
  }
}
