---
title: css-note
sidebarDepth: 3
---

## CSS 思维导图

:::tip
思维导图还没有
:::

## CSS 简介

CSS指的是Cascading Style Sheet（层叠样式表），是控制网页外观样式的一门技术。与HTML、JavaScript并称前端的三大核心技术。

HTML用来构建页面的结构和内容，CSS用来控制页面的外观样式，JavaScript用来控制页面的行为。



## CSS引入方式

在HTML页面引入CSS的方式有三种：

1. 行内样式
2. 内部样式
3. 外部样式



### 行内样式

直接在HTML标签的`style`属性写CSS样式。

```html
<p style="color: #f00;">这是一段内容 abc</p>
```



### 内部样式

如果所有的样式都写到标签内部的话，开发维护起来会非常的麻烦，造成一个HTML结构中既有HTML又有CSS，非常混乱。所以，可以通过style标签来书写CSS样式，这样可以是CSS与HTML分离开，这样更容易开发和维护。

在head标签的style标签中书写CSS样式。

```html
<style>
  p {
    color: #f00;
  }
</style>
```



### 外部样式

当一个页面非常庞大，CSS样式非常多的时候，内部样式也不太理想，一个HTML文件中又大量的CSS样式，看着也非常地糟糕。所以，可以在HTML文件外部创建CSS文件专门用来书写CSS样式，然后在HTML文件中通过link标签将外部的CSS文件引入进来。这种方式可以将CSS从HTML结构中彻底抽离出去，使得HTML结构和CSS样式更加清晰，这也现在比较常用的开发方式。

通过link标签引入外部的CSS文件

```html
<link rel="stylesheet" type="text/css" href="文件路径" />
```



### @import方式

其实还有一种@import引入外部文件的方式，但是这种引入方式在加载一个页面时，会先加载HTML后加载CSS，这种加载方式造成页面体验较差。通过link方式引入是先加载CSS后加载HTML。



## 选择器

选择器的作用是用来选定要添加样式的标签元素的，在CSS2.1中有7中选择器，分别是：

- 基础选择器
  - id选择器
  - 类选择器
  - 标签选择器
  - 通配符选择器
- 高级选择器
  - 后代选择器
  - 交集选择器
  - 并集选择器



### id选择器

在HTML标签同添加`id`属性，在一个HTML文件内，标签的id属性值是唯一的，也就是说不能存在两个相同的id属性值。这是选择粒度最细的选择器。

**语法**：

```css
#id属性值 {
  
}
```

:::tip 代码示例

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        #p1 {
            color: #f00;
        }
    </style>
</head>
<body>
    <p id="p1">这是一个段落标签</p>
</body>
</html>
```

:::



### 类选择器

在HTML标签中添加`class`属性，可以为多个HTML标签添加相同的class属性值表示一类标签，这样类选择器在选择时可以同时选择多个标签了。

**语法**：

```css
.class属性值 {
  
}
```

:::tip 代码示例

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .title {
            color: #f00;
        }
    </style>
</head>
<body>
    <p class="title text">这是一个段落标签</p>
</body>
</html>
```

:::

另外，HTML标签的class属性可以同时设置多个值，中间用空格分隔。也就是说，给标签设置多个类别，这样在设置样式时更加灵活。

```html
<p class="title text">这是一个段落标签</p>
```





### 伪类选择器

伪类和类之间有一定的相似之处，也存在明显的区别。

- 普通的类：必须给标签设置对应的class属性值，才能选中标签，而且类选择器后面添加的属性会立即加载到浏览器上；
- 伪类：不需要给标签添加任何属性，伪类名都是语法提前规定好的，书写时伪类必须搭配其他选择器使用，伪类选择器后面添加的样式不一定立即加载到浏览器上，只有用户触发了对应的行为，伪类的样式才会立即加载；
- 伪类选择器的权重和普通的类选择器的权重是相同的；
- 伪类选择器书写方法：前面是普通的选择器，后面紧跟:伪类名



#### a标签的伪类选择器

a标签可以根据用户行为不同，划分为四种状态，通过a标签的伪类可以分别设置这四种状态的样式，用户触发对应行为，就可以加载对应的样式。

**a标签的伪类**：

| 伪类     | 说明                  |
| -------- | --------------------- |
| :link    | a标签在访问前的状态   |
| :visited | a标签在已访问的状态   |
| :hover   | a标签在鼠标悬浮的状态 |
| :active  | a标签在鼠标点击的状态 |

**a标签伪类的书写顺序**：

- a标签上可能会同时触发2到3个状态，没个状态的属性都会进行加载，相同的属性之间会发生层叠；
- 伪类的权重是相同的，只能根据书写顺序，后面的层叠前面的，所以伪类书写顺序非常重要。



:::tip 查看代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        a:link {
            color: skyblue;
            text-decoration: none;
        }

        a:visited {
            color: #0f0;
        }

        a:hover {
            color: steelblue;
        }

        a:active {
            color: slategray;
        }
    </style>
</head>
<body>
    <a href="https://notes.shiguangping.com">目的笔记</a>
