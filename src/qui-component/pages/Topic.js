import React, { useContext, useState } from 'react'

import {  useParams } from 'react-router-dom';
import { ThemeContext } from '../../App';
import { useNavigate } from "react-router-dom";
import Icons from '../Icons';
import ImageIcons from '../ImageIcons';
import Button from '../Button';


const Topic = () => {
  const {id} = useParams();
  const {theme,data} = useContext(ThemeContext)
  const selectTopic = data.quizzes[id]
  const[questionNo, setQuestionNo] = useState(0)
  const[selectQuestion, setSelectQuestion] = useState()
  const[showError, setShowError] = useState(false)
  const[check, setCheck] = useState("")
  const[result, setResult] = useState(0)
  const navigate = useNavigate();

  const checkQuestion = (selected) => {
 

    setShowError(false)
    if(selected === selectTopic.questions[questionNo].answer){
     setCheck("1")
     setResult(pre=>pre+1)
    
    }
    else{
      setCheck("0")
    }
    }

    const getquestion = () => {
      setQuestionNo(pre=>pre+1)
      setSelectQuestion()
      setCheck("")
    }

    const startQuiz =() => {
      return navigate(`/`);
    }

  return(
    <div className={`${theme?"bg-[#F4F6FA]":"bg-[#313E51]"}`}>
    <div  className='lg:max-w-7xl lg:mx-auto  px-5 md:px-14 lg:px-0 '>
       
       <div className='flex flex-col h-screen justify-center'>
        <div className='lg:grid lg:grid-cols-2 lg:gap-x-36'>
          <div className='mb-10 md:my-0'>
            {questionNo<9&&<p className={` ${!theme?"text-[#F4F6FA]":"text-[#626C7F]"} text-[14px] md:text-[20px] font-normal italic`}>{`Question ${questionNo+1} of 10`}</p>}
           {questionNo<9? <h1 className={`${!theme?"text-[#F4F6FA]":"text-[#313E51]"} text-[20px] md:text-[36px] font-medium mt-10`}>{selectTopic.questions[questionNo].question}</h1> :  <h1 className={` ${!theme?"text-[#F4F6FA]":"text-[#313E51]"} text-[40px] md:text-[64px] font-light`}>Quiz completed<br/><span className='font-medium'>You scored...</span></h1>}
          </div>
          {questionNo<9?<div className=''>
          {selectTopic.questions[questionNo].options.map((item , index) =>  
            <Button onClick={()=>!check && setSelectQuestion(item)} key={index} className={`p-3  ${!theme?"text-[#FFF]":"text-[#3B4D66] bg-white hover:bg-[#F6E7FF]"}   border-[3px]  ${selectQuestion===item?check==="1"?" border-[#26D782]":check==="0"?"border-[#EE5454]":"border-[#A729F5]":!theme?"border-[#3B4D66]":""}`}>
              <Icons bgcolor={` ${selectQuestion===item?check==="1"?"bg-[#26D782]":check==="0"?"bg-[#EE5454]":" bg-[#A729F5] ":"bg-[#F4F6FA]"}  px-4 py-2`}>
                <p className={`${selectQuestion===item?" text-white ":"text-[#626C7F]"} text-[28px]  font-medium`}>{index===0?"A":index===1?"B":index===2?"C":"D"}</p>
              </Icons>
              {item}
              <ImageIcons src="/images/icon-correct.svg" className={`${selectQuestion===item?check==="1"?"block":"hidden":"hidden"} ml-auto`}/>
              <ImageIcons src="/images/icon-incorrect.svg" className={`${selectQuestion===item?check==="0"?"block":"hidden":"hidden"} ml-auto`}/>
            </Button>)}
            {!check&&<Button onClick={()=>selectQuestion?checkQuestion(selectQuestion):setShowError(true)} className="p-3 bg-[#A729F5] hover:bg-[#a729f5b1] text-white justify-center">Submit Answer</Button>}
            { check&&<Button onClick={()=>getquestion()} className="p-3 bg-[#A729F5] hover:bg-[#a729f5b1] text-white justify-center">Next Question</Button>}
            {showError&&<div className='flex justify-center items-center'>
              <img src='/images/icon-incorrect.svg' alt='' className=' mx-2'/>
              <p className='text-[#EE5454] text-[24px] font-normal'>Please select an answer</p>
              </div>}
          </div>
          :
          <div>
            <div className='bg-white shadow-2xl rounded-2xl w-full p-10 '>
              <div className='flex justify-center items-center'>
                <Icons bgcolor={`bg-[#F4F6FA]`}><img src={selectTopic.icon} alt="" className='w-10'/></Icons>
                <div className='text-[#313E51] font-medium text-[28px]'>{selectTopic.title}</div>
              </div>
              <div className='flex justify-center items-center'>
                <h1 className='text-[144px] text-[#313E51] font-medium'>{result}</h1>
              </div>
              <p className='text-[24px] font-normal text-[#626C7F] text-center'>out of 10</p>
            </div>
          <Button onClick={()=>startQuiz()} className="p-3 bg-[#A729F5] hover:bg-[#a729f5b1] text-white justify-center">Play Again</Button>  
          </div>}
        </div>
       </div>
    </div>
    </div>
  )

}

export default Topic