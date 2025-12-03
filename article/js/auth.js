window.supabaseConfig = {
    url: 'https://gimpssdzcwrdubylyouo.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpbXBzc2R6Y3dyZHVieWx5b3VvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2NTA3ODYsImV4cCI6MjA4MDIyNjc4Nn0.1kKpKWcTmUjcc5Y_zrrqrTTS7FeoDD5P7yBLMGP-5pE',
    adminPassword: (() => {
        const parts = [
            'azsxdc', 'fv1234', '5AZSXD', 'CFV!@#', '$%'
        ];
        return parts.join('').replace(' ', '');
    })()
};

window.supabase = supabase.createClient(
    window.supabaseConfig.url,
    window.supabaseConfig.anonKey
);

window.verifyPassword = function(password) {
    return password === window.supabaseConfig.adminPassword;
};
