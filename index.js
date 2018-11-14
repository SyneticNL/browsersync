const
  browserSync = require('browser-sync').create(), // Run synchronized server
  notifier = require('node-notifier'), // Adds notifications to tasks
  path = require('path'),
  open = require('open'), // Opens url (from notification)
  getIP = require('./scripts/getIP');

module.exports = (config) => {
  browserSync.init(config.browsersync, function (err, bs) {
    const port = (bs.server._connectionKey).substr((bs.server._connectionKey).length - 4);
    let
      title = "Browsersync started",
      ip = 'localhost';
    if (config.mode === 'share') {
      title += " in share mode";
      ip = getIP();
    }
    notifier.notify({
      title: title,
      message: `on ${ip}: ${port}\nClick to launch browser`,
      icon: config.logo ? path.resolve(`${rocess.cwd()}/${config.basepath}/${config.logo}`) : '',
      sound: config.sound ? config.sound : false,
      wait: true
    });
    notifier.on('click', () => {
      open("http://" + ip + ":" + port);
    });
  });
};