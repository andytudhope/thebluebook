---
id: fugue-i
title: Fugue I
---

>“Regis Iussu Cantio Et Reliqua Canonica Arte Refolula”

## RTFM

Why?

Well, there are many rabbit holes to fall up, Alice. If you really pay attention, you can watch this one site [grow into many others](http://ada.evergreen.edu/~arunc/brun/paradigms.html), follow its traces all across the great digital face in which we all partake.

One trace I want to follow explicitly is hidden deep in the tangled bank: that of _social computation_. If you look hard enough, you'll find a link to someone called [Johann van Benthem](https://www.illc.uva.nl/Research/Publications/Reports/PP-2013-03.text.pdf), who wrote a paper between Amsterdam and Stanford. He says this:

> “Finally, let us return to Turing’s original contribution. The Universal Machine was, and remains, a crucial device for making our thinking about computation sharp, and allowing, for the first time in history, precise mathematical results on the power and limitations of what is computable. But there is a further question. Can there be a similar universal format for the behavior produced by social computation in the sense of this paper? We still lack a ‘new Turing’, but my guess is that the answer will come in the form of an abstract conceptual analysis of what it really means to be a game – beyond the details of current game theory.”

## Social computation

Honestly, the rest of the paper is a little technical for me, but that one question stuck with me: 

`Can there be a similar universal format for the behavior produced by social computation?`

Johann actually focusses on games more than literature which, though appropriate for our times, is not in line with my own interests. Either way, I think that books are the original MMORPG games, and have been being played since at least the invention of the [playdough protocols](https://nakamotoinstitute.org/the-playdough-protocols/).

Moreover, revolutions in publishing and disseminating text have also resulted in revolutions of wider social consciousness, which means books are also - in a very literal way - the original forms of social computation that memes have been using to build the [Seventh Kingdom](https://www.youtube.com/watch?v=TfkRZWFHpss "See also https://techgnosis.com/shots-of-awe-interview/").

>"Books are our cultural record" — [Aaron Swartz](https://www.youtube.com/watch?v=yToh1PoYb6k&t=80 "Your theme song, wali")

So, what if we could make it easier for people to publish digitally-native books, made by and born on the internet, as a means of spreading patterns of knowledge that can be used to tweak the automated algorithms we're building so that they can help bring us together and show us what really connects?

What if the pattern of mind books have always carried, that particular piece of captured soul that can travel across time, could be literalised and fed to the machines we are building to augment our memories and imagine delightfully different ways of being?

What if everyone could easily build something about what they love? What happens if we open source the language(s) they used to create it? 

**It's a critical point**: I'm not suggesting that this particular book is anything like the works it references and tries to imitate, what I am actually interested in is the experiment itself, and the theological question it raises, 

`What could we do with the results?`

## Where would you start? ... [start, start](https://www.youtube.com/watch?v=E-QGkYNc0Ls)

At first, I thought Gitbook might be the way to go. But, they've moved away from their old static site generator to a rich JSON format that is propietary and cannot be hosted anywhere but their servers, which is not cool. I don't want to have to "sign in" to my own book, I don't want to have to pay a fee to collaborate with more than two other people, and I want a site that I can transport easily, and host anywhere at the click of a few buttons. I am a [part-time mathemetician](https://observablehq.com/@andytudhope/embedded-discover) after all, and the domain you choose really matters.

So, I downloaded the legacy editor and `gitbook-cli` and, while these are great tools, there was a glaring problem. The legacy software doesn't let you nest your sidebar content and structure the links properly - and that really matters.

## Sidebar

Strange, isn't it, how the significance of words is constantly slipping?

[Author exits, stage left](http://www.tbook.constantvzw.org/wp-content/death_authorbarthes.pdf "Roland Barthes")

## No, really, it's all about the sidebar!

A key feature of a digital book must be that it's easy to _navigate_, no matter what device you're using. Which means that you need to have a clear and navigable structure that works for anyone, no matter the screen they use to read your book. And that means you need to have the ability to nest sections within chapters, and control the way links are created so that it all makes at least some common sense irrespective of the perspective it's seen through. To get to some poem in Canto XIII, you need simply [look](https://github.com/andytudhope/thebluebook/tree/book/source/fugue-i/index.md#L54) at the [url](../canto-xiii/exposure.html), and the nested sidebar works on both desktop and mobile screens with some nifty javascript and cascading style sheets. 

Such a structure also means people can share specific bits of your book easily with others. I cannot link you directly to a section of Ulysses that I thought particularly mind-bending, but someone can point to [the source of this very sentence](https://github.com/andytudhope/thebluebook/tree/book/source/fugue-i/index.md#L56) and share that with their friends, if they so choose.

## The long and the short of it

I built my own framework by adapting one I helped build for a community called [Status](https://status.im). It's not perfect, but it provides me with all the above, and it's fairly easy to use. Here's how you can get started today.

**Dependencies**

1. Try get a Linux machine. I haven't tested this anywhere else. Mac should work fine, but Windows might be a problem ([OS](https://www.youtube.com/watch?v=4vW62KqKJ5A "Revolution!") with [training wheels](https://github.com/andytudhope/APerspectiveonTechnologyA) that it is).
2. Download a good "code" editor. I use - wtih [tongue in cheek](https://www.reddit.com/r/QuotesPorn/comments/3i7e2v/do_i_contradict_myself_walt_whitman_1680x1050_oc/) after the OS video link - [VSCode](https://code.visualstudio.com/download); but Atom, Sublime, or even NoteBook++ will do, depending on if you already have a preference.
3. Once that is set up, install [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) and sign up on [GitHub](https://github.com) if you don't already have an account there.
4. Then install Node and NPM (the Node Package Manager). The easiest way to do this, imo, is through [nvm](https://github.com/nvm-sh/nvm).

**Get going**

1. Make a new directory, using the name for your book. Open a terminal - `ctrl + alt + t` on [Ubuntu](https://www.ubuntu.com/download/desktop) - and run:

```bash
mkdir my-book-name
```

2. Clone the template repository and switch into the directory once created. In your same terminal, run:

```bash
git clone https://github.com/andytudhope/proofoflove.git my-book-name && cd my-book-name/
```

3. Install the required packages to build and run the site. Make sure you are in the root directory of the project and, in your terminal, run:

````bash
npm i
````

4. Build and start the site to see what you're dealing with. This is a three step process:
    1. from the same place, run 
    ```bash
    ./node_modules/.bin/gulp build
    ```
    2. _Open a new terminal while gulp watches for file changes and live reloads for you_
    3. Now run 
    ```bash
    cd my-book-name/ # Just to make sure your new session is in the correct place
    ./node_modules/.bin/hexo serve
    ```

With just four global dependencies, and four quick steps, we have a template for an online book! While I appreciate that this process is nowhere near as smooth as a professional platform like Gitbook, I still think that's pretty cool.

## How to edit stuff - a 12 step program

Now that you have the site up and running, you'll need to know where to go to change, add, and edit things.

1. If you installed VSCode, then, from the project root in your terminal, simply run:

```bash
code .
```

This will open the code editor with your project loaded into it's sidebar and allow you to see it visually, rather than just in a terminal.

2. Go to the `source` [folder](https://github.com/andytudhope/proofoflove/tree/master/source/) - this is where you will put all of your chapters, sections and content. You can create as many chapters (folders) as you like, and put as many files beneath each chapter as you like, each of which will appear in it's own place on the sidebar.

3. The sidebar will expand for the content beneath each specific chapter. So, if you go to [Canto I](../canto-i/), for instance, you'll see that only the files beneath the `canto-i` [folder](https://github.com/andytudhope/thebluebook/tree/book/source/canto-i/) appear, and the rest of the Cantos are flattened. This is for easier navigation, and becomes even more important on mobile.

4. To control sidebar content, you need to adjust 2 files: 
    1. `source/_data/sidebar.yml`, which is where you control what each link resolves to, and 
    2. `themes/navy/languages/en.yml`, which is where you control the text that is shown to the reader. 
    Follow the patterns set up in those 2 files already and you should be fine.
    3. Happily, the whole process can be condensed into a [single link](https://github.com/andytudhope/proofoflove/commit/dad3ad50e3b7ce5bcc5e7aef6e06b732836b3288) that will show you exactly what files to change to add a new page to a specific chapter.

5. One note about that `languages` folder - it can be used to handle translations quite elegantly, check out the [Hexo](https://hexo.io/docs/internationalization) docs for more on that.

6. Speaking of Hexo, the framework beneath this site, you'll need to edit the information in the `_config.yml` file in the root of the project to reflect your own book. A guide to doing this can be found [here](https://hexo.io/docs/configuration), but I suggest you stick as closely to the pattern already in that file as possible to avoid weird errors which I won't be able to help you fix. 

7. Oh, there are also [some great plugins and tricks](https://hexo.io/docs/tag-plugins) that come with Hexo by default to help you enrich your MD files with everything from quotes to images, videos and more.

8. If you want to add images, do it in `themes/navy/source/img` - the gulp build pipeline will put them in the right place so that you can simply link to them like [this](https://github.com/andytudhope/thebluebook/tree/book/source/fugue-i/index.md#L130):

![Lion](../img/lion.png)

9. If you want to change the page layout, or the home page, or the header and footer and other common elements, then you'll need to adventure into the `themes/navy/layout` folder, where you will find the few extend-with-javascript `.ejs` files used to stitch it all together. Don't stress! This is just plain old HTML with a few fancy tags added to it to make fun things happen. If, for instance, you want to change the title of one of the header items, all you need to do is go to this line in [themes/navy/layout/partial/header.ejs](https://github.com/andytudhope/proofoflove/tree/master/themes/navy/layout/partial/header.ejs#L27) and edit the text there. You can just leave the rest of it as is, or explore the patterns to build your own, unique navigation elements.

10. If you want to change the styles, then you'll need to edit the CSS in [themes/navy/source/scss/main.scss](https://github.com/andytudhope/proofoflove/blob/master/themes/navy/source/scss/main.scss#L1953). I have tried to keep it as clean as possible, and suggest using the marked section at the bottom to insert your own styles so that you don't inadvertently break anything (or, more accurately, can find the problem easily when you do). We can get even more meta than linking to specific lines of code, though - I can show you how to edit CSS through [the commit trail](https://github.com/andytudhope/proofoflove/commits/master). **:mind_blown:**

11. The same goes for editing the JS in [themes/navy/source/js/dev.js](https://github.com/andytudhope/proofoflove/blob/master/themes/navy/source/js/dev.js). Note that work should happen in the `dev.js` file, as that is how [build pipline](https://github.com/andytudhope/proofoflove/tree/master/gulpfile.js#L42) is set up. I think it's awesome if you can write custom JS, and it would be great to see developer-writers take this much further than I currently have.

12. When you're ready, you'll need to create your own respository. Do this through Github in your browser, then return to the root of your project, and run the following commands:

```bash
cd my-book-name/
git remote remove origin
git remote add origin https://github.com/<your_username>/<your_repo_name>.git
git add .
git commit -m "Initial setup done"
git push -u origin master
```

## Traced Out

“The [literature of illumination](https://www.ted.com/talks/katie_bouman_what_does_a_black_hole_look_like "Katie Bouman") reveals this above all: although it comes to those who wait for it, it is always, even to the most practiced and adept, a gift and a total surprise… I cannot cause light; the most I can do is try to put myself in the path of its beam. It is possible, in deep space, to sail on solar wind. Light, be it particle or wave, has force: you rig a giant sail and go. The secret of seeing is to sail on solar wind. Hone and spread your spirit till you yourself are a sail, whetted, translucent, broadside to the merest puff.” — Annie Dillard