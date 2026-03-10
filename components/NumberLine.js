// 通用数轴组件
function NumberLine({ min = 0, max = 20, highlightNumbers = [], showArrows = true, gradientThickness = false, gradientFontSize = false, hideNumbers = [], showGradientBelow = false, arrowColors = {}, onNumberClick = null }) {
  const numbers = Array.from({ length: max - min + 1 }, (_, i) => min + i);
  
  const getThickness = (num) => {
    if (!gradientThickness) return 2;
    return 2 + (num / max) * 6;
  };
  
  const getFontSize = (num) => {
    if (!gradientFontSize) return 16;
    return 14 + (num / max) * 10;
  };

  // 获取箭头颜色
  const getArrowColor = (num) => {
    if (arrowColors[num]) return arrowColors[num];
    return '#ef4444';
  };

  // 获取所有需要显示箭头的数字（包括小数）
  const getArrowNumbers = () => {
    const arrowNums = [];
    Object.keys(arrowColors).forEach(key => {
      const num = parseFloat(key);
      if (!isNaN(num)) {
        arrowNums.push(num);
      }
    });
    return arrowNums;
  };

  return (
    <div className="relative py-12 px-4">
      <div className="relative h-1 bg-gray-800 rounded-full">
        {/* 区间高亮 - 绿色覆盖 */}
        {highlightNumbers.length > 0 && (
          <div 
            className="absolute top-0 h-full bg-green-400 rounded-full"
            style={{
              left: '0%',
              width: `${Math.max(...highlightNumbers) / 20 * 100}%`,
              opacity: 0.6
            }}
          />
        )}
        
        {gradientThickness && (
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: '#1f2937',
              clipPath: 'polygon(0 40%, 100% 0%, 100% 100%, 0 60%)',
            }}
          />
        )}

        {/* 2px阴影线，颜色随数字变大而变深，紧挨着数轴下方 */}
        {showGradientBelow  && <svg className="absolute inset-x-0 top-1.4 w-full h-1" preserveAspectRatio="none" viewBox="0 0 100 2">
          <defs>
            <linearGradient id="decimalGreenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#86efac" />
              <stop offset="25%" stopColor="#4ade80" />
              <stop offset="50%" stopColor="#22c55e" />
              <stop offset="75%" stopColor="#16a34a" />
              <stop offset="100%" stopColor="#15803d" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="100" height="2" fill="url(#decimalGreenGradient)" />
        </svg>}
        
        {/* 右端箭头 - 指向左，向右偏移30px并与数轴连接，加粗 */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2" style={{ marginRight: '-30px' }}>
          <svg width="46" height="24" viewBox="0 0 46 24" fill="none">
            <rect x="0" y="8" width="30" height="8" fill="#374151" />
            <path d="M46 12L34 4L34 8L30 8L30 16L34 16L34 20L46 12Z" fill="#374151" />
          </svg>
        </div>
        
        {numbers.map((num) => {
          const position = ((num - min) / (max - min)) * 100;
          const isHighlighted = highlightNumbers.includes(num);
          const isHidden = hideNumbers.includes(num);
          const isRedNumber = [1, 5, 10, 20].includes(num);
          
          return (
            <div
              key={num}
              className="absolute transform -translate-x-1/2"
              style={{ left: `${position}%` }}
            >
              {/* 刻度线只在上方显示 */}
              <div 
                className={`w-0.5 ${isRedNumber ? 'bg-red-500' : 'bg-gray-800'}`}
                style={{ 
                  height: `${12 + getThickness(num)}px`,
                  marginTop: `-${12 + getThickness(num)}px`
                }}
              />
              
              {!isHidden && (
                <div 
                  className={`absolute top-2 left-1/2 transform -translate-x-1/2 font-semibold ${
                    isRedNumber ? 'text-red-500' : 'text-gray-700'
                  } ${
                    onNumberClick ? 'cursor-pointer hover:scale-110 transition-transform' : ''
                  }`}
                  style={{ fontSize: `${getFontSize(num)}px` }}
                  onClick={() => onNumberClick && onNumberClick(num)}
                >
                  {num}
                </div>
              )}
            </div>
          );
        })}
        
        {/* 显示箭头（支持小数位置） */}
        {showArrows && getArrowNumbers().map((arrowNum) => {
          const position = ((arrowNum - min) / (max - min)) * 100;
          const arrowColor = getArrowColor(arrowNum);
          
          return (
            <div
              key={`arrow-${arrowNum}`}
              className="absolute transform -translate-x-1/2"
              style={{ left: `${position}%` }}
            >
              <div className={arrowColor === '#ef4444' ? 'absolute -top-20 left-1/2 transform -translate-x-1/2' : 'absolute -top-16 left-1/2 transform -translate-x-1/2'}>
                {/* 新箭头样式：竖线+三角形 */}
                <svg width="24" height={arrowColor === '#ef4444' ? '55' : '40'} viewBox={`0 0 24 ${arrowColor === '#ef4444' ? '55' : '40'}`} fill="none">
                  <rect x="10" y={arrowColor === '#ef4444' ? '0' : '0'} width="4" height={arrowColor === '#ef4444' ? '43' : '28'} fill={arrowColor} />
                  <path d={`M12 ${arrowColor === '#ef4444' ? '55' : '40'}L4 ${arrowColor === '#ef4444' ? '43' : '28'}h16L12 ${arrowColor === '#ef4444' ? '55' : '40'}z`} fill={arrowColor} />
                </svg>
                {/* 竖着写的标签 */}
                <div className="absolute -top-4 transform flex flex-col"
                  style={arrowColor === '#ef4444' ? { left: '-20px', height: '73px', top: 0 } : { left: '28px', height: '60px' }}>
                  {arrowColor === '#ef4444' ? 
                    ['我', '的', '钱'].map((char, i) => (
                      <span key={i} className="text-sm font-bold text-red-500" style={{ lineHeight: '1' }}>
                        {char}
                      </span>
                    )) :
                    ['物', '品', '价', '格'].map((char, i) => (
                      <span key={i} className="text-sm font-bold text-gray-800" style={{ lineHeight: '1' }}>
                        {char}
                      </span>
                    ))
                  }
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
