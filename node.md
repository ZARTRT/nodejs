##### 一、node模块机制

Node本身是由模块组成的，采用commonJS/ESM规范

node生态环境也是由数以万计的模块（包）组成的

每个文件都是一个模块，都有自己的作用域

在一个文件中定义的变量、函数、类，都是私有的，对其他文件不可见（比如命名冲突）

在node中，模块的家在是运行时同步加载的（先加载进来，然后再去执行别的代码）

模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了

##### 二、模块加载机制require/export

路径类型

1.绝对/相对路径，查找路径下是否存在文件

2.内置模块，直接返回模块

3.没有路径，根据所在的父模块确定安装目录，在目录中查找入口文件，比如第三方库lodash

4.缓存的概念

​	4.1缓存中存在的，直接返回

​	4.2内置模块，则直接加载

​	4.3根据找到的文件创建新模块并缓存

##### 三、模块生态机制管理：npm

npm代指node的模块生态，又代指模块安装CLI工具

通过package.json来描述项目基本信息和依赖，组成树状结构

使用nvm管理node版本，使用nrm管理npm源，使用npx执行命令

使用yarn加速包下载

使用scripts组织工程化脚本入口

##### 四、Nodejs能力

1.跨平台：前端、移动端、PC端

2.node后端：测试、部署、Apirpc、微服务、Web应用

3.前端框架演进：react/vue

4.工具：各种预编译、构建工具 Webpack/gulp、工程化Hack技巧、npm等

##### 五、Nodejs架构

<img src="node.assets/image-20220701102950528.png" alt="image-20220701102950528" style="zoom: 50%;" align="left"/>

##### X、Node缺点

node虽然无所不能，但也有其不适合的事情，比如计算量比较大的事情。node更适合做高I/O（吞吐量）的事情