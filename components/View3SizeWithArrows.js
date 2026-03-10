// 界面3.1 - 带箭头数轴，绿色渐变阴影，闪烁圆点
function View3SizeWithArrows() {
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [blinkingNumber, setBlinkingNumber] = useState(null);
  const numbers = Array.from({ length: 21 }, (_, i) => i);

  // 渲染圆片，5个一列
  const renderDots = (count, blinkingNum) => {
    if (count === 0) return null;
    const cols = Math.ceil(count / 5);
    const dots = [];
    for (let col = 0; col < cols; col++) {
      const dotsInCol = Math.min(5, count - col * 5);
      const colDots = [];
      for (let row = 0; row < dotsInCol; row++) {
        const isLastDot = (col === cols - 1 && row === dotsInCol - 1);
        colDots.push(
          <div 
            key={`${col}-${row}`} 
            className={`w-2.5 h-2.5 rounded-full ${isLastDot && blinkingNum === count ? 'bg-yellow-400 animate-pulse' : 'bg-green-500'}`} 
          />
        );
      }
      dots.push(
        <div key={col} className="flex flex-col gap-0.5">
          {colDots}
        </div>
      );
    }
    return dots;
  };

  const handleNumberClick = (num) => {
    if (selectedNumbers.includes(num)) {
      setSelectedNumbers(selectedNumbers.filter(n => n !== num));
    } else {
      setSelectedNumbers([...selectedNumbers, num]);
      setBlinkingNumber(num);
      setTimeout(() => setBlinkingNumber(null), 2000);
    }
  };

  return (
    <div className="py-8">
      <p className="text-center text-gray-600 mb-8">
        点击数字查看对应数量的圆片（带闪烁效果）
      </p>

      {/* 重置按钮 */}
      <div className="flex justify-center mb-8">
        <button 
          onClick={() => setSelectedNumbers([])}
          className="px-8 py-3 bg-amber-500 text-white font-semibold rounded-full hover:bg-amber-600 transition-colors shadow-lg"
        >
          重置
        </button>
      </div>

      {/* 带绿色渐变阴影的数轴 */}
      <div className="relative py-12">
        {/* 绿色渐变阴影 */}
        
        <NumberLine 
          highlightNumbers={[1, 5, 10, 20]} 
          showArrows={true}
          showGradientBelow={true}
          onNumberClick={handleNumberClick}
        />
        
        {/* 圆点显示在对应数字下方 */}
        <div className="absolute inset-0 px-4" style={{ top: '140px' }}>
          {numbers.map((num) => {
            const position = (num / 20) * 100;
            const isSelected = selectedNumbers.includes(num);
            
            return (
              <div
                key={num}
                className="absolute transform -translate-x-1/2"
                style={{ left: `${position}%` }}
              >
                {isSelected && num > 0 && (
                  <div className="flex gap-0.5">
                    {renderDots(num, blinkingNumber)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
