# Template

An easy template engine for JavaScript.

## How to use?

```
npm i @zee.kim/template
```
or

```html
<script src="dist/template.min.js"></script>
```


```js
import Template from '@zee.kim/template';

const data={
    html: "<marquee style='width:100px'>我是一条鱼</marquee>",
    text: "<b>我是纯文本</b>",
    ok: true,
    child: {
    yes: true,
    no: false,
    },
    arr: [0, 1, 2],
    citys: {
    BJ: "北京",
    SH: "上海",
    GZ: "广州",
    },
    items: [
    { title: "吉林省", children: [{ name: "长春" }, { name: "延边" }], show: false },
    { title: "黑龙江省", show: true },
    { title: "辽宁省", show: true },
    ],
};
const content=`
<h3>if 判断</h3>
<div if="ok">I'm ok!</div>
<div else>I'm else!</div>

<h3>HTML 赋值</h3>
<div html="html"></div>

<h3>TEXT 赋值</h3>
<div text="text"></div>
<div>{{text}}</div>

<h3>:class 条件使用</h3>
<div :class="ok:ok|yes:child.yes">:class="ok:ok|yes:child.yes"</div>

<h3>遍历单一数组</h3>
<button for="a in arr">{{a}}</button>

<h3>遍历对象</h3>
<button for="city in citys by code">{{code}} : {{city}}</button>

<h3>遍历多维数组</h3>
<ul>
    <li for="item in items">
        {{$index}} - {{item.title}} <span style="color:red" if="!item.show" onclick="this.innerHTML=Date.now().toString(32).toUpperCase()">判断</span>
        <ul if="item.children">
          <li for="child in item.children">{{$index}} -{{child.name}}</li>	
        </ul>
    </li>
</ul>`
document.querySelector("body").innerHTML = Template(content,data);
```