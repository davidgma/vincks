
### Introduction

I prefer working in the terminal for some things, such as when I only need to work with or view text, and also when I'm on a low-powered machine such as an Android tablet (using termux) or somewhere with a slow internet connection. 

For example, if I'm out and about and have my Android tablet, keyboard and an internet connection, even a slow one, I can ssh into my computer at home using termux, work in a terminal and get reasonable response times.

For programming, I can use [tmux](https://tmux.github.io/)/[ranger](https://github.com/ranger/ranger)/[neovim](https://neovim.io/) and that works really well. 

But there aren't any terminal-based browsers that work very well. There's Lynx, Links etc, but they don't support Javascript. And there's [Browsh](https://www.brow.sh/) but it isn't text-only; it tries to display graphics. Ideally I'd like something that looks like Lynx but runs Javascript. Oh, and has vim-like keyboard shortcuts.

The solution is to have a terminal program that uses a headless modern browser running in the background but displays text to the terminal. This is how Browsh works. The differences to Browsh are:

1. There's no attempt to show graphics. It's strictly text only. If I want to view graphics I can use a normal browser.
2. It uses headless Chromium instead of headless Firefox.
3. It is written in Typescript rather than Go.
4. It uses vim-like keyboard shortcuts.

Architecturally it uses:

- [Node](https://nodejs.org/)
- [Typescript](https://www.typescriptlang.org/) 
- [puppeteer](https://www.npmjs.com/package/puppeteer)
- [terminal-kit](https://www.npmjs.com/package/terminal-kit)


