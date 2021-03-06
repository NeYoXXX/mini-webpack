import {
	SyncHook,
	SyncBailHook,
	SyncWaterfallHook,
	SyncLoopHook,
	AsyncParallelHook,
	AsyncParallelBailHook,
	AsyncSeriesHook,
	AsyncSeriesBailHook,
	AsyncSeriesWaterfallHook
 } from "tapable";

 class Car {
	constructor() {
		this.hooks = {
			accelerate: new SyncHook(["newSpeed"]),
			brake: new SyncHook(),
			calculateRoutes: new AsyncParallelHook(["source", "target", "routesList"])
		};
	}

    setSpeed(newSpeed) {
		// following call returns undefined even when you returned values
		this.hooks.accelerate.call(newSpeed);
	}

	useNavigationSystemPromise(source, target) {
		const routesList = new List();
		return this.hooks.calculateRoutes.promise(source, target, routesList).then((res) => {
			// res is undefined for AsyncParallelHook
			return routesList.getRoutes();
		});
	}

	useNavigationSystemAsync(source, target, callback) {
		const routesList = new List();
		this.hooks.calculateRoutes.callAsync(source, target, routesList, err => {
			if(err) return callback(err);
			callback(null, routesList.getRoutes());
		});
	}
}

const myCar = new Car();
myCar.hooks.brake.tap("WarningLampPlugin", () => warningLamp.on());
myCar.hooks.accelerate.tap("LoggerPlugin", newSpeed => console.log(`Accelerating to ${newSpeed}`));

myCar.hooks.calculateRoutes.tapPromise("GoogleMapsPlugin", (source, target, routesList) => {
	// return a promise
	return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log('setTimeout');
        })
        resolve(1)
    })
});
// myCar.hooks.calculateRoutes.tapAsync("BingMapsPlugin", (source, target, routesList, callback) => {
// 	bing.findRoute(source, target, (err, route) => {
// 		if(err) return callback(err);
// 		routesList.add(route);
// 		// call the callback
// 		callback();
// 	});
// });

// // You can still use sync plugins
// myCar.hooks.calculateRoutes.tap("CachedRoutesPlugin", (source, target, routesList) => {
// 	const cachedRoute = cache.get(source, target);
// 	if(cachedRoute)
// 		routesList.add(cachedRoute);
// })