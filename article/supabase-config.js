// Supabase配置模块
const supabaseConfig = {
    url: 'https://gimpssdzcwrdubylyouo.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpbXBzc2R6Y3dyZHVieWx5b3VvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2NTA3ODYsImV4cCI6MjA4MDIyNjc4Nn0.1kKpKWcTmUjcc5Y_zrrqrTTS7FeoDD5P7yBLMGP-5pE', // 将在auth.js中设置
    adminPassword: 'azsxdcfv12345AZSXDCFV!@#$%' // 将在auth.js中设置
};

// 初始化Supabase客户端
function initSupabase() {
    if (!supabaseConfig.url || !supabaseConfig.anonKey) {
        console.error('Supabase配置不完整');
        return null;
    }
    
    return supabase.createClient(supabaseConfig.url, supabaseConfig.anonKey);
}

// 获取Supabase配置
function getSupabaseConfig() {
    return { ...supabaseConfig };
}