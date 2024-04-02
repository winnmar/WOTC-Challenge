# WOTC Challenge

This is a WOTC coding challenge for the D&D Beyond team. The goal was to provide a mocked Talent Points management system using provided screenshot of a design.

It was done using Vue 3 with TypeScript, Vite and Pinia for state management. The styling was done using SCSS.

I added the following improvements:

- Animation for the progress bar in a talent tree.
- On hover effects.
- The talent point counter on larger screen sizes is set to be in the middle next to the skill tree. On the design it was not clear what the placement should be so I decided to style it that way.
- Blocking the talent point tree if all points are spent. More visual that remaning talents are not able to be picked.
- Talent points counter changes color when all points are spent.
- Added the behaviour of smaller screen sizes. Now they are placed side by side based on available width and the container will allow items to go to the next line if no more space is available.
- Made the talent point counter sticky while scrolling on smaller screen sizes to enable the user to always see how much points are spent.

To run the project please follow the instructions and go to the local host address provided in the console.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
