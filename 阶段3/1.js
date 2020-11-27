/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var cs = document.getElementById("aqi-city-input");
var zhi = document.getElementById("aqi-value-input");
var biao = document.getElementById("aqi-table");
var jia= document.getElementById("add-btn");

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var city = cs.value.trim();//删除字符串的头尾空白符
	var quality = zhi.value.trim();
	if(!city.match(/^[A-Za-z\u4E00-\u9FA5]+$/)){
      alert("城市名必须为中英文字符！")
      return;
  	}
  	if(!quality.match(/^\d+$/)) {
      alert("空气质量指数必须为整数！")
      return;
  	}
  	aqiData[city] = quality;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var table = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
	for(var i in aqiData){
		table += "<tr><td>" + i + "</td><td>" + aqiData[i] + "</td><td><button data-city='"+i+"'>删除</button></td></tr>";//data-前缀 data属性
	}
	biao.innerHTML = i ? table : "";//如果i是true则返回table 要不然返回""
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  	addAqiData();
  	renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
  // do sth.
	delete aqiData[city];
  	renderAqiList();
}

function init() {

	jia.onclick = function() {
		addBtnHandle();
	}
  	// 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
	biao.addEventListener("click",function(event){
		if(event.target.nodeName.toLowerCase() === 'button'){
			delBtnHandle.call(null, event.target.dataset.city);
		}
	},false);
}

init();