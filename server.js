const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const cors = require('cors');

// 允许跨域请求
app.use(cors({
    origin: 'https://hzy1618yzh.qzz.io'
}));

// 解析JSON请求
app.use(express.json());

// 静态文件目录（指向你的前端文件）
app.use(express.static(path.join(__dirname, 'public')));

// 文章数据存储路径
const DATA_DIR = path.join(__dirname, 'data');
const ARTICLES_FILE = path.join(DATA_DIR, 'articles.json');

// 确保数据目录存在
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

// 初始化文章数据文件
if (!fs.existsSync(ARTICLES_FILE)) {
    fs.writeFileSync(ARTICLES_FILE, JSON.stringify([]));
}

// 读取所有文章（列表页用）
app.get('/api/articles', (req, res) => {
    try {
        const articles = JSON.parse(fs.readFileSync(ARTICLES_FILE, 'utf8'));
        
        // 返回简化信息
        const simplifiedArticles = articles.map(art => ({
            title: art.title,
            code: art.code,
            createdAt: art.createdAt,
            summary: art.content.length > 150 
                ? art.content.substring(0, 150) + '...' 
                : art.content
        }));
        
        res.json(simplifiedArticles);
    } catch (error) {
        console.error('读取文章列表失败:', error);
        res.status(500).json({ error: '加载文章列表失败' });
    }
});

// 读取单篇文章（详情页用）
app.get('/api/articles/:code', (req, res) => {
    try {
        const articles = JSON.parse(fs.readFileSync(ARTICLES_FILE, 'utf8'));
        const article = articles.find(art => art.code === req.params.code);
        
        if (article) {
            res.json(article);
        } else {
            res.status(404).json({ error: '文章不存在' });
        }
    } catch (error) {
        console.error('读取文章失败:', error);
        res.status(500).json({ error: '加载文章失败' });
    }
});

// 发布新文章
app.post('/api/articles', (req, res) => {
    try {
        const { title, content, code, createdAt } = req.body;
        
        // 验证必要参数
        if (!title || !content || !code) {
            return res.status(400).json({ error: '缺少必要参数' });
        }
        
        // 读取现有文章
        const articles = JSON.parse(fs.readFileSync(ARTICLES_FILE, 'utf8'));
        
        // 检查编码是否已存在
        if (articles.some(art => art.code === code)) {
            return res.status(400).json({ error: '编码已存在' });
        }
        
        // 创建新文章对象
        const newArticle = {
            title,
            content,
            code,
            createdAt: createdAt || new Date().toISOString()
        };
        
        // 保存新文章
        articles.push(newArticle);
        fs.writeFileSync(ARTICLES_FILE, JSON.stringify(articles, null, 2));
        
        res.status(201).json({ success: true, code });
    } catch (error) {
        console.error('发布文章失败:', error);
        res.status(500).json({ error: '发布文章失败' });
    }
});

// 处理404
app.use((req, res) => {
    res.status(404).json({ error: '接口不存在' });
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`服务器运行在端口 ${PORT}`);
});
