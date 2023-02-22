import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import GameContainer from '../components/GameContainer';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Rock Paper Scissors</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Rock Paper Scissors</IonTitle>
          </IonToolbar>
        </IonHeader>
        <GameContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
