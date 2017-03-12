module.exports = (function(){
    function pingPong(goal) {
        var output = [];
        for (var i = 1; i <= goal; i++) {
            if (i % 15 === 0) {
                output.push("pingity-pongity");
            } else if (i % 5 === 0) {
                output.push("pong");
            } else if (i % 3 === 0) {
                output.push("ping");
            } else  {
                output.push(i);
            }
        }
        return output;
    }


    return {
        pingityPongity: pingPong // this is exposed to the outside because it's a returned key-value pair
    };

}());
// https://toddmotto.com/mastering-the-module-pattern/
