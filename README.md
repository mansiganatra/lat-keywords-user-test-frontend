# LAT Keywords User Test Frontend

This is a front end app for LA Times keyword search. This project uses React on the front end and flask for the backend deployed in aws.

```js
/**
 * SPECIAL NOTE:
 * variables and functions that are defined in SearchProvider can be undefined. If those vars and functions are used and invoked, TypeScript will error out. To invoke, you must use "!"
 * */
  const { docset, deleteModel, keywordModeRef} = useContext(searchContext);

  // func
  deleteModel!(id);

  // destructuring from object
  const { models } = docset!;

  // changing ref value
  keywordModeRef!.current = true;
```

## Technologies Used

- React (CRA)
- TypeScript
- React-Router
- Styled Components
- axios
- eslint
- prettier

## Local development

```bash
$ git clone https://github.com/mansiganatra/lat-keywords-user-test-frontend.git
$ cd lat-keywords-user-test-frontend
$ npm install
$ npm start
```

## Test

```bash
$ npm run test
```
