function t(t,e,i,s){var n,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),n=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new o(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:c,defineProperty:h,getOwnPropertyDescriptor:l,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,g=globalThis,_=g.trustedTypes,f=_?_.emptyScript:"",m=g.reactiveElementPolyfillSupport,y=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>!c(t,e),b={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:v};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let A=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&h(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:n}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);n?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),n=e.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:$).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=s;const o=n.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,n){if(void 0!==t){const o=this.constructor;if(!1===s&&(n=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??v)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==n||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[y("elementProperties")]=new Map,A[y("finalized")]=new Map,m?.({ReactiveElement:A}),(g.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w=globalThis,E=t=>t,x=w.trustedTypes,S=x?x.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,k="?"+P,O=`<${k}>`,U=document,M=()=>U.createComment(""),H=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,R="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,j=/-->/g,z=/>/g,D=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,L=/"/g,V=/^(?:script|style|textarea|title)$/i,B=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),W=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),J=new WeakMap,K=U.createTreeWalker(U,129);function Z(t,e){if(!T(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const F=(t,e)=>{const i=t.length-1,s=[];let n,o=2===e?"<svg>":3===e?"<math>":"",r=N;for(let e=0;e<i;e++){const i=t[e];let a,c,h=-1,l=0;for(;l<i.length&&(r.lastIndex=l,c=r.exec(i),null!==c);)l=r.lastIndex,r===N?"!--"===c[1]?r=j:void 0!==c[1]?r=z:void 0!==c[2]?(V.test(c[2])&&(n=RegExp("</"+c[2],"g")),r=D):void 0!==c[3]&&(r=D):r===D?">"===c[0]?(r=n??N,h=-1):void 0===c[1]?h=-2:(h=r.lastIndex-c[2].length,a=c[1],r=void 0===c[3]?D:'"'===c[3]?L:I):r===L||r===I?r=D:r===j||r===z?r=N:(r=D,n=void 0);const d=r===D&&t[e+1].startsWith("/>")?" ":"";o+=r===N?i+O:h>=0?(s.push(a),i.slice(0,h)+C+i.slice(h)+P+d):i+P+(-2===h?e:d)}return[Z(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Y{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0;const r=t.length-1,a=this.parts,[c,h]=F(t,e);if(this.el=Y.createElement(c,i),K.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=K.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(C)){const e=h[o++],i=s.getAttribute(t).split(P),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:r[2],strings:i,ctor:"."===r[1]?et:"?"===r[1]?it:"@"===r[1]?st:tt}),s.removeAttribute(t)}else t.startsWith(P)&&(a.push({type:6,index:n}),s.removeAttribute(t));if(V.test(s.tagName)){const t=s.textContent.split(P),e=t.length-1;if(e>0){s.textContent=x?x.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],M()),K.nextNode(),a.push({type:2,index:++n});s.append(t[e],M())}}}else if(8===s.nodeType)if(s.data===k)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(P,t+1));)a.push({type:7,index:n}),t+=P.length-1}n++}}static createElement(t,e){const i=U.createElement("template");return i.innerHTML=t,i}}function G(t,e,i=t,s){if(e===W)return e;let n=void 0!==s?i._$Co?.[s]:i._$Cl;const o=H(e)?void 0:e._$litDirective$;return n?.constructor!==o&&(n?._$AO?.(!1),void 0===o?n=void 0:(n=new o(t),n._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=n:i._$Cl=n),void 0!==n&&(e=G(t,n._$AS(t,e.values),n,s)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??U).importNode(e,!0);K.currentNode=s;let n=K.nextNode(),o=0,r=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new X(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new nt(n,this,t)),this._$AV.push(e),a=i[++r]}o!==a?.index&&(n=K.nextNode(),o++)}return K.currentNode=U,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=G(this,t,e),H(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>T(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&H(this._$AH)?this._$AA.nextSibling.data=t:this.T(U.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Y.createElement(Z(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Q(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=J.get(t.strings);return void 0===e&&J.set(t.strings,e=new Y(t)),e}k(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new X(this.O(M()),this.O(M()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=E(t).nextSibling;E(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=q}_$AI(t,e=this,i,s){const n=this.strings;let o=!1;if(void 0===n)t=G(this,t,e,0),o=!H(t)||t!==this._$AH&&t!==W,o&&(this._$AH=t);else{const s=t;let r,a;for(t=n[0],r=0;r<n.length-1;r++)a=G(this,s[i+r],e,r),a===W&&(a=this._$AH[r]),o||=!H(a)||a!==this._$AH[r],a===q?t=q:t!==q&&(t+=(a??"")+n[r+1]),this._$AH[r]=a}o&&!s&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class st extends tt{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=G(this,t,e,0)??q)===W)return;const i=this._$AH,s=t===q&&i!==q||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==q&&(i===q||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){G(this,t)}}const ot=w.litHtmlPolyfillSupport;ot?.(Y,X),(w.litHtmlVersions??=[]).push("3.3.2");const rt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class at extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let n=s._$litPart$;if(void 0===n){const t=i?.renderBefore??null;s._$litPart$=n=new X(e.insertBefore(M(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}at._$litElement$=!0,at.finalized=!0,rt.litElementHydrateSupport?.({LitElement:at});const ct=rt.litElementPolyfillSupport;ct?.({LitElement:at}),(rt.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ht=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},lt={attribute:!0,type:String,converter:$,reflect:!1,hasChanged:v},dt=(t=lt,e,i)=>{const{kind:s,metadata:n}=i;let o=globalThis.litPropertyMetadata.get(n);if(void 0===o&&globalThis.litPropertyMetadata.set(n,o=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const n=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,n,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const n=this[s];e.call(this,i),this.requestUpdate(s,n,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function pt(t){return(e,i)=>"object"==typeof i?dt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ut(t){return pt({...t,state:!0,attribute:!1})}let gt=class extends at{static getStubConfig(){return{type:"custom:security-overview-card",title:"Security Overview",entities:[],show_header:!0}}setConfig(t){if(!t)throw new Error("Invalid configuration");this.config={title:"Security Overview",show_header:!0,...t}}static async getConfigElement(){return await Promise.resolve().then(function(){return $t}),document.createElement("security-overview-card-editor")}render(){if(!this.config||!this.hass)return B``;const t=this.config.entities||[],e=this._getSecurityEntities(t),i=this.config.max_height?`max-height: ${this.config.max_height};`:"";return B`
      <ha-card .header="${this.config.show_header?this.config.title:void 0}">
        <div class="card-content" style="${i}">
          ${0===e.length?B`<p class="empty-state">No security entities configured</p>`:B`
                <div class="entities">
                  ${e.map(t=>this._renderEntity(t))}
                </div>
              `}
        </div>
      </ha-card>
    `}_getSecurityEntities(t){return t.length>0?t.map(t=>this.hass.states[t]).filter(t=>void 0!==t):Object.values(this.hass.states).filter(t=>{const e=t.entity_id.split(".")[0];return["alarm_control_panel","binary_sensor","lock","camera","sensor"].includes(e)&&(t.entity_id.includes("security")||t.entity_id.includes("alarm")||t.entity_id.includes("door")||t.entity_id.includes("window")||t.entity_id.includes("motion")||t.entity_id.includes("lock")||"door"===t.attributes.device_class||"window"===t.attributes.device_class||"motion"===t.attributes.device_class||"opening"===t.attributes.device_class||"lock"===t.attributes.device_class||"safety"===t.attributes.device_class||"smoke"===t.attributes.device_class||"gas"===t.attributes.device_class)})}_renderEntity(t){const e=t.state,i=t.attributes.friendly_name||t.entity_id,s=this._isEntityActive(t),n=this._getEntityIcon(t),o=s?"state-active":"state-inactive";return B`
      <div class="entity-row ${o}" @click="${()=>this._handleEntityClick(t.entity_id)}">
        <div class="entity-icon">
          <ha-icon .icon="${n}"></ha-icon>
        </div>
        <div class="entity-info">
          <div class="entity-name">${i}</div>
          <div class="entity-state">${this._formatState(t)}</div>
        </div>
        <div class="entity-status">
          <span class="status-badge ${o}">${e}</span>
        </div>
      </div>
    `}_isEntityActive(t){const e=t.state.toLowerCase(),i=t.entity_id.split(".")[0];return"alarm_control_panel"===i?["triggered","arming","pending"].includes(e):"binary_sensor"===i?"on"===e:"lock"===i?"unlocked"===e:["on","open","unlocked","detected","triggered"].includes(e)}_getEntityIcon(t){const e=t.entity_id.split(".")[0],i=t.attributes.device_class,s=t.state.toLowerCase();return t.attributes.icon?t.attributes.icon:"alarm_control_panel"===e?"triggered"===s?"mdi:bell-ring":"armed_away"===s||"armed_home"===s||"armed_night"===s?"mdi:shield-lock":"mdi:shield-home":"lock"===e?"locked"===s?"mdi:lock":"mdi:lock-open":"camera"===e?"mdi:cctv":"door"===i?"on"===s?"mdi:door-open":"mdi:door-closed":"window"===i?"on"===s?"mdi:window-open":"mdi:window-closed":"motion"===i?"on"===s?"mdi:motion-sensor":"mdi:motion-sensor-off":"smoke"===i?"mdi:smoke-detector":"gas"===i?"mdi:gas-cylinder":"mdi:shield-check"}_formatState(t){const e=t.state,i=t.attributes.unit_of_measurement;return i?`${e} ${i}`:e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}_handleEntityClick(t){const e=new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:t}});this.dispatchEvent(e)}getCardSize(){const t=this.config.entities||[],e=this._getSecurityEntities(t);return Math.max(1,Math.ceil(e.length/2))}static get styles(){return r`
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
    `}};var _t,ft;t([pt({attribute:!1})],gt.prototype,"hass",void 0),t([ut()],gt.prototype,"config",void 0),gt=t([ht("security-overview-card")],gt),window.customCards=window.customCards||[],window.customCards.push({type:"security-overview-card",name:"Security Overview Card",description:"A card to display security-related entities in Home Assistant",preview:!0}),console.info("%c SECURITY-OVERVIEW-CARD %c 1.0.0 ","color: white; background: #1976d2; font-weight: 700;","color: #1976d2; background: white; font-weight: 700;"),function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(_t||(_t={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(ft||(ft={}));var mt=function(t,e,i,s){s=s||{},i=null==i?{}:i;var n=new Event(e,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return n.detail=i,t.dispatchEvent(n),n};let yt=class extends at{setConfig(t){this._config=t}render(){return this.hass&&this._config?B`
      <div class="card-config">
        <paper-input
          label="Title"
          .value="${this._config.title||""}"
          .configValue="${"title"}"
          @value-changed="${this._valueChanged}"
        ></paper-input>
        
        <ha-formfield label="Show Header">
          <ha-switch
            .checked="${!1!==this._config.show_header}"
            .configValue="${"show_header"}"
            @change="${this._valueChanged}"
          ></ha-switch>
        </ha-formfield>

        <paper-input
          label="Max Height (e.g., 300px, 50vh)"
          .value="${this._config.max_height||""}"
          .configValue="${"max_height"}"
          @value-changed="${this._valueChanged}"
          placeholder="Leave empty for auto height"
        ></paper-input>

        <div class="entities-config">
          <h3>Entities</h3>
          <p class="description">
            Leave empty to auto-discover security entities, or add specific entities below.
          </p>
          
          ${(this._config.entities||[]).map((t,e)=>B`
              <div class="entity-row">
                <ha-entity-picker
                  .hass="${this.hass}"
                  .value="${t}"
                  .configValue="${e}"
                  @value-changed="${this._entityChanged}"
                  allow-custom-entity
                ></ha-entity-picker>
                <ha-icon-button
                  .index="${e}"
                  @click="${this._removeEntity}"
                  .label="${"Remove entity"}"
                >
                  <ha-icon icon="mdi:close"></ha-icon>
                </ha-icon-button>
              </div>
            `)}
          
          <ha-button @click="${this._addEntity}">
            <ha-icon icon="mdi:plus"></ha-icon>
            Add Entity
          </ha-button>
        </div>
      </div>
    `:B``}_valueChanged(t){if(!this._config||!this.hass)return;const e=t.target,i=e.configValue;if(!i)return;let s;if(s=void 0!==e.checked?e.checked:t.detail.value,this._config[i]===s)return;const n={...this._config,[i]:s};mt(this,"config-changed",{config:n})}_entityChanged(t){if(t.stopPropagation(),!this._config||!this.hass)return;const e=t.target.configValue,i=t.detail.value;if(null==i)return;const s=[...this._config.entities||[]];s[e]=i;const n={...this._config,entities:s};mt(this,"config-changed",{config:n})}_addEntity(){const t=[...this._config.entities||[],""],e={...this._config,entities:t};mt(this,"config-changed",{config:e})}_removeEntity(t){const e=t.currentTarget.index,i=[...this._config.entities||[]];i.splice(e,1);const s={...this._config,entities:i};mt(this,"config-changed",{config:s})}static get styles(){return r`
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
    `}};t([pt({attribute:!1})],yt.prototype,"hass",void 0),t([ut()],yt.prototype,"_config",void 0),yt=t([ht("security-overview-card-editor")],yt);var $t=Object.freeze({__proto__:null,get SecurityOverviewCardEditor(){return yt}});export{gt as SecurityOverviewCard};
//# sourceMappingURL=security-overview-card.js.map
