var store={
	save(key,value){
       localStorage.setItem(key,JSON.stringify(value));
	},
	fetch(key){
       return JSON.parse(localStorage.getItem(key)) || [];
	}
}

var list = store.fetch("todolist");

var filter = {
	all:function(list){
		return list;
	},
	finished:function(list){
		return list.filter(function(item){
			return item.isChecked;
		})
	},
	unfinished:function(){
		return list.filter(function(item){
			return !item.isChecked;
		})
	}
}

var vm = new Vue({
	el:".main",
	data:{
		list:list,
		todo:"",
		editTodo:"",
		before:"",
		visibility:"all"
	},
	watch:{
		//list:function(){
        //   store.save("todolist",this.list);
		//}
		list:{
			handler:function(){
			  store.save("todolist",this.list);
		    },
		    deep:true
		}		
	},
	computed:{
        noCkecked:function(){
        	return this.list.filter(function(item){
              return !item.isChecked
            }).length
        },
        filterlist:function(){
        	return filter[this.visibility] ? filter[this.visibility](list) : list;
        }
	},
	methods:{
		addTodo(ev){
            this.list.push({
				title:this.todo,
				isChecked:false
			});
			this.todo = "";			
		},
		deleteTodo(item){
			var index = this.list.indexOf(item);
			this.list.splice(index,1);
		},
		aditTodo(item){
			this.before = item.title;
            this.editTodo = item;           
		},
		editEnd(item){
			this.editTodo = "";
		},
		cancel(item){
			item.title = this.before;
			this.editTodo = "";
		}
	},
	directives:{
		"focus":{
			update(el,bingding){
               if(bingding.value){
               	 el.focus();
               }
			}
		}
	}
});

function wqtchHash(){
	var hash = window.location.hash.slice(1);
    vm.visibility = hash;
}

wqtchHash()

window.addEventListener('hashchange', wqtchHash);