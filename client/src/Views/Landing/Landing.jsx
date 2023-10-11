import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import fondohallown from './fondohallown.png';
import styles from './Landing.module.css';

const Landing = () => {
  return (
    <div >
      <Navbar />
      <div className={styles.contenedor} >
                <img className={styles.imagen} />
                <h1 className={styles.letrash1}>Video Games</h1>
                
     </div>
      <div>
     
      <div >
        <div className={styles.contentContainer}>
        <h2>Gammer</h2>
        <p>
          Esta página ha sido creada con el objetivo de mostrar todos los
          videojuegos creados hasta el día de hoy. En esta plataforma, podrás
          explorar desde los juegos más antiguos hasta los más recientes. Aquí
          encontrarás detalles esenciales de cada juego, como las plataformas en
          las que están disponibles, su género, su calificación, la fecha de
          lanzamiento y, lo más importante, una breve descripción del juego que
          te motivará a jugarlo.
        </p>
        <h2>Creador Gammer</h2>
        <p>
          ¡Si eres el orgulloso creador de tu propio videojuego, te invitamos a
          compartirlo con nuestra comunidad! Simplemente dirígete a la sección
          "Crear" y publica tu valiosa creación. ¡Es hora de mostrar al mundo tu
          talento en el mundo de los videojuegos!
        </p>
        </div>
      </div>
      <img className={styles.backgroundImage} src={fondohallown} alt='fondo halloween' />
      </div>
    </div>
  );
};

export default Landing;
