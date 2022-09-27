1) Props drilling. It makes the code cluttered and difficult to maintain. In addition, we may accidentally rename props midway through this 'drilling' process and run into bugs. These issues are compounded for large-scale applications, thus making this process infeasible.

2) There are several common methods to solve the props drilling problem:

    - React Context API

    - Composition

    - Third-party state management library (Redux, MobX, etc.).

    In this case, I think composition is the best option because context or 3rd party libraries seem like overkill. The Parent component will look this way:

    ```js
    export const Parent: FC = () => {
      const [count, setCount] = useState(0);
      const [extraA, setExtraA] = useState(1);
      const [extraB, setExtraB] = useState(2);
      return (
        <LayerA extraA={extraA}>
          <LayerB extraB={extraB}>
            <Child count={count} setCount={setCount} />
          </LayerB>
        </LayerA>
      );
    };
    ```

3) Benefits and drawbacks of each method.

    3.1. React Context API:
      - pros:
          - The build-in React tool has not influenced the final bundle size, and it is integrated by design with every npm package;
          - Easier to understand and handle for beginners compared to 3rd party libraries;
          - Excellent for more static data;
          - A lot of local contexts to handle separate logic tasks can be in the application;
      - cons:
          - Context-API is not designed for often refreshed or changed data;
          - There could be more difficult maintenance in more complex frontend applications, especially if we have custom solutions and helpers;
          - Reuse components are harder, because some data come from context, not always from props.

    3.2. Composition:
      - pros:
          - The code is more transparent, with fewer components that feel like a black box;
          - No need to use external libraries;
          - This pattern is recommended by the creators of React to avoid props drilling if it is not some global state which needs to be accessible by many components at different nesting levels;
      - cons:
          - Could be difficult to implement on large-scale applications as the container component could be too nested and splitting could lead to the same props drilling for the global state;
          - Building good, reusable, effective, and maintainable components requires an advanced understanding of design patterns;
          - Could look like a move from the "prop drilling" to the "component drilling" if the composition is not intelligent enough;
      
    3.3. Third-party state management library:
      - pros:
          - Common used (popularity) - a lot of problems are resolved by the community;
          - Designed for often changed (refreshed) data;
          - Additional features for debugging;
          - Code organization - applications with popular libraries usually have similar architecture, so it is easier to understand the next project for experienced developers;
      - cons:
          - Not build-in in React (increases a final bundle size);
          - More setup and terms to understand than Context API;
          - Reuse components are harder because some data come from the global state, not from props;
