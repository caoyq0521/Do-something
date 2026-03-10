// 界面3.2 - 增强渐变数轴
function View3SizeEnhancedGradient() {
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const numbers = Array.from({ length: 21 }, (_, i) => i);

  const handleNumberClick = (num) => {
    if (selectedNumbers.includes(num)) {
      setSelectedNumbers(selectedNumbers.filter(n => n !== num));
    } else {
      setSelectedNumbers([...selectedNumbers, num]);
    }
  };

  return (
    <div className="py-8">
      <p className="text-center text-gray-600 mb-8">
        点击数字查看对应数量的圆片（增强渐变效果）
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

      {/* 增强渐变粗细的数轴 */}
      <div className="relative py-12">
        {/* 更明显的渐变粗细数轴线 */}
        <svg className="w-full h-3" preserveAspectRatio="none" viewBox="0 0 100 12">
          <polygon points="0,4 100,0 100,12 0,8" fill="#1f2937" />
        </svg>
        
        {/* 右端箭头 - 指向左，向右偏移30px并与数轴连接 */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-0" style={{ transform: 'translateY(-50%) translateX(30px)' }}>
          <svg width="46" height="24" viewBox="0 0 46 24" fill="none">
            <rect x="0" y="8" width="30" height="8" fill="#374151" />
            <path d="M46 12L34 4L34 8L30 8L30 16L34 16L34 20L46 12Z" fill="#374151" />
          </svg>
        </div>
        
        <div className="absolute inset-0 px-4" style={{ top: '48px' }}>
          {numbers.map((num) => {
            const position = (num / 20) * 100;
            const tickHeight = 8 + (num / 20) * 12; // 增强刻度高度
            const fontSize = 14 + (num / 20) * 16; // 增强字体大小
            const isSelected = selectedNumbers.includes(num);
            
            return (
              <div
                key={num}
                className="absolute transform -translate-x-1/2"
                style={{ left: `${position}%` }}
              >
                {/* 刻度线 */}
                <div 
                  className="w-1 bg-gray-800"
                  style={{ 
                    height: `${tickHeight}px`,
                    marginTop: `-${tickHeight}px`
                  }}
                />
                
                {/* 数字 */}
                <div 
                  className="absolute top-2 left-1/2 transform -translate-x-1/2 font-bold cursor-pointer hover:scale-110 transition-transform"
                  style={{ fontSize: `${fontSize}px` }}
                  onClick={() => handleNumberClick(num)}
                >
                  {num}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
