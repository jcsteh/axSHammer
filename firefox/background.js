/*
 * AxSHammer
 * Background script
 *Author: James Teh <jamie@jantrid.net>
 * Copyright 2020 James Teh
 * License: GNU General Public License version 2.0
 */

const topMenu = browser.menus.create({
  contexts: ["all"],
  title: "A&xSHammer",
});
browser.menus.create({
  parentId: topMenu,
  title: "Expose completely inaccessible elements",
  onclick: exposeCompletelyInaccessibleElements,
});
browser.menus.create({
  parentId: topMenu,
  title: "Kill all aria-&hidden",
  onclick: killAllAriaHidden,
});
browser.menus.create({
  parentId: topMenu,
  title: "Kill all ARIA &live regions",
  onclick: killAllAriaLive,
});
browser.menus.create({
  parentId: topMenu,
  title: "Kill all ARIA &applications",
  onclick: killAllAriaApplication,
});
browser.menus.create({
  parentId: topMenu,
  title: "No idea, do all the things",
  onclick: runAll,
});

function exposeCompletelyInaccessibleElements(info, tab) {
  browser.tabs.executeScript(tab.id, {
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
        el.setAttribute("data-axSHammer-exposedCompletelyInaccessibleElement",
          "true");
      }
    `,
  });
}

function killAllAriaHidden(info, tab) {
  browser.tabs.executeScript(tab.id, {
    allFrames: true,
    code: `
      for (let el of document.querySelectorAll("[aria-hidden]")) {
        el.removeAttribute("aria-hidden");
      }
    `,
  });
}

function killAllAriaLive(info, tab) {
  browser.tabs.executeScript(tab.id, {
    allFrames: true,
    code: `
      for (let el of document.querySelectorAll("[aria-live]")) {
        el.removeAttribute("aria-live");
      }
    `,
  });
}

function killAllAriaApplication(info, tab) {
  browser.tabs.executeScript(tab.id, {
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
