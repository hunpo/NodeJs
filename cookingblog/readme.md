https://www.raddy.dev/blog/how-to-build-a-recipe-blog-using-node-js-and-mongodb-express-ejs-mongoose-crud/
Build a Recipe Blog using Node.js and MongoDB (Express, EJS, Mongoose…) CRUD – Video Tutorial

https://www.youtube.com/watch?v=OEdPH4fV7vY

运行: npm start
(需要在 mongodb网站上,维护数据库)

那什么叫做MVC 呢，其实MVC是 三个单词的简写，
分别是 Model（模型） View（视图） Controller（控制器）
分别解释一下
View视图，很好理解就是直接面向用户的视图层，它是供给用户操作的界面，是程序的外壳
Model模型 是核心的数据层，也是程序需要操作的数据
Controller 控制器层，介于视图和模型之间 负责根据用户从视图层的 输入操作，获取数据层（Model）中的数据，然后对其进行相应的操作->或处理数据库数据或回给用户对应反馈
这三层是紧密联系在一起的，但又是互相独立的，每一层内部的变化不影响其他层。每一层都对外提供接口，供上面一层调用。这样一来，软件就可以实现模块化，修改外观或者变更数据都不用修改其他层，大大方便了维护和升级

/js/script.js 用于main.ejs
数据库中的 Schema，为数据库对象的集合。schema 是 mongoose 里会用到的一种数据模式，可以理解为表结构的定义；每个 schema会映射到 mongodb 中的一个 collection，它不具备操作数据库的能力。
定义好了 Schema，接下就是生成 Model。
model是由 schema生成的模型，可以对数据库的操作。

参照修改DNS,Enter 208.67.222.222 and 208.67.220.220 in the DNS server fields
https://use.opendns.com/