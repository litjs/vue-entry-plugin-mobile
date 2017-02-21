# vue-entry-plugin-mobile
A vue entry plugin for mobile app

## Installation
```
npm install vue-entry-plugin-mobile --save-dev
```

## Example Webpack Config

``` javascript

module.exports = {
  entry: vueEntry({
    plugins:[{
           name: 'mobile',
           options: {
             designWidth: 320,
             designHeight: 568,
             designFontSize: 17
           }
         }]
  })
}
```
