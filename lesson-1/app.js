var config = [{
	href: '/',
	name: "Главная"
}, {
	href: '/catalog',
	name: "Каталог",
	items: [{
		href: '/1',
		name: "Товар 1"
	}, {
		href: '/2',
		name: "Товар 2"
	}],
}, {
	href: '/gallery',
	name: "Галерея",
	items: [{
			href: '/1',
			name: "Фото 1"
		}, {
			href: '/2',
			name: "Фото 2"
		}],
}];

class Container {
	remove(id) {
		let itemToRemove = document.getElementById(id);
		itemToRemove.remove();
		console.log('Item was successfully removed');	
	}
};

class Menu extends Container {
	/* static info(){
		console.log('show info');
	} */
	constructor(id, config){
		super();
		this.id = id;
		this.items = [];
		this.createItems(config);
	}
	createItems(config){
		for (let i = 0; i < config.length; i++) {
			this.items.push(new MenuItem(config[i].href, config[i].name, config[i].items));

			//Добвляем id к самому Ul
			this.items[i].id = `item-id-${i}`;
			// console.log(this.items);			
		}
	}
	create(){
		let container = document.querySelector('.container');
		container.appendChild(this.render(this.id));
	}
	render(id){
		let result = document.createElement('ul');
		result.id = id;

		for (let i = 0; i < this.items.length; i++) {
			result.appendChild(this.items[i].render(this.items[i].id));			
		}	
		// console.log(result);
		return result;		
	}
};

class MenuItem extends Container {
	constructor(href, name, items) {
		super();
		this.href = href;
		this.name = name;
		this.items = items;
		this.subItems;		
		this.createNewItems(this.items);			
	}
	createNewItems(items) {
		if (items) {
			let miniUl = document.createElement('ul');
			
			for (let i = 0; i < items.length; i++) {
				let miniLi = document.createElement('li');					
				let miniA = document.createElement('a');
				miniLi.appendChild(miniA);
				miniA.innerText = items[i].name;
				miniA.href = items[i].href;
				miniUl.appendChild(miniLi);
			}
			this.subItems = miniUl;
			// console.log(miniUl);
		}		
	}

	render(id) {
		let item = document.createElement('li');
		//Добавляем id к основным li
		item.id = id;	

		let newA = document.createElement('a');
		newA.href = this.href;
		newA.innerText = this.name;
		item.appendChild(newA);
		if (this.subItems) {
			item.appendChild(this.subItems);		

			//Добавляем id к вложенным li
			for (let i=0; i<this.subItems.childNodes.length; i++) {
				this.subItems.childNodes[i].id = `${id}-${i}`;

				// console.log(this.subItems.childNodes[i]);
			}
		}
		// console.log(item);
		return item;
	}	
}

let menu = new Menu('main-menu', config);
menu.create();

// Метод удаляет по id
// menu.remove('main-menu'); - удаление Меню
// menu.remove('item-id-0'); - удаление основного li
// menu.remove('item-id-2-0'); - удаление вложенного li


// console.log(menu);
// Menu.info();