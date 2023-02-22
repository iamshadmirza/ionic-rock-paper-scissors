import { IonButton, IonIcon } from "@ionic/react";
import { useCallback, useEffect, useState } from "react";
import { shareOutline } from "ionicons/icons";
import "./GameContainer.css";
import { Share } from "@capacitor/share";

const choiceArray = ["rock" as const, "paper" as const, "scissors" as const];
type ChoiceType = typeof choiceArray[number];
type WinnerType = "user" | "computer" | "draw";

const priorityMap = {
  scissors: "paper",
  rock: "scissors",
  paper: "rock",
};

const GameContainer = () => {
  const [userChoice, setUserChoice] = useState<ChoiceType | null>(null);
  const [compChoice, setCompChoice] = useState<ChoiceType | null>(null);
  const [winner, setWinner] = useState<WinnerType | null>(null);
  const [userScore, setUserScore] = useState(0);
  const [compScore, setCompScore] = useState(0);

  const onSelect = (choice: ChoiceType) => {
    setUserChoice(choice);
    setCompChoice(getComputerChoice());
  };

  const getComputerChoice = (): ChoiceType => {
    const random = Math.floor(Math.random() * 3);
    return choiceArray[random];
  };

  const getWinner = useCallback((): WinnerType | null => {
    if (userChoice === null) return null;
    if (userChoice === compChoice) return "draw";
    if (priorityMap[userChoice] === compChoice) {
      return "user";
    }
    return "computer";
  }, [userChoice, compChoice]);

  useEffect(() => {
    const whoWon = getWinner();
    if (!whoWon) return;
    setWinner(whoWon);
    if (whoWon === "user") {
      setUserScore((prevValue) => prevValue + 1);
    }
    if (whoWon === "computer") {
      setCompScore((prevValue) => prevValue + 1);
    }
  }, [userChoice, compChoice, getWinner]);

  const handleResultShare = async () => {
    await Share.share({
      title: "Checkout my result in rock, paper, scissors",
      text: `My score is User: ${userScore} and Computer: ${compScore}`,
      url: "http://gameurl.com/",
      dialogTitle: "Share with buddies",
    });
  };

  return (
    <div className="container">
      <div className="top-container">
        <IonButton
          className="share-button"
          color="primary"
          expand="block"
          onClick={handleResultShare}
        >
          Share <IonIcon slot="end" icon={shareOutline}></IonIcon>
        </IonButton>
        <div className="score-sheet">
          <h2>Score</h2>
          <div className="score-container">
            <div className="score-board">
              <p className="score-name">User</p>
              <p className="score-value">{userScore}</p>
            </div>
            <div className="score-board">
              <p className="score-name">Computer</p>
              <p className="score-value">{compScore}</p>
            </div>
          </div>
        </div>
      </div>
      <div>
      {winner && <p className="winner-text">You selected {userChoice} while computer selected {compChoice}</p>}
      {winner && 
        (winner === "draw" ? (
          <p className="winner-text">Match was a draw</p>
        ) : (
          <p className="winner-text">{winner} is winner</p>
        ))}
      </div>
      <div className="user-choice">
        <IonButton color="primary" onClick={() => onSelect("rock")}>
          Rock 🪨
        </IonButton>
        <IonButton color="secondary" onClick={() => onSelect("paper")}>
          Paper 📄
        </IonButton>
        <IonButton color="tertiary" onClick={() => onSelect("scissors")}>
          Scissor ✂️
        </IonButton>
      </div>
    </div>
  );
};

export default GameContainer;
