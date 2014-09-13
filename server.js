/*!
**  bonsai-tasks -- Just another TODO application.
**  Copyright (c) 2014 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/bonsai-tasks>
*/
// - -------------------------------------------------------------------- - //
// - libs

var lib = {
  express: require("express"),
};

// - -------------------------------------------------------------------- - //
// - app

var app = lib.express();

app.use( lib.express.static("./www") );

app.listen(3232);

// - -------------------------------------------------------------------- - //
