import React, { useState, useEffect } from 'react';
import {
  Button, Popover,
  PopoverHeader, PopoverBody
} from 'reactstrap';
import './App.scss';
import getQuestions from './helpers/data/avatarData';

function App() {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const toggle = () => setPopoverOpen(!popoverOpen);
  const [allQuestions, setAllQuestions] = useState([]);
  const [singleQuestion, setSingleQuestion] = useState({});
  const [showAnswer, setShowAnswer] = useState(false);

  console.warn(allQuestions);
  const hClick = () => {
    if (showAnswer) {
      setShowAnswer(false);
      setSingleQuestion(allQuestions[Math.floor(Math.random() * allQuestions.length)]);
    } else {
      setShowAnswer(true);
    }
  };

  useEffect(() => {
    getQuestions()
      .then((questions) => {
        setAllQuestions(questions);
        setSingleQuestion(questions[Math.floor(Math.random() * questions.length)]);
      });
  }, []);

  const [domWriting, setDomWriting] = useState('Nothing Here!');

  const handleClick = (e) => {
    console.warn(`You clicked ${e.target.id}`);
    setDomWriting(`You clicked ${e.target.id}! Check the Console!`);
  };

  return (
    <div className='App'>
      <h2>INSIDE APP COMPONENT</h2>
      <div>
        <h1>{singleQuestion.question}</h1>
        <p>{showAnswer && singleQuestion.correctAnswer}</p>
        {showAnswer ? ''
          : <div>
            <Button id="Popover1" type="button">
              Launch Popover
      </Button>
            <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle}>
              <PopoverHeader>Possible Answers</PopoverHeader>
              <PopoverBody>
                <ul>
                  {singleQuestion.possibleAnsers?.map((pa, i) => <li key={i}>{pa}</li>)}
                </ul>
              </PopoverBody>
              {/* <PopoverBody>{singleQuestion.possibleAnsers?.join(', ')}
            </PopoverBody> */}
            </Popover>
          </div>}

        <Button color="info" onClick={hClick}>
          {showAnswer ? 'Get Another Question' : 'Get Answer'}
        </Button>
        <br></br>

        <button
          id='this-button'
          className='btn btn-info'
          onClick={handleClick}
        >
          I am THIS button
        </button>
      </div>
      <div>
        <button
          id='that-button'
          className='btn btn-primary mt-3'
          onClick={handleClick}
        >
          I am THAT button
        </button>
      </div>
      <h3>{domWriting}</h3>
    </div>
  );
}

export default App;
