// 页面跳转函数
function go(page) {
  window.location.href = page;
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
  // 校验登录状态
  if (!localStorage.getItem('authed')) {
    window.location.href = '/login.html';
    return;
  }

  // 获取用户信息（这里假设从localStorage获取，实际项目中可能从API获取）
  const username = localStorage.getItem('username') || 'XXX';
  const userDepartment = localStorage.getItem('userDepartment') || '北京区部';
  const userDivision = localStorage.getItem('userDivision') || '零售部';
  
  // 获取仓库信息
  let warehouseInfo = 'SP003810 京丰台万达AD MEGA';
  try {
    const selectedWarehouse = JSON.parse(localStorage.getItem('selectedWarehouse'));
    if (selectedWarehouse && selectedWarehouse.code && selectedWarehouse.name) {
      warehouseInfo = `${selectedWarehouse.code} ${selectedWarehouse.name}`;
    }
  } catch (e) {
    console.warn('无法解析仓库信息:', e);
  }
  
  // 更新用户信息显示
  document.getElementById('user-name').textContent = username;
  document.getElementById('user-department').textContent = userDepartment;
  document.getElementById('user-division').textContent = userDivision;
  document.getElementById('current-warehouse').textContent = warehouseInfo;

  // 返回按钮事件
  document.getElementById('back-btn').addEventListener('click', function() {
    // 清除登录状态
    localStorage.removeItem('authed');
    localStorage.removeItem('username');
    localStorage.removeItem('selectedWarehouse');
    
    // 跳转到登录页面
    window.location.href = '/login.html';
  });

  // 九宫格按钮事件
  document.getElementById('go-assign').addEventListener('click', () => go('/assign.html'));
  document.getElementById('go-in').addEventListener('click', () => go('/in.html'));
  document.getElementById('go-out').addEventListener('click', () => go('/out.html'));
  document.getElementById('go-sync').addEventListener('click', () => go('/sync.html'));
  document.getElementById('go-settings').addEventListener('click', () => go('/settings.html'));
});