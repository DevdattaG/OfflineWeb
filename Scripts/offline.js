$(document).ready(function () {
    console.log("App loaded ...");
    var appCacheData = window.applicationCache;
    $("#networkStatus").text(navigator.onLine ? "Online" : "Offline");
    window.addEventListener("online", handleConnectivity, false);
    window.addEventListener("offline", handleConnectivity, false);

    appCacheData.addEventListener('cached', handleCacheEvent, false);
    appCacheData.addEventListener('checking', handleCacheEvent, false);
    appCacheData.addEventListener('downloading', handleCacheEvent, false);
    appCacheData.addEventListener('error', handleCacheError, false);
    appCacheData.addEventListener('noupdate', handleCacheEvent, false);
    appCacheData.addEventListener('obsolete', handleCacheEvent, false);
    appCacheData.addEventListener('progress', handleCacheEvent, false);
    appCacheData.addEventListener('updateready', handleCacheEvent, false);
})

function handleCacheEvent(e) {
    console.log("cache status : " + e.type);
    if (e.type === "updateready" && window.applicationCache.status === window.applicationCache.UPDATEREADY) {
        window.applicationCache.swapCache();
        window.location.reload();
    }
}

function handleCacheError(e) {
    if(navigator.onLine) {
        console.log('Error: Cache failed to update!');
    }    
}

function handleConnectivity(e) {
    console.log(e.type);
    $("#networkStatus").text(navigator.onLine ? "Online" : "Offline");
    if (e.type === "online") {
        window.location.reload();
        window.applicationCache.update();       
    }
}