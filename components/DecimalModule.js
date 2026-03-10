// 小数放大镜模块
function DecimalModule() {
  const [inputValue, setInputValue] = useState('');
  const [decimal, setDecimal] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleZoom = () => {
    const num = parseFloat(inputValue);
    if (isNaN(num) || num < 0 || num > 20) {
      alert('请输入0-20之间的数字');
      return;
    }
    setDecimal(num);
    setShowResult(true);
  };

  const handleReset = () => {
    setInputValue('');
    setDecimal(null);
    setShowResult(false);
  };

  const renderZoomedNumberLine = () => {
    if (!decimal) return null;

    const start = Math.max(0, Math.floor(decimal) - 2);
    const end = Math.min(20, Math.ceil(decimal) + 2);
    const range = end - start;
    const center = ((decimal - start) / range) * 100;

    return (
      <div className="relative py-12 px-10 mb-8" id="scale-container">
        {/* 放大后的数轴 */}
        <svg className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 w-full h-1" viewBox="0 0 100 1" preserveAspectRatio="none">
          <line x1="0" y1="0.5" x2="100" y2="0.5" stroke="#1f2937" strokeWidth="1" />
        </svg>
        
        {/* 放大后的刻度和数字 */}
        {Array.from({ length: range + 1 }, (_, i) => start + i).map((num) => {
          const position = ((num - start) / range) * 100;
          const isDecimal = Math.abs(num - decimal) < 0.01;
          
          return (
            <div key={num} className="absolute transform -translate-x-1/2" style={{ left: `${position}%` }}>
              <div className={`w-0.5 h-3 ${isDecimal ? 'bg-red-500' : 'bg-gray-800'}`} style={{ marginTop: '-12px' }} />
              <div className={`absolute top-2 left-1/2 transform -translate-x-1/2 text-sm font-semibold ${isDecimal ? 'text-red-500' : 'text-gray-700'}`}>
                {num}
              </div>
            </div>
          );
        })}

        {/* 指向小数的箭头 */}
        {(() => {
          const lineHeight = 40;
          const centerPosition = ((decimal - start) / range) * 100;
          
          return (
            <svg className="absolute inset-x-0 top-0 w-full" style={{ height: `${lineHeight}px` }} viewBox="0 0 100 40" preserveAspectRatio="none">
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10" 
                  markerHeight="7" 
                  refX="9" 
                  refY="3.5" 
                  orient="auto"
                >
                  <polygon points="0 0, 10 3.5, 0 7" fill="#000000" />
                </marker>
              </defs>
              <line 
                x1={`${centerPosition}%`}
                y1={`${lineHeight}`}
                x2={`${centerPosition}%`}
                y2="0"
                stroke="#000000"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
              />
            </svg>
          );
        })()}
        <div className="relative h-1 bg-gray-800 rounded-full">
                {/* 2px阴影线，颜色随数字变大而变深，紧挨着数轴下方 */}
                <svg className="absolute inset-x-0 top-2 w-full h-2" preserveAspectRatio="none" viewBox="0 0 100 2">
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
                </svg>
                
                {/* 右端箭头 - 指向左，向右偏移30px并与数轴连接，加粗 */}
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2" style={{ marginRight: '-30px' }}>
                  <svg width="46" height="24" viewBox="0 0 46 24" fill="none">
                    <rect x="0" y="8" width="30" height="8" fill="#374151" />
                    <path d="M46 12L34 4L34 8L30 8L30 16L34 16L34 20L46 12Z" fill="#374151" />
                  </svg>
                </div>
                
                {Array.from({ length: 21 }, (_, i) => i).map((num) => {
                  const position = (num / 20) * 100;
                  const isHidden = hideNumbers.includes(num);
                  const isTargetPosition = targetPositions.includes(num);
                  return (
                    <div key={num} className="absolute transform -translate-x-1/2" style={{ left: `${position}%` }}>
                      <div className={`w-0.5 h-3 ${isTargetPosition ? 'bg-red-500' : 'bg-gray-800'}`} style={{ marginTop: '-12px' }} />
                      {!isHidden && <div className={`absolute top-2 left-1/2 transform -translate-x-1/2 text-sm font-semibold ${isTargetPosition ? 'text-red-500' : 'text-gray-700'}`}>{num}</div>}
                    </div>
                  );
                })}
              </div>
      </div>
    );
  };

  return (
    <div className="py-8">
      <p className="text-center text-gray-600 mb-8">
        小数放大镜 - 查看小数在数轴上的精确位置
      </p>

      <div className="max-w-md mx-auto space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            输入数字（支持小数）
          </label>
          <div className="relative">
            <input
              type="number"
              step="0.1"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="例如: 3.7"
              className="w-full text-center text-3xl font-bold border-none outline-none text-gray-800"
            />
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button onClick={handleZoom} className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">放大</button>
          <button onClick={handleReset} className="px-8 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors">重置</button>
        </div>

        {showResult && renderZoomedNumberLine()}
      </div>
    </div>
  );
}
