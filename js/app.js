$(function () {
	responsiveVoice.speak('This is nice');
	var operatorMap = [
		{
			'symbol': '-',
			'text':'minus',
			'min': 50,
			'max': 1000
		},
		{
			'symbol': '+',
			'text':'plus',
			'min': 50,
			'max': 1000
		},
		{
			'symbol': '*',
			'text': 'multiplied by',
			'min': 2,
			'max': 100
		}
	];
	var content = $("#content");
	var interval = 12;//seconds
	var answerBeforeTime = 2; // seconds
	
	responsiveVoice.OnVoiceReady = showExpr;
	
	function showExpr() {
		var index = Math.floor(Math.random() * operatorMap.length);
		var operator = operatorMap[index];
		var operand1 = Math.floor(Math.random() * operator.max + operator.min);
		var operand2 = Math.floor(Math.random() * operator.max + operator.min);
		
		var expr = [];
		expr.push(operand1, operator.symbol, operand2);
		expr = expr.join(' ');
		content.text(expr);
		
		var exprText = [];
		exprText.push(operand1, operator.text, operand2);
		exprText = exprText.join(' ');
		responsiveVoice.speak(exprText);
		
		setTimeout(function () {
			
			/*
			responsiveVoice.OnFinishedPlaying = function () {
				setTimeout(showExpr, 2 * 1000);
			};*/
			
			var answer = eval(expr);
			content.text(expr + ' = ' + answer);
			responsiveVoice.speak(exprText + ' is ' + answer);
			
			var nextInterval = setInterval(function () {
				if(!responsiveVoice.isPlaying()) {
					clearInterval(nextInterval);
					showExpr();
				}
			}, 1000);
			
		}, (interval - answerBeforeTime) * 1000);
	}
});