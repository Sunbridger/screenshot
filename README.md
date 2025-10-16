# 📊 抖音、百度热搜数据自动采集项目

本项目自动采集抖音和百度热搜榜单数据，并每天定时更新到仓库中。

## 🌟 项目特点

- **自动定时采集**：每天北京时间10:00、12:00、14:00、16:00自动运行
- **双平台支持**：同时采集抖音和百度热搜数据
- **数据持久化**：以JSON格式存储历史数据
- **开源透明**：完整代码公开，可自行部署
- **轻量高效**：基于Node.js实现，运行快速

## 📂 数据结构

采集的数据分别存储在`data-douyin/`和`data-baidu/`目录下，按日期命名：

```
data-douyin/
├── 2025-10-16.json
└── 2025-10-17.json

data-baidu/
├── 2025-10-16.json
└── 2025-10-17.json
```

每个JSON文件包含当天的热搜榜单数据，数据结构如下：

```json
[
  {
    "id": "123456789",
    "title": "热门话题标题",
    "timestamp": 1730000000,
    "hot": 10000000,
    "url": "https://example.com/cover.jpg",
    "mobileUrl": "https://example.com/cover.jpg"
  }
]
```

## 🛠️ 如何使用

### 本地运行

1. 克隆仓库：
```bash
git clone https://github.com/Sunbridger/screenshot.git
cd screenshot
```

2. 安装依赖：
```bash
npm install
```

3. 运行采集脚本：
```bash
# 采集抖音热搜
node .github/scripts/douyin-hot-search.js

# 采集百度热搜
node .github/scripts/baidu-hot-search.js
```

### GitHub Actions 自动运行

项目已配置GitHub Actions工作流：

| 触发方式 | 时间/条件 |
|----------|-----------|
| 定时任务 | 每天UTC时间2点、4点、6点、8点（北京时间10点、12点、14点、16点） |
| 手动触发 | 通过GitHub仓库的Actions选项卡手动运行 |
| 推送触发 | 当main分支有推送时自动运行 |

## 📊 数据使用

您可以通过以下方式使用这些数据：

### 抖音数据
1. **直接引用原始JSON文件**：
```javascript
const douyinData = require('./data-douyin/2025-10-16.json');
```

2. **通过GitHub Raw URL访问**：
```javascript
// 抖音热搜数据
https://raw.githubusercontent.com/Sunbridger/screenshot/main/data-douyin/2025-10-16.json
```

### 百度数据
1. **直接引用原始JSON文件**：
```javascript
const baiduData = require('./data-baidu/2025-10-16.json');
```

2. **通过GitHub Raw URL访问**：
```javascript
// 百度热搜数据
https://raw.githubusercontent.com/Sunbridger/screenshot/main/data-baidu/2025-10-16.json
```

3. **构建自己的数据分析工具**：基于历史数据进行分析和可视化

## 📈 数据示例

### 抖音热搜示例（前5条）：
```json
[
  {
    "id": "2271445",
    "title": "2025维密大秀",
    "timestamp": 1760573845,
    "hot": 12113681,
    "url": "https://p3-sign.douyinpic.com/tos-cn-p-0015/...",
    "mobileUrl": "https://p3-sign.douyinpic.com/tos-cn-p-0015/..."
  }
]
```

## 🤝 贡献指南

欢迎贡献代码或提出改进建议：

1. Fork本仓库
2. 创建您的分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开Pull Request

## 📜 许可证

本项目采用 MIT License 开源。

---

<p align="center">
  <em>数据更新于: 2025-10-16 17:51:26
</p>