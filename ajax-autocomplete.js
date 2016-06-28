;(function(w, document, undefined){

	w.AjaxAutocomplete = function(_input){

		if (!_input){console.log('Не задан инпут!');return false;}

		var element = function(el, attrs, innerhtml){
				var _el = document.createElement(el);
				if(typeof attrs === 'object'){for(k in attrs){_el.setAttribute(k, attrs[k]);}};
				if(innerhtml){_el.innerHTML = innerhtml};
				return _el;
			},			
			_loader = element('div', {'class': 'ajax-autocomplete-loader hidden'}, 'загрузка'),
			_input = document.getElementById(_input)||_input,
			result_cont = element('div', {'class': 'ajax-autocomplete hidden', 'input-name':_input.getAttribute('class')}),
			_delay_timer;

			// _input.addEventListener('click', function(){				
			// 	(this.value.length > 0)?_show_results(this.value):false;
			// });
			
			var _delay_search = function (val) {
				var self = this;
			    clearTimeout(_delay_timer);
			    _delay_timer = setTimeout(function() {
			    	(val.length > 0)?_show_results(val):false;    
			    }, 500);
			};

			_input.addEventListener('keyup', function(){
				autocomplete._input.click();
				autocomplete.set_value(this.value);
				_delay_search(this.value);
			});

			document.body.addEventListener('click', function(event){
				if (event.target != _input && event.target != autocomplete.result_cont ){
					autocomplete.hide_results();
				}				
			});
			var _draw_res_row = function(text, value){
				var r = element('div', {'value':value, 'class':'ajax-autocomplete-data-row'}, text);
				r.addEventListener('click',function(){
					autocomplete.set_value({'text':text, 'value':value});
				});
				return r;
			};
			
			var _redraw = function(){
					autocomplete.result_cont.style.width = autocomplete._input.offsetWidth+'px';
					autocomplete.result_cont.style.top = (autocomplete._input.offsetTop+autocomplete._input.offsetHeight-1)+'px';
					autocomplete.result_cont.style.left = autocomplete._input.offsetLeft+'px';
			};
			var _redraw_loader = function(){
				document.body.appendChild(_loader);
				_loader.style.width = autocomplete._input.offsetWidth+'px';
				_loader.style.top = autocomplete._input.offsetTop+'px';
				_loader.style.left = autocomplete._input.offsetLeft+'px';
			};

			var _show_loader = function(){ _redraw_loader(); autocomplete._loader.classList.remove('hidden'); };
			var _hide_loader = function(){ autocomplete._loader.classList.add('hidden'); };

			var _show_results = function(_input_value){							
				autocomplete.result_cont.innerHTML = '';
				_show_loader();
				if ( autocomplete.search_func && typeof autocomplete.search_func === 'function' ){
					autocomplete.search_func(_input_value, function(data){
						console.log(data);						
						_hide_loader();
						if (Object.keys( data ).length > 0){
							for (k in data) {
								autocomplete.result_cont.appendChild(_draw_res_row(data[k].text, data[k].value));
							}						
						}/*else{
							result_cont.appendChild(_draw_res_row('Совпадений не найдено', 'false'));
						}	*/					
						autocomplete.show_results();
					});														
				}
			};

		var autocomplete = {
			result_cont: result_cont,
			_input: _input,
			_loader: _loader,
			init: function(){				
				var self = this;
				self._input.classList.add('ajax-autocomplete-input');
				document.body.appendChild(self.result_cont);
			},			
			show_results: function(){ _redraw(); this.result_cont.classList.remove('hidden'); },
			hide_results: function(){ this.result_cont.classList.add('hidden'); },
			set_value: function(v){
				if (typeof v === 'string'){
					this.current_value = v; this._input.value = v;
				}else{
					this.current_value = v; this._input.value = v.text;
				}				
				this._input.click(); 
			},			
			get_value: function(){ return (this.current_value)?(this.current_value.value||this.current_value):_input.value; },
			search_func: false,
			current_value: false,
		};

		return autocomplete;

	};

})(window, document);