
const images = [
    "http://127.0.0.1:8090/preview/nft/ObOivEiwXeiLKUvbInJloHCUfZhTjMmA.png",
    "http://127.0.0.1:8090/preview/nft/hqJyxSVQyCiflbCtuduALhmRaaMxJPlr.png",
    "http://127.0.0.1:8090/preview/nft/SfLXsjeRCAoaraCZjbnghLljCZKeqSxZ.png",
    "http://127.0.0.1:8090/preview/nft/QgfxUIJRkxTfYqCBIFnMoAhTzxSVPqOX.png",
    "http://127.0.0.1:8090/preview/nft/FKAMfnaqNjEFcrHhYIxltUJODjvmhmJI.png",
    "http://127.0.0.1:8090/preview/nft/qteVgcLhTWCOZmJCLujThbLmCGzYpRWG.png",
    "http://127.0.0.1:8090/preview/nft/mgPpwlfcAHgUOWgDBCaZjMrcbXHmYvFA.png",
    "http://127.0.0.1:8090/preview/nft/IsBvRPCivvJMcSWDxrcuKfUvdIcJYhSe.png"
]
let canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 600;
const imageList:HTMLImageElement[] = []
for (let i = 0; i < images.length; i++) {
    const img = new Image()
    img.src = images[i]
    img.setAttribute("crossOrigin",'Anonymous')
    imageList.push(img)
}
const loadList=[]
for (let i = 0; i < imageList.length; i++) {
    loadList.push(new Promise<void>((res,rej)=>{
        imageList[i].onload = ()=>{
            res();
        }
    }))
}
if(ctx){
    // 两张图片都加载完成后绘制于Canva中
    let drawAllImg = Promise.all(loadList).then((res)=>{
        for (let i = 0; i < imageList.length; i++) {
            ctx?.drawImage(imageList[i], 0, 0, 600, 600);
        }
    });
    drawAllImg.then(()=>{
        let outputImg = new Image();
        outputImg.src = ctx?.canvas.toDataURL()||'';
        document.body.appendChild(outputImg);
        let link = document.createElement("a");
        link.download = "demo1.png";
        link.href = outputImg.src;
        link.click();
    });
}
