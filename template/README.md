<% const camelcasedName = this.camelcase(name) -%>
<% const normalUserName = username.toLowerCase() -%>
# <%= name %>

[![NPM version](https://img.shields.io/npm/v/<%= name %>.svg?style=flat)](https://npmjs.com/package/<%= name %>) [![NPM downloads](https://img.shields.io/npm/dm/<%= name %>.svg?style=flat)](https://npmjs.com/package/<%= name %>) [![CircleCI](https://circleci.com/gh/<%= normalUserName %>/<%= name %>/tree/master.svg?style=shield)](https://circleci.com/gh/<%= normalUserName %>/<%= name %>/tree/master) <% if (coverage) { %> [![codecov](https://codecov.io/gh/<%= normalUserName %>/<%= name %>/branch/master/graph/badge.svg)](https://codecov.io/gh/<%= username %>/<%= name %>)
<% } %> [![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat)](https://github.com/<%= normalUserName %>/donate)

## Install

```bash
<% if (pm === 'yarn') { %>yarn add<% } else { %>npm i<% } %> <%= name %>
```

## Usage

```js
const <%= camelcasedName %> = require('<%= name %>')

<%= camelcasedName %>()
//=> foo
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## Author

**<%= name %>** © [<%= username %>](https://github.com/<%= normalUserName %>), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by <%= username %> with help from contributors ([list](https://github.com/<%= normalUserName %>/<%= name %>/contributors)).

> [<%= website.replace(/^https?:\/\//, '') %>](<%= website %>) · GitHub [@<%= username %>](https://github.com/<%= normalUserName%>)<% if (twitter) { %> · Twitter [@<%= twitter %>](https://twitter.com/<%= twitter %>)<% } %>
