import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function Home() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      alert('Tempo esgotado!');
      saveSession(25 * 60);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, timeLeft]);

  const saveSession = async (duration) => {
    const { data, error } = await supabase
      .from('sessions')
      .insert([{ duration }]);

    if (error) {
      console.error('Erro ao salvar a sessão:', error);
    } else {
      console.log('Sessão salva com sucesso:', data);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  const buttonStyle = {
    backgroundColor: '#fff',
    color: '#000',
    border: 'none',
    padding: '1rem 2rem',
    margin: '0.5rem',
    fontSize: '1rem',
    cursor: 'pointer',
  };

  return (
    <div
      style={{
        backgroundColor: '#000',
        color: '#fff',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
      }}
    >
      <h1 style={{ fontSize: '5rem', marginBottom: '2rem' }}>
        {formatTime(timeLeft)}
      </h1>
      <div>
        <button onClick={() => setIsRunning(!isRunning)} style={buttonStyle}>
          {isRunning ? 'Pausar' : 'Iniciar'}
        </button>
        <button
          onClick={() => {
            setIsRunning(false);
            setTimeLeft(25 * 60);
          }}
          style={buttonStyle}
        >
          Reiniciar
        </button>
      </div>
    </div>
  );
}
