var mixin = {/**
   * Create XML to represent number of text inputs.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },
  /**
   * Parse XML to restore the text inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    this.updateShape_();
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this Blockly.Block
   */
  decompose: function(workspace) {
    console.log(this.itemBlock_);
    var containerBlock = workspace.newBlock('creator_mutation_input');
    containerBlock.initSvg();
    for (var i = 0; i < 0; i++) {
      var itemBlock = workspace.newBlock(this.itemCount_[i]);
      itemBlock.initSvg();
      containerBlock.connect(itemBlock.previousConnection);
    }
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  compose: function(containerBlock) {
    var itemBlock = containerBlock.childBlocks_;
    // Count number of inputs.
    var connections = [];
    while (itemBlock[0] !== undefined) {
      connections.push(itemBlock[0]);
      itemBlock = itemBlock[0].childBlocks_;
    }
 this.itemCount_ = connections;
    this.updateShape_();
    },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  saveConnections: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('INPUTS');
    var i = 0;
    while (itemBlock) {
      var input = this.getInput('FIELD' + i);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      i++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
  },
  /**
   * Modify this block to have the correct number of inputs.
   * @private
   * @this Blockly.Block
   */
  updateShape_: function() {
    if (this.itemCount_.length && this.getInput('EMPTY')) {
      this.removeInput('EMPTY');
    } else if (!this.itemCount_.length && !this.getInput('EMPTY')) {
      var empty = this.appendDummyInput('EMPTY');
      empty.appendField('no inputs');
    }
    // Add new inputs.
    for (var i = 0; i < this.itemCount_.length; i++) {
      if (this.getInput('FIELD' + i) !== null) {
        this.removeInput('INFO' + i); 
        if (this.getInput('TYPE' + i) !== null) {
        this.removeInput('TYPE' + i); }
        this.removeInput('FIELD' + i);}
        var info = this.appendDummyInput('INFO' + i);
        info.appendField(this.itemCount_[i] + '');
        if (this.itemCount_[i].type.split('_')[1] !== "blank") {
        var type = this.appendDummyInput('TYPE' + i);
        type.appendField(new Blockly.FieldNumber('1'), 'ammount');
        type.appendField('type');
        type.appendField(new Blockly.FieldTextInput('type'), 'TYPEARRAY'+i);
        type.appendField('EXTENTIONHERE');}
        var input = this.appendStatementInput('FIELD' + i);
    }
    // Remove deleted inputs.
     while (this.getInput('FIELD' + i)) {
       this.removeInput('INFO' + i);
       if (this.getInput('TYPE' + i) !== null) {
        this.removeInput('TYPE' + i); }
       this.removeInput('FIELD' + i);
       i++;
     }
}
};
Blockly.Extensions.registerMutator('creator_inputs', mixin, null, ['creator_blank_line','creator_value_line','creator_statement_line']);
Blockly.defineBlocksWithJsonArray([
  {
  "type": "block_creator",
  "message0": "name %1 %2 %3 inputs %4 %5 DROPDOWNMUTATION %6 tooltip %7 help url %8 color %9 mutator %10 no inputs %11",
  "args0": [
    {
      "type": "field_input",
      "name": "BLOCKNAME",
      "text": "block_type"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_dropdown",
      "name": "INPUTLINE",
      "options": [
        [
          "automatic",
          "null"
        ],
        [
          "external",
          "false"
        ],
        [
          "inline",
          "true"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_dropdown",
      "name": "CONNECTIONS",
      "options": [
        [
          "no connections",
          "none"
        ],
        [
          "left output",
          "left"
        ],
        [
          "top & bottom connections",
          "topbottom"
        ],
        [
          "top connection",
          "top"
        ],
        [
          "bottom connection",
          "bottom"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "TOOLTIP",
      "check": "String"
    },
    {
      "type": "input_value",
      "name": "HELPURL",
      "check": "String"
    },
    {
      "type": "input_value",
      "name": "COLOR",
      "check": "color"
    },
    {
      "type": "input_value",
      "name": "MUTATOR",
      "check": "String"
    },
    {
      "type": "input_dummy",
      "name": "EMPTY"
    }
  ],
  "colour": 135,
  "mutator": "creator_inputs",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "creator_mutation_input",
  "message0": "inputs %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "INPUTS"
    }
  ],
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "text_field",
  "message0": "text %1 , %2",
  "args0": [
    {
      "type": "field_input",
      "name": "TEXT",
      "text": "text"
    },
    {
      "type": "field_input",
      "name": "CLASS",
      "text": "CLASS"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": "https://developers.google.com/blockly/guides/create-custom-blocks/define-blocks#label"
},
{
  "type": "text_input_field",
  "message0": "text input %1 , %2 , spellcheck %3",
  "args0": [
    {
      "type": "field_input",
      "name": "default",
      "text": "default"
    },
    {
      "type": "field_input",
      "name": "name",
      "text": "NAME"
    },
    {
      "type": "field_checkbox",
      "name": "SPELLCHECK",
      "checked": true
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "number_input_field",
  "message0": "numeric input %1 , %2 %3 min %4 max %5 precision %6",
  "args0": [
    {
      "type": "field_number",
      "name": "NUMBER",
      "value": 0,
      "precision": 1
    },
    {
      "type": "field_input",
      "name": "NAME",
      "text": "NAME"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_number",
      "name": "MIN",
      "value": 0,
      "precision": 1
    },
    {
      "type": "field_number",
      "name": "MAX",
      "value": 0,
      "precision": 1
    },
    {
      "type": "field_number",
      "name": "PRECISION",
      "value": 0,
      "precision": 1
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "angle_input_field",
  "message0": "angle input %1 , %2",
  "args0": [
    {
      "type": "field_angle",
      "name": "ANGLE",
      "angle": 90
    },
    {
      "type": "field_input",
      "name": "NAME",
      "text": "NAME"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "color_picker_field",
  "message0": "color %1 , %2",
  "args0": [
    {
      "type": "field_colour",
      "name": "COLOR",
      "colour": "#ff0000"
    },
    {
      "type": "field_input",
      "name": "NAME",
      "text": "NAME"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "dropdown_list_field",
  "message0": "dropdown %1 MUTATORHERE",
  "args0": [
    {
      "type": "field_input",
      "name": "NAME",
      "text": "NAME"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "date_input_field",
  "message0": "date %1 , %2",
  "args0": [
    {
      "type": "field_date",
      "name": "DATE",
      "date": "2020-02-20"
    }, 
    {
      "type": "field_input",
      "name": "NAME",
      "text": "NAME"
    }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "goog.require('Blockly.FieldDate')",
  "helpUrl": "https://developers.google.com/blockly/guides/create-custom-blocks/define-blocks#date_field"
},
{
  "type": "checkbox_field",
  "message0": "checkbox %1 , %2",
  "args0": [
    {
      "type": "field_checkbox",
      "name": "CHECKBOX",
      "checked": true
    },
    {
      "type": "field_input",
      "name": "NAME",
      "text": "NAME"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "variable_field",
  "message0": "variable %1 , %2",
  "args0": [
    {
      "type": "field_input",
      "name": "ITEM",
      "text": "item"
    },
    {
      "type": "field_input",
      "name": "NAME",
      "text": "NAME"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "image_field",
  "message0": "image %1 %2 width %3 height %4 alt text %5",
  "args0": [
    {
      "type": "field_input",
      "name": "IMAGEURL",
      "text": "url"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_number",
      "name": "WIDTH",
      "value": 0,
      "min": 0
    },
    {
      "type": "field_number",
      "name": "HEIGHT",
      "value": 0,
      "min": 0
    },
    {
      "type": "field_input",
      "name": "ALTTEXT",
      "text": ""
    }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "creator_blank_line",
  "message0": "blank %1 %2",
  "args0": [
    {
      "type": "field_input",
      "name": "NAME",
      "text": "NAME"
    },
    {
      "type": "field_dropdown",
      "name": "POSITION",
      "options": [
        [
          "left",
          "left"
        ],
        [
          "right",
          "right"
        ],
        [
          "center",
          "center"
        ]
      ]
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "creator_value_line",
  "message0": "value %1 %2",
  "args0": [
    {
      "type": "field_input",
      "name": "NAME",
      "text": "NAME"
    },
    {
      "type": "field_dropdown",
      "name": "POSITION",
      "options": [
        [
          "left",
          "left"
        ],
        [
          "right",
          "right"
        ],
        [
          "center",
          "center"
        ]
      ]
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "creator_statement_line",
  "message0": "statement %1 %2",
  "args0": [
    {
      "type": "field_input",
      "name": "NAME",
      "text": "NAME"
    },
    {
      "type": "field_dropdown",
      "name": "POSITION",
      "options": [
        [
          "left",
          "left"
        ],
        [
          "right",
          "right"
        ],
        [
          "center",
          "center"
        ]
      ]
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "dropdown_text_option",
  "message0": "text option",
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "dropdown_image_option",
  "message0": "image option",
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "type_select",
  "message0": "mutatorhere %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "NAME",
      "options": [
        [
          "any",
          "null"
        ],
        [
          "boolean",
          "Boolean"
        ],
        [
          "number",
          "Number"
        ],
        [
          "string",
          "String"
        ],
        [
          "array",
          "Array"
        ],
        [
          "other",
          "other"
        ]
      ]
    }
  ],
  "output": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "color_select",
  "message0": "color %1 %2",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "TYPE",
      "options": [
        [
          "hex",
          "hex"
        ],
        [
          "RGB",
          "RGB"
        ],
        [
          "HSL",
          "HSL"
        ],
        [
          "picker",
          "picker"
        ]
      ]
    },
    {
      "type": "field_input",
      "name": "HEX",
      "text": ""
    }
  ],
  "inputsInline": false,
  "output": "color",
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
}]);

Blockly.JavaScript['block_creator'] = function(block) {
  var blockName = block.getFieldValue('BLOCKNAME');
  var inputLine = block.getFieldValue('INPUTLINE');
  var connectionType = block.getFieldValue('CONNECTIONS');
  var tooltip = Blockly.JavaScript.valueToCode(block, 'TOOLTIP', Blockly.JavaScript.ORDER_ATOMIC);
  var helpUrl = Blockly.JavaScript.valueToCode(block, 'HELPURL', Blockly.JavaScript.ORDER_ATOMIC);
  var color = Blockly.JavaScript.valueToCode(block, 'COLOR', Blockly.JavaScript.ORDER_ATOMIC);
  var mutator = Blockly.JavaScript.valueToCode(block, 'MUTATOR', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
 var code = '...;\n';
  return code;
};

Blockly.JavaScript['text_field'] = function(block) {
  var text_text = block.getFieldValue('TEXT');
  var text_class = block.getFieldValue('CLASS');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['text_input_field'] = function(block) {
  var text_default = block.getFieldValue('default');
  var text_name = block.getFieldValue('name');
  var checkbox_spellcheck = block.getFieldValue('SPELLCHECK') == 'TRUE';
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['number_input_field'] = function(block) {
  var number_number = block.getFieldValue('NUMBER');
  var text_name = block.getFieldValue('NAME');
  var number_min = block.getFieldValue('MIN');
  var number_max = block.getFieldValue('MAX');
  var number_precision = block.getFieldValue('PRECISION');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['angle_input_field'] = function(block) {
  var angle_angle = block.getFieldValue('ANGLE');
  var text_name = block.getFieldValue('NAME');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['color_picker_field'] = function(block) {
  var colour_color = block.getFieldValue('COLOR');
  var text_name = block.getFieldValue('NAME');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['dropdown_list_field'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['checkbox_field'] = function(block) {
  var checkbox_checkbox = block.getFieldValue('CHECKBOX') == 'TRUE';
  var text_name = block.getFieldValue('NAME');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['variable_field'] = function(block) {
  var text_item = block.getFieldValue('ITEM');
  var text_name = block.getFieldValue('NAME');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['date_input_field'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['image_field'] = function(block) {
  var text_imageurl = block.getFieldValue('IMAGEURL');
  var number_width = block.getFieldValue('WIDTH');
  var number_height = block.getFieldValue('HEIGHT');
  var text_alttext = block.getFieldValue('ALTTEXT');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['creator_blank_line'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['creator_value_line'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['creator_statement_line'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['dropdown_text_option'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['dropdown_image_option'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['type_any_of'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['type_select'] = function(block) {
  var dropdown_type = block.getFieldValue('TYPE');
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['color_rgb'] = function(block) {
  var number_r = block.getFieldValue('R');
  var number_g = block.getFieldValue('G');
  var number_b = block.getFieldValue('B');
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['color_hex'] = function(block) {
  var text_hex = block.getFieldValue('HEX');
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['color_hsl'] = function(block) {
  var number_h = block.getFieldValue('H');
  var number_s = block.getFieldValue('S');
  var number_l = block.getFieldValue('L');
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
