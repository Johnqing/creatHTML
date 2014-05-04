内容管理系统
=========
> 一个简单的编辑系统，统计添加内容来，生成相应的列表页和相应的单页。当然这些文件都是静态文件。

## 配置

+ 配置 `config.js`

```
module.exports = {
	root: 'dist',
	single: 'single',
	xxx1: {
		cat: 'xxx2'
	}
}
```

`root` : 文件生成后存放目录

`xxx1` : 当前栏目名，文件生成后

`single` : 文件生成后，单页存放目录(这个目录会在xxx1内，每一个xxx1都会有一个)

`xxx2` : 当前这个栏目的描述

+ 在根本目下， `npm install`

## 使用

配置完成后，运行：

```
node index
```
## 文件拷贝

编辑完成后，可通过修改bat文件，把文件copy到相应的上传目录