</body>
</html>
```

:::



## 背景属性

### background-color 背景颜色

**属性名**：background-color

**属性值**:

| 属性值类型       | 示例                                                         |
| ---------------- | ------------------------------------------------------------ |
| 十六进制表示     | #FFFFFF                                                      |
| RGB表示          | rgb(255,255,255)                                             |
| 单词表示         | black                                                        |
| rgba表示（CSS3） | 在rgb基础上增加了不透明度设置，不透明度alpha取值在0-1之间，0表示完全透明，1表示不透明 |

**作用**：在盒子[border](./#border-边框)及以内区域内添加背景颜色的修饰。



### background-image 背景图片

**属性名**：background-image

**作用**：给盒子[border](./#border-边框)及以内区域添加图片作为背景；后期如果图片不重复加载，加载从border以内开始，不包括border。

**属性值**：url(图片路径)

**示例**：

```css
.box {
    width: 300px;
    height: 300px;
    padding: 30px;
    border: 10px dashed #f00;
    margin: 50px;

    background-image: url(imgs/img1.jfif);
    background-repeat: no-repeat; /*设置图片不重复加载*/
}
```

另外，背景图片和背景颜色可以同时设置，同时设置时显示图片的部分会压盖住背景颜色，没有图片的区域会露出背景颜色。



在CSS中规定，一个盒子上，可以添加多个背景图片。

background-image的属性值书写时，以逗号分隔多背景的url路径地址。注意：背景加载时，先写的背景图片会压盖在后写的背景图片上。



### background-repeat 背景重复

**属性名**：background-repeat

**作用**：设置添加的背景图是否要在盒子中进行重复加载。

**属性值**：

| 属性值    | 作用                                                         |
| --------- | ------------------------------------------------------------ |
| repeat    | 重复，默认属性值，表示会使用背景图片重复加载直至填满整个盒子背景区域 |
| no-repeat | 不重复，不论背景图是否大于盒子范围，都只加载一次图片         |
| repeat--x | 水平重复，使用背景图片水平重复加载铺满第一行，垂直方向不重复 |
| repeat--y | 垂直重复，使用背景图片垂直重复加载铺满第一列，水平方向不重复 |



### background-position 背景定位

**属性名**：background-position

**作用**：主要用于设置不重复的图片在背景区域的加载开始位置。

**属性值**：分三种写法，单词表示法、像素表示法、百分比表示法。无论哪种表示方法属性值都有两个，之间使用空格分隔。

- 第一个值：表示背景图片在水平方向的位置（x坐标）
- 第二个值：表示背景图片在垂直方向的位置（y坐标）



| 单词表示法的属性值 |      |        |        |
| ------------------ | ---- | ------ | ------ |
| 水平方向可选值     | left | center | right  |
| 垂直方向可选值     | top  | center | botton |



### background-attachment 背景附着

**属性名**：background-attachment

**作用**：设置的是背景图片是否要随着页面或者盒子滚动而滚动。

**属性值**：

| 属性值 | 说明                                                         |
| ------ | ------------------------------------------------------------ |
| scroll | 滚动的，表示背景图片与盒子保持相对位置不变，随着页面的滚动而滚动 |
| fixed  | 固定的，背景图的定位的参考点从盒子border以内的左上顶点变为了浏览器窗口的左上顶点，页面滚动时，浏览器窗口的左上顶点是不变的，导致背景图固定在浏览器窗口的某个位置，不会随着页面滚动而滚动。 |



### background 背景综合属性

background属性可以将五个单一属性的值进行合写。

**属性值**：可以有1-5个属性值，值之间用空格进行分隔，背景定位的两个属性值算作一个属性值，不能被分开也不能被颠倒顺序。五个属性值之间可以互换位置。

**示例**：

```css
background: url(imgs/img1.jfif) no-repeat center top fixed #fff;
```

注意：

- 如果属性值没有设置完全，其他没有设置的单一属性会按照默认值加载；
- 如果想去层叠综合属性中的一部分，其他属性保持不变，最好使用单一属性写法去层叠掉综合属性的某个值。



### background-size 背景缩放

background-size是CSS3新增的属性，通过background-size设置背景图片的尺寸，就像设置img标签中的图片尺寸一样，在移动Web开发中做屏幕适配应用广泛。

**属性名**：background-size

**属性值**：

| 属性值  | 说明                                                         |
| ------- | ------------------------------------------------------------ |
| px值    | 1-2个像素值，只设置1个值，垂直方向等比例拉伸；设置2个值，按照设置值加载 |
| 百分比  | 通像素值设置方法相同，设置百分比时，数值参照盒子的宽、高属性 |
| cover   | 自动调整缩放比例，把背景图像扩展至足够大，以使背景图片完全覆盖背景区域。如果有溢出部分则会被隐藏。 |
| contain | 自动调整缩放比例，把图像扩展至最大尺寸，保证图片始终完整显示在背景区域 |





## 盒模型

盒模型具有三个基本属性：边框`border`、内边距`padding`、外边距`margin`。

### border-边框



### 盒模型-height

**必须设置盒子高度的情况**

设计图中盒子高度占位是固定的，后面的同级元素在高度下面加载。

但是，设置盒子高度固定后，会存在盒子内容超出了盒子本身设置高度的情况，导致内容溢出的效果。如下图中所示：

![image-20210808100845375](https://images.shiguangping.com//imgs/image-20210808100845375.png)

这种情况可以通过`overflow`溢出属性来设置盒子的内容的展示效果。



#### overflow 溢出属性

设置了高度的盒子，如果内部元素的加载高度超过了父级（盒子），会出现溢出效果。可以通过一个溢出的属性overflow，进行溢出部分内容的显示效果设置。

| 属性值  | 说明                                                         |
| ------- | ------------------------------------------------------------ |
| visible | 默认值，可见的可视的，显示溢出部分                           |
| hidden  | 隐藏溢出部分，隐藏超过盒子边框的内容                         |
| scroll  | 溢出的部分出现滚动条，可以拖动滚动条看到隐藏部分的内容，多出盒子高度的部分不显示。不论有没有溢出，水平和垂直方向都会出现滚动条，只是没有滑块效果 |
| auto    | 自动的，如果没有溢出就正常显示，如果有溢出，溢出的方向自动出现滚动条 |



**必须不设置盒子高度情况**

要求盒子高度必须自适应内部内容的高度，或者设置height的属性值是自动的。



### 盒模型-居中

![image-20210808092249236](https://images.shiguangping.com//imgs/image-20210808092249236.png)



#### 文本水平居中

水平居中（横向居中）：`text-align`属性，不论单行或多行都可以设置。



#### 文本垂直居中

单行文本垂直居中（纵向居中）：让文字行高`line-height`等于盒子的height。因为文字字号在行高方向上垂直居中的。

多行文本垂直居中：让盒子的高度自适应或者正好等于多行文字的高度，设置盒子相同的上下内边距，达到内容在盒子中垂直居中的效果。



#### 元素水平居中

针对类似`<div>`样式上必须独占一行的盒子，如果子盒子宽度小于父盒子的宽度，可以设置子盒子的`margin`值，水平方向上设置为`auto`，实现子盒子在父和子水平方向上居中的效果。

原因：auto只在水平方向上起作用，水平方向的margin值如果设置为auto，边距会自动无限增大，直到撑满整个父盒子除了子盒子宽度之外剩余的区域，如果水平方向都是auto，两边都要无限大，只能两边距离相等，达到子盒子在父盒子中水平方向居中的效果。



#### 元素垂直居中

一个盒子内部嵌套的子盒子，让其在父盒子中垂直居中，这种与多行文本垂直居中类似，让父盒子高度自适应，子盒子高度会自动撑开父盒子高度，再给父盒子设置相同的上下内边距，来达到子盒子在父盒子中垂直居中的效果。



#### 示例

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .box2 {
            width: 100px;
            height: 100px;
            border: 1px solid #f00;
            /* margin值水平方向设置为auto，让其左右外边距相同并自动撑满父盒子，实现子盒子在父盒子中水平方向居中的效果 */
            margin: 0 auto;
            /* 行高与盒子height相等，让单行文本在盒子内垂直方向居中 */
            line-height: 100px;
            /* text-align可以设置盒子内文本水平居中 */
            text-align: center;
        }
        .box1 {
            /* 父盒子不设置height，让子盒子撑开父盒子的height，并设置上下padding，实现子盒子垂直居中效果 */
            width: 500px;
            border: 1px solid #000;
            padding: 20px 0;
        }
    </style>
</head>
<body>
    <div class="box1">
        <div class="box2">box2</div>
    </div>
</body>
</html>
```

