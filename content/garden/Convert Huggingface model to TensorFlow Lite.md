---
title: "Convert Huggingface model to TensorFlow Lite"
created: 2022-02-28T20:51
updated: 2022-02-28T20:51
tags: ["huggingface", "how-to", "machine-learning", "tensorflow", "tflite"]
stage: "seedling"
---

# Overview

I needed to convert a Hugging Face TensorFlow [model](https://huggingface.co/microsoft/DialoGPT-small) to TensorFlow Lite (tflite) and did so with the method below.

While it's straightforward to convert, the challenge here was that the TensorFlow model accepts a dynamic input shape `(1, N)` , where `N` is the number of tokens in the input.

According to [this](https://github.com/tensorflow/tensorflow/issues/41807) GitHub issue discussion, the recommendation is to set `N` to `None`.

# Method

```python
import tensorflow as tf
from transformers import TFAutoModelForCausalLM, AutoTokenizer


def convert(model, filename):
	"""Convert a TensorFlow model to tflite with a dynamic input shape"""

    # Set TensorSpec to have a dynamic shape
    input_spec = tf.TensorSpec([1, None], tf.int32)
    
    print(input_spec)

    # Save to correct tensor dims
    model._saved_model_inputs_spec = None
    model._set_save_spec(input_spec)

    # Convert
    converter = tf.lite.TFLiteConverter.from_keras_model(model)
    tflite_model = converter.convert()

    # Save the model.
    with open(filename, 'wb') as f:
      f.write(tflite_model)
    
    print(f"Saved to {filename}")

	return tflite_model


# Example

pretrained_model = "microsoft/DialoGPT-small"
tokenizer = AutoTokenizer.from_pretrained(pretrained_model)
model = TFAutoModelForCausalLM.from_pretrained(pretrained_model)
filename = "model.tflite"

# Convert Tf model
tflite_model = convert(model, filename)

```

# Limitations/Questions

This all said, there may be issues with using this dynamic input size, particularly with regard to 

# References
- https://github.com/tensorflow/tensorflow/issues/41807
- https://discuss.huggingface.co/t/how-can-we-test-transformer-models-after-converting-it-to-tflite-format/1670
- https://github.com/huggingface/tflite-android-transformers/blob/master/models_generation/distilbert.py
- https://github.com/bhadreshpsavani/UnderstandingNLP/blob/master/Notebooks/TFLite/TFLiteExperiments.ipynb
- https://huggingface.co/docs/transformers/v4.16.2/en/internal/generation_utils#transformers.generation_utils.GreedySearchDecoderOnlyOutput
- https://github.com/huggingface/transformers/blob/8f5d62fdb10ea2130b2206d6ffb84286f6022811/src/transformers/pipelines/text_generation.py
- https://stackoverflow.com/questions/55701663/input-images-with-dynamic-dimensions-in-tensorflow-lite
- https://stackoverflow.com/questions/64264788/tflite-dynamic-input-shape
- https://github.com/huggingface/transformers/blob/c4d4e8bdbd25d9463d41de6398940329c89b7fb6/src/transformers/generation_utils.py#L101
- [TensorFlow Generation Utils](https://github.com/huggingface/transformers/blob/c4d4e8bdbd25d9463d41de6398940329c89b7fb6/src/transformers/generation_tf_utils.py)
- https://github.com/huggingface/transformers/issues/5232 