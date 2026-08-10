self.onmessage = (event) =>{
    const {type, payload} = event.data;

    if(type === 'start') {
        const result = heavyCalculation(payload);

        self.postMessage({
            type:'result',
            data:result,
        })
    }
}

//cpu密集型任务 
function heavyCalculation(n){
    let total = 0;

    for(let i = 0;i<n;i++){
        total += i;

        if(i%Math.floor(n/10) === 0) {
            self.postMessage({
                type:'progress',
                data:Math.floor((i/n)*100),
            })
        }
    }
    return total;
}