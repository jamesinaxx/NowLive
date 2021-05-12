// eslint-disable-next-line no-undef
const Chrome = chrome;

function setStorage(key, value) {
	Chrome.storage.sync.set({ [key]: value }, () => {
		console.log(`Set the ${key} array to ` + value);
	});
}

function getStorage(key) {
	return new Promise((resolve) => {
		Chrome.storage.sync.get([key], (res) => {
			console.log(`Got the ${key} array: ` + res[key]);
			resolve(res[key]);
		});
	});
}

function setStorageLocal(key, value) {
	Chrome.storage.local.set({ [key]: value }, () => {
		console.log(`Set the ${key} array to ` + value);
	});
}

function getStorageLocal(key) {
	return new Promise((resolve) => {
		Chrome.storage.local.get([key], (res) => {
			console.log(`Got the ${key} array: ` + res[key]);
			resolve(res[key]);
		});
	});
}

export { setStorage, getStorage, setStorageLocal, getStorageLocal };
