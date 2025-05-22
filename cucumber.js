module.exports = {
  default: [
    '--require-module ts-node/register',
    '--require features/**/*.ts',
    '--require stepDefinitions/**/*.ts',
    '--require support/**/*.ts',
    '--format json:reports/cucumber-report.json', // Generate JSON report
    '--format html:reports/cucumber-report.html', // Generate HTML report
    'features/**/*.feature'
    
    
  ].join(' '),
  scripts: {
    "generate-report": "node generate-report.js"
  }
};

