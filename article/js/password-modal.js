// 密码弹窗组件
class PasswordModal {
    constructor() {
        this.init();
    }
    
    init() {
        // 创建弹窗HTML结构
        const modalHTML = `
            <div id="passwordModal" class="password-modal" style="display: none;">
                <div class="modal-overlay"></div>
                <div class="modal-content">
                    <div class="modal-header">
                        <h3><i class="fas fa-lock"></i> 管理员验证</h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <p>请输入管理员密码：</p>
                        <input type="password" id="modalPassword" 
                               placeholder="输入密码" autocomplete="current-password">
                        <div id="modalMessage" class="modal-message"></div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary modal-cancel">取消</button>
                        <button class="btn btn-primary modal-confirm">确认</button>
                    </div>
                </div>
            </div>
        `;
        
        // 添加到页面
        if (!document.getElementById('passwordModal')) {
            document.body.insertAdjacentHTML('beforeend', modalHTML);
            this.bindEvents();
        }
    }
    
    bindEvents() {
        const modal = document.getElementById('passwordModal');
        const closeBtn = modal.querySelector('.modal-close');
        const cancelBtn = modal.querySelector('.modal-cancel');
        const confirmBtn = modal.querySelector('.modal-confirm');
        const overlay = modal.querySelector('.modal-overlay');
        
        // 关闭弹窗
        const closeModal = () => {
            modal.style.display = 'none';
            document.getElementById('modalPassword').value = '';
            document.getElementById('modalMessage').textContent = '';
        };
        
        closeBtn.addEventListener('click', closeModal);
        cancelBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', closeModal);
        
        // 确认按钮
        confirmBtn.addEventListener('click', () => {
            this.confirmPassword();
        });
        
        // 回车键确认
        document.getElementById('modalPassword').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.confirmPassword();
            }
        });
        
        // ESC键关闭
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display !== 'none') {
                closeModal();
            }
        });
    }
    
    // 显示弹窗
    show(callback) {
        this.callback = callback;
        const modal = document.getElementById('passwordModal');
        modal.style.display = 'block';
        document.getElementById('modalPassword').focus();
    }
    
    // 验证密码
    confirmPassword() {
        const password = document.getElementById('modalPassword').value;
        const messageEl = document.getElementById('modalMessage');
        
        if (!password) {
            messageEl.textContent = '请输入密码';
            messageEl.className = 'modal-message error';
            return;
        }
        
        if (window.verifyPassword(password)) {
            // 密码正确
            messageEl.textContent = '';
            messageEl.className = 'modal-message';
            
            // 关闭弹窗
            document.getElementById('passwordModal').style.display = 'none';
            document.getElementById('modalPassword').value = '';
            
            // 执行回调函数
            if (this.callback && typeof this.callback === 'function') {
                this.callback(true);
            }
        } else {
            // 密码错误
            messageEl.textContent = '密码错误';
            messageEl.className = 'modal-message error';
            document.getElementById('modalPassword').value = '';
            document.getElementById('modalPassword').focus();
            
            if (this.callback && typeof this.callback === 'function') {
                this.callback(false);
            }
        }
    }
}

// 初始化弹窗
window.passwordModal = new PasswordModal();