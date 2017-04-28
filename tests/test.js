var assert = require('assert');

module.exports = {
  'Title equals to: React project' : function (browser) {
    browser
      .url('http://localhost:3000')
      .waitForElementVisible('body', 1000)
      .getTitle( (result) => {
            assert.equal(typeof result, 'string');
            assert.equal(result, 'React project');
      })
      .end();
  }
};