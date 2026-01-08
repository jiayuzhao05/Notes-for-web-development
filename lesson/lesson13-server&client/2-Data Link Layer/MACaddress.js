const os = require('os')

// 数据链路层：MAC 地址（物理地址）
function getMACAddress() {
  const interfaces = os.networkInterfaces()
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return {
          interface: name,
          mac: iface.mac,  // MAC 地址（数据链路层）
          ip: iface.address
        }
      }
    }
  }
}

const info = getMACAddress()
console.log('MAC 地址:', info.mac)  // 例如: b6:94:89:ca:a8:d8