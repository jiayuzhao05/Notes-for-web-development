function sendmsg(name, onFulffiled, onRejected){

}
//call back hell
sendmsg(
    'kevin',
    (reply)=>{
        console.log(reply);
    },
    (reply)=>{
        console.log(err);
        sendmsg(
            'john',
            (reply)=>{
                console.log(reply);
            },
            (err)=>{
                sendmsg(
                    'mary',
                    (reply)=>{
                        console.log(reply);
                    },
                    (err)=>{
                        sendmsg(
                            'tom',
                            (reply)=>{
                                console.log(reply);
                            },
                            (err)=>{
                                console.log(err);
                            }
                        )
                    }
                )
            }
        )
    }
)

sendmsg()