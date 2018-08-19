// ==UserScript==
// @name                 Autoplay button
// @version              beta 0.1
// @description        Left-click toggles  autoplay.
// @author               Dewman - inspired by the ORIGINAL CODE of Cookies Button by https://www.reddit.com/user/Luke-Baker/
// @compatibility        Created 2018-05-03. Tested on Firefox 59.
// ==/UserScript==

(function() {
    if (location != 'chrome://browser/content/browser.xul') 
    return;

  // fetch the autoplay preference      
  var prefs = Cc["@mozilla.org/preferences-service;1"]
            .getService(Ci.nsIPrefBranch);
  function autoplayStatus() {
    var apvalue = prefs.getBoolPref('media.autoplay.enabled');
    return apvalue; // true =enable, false = disabled
  }

  // Define label, tooltip, and image for the button
  var labl = (autoplayStatus() !== true) ? "Autoplay Enabled" : "Autoplay Disabled";
  var ttip = (autoplayStatus() !== true) ? "Autoplay Enabled" : "Autoplay Disabled";
  // Image source: https://www.svgrepo.com/svg/47801/hmmmm
  const autoplaysvg = "list-style-image: url('data:image/svg+xml;base64,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')";
  // Create the button
    try {
        CustomizableUI.createWidget({
            id: 'autoplay-toggle-button',
            type: 'custom',
            defaultArea: CustomizableUI.AREA_NAVBAR,
            onBuild: function(aDocument) {          
                var toolbaritem = aDocument.createElementNS('http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul', 'toolbarbutton');
          toolbaritem.onclick = event => onClick(event);
                var props = {
                    id: 'autoplay-toggle-button',
                    class: 'toolbarbutton-1 chromeclass-toolbar-additional',
          // Label, tooltip, and image at startup
                    label: labl,
                    tooltiptext: ttip,
                    style: autoplaysvg
        };      
                for(var p in props)
                    toolbaritem.setAttribute(p, props[p]);
        // Image filter at startup
        toolbaritem.style.filter = (autoplayStatus() !== true ? "grayscale(100%)" : "grayscale(50%)");
                return toolbaritem;
            }
        });
    } catch(e) {};      

  // What happens when you click the button
  function onClick(event) {

    var apbutt = document.getElementById("autoplay-toggle-button");
    // Left-click: toggle autoplay
    if (event.button == true) {
      // Toggle between  autoplay on off
      prefs.setBoolPref('media.autoplay.enabled', (autoplayStatus() !== true) ? true : false);
      // Update button label, tooltip, and image filter
      apbutt.setAttribute('label', (autoplayStatus() !== true) ? "Autoplay Enabled" : "Autoplay Disabled");
      apbutt.setAttribute('tooltiptext', (autoplayStatus() !== true) ? "Autoplay Enabled" : "Autoplay Disabled");
      apbutt.style.filter = (autoplayStatus() !== true ? "grayscale(100%)" : "grayscale(50%)");
    }
    // Middle-click: open hmmmm window
    else if (event.button == false) {
      // toggle autoplay on off
      prefs.setBoolPref('media.autoplay.enabled', (autoplayStatus() !== false) ? false : true);
      // Update button label, tooltip, and image filter
      apbutt.setAttribute('label', (autoplayStatus() !== false) ? "Autoplay Disabled" : "Autoplay Enabled");
      apbutt.setAttribute('tooltiptext', (autoplayStatus() !== false) ? "Autoplay Disabled" : "Autoplay Enabled");
      apbutt.style.filter = (autoplayStatus() !== false ? "grayscale(50%)" : "grayscale(100%)");
    }
    // any other button: default action
    else return;

  }

})();
