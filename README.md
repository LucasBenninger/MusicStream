# MusicStream

An opensource, self hosted music streaming service.

This project is far from complete, and is actively being worked on.

The Stack:

- Node.js
- Express.js
- Handlebars (Temporary, incomplete)
- MongoDB
- Vue.js (Planned, incomplete)

To run, you will need to create a `keys.js` file at `./server/config/` for the MongoDB Connection URI

```javascript
module.exports = {
	mongoURI: "mongodb://user:pass@127.0.0.1:27017/MusicStream"
};
```

To use, ensure you have Node.js, NPM, and MongoDB installed.

```bash
git clone git@github.com:LucasBenninger/MusicStream.git
cd MusicStream
npm install
npm run
```
