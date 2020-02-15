// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

var ReportportalAgent = require('agent-js-jasmine');

var agent = new ReportportalAgent({
  // client settings
  token: "00000000-0000-0000-0000-000000000000",
  endpoint: "http://your.reportportal.server/api/v1",
  launch: "LAUNCH_NAME",
  project: "PROJECT_NAME",
  // agent settings
  attachPicturesToLogs: true,
  attributes: []
});

/**
 * @type { import("protractor").Config }
 */
exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './src/**/*.e2e-spec.ts'
  ],
  capabilities: {
    browserName: 'chrome'
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function () { }
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.json')
    });
    console.log('I\'M HERE');
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
    jasmine.getEnv().addReporter(agent.getJasmineReporter());
  },
  afterLaunch(number) {
    agent.getExitPromise().then(() => {
      console.log('finish work');
    })
  },
};