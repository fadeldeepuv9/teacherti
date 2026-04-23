# TeacherTI

一个面向教师群体的娱乐型人格测试原型，灵感来自 MBTI / SBTI 的传播形式，但题目、维度和结果都改成了老师日常场景。

当前版本是三选一玩法，结果会生成 TeacherTI 四字母人格码和全大写英文人格名，并精准对应一位原型人物：其中 5 型对应张雪峰、罗翔、李永乐、戴建业、张桂梅，剩余 11 型由世界范围内的著名教育史人物补齐。

## 四个维度

- `I/A` CLASS ENERGY：IGNITE / ANCHOR（燃场唤醒 / 镇场控局）
- `S/E` TEACHING PATH：SCAFFOLD / EXPLORE（搭脚手架 / 野路生长）
- `N/C` STUDENT PUSH：NURTURE / CHALLENGE（先接住人 / 先戳醒人）
- `P/R` GROWTH MOVE：POLISH / RELEASE（精修打磨 / 放手试错）

## 文件结构

- `index.html`：页面结构
- `styles.css`：界面样式和响应式布局
- `app.js`：三选一题库、计分逻辑、16 型单一原型人物画像、英文人格名和复制文案
- `assets/classroom-mark.svg`：本地视觉资产

## 修改入口

- 改题目：编辑 `app.js` 里的 `questions`
- 改维度解释：编辑 `app.js` 里的 `axes`
- 改 16 种类型、英文人格名和原型人物：编辑 `app.js` 里的 `typeProfiles`

直接用浏览器打开 `index.html` 即可运行。

## GitHub Pages 发布

这个项目已经补好了 GitHub Pages 工作流：

- `.github/workflows/deploy-pages.yml`
- `.nojekyll`

最短上线步骤：

1. 在 GitHub 新建一个仓库，比如 `teacher-ti`
2. 把当前本地仓库推上去：

```bash
git remote add origin <你的仓库地址>
git push -u origin main
```

3. 打开 GitHub 仓库设置：
   `Settings -> Pages`
4. 在 `Build and deployment` 里选择：
   `Source: GitHub Actions`
5. 之后每次推送到 `main`，GitHub 都会自动发布

如果你用的是项目页，地址通常会是：

`https://<你的用户名>.github.io/<仓库名>/`

如果你以后绑定自定义域名，也可以继续沿用这套工作流。
