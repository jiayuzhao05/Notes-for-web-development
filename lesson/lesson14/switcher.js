// 交换机模拟
class EthernetSwitch {
    constructor() {
      this.macTable = new Map()  // MAC 地址表：MAC -> 端口
      this.ports = []            // 端口列表
    }
    
    // 添加端口
    addPort(portNumber) {
      this.ports.push(portNumber)
    }
    
    // 处理接收到的帧
    receiveFrame(frame, incomingPort) {
      console.log(`端口 ${incomingPort} 收到帧`)
      console.log(`源 MAC: ${frame.sourceMAC}`)
      console.log(`目标 MAC: ${frame.destMAC}`)
      
      // 1. 学习：记录源 MAC 地址
      this.learn(frame.sourceMAC, incomingPort)
      
      // 2. 查找目标 MAC
      const targetPort = this.macTable.get(frame.destMAC)
      
      // 3. 转发决策
      if (targetPort === undefined) {
        // 未找到：广播（除了源端口）
        console.log('MAC 地址未知，广播到所有端口')
        this.broadcast(frame, incomingPort)
      } else if (targetPort === incomingPort) {
        // 同一端口：过滤（丢弃）
        console.log('目标在同一端口，丢弃帧')
      } else {
        // 找到：单播转发
        console.log(`转发到端口 ${targetPort}`)
        this.forward(frame, targetPort)
      }
    }
    
    // 学习 MAC 地址
    learn(macAddress, port) {
      this.macTable.set(macAddress, port)
      console.log(`学习到: ${macAddress} -> 端口 ${port}`)
      console.log('MAC 地址表:', Array.from(this.macTable.entries()))
    }
    
    // 单播转发
    forward(frame, port) {
      console.log(`>>> 端口 ${port} 转发帧到 ${frame.destMAC}`)
    }
    
    // 广播
    broadcast(frame, excludePort) {
      this.ports.forEach(port => {
        if (port !== excludePort) {
          console.log(`>>> 端口 ${port} 广播帧`)
        }
      })
    }
  }
  
  // 使用示例
  const switch1 = new EthernetSwitch()
  switch1.addPort(1)
  switch1.addPort(2)
  switch1.addPort(3)
  
  // 设备 A 发送数据到设备 B
  const frame1 = new EthernetFrame(
    'AA:AA:AA:AA:AA:AA',  // 设备 A
    'BB:BB:BB:BB:BB:BB',  // 设备 B
    'Hello from A'
  )
  
  // 第一次：MAC 地址未知，广播
  switch1.receiveFrame(frame1, 1)
  
  // 设备 B 响应
  const frame2 = new EthernetFrame(
    'BB:BB:BB:BB:BB:BB',  // 设备 B
    'AA:AA:AA:AA:AA:AA',  // 设备 A
    'Hello from B'
  )
  
  // 第二次：MAC 地址已知，单播
  switch1.receiveFrame(frame2, 2)