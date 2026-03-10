import React, { useState } from 'react';

const Game: React.FC = () => {
    const choices = ['Kéo', 'Búa', 'Bao'];
    const [user, setUser] = useState('');
    const [bot, setBot] = useState('');
    const [result, setResult] = useState('');

    const play = (choice: string) => {
        const botChoice = choices[Math.floor(Math.random() * 3)];
        let status = '';

        if (choice === botChoice) status = 'Hòa';
        else if (
            (choice === 'Búa' && botChoice === 'Kéo') ||
            (choice === 'Kéo' && botChoice === 'Bao') ||
            (choice === 'Bao' && botChoice === 'Búa')
        ) {
            status = 'Thắng';
        } else {
            status = 'Thua';
        }

        setUser(choice);
        setBot(botChoice);
        setResult(status);
    };
    const Restart = () => {
        setUser('');
        setBot('');
        setResult('');
    };
    return (
        <>
            <h1>Kéo Búa Bao</h1>
            <div>
                {choices.map((c) => (
                    <button key={c} onClick={() => play(c)}>
                        {c}
                    </button>
                ))}
            </div>
            {user && (
                <div>
                    <p>Bạn: {user} | Bot: {bot} | Kết quả: <b>{result}</b></p>
                    <button onClick={Restart}>Chơi lại</button>
                </div>
            )}
        </>
    );
};

export default Game;