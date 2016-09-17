var FixInput = function($el, options) {
	this.$el = $el;
	this.options = $.extend({
		list: [],
		value: null
	}, options);
	this._init();
};


FixInput.prototype._init = function() {
	this.load(this.options.value);
};

FixInput.prototype.load = function(v, callback) {
	
	callback = callback || function() {};
	var self = this;
	var text = this.options.list.join('-');
	if(v) {
		text = '[' + v + '] >> ' + text;
	}
	
	setTimeout(function() {
		self.$el.val(text + ' >> ' + new Date().getSeconds());
		callback(v);
	}, 500);
	
};



$.fn.fixInput = function() {
	$(this)
		.each(function() {
			window.test = new FixInput($(this), {
				list: [1, 2, 3],
				value: 1
			});
		});
};


var Input = Vue.extend({
	template: '<input type="text" :class="class">',
	props: ['options', 'class', 'disabled'],
	// data: function() {
		// return {
			// list: [],
			// value: null
		// }
	// },
	watch: {
		'options.value': function(v) {
			this._fixInput.load(v);
		},
		'options.disabled': function(v) {
			this._fixInput.$el.prop('disabled', parseInt(v));
		}
	},
	ready: function() {
		this._fixInput = new FixInput($(this.$el), this.options);
	}
});

Vue.component('fix-input', Input);


//\\//\\//
$('#test1').fixInput();

window.vvv = new Vue({
	replace: false,
	el: $('#com').get(0),
	template: '<fix-input :options="options" :class="\'xxx\'" :disabled="disabled"></fix-input>',
	data: {
		options: {
			list: [5, 6, 7],
			value: 6,
			disabled: 0
		}
	}
});


//=========================================
  function _debounce(func, wait) {
    var timeout, args, context, timestamp, result;
    var later = function later() {

		console.log('later: ', new Date());

      var last = Date.now() - timestamp;
		console.log('last:', last);
      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    };
    return function () {
      context = this;
      args = arguments;
      timestamp = Date.now();
      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
      return result;
    };
  }

var f = _debounce(function() {
	console.log('f:', new Date());
}, 5000);


console.log(new Date());
f();
setTimeout(f, 2000);



