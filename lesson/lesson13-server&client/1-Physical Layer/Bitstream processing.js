// 物理层：比特流传输

// 将数据转换为比特流
function stringToBits(str) {
    return str.split('').map(char => {
      return char.charCodeAt(0).toString(2).padStart(8, '0')
    }).join('')
  }
  
  // 将比特流转换为数据
  function bitsToString(bits) {
    const bytes = []
    for (let i = 0; i < bits.length; i += 8) {
      const byte = bits.substr(i, 8)
      bytes.push(String.fromCharCode(parseInt(byte, 2)))
    }
    return bytes.join('')
  }
  
  // 示例
  const message = 'Hello'
  const bits = stringToBits(message)
  console.log('比特流:', bits)  // 01001000 01100101 ...
  
  const decoded = bitsToString(bits)
  console.log('解码:', decoded)  // Hello