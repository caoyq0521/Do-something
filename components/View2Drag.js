// 界面2 - 拖拽练习
function View2Drag() {
  const [items, setItems] = useState([
    { id: 1, value: 3, placed: false, x: 0, y: 0 },
    { id: 2, value: 7, placed: false, x: 0, y: 0 },
    { id: 3, value: 15, placed: false, x: 0, y: 0 },
  ]);
  const [dragging, setDragging] = useState(null);
  const [containerRef, setContainerRef] = useState(null);
  const targetPositions = [3, 7, 15];

  const handleDragStart = (e, itemId) => {
    e.preventDefault();
    const item = items.find(i => i.id === itemId);
    if (!item || item.placed) return;
    
    setDragging(itemId);
    const rect = containerRef.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    setItems(prev => prev.map(i => 
      i.id === itemId 
        ? { ...i, x: clientX - rect.left, y: clientY - rect.top }
        : i
    ));
  };

  const handleDragMove = (e) => {
    if (!dragging) return;
    
    const rect = containerRef.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    setItems(prev => prev.map(i => 
      i.id === dragging 
        ? { ...i, x: clientX - rect.left, y: clientY - rect.top }
        : i
    ));
  };

  const handleDragEnd = () => {
    if (!dragging) return;
    
    const item = items.find(i => i.id === dragging);
    if (!item) return;
    
    // 检查是否在目标位置附近
    const rect = containerRef.getBoundingClientRect();
    const targetElements = containerRef.querySelectorAll('[data-target-position]');
    
    for (const targetEl of targetElements) {
      const targetRect = targetEl.getBoundingClientRect();
      const distance = Math.sqrt(
        Math.pow((item.x + rect.left) - (targetRect.left + targetRect.width / 2), 2) +
        Math.pow((item.y + rect.top) - (targetRect.top + targetRect.height / 2), 2)
      );
      
      if (distance < 50) {
        const targetValue = parseInt(targetEl.dataset.targetPosition);
        if (item.value === targetValue) {
          setItems(prev => prev.map(i => 
            i.id === dragging ? { ...i, placed: true, x: 0, y: 0 } : i
          ));
          break;
        }
      }
    }
    
    setDragging(null);
  };

  const getPlacedPosition = (value) => (value / 20) * 100;

  const reset = () => {
    setItems(prev => prev.map(i => ({ ...i, placed: false, x: 0, y: 0 })));
  };

  return (
    <div 
      ref={setContainerRef}
      className="relative select-none"
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
    >
      <div className="relative py-12 px-10 mb-8">
        <div className="relative h-1 bg-gray-800 rounded-full">
              {/* 2px阴影线，颜色随数字变大而变深，紧挨着数轴下方 */}
              <svg className="absolute inset-x-0 top-2 w-full h-2" preserveAspectRatio="none" viewBox="0 0 100 2">
                <defs>
                  <linearGradient id="dragGreenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#86efac" />
                    <stop offset="25%" stopColor="#4ade80" />
                    <stop offset="50%" stopColor="#22c55e" />
                    <stop offset="75%" stopColor="#16a34a" />
                    <stop offset="100%" stopColor="#15803d" />
                  </linearGradient>
                </defs>
                <rect x="0" y="0" width="100" height="2" fill="url(#dragGreenGradient)" />
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
              
              {targetPositions.map((pos) => {
                const position = (pos / 20) * 100;
                const isPlaced = items.find(i => i.value === pos)?.placed;
                return (
                  <div key={pos} className="absolute transform -translate-x-1/2" style={{ left: `${position}%`, top: '30px' }}>
                    <div className={`w-12 h-8 border-4 ${isPlaced ? 'border-green-500 bg-green-100' : 'border-red-500 bg-red-50'} rounded`} />
                  </div>
                );
              })}
              
              {items.filter(i => i.placed).map((item) => (
                <div key={`placed-${item.id}`} className="absolute transform -translate-x-1/2" style={{ left: `${getPlacedPosition(item.value)}%`, top: '30px' }}>
                  <div className="w-12 h-8 rounded-xl bg-white border-2 border-blue-800 flex items-center justify-center shadow-lg">
                    <span className="text-xl font-bold text-blue-800">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-100 rounded-2xl p-8 mt-16">
            <div className="flex justify-center gap-6 mb-6">
              {items.filter(i => !i.placed).map((item) => (
                <div
                  key={item.id}
                  className={`w-20 h-20 rounded-xl bg-white border-2 border-blue-800 flex items-center justify-center shadow-lg cursor-grab active:cursor-grabbing transition-transform ${dragging === item.id ? 'scale-110 opacity-50' : 'hover:scale-105'}`}
                  style={dragging === item.id ? { position: 'absolute', left: item.x, top: item.y, zIndex: 100 } : {}}
                  onMouseDown={(e) => handleDragStart(e, item.id)}
                  onTouchStart={(e) => handleDragStart(e, item.id)}
                >
                  <span className="text-3xl font-bold text-blue-800">{item.value}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-gray-600 mb-4">把数字拖到数轴正确的位置</p>
            <div className="flex justify-center">
              <button onClick={reset} className="px-8 py-3 bg-amber-500 text-white font-semibold rounded-full hover:bg-amber-600 transition-colors shadow-lg">
                重新开始
              </button>
            </div>
          </div>
        </div>
      );
}
