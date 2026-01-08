const dgram = require('dgram')

// 使用原始 socket（需要 root 权限）
// 直接操作 IP 数据包

// 检查 IP 地址（网络层）
function checkSameNetwork(ip1, ip2, subnetMask = '255.255.255.0') {
  const [ip1Parts, ip2Parts, maskParts] = [
    ip1.split('.').map(Number),
    ip2.split('.').map(Number),
    subnetMask.split('.').map(Number)
  ]
  
  // IP 地址按位与子网掩码，判断是否同一网段
  for (let i = 0; i < 4; i++) {
    if ((ip1Parts[i] & maskParts[i]) !== (ip2Parts[i] & maskParts[i])) {
      return false
    }
  }
  return true
}

console.log(checkSameNetwork('192.168.0.1', '192.168.0.226'))  // true