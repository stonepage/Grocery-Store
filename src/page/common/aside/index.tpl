{{#navList}}
	{{^isActive}}
	<li role="menuitem" class="el-menu-item">
		<a href="{{href}}" title="{{desc}}">{{desc}}</a>
	</li>
	{{/isActive}}
	
	{{#isActive}}
	<li role="menuitem" class="el-menu-item is-active">
		<a href="{{curHref}}" title="{{desc}}">{{desc}}</a>
	</li>
	{{/isActive}}
{{/navList}}
