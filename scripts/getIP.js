const
  os = require('os');
  ifaces = os.networkInterfaces();

module.exports = () => {
  var ip = [];
  Object.keys(ifaces).forEach(function (ifname) {
    ifaces[ifname].forEach(function (iface) {
      if ('IPv4' !== iface.family || iface.internal !== false) {
        return; // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      }
      ip.push(iface.address);
    });
  });
  return ip[0];
};