# mini-webpack
# 实现功能
多个文件，合并成一个文件

# 基本思路
- 获取内容
- 获取依赖关系
- 根据依赖关系合并文件

由于文件类型较多和针对文件类型所要做的处理不同，有两种处理方式，**插件**和**loader**

# 插件
基于事件，在compile的过程中，触发钩子，控制和实现对源代码的操作
## 目标
webpack的插件实现是基于tapable库
- 学习tapable库的基本使用
- 结合webpack文档和plugin的使用方式，理解tapable，学习插件的实现

# loader
一般处理不是js的文件（也能处理js文件），如：json，txt，vue等，每一种loader一般最会用一种单一的操作，和众多的loader形成链，即：输入（css文件source）->css-loader->输出（已处理的css）
## 基本处理
一般操作source（原文件），如：对json源文件进行解析（JSON.stringify(source)）生成js可以识别的数据
## 目标
尝试实现常见文件的解析
