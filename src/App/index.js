import React, { useState, useEffect } from 'react';
import {
  Button, Popover,
  PopoverHeader, PopoverBody
} from 'reactstrap';
import './App.scss';
import getQuestions from './helpers/data/avatarData';

function App() {
  const [allQuestions, setAllQuestions] = useState([]);
  const [singleQuestion, setSingleQuestion] = useState({});
  const [showAnswer, setShowAnswer] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

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

  return (
    <div className='App'>
      <h2>AirBender Quiz</h2>
      <div>
        <h1>{singleQuestion.question}</h1>
        <p>{showAnswer && singleQuestion.correctAnswer}</p>
        {showAnswer ? ''
          : <div>
            <Button id="Popover1" type="button">
              Launch Popover
            </Button>
            <br></br>
            <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle} trigger="hover">
              <PopoverHeader>Possible Answers</PopoverHeader>
              <PopoverBody>
                <ul>
                  {singleQuestion.possibleAnsers?.map((pa, i) => <li key={i}>{pa}</li>)}
                </ul>
              </PopoverBody>
              {/* A Way to toggle with join()
              <PopoverBody>{singleQuestion.possibleAnserssingleQuestion.possibleAnsers?.join(', ')}
            </PopoverBody> */}
            </Popover>
          </div>}
        <br />
        <Button color="info" onClick={hClick}>
          {showAnswer ? 'Get Another Question' : 'Get Answer'}
        </Button>
      </div>
    </div>
  );
}

export default App;
