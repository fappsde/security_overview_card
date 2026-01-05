import { LitElement, CSSResultGroup, TemplateResult } from 'lit';
import { HomeAssistant, LovelaceCardEditor } from 'custom-card-helpers';
import { SecurityOverviewCardConfig } from './security-overview-card';
export declare class SecurityOverviewCardEditor extends LitElement implements LovelaceCardEditor {
    hass: HomeAssistant;
    private _config;
    setConfig(config: SecurityOverviewCardConfig): void;
    protected render(): TemplateResult;
    private _valueChanged;
    private _entityChanged;
    private _addEntity;
    private _removeEntity;
    static get styles(): CSSResultGroup;
}
declare global {
    interface HTMLElementTagNameMap {
        'security-overview-card-editor': SecurityOverviewCardEditor;
    }
}
//# sourceMappingURL=security-overview-card-editor.d.ts.map