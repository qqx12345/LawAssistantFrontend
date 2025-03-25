const HistorySideBar = () => {
    return (
        <div>
            <div className="flex flex-col w-64 h-screen bg-gray-800">
                <div className="flex flex-row justify-between items-center p-4">
                    <div className="text-white text-2xl">历史记录</div>
                    <div className="text-white text-2xl">清空</div>
                </div>
                <div className="flex flex-col p-4">
                    <div className="text-white text-xl">2021年7月</div>
                    <div className="text-white text-xl">2021年6月</div>
                    </div>
            </div>
        </div>
    )
}

export default HistorySideBar