# Hammertools (AxSHammer for Chromium browsers)


To install this extension, for now:

1. Clone repo
 2. go to your Chrome addressbar, type in about:extensions
 3. Load unpacked extensions, choose this folder.
 4. Press shift 10 or applications key anywhere on a website, it should work, either hit the h key to look for Hammertools menu or use the arrows.
 5. Choose whichever option you want to do.
 
Original Readme follows.
 
Sometimes, when something's broken, you have to hammer it into shape.

- Author: James Teh &lt;jamie@jantrid.net&gt;
- Copyright: 2020 James Teh
- License: GNU General Public License version 2.0

In an ideal world, websites would all be accessible.
Sadly, the world is far from ideal.

Sometimes, you might be able to convince the owner to fix their website.
Other times, the accessibility of a particular site can be improved via scripts or assistive technology support written specifically for that site.
For example, [AxSGrease](https://github.com/jcsteh/axSGrease) provides Greasemonkey scripts to improve the accessibility of several individual sites.

But sometimes, you don't have the ability, time, money, patience or energy for either of these.
You just want some kind of access and you're willing to deal with a bit (or a lot) of ugliness to get it.

AxSHammer is a Mozilla Firefox (Now Chromium) add-on which provides a set of tools to try to help in this situation.
They might not work.
They might break things further.
Even if they do work, the access they provide is probably going to be ugly and suboptimal.
But when you're out of options, it might just be enough.
Maybe.

## Tools
The tools AxSHammer provides are accessed from the context menu of a web page, inside the AxSHammer menu.

### Expose completely inaccessible elements
Websites frequently use elements containing background images or icons.
If these aren't made accessible, they might not be visible to screen readers at all, to the point where a user might not even know they're there.
For example, [my local Pizza store](https://www.pizzacommune.com.au/) allows you to customise the ingredients on your pizza.
Each ingredient has a quantity and two icons (decrease and increase) to adjust the quantity.
The two icons don't show up with a screen reader at all.
Similarly, [some companies](https://www.appveyor.com/docs/macos-images-software/#operating-system) have tables comparing products/services and they use inaccessible icons to show whether a particular product has or doesn't have a given feature.

This tool looks for elements which contain no text.
It makes each such element into a button so you can find it.
Furthermore, it uses information from the web page code (technically, the class attribute) to deduce a label.
The label might be pretty ugly, but it might be enough to distinguish it or help you figure out what it is.

Note that this is likely to make a lot of things into buttons which aren't useful, but in some cases, the pros outweigh the cons.

### Kill all aria-hidden
aria-hidden allows authors to specify that something should be invisible for accessibility purposes.
Unfortunately, this is sometimes misused by authors, potentially hiding huge parts of a page or even the entire page!
This is particularly common after closing a dialog.
Or it could be as small (yet critical) as a checkout button which has been accidentally hidden for accessibility, as I saw on [Robins Kitchen](https://www.robinskitchen.com.au/).

This tool removes aria-hidden from everything.
If you suspect that something on a page has been hidden from your assistive technology, give this tool a try.

### Kill all ARIA live regions
ARIA live regions allow authors to specify that part of a page should be reported automatically when it is updated.
When misused, particularly by ads, this can be extremely annoying.
This tool disables all live regions on the page.

### Kill all ARIA applications
Authors can specify that an area of a page should not be treated as a document at all by marking it as an "application".
This means that screen readers won't use browse mode or equivalent by default.
This is almost always misused.

This tool removes the application role from all elements.
If your screen reader reports "application" while you're navigating and you think you're missing useful content, this tool might help.

### No idea, do all the things
If you just don't know which tool to use, you can try this, which just runs all of the above, consequences be damned.
For example, when shopping on [Robins Kitchen](https://www.robinskitchen.com.au/), I couldn't find the checkout button.
I assumed it was an inaccessible icon, so I tried "Expose completely inaccessible elements" and was sad when I still couldn't check out.
Upon investigation, I subsequently discovered that the checkout button had been aria-hidden, but I didn't even think to try that tool... because who would explicitly hide a checkout button, right?
