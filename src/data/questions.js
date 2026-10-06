const questions = [
  // =========================================================
  // JAVASCRIPT
  // =========================================================

  {
    id: 1,
    technology: "JavaScript",
    category: "Basics",
    difficulty: "Easy",
    type: "MCQ",
    question: "Which keyword is used to declare a block-scoped variable?",
    options: ["var", "let", "define", "variable"],
    answer: "let",
    explanation: "let is block-scoped and can be reassigned."
  },
  {
    id: 2,
    technology: "JavaScript",
    category: "Basics",
    difficulty: "Easy",
    type: "MCQ",
    question: "Which method converts a JSON string into a JavaScript object?",
    options: [
      "JSON.parse()",
      "JSON.stringify()",
      "JSON.convert()",
      "JSON.object()"
    ],
    answer: "JSON.parse()",
    explanation: "JSON.parse() converts a valid JSON string into a JavaScript object."
  },
  {
    id: 3,
    technology: "JavaScript",
    category: "Array",
    difficulty: "Easy",
    type: "Basic",
    question: "Which method adds an element to the end of an array?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    answer: "push()",
    explanation: "push() adds one or more elements to the end of an array."
  },
  {
    id: 4,
    technology: "JavaScript",
    category: "Functions",
    difficulty: "Easy",
    type: "Interview",
    question: "What is a function in JavaScript?",
    options: [
      "A reusable block of code",
      "A database",
      "A CSS property",
      "An HTML element"
    ],
    answer: "A reusable block of code",
    explanation: "A function is a reusable block of code designed to perform a particular task."
  },
  {
    id: 5,
    technology: "JavaScript",
    category: "Array",
    difficulty: "Medium",
    type: "Practical",
    question: "Which method creates a new array by transforming every element?",
    options: ["map()", "filter()", "find()", "forEach()"],
    answer: "map()",
    explanation: "map() returns a new array containing the transformed values."
  },
  {
    id: 6,
    technology: "JavaScript",
    category: "Array",
    difficulty: "Medium",
    type: "Practical",
    question: "Which method returns only the elements that satisfy a condition?",
    options: ["map()", "filter()", "reduce()", "forEach()"],
    answer: "filter()",
    explanation: "filter() creates a new array containing elements that pass the condition."
  },
  {
    id: 7,
    technology: "JavaScript",
    category: "Promises",
    difficulty: "Medium",
    type: "Interview",
    question: "What is a Promise in JavaScript?",
    answer:
      "A Promise represents the eventual completion or failure of an asynchronous operation.",
    explanation:
      "Promises are commonly used to handle asynchronous operations such as API requests."
  },
  {
    id: 8,
    technology: "JavaScript",
    category: "Promises",
    difficulty: "Medium",
    type: "MCQ",
    question: "Which method is used to handle a successfully resolved Promise?",
    options: [".catch()", ".then()", ".finally()", ".resolve()"],
    answer: ".then()",
    explanation: ".then() handles the fulfilled result of a Promise."
  },
  {
    id: 9,
    technology: "JavaScript",
    category: "Output",
    difficulty: "Medium",
    type: "Output",
    question: "What will be the output?\n\nconsole.log(typeof null);",
    options: ["null", "object", "undefined", "string"],
    answer: "object",
    explanation:
      "typeof null returns 'object'. This is a historical behavior in JavaScript."
  },
  {
    id: 10,
    technology: "JavaScript",
    category: "Debugging",
    difficulty: "Medium",
    type: "Debugging",
    question:
      "A developer uses == when strict comparison is required. Which operator should be used instead?",
    options: ["=", "===", "!=", "=>"],
    answer: "===",
    explanation:
      "=== compares both value and type without performing type coercion."
  },
  {
    id: 11,
    technology: "JavaScript",
    category: "Functions",
    difficulty: "Advanced",
    type: "Interview",
    question: "What is a closure in JavaScript?",
    answer:
      "A closure is a function that remembers variables from its outer lexical scope even after the outer function has finished executing.",
    explanation:
      "Closures are useful for data privacy, callbacks and maintaining state."
  },
  {
    id: 12,
    technology: "JavaScript",
    category: "Async JavaScript",
    difficulty: "Advanced",
    type: "Scenario",
    question:
      "You need to execute multiple independent API requests at the same time and continue only when all succeed. Which method would you use?",
    options: [
      "Promise.all()",
      "Promise.wait()",
      "Promise.parallel()",
      "Promise.single()"
    ],
    answer: "Promise.all()",
    explanation:
      "Promise.all() runs promises concurrently and resolves when all promises fulfill."
  },
  {
    id: 13,
    technology: "JavaScript",
    category: "Event Loop",
    difficulty: "Advanced",
    type: "Interview",
    question: "What is the JavaScript Event Loop?",
    answer:
      "The Event Loop allows JavaScript to handle asynchronous operations by moving queued callbacks to the call stack when it becomes available.",
    explanation:
      "JavaScript uses the call stack, task queues and Event Loop to coordinate asynchronous execution."
  },
  {
    id: 14,
    technology: "JavaScript",
    category: "Output",
    difficulty: "Hard",
    type: "Output",
    question:
      "What will be the output?\n\nconsole.log(1);\nsetTimeout(() => console.log(2), 0);\nconsole.log(3);",
    options: [
      "1 2 3",
      "1 3 2",
      "2 1 3",
      "3 2 1"
    ],
    answer: "1 3 2",
    explanation:
      "Synchronous code runs first. The setTimeout callback runs later through the task queue."
  },
  {
    id: 15,
    technology: "JavaScript",
    category: "Coding",
    difficulty: "Hard",
    type: "Coding",
    question:
      "Which array method can be used to calculate the sum of all numbers in an array?",
    options: ["reduce()", "filter()", "map()", "find()"],
    answer: "reduce()",
    explanation:
      "reduce() can accumulate all array values into a single result."
  },
  {
    id: 16,
    technology: "JavaScript",
    category: "Scope",
    difficulty: "Hard",
    type: "Scenario",
    question:
      "A variable should not be accessible outside a function. Which concept should you use?",
    options: ["Function scope", "Global scope", "DOM", "Hoisting"],
    answer: "Function scope",
    explanation:
      "Variables declared inside a function are normally limited to that function's scope."
  },

  // =========================================================
  // REACT
  // =========================================================

  {
    id: 17,
    technology: "React",
    category: "Basics",
    difficulty: "Easy",
    type: "MCQ",
    question: "Which hook is used to manage state in a functional component?",
    options: ["useEffect", "useState", "useRef", "useMemo"],
    answer: "useState",
    explanation: "useState allows functional components to store and update state."
  },
  {
    id: 18,
    technology: "React",
    category: "Hooks",
    difficulty: "Easy",
    type: "MCQ",
    question: "Which hook is commonly used for side effects?",
    options: ["useState", "useEffect", "useContext", "useReducer"],
    answer: "useEffect",
    explanation:
      "useEffect is used for side effects such as API calls, subscriptions and timers."
  },
  {
    id: 19,
    technology: "React",
    category: "Props",
    difficulty: "Easy",
    type: "Interview",
    question: "What are props in React?",
    answer:
      "Props are read-only values passed from a parent component to a child component.",
    explanation:
      "Props allow components to receive data and configuration from their parent."
  },
  {
    id: 20,
    technology: "React",
    category: "Components",
    difficulty: "Easy",
    type: "Basic",
    question: "What is a React component?",
    options: [
      "A reusable UI building block",
      "A database table",
      "A CSS file",
      "An API endpoint"
    ],
    answer: "A reusable UI building block",
    explanation:
      "Components are reusable pieces of UI that can contain their own logic and structure."
  },
  {
    id: 21,
    technology: "React",
    category: "Hooks",
    difficulty: "Medium",
    type: "Interview",
    question: "Why do we use the dependency array in useEffect?",
    answer:
      "It controls when the effect runs based on changes in its dependencies.",
    explanation:
      "React compares dependency values between renders and reruns the effect when they change."
  },
  {
    id: 22,
    technology: "React",
    category: "Context API",
    difficulty: "Medium",
    type: "Scenario",
    question:
      "You need to share logged-in user information across many components without passing props through every level. What would you use?",
    options: [
      "Context API",
      "useRef",
      "React.Fragment",
      "React.memo"
    ],
    answer: "Context API",
    explanation:
      "Context provides shared data to components without manually passing props through every level."
  },
  {
    id: 23,
    technology: "React",
    category: "Forms",
    difficulty: "Medium",
    type: "Scenario",
    question:
      "A form input value is controlled by React state. What type of input is this?",
    options: [
      "Controlled component",
      "Uncontrolled component",
      "Static component",
      "Pure component"
    ],
    answer: "Controlled component",
    explanation:
      "A controlled input gets its value from React state and updates through event handlers."
  },
  {
    id: 24,
    technology: "React",
    category: "Routing",
    difficulty: "Medium",
    type: "Practical",
    question: "Which library is commonly used for routing in React applications?",
    options: [
      "React Router",
      "React Navigation",
      "React Path",
      "React Route Core"
    ],
    answer: "React Router",
    explanation:
      "React Router provides routing functionality for React applications."
  },
  {
    id: 25,
    technology: "React",
    category: "Custom Hooks",
    difficulty: "Advanced",
    type: "Interview",
    question: "What is a custom hook?",
    answer:
      "A custom hook is a reusable JavaScript function that uses React hooks to share stateful logic between components.",
    explanation:
      "Custom hooks help extract repeated component logic into reusable functions."
  },
  {
    id: 26,
    technology: "React",
    category: "Performance",
    difficulty: "Advanced",
    type: "MCQ",
    question: "Which API can memoize a React component?",
    options: [
      "React.memo",
      "React.cacheComponent",
      "React.optimize",
      "React.fast"
    ],
    answer: "React.memo",
    explanation:
      "React.memo prevents unnecessary re-rendering when props have not changed."
  },
  {
    id: 27,
    technology: "React",
    category: "Performance",
    difficulty: "Advanced",
    type: "Interview",
    question: "What is useMemo used for?",
    answer:
      "useMemo memoizes the result of an expensive calculation until its dependencies change.",
    explanation:
      "useMemo can improve performance by avoiding unnecessary recalculations."
  },
  {
    id: 28,
    technology: "React",
    category: "Performance",
    difficulty: "Advanced",
    type: "Interview",
    question: "What is useCallback used for?",
    answer:
      "useCallback memoizes a function reference until its dependencies change.",
    explanation:
      "It can help prevent unnecessary child re-renders when function references are passed as props."
  },
  {
    id: 29,
    technology: "React",
    category: "Debugging",
    difficulty: "Hard",
    type: "Debugging",
    question:
      "A component enters an infinite useEffect loop because state is updated inside the effect and that state is also in the dependency array. What should you check first?",
    options: [
      "Dependency logic",
      "HTML syntax",
      "CSS styles",
      "Browser cache"
    ],
    answer: "Dependency logic",
    explanation:
      "Check whether the effect actually needs to update the value that triggers the same effect."
  },
  {
    id: 30,
    technology: "React",
    category: "State",
    difficulty: "Hard",
    type: "Scenario",
    question:
      "A state update depends on the previous state value. Which form is safer?",
    options: [
      "setCount(count + 1)",
      "setCount(prev => prev + 1)",
      "count++",
      "state.update()"
    ],
    answer: "setCount(prev => prev + 1)",
    explanation:
      "The functional updater receives the latest state value."
  },
  {
    id: 31,
    technology: "React",
    category: "Lists",
    difficulty: "Hard",
    type: "Debugging",
    question:
      "React displays a warning when rendering a list because each item does not have a key. What should you add?",
    options: [
      "A unique key",
      "A className",
      "An id on the parent only",
      "A ref"
    ],
    answer: "A unique key",
    explanation:
      "Keys help React identify which list items have changed, been added or removed."
  },
  {
    id: 32,
    technology: "React",
    category: "Lifecycle",
    difficulty: "Hard",
    type: "Practical",
    question:
      "You create a timer inside useEffect. What should you do when the component is removed?",
    options: [
      "Clear the timer in cleanup",
      "Create another timer",
      "Reload the page",
      "Do nothing"
    ],
    answer: "Clear the timer in cleanup",
    explanation:
      "Returning a cleanup function from useEffect prevents timers and subscriptions from continuing after unmount."
  },

  // =========================================================
  // HTML
  // =========================================================

  {
    id: 33,
    technology: "HTML",
    category: "Basics",
    difficulty: "Easy",
    type: "MCQ",
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyper Transfer Markup Language",
      "Home Tool Markup Language"
    ],
    answer: "Hyper Text Markup Language",
    explanation:
      "HTML stands for Hyper Text Markup Language."
  },
  {
    id: 34,
    technology: "HTML",
    category: "Basics",
    difficulty: "Easy",
    type: "Basic",
    question: "Which tag is used to create a hyperlink?",
    options: ["<a>", "<link>", "<href>", "<url>"],
    answer: "<a>",
    explanation:
      "The anchor tag <a> is used to create hyperlinks."
  },
  {
    id: 35,
    technology: "HTML",
    category: "Forms",
    difficulty: "Easy",
    type: "MCQ",
    question: "Which HTML element is used to create a form?",
    options: ["<form>", "<input>", "<fieldset>", "<label>"],
    answer: "<form>",
    explanation:
      "The <form> element groups controls used to collect user input."
  },
  {
    id: 36,
    technology: "HTML",
    category: "Forms",
    difficulty: "Easy",
    type: "Practical",
    question: "Which attribute provides a unique identifier for an HTML element?",
    options: ["id", "class", "name", "key"],
    answer: "id",
    explanation:
      "The id attribute uniquely identifies an element within a document."
  },
  {
    id: 37,
    technology: "HTML",
    category: "Semantic HTML",
    difficulty: "Medium",
    type: "Interview",
    question: "What is semantic HTML?",
    answer:
      "Semantic HTML uses meaningful elements such as header, nav, main, section and footer to describe the structure of content.",
    explanation:
      "Semantic elements improve readability, accessibility and document structure."
  },
  {
    id: 38,
    technology: "HTML",
    category: "Accessibility",
    difficulty: "Medium",
    type: "Scenario",
    question:
      "You have an image that conveys important information. What should you provide for accessibility?",
    options: [
      "alt text",
      "title only",
      "CSS class",
      "placeholder"
    ],
    answer: "alt text",
    explanation:
      "Alternative text allows screen readers to describe meaningful images."
  },
  {
    id: 39,
    technology: "HTML",
    category: "Forms",
    difficulty: "Medium",
    type: "Practical",
    question: "Which attribute makes an input field mandatory?",
    options: ["required", "mandatory", "validate", "needed"],
    answer: "required",
    explanation:
      "The required attribute prevents form submission when the field is empty."
  },
  {
    id: 40,
    technology: "HTML",
    category: "HTML5",
    difficulty: "Medium",
    type: "MCQ",
    question: "Which element is used to represent the main content of a page?",
    options: ["<main>", "<content>", "<body-main>", "<primary>"],
    answer: "<main>",
    explanation:
      "The <main> element represents the dominant content of the document."
  },
  {
    id: 41,
    technology: "HTML",
    category: "HTML5",
    difficulty: "Advanced",
    type: "Interview",
    question: "What is the purpose of the DOCTYPE declaration?",
    answer:
      "It tells the browser which document type and standards mode should be used to interpret the HTML.",
    explanation:
      "The HTML5 declaration is written as <!DOCTYPE html>."
  },
  {
    id: 42,
    technology: "HTML",
    category: "Accessibility",
    difficulty: "Advanced",
    type: "Scenario",
    question:
      "A button contains only an icon and screen readers cannot understand its purpose. What should you provide?",
    options: [
      "An accessible label",
      "More CSS",
      "A larger icon",
      "A background image"
    ],
    answer: "An accessible label",
    explanation:
      "Interactive elements should have an accessible name that communicates their purpose."
  },
  {
    id: 43,
    technology: "HTML",
    category: "Forms",
    difficulty: "Advanced",
    type: "Interview",
    question: "Why is the label element important in forms?",
    answer:
      "A label associates descriptive text with a form control and improves usability and accessibility.",
    explanation:
      "Using for on label with the input id creates an explicit association."
  },
  {
    id: 44,
    technology: "HTML",
    category: "Output",
    difficulty: "Medium",
    type: "Output",
    question:
      "Which element is displayed as a block-level element by default?",
    options: ["<div>", "<span>", "<a>", "<strong>"],
    answer: "<div>",
    explanation:
      "A div is block-level by default, while span is inline by default."
  },
  {
    id: 45,
    technology: "HTML",
    category: "SEO",
    difficulty: "Hard",
    type: "Interview",
    question: "Why is the title element important?",
    answer:
      "The title provides the page title shown in the browser tab and is also important for search engines and usability.",
    explanation:
      "A descriptive title helps users and search engines understand the page."
  },
  {
    id: 46,
    technology: "HTML",
    category: "Debugging",
    difficulty: "Hard",
    type: "Debugging",
    question:
      "A form submits and refreshes the page unexpectedly in a JavaScript application. What should you check?",
    options: [
      "Form submit handling and preventDefault()",
      "CSS color",
      "Image alt text",
      "HTML comments"
    ],
    answer: "Form submit handling and preventDefault()",
    explanation:
      "preventDefault() can stop the browser's default form submission behavior."
  },
  {
    id: 47,
    technology: "HTML",
    category: "HTML5",
    difficulty: "Hard",
    type: "Practical",
    question:
      "Which HTML element is appropriate for navigation links?",
    options: ["<nav>", "<navigate>", "<links>", "<navigation>"],
    answer: "<nav>",
    explanation:
      "The <nav> semantic element represents a section containing navigation links."
  },
  {
    id: 48,
    technology: "HTML",
    category: "Interview",
    difficulty: "Hard",
    type: "Interview",
    question:
      "What is the difference between an id and a class in HTML?",
    answer:
      "An id is intended to uniquely identify an element, while a class can be reused across multiple elements.",
    explanation:
      "Classes are commonly used for styling and grouping elements, while ids identify specific elements."
  },

  // =========================================================
  // CSS
  // =========================================================

  {
    id: 49,
    technology: "CSS",
    category: "Basics",
    difficulty: "Easy",
    type: "MCQ",
    question: "Which property is used to change text color?",
    options: ["font-color", "color", "text-color", "foreground"],
    answer: "color",
    explanation: "The color property changes the foreground text color."
  },
  {
    id: 50,
    technology: "CSS",
    category: "Basics",
    difficulty: "Easy",
    type: "Basic",
    question: "Which property changes the background color of an element?",
    options: [
      "background-color",
      "color-background",
      "bg",
      "background-style"
    ],
    answer: "background-color",
    explanation:
      "background-color sets the background color of an element."
  },
  {
    id: 51,
    technology: "CSS",
    category: "Box Model",
    difficulty: "Easy",
    type: "MCQ",
    question: "Which property adds space inside an element's border?",
    options: ["margin", "padding", "gap", "spacing"],
    answer: "padding",
    explanation:
      "Padding creates space between the content and the border."
  },
  {
    id: 52,
    technology: "CSS",
    category: "Box Model",
    difficulty: "Easy",
    type: "Basic",
    question: "Which property adds space outside an element?",
    options: ["padding", "margin", "border", "outline"],
    answer: "margin",
    explanation:
      "Margin creates space outside the element's border."
  },
  {
    id: 53,
    technology: "CSS",
    category: "Flexbox",
    difficulty: "Medium",
    type: "MCQ",
    question: "Which property aligns flex items along the main axis?",
    options: [
      "align-items",
      "justify-content",
      "flex-direction",
      "align-content"
    ],
    answer: "justify-content",
    explanation:
      "justify-content controls alignment along the flex container's main axis."
  },
  {
    id: 54,
    technology: "CSS",
    category: "Flexbox",
    difficulty: "Medium",
    type: "Practical",
    question:
      "Which property controls the direction of items inside a flex container?",
    options: [
      "flex-direction",
      "justify-direction",
      "direction-flex",
      "item-direction"
    ],
    answer: "flex-direction",
    explanation:
      "flex-direction determines whether flex items are arranged in rows or columns."
  },
  {
    id: 55,
    technology: "CSS",
    category: "Responsive Design",
    difficulty: "Medium",
    type: "Interview",
    question: "What is a media query?",
    answer:
      "A media query applies CSS styles based on conditions such as screen width, height or device characteristics.",
    explanation:
      "Media queries are commonly used to build responsive layouts."
  },
  {
    id: 56,
    technology: "CSS",
    category: "Grid",
    difficulty: "Medium",
    type: "Scenario",
    question:
      "You need a two-dimensional layout with rows and columns. Which CSS layout system is most suitable?",
    options: ["Flexbox", "Grid", "Float", "Position"],
    answer: "Grid",
    explanation:
      "CSS Grid is designed for two-dimensional row and column layouts."
  },
  {
    id: 57,
    technology: "CSS",
    category: "Specificity",
    difficulty: "Advanced",
    type: "Interview",
    question: "What is CSS specificity?",
    answer:
      "Specificity determines which CSS rule takes priority when multiple selectors target the same element.",
    explanation:
      "Inline styles, IDs, classes/attributes and element selectors have different specificity levels."
  },
  {
    id: 58,
    technology: "CSS",
    category: "Position",
    difficulty: "Advanced",
    type: "MCQ",
    question: "Which position value removes an element from normal document flow?",
    options: ["static", "relative", "absolute", "normal"],
    answer: "absolute",
    explanation:
      "An absolutely positioned element is removed from normal document flow."
  },
  {
    id: 59,
    technology: "CSS",
    category: "Responsive Design",
    difficulty: "Advanced",
    type: "Scenario",
    question:
      "A website looks good on desktop but overflows horizontally on mobile. What should you investigate first?",
    options: [
      "Fixed widths and responsive layout rules",
      "Font family only",
      "HTML comments",
      "JavaScript variable names"
    ],
    answer: "Fixed widths and responsive layout rules",
    explanation:
      "Fixed widths, large elements and missing responsive rules commonly cause horizontal overflow."
  },
  {
    id: 60,
    technology: "CSS",
    category: "Debugging",
    difficulty: "Advanced",
    type: "Debugging",
    question:
      "A CSS rule is not applying because another rule has higher specificity. What can you check?",
    options: [
      "Selector specificity",
      "JavaScript promises",
      "API response",
      "React state"
    ],
    answer: "Selector specificity",
    explanation:
      "Compare selector specificity and source order when debugging conflicting CSS rules."
  },
  {
    id: 61,
    technology: "CSS",
    category: "Output",
    difficulty: "Medium",
    type: "Output",
    question:
      "What happens when an element has display: none?",
    options: [
      "It is removed from the layout",
      "It becomes transparent but keeps space",
      "It becomes fixed",
      "It becomes inline"
    ],
    answer: "It is removed from the layout",
    explanation:
      "display: none hides the element and removes it from the document layout."
  },
  {
    id: 62,
    technology: "CSS",
    category: "Transitions",
    difficulty: "Hard",
    type: "Practical",
    question:
      "Which CSS property is commonly used to create a smooth change between property values?",
    options: ["transition", "smooth", "animate-change", "transform-only"],
    answer: "transition",
    explanation:
      "transition allows property changes to occur smoothly over a specified duration."
  },
  {
    id: 63,
    technology: "CSS",
    category: "Layout",
    difficulty: "Hard",
    type: "Scenario",
    question:
      "You want an element to remain visible at a specific position while scrolling until its container ends. Which position value is useful?",
    options: ["sticky", "static", "absolute", "hidden"],
    answer: "sticky",
    explanation:
      "position: sticky combines relative positioning with a scroll threshold."
  },
  {
    id: 64,
    technology: "CSS",
    category: "Interview",
    difficulty: "Hard",
    type: "Interview",
    question:
      "What is the difference between Flexbox and CSS Grid?",
    answer:
      "Flexbox is primarily designed for one-dimensional layouts, while CSS Grid is designed for two-dimensional layouts using rows and columns.",
    explanation:
      "Both can build responsive layouts, but Grid is particularly useful for complex two-dimensional page structures."
  },

  // =========================================================
  // DSA
  // =========================================================

  {
    id: 65,
    technology: "DSA",
    category: "Array",
    difficulty: "Easy",
    type: "MCQ",
    question: "What is the index of the first element in a JavaScript array?",
    options: ["0", "1", "-1", "Depends on array"],
    answer: "0",
    explanation:
      "JavaScript arrays use zero-based indexing."
  },
  {
    id: 66,
    technology: "DSA",
    category: "Stack",
    difficulty: "Easy",
    type: "MCQ",
    question: "Which principle does a stack follow?",
    options: ["FIFO", "LIFO", "Random", "Priority only"],
    answer: "LIFO",
    explanation:
      "LIFO means Last In, First Out."
  },
  {
    id: 67,
    technology: "DSA",
    category: "Queue",
    difficulty: "Easy",
    type: "MCQ",
    question: "Which principle does a queue follow?",
    options: ["LIFO", "FIFO", "Random", "Binary"],
    answer: "FIFO",
    explanation:
      "FIFO means First In, First Out."
  },
  {
    id: 68,
    technology: "DSA",
    category: "Searching",
    difficulty: "Easy",
    type: "Basic",
    question: "What is the time complexity of linear search?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    answer: "O(n)",
    explanation:
      "In the worst case, linear search checks every element."
  },
  {
    id: 69,
    technology: "DSA",
    category: "Searching",
    difficulty: "Medium",
    type: "Interview",
    question: "What is the time complexity of binary search?",
    options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    answer: "O(log n)",
    explanation:
      "Binary search halves the search space after each comparison."
  },
  {
    id: 70,
    technology: "DSA",
    category: "Sorting",
    difficulty: "Medium",
    type: "MCQ",
    question: "Which sorting algorithm has average time complexity O(n log n)?",
    options: [
      "Merge Sort",
      "Bubble Sort",
      "Linear Search",
      "Selection only"
    ],
    answer: "Merge Sort",
    explanation:
      "Merge Sort has O(n log n) time complexity in average and worst cases."
  },
  {
    id: 71,
    technology: "DSA",
    category: "Linked List",
    difficulty: "Medium",
    type: "Scenario",
    question:
      "You frequently need to insert an element at the beginning of a list. Which structure is suitable?",
    options: [
      "Linked List",
      "Binary Search",
      "Heap",
      "Hash only"
    ],
    answer: "Linked List",
    explanation:
      "Insertion at the head of a linked list can be performed in O(1) when the head is available."
  },
  {
    id: 72,
    technology: "DSA",
    category: "Hashing",
    difficulty: "Medium",
    type: "Practical",
    question:
      "Which data structure is commonly used to achieve average O(1) lookup by key?",
    options: ["Hash Table", "Stack", "Queue", "Linked List"],
    answer: "Hash Table",
    explanation:
      "Hash tables provide average constant-time lookup, insertion and deletion by key."
  },
  {
    id: 73,
    technology: "DSA",
    category: "Complexity",
    difficulty: "Advanced",
    type: "Interview",
    question: "What does Big O notation describe?",
    answer:
      "Big O describes how the time or space requirement of an algorithm grows as the input size increases.",
    explanation:
      "Big O focuses on growth rate rather than exact execution time."
  },
  {
    id: 74,
    technology: "DSA",
    category: "Recursion",
    difficulty: "Advanced",
    type: "Interview",
    question: "What is recursion?",
    answer:
      "Recursion is a technique where a function calls itself to solve smaller instances of the same problem.",
    explanation:
      "A recursive solution normally needs a base case to stop further calls."
  },
  {
    id: 75,
    technology: "DSA",
    category: "Trees",
    difficulty: "Advanced",
    type: "MCQ",
    question:
      "Which traversal visits the root between the left and right subtrees?",
    options: [
      "Inorder",
      "Preorder",
      "Postorder",
      "Level order only"
    ],
    answer: "Inorder",
    explanation:
      "Inorder traversal follows Left → Root → Right."
  },
  {
    id: 76,
    technology: "DSA",
    category: "Stack",
    difficulty: "Advanced",
    type: "Scenario",
    question:
      "Which data structure is commonly used to check whether parentheses are balanced?",
    options: ["Stack", "Queue", "Heap", "Graph"],
    answer: "Stack",
    explanation:
      "A stack can store opening brackets and match them with closing brackets."
  },
  {
    id: 77,
    technology: "DSA",
    category: "Coding",
    difficulty: "Hard",
    type: "Coding",
    question:
      "Which approach is commonly used to find two numbers that add up to a target in O(n) average time?",
    options: [
      "Hash Map",
      "Nested loops only",
      "Bubble Sort",
      "Binary Tree only"
    ],
    answer: "Hash Map",
    explanation:
      "A hash map can store previously seen values and check the required complement in O(1) average time."
  },
  {
    id: 78,
    technology: "DSA",
    category: "Graphs",
    difficulty: "Hard",
    type: "Interview",
    question: "What is the difference between BFS and DFS?",
    answer:
      "BFS explores level by level using a queue, while DFS explores deeply using recursion or a stack.",
    explanation:
      "BFS is useful for shortest paths in unweighted graphs, while DFS is useful for deep exploration and traversal."
  },
  {
    id: 79,
    technology: "DSA",
    category: "Dynamic Programming",
    difficulty: "Hard",
    type: "Scenario",
    question:
      "What is the main idea behind dynamic programming?",
    options: [
      "Store results of overlapping subproblems",
      "Always use recursion without memory",
      "Sort every input",
      "Use only arrays"
    ],
    answer: "Store results of overlapping subproblems",
    explanation:
      "Dynamic programming avoids repeated work by storing solutions to previously solved subproblems."
  },
  {
    id: 80,
    technology: "DSA",
    category: "Sorting",
    difficulty: "Hard",
    type: "Debugging",
    question:
      "A binary search implementation gives incorrect results on an unsorted array. What is the likely issue?",
    options: [
      "Binary search requires sorted data",
      "Arrays cannot be searched",
      "Binary search requires a stack",
      "The array must contain strings"
    ],
    answer: "Binary search requires sorted data",
    explanation:
      "Binary search depends on the search space being sorted."
  },

  // =========================================================
  // NODE.JS
  // =========================================================

  {
    id: 81,
    technology: "Node.js",
    category: "Basics",
    difficulty: "Easy",
    type: "MCQ",
    question: "What is Node.js?",
    options: [
      "JavaScript runtime",
      "Database",
      "CSS framework",
      "Browser"
    ],
    answer: "JavaScript runtime",
    explanation:
      "Node.js is a JavaScript runtime built on the V8 JavaScript engine."
  },
  {
    id: 82,
    technology: "Node.js",
    category: "Express",
    difficulty: "Easy",
    type: "MCQ",
    question:
      "Which framework is commonly used with Node.js for building APIs?",
    options: ["Express", "Bootstrap", "React", "Tailwind"],
    answer: "Express",
    explanation:
      "Express is a popular Node.js web framework used for APIs and web applications."
  },
  {
    id: 83,
    technology: "Node.js",
    category: "NPM",
    difficulty: "Easy",
    type: "Basic",
    question: "What is npm?",
    options: [
      "Node Package Manager",
      "Node Programming Method",
      "New Project Manager",
      "Network Package Module"
    ],
    answer: "Node Package Manager",
    explanation:
      "npm is a package manager commonly used to install and manage JavaScript dependencies."
  },
  {
    id: 84,
    technology: "Node.js",
    category: "API",
    difficulty: "Easy",
    type: "MCQ",
    question:
      "Which HTTP method is commonly used to retrieve data from an API?",
    options: ["GET", "POST", "DELETE", "PATCH"],
    answer: "GET",
    explanation:
      "GET requests are commonly used to retrieve resources."
  },
  {
    id: 85,
    technology: "Node.js",
    category: "Middleware",
    difficulty: "Medium",
    type: "Interview",
    question: "What is middleware in Express?",
    answer:
      "Middleware is a function that runs during the request-response cycle and can modify the request, response or call the next middleware.",
    explanation:
      "Middleware is commonly used for authentication, logging, validation and request processing."
  },
  {
    id: 86,
    technology: "Node.js",
    category: "API",
    difficulty: "Medium",
    type: "Scenario",
    question:
      "An API should return a successful response after creating a resource. Which HTTP status code is commonly used?",
    options: ["200", "201", "404", "500"],
    answer: "201",
    explanation:
      "201 Created indicates that a new resource has been successfully created."
  },
  {
    id: 87,
    technology: "Node.js",
    category: "API",
    difficulty: "Medium",
    type: "Practical",
    question:
      "Which HTTP status code usually indicates that a requested resource was not found?",
    options: ["200", "201", "404", "500"],
    answer: "404",
    explanation:
      "404 Not Found means the requested resource could not be found."
  },
  {
    id: 88,
    technology: "Node.js",
    category: "Routing",
    difficulty: "Medium",
    type: "Practical",
    question:
      "What is the purpose of express.Router()?",
    options: [
      "Create modular route handlers",
      "Connect to MongoDB",
      "Create React components",
      "Compile JavaScript"
    ],
    answer: "Create modular route handlers",
    explanation:
      "express.Router() helps organize routes into separate modules."
  },
  {
    id: 89,
    technology: "Node.js",
    category: "Debugging",
    difficulty: "Advanced",
    type: "Debugging",
    question:
      "Your Express API always returns 404 for a valid route. What should you check first?",
    options: [
      "Route path and HTTP method",
      "CSS file",
      "React state",
      "HTML title"
    ],
    answer: "Route path and HTTP method",
    explanation:
      "Check that the frontend is using the correct URL and HTTP method and that the route is registered."
  },
  {
    id: 90,
    technology: "Node.js",
    category: "Authentication",
    difficulty: "Advanced",
    type: "Scenario",
    question:
      "You need to protect API routes so only logged-in users can access them. What is commonly used?",
    options: [
      "Authentication middleware",
      "CSS selectors",
      "HTML comments",
      "React Fragment"
    ],
    answer: "Authentication middleware",
    explanation:
      "Authentication middleware can verify credentials or tokens before allowing access to protected routes."
  },
  {
    id: 91,
    technology: "Node.js",
    category: "Async",
    difficulty: "Advanced",
    type: "Interview",
    question: "Why is Node.js suitable for I/O-heavy applications?",
    answer:
      "Node.js uses an event-driven, non-blocking I/O model that allows it to handle many I/O operations efficiently.",
    explanation:
      "Node.js is particularly useful for APIs, real-time applications and applications with many I/O operations."
  },
  {
    id: 92,
    technology: "Node.js",
    category: "File System",
    difficulty: "Advanced",
    type: "Practical",
    question:
      "Which built-in Node.js module is commonly used to work with files?",
    options: ["fs", "file", "pathFile", "storage"],
    answer: "fs",
    explanation:
      "The fs module provides APIs for interacting with the file system."
  },
  {
    id: 93,
    technology: "Node.js",
    category: "Environment",
    difficulty: "Hard",
    type: "Scenario",
    question:
      "You need to store an API secret without hardcoding it directly in source code. What approach is commonly used?",
    options: [
      "Environment variables",
      "CSS variables",
      "HTML comments",
      "URL fragments"
    ],
    answer: "Environment variables",
    explanation:
      "Environment variables can store configuration and secrets outside the source code."
  },
  {
    id: 94,
    technology: "Node.js",
    category: "Error Handling",
    difficulty: "Hard",
    type: "Debugging",
    question:
      "An Express route throws an error and the client does not receive a proper response. What should you consider adding?",
    options: [
      "Error-handling middleware",
      "More CSS",
      "React Router",
      "HTML metadata"
    ],
    answer: "Error-handling middleware",
    explanation:
      "Express error-handling middleware can centralize API error responses."
  },
  {
    id: 95,
    technology: "Node.js",
    category: "REST API",
    difficulty: "Hard",
    type: "Interview",
    question: "What makes an API RESTful?",
    answer:
      "A RESTful API follows principles such as resource-based URLs, standard HTTP methods, stateless requests and appropriate HTTP status codes.",
    explanation:
      "REST APIs commonly use GET, POST, PUT/PATCH and DELETE to work with resources."
  },
  {
    id: 96,
    technology: "Node.js",
    category: "Performance",
    difficulty: "Hard",
    type: "Scenario",
    question:
      "A Node.js API becomes slow because a CPU-intensive operation blocks the event loop. What should you investigate?",
    options: [
      "Move or optimize the CPU-heavy work",
      "Add more CSS",
      "Use React.memo",
      "Change HTML tags"
    ],
    answer: "Move or optimize the CPU-heavy work",
    explanation:
      "CPU-heavy synchronous work can block Node.js's event loop and delay other requests."
  }
];

export default questions;