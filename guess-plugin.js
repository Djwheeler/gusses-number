(function() {
	window.onload = function() {
		var box = document.querySelector('#game-box'),
			inputEl = null,
			buttonEl = null,
			resultEl = null,
			toastEl = null,
			toastTimer = null,
			inputHtml = '',
			inputNum = '',
			randomNum = '',
			guessNum = 6,
			a = 0, b = 0;

		init()

		function init() {
			buildHtml()
			toRandomNum()
			toVerify()
			stopTouchScale()
			inputChange()
		}

		function stopTouchScale() {
			document.addEventListener('touchstart', function(e) {
				if(e.touches.length > 1) {
					e.preventDefault();
				}
			})
			var lastTime = 0;
			document.addEventListener('touchend', function(e) {
				var nowTime = (new Date()).getTime()
				if(nowTime - lastTime <= 300) {
					e.preventDefault();
				}
				lastTime = nowTime
			}, false)
		}

		function reset() {
			toRandomNum()
		}	

		function buildHtml() {
			inputHtml = '<div class="input-box"><input type="number" /><button>确定</button></div><div class="verify-list"></div><div class="toast-box"></div>';
			box.innerHTML = inputHtml
			inputEl = document.querySelector('#game-box>.input-box>input')
			buttonEl = document.querySelector('#game-box>.input-box>button')
			resultEl = document.querySelector('#game-box>.verify-list')
			toastEl = document.querySelector('#game-box>.toast-box')
			bindClick()
		}

		function inputChange() {
			inputEl.addEventListener('input', function(e) {
				var v = e.target.value.replace(' ', ''),
				    len = v.length,
					reg = /^[0-9]*$/;

				if(len > 4) {
					v = v.substring(0, 4)
				} else if(!reg.test(v)) {
					v = v.substring(0, len - 1)
				}				
				inputEl.value = v
			})
		}

		function verifyHtml(text) {
			var para = document.createElement('p'),
				node = document.createTextNode(text + ' ' + a + 'A' + b + 'B');
			para.appendChild(node)	
			resultEl.appendChild(para)
		}

		function toast(text) {
			toastEl.innerHTML = text
			toastEl.style.display = 'block'
			toastTimer = setTimeout(function() {
				toastEl.style.display = 'none'
				if(toastTimer) return clearTimeout(toastTimer)
			}, 1200)
		}

		function toRandomNum() {
			var nums = [0,1,2,3,4,5,6,7,8,9]
			randomNum = ""
			for(var i=0; i<4; i++) {
				var len = nums.length,
					x = parseInt(Math.random()*len),
					n = x > len ? len : x;

				randomNum += nums[n]
				nums.splice(n,1)
			}
			console.log(randomNum)
			return randomNum
		}

		function toVerify() {
			inputNum.split('').map(function(item, index) {
				var r = randomNum.indexOf(item);
				if(r === index) a += 1
				if(r !== index && r !== -1) b += 1
			})
			return (a == 4)? 1 : 0
		}

		function bindClick() {
			buttonEl.addEventListener('click', function() {
				inputNum = inputEl.value
				if(inputNum.length == 4) {
					if(toVerify() && guessNum) {
						guessNum = 6
						resultEl.innerHTML = ""
						inputEl.value = ""
						reset()
						toast('恭喜你猜中了！')
					} else if(guessNum === 0) {
						guessNum = 6
						resultEl.innerHTML = ""
						inputEl.value = ""
						reset()
						toast('游戏结束')
					} else {
						verifyHtml(inputNum)
						guessNum--
					}
				} else {
					toast('请输入四位数')
				}
				a = 0,b = 0
				inputEl.value = ''
			})
		}
	}
})()