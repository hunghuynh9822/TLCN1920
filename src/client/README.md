Following : https://www.freecodecamp.org/news/learn-webpack-for-react-a36d4cac5060/
1. npm init -y
2. npm i --save react react-dom prop-types react-router-dom semantic-ui-react
3. npm i --save-dev @babel/core babel-loader @babel/preset-env @babel/preset-react @babel/plugin-proposal-class-properties @babel/plugin-syntax-dynamic-import css-loader style-loader html-webpack-plugin webpack webpack-dev-server webpack-cli
4. Detail
    - react — I’m sure you know what React is
    - react-dom — Provides DOM-specific methods for the browser
    - prop-types — Runtime type checking for React props
    - react-router-dom — Provides routing capabilities to React for the browser
    - semantic-ui-react — CSS Framework
    - @babel/core — Core dependencies for Babel
    - Babel is a transpiler that compiles JavaScript ES6 to JavaScript ES5 allowing you to write JavaScript “from the future” so that current browsers will understand it. Detailed   - description in Quora.
    - babel-loader — This package allows transpiling JavaScript files using Babel and webpack
    - @babel/preset-env — With this you don’t have to specify if you will be writing ES2015, ES2016 or ES2017. Babel will automatically detect and transpile accordingly.
    - @babel/preset-react — Tells Babel we will be using React
    - @babel/plugin-proposal-class-properties — Use class properties. We don’t use Class Properties in this project, but you will more than likely use them in your project
    - @babel/plugin-syntax-dynamic-import — Be able to use dynamic imports
    - css-loader — Interprets @import and url() like import/require() and will resolve them
    - html-webpack-plugin — Can generate an HTML file for your application, or you can provide a template
    - style-loader — Adds CSS to the DOM by injecting a <style> tag
    - webpack — Module bundler
    - webpack-cli — Command Line Interface, needed for Webpack 4.0.1 and latest
    - webpack-dev-server — Provides a development server for your application
5. Hot Module Replacement (HMR)
npm i --save-dev react-hot-loader
6. Code Splitting
    - By Route
        npm i --save-dev react-imported-component react-delay-render
    - By Vendor
7. Production Configuration
    npm i --save-dev mini-css-extract-plugin
    npm i --save-dev postcss-loader autoprefixer cssnano postcss-preset-env
    - prebuild — Will run before the build script and delete the dist directory created by our last production build. We use the library rimraf for this
    - build — First we use cross-env library just in case somebody is using Windows. This way setting up environment variables with NODE_ENV will work. Then we call Webpack with the -p flag to tell it to optimize this build for production, and finally we specify the production configuration.
    npm i --save-dev rimraf cross-env
8. Webpack Composition
    npm i --save-dev webpack-merge chalk
    mkdir -p build-utils/addons
    cd build-utils
    touch build-validations.js common-paths.js webpack.common.js webpack.dev.js webpack.prod.js
9. BONUS: Setting up Webpack Bundle Analyzer
    npm i webpack-bundle-analyzer --save-dev
    touch build-utils/addons/webpack.bundleanalyzer.js


Hello GitBOT