
{{^editing}}
<ul class="layout-lr">
	<li>
		<span class="item">用户名：</span>
		<div class="con">{{username}}</div>
	</li>
	<li>
		<span class="item">电话：</span>
		<div class="con">{{phone}}</div>
	</li>
	<li>
		<span class="item">邮箱：</span>
		<div class="con">{{email}}</div>
	</li>
	<li>
		<span class="item">问题：</span>
		<div class="con">{{question}}</div>
	</li>
	<li>
		<span class="item">答案：</span>
		<div class="con">{{answer}}</div>
	</li>
</ul>
<div class="pl80 pt15"><a href="javascript:;" id="userInfoEdit" class="el-button el-button--primary el-button--medium">编辑</a></div>
{{/editing}}

{{#editing}}
<ul class="layout-lr">
	<li>
		<span class="item">用户名：</span>
		<div class="con">{{username}}</div>
	</li>
	<li>
		<span class="item">电话：</span>
		<div class="con"><input type="text" class="user-content" id="phone" placeholder="{{phone}}"></div>
	</li>
	<li>
		<span class="item">邮箱：</span>
		<div class="con"><input type="text" class="user-content" id="email" placeholder="{{email}}"></div>
	</li>
	<li>
		<span class="item">问题：</span>
		<div class="con"><input type="text" class="user-content" id="question" placeholder="{{question}}"></div>
	</li>
	<li>
		<span class="item">答案：</span>
		<div class="con"><input type="text" class="user-content" id="answer" placeholder="{{answer}}"></div>
	</li>
</ul>
<div class="pl80 pt15">
	<a href="javascript:;" id="userInfoSave" class="el-button el-button--primary el-button--medium">保存</a>
	<a href="javascript:;" id="userInfoCancel" class="el-button el-button--medium">取消</a>
</div>
{{/editing}}


