// Supabase配置
window.supabaseConfig = {
    url: 'https://gimpssdzcwrdubylyouo.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpbXBzc2R6Y3dyZHVieWx5b3VvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2NTA3ODYsImV4cCI6MjA4MDIyNjc4Nn0.1kKpKWcTmUjcc5Y_zrrqrTTS7FeoDD5P7yBLMGP-5pE', // 从Supabase获取
};//关于密码~自己试100年吧！有字符哦

// 初始化Supabase
window.supabase = supabase.createClient(
    window.supabaseConfig.url, 
    window.supabaseConfig.anonKey
);

// 密码验证函数
window.verifyPassword = function (password) {
    if (password.length !== 26) return false;
    
    const mod = BigInt(1e9 + 7);
    
    // 第一个哈希：从右到左
    let sum = 0n;
    let px = 1n;
    for (let i = 25; i >= 0; i--) {
        const charCode = BigInt(password.charCodeAt(i));
        sum = (sum + (px * charCode) % mod) % mod;
        px = (px * 128n) % mod;
    }
    if (sum !== 927786101n) return false;
    
    // 第二个哈希：从左到右
    sum = 0n;
    px = 1n;
    for (let i = 0; i < 26; i++) {
        const charCode = BigInt(password.charCodeAt(i));
        sum = (sum + (px * charCode) % mod) % mod;
        px = (px * 128n) % mod;
    }
    if (sum !== 687301695n) return false;
    
    // 第三个哈希：自定义哈希1
    sum = 0n;
    for (let i = 0; i < 26; i++) {
        const charCode = BigInt(password.charCodeAt(i));
        sum = (((sum << 5n) - sum) + charCode + BigInt(i % 7)) % mod;
    }
    if (sum !== 927904281n) return false;
    
    // 第四个哈希：自定义哈希2
    sum = 0n;
    for (let i = 25; i >= 0; i--) {
        const charCode = BigInt(password.charCodeAt(i));
        sum = (((sum << 5n) - sum) + charCode + BigInt(i % 3)) % mod;
    }
    
    return sum === 89723934n;
}
// long long verifyPassword(string password){
// 	if(password.size()!=26) return 0;
// 	long long sum=0,px=1,mod=1e9+7;
// 	for(int i=25;i>=0;i--){
// 		sum=(sum+px*password[i]%mod)%mod;
// 		px=px*128%mod;
// 	}
// 	if(sum!=927786101) return 0;
// 	sum=0,px=1;
// 	for(int i=0;i<26;i++){
// 		sum=(sum+px*password[i]%mod)%mod;
// 		px=px*128%mod;
// 	}
// 	if(sum!=687301695) return 0;
// 	sum=0;
// 	for(int i=0;i<26;i++){
// 		sum=(((sum<<5)-sum)+password[i]+i%7)%mod;
// 	}
// 	if(sum!=927904281) return 0;
// 	sum=0;
// 	for(int i=25;i>=0;i--){
// 		sum=(((sum<<5)-sum)+password[i]+i%3)%mod;
// 	}
// 	return sum==89723934;
// }
