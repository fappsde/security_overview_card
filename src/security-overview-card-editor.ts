import { LitElement, html, css, CSSResultGroup, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, LovelaceCardEditor, fireEvent } from 'custom-card-helpers';
import { SecurityOverviewCardConfig } from './security-overview-card';

@customElement('security-overview-card-editor')
export class SecurityOverviewCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: SecurityOverviewCardConfig;

  public setConfig(config: SecurityOverviewCardConfig): void {
    this._config = config;
  }

  protected render(): TemplateResult {
    if (!this.hass || !this._config) {
      return html``;
    }

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

        <div class="entities-config">
          <h3>Entities</h3>
          <p class="description">
            Leave empty to auto-discover security entities, or add specific entities below.
          </p>
          
          ${(this._config.entities || []).map(
            (entity, index) => html`
              <div class="entity-row">
                <ha-entity-picker
                  .hass="${this.hass}"
                  .value="${entity}"
                  .index="${index}"
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
    const index = target.index;
    const value = ev.detail.value;

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

      .entities-config {
        margin-top: 24px;
      }

      .entities-config h3 {
        margin-top: 0;
        margin-bottom: 8px;
      }

      .description {
        color: var(--secondary-text-color);
        font-size: 0.9em;
        margin-bottom: 16px;
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
