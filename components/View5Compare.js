// 界面5 - 比较大小
function View5Compare() {
  const [myMoney, setMyMoney] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [arrowColors, setArrowColors] = useState({});

  const handleCompare = () => {
    const myMoneyNum = parseFloat(myMoney) || 0;
    const itemPriceNum = parseFloat(itemPrice) || 0;
    
    if (myMoneyNum < 0 || myMoneyNum > 20) {
      alert('我的钱必须在0-20之间');
      return;
    }
    if (itemPriceNum < 0 || itemPriceNum > 20) {
      alert('物品价格必须在0-20之间');
      return;
    }

    const colors = {};
    if (myMoneyNum > 0) {
      colors[myMoneyNum] = '#ef4444'; // 红色
    }
    if (itemPriceNum > 0) {
      colors[itemPriceNum] = '#000000'; // 黑色
    }
    setArrowColors(colors);
    setShowResult(true);
  };

  const handleReset = () => {
    setMyMoney('');
    setItemPrice('');
    setShowResult(false);
    setArrowColors({});
  };

  const handleMyMoneyChange = (e) => {
    let value = e.target.value;
    if (value === '') {
      setMyMoney('');
      setShowResult(false);
      return;
    }
    
    const num = parseFloat(value);
    if (!isNaN(num)) {
      if (num < 0) value = '0';
      if (num > 20) value = '20';
    }
    setMyMoney(value);
    setShowResult(false);
  };

  const handleItemPriceChange = (e) => {
    let value = e.target.value;
    if (value === '') {
      setItemPrice('');
      setShowResult(false);
      return;
    }
    
    const num = parseFloat(value);
    if (!isNaN(num)) {
      if (num < 0) value = '0';
      if (num > 20) value = '20';
    }
    setItemPrice(value);
    setShowResult(false);
  };

  return (
    <div className="py-8">
      <p className="text-center text-gray-600 mb-8">
        比较我的钱和物品价格
      </p>

      <div className="max-w-md mx-auto space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            我的钱
          </label>
          <div className="relative">
            <input
              type="number"
              value={myMoney}
              onChange={handleMyMoneyChange}
              placeholder="0-20"
              className="w-full text-center text-3xl font-bold border-none outline-none text-gray-800"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            物品价格
          </label>
          <div className="relative">
            <input
              type="number"
              value={itemPrice}
              onChange={handleItemPriceChange}
              placeholder="0-20"
              className="w-full text-center text-3xl font-bold border-none outline-none text-gray-800"
            />
          </div>
        </div>

        <div className="flex justify-center gap-4 mb-12">
          <button onClick={handleCompare} className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">比较</button>
          <button onClick={handleReset} className="px-8 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors">重置</button>
        </div>

        <NumberLine highlightNumbers={[1, 5, 10, 20]} showArrows={showResult} arrowColors={arrowColors} />
      </div>
    </div>
  );
}
