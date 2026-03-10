// 界面1 - 基础数轴
function View1Basic() {
  return (
    <div className="py-8">
      <p className="text-center text-gray-600 mb-8">
        基础数轴展示
      </p>
      <NumberLine highlightNumbers={[1, 5, 10, 20]} showArrows={true} />
    </div>
  );
}
