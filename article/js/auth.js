// 重要：这个文件不要上传到GitHub！
// 本地创建 auth.local.js，然后重命名为 auth.js

// Supabase配置
window.supabaseConfig = {
    url: 'https://gimpssdzcwrdubylyouo.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpbXBzc2R6Y3dyZHVieWx5b3VvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2NTA3ODYsImV4cCI6MjA4MDIyNjc4Nn0.1kKpKWcTmUjcc5Y_zrrqrTTS7FeoDD5P7yBLMGP-5pE', // 从Supabase获取
    adminPassword: 'azsxdcfv12345AZSXDCFV!@#$%' // 设置一个强密码
};

// 初始化Supabase
window.supabase = supabase.createClient(
    window.supabaseConfig.url, 
    window.supabaseConfig.anonKey
);

// 密码验证函数
window.verifyPassword = function(password) {
    return password === window.supabaseConfig.adminPassword;
};