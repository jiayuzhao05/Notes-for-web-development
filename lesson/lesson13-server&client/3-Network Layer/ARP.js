// ARP：将 IP 地址解析为 MAC 地址（网络层到数据链路层）

// Node.js 获取网络接口信息（包括 MAC 地址）
const os = require('os')

function getNetworkInterfaces() {
  const interfaces = os.networkInterfaces()
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        console.log('接口:', name)
        console.log('IP 地址:', iface.address)  // 网络层地址
        console.log('MAC 地址:', iface.mac)     // 数据链路层地址
        console.log('子网掩码:', iface.netmask)
      }
    }
  }
}

getNetworkInterfaces()