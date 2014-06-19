!function () {
	var dataStore = localStorage;

	function setData (name, data) {
		var previousData = store.getData(name) || {},
			newData = Object.merge(previousData, data);
		return dataStore.setItem(name, JSON.stringify(newData));
	}

	function getData (name) {
		var item = dataStore.getItem(name);
		return JSON.parse(item);
	}

	return window.store = {
		setData: setData,
		getData: getData
	}

}();







