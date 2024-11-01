// 获取网站图标
function getFavicon() {
  let favicon = document.querySelector('link[rel="icon"][sizes="192x192"]')
    || document.querySelector('link[rel="icon"][sizes="180x180"]')
    || document.querySelector('link[rel="icon"][sizes="128x128"]')
    || document.querySelector('link[rel="shortcut icon"]')
    || document.querySelector('link[rel="icon"]');

  if (favicon) {
    return favicon.href;
  }
  
  return `${window.location.origin}/favicon.ico`;
}

// 创建二维码
function createQRCode() {
  console.log('开始创建二维码');
  
  // 创建二维码容器
  const qrContainer = document.createElement('div');
  qrContainer.id = 'page-qr-code';
  
  // 创建二维码内部容器
  const qrInner = document.createElement('div');
  qrInner.id = 'qr-inner';
  qrContainer.appendChild(qrInner);
  
  // 创建网站图标容器
  const faviconContainer = document.createElement('div');
  faviconContainer.className = 'favicon-container';
  const faviconImg = document.createElement('img');
  faviconImg.src = getFavicon();
  faviconImg.alt = '网站图标';
  faviconContainer.appendChild(faviconImg);
  
  // 创建URL显示容器
  const urlContainer = document.createElement('div');
  urlContainer.className = 'url-container';
  urlContainer.textContent = window.location.hostname;
  
  // 将容器添加到页面
  document.body.appendChild(qrContainer);
  
  // 生成二维码
  try {
    const currentUrl = encodeURIComponent(window.location.href);
    const qrImage = document.createElement('img');
    qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${currentUrl}`;
    qrImage.alt = '页面二维码';
    qrInner.appendChild(qrImage);
    qrInner.appendChild(faviconContainer);
    qrContainer.appendChild(urlContainer);
    console.log('二维码生成成功');
  } catch (error) {
    console.error('生成二维码时出错:', error);
    qrInner.innerHTML = `<div style="color: red; font-size: 12px;">生成失败: ${error.message}</div>`;
  }

  // 添加点击切换大小的功能
  let isMinimized = false;
  qrContainer.addEventListener('click', function(e) {
    if (isMinimized) {
      qrContainer.classList.remove('minimized');
    } else {
      qrContainer.classList.add('minimized');
    }
    isMinimized = !isMinimized;
  });
}

// 等待页面加载完成后执行
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createQRCode);
} else {
  createQRCode();
} 