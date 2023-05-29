# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here
In my revised refactored function, I aimed to improve readability by breaking down the code into smaller, more manageable pieces and by handling edge cases explicitly. I introduced the `hashData` helper function to simplify the hashing process, as it was used multiple times in the code, which enhances maintainability. Furthermore, I created the `getCandidateFromEvent` function to isolate the responsibility of extracting a candidate partition key from the given event, making the function's purpose more straightforward and easier to understand. Within the main `deterministicPartitionKey` function, the candidate is derived from `getCandidateFromEvent`, and the trivial partition key is assigned as a fallback if the candidate is not present. By clearly separating the logic into well-defined units, the flow of the code becomes easier to follow and manage, making it more readable than the original version.