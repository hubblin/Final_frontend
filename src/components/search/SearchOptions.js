import React,{useState} from 'react';
import styled from 'styled-components';

const SearchOptionsBlock = styled.div`
    margin-top: 1rem;
    margin-bottom: 2rem;

    .labelClass{
        margin-right: 0.5rem;
    }

    .OptionHeader{
        margin: 0;
        padding: 0;
    }

    .OptionP{
        color: gray;
        font-size: 0.75rem;
    }
`;



const SearchOptions = ({ tags, onChangeInput}) =>{
    const [checkedInputs, setCheckedInputs] = useState([]);

    const changeHandler = (checked, id, value) => {
        if(checked){
            setCheckedInputs([...checkedInputs, id]);
            onChangeInput([...tags, value])
        }else{
            //체크 해제
            setCheckedInputs(checkedInputs.filter((el) => el !== id));
            const nextTags = tags.filter(t => t !== value);
            onChangeInput(nextTags);
        }
    }



    return(
        <SearchOptionsBlock>
            <div>
                <h4 className="OptionHeader">색</h4>
                <p className="OptionP">옷에 어떤 색들이 포함되어 있나요?</p>
                <label className="labelClass"><input id={1} checked={checkedInputs.includes(1) ? true : false} onChange={(e)=> {
                    changeHandler(e.target.checked, 1, 'red')
                }} type="checkbox" name="color"/>빨강</label>
                <label className="labelClass"><input id={2} checked={checkedInputs.includes(2) ? true : false} onChange={(e)=> {
                    changeHandler(e.target.checked, 2, 'blue')
                }} type="checkbox" name="color" value="blue"/>파랑</label>
                <label className="labelClass"><input id={3} checked={checkedInputs.includes(3) ? true : false} onChange={(e)=> {
                    changeHandler(e.target.checked, 3, 'black')
                }} type="checkbox" name="color" value="black"/>검정</label>
                <label className="labelClass"><input id={4} checked={checkedInputs.includes(4) ? true : false} onChange={(e)=> {
                    changeHandler(e.target.checked, 4, 'white')
                }} type="checkbox" name="color" value="white"/>하양</label>
                <label className="labelClass"><input id={5} checked={checkedInputs.includes(5) ? true : false} onChange={(e)=> {
                    changeHandler(e.target.checked, 5, 'green')
                }} type="checkbox" name="color" value="green"/>초록</label>
                <label className="labelClass"><input id={6} checked={checkedInputs.includes(6) ? true : false} onChange={(e)=> {
                    changeHandler(e.target.checked, 6, 'khaki')
                }} type="checkbox" name="color" value="khaki"/>카키</label>
                <label className="labelClass"><input id={7} checked={checkedInputs.includes(7) ? true : false} onChange={(e)=> {
                    changeHandler(e.target.checked, 7, 'navy')
                }} type="checkbox" name="color" value="navy"/>네이비</label>
            </div>
            <div>
                <h4 className="OptionHeader">재질</h4>
                <p className="OptionP">옷이 어떤 재질인가요?</p>
                <label className="labelClass"><input id={8} checked={checkedInputs.includes(8) ? true : false} onChange={(e)=> {
                    changeHandler(e.target.checked, 8, 'glossy')
                }} type="checkbox" name="texture" value="glossy"/>광택이 있어요</label>
                <label className="labelClass"><input id={9} checked={checkedInputs.includes(9) ? true : false} onChange={(e)=> {
                    changeHandler(e.target.checked, 9, 'rough')
                }} type="checkbox" name="texture" value="rough"/>거칠고 두꺼워요</label>
                <label className="labelClass"><input id={10} checked={checkedInputs.includes(10) ? true : false} onChange={(e)=> {
                    changeHandler(e.target.checked, 10, 'thin')
                }} type="checkbox" name="texture" value="thin"/>얇아요, 속이 비춰요</label>
                <label className="labelClass"><input id={11} checked={checkedInputs.includes(11) ? true : false} onChange={(e)=> {
                    changeHandler(e.target.checked, 11, 'stiff')
                }} type="checkbox" name="texture" value="stiff"/>뻣뻣해요</label>
                <label className="labelClass"><input id={12} checked={checkedInputs.includes(12) ? true : false} onChange={(e)=> {
                    changeHandler(e.target.checked, 12, 'elastic')
                }} type="checkbox" name="texture" value="elastic"/>신축성이 있어요</label>
                <label className="labelClass"><input id={13} checked={checkedInputs.includes(13) ? true : false} onChange={(e)=> {
                    changeHandler(e.target.checked, 13, 'soft')
                }} type="checkbox" name="texture" value="soft"/>부드러워요</label>
            </div>
        </SearchOptionsBlock>
    )
}

export default SearchOptions;