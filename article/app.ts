import { bootstrap } from 'angular2/platform/browser';
import { Component } from 'angular2/core';
import { NgFor } from 'angular2/common'

// keep the class before components annotation...
class Article {
    title: string;
    link: string;
    votes: number;
    constructor(title: string, link: string, votes?: number) {
        this.title = title;
        this.link = link;
        this.votes = votes || 0;
    }
    
    voteUp = (): void => {
        this.votes += 1;
    }
    
    voteDown = (): void => {
        this.votes -= 1;
    }
    
    domain = (): string => {
        try {
            const link: string = this.link.split('//')[1];
            return link.split('/')[0];
        } catch (err) {
            return null;
        }
    }
}

class ArticleComponent {
    article: Article
    
    voteUp = (): boolean => {
        this.article.voteUp();
        return false;
    }
    voteDown = (): boolean => {
        this.article.voteDown();
        return false;
    }
}


// articles component
@Component({
    selector: 'reddit-article',
    // pass <reddit-article [article]="article1"></reddit-article> article attribute into component
    inputs: ['article'],
    // a component host is the element this component is attached to. This tells Angular that on the host
    // element (the reddit-article tag) we want to set the class attribute to have “ row ”.
    host: {
        class: 'row'
    },
    template: `
        <div class="four wide column center aligned votes">
            <div class="ui statistic">
                <div class="value">
                    {{ article.votes }}
                </div>
                <div class="label">
                    Points
                </div>
            </div>
        </div>
        <div class="twelve wide column">
            <a class="ui large header" href="{{ article.link }}">{{ article.title }}</a>
            <div class="meta">({{ article.domain() }})</div>
            <ul class="ui big horizontal list voters">
                <li class="item">
                    <a href (click)="voteUp()">
                        <i class="arrow up icon"></i>upvote
                    </a>
                </li>
                <li class="item">
                    <a href (click)="voteDown()">
                        <i class="arrow down icon"></i>downvote
                    </a>
                </li>
            </ul>
        </div>
    `
})

// binding strategies: http://victorsavkin.com/post/119943127151/angular-2-template-syntax
@Component({
    selector: 'reddit',
    directives: [ArticleComponent],
    template: `
        <form class="ui large form segment">
            <h3 class="ui header">Add a Link</h3>
            
            <div class="field">
                <label for="title">Title:</label>
                <input name="title" #newtitle>
            </div>
            
            <div class="field">
                <label for="link">Link:</label>
                <input name="link" #newlink>
            </div>
            
            <button class="ui positive right floated button" (click)="addArticle(newtitle, newlink)">Submit Link</button>
            
            <div class="ui grid posts">
                <reddit-article *ngFor="#article of sortedArticles()" [article]="article"></reddit-article>
            </div>
        </form>
    `
})


class RedditApp {
    articles: Article[];
    
    sortedArticles(): Article[] {
        return this.articles.sort((a: Article, b: Article) => b.votes - a.votes);
    }
    
    constructor() {
        this.articles = [
            new Article('Angular 2', 'http://angular.io', 3),
            new Article('Fullstack', 'http://fullstack.io', 2),
            new Article('Angular Homepage', 'http://angular.io', 1),
        ];
    }
    
    addArticle = (title: HTMLInputElement, link: HTMLInputElement) => {
        console.log(`Adding article title: ${title.value} and link: ${link.value}`);
        this.articles.push(new Article(title.value, link.value, 0));
        title.value = '';
        link.value = '';
    }
}

bootstrap(RedditApp);