/*
 * AxSHammer
 * Background script for Chrome
 *Authors: James Teh <jamie@jantrid.net>, Quin Marilyn <quin.marilyn05@gmail.com>
 * Copyright 2020-2021 James Teh, Quin Marilyn
 * License: GNU General Public License version 2.0
 */

chrome.runtime.onInstalled.addListener(function () {
  const topMenu = chrome.contextMenus.create({
    contexts: ["all"],
    title: "&Hammertools Menu",
    "id": "topMenu",
  });
  chrome.contextMenus.create({
    parentId: topMenu,
    title: "Expose completely inaccessible elements",
    "id": "expose",
    contexts: ["all"],
  });
  chrome.contextMenus.create({
    parentId: topMenu,
    title: "Kill all aria-&hidden",
    "id": "killAriaHidden",
    contexts: ["all"],
  });
  chrome.contextMenus.create({
    parentId: topMenu,
    title: "Kill all ARIA &live regions",
    "id": "killLive",
    contexts: ["all"],
  });
  chrome.contextMenus.create({
    parentId: topMenu,
    title: "Kill all ARIA &applications",
    "id": "fixApplication",
    contexts: ["all"],
  });
  chrome.contextMenus.create({
    parentId: topMenu,
    title: "No idea, do all the things",
    "id": "runAll",
    contexts: ["all"],
  });
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  let id = info.menuItemId;
  if (id == "expose") {
    exposeCompletelyInaccessibleElements(info, tab);
  }
  if (id == "killAriaHidden") {
    killAllAriaHidden(info, tab);
  }
  if (id == "killLive") {
    killAllAriaLive(info, tab)
  }
  if (id == "fixApplication") {
    killAllAriaApplication(info, tab);
  }
  if (id == "runAll") {
    runAll(info, tab);
  }
});

function exposeCompletelyInaccessibleElements(info, tab) {
  chrome.tabs.executeScript(tab.id, {
    allFrames: true,
    code: `
      for (let el of document.body.querySelectorAll(":empty:not(input):not(textarea):not([aria-label])")) {
        el.setAttribute("role", "button");
        let label = typeof el.className == "string" ? el.className : null;
        if (label) {
          // Strip out useless Font Awesome stuff:
          // fa- prefixes, but keep the rest (fa-foo becomes just foo); and
          // far and fas classes.
          label = label.replace(/\\bfa-|\\bfa[rs]?\\b/g, "");
        }
        if (label) {
          el.setAttribute("aria-label", label);
        }
        el.setAttribute("data-axSHammer-exposedCompletelyInaccessibleElement", "true");
      }
    `,
  });
}

function killAllAriaHidden(info, tab) {
  chrome.tabs.executeScript(tab.id, {
    allFrames: true,
    code: `
      for (let el of document.querySelectorAll("[aria-hidden]")) {
        el.removeAttribute("aria-hidden");
      }
    `,
  });
}

function killAllAriaLive(info, tab) {
  chrome.tabs.executeScript(tab.id, {
    allFrames: true,
    code: `
      for (let el of document.querySelectorAll("[aria-live]")) {
        el.removeAttribute("aria-live");
      }
    `,
  });
}

function killAllAriaApplication(info, tab) {
  chrome.tabs.executeScript(tab.id, {
    allFrames: true,
    code: `
      for (let el of document.querySelectorAll("[role=application]")) {
        el.removeAttribute("role");
      }
    `,
  });
}

function runAll(info, tab) {
  exposeCompletelyInaccessibleElements(info, tab);
  killAllAriaHidden(info, tab);
  killAllAriaLive(info, tab);
  killAllAriaApplication(info, tab);
}
