# Browser Library

You can generate a browser library:

- [x] Select `Do you need to compile ES2015 code?`
- [x] Select `Is it a browser library`

Then you will get 5 addtional npm scripts:

- `npm run example`: Run `example/index.js` with [Poi](https://github.com/egoist/poi)
- `npm run build:example`: Build `example/index.js` to `example/dist` folder with Poi.
- `npm run gh`: Push `example/dist` folder to github pages.
- `npm run deploy`: Basically `npm run build:example && npm run gh`

By default `example/index.js` does nothing, it simply imports `src/index.js` and logs it out.