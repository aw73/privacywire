!function(){"use strict";String.prototype.formatUnicorn=String.prototype.formatUnicorn||function(){var e=this.toString();if(arguments.length){var t,s=typeof arguments[0],n="string"===s||"number"===s?Array.prototype.slice.call(arguments):arguments[0];for(t in n)e=e.replace(new RegExp("\\{"+t+"\\}","gi"),n[t])}return e};class PrivacyWire{constructor(e){this.name="privacywire",this.cookieGroups=Object.freeze(["necessary","functional","statistics","marketing","external_media"]),this.settings=this.sanitizeSettings(e),this.userConsent=this.sanitizeStoredConsent(),this.elements=this.initiateElements(),this.syncConsentToCheckboxes(),this.checkForValidConsent()||this.showBanner(),this.checkElementsWithRequiredConsent(),this.handleButtons()}sanitizeSettings(e){let t={};t.version=parseInt(e.version),t.dnt=Boolean(parseInt(e.dnt)),t.customFunction=`${e.customFunction}`,t.messageTimeout=parseInt(e.messageTimeout),t.consentByClass=Boolean(parseInt(e.consentByClass)),t.cookieGroups={};for(const s of this.cookieGroups)t.cookieGroups[s]=`${e.cookieGroups[s]}`;return t}sanitizeStoredConsent(){if(!window.localStorage.getItem(this.name))return this.getDefaultConsent();const e=JSON.parse(window.localStorage.getItem(this.name));if(parseInt(e.version)!==this.settings.version)return this.getDefaultConsent();let t={};t.version=parseInt(e.version),t.cookieGroups={};for(const s of this.cookieGroups)t.cookieGroups[s]=Boolean(e.cookieGroups[s]);return t}getDefaultConsent(){let e={version:0,cookieGroups:{}};for(const t of this.cookieGroups)e.cookieGroups[t]="necessary"===t;return e}initiateElements(){let e={banner:{}};e.banner.wrapper=document.getElementById("privacywire-wrapper"),e.banner.intro=e.banner.wrapper.getElementsByClassName("privacywire-banner"),e.banner.options=e.banner.wrapper.getElementsByClassName("privacywire-options"),e.banner.message=e.banner.wrapper.getElementsByClassName("privacywire-message"),e.buttons={},e.buttons.acceptAll=e.banner.wrapper.getElementsByClassName("allow-all"),e.buttons.acceptNecessary=e.banner.wrapper.getElementsByClassName("allow-necessary"),e.buttons.choose=e.banner.wrapper.getElementsByClassName("choose"),e.buttons.toggle=e.banner.wrapper.getElementsByClassName("toggle"),e.buttons.save=e.banner.wrapper.getElementsByClassName("save"),e.buttons.askForConsent=document.getElementsByClassName("privacywire-consent-button"),e.buttons.externalTrigger=document.getElementsByClassName("privacywire-show-options"),e.checkboxes={};for(const t of this.cookieGroups)"necessary"!==t&&(e.checkboxes[t]=document.getElementById(t));return e.blueprint=document.getElementById("privacywire-ask-consent-blueprint"),e.elementsWithRequiredConsent=!0===this.settings.consentByClass?document.getElementsByClassName("require-consent"):document.querySelectorAll("[data-category]"),e.consentWindows=document.getElementsByClassName("privacywire-ask-consent"),e}handleButtons(){this.handleButtonAcceptAll(),this.handleButtonAcceptNecessary(),this.handleButtonChoose(),this.handleButtonToggle(),this.handleButtonSave(),this.handleButtonAskForConsent(),this.handleButtonExternalTrigger()}handleButtonClick(e,t){e&&Array.from(e).forEach((e=>{e.addEventListener("click",t())}))}handleButtonAcceptAll(){this.elements.buttons.acceptAll&&Array.from(this.elements.buttons.acceptAll).forEach((e=>{e.addEventListener("click",(()=>{for(const e of this.cookieGroups)this.userConsent.cookieGroups[e]=!0;this.syncConsentToCheckboxes(),this.saveConsent()}))}))}handleButtonAcceptNecessary(){this.elements.buttons.acceptNecessary&&Array.from(this.elements.buttons.acceptNecessary).forEach((e=>{e.addEventListener("click",(()=>{this.userConsent=this.getDefaultConsent(),this.syncConsentToCheckboxes(),this.saveConsent()}))}))}handleButtonChoose(){this.elements.buttons.choose&&Array.from(this.elements.buttons.choose).forEach((e=>{e.addEventListener("click",(()=>{this.showOptions()}))}))}handleButtonToggle(){if(this.elements.buttons.toggle){let e=!0;Array.from(this.elements.buttons.toggle).forEach((t=>{t.addEventListener("click",(()=>{for(const t in this.elements.checkboxes)this.elements.checkboxes[t].checked=e;e=!e}))}))}}handleButtonSave(){this.elements.buttons.save&&Array.from(this.elements.buttons.save).forEach((e=>{e.addEventListener("click",(()=>{for(const e of this.cookieGroups)"necessary"!==e&&(this.userConsent.cookieGroups[e]=this.elements.checkboxes[e].checked);this.saveConsent()}))}))}handleButtonAskForConsent(){if(this.elements.buttons.askForConsent){const e=this;Array.from(this.elements.buttons.askForConsent).forEach((function(t){t.addEventListener("click",(()=>{const{dataset:s}=t;e.userConsent.cookieGroups[s.consentCategory]=!0,e.syncConsentToCheckboxes(),e.saveConsent(),t.parentElement.remove()}))}))}}handleButtonExternalTrigger(){this.elements.buttons.externalTrigger&&Array.from(this.elements.buttons.externalTrigger).forEach((e=>{e.addEventListener("click",(e=>{e.preventDefault(),this.showOptions()}))}))}syncConsentToCheckboxes(){for(const e of this.cookieGroups)"necessary"!==e&&(this.elements.checkboxes[e].checked=this.userConsent.cookieGroups[e])}checkForValidConsent(){return this.userConsent.version>0&&this.userConsent.version===this.settings.version||this.settings.dnt&&!0===this.checkForUsersDNT()}checkForUsersDNT(){return!(!this.settings.dnt||"1"!==navigator.doNotTrack)&&(this.userConsent=this.getDefaultConsent(),this.saveConsent(!0),!0)}saveConsent(e=!1){this.userConsent.version=this.settings.version,window.localStorage.removeItem(this.name),window.localStorage.setItem(this.name,JSON.stringify(this.userConsent)),this.hideBannerAndOptions(),e||this.showMessage(),this.checkElementsWithRequiredConsent(),this.triggerCustomFunction()}triggerCustomFunction(){this.settings.customFunction.length&&"function"==typeof window[this.settings.customFunction]&&window[this.settings.customFunction]()}hideBannerAndOptions(){this.elements.banner.wrapper.classList.remove("show-banner","show-options")}showBanner(){this.elements.banner.wrapper.classList.add("show-banner")}showOptions(){this.elements.banner.wrapper.classList.remove("show-banner"),this.elements.banner.wrapper.classList.add("show-options")}showMessage(){this.elements.banner.wrapper.classList.add("show-message"),setTimeout((()=>{this.elements.banner.wrapper.classList.remove("show-message")}),this.settings.messageTimeout)}checkElementsWithRequiredConsent(){if(!1===this.settings.consentByClass&&(this.elements.elementsWithRequiredConsent=document.querySelectorAll("[data-category]")),this.cleanOldConsentWindows(),this.elements.elementsWithRequiredConsent){const e=this;Array.from(this.elements.elementsWithRequiredConsent).forEach((function(t){const s=t.dataset.category;if(!s)return;let n=!1;for(const t in e.userConsent.cookieGroups)if(t===s&&!0===e.userConsent.cookieGroups[t]){n=!0;break}n?e.updateAllowedElement(t):e.updateDisallowedElement(t)}))}}cleanOldConsentWindows(){this.elements.consentWindows&&Array.from(this.elements.consentWindows).forEach((e=>{const{dataset:t}=e,s=t.disallowedConsentCategory;let n=!1;for(const e in this.userConsent.cookieGroups)if(e===s&&!0===this.userConsent.cookieGroups[e]){n=!0;break}n&&e.remove()}))}updateDisallowedElement(e){const{dataset:t}=e;if(!t.askConsent||"1"===t.askConsentRendered)return;const s=t.category,n=this.settings.cookieGroups[s];let o=document.createElement("div");o.classList.add("privacywire-ask-consent","consent-category-"+s),o.dataset.disallowedConsentCategory=s,o.innerHTML=this.elements.blueprint.innerHTML.formatUnicorn({category:n,categoryname:s}),e.insertAdjacentElement("afterend",o),e.dataset.askConsentRendered="1"}updateAllowedElement(e){"script"===e.tagName.toLowerCase()?this.updateAllowedElementScript(e):this.updateAllowedElementOther(e)}updateAllowedElementScript(e){const{dataset:t}=e;let s=document.createElement(e.tagName);for(const n of Object.keys(t))s.dataset[n]=e.dataset[n];s.type=t.type,t.src&&(s.src=t.src),s.innerText=e.innerText,s.id=e.id,s.defer=e.defer,s.async=e.async,s=this.removeUnusedAttributesFromElement(s),e.insertAdjacentElement("afterend",s),e.remove()}updateAllowedElementOther(e){const{dataset:t}=e;e.type=t.type,e.src=t.src,e.srcset=t.srcset,this.removeUnusedAttributesFromElement(e)}removeUnusedAttributesFromElement(e){return e.removeAttribute("data-ask-consent"),e.removeAttribute("data-ask-consent-rendered"),e.removeAttribute("data-category"),e.removeAttribute("data-src"),e.removeAttribute("data-srcset"),e.removeAttribute("data-type"),e.classList.remove("require-consent"),e}}document.addEventListener("DOMContentLoaded",(function(){window.PrivacyWire=new PrivacyWire(PrivacyWireSettings)}))}();