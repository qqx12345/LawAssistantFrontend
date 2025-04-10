/**
 * 事件工具函数
 * 处理各种事件触发和分发功能
 */

/**
 * 刷新历史侧边栏
 * 通过自定义事件触发界面更新
 */
export const refreshHistorySidebar = () => {
  // 创建一个自定义事件，通知应用刷新历史记录
  const refreshEvent = new Event("refresh-history");
  window.dispatchEvent(refreshEvent);
};
