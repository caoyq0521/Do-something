// 数轴模块
function NumberLineModule() {
  const [activeView, setActiveView] = useState(1);
  const views = [
    { id: 1, name: '基础数轴', component: View1Basic },
    { id: 2, name: '拖拽练习', component: View2Drag },
    { id: 3, name: '带箭头闪烁', component: View3SizeWithArrows },
    { id: 4, name: '增强渐变', component: View3SizeEnhancedGradient },
    { id: 5, name: '标准区间', component: View3SizeStandard },
    { id: 6, name: '钱币对应', component: View4Money },
    { id: 7, name: '比较大小', component: View5Compare },
  ];
  const ActiveComponent = views.find(v => v.id === activeView)?.component || View1Basic;

  return (
    <div>
      <div className="flex justify-center gap-2 mb-8">
        {views.map((view) => (
          <button
            key={view.id}
            onClick={() => setActiveView(view.id)}
            className={`w-12 h-12 rounded-full font-bold text-lg transition-all ${activeView === view.id ? 'bg-blue-600 text-white shadow-lg scale-110' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
          >
            {view.id}
          </button>
        ))}
      </div>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{views.find(v => v.id === activeView)?.name}</h2>
      </div>
      <div className="min-h-[400px]">
        <ActiveComponent />
      </div>
    </div>
  );
}
