import { LitElement, CSSResultGroup, TemplateResult } from 'lit';
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
export declare class SecurityOverviewCard extends LitElement {
    hass: HomeAssistant;
    private config;
    static getStubConfig(): SecurityOverviewCardConfig;
    setConfig(config: SecurityOverviewCardConfig): void;
    static getConfigElement(): Promise<LovelaceCardEditor>;
    protected render(): TemplateResult;
    private _getSecurityEntities;
    private _getEntityType;
    private _getEntityDeviceId;
    private _renderCompactOverview;
    private _renderEntity;
    private _isEntityActive;
    private _getEntityIcon;
    private _formatState;
    private _handleEntityClick;
    getCardSize(): number;
    static get styles(): CSSResultGroup;
}
declare global {
    interface HTMLElementTagNameMap {
        'security-overview-card': SecurityOverviewCard;
    }
}
//# sourceMappingURL=security-overview-card.d.ts.map