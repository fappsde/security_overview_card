import { LitElement, CSSResultGroup, TemplateResult } from 'lit';
import { HomeAssistant, LovelaceCardConfig, LovelaceCardEditor } from 'custom-card-helpers';
export interface SecurityOverviewCardConfig extends LovelaceCardConfig {
    type: string;
    title?: string;
    entities?: string[];
    show_header?: boolean;
    theme?: string;
}
export declare class SecurityOverviewCard extends LitElement {
    hass: HomeAssistant;
    private config;
    static getStubConfig(): SecurityOverviewCardConfig;
    setConfig(config: SecurityOverviewCardConfig): void;
    static getConfigElement(): Promise<LovelaceCardEditor>;
    protected render(): TemplateResult;
    private _getSecurityEntities;
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