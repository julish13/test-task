1) Using the index as a key. This can negatively impact performance and may cause issues with component state.

2) Each item should have a unique id as a key. In this example, we should use the ```id``` property which every ```Book``` has to have according to the interface.

```js
export interface Book {
  id: string;
  name: string;
}

export const BooksList: FC<{ books: Book[] }> = ({ books } => {
  return (
    <ul>
      {books.map((book) => (
        <li key={book.id}>{book.name}</li>
      ))}
    </ul>
  )
}
```

3) We can use the index as a key safely if following conditions are met:

 - the list and items are static–they are not computed and do not change;
 - the list is never reordered or filtered.

But as there is an ```id``` property in the ```Book``` interface I would still use it and not the index for the key just to avoid the anti-pattern.