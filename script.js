let canvas = document.getElementsByTagName("canvas")[0]
let context = canvas.getContext("2d")
let frames = {
    currentFrame: 0,
    maxFrame: 1265
}
let images = []
let imagesLoaded = 0 
let preLoad = ()=>{
    for (let i = 1; i <= frames.maxFrame; i++) {
        let url = `/images/frame_${i.toString().padStart("4", "0")}.jpeg`
        let img = new Image()
        img.src = url
        img.onload = ()=>{
            imagesLoaded = imagesLoaded + 1
            if (imagesLoaded == frames.maxFrame) {
                loadImage(frames.currentFrame)
                startAnimation()
            }
        }
        images.push(img)
    }
}
let loadImage = (frame)=>{
    if (frame >= 0 && frame <= frames.maxFrame) {
        const image = images[frame]
        const scaleX = canvas.width / image.width
        const scaleY = canvas.height / image.height
        const scale = Math.max(scaleX, scaleY)
        const newWidth = image.width * scale
        const newHeight = image.height * scale
        const offsetX = (canvas.width - newWidth)/2
        const offsetY = (canvas.height - newHeight)/2
        context.clearRect(0, 0, canvas.width, canvas.height)
        context.imageSmoothingEnabled = true
        context.imageSmoothingQuality = "high"
        context.drawImage(image, offsetX, offsetY, newWidth, newHeight)
        frames.currentFrame = frame
    }
}
let startAnimation = ()=>{
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            scrub: 1
        }
    })
    let updateFrames = (index)=>{
        return {
            currentFrame: index,
            onUpdate: ()=>{
                loadImage(Math.floor(frames.currentFrame))
            }
        }
    }
    tl
    .to(frames, updateFrames(250), "first")
    .to(".absolute", {
        position: "absolute",
        top: "50%",
        left: "95%",
        xPercent: -50,
        yPercent: -50
    }, "first")

    .to(frames, updateFrames(500), "second")
    .to(".absolute", {
        scale: 0,
        opacity: 0,
        ease: "linear"
    }, "second")

    .to(frames, updateFrames(frames.maxFrame), "third")
}
preLoad()