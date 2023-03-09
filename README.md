# Overview
- You are in a hackathon coding away with all you friends. A team member is stuck on developing a feature and faces an ambiguous error which puts the whole team in debugging mode in order to remove the blocker. That single blocker caused your team to lose time and you ended up losing the hackathon. 
- One of your friends, frustrated, says that you should develop a tool that will help your team in the future. Specifically, help your team understand errors more easily.

# Goal
- Use OpenAI's Codex to help your team understand errors more easily.
- Structure errors into a format that OpenAI can understand and use to generate a solution.

# Inputs
- Your method will read the contents of `console-out.txt`. Which consists of commands run and the errors they produced.
- You will have to determine how to separate each of the consecutive commands and their errors.

# Outputs
- Your algorithm is expected to output a dictionary to a JSON file named `outputs.json` with the following format:
```json
{
    "suggestions": [
        {
            "command_executed": "command"
            "error": "error message",
            "prompt": "What is fed to OpenAI (codex model performs well with code)"
            "output": "Output from OpenAI"
        },
        {
            
        }
    ]
}
```
- Ensure that the `"output"` field makes sense and it is not just gibberish. 
- Hint: try to "prompt engineer" to get better results 
- Your alogrithm should output a file `model.json` which shows the OpenAI configuration you used.

- You are free to use whatever you believe will yield the optimal results. An example could look like the following:
```json
{
    "model": "davinci",
    "temperature": 0.7,
    "max_tokens": 100,
    "top_p": 1,
    "frequency_penalty": 0,
    "presence_penalty": 0,
    "stop": ["\n",
}
```

# General & Submission Info
- You will have 24 hours to complete this challenge
- You will have to setup a Node.js environment to run your code (JavaScript or TypeScript. Whatever you prefer)
- You will have to create an OpenAI account and use the generated API to run and test your code
- Ensure that the code is as readable and orgranized as possible
- The delivarables of this challenge are going to be two files
- Fork this repository on GitHub. You will be submitting on your own forked repository.