window.supabaseConfig = {
    url: '__SUPABASE_URL__',
    anonKey: '__SUPABASE_ANON_KEY__',
    adminPassword: '__ADMIN_PASSWORD__'
};

// 初始化Supabase
window.supabase = supabase.createClient(
    window.supabaseConfig.url, 
    window.supabaseConfig.anonKey
);

window.verifyPassword = function(password) {
    return password === window.supabaseConfig.adminPassword;
};
