// 以太网帧结构（数据链路层）
// [MAC头部][IP头部][TCP头部][数据][FCS]
class EthernetFrame {
    constructor(sourceMAC, destMAC, payload) {
      this.preamble = '10101010...'  // 前导码
      this.destMAC = destMAC         // 目标 MAC 地址（6 字节）
      this.sourceMAC = sourceMAC     // 源 MAC 地址（6 字节）
      this.type = '0x0800'           // 类型（IPv4）
      this.payload = payload          // 载荷（IP 数据包）
      this.FCS = '校验和'             // 帧校验序列
    }
    
    // 封装成帧
    encapsulate() {
      return {
        header: {
          dest: this.destMAC,
          source: this.sourceMAC,
          type: this.type
        },
        data: this.payload,
        trailer: this.FCS
      }
    }
  }
  
  // 示例
  const frame = new EthernetFrame(
    'AA:AA:AA:AA:AA:AA',  // 源 MAC
    'BB:BB:BB:BB:BB:BB',  // 目标 MAC
    'IP 数据包内容'
  )