const fs = require('fs');
const { Configuration, OpenAIApi } = require("openai");
const { callbackify } = require('util');
const configuration = new Configuration({apiKey: /* api key */,});
const openai = new OpenAIApi(configuration);
const inputTemplate = {
    "model": "text-davinci-003",
    "temperature": 0.25,
    "max_tokens": 200
}

async function readFile(){
    const promiseObject = new Promise((resolve,reject) => {
        fs.readFile('./console-out.txt','utf8',function(error,data){
            if(error) {
                reject(error);
                throw error;
            }
            resolve(data);
        });
    });
    return promiseObject;
}

async function writeFile(output,destination){
    const obj = JSON.stringify(output);
    fs.writeFile(`./${destination}.json`, obj, 'utf8', function(error){
        if(error) throw error;
        console.log('Write complete.')
    });
}

async function callGPT(prompt){
    const inputJson = {
        ...inputTemplate,
        prompt: prompt
    }
    const response = await openai.createCompletion(inputJson);
    return response.data.choices[0].text;
}

const mainFunc = async () => {
    const data = await readFile();
    const blocks = data.split('bash-3.2$');
    
    const suggestions = await Promise.all(blocks.filter((block)=>{
        return block; //block!==undefined && block!==""
    }).map(async (block) => {
        const lineByLine = block.split('\n');
        const language = lineByLine[0].split(' ')[1];
        const commandExecuted = lineByLine[0].split(' ').slice(2,lineByLine.length).join(' ');
        const error = lineByLine.slice(1,lineByLine.length).join('\n');
        const prompt = `I tried running this ${language} unit test:
        ${commandExecuted}
        and received error message:
        ${error}
        Help me understand this error and explain how I can solve this error.`;
        const response = await callGPT(prompt);
        return {
            "command_executed": commandExecuted,
            "error": error,
            "prompt": prompt,
            "output": response
        } 
    }));
    writeFile({
        "suggestions":suggestions
    },'outputs')
}
mainFunc();
writeFile(inputTemplate,'model');