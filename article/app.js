System.register(['angular2/platform/browser', 'angular2/core'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var browser_1, core_1;
    var Article, ArticleComponent, RedditApp;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            Article = (function () {
                function Article(title, link, votes) {
                    var _this = this;
                    this.voteUp = function () {
                        _this.votes += 1;
                    };
                    this.voteDown = function () {
                        _this.votes -= 1;
                    };
                    this.domain = function () {
                        try {
                            var link = _this.link.split('//')[1];
                            return link.split('/')[0];
                        }
                        catch (err) {
                            return null;
                        }
                    };
                    this.title = title;
                    this.link = link;
                    this.votes = votes || 0;
                }
                return Article;
            })();
            // articles component
            ArticleComponent = (function () {
                function ArticleComponent() {
                    var _this = this;
                    this.voteUp = function () {
                        _this.article.voteUp();
                        return false;
                    };
                    this.voteDown = function () {
                        _this.article.voteDown();
                        return false;
                    };
                }
                ArticleComponent = __decorate([
                    core_1.Component({
                        selector: 'reddit-article',
                        // pass <reddit-article [article]="article1"></reddit-article> article attribute into component
                        inputs: ['article'],
                        // a component host is the element this component is attached to. This tells Angular that on the host
                        // element (the reddit-article tag) we want to set the class attribute to have “ row ”.
                        host: {
                            class: 'row'
                        },
                        template: "\n        <div class=\"four wide column center aligned votes\">\n            <div class=\"ui statistic\">\n                <div class=\"value\">\n                    {{ article.votes }}\n                </div>\n                <div class=\"label\">\n                    Points\n                </div>\n            </div>\n        </div>\n        <div class=\"twelve wide column\">\n            <a class=\"ui large header\" href=\"{{ article.link }}\">{{ article.title }}</a>\n            <div class=\"meta\">({{ article.domain() }})</div>\n            <ul class=\"ui big horizontal list voters\">\n                <li class=\"item\">\n                    <a href (click)=\"voteUp()\">\n                        <i class=\"arrow up icon\"></i>upvote\n                    </a>\n                </li>\n                <li class=\"item\">\n                    <a href (click)=\"voteDown()\">\n                        <i class=\"arrow down icon\"></i>downvote\n                    </a>\n                </li>\n            </ul>\n        </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [])
                ], ArticleComponent);
                return ArticleComponent;
            })();
            // binding strategies: http://victorsavkin.com/post/119943127151/angular-2-template-syntax
            RedditApp = (function () {
                function RedditApp() {
                    var _this = this;
                    this.addArticle = function (title, link) {
                        console.log("Adding article title: " + title.value + " and link: " + link.value);
                        _this.articles.push(new Article(title.value, link.value, 0));
                        title.value = '';
                        link.value = '';
                    };
                    this.articles = [
                        new Article('Angular 2', 'http://angular.io', 3),
                        new Article('Fullstack', 'http://fullstack.io', 2),
                        new Article('Angular Homepage', 'http://angular.io', 1),
                    ];
                }
                RedditApp.prototype.sortedArticles = function () {
                    return this.articles.sort(function (a, b) { return b.votes - a.votes; });
                };
                RedditApp = __decorate([
                    core_1.Component({
                        selector: 'reddit',
                        directives: [ArticleComponent],
                        template: "\n        <form class=\"ui large form segment\">\n            <h3 class=\"ui header\">Add a Link</h3>\n            \n            <div class=\"field\">\n                <label for=\"title\">Title:</label>\n                <input name=\"title\" #newtitle>\n            </div>\n            \n            <div class=\"field\">\n                <label for=\"link\">Link:</label>\n                <input name=\"link\" #newlink>\n            </div>\n            \n            <button class=\"ui positive right floated button\" (click)=\"addArticle(newtitle, newlink)\">Submit Link</button>\n            \n            <div class=\"ui grid posts\">\n                <reddit-article *ngFor=\"#article of sortedArticles()\" [article]=\"article\"></reddit-article>\n            </div>\n        </form>\n    "
                    }), 
                    __metadata('design:paramtypes', [])
                ], RedditApp);
                return RedditApp;
            })();
            browser_1.bootstrap(RedditApp);
        }
    }
});
//# sourceMappingURL=app.js.map