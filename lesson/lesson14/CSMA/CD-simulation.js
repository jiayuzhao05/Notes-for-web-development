// CSMA/CD 机制模拟
class CSMACD {
    constructor() {
      this.busy = false  // 网络是否忙碌
      this.collision = false  // 是否发生冲突
    }
    
    // 尝试发送数据
    async sendData(data) {
      // 1. 监听（Carrier Sense）
      while (this.busy) {
        console.log('网络忙碌，等待...')
        await this.waitRandomTime()
      }
      
      // 2. 发送（Multiple Access）
      this.busy = true
      console.log('开始发送数据...')
      
      // 3. 冲突检测（Collision Detection）
      if (this.detectCollision()) {
        this.collision = true
        console.log('检测到冲突！停止发送')
        this.busy = false
        
        // 4. 退避（Backoff）
        await this.exponentialBackoff()
        return this.sendData(data)  // 重新尝试
      }
      
      // 发送成功
      console.log('数据发送成功')
      this.busy = false
      this.collision = false
    }
    
    // 检测冲突
    detectCollision() {
      // 模拟：10% 的概率发生冲突
      return Math.random() < 0.1
    }
    
    // 指数退避
    async exponentialBackoff() {
      const slots = Math.floor(Math.random() * Math.pow(2, 3))  // 0-7 个时隙
      const waitTime = slots * 512  // 每个时隙 512 微秒
      console.log(`退避 ${waitTime} 微秒后重试`)
      await new Promise(resolve => setTimeout(resolve, waitTime / 1000))
    }
    
    waitRandomTime() {
      return new Promise(resolve => setTimeout(resolve, Math.random() * 100))
    }
  }