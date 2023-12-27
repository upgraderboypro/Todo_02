// let swUrl = `${%process.env.PUBLIC_URL%}/sw`
export default function sw(){
    navigator.serviceWorker.register('./ws.js').then((res)=>{
        console.log('res: ', res)
    })
}