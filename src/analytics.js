module.exports = {
  pageview(page) {
    return ga('send', 'pageview', page);
  },

  sendEvent(event) {
    ga('send', 'event', event);
  }
};
