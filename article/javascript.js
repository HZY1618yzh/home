// 示例API调用
const token = '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';

// 获取文章列表
async function getArticles() {
    const response = await fetch('https://api.github.com/repos/yourname/yourrepo/contents/articles.json', {
        headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json'
        }
    });
    return await response.json();
}
