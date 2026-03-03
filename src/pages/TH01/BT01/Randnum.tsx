import React, { useState, useEffect } from 'react';

const Randnum: React.FC = () => {

  const [randnum, initrandnum] = useState(0);
  const [turns, initturns] = useState(10);
  const [input, initinput] = useState('');
  const [thongbao, setthongbao] = useState('');
  const [ans, ANS] = useState(false);

  useEffect(() => {
    initrandnum(Math.floor(Math.random() * 100) + 1);
  }, []);

  const solve = () => {
    if (!input) {
      setthongbao('Vui lòng nhập một số!');
      return;
    }

    const num = Number(input);

    if (num < randnum) {
      setthongbao('Bạn đoán quá thấp!');
    } else if (num > randnum) {
      setthongbao('Bạn đoán quá cao!');
    } else {
      setthongbao('Chúc mừng! Bạn đã đoán đúng!');
      ANS(true);
    }
    const luot = turns - 1;
    initturns(luot);
    if (luot === 0) {
      setthongbao(`Bạn đã hết lượt! Số đúng là: ${randnum}`);
    }
    initinput('');
  };

  const Restart = () => {
    initrandnum(Math.floor(Math.random() * 100) + 1);
    initturns(10);
    initinput('');
    ANS(false);
  };

  return (
    <div>
      <h1> Trò Chơi Đoán Số </h1>
      <p> {thongbao} </p>
      <p> Lượt còn lại: {turns}</p>

      {!ans && turns > 0 && (
        <div>
          <input
            type="number"
            value={input}
            onChange={(e) => initinput(e.target.value)}
            placeholder="Nhập số từ 1 đến 100"
          />
          <button onClick={solve}>
            Đoán
          </button>
        </div>
      )}
      {(ans || turns === 0) && (
        
        <button onClick={Restart}>
          Chơi Lại
        </button>
      )}
    </div>
  );
};

export default Randnum;
