{"filter":false,"title":"index.js","tooltip":"/routes/index.js","undoManager":{"mark":15,"position":15,"stack":[[{"start":{"row":0,"column":0},"end":{"row":1,"column":35},"action":"insert","lines":["var express     = require(\"express\"),","    router      = express.Router(),"],"id":1}],[{"start":{"row":1,"column":34},"end":{"row":1,"column":35},"action":"remove","lines":[","],"id":2}],[{"start":{"row":1,"column":34},"end":{"row":1,"column":35},"action":"insert","lines":[";"],"id":3}],[{"start":{"row":1,"column":35},"end":{"row":2,"column":0},"action":"insert","lines":["",""],"id":4},{"start":{"row":2,"column":0},"end":{"row":2,"column":4},"action":"insert","lines":["    "]},{"start":{"row":2,"column":4},"end":{"row":3,"column":0},"action":"insert","lines":["",""]},{"start":{"row":3,"column":0},"end":{"row":3,"column":4},"action":"insert","lines":["    "]}],[{"start":{"row":3,"column":0},"end":{"row":3,"column":4},"action":"remove","lines":["    "],"id":5}],[{"start":{"row":3,"column":0},"end":{"row":13,"column":3},"action":"insert","lines":["//Home page","router.get(\"/\", function(req, res) {","    Photo.find({showOnHome: true}, function(err, backgrounds){","        if(err) {","            console.log();","        } else {","            res.render(\"home\", {backgrounds: backgrounds});","        }","    });","    ","});"],"id":6}],[{"start":{"row":10,"column":0},"end":{"row":11,"column":7},"action":"remove","lines":["        }","    });"],"id":7}],[{"start":{"row":10,"column":0},"end":{"row":11,"column":4},"action":"remove","lines":["","    "],"id":8}],[{"start":{"row":5,"column":0},"end":{"row":8,"column":16},"action":"remove","lines":["    Photo.find({showOnHome: true}, function(err, backgrounds){","        if(err) {","            console.log();","        } else {"],"id":9},{"start":{"row":4,"column":36},"end":{"row":5,"column":0},"action":"remove","lines":["",""]}],[{"start":{"row":5,"column":59},"end":{"row":6,"column":0},"action":"remove","lines":["",""],"id":10}],[{"start":{"row":5,"column":8},"end":{"row":5,"column":12},"action":"remove","lines":["    "],"id":11},{"start":{"row":5,"column":4},"end":{"row":5,"column":8},"action":"remove","lines":["    "]},{"start":{"row":5,"column":0},"end":{"row":5,"column":4},"action":"remove","lines":["    "]}],[{"start":{"row":5,"column":0},"end":{"row":5,"column":4},"action":"insert","lines":["    "],"id":12}],[{"start":{"row":5,"column":48},"end":{"row":5,"column":49},"action":"remove","lines":["}"],"id":13},{"start":{"row":5,"column":47},"end":{"row":5,"column":48},"action":"remove","lines":["s"]},{"start":{"row":5,"column":46},"end":{"row":5,"column":47},"action":"remove","lines":["d"]},{"start":{"row":5,"column":45},"end":{"row":5,"column":46},"action":"remove","lines":["n"]},{"start":{"row":5,"column":44},"end":{"row":5,"column":45},"action":"remove","lines":["u"]},{"start":{"row":5,"column":43},"end":{"row":5,"column":44},"action":"remove","lines":["o"]},{"start":{"row":5,"column":42},"end":{"row":5,"column":43},"action":"remove","lines":["r"]},{"start":{"row":5,"column":41},"end":{"row":5,"column":42},"action":"remove","lines":["g"]},{"start":{"row":5,"column":40},"end":{"row":5,"column":41},"action":"remove","lines":["k"]},{"start":{"row":5,"column":39},"end":{"row":5,"column":40},"action":"remove","lines":["c"]},{"start":{"row":5,"column":38},"end":{"row":5,"column":39},"action":"remove","lines":["a"]},{"start":{"row":5,"column":37},"end":{"row":5,"column":38},"action":"remove","lines":["b"]},{"start":{"row":5,"column":36},"end":{"row":5,"column":37},"action":"remove","lines":[" "]},{"start":{"row":5,"column":35},"end":{"row":5,"column":36},"action":"remove","lines":[":"]},{"start":{"row":5,"column":34},"end":{"row":5,"column":35},"action":"remove","lines":["s"]},{"start":{"row":5,"column":33},"end":{"row":5,"column":34},"action":"remove","lines":["d"]}],[{"start":{"row":5,"column":32},"end":{"row":5,"column":33},"action":"remove","lines":["n"],"id":14},{"start":{"row":5,"column":31},"end":{"row":5,"column":32},"action":"remove","lines":["u"]},{"start":{"row":5,"column":30},"end":{"row":5,"column":31},"action":"remove","lines":["o"]},{"start":{"row":5,"column":29},"end":{"row":5,"column":30},"action":"remove","lines":["r"]},{"start":{"row":5,"column":28},"end":{"row":5,"column":29},"action":"remove","lines":["g"]},{"start":{"row":5,"column":27},"end":{"row":5,"column":28},"action":"remove","lines":["k"]},{"start":{"row":5,"column":26},"end":{"row":5,"column":27},"action":"remove","lines":["c"]},{"start":{"row":5,"column":25},"end":{"row":5,"column":26},"action":"remove","lines":["a"]},{"start":{"row":5,"column":24},"end":{"row":5,"column":25},"action":"remove","lines":["b"]},{"start":{"row":5,"column":23},"end":{"row":5,"column":24},"action":"remove","lines":["{"]},{"start":{"row":5,"column":22},"end":{"row":5,"column":23},"action":"remove","lines":[" "]},{"start":{"row":5,"column":21},"end":{"row":5,"column":22},"action":"remove","lines":[","]}],[{"start":{"row":6,"column":3},"end":{"row":7,"column":0},"action":"insert","lines":["",""],"id":15},{"start":{"row":7,"column":0},"end":{"row":8,"column":0},"action":"insert","lines":["",""]}],[{"start":{"row":8,"column":0},"end":{"row":8,"column":24},"action":"insert","lines":["module.exports = router;"],"id":16}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":8,"column":24},"end":{"row":8,"column":24},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1527220111473,"hash":"9cc3ea272465aca034da7d8c8f2dac1f124c8947"}