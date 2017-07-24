import path from 'path'
import pluginTester from 'babel-plugin-tester'
import glob from 'glob'
import plugin from '../'

const fixtures = path.join(__dirname, '__fixtures__')

pluginTester({
  pluginName: 'flow to onlyUpdateForKeys plugin',

  plugin,

  babelOptions: {
    plugins: [
      null, // placeholder for this plugin
      'syntax-flow',
      'syntax-jsx',
    ],
  },

  snapshot: true,

  tests: glob.sync('**/*.js', { cwd: fixtures }).map((file) => ({
    title: file,
    fixture: path.join(fixtures, file),
  })),
})
