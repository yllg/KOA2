
//父类，可以无限次点击

import "./index.js";

export class PraiseButton {
	constructor(ele=$('#PraiseButton'),num=0) {
		this.ele = ele;
		this.num = num;
		this.tId = 0;
	}
	click(){
		this.ele.on('click',(()=>{
			this.throttle(this.handleClick.bind(this));
		}).bind(this))
	}
	
	handleClick(){
	    clearTimeout(this.tId);
		this.num = add(this.num);
		this.pop();
		axios.get('/index/update')
  			.then(function (response) {
    			console.log(response);
			})
  			.catch(function (error) {
    			console.log(error);
  			});
		console.log(`父类被点了${this.num} 次！可无限点父类，不置灰色！！`);
		console.log('快速点击多次会被稀释成一次！');
	}

	throttle(method,context){
	    clearTimeout(this.tId);
	    this.tId = setTimeout(function(){
	        method.call(context);
	    },500);
	}

	pop() {
		$('#animation').addClass('num');
		setTimeout(function(){
		$('#animation').removeClass('num');
		},800);
	}

}


//子类，点击十次置灰；再点击从1开始
export class Thumb extends PraiseButton {
	constructor(ele=$('#Thumb'),num=0) {
		super(ele,num);
	}
	
	click(){
		this.ele.on('click',(()=>{
			super.throttle(this.handleClick.bind(this));
		}).bind(this))
	}
	handleClick(){
		if(this.num<9){
        	this.num = add(this.num);
        	super.pop();
        }else if(this.num === 9){
        	$('#PraiseButton').css('-webkit-filter','grayscale(1)');
        	$('#Thumb').css('-webkit-filter','grayscale(1)');
        	this.num = add(this.num);  
        	super.pop();	
        }else{
            this.num = 1;
            $('#PraiseButton').css('-webkit-filter','grayscale(0)');
        	$('#Thumb').css('-webkit-filter','grayscale(0)');
        	super.pop();
        }
		axios.get('/index/update')
  			.then(function (response) {
    			console.log(response);
			})
  			.catch(function (error) {
    			console.log(error);
  			});
		console.log(`子类被点了${this.num} 次！第10次变灰色，然后从头计数！！`);
		console.log('快速点击多次会被稀释成一次！');
	}
	
}





