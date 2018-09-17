var mocha = require('mocha')
var chai = require('chai')
var expect = chai.expect

var CodeDefinition = require('../src/CodeDefinition')


mocha.describe('IdentifyParameters Object Tests', function () {

  mocha.it('an object', function () {
    expect((CodeDefinition.getCodeDefinition(({ Mom: 1, Pop: '2', 4: 3, 5: 'red' }))).getLiteral())
      .equals('{4:3,5:\'red\',Mom:1,Pop:\'2\'}')
  })

  mocha.it('object within object', function () {
    expect((CodeDefinition.getCodeDefinition({ Mom: 1, internal: { 1: 'ES', hello: 'world' }, Pop: '2', 4: 3, 5: 'red' }).getLiteral()))
      .equals('{4:3,5:\'red\',Mom:1,internal:{1:\'ES\',hello:\'world\'},Pop:\'2\'}')
  })

  /*mocha.it('Object with function', function () {
    expect(CodeDefinition.getCodeDefinition({ Mom: 1, myFunc: function (x) {return x+2 }, Pop: '2', 4: 3, 5: 'red' }).getLiteral())
      .equals('{4:3,5:\'red\',Mom:1,myFunc:function(){},Pop:\'2\'}')
    var newMyFunc = CodeDefinition.getCodeDefinition(a).getFunctionsDefinitions()[0]
    expect(newMyFunc(3))
      .equals(6)
  
  })*/

  mocha.it('identifies circular reference object', function () {

    var a = { 1: 1, 2: 2, 3: 3 }
    var b = { 1: a }
    a.y = b
    expect(CodeDefinition.getCodeDefinition(a).getLiteral())
      .equals('{1:1,2:2,3:3,y:{}}')
    expect(CodeDefinition.getCodeDefinition(a).getCircularDefinitions()[0].getCircularDefinition('myVar'))
      .equals('myVar.y.1=myVar')
  })

})


