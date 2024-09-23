class NeuralNetwork{
    constructor(neurons){
        this.neurons = [];
        for(let i = 0; i < neurons.length; i++){
            this.neurons.push(new Neuron(neurons[i], neurons[i + 1]));
        }
    }
    static forwardPropagate(givenInputs, neuralNetwork){
        let outputs = Neuron.forwardPropagate(
            givenInputs, neuralNetwork.neurons[0]);
        for(let i = 1; i < neuralNetwork.neurons.length; i++){
            outputs = Neuron.forwardPropagate(
                outputs, neuralNetwork.neurons[i]);
        }
        return outputs;
    }
    static mutate(neuron, mutate_rate=1){
        neuron.neurons.forEach(neuron => {
            for(let i=0;i<neuron.biases.length;i++){
               neuron.biases[i]=lerp(
                  neuron.biases[i],
                  Math.random()*2-1,
                  mutate_rate
               )
            }
            for(let i=0;i<neuron.weights.length;i++){
               for(let j=0;j<neuron.weights[i].length;j++){
                  neuron.weights[i][j]=lerp(
                     neuron.weights[i][j],
                     Math.random()*2-1,
                     mutate_rate
                  )
               }
            }
         });
    }
}

class Neuron{
    constructor(input, output){
        this.inputs = new Array(input);
        this.outputs = new Array(output);
        this.biases = new Array(output);

        this.weights = [];
        for(let i = 0; i<input; i++){
            this.weights[i] = new Array(output);
        }
        Neuron.#evolute(this);
    }
    static #evolute(neuron){
        for(let i = 0; i < neuron.inputs.length; i++){
            for(let j = 0; j < neuron.outputs.length; j++){
                neuron.weights[i][j] = Math.random()*2-1;
            }
        }

        for(let i = 0; i < neuron.biases.length; i++){
            neuron.biases[i] = Math.random()*2-1;
        }
    }
    static forwardPropagate(givenInputs, neuron){
        for(let i = 0; i<neuron.inputs.length; i++){
            neuron.inputs[i] = givenInputs[i];
        }

        for(let i = 0; i < neuron.outputs.length; i++){
            let sum = 0;
            for(let j = 0; j < neuron.inputs.length; j++){
                sum += neuron.inputs[j]*neuron.weights[j][i];
            }
            if(sum + neuron.biases[i] > 0){
                neuron.outputs[i] = 1;
            }else{
                neuron.outputs[i] = 0;
            }
        }
        return neuron.outputs;
    }
   
}