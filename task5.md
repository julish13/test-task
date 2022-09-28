I think the best solution is lifting the shared state up to the closest common ancestor (the Parent component).

```js
import React, { FC, useReducer } from 'react';

const ChildProps = {
  toggleOpen: () => void, 
  children?: React.ReactNode,
}

const Child: FC<ChildProps>  = ({children, toggleOpen}) => {
  return (
    <div>
      <button onClick={toggleOpen}>Toggle</button>
      {children}
    </div>
  );
};

export const Parent: FC = () => {
  const [open, toggleOpen] = useReducer((value) => !value, false);
  return (
    <div>
      <Child toggleOpen={toggleOpen}>
        <SomeOtherComponent open={open}/>
      </Child>
    </div>
  );
};
```

The benefits of this solution:
- This is how the state in React is supposed to be used;
- The code is clear, readable, maintainable, and scalable;
- The solution is elegant and simple;

I don't see any drawbacks.

Other options we can use here:

- Context API or 3rd party library for the shared state (in this case seems as an overkill);
- We can lift up the state using useEffect inside a Child component but this way seems to be just cluttering the code with unnecessary variables and props drilling, and this is not how the shared state is supposed to maintain;