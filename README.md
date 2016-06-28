# ajax-autocomplete
var obj = null;

obj = new AjaxAutocomplete(this);
obj.init();
obj.search_func = some_search_func(data){};

obj.get_value();
obj.set_value(v);

/*
v = {
  1:{
    value: 'value',
    text: 'text'
  }
}
*/
