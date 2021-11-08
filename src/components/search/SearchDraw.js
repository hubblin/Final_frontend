import React, {createRef, useEffect, useState} from 'react';
import styled from 'styled-components';
import * as tf from "@tensorflow/tfjs";

import {drawRect} from '../common/Utilities';

import palette from '../../lib/styles/palette';


import axios from 'axios';

const SearchDrawBlock = styled.div`

    .canvasStyle{
        border: 1px solid black;
    }
`;

const DrawButtonBlock = styled.div`
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;

    button{
        color: white;
        width: 49%;
        height: 2rem;
        border: none;
        border-radius: 4px;
        font-weight: bold;
        padding: 0.25rem 1rem;
        background: ${palette.gray[8]};
        &:hover{
            background: ${palette.gray[6]};
        }
    }
`;

const DrawFinishButton = styled.button`
    margin-top: 0.3rem;
    color: white;
    width: 100%;
    height: 2rem;
    border: none;
    border-radius: 4px;
    font-weight: bold;
    font-size: 1rem;
    background: ${palette.cyan[5]};
    &:hover{
        background: ${palette.cyan[4]};
    }
    pointer-events: ${(props )=>`${props.activeProps}`};
`


let buttonActive = 'auto';
const SearchDraw = ({ onInputTags, drawStore, onBackupDraw, onClearBackUp }) => {
    let canvas;
    let canvasRef = createRef();
    

    let drawBackup = new Array();
    const [noContents, setNoContents] = useState('');

    let pos ={
        drawable : false,
        X: -1,
        Y: -1,
    };

    let ctx;

    let getResult = '';


    useEffect(()=>{
        canvas = canvasRef.current;
        ctx = canvas.getContext("2d");
        if(drawStore.length !== 0){
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.putImageData(drawStore, 0,0);
            
        }else{
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        canvas.addEventListener("mousedown", initDraw);
        canvas.addEventListener("mousemove", draw);
        canvas.addEventListener("mouseup", finishDraw);
        canvas.addEventListener("mouseout", finishDraw);

        canvas.addEventListener("touchstart", initDraw);
        canvas.addEventListener("touchmove", draw);
        canvas.addEventListener("touchend", finishDraw);
        canvas.addEventListener("touchcancel", finishDraw);
    })

    //캔버스 저장
    function saveCanvas(){
        drawBackup.push(ctx.getImageData(0,0, canvas.width, canvas.height));
    }
    
    //그리기 시작
    function initDraw(event) {
        saveCanvas();
        ctx.beginPath();
        ctx.lineWidth = 2;
        pos = {drawable: true, ...getPosition(event)};
        ctx.moveTo(pos.X, pos.Y);
    }
    
    //그리기
    function draw(event){
        if(pos.drawable){
            pos = {...pos, ...getPosition(event)};
            ctx.lineTo(pos.X, pos.Y);
            ctx.stroke();
        }
    }

    //선 그리기 끝
    function finishDraw(){
        pos = {drawable: false, X: -1, Y:-1};
    }

    //포지션 가져오기
    function getPosition(event){
        return {X: event.offsetX,
            Y: event.offsetY
        }
    }

    //뒤로 돌리기
    function prevCanvas(event) {
        setNoContents('');
        event.preventDefault();
        console.log(drawBackup);
        if(drawBackup.length > 0){
            ctx.putImageData(drawBackup.pop(), 0,0);
        }
    }

    //캔버스 다시 흰색 바탕으로 채우기
    const clearCanvas = () => {
        setNoContents('');
        buttonActive = 'auto';
        if(!canvasRef.current){
            return;
        }
        canvas = canvasRef.current;
        ctx = canvas.getContext("2d");
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        onClearBackUp();
    }

    //이미지 다운로드 하기
    const downloadImage = (imageData) => {
        let blobBin = atob(imageData.split(',')[1]);
        let defaultname = 'defaultname';
        let array = [];
        for(let i =0; i < blobBin.length; i++){
            array.push(blobBin.charCodeAt(i));
        }
        let file = new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
        let formdata = new FormData();

        formdata.append('file', file, defaultname);
        console.log(formdata);
        axios.post('/api/posts/draw', formdata).then((response)=>{
            console.log({response});
        })
    }

    const onCheck = async (e) => {
       
        e.preventDefault();
        setNoContents('');
        let tartget = e.currentTarget;
        tartget.disabled = true;
        
        const nets = await tf.loadGraphModel('https://cloud-real-time-tensorflow-js-model.s3.jp-tok.cloud-object-storage.appdomain.cloud/model.json');
        const ImageData = canvas.toDataURL();
        downloadImage(ImageData);

        const timg = tf.browser.fromPixels(canvas);
       
        
        const resized = tf.image.resizeBilinear(timg, [800,600]);
        const casted = resized.cast('int32');
        const expanded = casted.expandDims(0);
        
        var obj = await nets.executeAsync(expanded)

        const boxes = await obj[4].array()
        const classes = await obj[1].array()
        const scores = await obj[2].array()
        

        canvas = canvasRef.current;
        ctx = canvas.getContext("2d");
        getResult  = drawRect(boxes[0], classes[0], scores[0], 0.9, 800, 600, ctx, getResult)
        

        tf.dispose(timg)
        tf.dispose(resized)
        tf.dispose(casted)
        tf.dispose(expanded)
        tf.dispose(obj)
        saveCanvas();
        let uniqeArr = [];
        if (getResult === '') {
            setNoContents('그림 속에서 특징을 검출하지 못했습니다.');
            buttonActive = 'auto';
        } else {
            const arr = getResult.split(",");
            const set = new Set(arr);
            uniqeArr = [...set];
        }

        onBackupDraw(ctx.getImageData(0,0, canvas.width, canvas.height));
        onInputTags(uniqeArr);
        tartget.disabled = false;
    }



    return(
        <SearchDrawBlock>
            <canvas className="canvasStyle" ref={canvasRef} width="800" height="600" />
            <div style={{color: 'red', textAlign : 'center'}}>{ noContents}</div>
            <DrawButtonBlock>
                <button onClick={prevCanvas}>뒤로 돌리기</button>
                <button onClick={clearCanvas}>캔버스 초기화</button>
            </DrawButtonBlock>
            <DrawFinishButton onClick={onCheck} activeProps={ buttonActive}>다 그렸어요</DrawFinishButton>
        </SearchDrawBlock>
    )
}

export default SearchDraw;