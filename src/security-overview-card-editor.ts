import { LitElement, html, css, CSSResultGroup, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, LovelaceCardEditor, fireEvent } from 'custom-card-helpers';
import { SecurityOverviewCardConfig } from './security-overview-card';

@customElement('security-overview-card-editor')
export class SecurityOverviewCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: SecurityOverviewCardConfig;
  @state() private _expandedDevices: Set<string> = new Set();

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

        <div class="selection-mode-config">
          <label>Category Selection Mode</label>
          <p class="description">
            Choose how clicking categories in the compact overview filters the list. Single mode shows only one category at a time, while Multiple mode allows selecting multiple categories simultaneously.
          </p>
          <ha-formfield label="Single Selection">
            <ha-radio
              name="category_selection_mode"
              value="single"
              .checked="${this._config.category_selection_mode !== 'multiple'}"
              @change="${this._selectionModeChanged}"
            ></ha-radio>
          </ha-formfield>
          <ha-formfield label="Multiple Selection">
            <ha-radio
              name="category_selection_mode"
              value="multiple"
              .checked="${this._config.category_selection_mode === 'multiple'}"
              @change="${this._selectionModeChanged}"
            ></ha-radio>
          </ha-formfield>
        </div>

        <paper-input
          label="Max Height (e.g., 300px, 50vh)"
          .value="${this._config.max_height || ''}"
          .configValue="${'max_height'}"
          @value-changed="${this._valueChanged}"
          placeholder="Leave empty for auto height"
        ></paper-input>

        <div class="visibility-config">
          <h3>Entity Type Visibility</h3>
          <p class="description">
            Control which types of security entities are shown in the list below. Entities remain selected and appear in the compact overview, but are hidden from the list when unchecked.
          </p>

          <ha-formfield label="Show Alarms">
            <ha-switch
              .checked="${this._config.show_alarms !== false}"
              .configValue="${'show_alarms'}"
              @change="${this._valueChanged}"
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Show Locks">
            <ha-switch
              .checked="${this._config.show_locks !== false}"
              .configValue="${'show_locks'}"
              @change="${this._valueChanged}"
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Show Doors">
            <ha-switch
              .checked="${this._config.show_doors !== false}"
              .configValue="${'show_doors'}"
              @change="${this._valueChanged}"
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Show Windows">
            <ha-switch
              .checked="${this._config.show_windows !== false}"
              .configValue="${'show_windows'}"
              @change="${this._valueChanged}"
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Show Motion Sensors">
            <ha-switch
              .checked="${this._config.show_motion !== false}"
              .configValue="${'show_motion'}"
              @change="${this._valueChanged}"
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Show Cameras">
            <ha-switch
              .checked="${this._config.show_cameras !== false}"
              .configValue="${'show_cameras'}"
              @change="${this._valueChanged}"
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Show Safety Alarms">
            <ha-switch
              .checked="${this._config.show_safety !== false}"
              .configValue="${'show_safety'}"
              @change="${this._valueChanged}"
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Show Diagnostic">
            <ha-switch
              .checked="${this._config.show_diagnostic !== false}"
              .configValue="${'show_diagnostic'}"
              @change="${this._valueChanged}"
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Show Tamper Sensors">
            <ha-switch
              .checked="${this._config.show_tamper === true}"
              .configValue="${'show_tamper'}"
              @change="${this._valueChanged}"
            ></ha-switch>
          </ha-formfield>

          <div class="divider"></div>

          <ha-formfield label="Show Hidden Entities When Active">
            <ha-switch
              .checked="${this._config.show_hidden_when_active === true}"
              .configValue="${'show_hidden_when_active'}"
              @change="${this._valueChanged}"
            ></ha-switch>
          </ha-formfield>
          <p class="description secondary">
            When enabled, hidden entity types (unchecked above) will still appear in the list if they are currently active/triggered (e.g., open doors, unlocked locks, triggered alarms).
          </p>
        </div>

        <div class="devices-config">
          <h3>Device Selection</h3>
          <p class="description">
            Select specific security devices or groups to display. Entities are automatically grouped by device or by name. Leave all unchecked to show all discovered security entities.
          </p>

          ${availableDevices.length > 0 ? html`
            ${availableDevices.map(device => {
              const deviceEntities = device.entities || [];
              const configEntities = this._config.entities || [];

              // Calculate device checkbox state based on entity selection
              const selectedCount = deviceEntities.filter(e => configEntities.includes(e.entity_id)).length;
              const isFullySelected = selectedCount === deviceEntities.length && deviceEntities.length > 0;
              const isPartiallySelected = selectedCount > 0 && selectedCount < deviceEntities.length;

              const isExpanded = this._isDeviceExpanded(device.id);
              return html`
                <div class="device-container">
                  <div class="device-row">
                    <ha-formfield .label="${device.name || device.id}">
                      <ha-checkbox
                        .checked="${isFullySelected}"
                        .indeterminate="${isPartiallySelected}"
                        @change="${(ev: Event) => this._deviceToggled(ev, device)}"
                      ></ha-checkbox>
                    </ha-formfield>
                    <div class="device-actions">
                      <span class="device-info">${device.entityCount} entities</span>
                      <ha-icon-button
                        @click="${() => this._toggleDeviceExpand(device.id)}"
                        .label="${isExpanded ? 'Collapse' : 'Expand'}"
                      >
                        <ha-icon .icon="${isExpanded ? 'mdi:chevron-up' : 'mdi:chevron-down'}"></ha-icon>
                      </ha-icon-button>
                    </div>
                  </div>
                  ${isExpanded ? this._renderDeviceEntities(device) : ''}
                </div>
              `;
            })}
          ` : html`
            <p class="info-message">No security entities found in your Home Assistant instance. The card will auto-discover alarm panels, locks, doors, windows, motion sensors, and cameras when available.</p>
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

  private _selectionModeChanged(ev: Event): void {
    if (!this._config || !this.hass) {
      return;
    }

    const target = ev.target as any;
    const value = target.value;

    if (this._config.category_selection_mode === value) {
      return;
    }

    const newConfig = {
      ...this._config,
      category_selection_mode: value,
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

  private _deviceToggled(ev: Event, device: any): void {
    const target = ev.target as any;
    const checked = target.checked;

    let entities = [...(this._config.entities || [])];
    const deviceEntityIds = (device.entities || []).map((e: any) => e.entity_id);

    if (checked) {
      // Add all entities from this device that aren't already selected
      deviceEntityIds.forEach((entityId: string) => {
        if (!entities.includes(entityId)) {
          entities.push(entityId);
        }
      });
    } else {
      // Remove all entities from this device
      entities = entities.filter(id => !deviceEntityIds.includes(id));
    }

    const newConfig = {
      ...this._config,
      entities,
    };

    fireEvent(this, 'config-changed', { config: newConfig });
  }

  private _isDeviceExpanded(deviceId: string): boolean {
    return this._expandedDevices.has(deviceId);
  }

  private _toggleDeviceExpand(deviceId: string): void {
    if (this._expandedDevices.has(deviceId)) {
      this._expandedDevices.delete(deviceId);
    } else {
      this._expandedDevices.add(deviceId);
    }
    this.requestUpdate();
  }

  private _renderDeviceEntities(device: any): TemplateResult {
    const deviceEntities = device.entities || [];
    const configEntities = this._config.entities || [];

    if (deviceEntities.length === 0) {
      return html`
        <div class="device-entities">
          <p class="info-message">No entities found for this device.</p>
        </div>
      `;
    }

    return html`
      <div class="device-entities">
        ${deviceEntities.map((entity: any) => {
          const isSelected = configEntities.includes(entity.entity_id);
          return html`
            <div class="entity-item">
              <ha-formfield .label="${entity.attributes.friendly_name || entity.entity_id}">
                <ha-checkbox
                  .checked="${isSelected}"
                  @change="${(ev: Event) => this._entityToggled(ev, entity.entity_id)}"
                ></ha-checkbox>
              </ha-formfield>
              <span class="entity-id">${entity.entity_id}</span>
            </div>
          `;
        })}
      </div>
    `;
  }

  private _entityToggled(ev: Event, entityId: string): void {
    const target = ev.target as any;
    const checked = target.checked;

    let entities = [...(this._config.entities || [])];

    if (checked) {
      if (!entities.includes(entityId)) {
        entities.push(entityId);
      }
    } else {
      entities = entities.filter(id => id !== entityId);
    }

    const newConfig = {
      ...this._config,
      entities,
    };

    fireEvent(this, 'config-changed', { config: newConfig });
  }

  private _getAvailableDevices(): Array<{ id: string; name: string; entityCount: number; entities: any[] }> {
    if (!this.hass) {
      return [];
    }

    const deviceMap = new Map<string, { id: string; name: string; entities: any[] }>();

    // Get all security-related entities
    Object.values(this.hass.states).forEach((entity) => {
      const domain = entity.entity_id.split('.')[0];
      const isSecurityEntity =
        (['alarm_control_panel', 'binary_sensor', 'lock', 'camera', 'sensor', 'update'].includes(domain) &&
        (entity.entity_id.includes('security') ||
         entity.entity_id.includes('alarm') ||
         entity.entity_id.includes('door') ||
         entity.entity_id.includes('window') ||
         entity.entity_id.includes('motion') ||
         entity.entity_id.includes('lock') ||
         entity.entity_id.includes('tamper') ||
         entity.entity_id.includes('warning') ||
         entity.entity_id.includes('nina') ||
         entity.entity_id.includes('alert') ||
         entity.entity_id.includes('diagnostic') ||
         entity.entity_id.includes('update') ||
         entity.attributes.device_class === 'door' ||
         entity.attributes.device_class === 'window' ||
         entity.attributes.device_class === 'motion' ||
         entity.attributes.device_class === 'opening' ||
         entity.attributes.device_class === 'lock' ||
         entity.attributes.device_class === 'safety' ||
         entity.attributes.device_class === 'smoke' ||
         entity.attributes.device_class === 'gas' ||
         entity.attributes.device_class === 'tamper' ||
         entity.attributes.device_class === 'problem' ||
         entity.attributes.device_class === 'update')) ||
        domain === 'update';

      if (isSecurityEntity) {
        // Try to get device_id from various sources
        let deviceId = entity.attributes.device_id;

        // Fallback: Try to get from entity registry data if available
        if (!deviceId && (this.hass as any).devices) {
          const entityEntry = Object.values((this.hass as any).entities || {}).find(
            (e: any) => e.entity_id === entity.entity_id
          );
          if (entityEntry) {
            deviceId = (entityEntry as any).device_id;
          }
        }

        // Fallback: Group by friendly name prefix (common device naming pattern)
        if (!deviceId) {
          const friendlyName = entity.attributes.friendly_name || '';
          // Extract potential device name (e.g., "Kitchen Door" -> "Kitchen", "Front Door Sensor" -> "Front Door")
          const nameParts = friendlyName.split(' ');
          if (nameParts.length > 1) {
            // Use all but last word as device identifier
            deviceId = nameParts.slice(0, -1).join(' ').toLowerCase().replace(/\s+/g, '_');
          } else {
            // Use entity domain as grouping
            deviceId = `${domain}_devices`;
          }
        }

        if (deviceId) {
          if (!deviceMap.has(deviceId)) {
            const deviceName = this._getDeviceName(deviceId, entity);
            deviceMap.set(deviceId, {
              id: deviceId,
              name: deviceName,
              entities: [],
            });
          }
          deviceMap.get(deviceId)!.entities.push(entity);
        }
      }
    });

    return Array.from(deviceMap.values())
      .map(device => ({
        id: device.id,
        name: device.name,
        entityCount: device.entities.length,
        entities: device.entities,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  private _getDeviceName(deviceId: string, entity: any): string {
    // Try to extract device name from entity attributes
    if (entity.attributes.device_name) {
      return entity.attributes.device_name;
    }

    // If it's a domain-based grouping, provide a readable name
    if (deviceId.endsWith('_devices')) {
      const domain = deviceId.replace('_devices', '');
      const domainNames: Record<string, string> = {
        'alarm_control_panel': 'Alarm Control Panels',
        'lock': 'Locks',
        'binary_sensor': 'Binary Sensors',
        'camera': 'Cameras',
        'sensor': 'Sensors',
      };
      return domainNames[domain] || deviceId;
    }

    // Try to use friendly name prefix
    const friendlyName = entity.attributes.friendly_name || '';
    const parts = friendlyName.split(' ');
    if (parts.length > 1) {
      // Return first part(s) as device name with proper capitalization
      const deviceName = parts.slice(0, -1).join(' ');
      return deviceName.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());
    }

    // Convert device_id back to readable format
    return deviceId.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());
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

      .selection-mode-config,
      .visibility-config,
      .devices-config,
      .entities-config {
        margin-top: 24px;
        padding-top: 16px;
        border-top: 1px solid var(--divider-color);
      }

      .selection-mode-config label {
        font-weight: 500;
        font-size: 1.1em;
        display: block;
        margin-bottom: 8px;
      }

      .selection-mode-config ha-formfield {
        display: inline-block;
        margin-right: 16px;
        margin-bottom: 8px;
      }

      .visibility-config ha-formfield {
        margin-bottom: 8px;
      }

      .visibility-config h3,
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

      .description.secondary {
        margin-top: -8px;
        font-size: 0.85em;
        font-style: italic;
      }

      .divider {
        height: 1px;
        background: var(--divider-color);
        margin: 16px 0;
      }

      .info-message {
        color: var(--secondary-text-color);
        font-size: 0.9em;
        font-style: italic;
        margin: 8px 0;
      }

      .device-container {
        border-bottom: 1px solid var(--divider-color);
      }

      .device-container:last-child {
        border-bottom: none;
      }

      .device-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 0;
      }

      .device-row ha-formfield {
        margin-bottom: 0;
        flex: 1;
      }

      .device-actions {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .device-info {
        color: var(--secondary-text-color);
        font-size: 0.85em;
      }

      .device-entities {
        margin-left: 32px;
        margin-bottom: 8px;
        padding: 8px;
        background: var(--secondary-background-color);
        border-radius: 4px;
      }

      .entity-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 4px 0;
      }

      .entity-item ha-formfield {
        margin-bottom: 0;
        flex: 1;
      }

      .entity-id {
        color: var(--secondary-text-color);
        font-size: 0.75em;
        font-family: monospace;
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
