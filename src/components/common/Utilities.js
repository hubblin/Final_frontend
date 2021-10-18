//Define our labelmap
const labelmap = {
    1: {name: 'tapered', color: 'black'},
    2: {name: 'Skinny', color: 'black'},
    3: {name: 'Shukirt', color: 'black'},
    4: {name: 'BootCut', color: 'black'},
    5: {name: 'Straight', color: 'black'},
    6: {name: 'JoggerPants', color: 'black'},
    7: {name: 'WaistRubberBand', color: 'black'},
    8: {name: 'Pocket', color: 'black'},
    9: {name: 'PantsZipper', color: 'black'},
    10: {name: 'BeltLoop', color: 'black'},
    11: {name: 'RollUp', color: 'black'},
    12: {name: 'SidePocket', color: 'black'},
    13: {name: 'ShortPants', color: 'black'},
}


//Define a drawing function
export const drawRect = (boxes, classes, scores, threshold, imgWidth, imgHeight, ctx, getResult) =>{
    
    for(let i =0; i <= boxes.length; i++){
        if(boxes[i] && classes[i] && scores[i]>threshold){
            
            
            const [y,x,height, width] = boxes[i]
            const text = classes[i]

            //Set styling
            ctx.strokeStyle = 'black'
            ctx.lineWidth = 5
            ctx.fillStyle = 'black'
            ctx.font = '30px Arial'

            if(getResult === ''){
                getResult = labelmap[text]['name']
            }else{
                getResult = getResult + ',' + labelmap[text]['name']
            }
            
            //DRAW!!
            ctx.beginPath()
            ctx.fillText(labelmap[text]['name'] + ' - ' + Math.round(scores[i]*100)/100, x*imgWidth, y*imgHeight)
            ctx.rect(x*imgWidth, y*imgHeight, width*imgWidth/2, height*imgHeight/1.5)
            ctx.stroke()
        }
    }
    return getResult;
}