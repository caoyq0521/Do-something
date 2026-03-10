// 界面3.3 - 标准数轴，可点击1/5/10/20，区间标绿
function View3SizeStandard() {
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const clickableNumbers = [1, 5, 10, 20];

  const handleNumberClick = (num) => {
    if (clickableNumbers.includes(num)) {
      if (selectedNumbers.includes(num)) {
        setSelectedNumbers(selectedNumbers.filter(n => n !== num));
      } else {
        setSelectedNumbers([...selectedNumbers, num]);
      }
    }
  };

  // 获取需要高亮的区间（包括该数字）
  const getHighlightedNumbers = () => {
    const highlighted = [];
    selectedNumbers.forEach(num => {
      for (let i = 0; i <= num; i++) {
        if (!highlighted.includes(i)) {
          highlighted.push(i);
        }
      }
    });
    return highlighted;
  };

  const highlightedNumbers = getHighlightedNumbers();

  return (
    <div className="py-8">
      <p className="text-center text-gray-600 mb-8">
        点击数字 1、5、10、20 查看对应区间（数轴区间变绿）
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

      {/* 标准数轴 */}
      <div className="relative py-12">
        <NumberLine 
          highlightNumbers={highlightedNumbers} 
          showArrows={true}
          onNumberClick={handleNumberClick}
        />
      </div>
    </div>
  );
}
