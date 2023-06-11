# Imageboard Frontend

## Description
Imageboard Frontend is a simple single-page web application written in React.js and utilizing various HTML and CSS features. The main goal of the application is to allow users to browse and share images. It employs BrowserRoutes for seamless navigation between different sections.

## Scope
1. **Main Page** - displays uploaded images retrieved from IndexedDB. Images are loaded dynamically in triplets through InfiniteScroll. Clicking anywhere on the image area takes the user to a */comments/:imageId* page, which in turn consists of the image in its full resolution and a comments system.
2. **New Post** - enables the user to upload images. Supported formats include gif, png and jpeg. Upon successful upload, the user is redirected to the appropriate comments page.
3. **FAQ** - a short list of questions and answers. Each question and answer pair is an expendable accordion, with the former being its header and the latter being its content.
4. **Stuff** - displays a random quote loaded from */public/quotes.txt*. The quote is stylized using *CSS blockquote* and can be re-randomized by clicking on the *New quote* button. The footer contains a [github link](https://github.com/erossignon/qod4outlook/blob/master/quotes.txt) to the quotes source.
5. **Contact** - provides a button that opens a link to this github account.

## Technologies used
- React.js
- IndexedDB for storing and retrieving images and comments
- React Router for handling page navigation
- React Infinite Scroll Library for dynamically loading images on the main page