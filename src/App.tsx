import React from 'react';
import Column from "./components/Column";
import styles from './App.module.scss';
import { useAppSelector } from "./hook";
import WelcomeModal from "./components/WelcomeModal";

function App() {
  const columns = useAppSelector(state => state.board.list)
  const userName = useAppSelector(state => state.user.item.name)

  return (
    <>
      <div className={styles.root}>
        <div className={styles.board}>
          {columns.map(i => <Column key={i.id} id={i.id} title={i.title} />)}
        </div>
      </div>
      {!userName && <WelcomeModal show={true} />}
    </>
  );
}

export default App;
