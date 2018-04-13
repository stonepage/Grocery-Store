<div class="el-message-box__wrapper">
	<div class="el-message-box">
		<div class="el-message-box__header">
			<div class="el-message-box__title">
				<span style="color: teal;">{{title}}</span>
			</div>
			<button type="button" class="el-message-box__headerbtn"><i class="el-message-box__close el-icon-close"></i>
			</button>
		</div>
		<div class="el-message-box__content">
			<div class="el-message-box__message">
				<div>
					<span>{{con}}</span>
				</div>
			</div>
			<div class="el-message-box__input" style="display: none;">
				<div class="el-input">
					<input type="text"  placeholder="" class="el-input__inner"></div>
				<div class="el-message-box__errormsg" style="visibility: hidden;"></div>
			</div>
		</div>
		<div class="el-message-box__btns">
			<button type="button" class="el-button el-button--default el-button--small">
				<span>取消</span>
			</button>
			<button type="button" class="el-button el-button--default el-button--small el-button--primary ">
				<span>确定</span>
			</button>
		</div>
	</div>
</div>