页面效果：

![image-20210808095418206](https://images.shiguangping.com//imgs/image-20210808095418206.png)

> 可以动手尝试实现图中的效果。



### 盒模型-父子盒模型

一般情况下，一个父元素内部可以放置一个或者多个子元素，而且多个子元素要排成一排显示，必须保证父元素的宽度一定要足够（不考虑溢出情况），需要遵循一个设置尺寸的规律：所有子元素的宽度加一起不能大于父元素的宽度 width。

也就是说：`父元素width ≥ 所有子元素的width + padding*2 + border*2 + margin*2`

如果不满足上面的条件：要么多余子元素无法排成一排，部分元素掉下来，要么会出现子元素溢出的效果。

避免出现上面这种情况，必须计算好所有子元素的宽度。或者当只有一个子元素且子元素是类似`<div>`这种独占一行的元素时，不设置子元素的width属性，子元素的宽度会自动撑满父级的宽度，不会出现溢出的情况。如果同时设置了子元素水平方向上的border、padding、margin时，width会自动收缩尺寸。



### 盒模型-margin塌陷现象

margin塌陷现象：在垂直方向（纵向）如果有两个元素的外边距有相遇的，浏览器中加载真正的外边距不是两个元素的外边距之和，而是两个外边距中值较大的，边距值小的塌陷到了边距值大的内部。

**同级元素塌陷**

上面额元素又下边距，下面的元素有上边距，两个边距相遇，真正的盒子间距是较大的那个间距值，而不是两个盒子外边距的和。

![image-20210808105232056](https://images.shiguangping.com//imgs/image-20210808105232056.png)

:::tip 查看代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .box1 {
            width: 100px;
            height: 100px;
            background-color: skyblue;

            margin-bottom: 50px;
        }

        .box2 {
            width: 100px;
            height: 100px;
            background-color: skyblue;

            margin-top: 100px;
        }
    </style>
</head>
<body>
    <div class="box1">1</div>
    <div class="box2">2</div>
</body>
</html>
```

:::



**父子元素塌陷**

父子元素之间也会出现margin塌陷现象，父子元素设置了相同方向的margin-top值，两个属性之间没有其他内容进行隔离，导致两个属性相遇，发生margin塌陷。

![image-20210808110111111](https://images.shiguangping.com//imgs/image-20210808110111111.png)

:::tip 查看代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .sup {
            width: 100px;
            height: 100px;
            background-color: pink;

            margin-top: 50px;
        }

        .sub {
            width: 50px;
            height: 50px;
            background-color: yellow;

            margin-top: 30px;
        }
    </style>
</head>
<body>
    <div class="sup">
        <div class="sub">
            子
        </div>
    </div>
    
</body>
</html>
```

:::

或者，父元素本身没有设置与上一个元素的外边距，应该与上一个元素紧挨着，但子元素设置了垂直方向上的上边距，这时会带着父元素一起掉下来。

![image-20210808110747168](https://images.shiguangping.com//imgs/image-20210808110747168.png)

:::tip 查看代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .sup {
            width: 100px;
            height: 100px;
            background-color: pink;
        }

        .sub {
            width: 50px;
            height: 50px;
            background-color: yellow;

            margin-top: 30px;
        }
    </style>
</head>
<body>
    <div class="sup">
        <div class="sub">
            子
        </div>
    </div>
    
</body>
</html>
```

:::



**解决margin塌陷问题的方法**

①同级元素：如果两个元素垂直方向有间距，只需要设置给一个元素，不要进行拆分。

②父子元素：让两个边距不要相遇，中间可以使用父元素border或padding将边距分隔开；更常用的方法，父盒子模型之间的距离就不要用子盒子的margin去踹出来，而是父级的padding挤出来。



>水平方向的margin没有塌陷现象。



## 标准文档流

标准文档流，指的是元素在排版过程中，元素会默认自动从左往右，从上往下的流式排列方式。前面内容发生变化，后面内容的位置也会随着发生变化。

HTML就是一种标准文档流文件。

HTML中的标准文档流通过两种方式体现：

- 微观现象
- 元素等级



### 微观现象

- 空白折叠现象，指的是在源代码中的连续空白字符（空格、换行、制表符tab），在页面显示时，会被折叠为一个空格；
- 文字类的元素与其它类型元素排在一行会出现一种高低不齐、底边对齐的效果；
- 自动换行，元素内一行内容写满元素的width时会自动进行换行。



### 元素等级

- 块级元素，如p标签、div标签，h1标签等
  - 块级元素可以设置宽高，在浏览器中正常加载；
  - 块级元素必须独占一行，不能与其它任何标签排成一行；
  - 块级元素如果不设置宽度，会自动撑满父级的width区域；高度不设置，会被内容自动撑开高度。
- 行内元素，如span标签、a标签等
  - 行内元素不能正常加载宽度和高度属性，其它的盒模型属性虽然能设置，但是容易出现加载问题；
  - 行内元素可以与其它行内或行内块元素并排一行显示；
  - 行内元素不论是否设置宽高，宽度和高度都只能被内容自动撑开。
- 行内块元素，如img标签、imput标签等
  - 行内块元素可以设置高度和宽度；
  - 行内块元素可以与其它行内或行内块元素排成一行显示；
  - 行内块元素如果不设置宽高属性，要么以原始尺寸展示，要么被内容自动撑开；
  - 行内块元素仍具有标准文档流的微观性质，例如空白折叠现象。



### display 显示模式

**属性名**：display

**作用**：标准文档流中的元素有自己默认的浏览器加载模式，但是加载模式不是一成不变的，可以通过`display`属性改变一个标签的显示模式。

**属性值**：元素根据属性值不同，可以加载对应元素等级的显示模式的特点。

| 属性值       | 说明                                                   |
| ------------ | ------------------------------------------------------ |
| block        | 表示元素要以块级元素的模式加载，具备块级元素的特点     |
| inline       | 表示元素要以行内元素的模式加载，具备行内元素的特点     |
| inline-block | 表示元素要以行内块元素的模式加载，具备行内块元素的特点 |
| none         | 表示标签及内部内容直接隐藏，让出原有标准流的位置       |



### 脱离标准文档流

`display`属性更改的显示模式并没有改变标准文档流的性质，页面依旧是从左往右、从上往下加载，存在空白折叠等微观现象。要想实现更多界面布局效果需要脱离标准文档流的限制。

标签元素脱离标准文档流的方式包括：浮动、绝对定位、固定定位。



## 页面布局

### float 浮动

> 浮动是一种非常重要的布局属性，也是元素脱离标准文档流的方式之一。

**属性名**：`float`

**作用**：让元素脱离标准文档流，同一级的浮动元素可以并排在一排显示。

**属性值**：

| 属性值 | 说明   |
| ------ | ------ |
| left   | 左浮动 |
| right  | 右浮动 |





#### 浮动的性质1-脱离文档流限制

浮动的元素脱离了标准文档流的限制。

- 标准文档流的特点：区分行块。

  - 块级元素：可以设置宽高，必须独占一行；

  - 行内元素：不能设置宽高，可以并排一行。

- 浮动元素脱离了标准文档流的限制，具有行块二象性，浮动的元素既可以设置宽高，又可以并排一行，而且不会出现空白折叠的现象（元素间有空格），如果元素不设置宽高，可以被元素内容自动撑开。



#### 浮动的性质2-依次贴边

浮动的元素会依次贴边。

- 父元素宽度足够，所有子元素会按照HTML的书写顺序，依次向左进行贴边，父元素左边←子元素1←子元素2←子元素3←子元素4。

  ![image-20210808154052609](https://images.shiguangping.com//imgs/image-20210808154052609.png)

- 父元素宽度如果不够，例如不能放下子元素4，那么子元素4在贴边时，会跳过上一个子元素3，向更上一个子元素2进行贴边，如果子元素2后面位置不够，继续跳过子元素2向前面的子元素1进行贴边。

  ![image-20210808154521778](https://images.shiguangping.com//imgs/image-20210808154521778.png)

- 如果贴边的这个子元素4宽度小于子元素2，子元素2的高度低于子元素1和子元素3，形成一个凹陷，子元素4会受到前一个元素子元素3的高度影响，不会出现钻空现象。

  ![image-20210808154814541](https://images.shiguangping.com//imgs/image-20210808154814541.png)

- 如果子元素1后面的距离也放不下子元素4，子元素4最终会贴到父元素的左边，如果子元素4的宽度超过了父元素，只会出现溢出现象。

  ![image-20210808155032014](https://images.shiguangping.com//imgs/image-20210808155032014.png)

- 右浮动的效果与左浮动贴边效果是一致的，只是贴边的方向不同。按照HTML书写顺序依次向右上一个元素贴边，第一个元素贴父元素的右边。

  ![image-20210808155459923](https://images.shiguangping.com//imgs/image-20210808155459923.png)



:::tip 查看代码

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .box {

            margin-top: 50px;
            margin-left: 50px;

            width: 400px;
            height: 400px;
            border: 10px solid #000;
        }

        .box p {
            float: left;
            width: 100px;
            height: 100px;
            background-color: skyblue;
        }

        .box .ps1 {
            height: 200px;
            background-color: #f00;
        }

        .box .ps2 {
            width: 150px;
            height: 50px;
            background-color: #0f0;
        }

        .box .ps3 {
            background-color: #00f;
        }

        .box .ps4 {
            width: 450px;
            background-color: #ff0;
        }
    </style>
</head>

<body>
    <div class="box">
        <p class="ps1">1</p>
        <p class="ps2">2</p>
        <p class="ps3">3</p>
        <p class="ps4">4</p>
    </div>
</body>

</html>
```

:::



#### 浮动的性质3-没有margin塌陷现象

浮动的元素没有margin塌陷的现象。

margin塌陷现象出现在标准文档流中，浮动元素由于脱离了标准文档流的限制，不再具有margin的现象。



#### 浮动的性质4-让出标准文档流位置

浮动的元素让出标准流位置。

元素浮动之后，脱离了标准流，会将原来占有的标准流位置让给后面的一个同级元素。

这时会出现浮动的元素压盖住非浮动元素的效果，这种效果在一些低版本浏览器中会出现兼容问题。所以，在没有特殊需求的情况下，一般不会通过浮动属性来制作压盖效果，也不允许一个父元素中既有浮动元素又有非浮动元素。



#### 浮动的性质5-字围现象

字围现象。

与压盖效果结构类似，同级元素中前面的元素浮动，后面的元素不浮动，不浮动的元素内部还有一些文字，浮动的蓝盒子会压盖住粉盒子的一部分，但是文字内容不会被盖住，粉盒子中的文字会让开蓝盒子位置，围绕它进行加载。

![image-20210808163426642](https://images.shiguangping.com//imgs/image-20210808163426642.png)



#### 浮动的问题1

标准流中的元素，不设置高度的情况下，都能被内部的标准流元素自动撑高。如果内部的子元素进行了浮动，浮动的子元素无法撑高父元素的高度。

![image-20210808165600870](https://images.shiguangping.com//imgs/image-20210808165600870.png)



#### 浮动的问题2

父元素没有高度，会影响后面元素的标准流位置，如果浮动的子元素足够高时，有可能影响到后面元素中浮动的子元素的贴边位置。

![image-20210808165818506](https://images.shiguangping.com//imgs/image-20210808165818506.png)



#### 清除浮动1

解决上面问题的方式之一，是强制给标准流父元素添加一个高度。

![image-20210808170122383](https://images.shiguangping.com//imgs/image-20210808170122383.png)

这种方式解决了前面标准流父元素中浮动的子元素影响了后面标准流父元素中子元素浮动的贴边位置和效果，但是也存在另一种问题，当子元素的高度发生变化，父元素依然无法自适应，因为浮动的元素无法自动撑开父元素的高度。



#### 清除浮动2-clear属性

**属性名**：clear

**属性值**：

| 属性值 | 说明                       |
| ------ | -------------------------- |
| left   | 清除前面左浮动带来的影响   |
| right  | 清除前面右浮动带来的影响   |
| both   | 清除前面所有浮动带来的影响 |

**作用**：给标准流父元素添加clear属性，父元素不受前面浮动影响，不会再占有浮动让出的标准流位置。

![image-20210808171139905](https://images.shiguangping.com//imgs/image-20210808171139905.png)

这种方式无法解决浮动元素撑不开父元素高度的问题，并且两个标准流父元素之间如果有margin效果不正确。

:::tip 查看代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .box1 {
            width: 1000px;
            border: 10px solid #f00;
        }

        .box2 {
            width: 1000px;
            border: 10px dashed green;
            clear: both;
        }

        .box1 p {
            float: left;
            width: 100px;
            height: 100px;
            background-color: skyblue;
            margin-right: 10px;
        }

        .box2 p {
            float: left;
            width: 100px;
            height: 100px;
            background-color: yellow;
            margin-right: 10px;
        }
    </style>
</head>
<body>
    <div class="box1">
        <p></p>
        <p></p>
        <p></p>
        <p></p>
    </div>
    
    <div class="box2">
        <p></p>
        <p></p>
        <p></p>
        <p></p>
    </div>
</body>
</html>
```

:::



#### 清除浮动3-隔墙法



外墙法：在两个标准流父元素之间，添加一个div标签，标签上带有clear属性，并且给这个div一个合适的高度。

![image-20210809085830128](https://images.shiguangping.com/imgs/image-20210809085830128.png)

这种方法最终实现的效果与上一种解决方式类似，区别在于可以给中间隔着的div一个高度，实现一个margin效果。但是本质上没有完全解决问题，浮动元素仍然无法自动撑开父元素的高度。

:::tip 查看代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .box1 {
            width: 1000px;
            border: 10px solid #f00;
        }

        .box2 {
            width: 1000px;
            border: 10px dashed green;
        }

        .box1 p {
            float: left;
            width: 100px;
            height: 100px;
            background-color: skyblue;
            margin-right: 10px;
        }

        .box2 p {
            float: left;
            width: 100px;
            height: 100px;
            background-color: yellow;
            margin-right: 10px;
        }

        .cl {
            clear: both;
            height: 10px;
        }
    </style>
</head>
<body>
    <div class="box1">
        <p></p>
        <p></p>
        <p></p>
        <p></p>
    </div>
    <div class="cl"></div>
    <div class="box2">
        <p></p>
        <p></p>
        <p></p>
        <p></p>
    </div>
</body>
</html>
```

:::



内墙法：在父元素内部，所有的浮动子元素后面添加一个空的div元素，标签高度为0，添加clear属性。

![image-20210809091408571](https://images.shiguangping.com/imgs/image-20210809091408571.png)

这种方式解决了以上遇到的问题，但也存在一定的缺憾。浮动属于CSS样式带来的效果，CSS本身是用来修饰HTML的，但是以上问题靠的是添加HTML结构解决的，如果页面浮动元素很多，那么需要添加多个没有语义的空标签，造成HTML结构冗余。

:::tip 查看代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .box1 {
            width: 1000px;
            border: 10px solid #f00;
            margin-bottom: 10px;
        }

        .box2 {
            width: 1000px;
            border: 10px dashed green;
        }

        .box1 p {
            float: left;
            width: 100px;
            height: 100px;
            background-color: skyblue;
            margin-right: 10px;
        }

        .box1 div {
            clear: both;
        }

        .box2 p {
            float: left;
            width: 100px;
            height: 100px;
            background-color: yellow;
            margin-right: 10px;
        }

        .box2 div {
            clear: both;
        }
    </style>
</head>
<body>
    <div class="box1">
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <div class="cl"></div>
    </div>
    
    <div class="box2">
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <div class="cl"></div>
    </div>
</body>
</html>
```

:::



#### 清除浮动4-伪类

本质是使用伪类方法利用css代码书写一堵内墙。

伪类选择器：通过选中的标签添加伪类，去选中标签的某个状态或位置。

| 选择器 | 说明                                 |
| ------ | ------------------------------------ |
| :after | 表示选中的是某个标签内部的最后的位置 |

书写方法：必须紧跟在普通选择器后面书写。

将伪类添加给一个选中父盒子的选择器后面，一般给需要清除浮动的父盒子设置一个clearfix的类名(class属性)。

![image-20210809102014935](https://images.shiguangping.com/imgs/image-20210809102014935.png)

:::tip 查看代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .box1 {
            width: 1000px;
            border: 10px solid #f00;
            margin-bottom: 10px;
        }

        .clearfix:after {
            content: "1"; /* 添加一个文字内容 */
            display: block; /* 将位子转为块级元素 */
            height: 0; /* 将盒子高度固定为0，避免影响父盒子高度 */
            clear: both; /* 清楚前面浮动影响 */
            visibility: hidden; /* 将创建的元素内容隐藏，依然占据位置 */
        }

        .box2 {
            width: 1000px;
            border: 10px dashed green;
        }

        .box1 p {
            float: left;
            width: 100px;
            height: 100px;
            background-color: skyblue;
            margin-right: 10px;
        }

        .box2 p {
            float: left;
            width: 100px;
            height: 100px;
            background-color: yellow;
            margin-right: 10px;
        }
    </style>
</head>
<body>
    <div class="box1 clearfix">
        <p></p>
        <p></p>
        <p></p>
        <p></p>
    </div>
    
    <div class="box2 clearfix">
        <p></p>
        <p></p>
        <p></p>
        <p></p>
    </div>
</body>
</html>
```

:::



高度自适应原因：一个元素没有设置高度，同事设置了溢出隐藏`overflow:hidden`，浏览器在加载盒子尺寸时，遇到溢出隐藏浏览器会强制性去检索内部的子元素的高度，不论子元素是标准流还是浮动，都会将最高的高度作为父盒子的高度加载。

浮动影响后面的元素：父元素有了高度后，可以管理住内部所有的浮动元素，不会延伸到后面标签中影响贴边。



#### 总结

如果父元素高度是固定的，建议使用`height`属性解决；

如果父元素高度需要自适应，建议使用`overflow`属性解决浮动问题。



### position 定位

**属性名**：`position`

**作用**：设置元素定位的方式，它需要根据某个参考元素发生位置偏移。必须搭配偏移量属性才能发生位置移动。

**属性值**：

| 属性值   | 说明     |
| -------- | -------- |
| relative | 相对定位 |
| absolute | 绝对定位 |
| fixed    | 固定定位 |



### 偏移量属性

**属性名**：

- 水平方向：`left`/`right`

- 垂直方向：`top`/`bottom`

**作用**：偏移量属性是用来设置元素相对参考元素在某个方向上进行偏移位置大小的。

**属性值**：常用px单位数值，或者百分比。

**注意**：

- 偏移量的属性值区分正负数：正数表示偏移方向与属性名相反；负数表示偏移方向与属性名相同。

  ```css
  .box {
      position: relative;
      top: 100px; /*表示顶部向下偏移100个像素*/
  }
  ```

- 在同一个方向上，不能同时设置两个偏移量属性，如left和right不能同时设置。同时设置的话，水平方向只会加载left属性、垂直方向只会加载top属性。



### 相对定位

position属性值：`relative`

必须搭配偏移量属性才能发生位置移动。

**参考元素**：标签加载的原始位置。

**相对定位的性质**：相对定位的元素不脱离标签原始状态（标准标准文档流、浮动），不会让出原来占用的标准流位置，如下图。

![image-20210809154749127](https://images.shiguangping.com/imgs/image-20210809154749127.png)

元素显示效果上，**原位留坑，形影分离**。



由于相对定位的参考元素是元素原始位置，left属性的正值等价于right属性的负值，top属性的正值等价于bottom属性的负值。为了方便记忆，可以选择只使用left/top属性组合。

**实际应用**：

1. 由于相对定位元素比较稳定，不会让出原有位置，可以将相对定位的元素作为绝对定位的参考元素，也就是所说的“子绝父相”情况。
2. 相对定位比较稳定，可以在占有原始位置的情况下，对加载效果区域进行位置调整，进行微调设置。或者对文字进行微调。



### 绝对定位

position属性值：`absolute`

必须搭配偏移量属性才能发生位置移动。

**参考元素**：参考的是距离最近的有定位的祖先元素，如果祖先都没有定位，则参考body。

**绝对定位的性质**：绝对定位的元素会脱离标准文档流，会让出标准流位置，可以设置宽高，也可以随时定义位置。绝对定位的元素不设置宽高只能被内容撑开。

**注意事项**：

1. 绝对定位的参考元素是不固定的，不同的参考元素以及不同的偏移量组合，会导致绝对定位元素的参考点不同，产生不同的位移效果。
2. 在绝对定位中，由于参考点不同，left属性正值不再等价于right负值，top属性正值也不再等价于bottom属性的负值。



**body为参考元素**：

以body为参考元素的参考点时，参考点的确定与偏移量方向有关。

1. 如果有top参与的定位，参考点就是body页面的左上顶点或右上顶点。自身的对比点是盒子的所有盒模型属性最外面的左上角或右上角；
2. 如果有bottom参考的绝对定位，参考点是body页面首屏的左下顶点或右下顶点。自身的对比点是盒子的所有盒模型属性最外面的左下角或右下角。

在实际应用中，如果body为参考元素，不同分辨率的浏览器中，绝对定位的元素位置是不同的，所以较少使用body作为参考元素。



**祖先级为参考元素**：

如果祖先级中有定位元素，则不会去参考body。

参考元素：参考的元素是在祖先元素中有任意定位的，并且在HTML结构中距离目标最近的祖先。

参考点：如果绝对定位的参考元素是某个祖先级元素，参考点是盒子border以内的四个顶点，偏移量不同方向属性的组合决定了参考点。绝对定位的元素只关心对比点到参考点之间的距离，会忽视掉参考元素的padding区域。

left/top属性组合：参考点是祖先的border以内的左上顶点，对比点是盒子自身的左上角；

![image-20210809174530873](https://images.shiguangping.com/imgs/image-20210809174530873.png)

:::tip 查看代码

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .box1 {
            margin: 100px;
            position: relative;
            width: 160px;
            height: 160px;
            padding: 50px;
            border: 10px solid #00f;
        }

        p {
            position: absolute;
            left: 10px;
            top: 10px;
            width: 60px;
            height: 60px;
            background-color: gold;
        }
    </style>
</head>

<body>
    <div class="box1">
        <p></p>
    </div>
</body>

</html>
```

:::

right/top属性组合：参考点是祖先的border以内的右上顶点，对比点是盒子自身的右上角；

![image-20210809174847984](https://images.shiguangping.com/imgs/image-20210809174847984.png)

:::tip 查看代码

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .box1 {
            margin: 100px;
            position: relative;
            width: 160px;
            height: 160px;
            padding: 50px;
            border: 10px solid #00f;
        }

        p {
            position: absolute;
            right: 10px;
            top: 10px;
            width: 60px;
            height: 60px;
            background-color: gold;
        }
    </style>
</head>

<body>
    <div class="box1">
        <p></p>
    </div>
</body>

</html>
```

:::

left/bottom属性组合：参考点是祖先的border以内的左下顶点，对比点是盒子自身的左下角；

![image-20210809175019881](https://images.shiguangping.com/imgs/image-20210809175019881.png)

:::tip 查看代码

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .box1 {
            margin: 100px;
            position: relative;
            width: 160px;
            height: 160px;
            padding: 50px;
            border: 10px solid #00f;
        }

        p {
            position: absolute;
            left: 10px;
            bottom: 10px;
            width: 60px;
            height: 60px;
            background-color: gold;
        }
    </style>
</head>

<body>
    <div class="box1">
        <p></p>
    </div>
</body>

</html>
```

:::

right/bottom属性组合：参考点是祖先的border以内的右下顶点，对比点是盒子自身的右下角；

![image-20210809175100392](https://images.shiguangping.com/imgs/image-20210809175100392.png)

:::tip 查看代码

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .box1 {
            margin: 100px;
            position: relative;
            width: 160px;
            height: 160px;
            padding: 50px;
            border: 10px solid #00f;
        }

        p {
            position: absolute;
            right: 10px;
            bottom: 10px;
            width: 60px;
            height: 60px;
            background-color: gold;
        }
    </style>
</head>

<body>
    <div class="box1">
        <p></p>
    </div>
</body>

</html>
```

:::



### 固定定位

position属性值：`fixed`

**参考元素**：浏览器窗口。

**参考点**：浏览器窗口的四个顶点。与偏移量属性方向组合有关。

由于浏览器窗口的四个顶点位置不会发生变化，会导致固定定位的元素会始终显示在定位的位置。

**固定定位的性质**：固定定位的元素会脱离标准文档流限制，让出标准流位置，可以设置宽高，根据偏移量属性可以任意设置在浏览器窗口的位置。固定定位的元素会始终显示在浏览器窗口上。

![image-20210809184400207](https://images.shiguangping.com/imgs/image-20210809184400207.png)

:::info 查看代码

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        div {
            width: 300px;
            height: 300px;
            margin-top: 10px;
            background-color: skyblue;
        }

        .backtop {
            position: fixed;
            right: 30px;
            bottom: 30px;
            font: 18px/50px "宋体";
        }

        a {
            color: skyblue;
            text-decoration: none;
        }

        a:active {
            text-shadow:  -1px 1px;
        }
    </style>
</head>

<body>
    <a href="#" class="backtop">回到顶部</a>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
</body>

</html>
```

:::



### 应用-压盖效果

所有的定位类型都可以实现压盖效果。

由于绝对定位的元素会脱离标准文档流，不占用标准文档流的位置，压盖效果更彻底，在实际应用中，常见压盖效果都是使用绝对定位实现的。

![image-20210809185611139](https://images.shiguangping.com/imgs/image-20210809185611139.png)

:::tip 查看代码

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .box {
            position: relative;
            width: 300px;
            height: 300px;
            border: 5px solid #000;
            margin: 50px;
        }

        .box p {
            position: absolute;
            left: 0;
            top: 0;
            width: 100px;
            height: 100px;
            background-color: pink;
        }
    </style>
</head>

<body>
    <div class="box">
        <img src="imgs/img1.jfif" width="200px" height="200px" alt="">
        <p></p>
    </div>
</body>

</html>
```

:::

**默认的压盖顺序**：

1. 定位的元素不区分定位类型，都会去压盖标准流或浮动的元素；
2. 如果都是定位的元素，在HTML中后写的定位元素会压盖先写的定位元素。



**自定义压盖顺序**：

如果想更改定位元素间的压盖顺序，可以设置一个`z-index`属性。

### z-index 压盖顺序

**属性名**：`z-index`

**属性值**：数字

**使用方法**：

1. 数值大的会压盖数值小的，设置z-index属性的元素会压盖没有设置的；
2. 如果属性值相同的，比较HTML书写顺序，后写的会压盖先写的；
3. z-index属性只能给设置定位的元素才会生效，如果给没有定位的元素设置，不会生效；
4. 父子盒模型中，如果父子盒子都进行了定位，与其他的父子级有压盖的部分，那么：
   1. 父级盒子：如果不设置z-index，后写的压盖先写的；如果设置了z-index，值大的压盖值小的。
   2. 子级盒子：如果父级没有设置z-index属性，子级z-index大的会压盖小的；如果父级设置了z-index值，如论子级z-index值大小，都是父级值大的子级压盖父级值小的子级，俗称“从父效应”。





### 应用-居中

定位的元素，如果想在参考元素中居中显示，有自己的居中方法：

1. 第一步：在居中的方向使用一个偏移量属性，例如left，设置属性值为50%，定位元素的作顶点会移动到参考元素的中心位置；
2. 第二步：设置一个同方向的margin值，例如margin-left，属性值为负的自身宽度的一半。

![image-20210809190643169](https://images.shiguangping.com/imgs/image-20210809190643169.png)

这种方式也适用于宽的子盒子在窄的父盒子中居中。

:::tip 查看代码

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .box {
            position: relative;
            width: 300px;
            height: 300px;
            border: 5px solid #000;
            margin: 50px;
        }

        .box p {
            position: absolute;
            left: 50%; /*居中方向偏移50%*/
            margin-left: -50px; /*居中方向添加一个负的自身宽度一半的margin值，把自己拽回去*/
            width: 100px;
            height: 100px;
            background-color: gold;
        }
    </style>
</head>

<body>
    <div class="box">
        <p></p>
    </div>
</body>

</html>
```

:::
