(function(module) {
  var articlesController = {};

  Article.createTable();  // Ensure the database table is properly initialized

  articlesController.index = function(ctx, next) {
    articleView.index(ctx.articles);
  };

  // COMMENT: What does this method do?  What is it's execution path?

  /*
  this is a method of the articlesController object. It takes ctx and next as parameters. ctx is the context object, while next just moves on to executing the next callback on the particular route. loadById recognizes the ID of the route, and then pulls up that particular article in its entirety. It then moves on to the next callback (articleController.index), which then actually renders the particular article by feeding the specific articles to articleView.index, which shows #articles, hides its siblings, and then renders the article with that specific ID in the DOM.
  */
  articlesController.loadById = function(ctx, next) {
    var articleData = function(article) {
      ctx.articles = article;
      console.log(ctx.articles);
      next();
    };

    Article.findWhere('id', ctx.params.id, articleData);
  };

  // COMMENT: What does this method do?  What is it's execution path?

    /*
    Pretty similar to the method we explaineda above. This one is also a method of the articlesController object taking in Context and Next as parameters (next just calls the next callback in the chain). This method returns articles specific to the selected author, and then moves on to articleController.index, which in turn calls articleView.index with the selected articles as a parameter, in order to then execute the functionality of articleView.index (in order to hide all siblings of #articles, and then append articles specific to that author to #articles in order to render to the DOM).
    */
  articlesController.loadByAuthor = function(ctx, next) {
    var authorData = function(articlesByAuthor) {
      ctx.articles = articlesByAuthor;
      next();
    };

    Article.findWhere('author', ctx.params.authorName.replace('+', ' '), authorData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  /*
  Also similar to the methods explained above. This one is also a method of the articlesController object and takes in Context and Next as parameters (next, once again, calls the next callback in the chain for that route). loadByCategory takes in the context object and then selects articles specific to that category, which are then fed to articleController.index, which then calls articleView.index using the selected articles as a parameter. articleView.index then renders to the DOM by executing the functionality already explained above.
  */

  articlesController.loadByCategory = function(ctx, next) {
    var categoryData = function(articlesInCategory) {
      ctx.articles = articlesInCategory;
      next();
    };

    Article.findWhere('category', ctx.params.categoryName, categoryData);
  };

  // COMMENT: What does this method do?  What is it's execution path?

  /*
  This is also a method of the articlesController object. It takes in context and next as parameters (next calls the next callback in the chain). loadAll creates articleData, which is a function that takes in allARticles as a parameter. it then assigns ctx.articles to be the same as all articles, and then calls articlesController.index. This method calls articleView.index and sends in all articles as a parameter, so that articleView.index can then append them to the articles id and properly render to the DOM. 
  */
  articlesController.loadAll = function(ctx, next) {
    var articleData = function(allArticles) {
      ctx.articles = Article.all;
      next();
    };

    if (Article.all.length) {
      ctx.articles = Article.all;
      next();
    } else {
      Article.fetchAll(articleData);
    }
  };


  module.articlesController = articlesController;
})(window);
