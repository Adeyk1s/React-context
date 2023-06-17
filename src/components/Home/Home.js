import React, {useContext} from "react";
import Button from "../UI/Button/Button";

import Card from "../UI/Card/Card";
import styles from "./Home.module.css";
import AuthContext from "../../store/auth-context";

const Home = (props) => {
  const ctx = useContext(AuthContext);
  return (
    <Card className={styles.home}>
      <h1>Рады Вас Видеть Снова!</h1>
    </Card>
  );
};

export default Home;
