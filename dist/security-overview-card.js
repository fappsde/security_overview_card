function e(e,t,i,s){var o,n=arguments.length,r=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(r=(n<3?o(r):n>3?o(t,i,r):o(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;let n=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=o.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(t,e))}return e}toString(){return this.cssText}};const r=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,s)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[s+1],e[0]);return new n(i,e,s)},a=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new n("string"==typeof e?e:e+"",void 0,s))(t)})(e):e,{is:c,defineProperty:l,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:u,getPrototypeOf:p}=Object,g=globalThis,_=g.trustedTypes,f=_?_.emptyScript:"",m=g.reactiveElementPolyfillSupport,v=(e,t)=>e,y={toAttribute(e,t){switch(t){case Boolean:e=e?f:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},w=(e,t)=>!c(e,t),b={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:w};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=b){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(e,i,t);void 0!==s&&l(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){const{get:s,set:o}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:s,set(t){const n=s?.call(this);o?.call(this,t),this.requestUpdate(e,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??b}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const e=p(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const e=this.properties,t=[...h(e),...u(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,s)=>{if(i)e.adoptedStyleSheets=s.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of s){const s=document.createElement("style"),o=t.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=i.cssText,e.appendChild(s)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(t,i.type);this._$Em=e,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(e,t){const i=this.constructor,s=i._$Eh.get(e);if(void 0!==s&&this._$Em!==s){const e=i.getPropertyOptions(s),o="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:y;this._$Em=s;const n=o.fromAttribute(t,e.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(e,t,i,s=!1,o){if(void 0!==e){const n=this.constructor;if(!1===s&&(o=this[e]),i??=n.getPropertyOptions(e),!((i.hasChanged??w)(o,t)||i.useDefault&&i.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:o},n){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),!0!==o||void 0!==n)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===s&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,s=this[t];!0!==e||this._$AL.has(t)||void 0===s||this.C(t,void 0,i,s)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[v("elementProperties")]=new Map,$[v("finalized")]=new Map,m?.({ReactiveElement:$}),(g.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x=globalThis,k=e=>e,A=x.trustedTypes,E=A?A.createPolicy("lit-html",{createHTML:e=>e}):void 0,C="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,T="?"+S,O=`<${T}>`,L=document,P=()=>L.createComment(""),M=e=>null===e||"object"!=typeof e&&"function"!=typeof e,U=Array.isArray,D="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,R=/>/g,z=RegExp(`>|${D}(?:([^\\s"'>=/]+)(${D}*=${D}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,V=/"/g,I=/^(?:script|style|textarea|title)$/i,B=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),W=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),K=new WeakMap,J=L.createTreeWalker(L,129);function Z(e,t){if(!U(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(t):t}const F=(e,t)=>{const i=e.length-1,s=[];let o,n=2===t?"<svg>":3===t?"<math>":"",r=H;for(let t=0;t<i;t++){const i=e[t];let a,c,l=-1,d=0;for(;d<i.length&&(r.lastIndex=d,c=r.exec(i),null!==c);)d=r.lastIndex,r===H?"!--"===c[1]?r=N:void 0!==c[1]?r=R:void 0!==c[2]?(I.test(c[2])&&(o=RegExp("</"+c[2],"g")),r=z):void 0!==c[3]&&(r=z):r===z?">"===c[0]?(r=o??H,l=-1):void 0===c[1]?l=-2:(l=r.lastIndex-c[2].length,a=c[1],r=void 0===c[3]?z:'"'===c[3]?V:j):r===V||r===j?r=z:r===N||r===R?r=H:(r=z,o=void 0);const h=r===z&&e[t+1].startsWith("/>")?" ":"";n+=r===H?i+O:l>=0?(s.push(a),i.slice(0,l)+C+i.slice(l)+S+h):i+S+(-2===l?t:h)}return[Z(e,n+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),s]};class Y{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let o=0,n=0;const r=e.length-1,a=this.parts,[c,l]=F(e,t);if(this.el=Y.createElement(c,i),J.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(s=J.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const e of s.getAttributeNames())if(e.endsWith(C)){const t=l[n++],i=s.getAttribute(e).split(S),r=/([.?@])?(.*)/.exec(t);a.push({type:1,index:o,name:r[2],strings:i,ctor:"."===r[1]?te:"?"===r[1]?ie:"@"===r[1]?se:ee}),s.removeAttribute(e)}else e.startsWith(S)&&(a.push({type:6,index:o}),s.removeAttribute(e));if(I.test(s.tagName)){const e=s.textContent.split(S),t=e.length-1;if(t>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<t;i++)s.append(e[i],P()),J.nextNode(),a.push({type:2,index:++o});s.append(e[t],P())}}}else if(8===s.nodeType)if(s.data===T)a.push({type:2,index:o});else{let e=-1;for(;-1!==(e=s.data.indexOf(S,e+1));)a.push({type:7,index:o}),e+=S.length-1}o++}}static createElement(e,t){const i=L.createElement("template");return i.innerHTML=e,i}}function G(e,t,i=e,s){if(t===W)return t;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const n=M(t)?void 0:t._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),void 0===n?o=void 0:(o=new n(e),o._$AT(e,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(t=G(e,o._$AS(e,t.values),o,s)),t}class Q{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,s=(e?.creationScope??L).importNode(t,!0);J.currentNode=s;let o=J.nextNode(),n=0,r=0,a=i[0];for(;void 0!==a;){if(n===a.index){let t;2===a.type?t=new X(o,o.nextSibling,this,e):1===a.type?t=new a.ctor(o,a.name,a.strings,this,e):6===a.type&&(t=new oe(o,this,e)),this._$AV.push(t),a=i[++r]}n!==a?.index&&(o=J.nextNode(),n++)}return J.currentNode=L,s}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=G(this,e,t),M(e)?e===q||null==e||""===e?(this._$AH!==q&&this._$AR(),this._$AH=q):e!==this._$AH&&e!==W&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>U(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==q&&M(this._$AH)?this._$AA.nextSibling.data=e:this.T(L.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,s="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=Y.createElement(Z(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(t);else{const e=new Q(s,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=K.get(e.strings);return void 0===t&&K.set(e.strings,t=new Y(e)),t}k(e){U(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const o of e)s===t.length?t.push(i=new X(this.O(P()),this.O(P()),this,this.options)):i=t[s],i._$AI(o),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=k(e).nextSibling;k(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ee{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,o){this.type=1,this._$AH=q,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=q}_$AI(e,t=this,i,s){const o=this.strings;let n=!1;if(void 0===o)e=G(this,e,t,0),n=!M(e)||e!==this._$AH&&e!==W,n&&(this._$AH=e);else{const s=e;let r,a;for(e=o[0],r=0;r<o.length-1;r++)a=G(this,s[i+r],t,r),a===W&&(a=this._$AH[r]),n||=!M(a)||a!==this._$AH[r],a===q?e=q:e!==q&&(e+=(a??"")+o[r+1]),this._$AH[r]=a}n&&!s&&this.j(e)}j(e){e===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class te extends ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===q?void 0:e}}class ie extends ee{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==q)}}class se extends ee{constructor(e,t,i,s,o){super(e,t,i,s,o),this.type=5}_$AI(e,t=this){if((e=G(this,e,t,0)??q)===W)return;const i=this._$AH,s=e===q&&i!==q||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==q&&(i===q||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class oe{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){G(this,e)}}const ne=x.litHtmlPolyfillSupport;ne?.(Y,X),(x.litHtmlVersions??=[]).push("3.3.2");const re=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ae extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const s=i?.renderBefore??t;let o=s._$litPart$;if(void 0===o){const e=i?.renderBefore??null;s._$litPart$=o=new X(t.insertBefore(P(),e),e,void 0,i??{})}return o._$AI(e),o})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}ae._$litElement$=!0,ae.finalized=!0,re.litElementHydrateSupport?.({LitElement:ae});const ce=re.litElementPolyfillSupport;ce?.({LitElement:ae}),(re.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const le=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},de={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:w},he=(e=de,t,i)=>{const{kind:s,metadata:o}=i;let n=globalThis.litPropertyMetadata.get(o);if(void 0===n&&globalThis.litPropertyMetadata.set(o,n=new Map),"setter"===s&&((e=Object.create(e)).wrapped=!0),n.set(i.name,e),"accessor"===s){const{name:s}=i;return{set(i){const o=t.get.call(this);t.set.call(this,i),this.requestUpdate(s,o,e,!0,i)},init(t){return void 0!==t&&this.C(s,void 0,e,t),t}}}if("setter"===s){const{name:s}=i;return function(i){const o=this[s];t.call(this,i),this.requestUpdate(s,o,e,!0,i)}}throw Error("Unsupported decorator location: "+s)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ue(e){return(t,i)=>"object"==typeof i?he(e,t,i):((e,t,i)=>{const s=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),s?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function pe(e){return ue({...e,state:!0,attribute:!1})}let ge=class extends ae{constructor(){super(...arguments),this.selectedCategories=[]}static getStubConfig(){return{type:"custom:security-overview-card",title:"Security Overview",entities:[],devices:[],show_header:!0,show_compact_overview:!0,show_alarms:!0,show_locks:!0,show_doors:!0,show_windows:!0,show_motion:!0,show_cameras:!0,show_tamper:!1,show_safety:!0,show_diagnostic:!0,category_selection_mode:"single",show_hidden_when_active:!1}}setConfig(e){if(!e)throw new Error("Invalid configuration");this.config={title:"Security Overview",show_header:!0,show_compact_overview:!0,show_alarms:!0,show_locks:!0,show_doors:!0,show_windows:!0,show_motion:!0,show_cameras:!0,show_tamper:!1,show_safety:!0,show_diagnostic:!0,category_selection_mode:"single",show_hidden_when_active:!1,...e}}static async getConfigElement(){return await Promise.resolve().then(function(){return ye}),document.createElement("security-overview-card-editor")}render(){if(!this.config||!this.hass)return B``;const e=this.config.entities||[],t=this.config.devices||[];let i;i=this.selectedCategories.length>0?this._getEntitiesByCategories(e,t,this.selectedCategories):this._getSecurityEntities(e,t);const s=this._getAllSecurityEntities(e,t),o=this.config.max_height?`max-height: ${this.config.max_height};`:"",n=i.filter(e=>this._isEntityActive(e)),r=i.filter(e=>!this._isEntityActive(e));return B`
      <ha-card .header="${this.config.show_header?this.config.title:void 0}">
        <div class="card-content" style="${o}">
          ${0===i.length?B`<p class="empty-state">No security entities configured</p>`:B`
                ${!1!==this.config.show_compact_overview?this._renderCompactOverview(s):""}
                <div class="entities">
                  ${n.map(e=>this._renderEntity(e))}
                  ${n.length>0&&r.length>0?B`<div class="entities-separator"></div>`:""}
                  ${r.map(e=>this._renderEntity(e))}
                </div>
              `}
        </div>
      </ha-card>
    `}_getAllSecurityEntities(e,t){if(e.length>0)return e.map(e=>this.hass.states[e]).filter(e=>void 0!==e);let i=Object.values(this.hass.states).filter(e=>{const t=e.entity_id.split(".")[0];return["alarm_control_panel","binary_sensor","lock","camera","sensor","update"].includes(t)&&(e.entity_id.includes("security")||e.entity_id.includes("alarm")||e.entity_id.includes("door")||e.entity_id.includes("window")||e.entity_id.includes("motion")||e.entity_id.includes("lock")||e.entity_id.includes("tamper")||e.entity_id.includes("warning")||e.entity_id.includes("nina")||e.entity_id.includes("alert")||e.entity_id.includes("diagnostic")||e.entity_id.includes("update")||"door"===e.attributes.device_class||"window"===e.attributes.device_class||"motion"===e.attributes.device_class||"opening"===e.attributes.device_class||"lock"===e.attributes.device_class||"safety"===e.attributes.device_class||"smoke"===e.attributes.device_class||"gas"===e.attributes.device_class||"tamper"===e.attributes.device_class||"problem"===e.attributes.device_class||"update"===e.attributes.device_class)||"update"===t});return t.length>0&&(i=i.filter(e=>{const i=this._getEntityDeviceId(e);return i&&t.includes(i)})),i}_getSecurityEntities(e,t){let i=[];e.length>0?i=e.map(e=>this.hass.states[e]).filter(e=>void 0!==e):(i=Object.values(this.hass.states).filter(e=>{const t=e.entity_id.split(".")[0];return["alarm_control_panel","binary_sensor","lock","camera","sensor","update"].includes(t)&&(e.entity_id.includes("security")||e.entity_id.includes("alarm")||e.entity_id.includes("door")||e.entity_id.includes("window")||e.entity_id.includes("motion")||e.entity_id.includes("lock")||e.entity_id.includes("tamper")||e.entity_id.includes("warning")||e.entity_id.includes("nina")||e.entity_id.includes("alert")||e.entity_id.includes("diagnostic")||e.entity_id.includes("update")||"door"===e.attributes.device_class||"window"===e.attributes.device_class||"motion"===e.attributes.device_class||"opening"===e.attributes.device_class||"lock"===e.attributes.device_class||"safety"===e.attributes.device_class||"smoke"===e.attributes.device_class||"gas"===e.attributes.device_class||"tamper"===e.attributes.device_class||"problem"===e.attributes.device_class||"update"===e.attributes.device_class)||"update"===t}),t.length>0&&(i=i.filter(e=>{const i=this._getEntityDeviceId(e);return i&&t.includes(i)})));const s=[...i];if(i=i.filter(e=>{switch(this._getEntityType(e)){case"alarm":return!1!==this.config.show_alarms;case"lock":return!1!==this.config.show_locks;case"door":return!1!==this.config.show_doors;case"window":return!1!==this.config.show_windows;case"motion":return!1!==this.config.show_motion;case"camera":return!1!==this.config.show_cameras;case"tamper":return!0===this.config.show_tamper;case"safety":return!1!==this.config.show_safety;case"diagnostic":return!1!==this.config.show_diagnostic;default:return!0}}),!0===this.config.show_hidden_when_active){const e=new Set(i.map(e=>e.entity_id)),t=s.filter(t=>!e.has(t.entity_id)),o=t.filter(e=>this._isEntityActive(e));i=[...i,...o]}return i}_getEntityType(e){const t=e.entity_id.split(".")[0],i=e.attributes.device_class;return"tamper"===i||e.entity_id.includes("tamper")?"tamper":"update"===t||"problem"===i||"update"===i||e.entity_id.includes("diagnostic")||e.entity_id.includes("update")?"diagnostic":"safety"===i||"smoke"===i||"gas"===i||e.entity_id.includes("warning")||e.entity_id.includes("nina")||e.entity_id.includes("alert")?"safety":"alarm_control_panel"===t?"alarm":"lock"===t?"lock":"camera"===t?"camera":"door"===i||e.entity_id.includes("door")&&"binary_sensor"===t?"door":"window"===i||e.entity_id.includes("window")&&"binary_sensor"===t?"window":"motion"===i||e.entity_id.includes("motion")&&"binary_sensor"===t?"motion":"other"}_getEntityDeviceId(e){const t=e.entity_id.split(".")[0];if(e.attributes.device_id)return e.attributes.device_id;const i=(e.attributes.friendly_name||"").split(" ");return i.length>1?i.slice(0,-1).join(" ").toLowerCase().replace(/\s+/g,"_"):`${t}_devices`}_getEntitiesByCategories(e,t,i){return this._getAllSecurityEntities(e,t).filter(e=>{const t=this._getEntityType(e),s={alarms:"alarm",locks:"lock",doors:"door",windows:"window",motion:"motion",cameras:"camera",tamper:"tamper",safety:"safety",diagnostic:"diagnostic"};return i.some(e=>s[e]===t)})}_handleCategoryClick(e,t){if(!t)return;"single"===this.config.category_selection_mode?this.selectedCategories.includes(e)?this.selectedCategories=[]:this.selectedCategories=[e]:this.selectedCategories.includes(e)?this.selectedCategories=this.selectedCategories.filter(t=>t!==e):this.selectedCategories=[...this.selectedCategories,e]}_renderCompactOverview(e){const t={alarms:e.filter(e=>"alarm"===this._getEntityType(e)),locks:e.filter(e=>"lock"===this._getEntityType(e)),doors:e.filter(e=>"door"===this._getEntityType(e)),windows:e.filter(e=>"window"===this._getEntityType(e)),motion:e.filter(e=>"motion"===this._getEntityType(e)),cameras:e.filter(e=>"camera"===this._getEntityType(e)),safety:e.filter(e=>"safety"===this._getEntityType(e)),diagnostic:e.filter(e=>"diagnostic"===this._getEntityType(e)),tamper:e.filter(e=>"tamper"===this._getEntityType(e))};return B`
      <div class="compact-overview">
        ${[{key:"alarms",icon:"mdi:shield-home",label:"Alarms",activeLabel:"triggered",inactiveLabel:"disarmed"},{key:"locks",icon:"mdi:lock",label:"Locks",activeLabel:"unlocked",inactiveLabel:"locked"},{key:"doors",icon:"mdi:door-closed",label:"Doors",activeLabel:"open",inactiveLabel:"closed"},{key:"windows",icon:"mdi:window-closed",label:"Windows",activeLabel:"open",inactiveLabel:"closed"},{key:"motion",icon:"mdi:motion-sensor",label:"Motion",activeLabel:"detected",inactiveLabel:"clear"},{key:"cameras",icon:"mdi:cctv",label:"Cameras",activeLabel:"active",inactiveLabel:"active"},{key:"safety",icon:"mdi:alert",label:"Safety",activeLabel:"warning",inactiveLabel:"ok"},{key:"diagnostic",icon:"mdi:information",label:"Diagnostic",activeLabel:"issues",inactiveLabel:"ok"},{key:"tamper",icon:"mdi:shield-alert",label:"Tamper",activeLabel:"triggered",inactiveLabel:"ok"}].map(e=>{const i=t[e.key],s=i.length>0,o=i.filter(e=>this._isEntityActive(e)).length,n=i.length,r=o>0,a=this.selectedCategories.includes(e.key),c=r?`${o}/${n} ${e.activeLabel}`:`${n}/${n} ${e.inactiveLabel}`;return s?B`
            <div
              class="overview-group ${r?"has-active":""} ${a?"selected":""}"
              @click="${()=>this._handleCategoryClick(e.key,s)}"
            >
              <ha-icon .icon="${e.icon}"></ha-icon>
              <div class="overview-info">
                <div class="overview-label">${e.label}</div>
                <div class="overview-count ${r?"active":""}">
                  ${c}
                </div>
              </div>
            </div>
          `:""})}
      </div>
    `}_renderEntity(e){const t=e.attributes.friendly_name||e.entity_id,i=this._isEntityActive(e),s=this._getEntityIcon(e),o=i?"state-active":"state-inactive",n="window"===e.attributes.device_class&&e.attributes.detailed_state&&"gekippt"===e.attributes.detailed_state.toLowerCase(),r=e.attributes.angle;let a=this._formatState(e);n&&r&&(a=`${a} (${r}°)`);const c=this._formatLastActivity(e);return B`
      <div class="entity-row ${o}" @click="${()=>this._handleEntityClick(e.entity_id)}">
        <div class="entity-icon">
          <ha-icon .icon="${s}"></ha-icon>
        </div>
        <div class="entity-info">
          <div class="entity-name">${t}</div>
          <div class="entity-state">${c}</div>
        </div>
        <div class="entity-status">
          <span class="status-badge ${o}">${a}</span>
        </div>
      </div>
    `}_isEntityActive(e){const t=e.state.toLowerCase(),i=e.entity_id.split(".")[0];if("alarm_control_panel"===i)return["triggered","arming","pending"].includes(t);if("binary_sensor"===i){if(e.attributes.detailed_state){const t=e.attributes.detailed_state.toLowerCase();return"gekippt"===t||"offen"===t}return"on"===t}return"lock"===i?"unlocked"===t:["on","open","unlocked","detected","triggered"].includes(t)}_getEntityIcon(e){const t=e.entity_id.split(".")[0],i=e.attributes.device_class,s=e.state.toLowerCase();if(e.attributes.icon)return e.attributes.icon;if("alarm_control_panel"===t)return"triggered"===s?"mdi:bell-ring":"armed_away"===s||"armed_home"===s||"armed_night"===s?"mdi:shield-lock":"mdi:shield-home";if("lock"===t)return"locked"===s?"mdi:lock":"mdi:lock-open";if("camera"===t)return"mdi:cctv";if("tamper"===i||e.entity_id.includes("tamper"))return"on"===s?"mdi:shield-alert":"mdi:shield-check";if("door"===i)return"on"===s?"mdi:door-open":"mdi:door-closed";if("window"===i){if(e.attributes.detailed_state){const t=e.attributes.detailed_state.toLowerCase();return"gekippt"===t?"mdi:window-open-variant":"offen"===t?"mdi:window-open":"mdi:window-closed"}return"on"===s?"mdi:window-open":"mdi:window-closed"}return"motion"===i?"on"===s?"mdi:motion-sensor":"mdi:motion-sensor-off":"smoke"===i?"mdi:smoke-detector":"gas"===i?"mdi:gas-cylinder":"mdi:shield-check"}_formatState(e){const t=e.state,i=e.attributes.unit_of_measurement,s=e.attributes.device_class,o=e.entity_id.split(".")[0];if(i)return`${t} ${i}`;if("tamper"===s||e.entity_id.includes("tamper")){if("on"===t.toLowerCase())return"Triggered";if("off"===t.toLowerCase())return"OK"}if("window"===s||"door"===s||"opening"===s){if("window"===s&&e.attributes.detailed_state){const t=e.attributes.detailed_state.toLowerCase();return"gekippt"===t?"Tilted":"offen"===t?"Open":"Closed"}if("on"===t.toLowerCase())return"Open";if("off"===t.toLowerCase())return"Closed"}if("lock"===o){if("locked"===t.toLowerCase())return"Locked";if("unlocked"===t.toLowerCase())return"Unlocked"}if("motion"===s){if("on"===t.toLowerCase())return"Detected";if("off"===t.toLowerCase())return"Clear"}return t.replace(/_/g," ").replace(/\b\w/g,e=>e.toUpperCase())}_formatLastActivity(e){const t=this._isEntityActive(e),i=e.last_changed;if(!i)return"";const s=new Date(i),o=(new Date).getTime()-s.getTime(),n=Math.floor(o/6e4),r=Math.floor(o/36e5),a=Math.floor(o/864e5),c=e.attributes.device_class,l=e.entity_id.split(".")[0];let d=t?"Active":"Inactive";if("window"===c||"door"===c)if(e.attributes.detailed_state){const t=e.attributes.detailed_state.toLowerCase();d="gekippt"===t?"Tilted":"offen"===t?"Opened":"Closed"}else d=t?"Opened":"Closed";else"motion"===c?d=t?"Detected":"Clear":"lock"===l?d=t?"Unlocked":"Locked":"alarm_control_panel"===l&&(d=t?"Triggered":"Disarmed");if(n<1)return`${d} just now`;if(n<60)return`${d} ${n} min ago`;if(r<24)return`${d} ${r}h ago`;if(1===a)return`${d} yesterday`;if(a<7)return`${d} ${a}d ago`;return`${d} ${s.toLocaleDateString(void 0,{month:"short",day:"numeric"})}`}_handleEntityClick(e){const t=new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:e}});this.dispatchEvent(t)}getCardSize(){const e=this.config.entities||[],t=this.config.devices||[],i=this._getSecurityEntities(e,t);return Math.max(1,Math.ceil(i.length/2))}static get styles(){return r`
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

      .entities-separator {
        height: 1px;
        background: var(--divider-color);
        margin: 12px 0;
        position: relative;
      }

      .entities-separator::after {
        content: 'OK';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--card-background-color);
        padding: 0 12px;
        font-size: 0.75em;
        color: var(--secondary-text-color);
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.5px;
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

      .tilt-angle {
        font-weight: 600;
        color: var(--warning-color);
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
        cursor: pointer;
      }

      .overview-group:hover {
        background: var(--secondary-background-color);
        transform: scale(1.02);
      }

      .overview-group.has-active {
        border-left-color: var(--error-color);
      }

      .overview-group.selected {
        background: var(--primary-color);
        border-left-color: var(--primary-color);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      }

      .overview-group.selected ha-icon {
        color: white;
      }

      .overview-group.selected .overview-label {
        color: rgba(255, 255, 255, 0.9);
      }

      .overview-group.selected .overview-count {
        color: white;
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
    `}};var _e,fe;e([ue({attribute:!1})],ge.prototype,"hass",void 0),e([pe()],ge.prototype,"config",void 0),e([pe()],ge.prototype,"selectedCategories",void 0),ge=e([le("security-overview-card")],ge),window.customCards=window.customCards||[],window.customCards.push({type:"security-overview-card",name:"Security Overview Card",description:"A card to display security-related entities in Home Assistant",preview:!0}),console.info("%c SECURITY-OVERVIEW-CARD %c 1.0.0 ","color: white; background: #1976d2; font-weight: 700;","color: #1976d2; background: white; font-weight: 700;"),function(e){e.language="language",e.system="system",e.comma_decimal="comma_decimal",e.decimal_comma="decimal_comma",e.space_comma="space_comma",e.none="none"}(_e||(_e={})),function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(fe||(fe={}));var me=function(e,t,i,s){s=s||{},i=null==i?{}:i;var o=new Event(t,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return o.detail=i,e.dispatchEvent(o),o};let ve=class extends ae{constructor(){super(...arguments),this._expandedDevices=new Set}setConfig(e){this._config={entities:[],devices:[],...e}}render(){if(!this.hass||!this._config)return B``;const e=this._getAvailableDevices();return B`
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

        <ha-formfield label="Show Compact Overview">
          <ha-switch
            .checked="${!1!==this._config.show_compact_overview}"
            .configValue="${"show_compact_overview"}"
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
              .checked="${"multiple"!==this._config.category_selection_mode}"
              @change="${this._selectionModeChanged}"
            ></ha-radio>
          </ha-formfield>
          <ha-formfield label="Multiple Selection">
            <ha-radio
              name="category_selection_mode"
              value="multiple"
              .checked="${"multiple"===this._config.category_selection_mode}"
              @change="${this._selectionModeChanged}"
            ></ha-radio>
          </ha-formfield>
        </div>

        <paper-input
          label="Max Height (e.g., 300px, 50vh)"
          .value="${this._config.max_height||""}"
          .configValue="${"max_height"}"
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
              .checked="${!1!==this._config.show_alarms}"
              .configValue="${"show_alarms"}"
              @change="${this._valueChanged}"
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Show Locks">
            <ha-switch
              .checked="${!1!==this._config.show_locks}"
              .configValue="${"show_locks"}"
              @change="${this._valueChanged}"
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Show Doors">
            <ha-switch
              .checked="${!1!==this._config.show_doors}"
              .configValue="${"show_doors"}"
              @change="${this._valueChanged}"
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Show Windows">
            <ha-switch
              .checked="${!1!==this._config.show_windows}"
              .configValue="${"show_windows"}"
              @change="${this._valueChanged}"
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Show Motion Sensors">
            <ha-switch
              .checked="${!1!==this._config.show_motion}"
              .configValue="${"show_motion"}"
              @change="${this._valueChanged}"
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Show Cameras">
            <ha-switch
              .checked="${!1!==this._config.show_cameras}"
              .configValue="${"show_cameras"}"
              @change="${this._valueChanged}"
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Show Safety Alarms">
            <ha-switch
              .checked="${!1!==this._config.show_safety}"
              .configValue="${"show_safety"}"
              @change="${this._valueChanged}"
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Show Diagnostic">
            <ha-switch
              .checked="${!1!==this._config.show_diagnostic}"
              .configValue="${"show_diagnostic"}"
              @change="${this._valueChanged}"
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Show Tamper Sensors">
            <ha-switch
              .checked="${!0===this._config.show_tamper}"
              .configValue="${"show_tamper"}"
              @change="${this._valueChanged}"
            ></ha-switch>
          </ha-formfield>

          <div class="divider"></div>

          <ha-formfield label="Show Hidden Entities When Active">
            <ha-switch
              .checked="${!0===this._config.show_hidden_when_active}"
              .configValue="${"show_hidden_when_active"}"
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

          ${e.length>0?B`
            ${e.map(e=>{const t=e.entities||[],i=this._config.entities||[],s=t.filter(e=>i.includes(e.entity_id)).length,o=s===t.length&&t.length>0,n=s>0&&s<t.length,r=this._isDeviceExpanded(e.id);return B`
                <div class="device-container">
                  <div class="device-row">
                    <ha-formfield .label="${e.name||e.id}">
                      <ha-checkbox
                        .checked="${o}"
                        .indeterminate="${n}"
                        @change="${t=>this._deviceToggled(t,e)}"
                      ></ha-checkbox>
                    </ha-formfield>
                    <div class="device-actions">
                      <span class="device-info">${e.entityCount} entities</span>
                      <ha-icon-button
                        @click="${()=>this._toggleDeviceExpand(e.id)}"
                        .label="${r?"Collapse":"Expand"}"
                      >
                        <ha-icon .icon="${r?"mdi:chevron-up":"mdi:chevron-down"}"></ha-icon>
                      </ha-icon-button>
                    </div>
                  </div>
                  ${r?this._renderDeviceEntities(e):""}
                </div>
              `})}
          `:B`
            <p class="info-message">No security entities found in your Home Assistant instance. The card will auto-discover alarm panels, locks, doors, windows, motion sensors, and cameras when available.</p>
          `}
        </div>

        <div class="entities-config">
          <h3>Manual Entity Selection</h3>
          <p class="description">
            Manually add specific entities. This will override device selection and auto-discovery.
          </p>

          ${(this._config.entities||[]).map((e,t)=>B`
              <div class="entity-row">
                <ha-entity-picker
                  .hass="${this.hass}"
                  .value="${e}"
                  .configValue="${t}"
                  @value-changed="${this._entityChanged}"
                  allow-custom-entity
                ></ha-entity-picker>
                <ha-icon-button
                  .index="${t}"
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
    `}_valueChanged(e){if(!this._config||!this.hass)return;const t=e.target,i=t.configValue;if(!i)return;let s;if(s=void 0!==t.checked?t.checked:e.detail.value,this._config[i]===s)return;const o={...this._config,[i]:s};me(this,"config-changed",{config:o})}_selectionModeChanged(e){if(!this._config||!this.hass)return;const t=e.target.value;if(this._config.category_selection_mode===t)return;const i={...this._config,category_selection_mode:t};me(this,"config-changed",{config:i})}_entityChanged(e){if(e.stopPropagation(),!this._config||!this.hass)return;const t=e.target.configValue,i=e.detail.value;if(null==i)return;const s=[...this._config.entities||[]];s[t]=i;const o={...this._config,entities:s};me(this,"config-changed",{config:o})}_addEntity(){const e=[...this._config.entities||[],""],t={...this._config,entities:e};me(this,"config-changed",{config:t})}_removeEntity(e){const t=e.currentTarget.index,i=[...this._config.entities||[]];i.splice(t,1);const s={...this._config,entities:i};me(this,"config-changed",{config:s})}_deviceToggled(e,t){const i=e.target.checked;let s=[...this._config.entities||[]];const o=(t.entities||[]).map(e=>e.entity_id);i?o.forEach(e=>{s.includes(e)||s.push(e)}):s=s.filter(e=>!o.includes(e));const n={...this._config,entities:s};me(this,"config-changed",{config:n})}_isDeviceExpanded(e){return this._expandedDevices.has(e)}_toggleDeviceExpand(e){this._expandedDevices.has(e)?this._expandedDevices.delete(e):this._expandedDevices.add(e),this.requestUpdate()}_renderDeviceEntities(e){const t=e.entities||[],i=this._config.entities||[];return 0===t.length?B`
        <div class="device-entities">
          <p class="info-message">No entities found for this device.</p>
        </div>
      `:B`
      <div class="device-entities">
        ${t.map(e=>{const t=i.includes(e.entity_id);return B`
            <div class="entity-item">
              <ha-formfield .label="${e.attributes.friendly_name||e.entity_id}">
                <ha-checkbox
                  .checked="${t}"
                  @change="${t=>this._entityToggled(t,e.entity_id)}"
                ></ha-checkbox>
              </ha-formfield>
              <span class="entity-id">${e.entity_id}</span>
            </div>
          `})}
      </div>
    `}_entityToggled(e,t){const i=e.target.checked;let s=[...this._config.entities||[]];i?s.includes(t)||s.push(t):s=s.filter(e=>e!==t);const o={...this._config,entities:s};me(this,"config-changed",{config:o})}_getAvailableDevices(){if(!this.hass)return[];const e=new Map;return Object.values(this.hass.states).forEach(t=>{const i=t.entity_id.split(".")[0];if(["alarm_control_panel","binary_sensor","lock","camera","sensor","update"].includes(i)&&(t.entity_id.includes("security")||t.entity_id.includes("alarm")||t.entity_id.includes("door")||t.entity_id.includes("window")||t.entity_id.includes("motion")||t.entity_id.includes("lock")||t.entity_id.includes("tamper")||t.entity_id.includes("warning")||t.entity_id.includes("nina")||t.entity_id.includes("alert")||t.entity_id.includes("diagnostic")||t.entity_id.includes("update")||"door"===t.attributes.device_class||"window"===t.attributes.device_class||"motion"===t.attributes.device_class||"opening"===t.attributes.device_class||"lock"===t.attributes.device_class||"safety"===t.attributes.device_class||"smoke"===t.attributes.device_class||"gas"===t.attributes.device_class||"tamper"===t.attributes.device_class||"problem"===t.attributes.device_class||"update"===t.attributes.device_class)||"update"===i){let s=t.attributes.device_id;if(!s&&this.hass.devices){const e=Object.values(this.hass.entities||{}).find(e=>e.entity_id===t.entity_id);e&&(s=e.device_id)}if(!s){const e=(t.attributes.friendly_name||"").split(" ");s=e.length>1?e.slice(0,-1).join(" ").toLowerCase().replace(/\s+/g,"_"):`${i}_devices`}if(s){if(!e.has(s)){const i=this._getDeviceName(s,t);e.set(s,{id:s,name:i,entities:[]})}e.get(s).entities.push(t)}}}),Array.from(e.values()).map(e=>({id:e.id,name:e.name,entityCount:e.entities.length,entities:e.entities})).sort((e,t)=>e.name.localeCompare(t.name))}_getDeviceName(e,t){if(t.attributes.device_name)return t.attributes.device_name;if(e.endsWith("_devices")){return{alarm_control_panel:"Alarm Control Panels",lock:"Locks",binary_sensor:"Binary Sensors",camera:"Cameras",sensor:"Sensors"}[e.replace("_devices","")]||e}const i=(t.attributes.friendly_name||"").split(" ");if(i.length>1){return i.slice(0,-1).join(" ").replace(/_/g," ").replace(/\b\w/g,e=>e.toUpperCase())}return e.replace(/_/g," ").replace(/\b\w/g,e=>e.toUpperCase())}static get styles(){return r`
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
    `}};e([ue({attribute:!1})],ve.prototype,"hass",void 0),e([pe()],ve.prototype,"_config",void 0),e([pe()],ve.prototype,"_expandedDevices",void 0),ve=e([le("security-overview-card-editor")],ve);var ye=Object.freeze({__proto__:null,get SecurityOverviewCardEditor(){return ve}});export{ge as SecurityOverviewCard};
//# sourceMappingURL=security-overview-card.js.map
